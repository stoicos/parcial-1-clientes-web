import { addDoc, arrayUnion, collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Traemos los datos del usuario con el id provisto.
 * 
 * @param {string} id 
 * @returns {Promise}
 */
export async function getPostById(id) {
    const refPost = doc(db, `posts/${id}`);

    // TODO: Manejar el error.
    const postDoc = await getDoc(refPost);

    return {
        id: postDoc.id, // la propiedad "id" del documento retorna el id del mismo.
        email: postDoc.data().email,
        content: postDoc.data().content,
        title: postDoc.data().title,
        comments: postDoc.data().comments
    }
}

export async function createComment(id, data) {
    const refPost = doc(db, `posts/${id}`);
  
    await updateDoc(refPost, {
        saveServerTimestamp: serverTimestamp()
    });
    const updatedPostDoc = await getDoc(refPost);
    const serverTime = updatedPostDoc.data().saveServerTimestamp;

    const comment = {
        ...data,
        created_at: serverTime
    };

    await updateDoc(refPost, {
        comments: arrayUnion(comment)
    });

    return comment;
}

export async function subscribeToComments(id, callback) {
    const refPost = doc(db, `posts/${id}`);

    return onSnapshot(refPost, snapshot => {
            const data = snapshot.data();
            const post = {
                comments: data.comments || []
            };
            
            callback(post);
    });

}
/**
 * 
 * @param {string} id 
 * @param {{email: string}} data 
 * @returns {Promise}
 *//*
export async function createUserProfile(id, data) {
    const refPost = doc(db, `posts/${id}`);

    await setDoc(refPost, data);
}*/