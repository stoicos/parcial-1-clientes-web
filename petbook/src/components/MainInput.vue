<script>
export default {
    name: 'MainInput',
    props: ['modelValue'],
    emits: ['update:modelValue'],
}
</script>

<template>
    <input
        class="p-2 border rounded w-full border-gray-300 disabled:bg-gray-300"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >
</template>