<script>
export default {
    name: 'MainButton',
}
</script>
<template>
    <button
        type="submit"
        class="transition-all w-full px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 active:bg-blue-800 disabled:bg-blue-200 text-white disabled:text-black"
    >
    <slot />
    </button>
</template>