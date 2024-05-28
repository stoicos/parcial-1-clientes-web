import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Graba un mensaje de .
 * 
 * @param {{email: string, content: string}} data 
 * @returns {Promise<null>}
 */
export function savePost(data) {

    const refPosts = collection(db, 'posts');

    return addDoc(refPosts, {
        ...data,
        created_at: serverTimestamp(),
    })
        .then(doc => {

        });
}

/**
 * Ejecuta el callback cada vez que los mensajes de  cambien.
 * El callback va a recibir como argumento la nueva lista de mensajes.
 * 
 * @param {(posts: {email: string, content: string}[]) => null} callback 
 * @returns {Unsubscribe}
 */
export function subscribeToAllPosts(callback) {
    const refPosts = collection(db, 'posts');

    const q = query(refPosts, orderBy('created_at'));

    return onSnapshot(q, snapshot => {

        const posts = snapshot.docs.map(doc => {
            return {
                user_id: doc.data().user_id,
                email: doc.data().email,
                content: doc.data().content,
                created_at: doc.data().created_at.toDate(),
            }
        });

        callback(posts);
    });
}
