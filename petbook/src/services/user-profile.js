import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"

export async function getUserProfileById(id) {
    const refUser = doc(db, `users/${id}`);
    const userDoc = await getDoc(refUser);
    return {
        id: userDoc.id,
        email: userDoc.data().email,
    }
}