<script>
import MainH1 from '../components/MainH1.vue';
import MainLabel from '../components/MainLabel.vue';
import MainButton from '../components/MainButton.vue';
import MainInput from '../components/MainInput.vue'
import { register } from '../services/auth';

export default {
    name: 'Register',
    components: {MainH1, MainLabel, MainButton, MainInput},
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
        <MainLabel for="email">Email</MainLabel>
        <MainInput
            
            type="email"
            id="email"
            v-model="user.email"
            :disabled="loading"
        />
    </div>
    <div class="mb-3">
        <MainLabel for="password">password</MainLabel>
        <MainInput
           
            type="password"
            id="password"
            v-model="user.password"
            :disabled="loading"
        />
    </div>
    <MainButton>Crear cuenta</MainButton>
    </form>
</template>