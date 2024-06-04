<script>
import MainH1 from '../components/MainH1.vue';
import { subscribeToAuth } from '../services/auth';
import { subscribeToUserPosts } from '../services/my-profile';
import { getUserProfileById } from '../services/user-profile';
//import { changeUserEmail } from '../services/my-profile';

export default {
    name: 'MyProfile',
    components: { MainH1 },
    data() {
        return {
            userData: {
                id: null,
                name: null,
                email: null,
            },
            authUser: {
                id: null,
                email: null,
            },
            unsubscribeFromAuth: () => {},
            posts: [],
            unsubscribeFromPosts: () => {},
        }
    },
    methods: {

    },
    async mounted() {
        this.unsubscribeFromAuth = subscribeToAuth(newUserData => this.authUser = newUserData);
        this.userData = await getUserProfileById(this.authUser.id)

        this.unsubscribeFromPosts = subscribeToUserPosts(newPosts => {
            this.posts = newPosts;
        }, this.authUser.email);
    },
    unmounted() {
        this.unsubscribeFromAuth();
    }
}
</script>

<template>
    <MainH1>Mi Perfil</MainH1>
    <p>{{ userData.email }}</p>
    <p>{{ userData.name }}</p>
    <hr class="border-black">
    <ul>
        <li 
            v-for="post in posts"
            class="mb-2"
        >
            <p>{{ post.content }}</p>
        </li>
    </ul>
    <hr class="border-black">
    <router-link :to="`/perfil/${authUser.id}`">Modificar Perfil</router-link>
</template>
