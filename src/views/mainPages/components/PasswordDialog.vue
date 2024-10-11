<template>
    <div
        v-if="show"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
        <div
            class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full"
        >
            <h2 class="text-2xl font-bold mb-4">Change Password</h2>
            <form @submit.prevent="handleChangePassword">
                <div class="mb-4">
                    <label
                        for="currentPassword"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Current Password
                    </label>
                    <input
                        v-model="currentPassword"
                        id="currentPassword"
                        type="password"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <div class="mb-4">
                    <label
                        for="newPassword"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        New Password
                    </label>
                    <input
                        v-model="newPassword"
                        id="newPassword"
                        type="password"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <div class="mb-4">
                    <label
                        for="confirmNewPassword"
                        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                        Confirm New Password
                    </label>
                    <input
                        v-model="confirmNewPassword"
                        id="confirmNewPassword"
                        type="password"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <div class="flex justify-end">
                    <button
                        type="button"
                        @click="$emit('close')"
                        class="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { changePassword } from '@/api/auth';

export default defineComponent({
    name: 'PasswordDialog',
    props: {
        show: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['close', 'password-changed'],
    setup(props, { emit }) {
        const currentPassword = ref('');
        const newPassword = ref('');
        const confirmNewPassword = ref('');

        const handleChangePassword = async () => {
            if (newPassword.value !== confirmNewPassword.value) {
                console.error('New passwords do not match');
                return;
            }

            try {
                const response = await changePassword({
                    currentPassword: currentPassword.value,
                    newPassword: newPassword.value,
                });
                if (response.success) {
                    console.log('Password changed successfully');
                    emit('password-changed');
                    resetForm();
                } else {
                    console.error('Password change failed:', response.message);
                }
            } catch (error) {
                console.error('Error during password change:', error);
            }
        };

        const resetForm = () => {
            currentPassword.value = '';
            newPassword.value = '';
            confirmNewPassword.value = '';
        };

        return {
            currentPassword,
            newPassword,
            confirmNewPassword,
            handleChangePassword,
        };
    },
});
</script>
