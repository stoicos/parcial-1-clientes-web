<script>
import MainH1 from '../components/MainH1.vue'
import { register } from '../services/auth';

export default {
    name: 'Register',
    components: {MainH1},
    data () {
        return {
            user: {
                email: '',
                password: '',
            },
            loading: false,
        }
    },
    methods: {
        async handleSubmit() {
            this.loading = true;
            try {
                await register(this.user.email, this.user.password);
                this.$router.push({
                    path: '/perfil',
                })
            } catch (error) {

            }
            this.loading = false;
        }
    }
}
</script>

<template>
    <MainH1>Crear una cuenta</MainH1>

    <form
        action="#"
        @submit.prevent="handleSubmit"
    >
    <div class="mb-3">
        <label
            class="block mb-2 w-full"
            for="email"
        >Email</label>
        <input
            class="p-2 border rounded w-full border-gray-300 disabled:bg-gray-300"
            type="email"
            id="email"
            v-model="user.email"
            :disabled="loading"
        >
    </div>
    <div class="mb-3">
        <label
            class="block mb-2 w-full"
            for="password"
        >password</label>
        <input
            class="p-2 border rounded w-full border-gray-300 disabled:bg-gray-300"
            type="password"
            id="password"
            v-model="user.password"
            :disabled="loading"
        >
    </div>
    <button
        class="transition-all py-2 px-4 w-full bg-blue-600 hover:bg-blue-400 active:bg-blue-800 text-white"
        type="submit"
    >Crear cuenta</button>
    </form>
</template>