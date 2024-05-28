<script>
import { triggerRef } from 'vue';
import MainH1 from '../components/MainH1.vue'
import { saveMessage, subscribeToChatMessages } from '../services/chat.js';
import Loader from '../components/Loader.vue';
import MainLabel from '../components/MainLabel.vue'
import MainButton from '../components/MainButton.vue'
import {suscribeToAuth} from '../services/auth.js'
import MainTextarea from '../components/MainTextarea.vue';

export default {
    name: 'Chat',
    components: {MainH1, Loader, MainLabel, MainButton, MainTextarea},
    data() {
        return {
            messages: [],
            formMessage: {
                message: '',
            },
            messagesLoaded: false,
            sendingMessage: false,
            authUser: {
                id: null,
                email: null,
            },
            unsubscribeFromAuth: () => {},
            unsubscribeFromChat: () => {},
        }
    },
    methods: {
        sendMessage() {
            this.sendingMessage = true,
            saveMessage({
                user_id: this.authUser.id,
                email: this.authUser.email,
                message: this.formMessage.message,
            }).then(() => this.sendingMessage = false);
            this.formMessage.message = "";
        },
        formatDate(date) {
            return Intl.DateTimeFormat('es', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            }).format(date).replace(",","");
        }
    },
    mounted() {
        this.unsubscribeFromChat = subscribeToChatMessages(newMessages => {
            this.messages = newMessages
            this.messagesLoaded = true
        });
        this.unsubscribeFromAuth = suscribeToAuth(newUserData => this.authUser = newUserData)
    },
    unmounted() {
        this.unsubscribeFromChat()
        this.unsubscribeFromAuth()
    }
}
</script>

<template>
    <MainH1>Chat</MainH1>
    <div class="flex gap-4 justify-between">
        <section class="w-9/12">
            <h2 class="sr-only">Lista de mensajes</h2>
            <div class="border rounded p-4 min-h-[400px]">
                <ul
                        v-if="messagesLoaded"
                >
                    <!-- mensajes -->
                    <li
                        v-for="message in messages"
                        class="mb-3"
                    >
                        <p><b><router-link :to="`/usuario/${message.user_id}`">{{ message.email }}</router-link></b></p>
                        <p>{{ message.message }}</p>
                        <p>{{ formatDate(message.created_at) }}</p>
                    </li>
                </ul>
                <Loader v-else />
            </div>
        </section>
        <section class="w-3/12">
            <h2>Enviar un mensaje</h2>
            <form
                action="#"
                @submit.prevent="sendMessage"
            >
                <div class="mb-3">
                    <span
                        class="block mb-2 w-full"
                        for="email"
                    >Email</span>
                    <span>{{ authUser.email }}</span>
                </div>
                <div>
                    <MainLabel for="message">Mensaje</MainLabel>
                    <MainTextarea
                        
                        id="message"
                        v-model="formMessage.message"
                        :disabled="sendingMessage"
                    ></MainTextarea>
                </div>
                <MainButton :disabled="sendingMessage">
                    <template   v-if="!sendingMessage">Enviar</template>
                    <Loader     v-else />
                </MainButton>
            </form>
        </section>


    </div>
</template>