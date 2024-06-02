<script>
import MainH1 from '../components/MainH1.vue';
import MainButton from '../components/MainButton.vue';
import { register } from '../services/auth';

export default {
    name: 'Register',
    components: {MainH1, MainButton},
    data() {
        return {
            user: {
                email: '',
                password: '',
                name: '',
                pet: ''
            },
            loading: false,
        };
    },
    methods: {
        async handleSubmit() {
            this.loading = true;
            try {
                await register(this.user.email, this.user.password, this.user.name, this.user.pet);
                this.$router.push({
                    path: '/perfil',
                })
            } catch (error) {
                // TODO: Manejar el error.
            }
            this.loading = false;
        }
    }
}
</script>

<template>
    <MainH1>Crear una Cuenta</MainH1>

    <form 
        action="#"
        @submit.prevent="handleSubmit"
    >
        <div class="mb-3">
            <!-- TODO: Migrar a componentes :) -->
            <label 
                for="email"
                class="block mb-2"
            >Email</label>
            <input
                type="email"
                id="email"
                class="w-full p-2 border border-gray-300 rounded disabled:bg-gray-100"
                :disabled="loading"
                v-model="user.email"
            >
        </div>
        <div class="mb-3">
            <label 
                for="name"
                class="block mb-2"
            >Nombre del dueño</label>
            <input
                type="text"
                id="name"
                class="w-full p-2 border border-gray-300 rounded disabled:bg-gray-100"
                :disabled="loading"
                v-model="user.name"
            >
        </div>
        <div class="mb-3">
            <label 
                for="pet"
                class="block mb-2"
            >Nombre de la mascota</label>
            <input
                type="text"
                id="pet"
                class="w-full p-2 border border-gray-300 rounded disabled:bg-gray-100"
                :disabled="loading"
                v-model="user.pet"
            >
        </div>
        <div class="mb-3">
            <label 
                for="password"
                class="block mb-2"
            >Contraseña</label>
            <input
                type="password"
                id="password"
                class="w-full p-2 border border-gray-300 rounded disabled:bg-gray-100"
                :disabled="loading"
                v-model="user.password"
            >
        </div>
        <MainButton>Crear Cuenta</MainButton>
    </form>
</template>