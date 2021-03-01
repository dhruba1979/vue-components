<template>
    <label
        v-if="label"
        :for="uuid">
        {{ label }}
    </label>
    <input
        v-bind="{
                 ...$attrs,
                 onInput: updateValue
                 }"
        :id="uuid"
        :value="modelValue"
        :placeholder="label"
        :aria-describedby="error ? `${uuid}-error` : null"
        :aria-invalid="error ? true : false"
        :class="{ error }"/>
    <BaseErrorMessage
        v-if="error">
    {{ error }}
    </BaseErrorMessage>
</template>

<script>
import UniqueID from '@/features/unique-id';
import SetupFormComponent from '@/features/setup-form-component';

export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        error: {
            type: String,
            default: ''
        },
        modelValue: {
            type: [String, Number],
            default: ''
        },
    },
    setup (props, context) {
        const { updateValue } = SetupFormComponent(props, context);
        const uuid = UniqueID().getID();

        return {
            updateValue,
            uuid
        }
    }
}
</script>
