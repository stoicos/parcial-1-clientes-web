<script>
import MainH1 from '../components/MainH1.vue';
import MainLabel from '../components/MainLabel.vue';
import MainButton from '../components/MainButton.vue';
import MainInput from '../components/MainInput.vue'
import { login } from '../services/auth';

export default {
    name: 'Login',
    components: {MainH1, MainLabel, MainButton, MainInput},
    data () {
        return {
            user: {
                id: null,
                email: null,
            },
            loading: false
        }
    },
    methods: {
        async handleSubmit() {
            this.loading = true;
            try {
                await login(this.user.email, this.user.password);
                this.$router.push({
                    path: '/perfil',
                })
            } catch (error) {
                alert('no hay nadie llamado asi')
            }
          
            this.loading = false;
        }
    }
}
</script>

<template>
    <h1>Iniciar Sesión</h1>


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
    <MainButton>Iniciar Sesión</MainButton>
    </form>
</template>