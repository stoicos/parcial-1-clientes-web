import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getUserById(id) {
    const refUser = doc(db, `users/${id}`);

    // TODO: Manejar el error.
    const userDoc = await getDoc(refUser);

    return {
        //id: userDoc.id,
        email: userDoc.data().email,
        name: userDoc.data().name,
        pet: userDoc.data().pet
    }
}

export function saveChanges(id, data) {
    // Obtén una referencia al documento específico que deseas actualizar
    const refUser = doc(collection(db, 'users'), id);

    return updateDoc(refUser, {
        ...data
    })
    .then(() => {
     
    })
}