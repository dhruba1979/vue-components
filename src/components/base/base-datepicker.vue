<template>
    <label
        v-if="label"
        :for="uuid">
        {{ label }}
    </label>
    <input
        type="text"
        ref="pickerRef"
        :id="uuid"
        :placeholder="label"
        :aria-describedby="error ? `${uuid}-error` : null"
        :aria-invalid="error ? true : false"
        :class="{ error }"
        :value="modelValue">
    <BaseErrorMessage
        v-if="error">
        {{ error }}
    </BaseErrorMessage>
</template>

<script>
import UniqueID from '@/features/unique-id';
import Pikaday from 'pikaday';
import { format } from 'date-fns';
import { ref, onMounted, onBeforeUnmount } from 'vue';

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
            type: String,
            default: ''
        }
    },
    setup(props, context) {
        const pickerRef = ref(null);
        const uuid = UniqueID().getID();
        let picker;

        onMounted(() => {
            picker = new Pikaday({
                field: pickerRef.value,
                format: 'D/M/YYYY',
                toString(date, dateFormat) {
                    return format(date, 'd/M/yyyy');
                },
                parse(dateString, format) {
                    const parts = dateString.split('/');
                    const day = parseInt(parts[0], 10);
                    const month = parseInt(parts[1], 10) - 1;
                    const year = parseInt(parts[2], 10);
                    return new Date(year, month, day);
                },
                onSelect(date) {
                    context.emit('update:modelValue', format(date, 'd/M/yyyy'));
                }
            });
        });

        onBeforeUnmount(() => {
            picker.destroy();
        });

        return {
            uuid,
            pickerRef,
        }
    }
    // data() {
    //     return {
    //         uuid: UniqueID().getID(),
    //     }
    // },
    // mounted() {
    //     const vm = this;
    //     this.picker = new Pikaday({
    //         field: vm.$refs.pickerRef,
    //         format: 'D/M/YYYY',
    //         toString(date, format) {
    //             // you should do formatting based on the passed format,
    //             // but we will just return 'D/M/YYYY' for simplicity
    //             const day = date.getDate();
    //             const month = date.getMonth() + 1;
    //             const year = date.getFullYear();
    //             return `${day}/${month}/${year}`;
    //         },
    //         parse(dateString, format) {
    //             // dateString is the result of `toString` method
    //             const parts = dateString.split('/');
    //             const day = parseInt(parts[0], 10);
    //             const month = parseInt(parts[1], 10) - 1;
    //             const year = parseInt(parts[2], 10);
    //             return new Date(year, month, day);
    //         },
    //         onSelect(date) {
    //             vm.$emit('update:modelValue', format(date, 'd/M/yyyy'));
    //         }
    //     });
    // },
    // beforeUnmount() {
    //     this.picker.destroy();
    // }
}
</script>
