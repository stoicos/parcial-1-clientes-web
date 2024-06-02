<script>
export default {
    name: 'ModifyProfile',
    data() {
        return {
            userProfile: {
                name: null,
                pet: null,
                email: null
            }
        }
    }
}
</script>
<template>
    <form action="#" @submit.prevent="sendChanges">
    <label for="name">Nombre</label>
    <input type="text" name="name" id="name"/>
    <label for="pet">Nombre de la mascota</label>
    <input type="text" name="pet" id="pet"/>
    </form>
</template>