import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from "./firebase.js";

/**
 * Graba un mensaje de chat
 * 
 * @param {{email: string, message: string}} data 
 * @returns {Promise<null>}
 */
export function saveMessage(data) {
    const refChat = collection(db, 'chat');

    return addDoc(refChat, {
        ...data,
        created_at: serverTimestamp(),
    })
        .then(doc => {

        });
}

export function subscribeToChatMessages(callback) {
    const refChat = collection(db, 'chat');

    const q = query(refChat, orderBy('created_at'));

    onSnapshot(q, snapshot => {
        const messages = snapshot.docs.map(doc => {
            return {
                user_id: doc.data().user_id,
                email: doc.data().email,
                message: doc.data().message,
                created_at: doc.data().created_at.toDate(),
            }
        });
        callback(messages)

    })
}