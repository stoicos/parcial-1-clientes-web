<script>
import Loader from '../components/Loader.vue';
import MainButton from '../components/MainButton.vue';
import MainH1 from '../components/MainH1.vue';
import { subscribeToAuth } from '../services/auth';
import { savePost, subscribeToAllPosts } from '../services/post';
import { createComment, getPostById, subscribeToComments } from '../services/post-content';

// Simulamos los mensajes de chat.
// const defaultMessages = [
//     {
//         email: 'sara@za.com',
//         content: '¡Hola mundo!',
//     },
//     {
//         email: 'pepe@trueno.com',
//         content: 'hola, q tal?',
//     },
//     {
//         email: 'sara@za.com',
//         content: 'Hola Pepe. ¿Cómo andás?',
//     },
// ];

export default {
    name: 'Post',
    components: { MainH1, Loader, MainButton },
    // data() {
    data: function () {
        return {
            newComment: {
                comment: '',
            },
            creatingPost: false,

            post: {
                id: null,
                email: null,
                content: null,
                title: null,
                comments: null,
            },
            postsLoaded: false,
            unsubscribeFromComments: () => { },

            authUser: {
                id: null,
                email: null,
            },
            unsubscribeFromAuth: () => { },
        }
    },
    methods: {
        sendComment() {
            createComment(this.post.id, {
                user_id: this.authUser.id,
                email: this.authUser.email,
                comment: this.newComment.comment,
            })
        },
        /**
         * 
         * @param {Date} date 
         */
        formatDate(date) {
            // console.log("El valor que recibimos es: ", date)
            // Transformamos el objeto Date a una fecha con formato AAAA-MM-DD HH:mm:ss

            return Intl.DateTimeFormat('es', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
            }).format(date).replace(',', '');
        },
    },
    // Seteamos el mounted para cargar los mensajes iniciales.
    async mounted() {
        // this.messages = defaultMessages;
        // Nos suscribimos para ser notificados de los cambios en los mensajes.
        //this.unsubscribeFromPosts = subscribeToAllPosts(newPosts => {
        //    this.posts = newPosts;
        //    this.postsLoaded = true;
        //});
        this.post = await getPostById(this.$route.params.id);
        this.unsubscribeFromComments = await subscribeToComments(this.post.id, (commentsData) => {
            this.post.comments = commentsData.comments;
        });



        // Guardamos la función para cancelar la suscripción.
        this.unsubscribeFromAuth = subscribeToAuth(newUserData => this.authUser = newUserData);
        // console.log("Recibimos la función para cancelar la suscripción. ", this.unsubscribeFromAuth);

    },
    unmounted() {
        // Cancelamos todas las suscripciones.

        this.unsubscribeFromComments();

        this.unsubscribeFromAuth();
    }
}
</script>

<template>
    <p>{{ post.email }}</p>
    <h1 class="text-4xl">{{ post.title }}</h1>
    <p>{{ post.content }}</p>

    <li v-for="comments in post.comments">
        {{ formatDate(comments.created_at) }}
        <router-link :to="`/usuario/${comments.user_id}`">{{ comments.email }}:</router-link>
        {{ comments.comment }}
    </li>
    <form action="#" @submit.prevent="sendComment">
        <textarea name="comment" id="comment" v-model="newComment.comment"></textarea>
        <MainButton>Enviar</MainButton>
    </form>
</template>