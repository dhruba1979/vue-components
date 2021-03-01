<template>
    <input
    v-bind="{
            ...$attrs,
            onChange: updateValue
            }"
    :checked="modelValue"
    :id="uuid"
    type="checkbox"/>
    <label
        :for="uuid"
        v-if="label">
        {{ label }}
    </label>
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
        modelValue: {
            type: Boolean
        },
        error: {
            type: String,
            default: ''
        }
    },
    setup (props, context) {
        const uuid = UniqueID().getID();
        const { updateValue } = SetupFormComponent(props, context);

        return {
            updateValue,
            uuid
        }
    }
}

</script>
