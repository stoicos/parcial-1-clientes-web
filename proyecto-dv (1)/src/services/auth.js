import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { createUserProfile } from "./user-profile";

const EMPTY_USER_DATA = {
    id: null,
    email: null,
}

// Definimos la variable para los datos del usuario (el "subject" de nuestro observer).
let userData = EMPTY_USER_DATA;

// Definimos la variable para los observers.
let observers = [];

// Vamos a guardar en localstorage los datos del usuario cuando se autentica.
// Apenas iniciamos el sistema de autenticación, vamos a lvantar los datos de localstoage, que si no estan vacios vamos a utilizar para marcar al usuario
// como autenticado.
if(localStorage.getItem('user') !== null) {
    userData = JSON.parse(localStorage.getItem('user'));
}

// Actualizamos el estado del usuario dependiendo de su estado en Firestore Authentication.
onAuthStateChanged(auth, user => {
    if(user) {
        setUserData({
            id: user.uid,
            email: user.email,
        });
    } else {
        setUserData(EMPTY_USER_DATA);
    }
    // Notificamos a los observers de los datos del usuario.
    // Update: Ahora que usamos setUserData, ya no necesitamos hacerlo a mano.
    // notifyAll();
});

/**
 * Crea una cuenta de usuario, y lo autentica.
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<void>}
 */
export async function register(email, password) {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Usuario creado. ID: ", userCredentials.user.uid)

        //Creamos el perfil del usuario
        await createUserProfile(userCredentials.user.uid, {email});
    } catch (error) {
        console.error("[auth.js register] Error al crear una cuenta: ", error.code)
        throw error;
    }
}

/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<void>}
 */
export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            console.log("Usuario autenticado. ID: ", userCredentials.user.uid);
        })
        .catch(error => {
            console.error("[auth.js login] Error al crear una cuenta: ", error.code);
            throw error;
        });
}

/**
 * 
 * @returns {Promise<void>}
 */
export function logout() {
    localStorage.removeItem('user')
    return signOut(auth);
}


/*-------------------------------------------------------------------------
| Implementación de Observer para el estado de autenticación
+--------------------------------------------------------------------------
| Para informar el estado de autenticación al proyecto (ej: los componentes,
| el router, etc), vamos a hacer nuestra propia implementación del patrón de
| diseño Observer.
|
| ¿Cómo es el patrón Observer?
| El patrón Observer nos permite aplicar una estrategia donde múltiples 
| elementos del sistema (los "observers") necesitan enterarse de los cambios
| o eventos ocurridos en otro elemento (el "subject").
|
| En nuestro caso puntual, el "subject" va a ser una variable "userData" que
| vamos a definir en este servicio y va a contener los datos del usuario
| autenticado.
| Luego, vamos a definir otra variable llamada "observers" que va a ser un
| array que guarde los callbacks (los "observers") que piden ser notificados
| de los cambios en "userData".
|
| Finalmente, vamos a crear una función "subscribeToAuth" que reciba un
| callback/observer, que se va a guardar en el array, y se le va a notificar
| el estado de autenticación del usuario.
|
| Nota: El proceso de agregar un observer se suele llamar "suscripción".
| Aunque también lo pueden ver llamado "listen", "watch" o "attach".
+--------------------------------------------------------------------------*/
/**
 * Suscribe un observer (el callback) para la autenticación.
 * Este callback va a ejecutarse cada vez que el estado cambie, y cuando se
 * suscribe.
 * Retorna una función para cancelar la suscripción.
 * 
 * @param {() => {}} callback 
 * @returns {() => void}
 */
export function subscribeToAuth(callback) {
    // Agregamos el callback al stack de observers.
    observers.push(callback);

    console.log("[auth.js subscribeToAuth] Observer suscrito. El stack actual es: ", observers);

    // Le notificamos los datos actuales.
    notify(callback);

    // Retornamos una nueva función que al ejecutarse cancele la suscripción.
    // Es decir, elimine del array de observers a este callback que agregamos.
    return () => { 
        observers = observers.filter(obs => obs !== callback);
        // console.log("[auth.js subscribeToAuth] Observer removido. El stack actual es: ", observers);
    };
    // return function() { 
    //     observers = observers.filter(obs => obs !== callback);
    //     console.log("[auth.js subscribeToAuth] Observer removido. El stack actual es: ", observers);
    // };
}

/**
 * Notifica a un observer de los datos actuales del usuario.
 * 
 * @param {() => {}} observer 
 */
function notify(observer) {
    observer({...userData});
}

/**
 * Notifica a todos los observers.
 * 
 * Esta función debe invocarse cada vez que la variable userData cambie.
 */
function notifyAll() {
    observers.forEach(observer => notify(observer));
}

/**
 * Actualiza los datos, o parte de ellos, del objeto userData, y notifica a todos
 * los observers suscritos del cambio.
 * 
 * @param {{}} newData 
 */
function setUserData(newData) {
    userData = {
        ...userData,
        ...newData,
    }

    localStorage.setItem('user', JSON.stringify(userData));

    notifyAll();
}