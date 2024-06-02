<script>
import MainH1 from '../components/MainH1.vue';
import MainButton from '../components/MainButton.vue';

export default {
    name: 'Home',
    components: {MainH1, MainButton},
}
</script>

<template>
    <MainH1>Bienvenido a Petbook</MainH1>
    <p>Petbook es una red social de mascotas. Registrá a tu mascota y comenzá a postear.</p>
    <MainButton>Comenzar</MainButton>
</template>