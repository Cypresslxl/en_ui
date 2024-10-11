<template>
    <div
        v-if="show"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
        <div
            class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full"
        >
            <h2 class="text-2xl font-bold mb-4">User Details</h2>
            <p><strong>Name:</strong> {{ user.name }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <!-- Add more user details as needed -->
            <button
                @click="$emit('close')"
                class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Close
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { User } from '@/store/modules/auth';

export default defineComponent({
    name: 'UserDetailsDialog',
    props: {
        show: {
            type: Boolean,
            required: true,
        },
        user: {
            type: Object as PropType<User>,
            required: true,
        },
    },
    emits: ['close'],
});
</script>
