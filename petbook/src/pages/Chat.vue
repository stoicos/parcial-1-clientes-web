<script>
import { triggerRef } from 'vue';
import MainH1 from '../components/MainH1.vue'
import { saveMessage, subscribeToChatMessages } from '../services/chat.js';

export default {
    name: 'Chat',
    components: {MainH1},
    data() {
        return {
            messages: [],
            formMessage: {
                email: '',
                message: '',
            }
        }
    },
    methods: {
        sendMessage() {
            saveMessage({
                email: this.formMessage.email,
                message: this.formMessage.message,
            });
            this.formMessage.message = "";
        }
    },
    mounted() {
        subscribeToChatMessages(newMessages => this.messages = newMessages);
    }
}
</script>

<template>
    <MainH1>Chat</MainH1>

    <div class="flex gap-4 justify-between">
        <section class="w-9/12">
            <h2 class="sr-only">Lista de mensajes</h2>
            <ul class="border rounded p-4 min-h-[400px]">
                <!-- mensajes -->
                <li v-for="message in messages">
                    <p><b>{{ message.email }}</b></p>
                    <p>{{ message.message }}</p>
                </li>
            </ul>
        </section>
        <section class="w-3/12">
            <h2>Enviar un mensaje</h2>
            <form
                action="#"
                @submit.prevent="sendMessage"
            >
                <div>
                    <label
                        class="block mb-2 w-full"
                        for="email"
                    >Email</label>
                    <input
                        class="p-2 border rounded border-gray-300"
                        type="email"
                        id="email"
                        v-model="formMessage.email"
                    >
                </div>
                <div>
                    <label
                        class="block mb-2 w-full"
                        for="message"
                    >Mensaje</label>
                    <textarea
                        class="border border-gray-300 block mb-2 w-full"
                        id="message"
                        v-model="formMessage.message"
                    ></textarea>
                </div>
                <button
                    class="transition-all py-2 px-4 w-full bg-blue-600 hover:bg-blue-400 active:bg-blue-800 text-white"
                    type="submit"
                >Enviar</button>
            </form>
        </section>


    </div>
</template>