import Home from "../pages/Home.vue";
import Chat from "../pages/Chat.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import { createRouter, createWebHashHistory } from 'vue-router';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import MyProfile from "../pages/MyProfile.vue";
import { suscribeToAuth } from "../services/auth";

const routes = [
    { path: '/',                    component: Home, },
    { path: '/chat',                component: Chat,},
    { path: '/iniciar-sesion',      component: Login,},
    { path: '/registro',            component: Register,},
    { path: '/perfil',              component: MyProfile,},
]

const router = createRouter({
    routes,
    history: createWebHashHistory(),
})

let authUser = {
    id: null,
    email: null,
}

suscribeToAuth(newUserData => authUser = newUserData)

router.beforeEach((to, from) => {
    if(authUser.id === null && to.path == '/chat') {
        return false
    }
})

export default router