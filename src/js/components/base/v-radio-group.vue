<template>
    <component
        v-for="option in options"
        :key="option.value"
        :is="vertical ? 'div' : 'span'"
        :style="vertical ? '' : 'margin-right: 20px;'">
    <VRadio
        :name="name"
        :label="option.label"
        :modelValue="modelValue"
        :value="option.value"
        @update:modelValue="$emit('update:modelValue', $event)" />
    </component>
    <VErrorMessage
        v-if="error">
    {{ error }}
    </VErrorMessage>
</template>

<script>
export default {
    props: {
        vertical: {
            type: Boolean,
            default: false
        },
        modelValue: {
            type: [String, Number],
            required: true
        },
        options: {
            type: Array,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        error: {
            type: String,
            default: ''
        }
    }
}
</script>
