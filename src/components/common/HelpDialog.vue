<template>
    <div
        v-if="show"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div
            class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full"
        >
            <h3 class="text-2xl font-bold mb-4">{{ title }}</h3>
            <ul class="list-disc pl-5 space-y-2">
                <li v-for="(instruction, index) in instructions" :key="index">
                    {{ instruction }}
                </li>
            </ul>
            <button
                @click="close"
                class="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                {{ closeButtonText }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HelpDialog',
    props: {
        show: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        instructions: {
            type: Array as () => string[],
            required: true,
        },
        closeButtonText: {
            type: String,
            required: true,
        },
    },
    emits: ['close'],
    setup(props, { emit }) {
        const close = () => {
            emit('close');
        };

        return {
            close,
        };
    },
});
</script>
