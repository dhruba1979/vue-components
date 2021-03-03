<template>

    <label
        v-if="label"
        :for="uuid">
        {{ label }}
    </label>

    <input
        ref="inputRef"
        type="hidden"
        :id="uuid"
        :value="modelValue">

    <trix-editor
        class="trix-content"
        ref="editorRef"
        :input="uuid">
    </trix-editor>

    <VErrorMessage
        v-if="error">
        {{ error }}
    </VErrorMessage>

</template>
<!-- <div class="trix-content">Stored content here</div> -->
<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import UniqueID from '@/features/unique-id';
import Trix from 'trix';

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
        const uuid = UniqueID().getID();
        const editorRef = ref(null);
        const inputRef = ref(null);

        onMounted(() => {
            editorRef.value.addEventListener('trix-change', (event) => {
                context.emit('update:modelValue', inputRef.value.value);
            });
        });

        onBeforeUnmount(() => {
            editorRef.value.removeEventListener('trix-change', (event) => {
                context.emit('update:modelValue', inputRef.value.value);
            });
        });

        return {
            uuid,
            editorRef,
            inputRef
        };
    },
};
</script>

<style>
@import 'nm/trix/dist/trix.css';
</style>
