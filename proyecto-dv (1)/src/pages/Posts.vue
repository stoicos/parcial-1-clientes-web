<script>
import Loader from '../components/Loader.vue';
import MainH1 from '../components/MainH1.vue';
import { subscribeToAuth } from '../services/auth';
import { savePost, subscribeToAllPosts } from '../services/post';

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
    name: 'Posts',
    components: {MainH1, Loader},
    // data() {
    data: function() {
        return {
            newPost: {
                id: '',
                content: '',
                title: '',
            },
            creatingPost: false,

            posts: [],
            postsLoaded: false,
            unsubscribeFromPosts: () => {},

            authUser: {
                id: null,
                email: null,
            },
            unsubscribeFromAuth: () => {},
        }
    },
    methods: {
        sendPost() {
            this.creatingPost = true;

            savePost({
                id: this.newPost.id,
                user_id: this.authUser.id,
                email: this.authUser.email,
                content: this.newPost.content,
                title: this.newPost.title
            }).then(() => this.creatingPost = false);
            this.newPost.content = "";
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
    mounted() {
        // this.messages = defaultMessages;
        // Nos suscribimos para ser notificados de los cambios en los mensajes.
        this.unsubscribeFromPosts = subscribeToAllPosts(newPosts => {
            this.posts = newPosts;
            this.postsLoaded = true;
        });

        // Guardamos la función para cancelar la suscripción.
        this.unsubscribeFromAuth = subscribeToAuth(newUserData => this.authUser = newUserData);
        // console.log("Recibimos la función para cancelar la suscripción. ", this.unsubscribeFromAuth);
    },
    unmounted() {
        // Cancelamos todas las suscripciones.
        this.unsubscribeFromPosts();
        this.unsubscribeFromAuth();
    }
}
</script>

<template>
    <section>
        <MainH1>Chat Global de DV</MainH1>
        
        <div class="flex gap-8 justify-between">
            <section class="w-9/12">
                <h2 class="sr-only">Lista de Mensajes</h2>

                <div 
                    class="border rounded p-4 min-h-[400px]"
                >
                    <ul 
                        v-if="postsLoaded"
                    >
                        <li 
                            v-for="post in posts"
                            class="mb-2"
                        >
                            <p>
                                <router-link :to="`/post/${post.id}`"><h2 class="text-4xl">{{ post.title }}</h2></router-link>
                                <b>
                                    <router-link 
                                        :to="`/usuario/${post.user_id}`"
                                        class="text-blue-700 underline"
                                    >{{ post.email }} </router-link>
                                </b>
                            </p>
                            <p>{{ post.content }}</p>
                            <p>{{ formatDate(post.created_at) }}</p>
                            
                        </li>
                    </ul>
                    <Loader 
                        v-else 
                    />
                </div>
            </section>
            <section class="w-3/12">
                <h2 class="text-xl mb-4">Enviar un Mensaje</h2>
                <form 
                    action="#"
                    @submit.prevent="sendPost"
                >
                    <div class="mb-3">
                        <span
                            class="block mb-2"
                        >Email</span>
                        <span>{{ authUser.email }}</span>
                    </div>
                    <div class="mb-3">
                        <label 
                            for="title"
                            class="block mb-2"
                        >Titulo</label>
                        <input
                            id="title"
                            class="w-full p-2 border border-gray-300 rounded disabled:bg-gray-100"
                            :disabled="creatingPost"
                            v-model="newPost.title"
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <label 
                            for="post"
                            class="block mb-2"
                        >Mensaje</label>
                        <textarea 
                            id="post"
                            class="w-full p-2 border border-gray-300 rounded disabled:bg-gray-100"
                            :disabled="creatingPost"
                            v-model="newPost.content"
                            required
                        ></textarea>
                    </div>
                    <button 
                        type="submit"
                        class="transition-all w-full px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 active:bg-blue-800 disabled:bg-blue-200 text-white disabled:black"
                        :disabled="creatingPost"
                    >
                        <template   v-if="!creatingPost">Enviar</template>
                        <Loader     v-else />
                    </button>
                </form>
            </section>
        </div>
    </section>
</template>