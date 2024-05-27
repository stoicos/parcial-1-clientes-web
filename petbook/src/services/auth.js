import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from './firebase'

const EMPTY_USER_DATA = {
    id: null,
    email: null,
}

let userData = EMPTY_USER_DATA;

onAuthStateChanged(auth, user => {
    if(user) {
        setUserData({
            id: user.uid,
            email: user.email
        })
    } else {
        setUserData(EMPTY_USER_DATA)
    }
})

let observers = [];

export function suscribeToAuth(callback) {
    observers.push(callback);

    notify(callback);

    return () => observers = observers.filter(obs => obs !== callback);
}

function notify(observer) {
    observer({...userData})
}

function notifyAll() {
    observers.forEach(observer => notify(observer))
}

export function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            console.log(userCredentials)
        })
        .catch(error => {
            throw error;
        }) 
}

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
        console.log(userCredentials)
    })
    .catch(error => {
        throw error;
    }) 
}

export function logout() {
    return signOut(auth);
}

function setUserData(newData) {
    userData = {
        ...userData,
        ...newData,
    };
    notifyAll();
}