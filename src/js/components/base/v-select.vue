<template>
    <label
        v-if="label"
        :for="uuid">
        {{ label }}
    </label>
    <select
        v-bind="{
                 ...$attrs,
                 onChange: updateValue
                 }"
        :value="modelValue"
        :id="uuid"
        :aria-describedby="error ? `${uuid}-error` : null"
        :aria-invalid="error ? true : false"
        :class="{ error }" >
        <option
            v-for="option in options"
            :value="option.value"
            :key="option.value"
            :selected="option.value === modelValue">
        {{ option.label }}
        </option>
    </select>
    <VErrorMessage
        v-if="error">
    {{ error }}
    </VErrorMessage>
</template>

<script>
import UniqueID from '@/features/unique-id';
import SetupFormComponent from '@/features/setup-form-component';

export default {
    props: {
        options: {
            type: Array,
            required: true
        },
        label: {
            type: String,
            default: '',
        },
        error: {
            type: String,
            default: ''
        },
        modelValue: {
            type: [String, Number]
        }
    },
    setup(props, context) {
        const { updateValue } = SetupFormComponent(props, context);
        const uuid = UniqueID().getID();

        return {
            updateValue,
            uuid
        }
    }
}
</script>



