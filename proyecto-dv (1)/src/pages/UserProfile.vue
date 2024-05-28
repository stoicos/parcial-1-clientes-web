<script>
import Loader from '../components/Loader.vue';
import MainH1 from '../components/MainH1.vue';
import { getUserProfileById } from '../services/user-profile';

export default {
    name: 'UserProfile',
    components: {MainH1, Loader},
    data() {
        return {
            user: {
                id: null,
                email: null,
            },
            userLoaded: false,
        }
    },
    async mounted() {
        this.userLoaded = false;
        // Traemos los datos del perfil del usuario.
        this.user = await getUserProfileById(this.$route.params.id);
        this.userLoaded = true;
    }
}
</script>

<template>
    <Loader v-if="!userLoaded" />
    <template v-else>
        <MainH1>Perfil de {{ user.email }}</MainH1>

    </template>
</template>