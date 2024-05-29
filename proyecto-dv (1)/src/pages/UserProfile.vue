<script>
import Loader from '../components/Loader.vue';
import MainH1 from '../components/MainH1.vue';
import { subscribeToAuth } from '../services/auth';
import { subscribeToUserPosts } from '../services/my-profile';
import { getUserProfileById } from '../services/user-profile';

export default {
    name: 'UserProfile',
    components: {MainH1, Loader},
    data() {
        return {
            user: {
                id: null,
                email: null,
                name: null
            },
            authUser: {
                id: null,
                email: null,
            },
            unsubscribeFromAuth: () => {},
            userLoaded: false,
            posts: [],
            unsubscribeFromPosts: () => {},
        }
    },
    async mounted() {
        this.unsubscribeFromAuth = subscribeToAuth(newUserData => this.authUser = newUserData);
        this.userLoaded = false;
        // Traemos los datos del perfil del usuario.
        this.user = await getUserProfileById(this.$route.params.id);

        this.userLoaded = true;
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
    <Loader v-if="!userLoaded" />
    <template v-else>
        <MainH1>Perfil de {{ user.email }}</MainH1>
        <p>{{ user.name }}</p>
    </template>
    <ul>
        <li 
            v-for="post in posts"
            class="mb-2"
        >
            <p>{{ post.content }}</p>
        </li>
    </ul>
</template>