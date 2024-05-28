<script>
export default {
    name: 'MainTextarea',
    props: ['modelValue'],
    emits: ['update:modelValue'],
}
</script>

<template>
    <textarea
        class="border border-gray-300 block mb-2 w-full disabled:bg-gray-300"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>
</template>