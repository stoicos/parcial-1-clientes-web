import { collection, addDoc, onSnapshot } from "firebase/firestore";
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
    })
        .then(doc => {

        });
}

export function subscribeToChatMessages(callback) {
    const refChat = collection(db, 'chat');

    onSnapshot(refChat, snapshot => {
        const messages = snapshot.docs.map(doc => {
            return {
                email: doc.data().email,
                message: doc.data().message,
            }
        });
        callback(messages)

    })
}