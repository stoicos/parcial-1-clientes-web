import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Traemos los datos del usuario con el id provisto.
 * 
 * @param {string} id 
 * @returns {Promise}
 */
export async function getUserProfileById(id) {
    const refUser = doc(db, `users/${id}`);

    // TODO: Manejar el error.
    const userDoc = await getDoc(refUser);

    return {
        id: userDoc.id, // la propiedad "id" del documento retorna el id del mismo.
        email: userDoc.data().email,
    }
}

/**
 * 
 * @param {string} id 
 * @param {{email: string}} data 
 * @returns {Promise}
 */
export async function createUserProfile(id, data) {
    const refUser = doc(db, `users/${id}`);

    await setDoc(refUser, data);
}