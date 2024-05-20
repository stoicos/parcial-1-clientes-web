<script>
import Home from './pages/Home.vue';

export default {
    name: 'App',
    components: {Home},
}
</script>

<template>
    <div class="grid grid-rows-[60px_1fr_100px] h-full">
            <nav class="p-4 bg-slate-300 text-gray-800 flex justify-between">
                <p>Petbook</p>
                <ul class="flex gap-4">
                    <li><router-link to="/">Inicio</router-link></li>
                    <li><router-link to="/chat">Chat Público</router-link></li>
                    <li><router-link to="/iniciar-sesion">Iniciar Sesión</router-link></li>
                    <li><router-link to="/registro">Registro</router-link></li>
            </ul>
        </nav>
        <main class="container mx-auto p-4">
            <router-view></router-view>
        </main>
        <footer class="flex justify-center items-center bg-slate-900 text-white">
            <p>Petbook web</p>
        </footer>
    </div>
</template>