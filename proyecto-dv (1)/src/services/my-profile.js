import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "./firebase";

export function subscribeToUserPosts(callback, userEmail) {
    const refPosts = collection(db, 'posts');

    const q = query(refPosts, where('email', '==', userEmail), orderBy('created_at'));

    return onSnapshot(q, snapshot => {

        const posts = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                user_id: doc.data().user_id,
                email: doc.data().email,
                content: doc.data().content,
                created_at: doc.data().created_at.toDate(),
            }
        });

        callback(posts);
    });
}
