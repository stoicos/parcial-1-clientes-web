<script>
import { subscribeToAuth } from '../services/auth';
import { getUserById, saveChanges } from '../services/profile-modify';

export default {
    name: 'ModifyProfile',
    data() {
        return {
            userProfile: {
                name: null,
                pet: null,
                email: null
            },
            authUser: {
                id: null,
                email: null,
            },
            unsubscribeFromAuth: () => {},
        }
    },
    methods: {
        sendChanges() {
            saveChanges(this.$route.params.id, {
                name: this.userProfile.name,
                pet: this.userProfile.pet
            }) 
        }
    },
    async mounted() {
        this.unsubscribeFromAuth = subscribeToAuth(newUserData => this.authUser = newUserData);

        this.userProfile = await getUserById(this.$route.params.id)
    },
    unmounted() {
        // Cancelamos todas las suscripciones.
    

        this.unsubscribeFromAuth();
    }
}
</script>
<template>
    <p>{{ authUser.email }}</p> 
    <p>{{ userProfile.name }}</p>
    <form action="#" @submit.prevent="sendChanges">
    <label for="name">Nombre</label>
    <input type="text" name="name" id="name" v-model="userProfile.name"/>
    <label for="pet">Nombre de la mascota</label>
    <input type="text" name="pet" id="pet" v-model="userProfile.pet"/>
    <button type="submit">Guardar cambios</button>
    </form>
</template>