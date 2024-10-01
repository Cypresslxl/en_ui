<template>
    <div
        class="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white"
    >
        <!-- Header -->
        <header
            class="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center"
        >
            <!-- Left side: Learning Records Button -->
            <button
                @click="toggleLearningRecords"
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Learning Records
            </button>

            <!-- Right side: Language, Theme, Sign Up, Sign In -->
            <div class="flex items-center space-x-4">
                <!-- Language Toggle -->
                <button
                    @click="toggleLanguage"
                    class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    :title="
                        language === 'en'
                            ? 'Switch to Chinese'
                            : 'Switch to English'
                    "
                >
                    <span v-if="language === 'en'" class="text-xl">🇺🇸</span>
                    <span v-else class="text-xl">🇨🇳</span>
                </button>

                <!-- Theme Toggle -->
                <button
                    @click="toggleTheme"
                    class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    :title="
                        isDarkMode
                            ? 'Switch to Light Mode'
                            : 'Switch to Dark Mode'
                    "
                >
                    <svg
                        v-if="isDarkMode"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                    </svg>
                    <svg
                        v-else
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                    </svg>
                </button>

                <!-- Sign Up Button -->
                <button
                    @click="openSignUpDialog"
                    class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                    {{ language === 'en' ? 'Sign Up' : '注册' }}
                </button>

                <!-- Sign In Button -->
                <button
                    @click="openLoginDialog"
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    {{ language === 'en' ? 'Log In' : '登录' }}
                </button>
            </div>
        </header>

        <!-- Main Content -->
        <main class="flex-grow relative">
            <!-- Learning Records Sidebar -->
            <div
                v-if="showLearningRecords"
                class="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform transform"
                :class="{ '-translate-x-full': !showLearningRecords }"
            >
                <h2 class="text-xl font-bold p-4 border-b dark:border-gray-700">
                    {{ language === 'en' ? 'Learning Records' : '学习记录' }}
                </h2>
                <ul class="p-4 space-y-2">
                    <li v-for="record in learningRecords" :key="record.id">
                        <button
                            @click="selectRecord(record)"
                            class="w-full text-left p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            :class="{
                                'bg-blue-100 dark:bg-blue-900':
                                    selectedRecord === record,
                            }"
                        >
                            {{ record.title }}
                        </button>
                    </li>
                </ul>
            </div>

            <!-- Content Area -->
            <div class="p-8" :class="{ 'ml-64': showLearningRecords }">
                <h1 class="text-3xl font-bold mb-6">
                    {{
                        selectedRecord
                            ? selectedRecord.title
                            : language === 'en'
                            ? 'Welcome to My Blog'
                            : '欢迎来到我的博客'
                    }}
                </h1>
                <div v-if="selectedRecord">
                    <p>{{ selectedRecord.content }}</p>
                </div>
                <div v-else>
                    <p>
                        {{
                            language === 'en'
                                ? 'This is the main blog content.'
                                : '这是主要的博客内容。'
                        }}
                    </p>
                </div>
            </div>
        </main>

        <!-- Sign Up Dialog -->
        <div
            v-if="showSignUpDialog"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div
                class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full"
            >
                <h2 class="text-2xl font-bold mb-4">
                    {{ language === 'en' ? 'Sign Up' : '注册' }}
                </h2>
                <form @submit.prevent="submitSignUp">
                    <div class="mb-4">
                        <label class="block mb-2">{{
                            language === 'en' ? 'Email or Phone' : '邮箱或手机'
                        }}</label>
                        <input
                            v-model="signUpCredential"
                            type="text"
                            class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">{{
                            language === 'en' ? 'Password' : '密码'
                        }}</label>
                        <input
                            v-model="signUpPassword"
                            type="password"
                            class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        class="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    >
                        {{ language === 'en' ? 'Sign Up' : '注册' }}
                    </button>
                </form>
                <button
                    @click="closeSignUpDialog"
                    class="mt-4 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                    {{ language === 'en' ? 'Close' : '关闭' }}
                </button>
            </div>
        </div>

        <!-- Login Dialog -->
        <div
            v-if="showLoginDialog"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div
                class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full"
            >
                <h2 class="text-2xl font-bold mb-4">
                    {{ language === 'en' ? 'Log In' : '登录' }}
                </h2>
                <form @submit.prevent="submitLogin">
                    <div class="mb-4">
                        <label class="block mb-2">{{
                            language === 'en' ? 'Email or Phone' : '邮箱或手机'
                        }}</label>
                        <input
                            v-model="loginCredential"
                            type="text"
                            class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label class="block mb-2">{{
                            language === 'en' ? 'Password' : '密码'
                        }}</label>
                        <input
                            v-model="loginPassword"
                            type="password"
                            class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        {{ language === 'en' ? 'Log In' : '登录' }}
                    </button>
                </form>
                <button
                    @click="closeLoginDialog"
                    class="mt-4 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                    {{ language === 'en' ? 'Close' : '关闭' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const showLearningRecords = ref(false);
const selectedRecord = ref(null);
const language = ref('en');
const isDarkMode = ref(false);

const showSignUpDialog = ref(false);
const showLoginDialog = ref(false);
const signUpCredential = ref('');
const signUpPassword = ref('');
const loginCredential = ref('');
const loginPassword = ref('');

const learningRecords = ref([
    { id: 1, title: 'Vue 3', content: 'Vue 3 learning content...' },
    { id: 2, title: 'JavaScript', content: 'JavaScript learning content...' },
    { id: 3, title: 'Go', content: 'Go learning content...' },
    { id: 4, title: 'PostgreSQL', content: 'PostgreSQL learning content...' },
]);

const toggleLearningRecords = () => {
    showLearningRecords.value = !showLearningRecords.value;
    if (!showLearningRecords.value) {
        selectedRecord.value = null;
    }
};

const selectRecord = (record) => {
    selectedRecord.value = record;
};

const toggleLanguage = () => {
    language.value = language.value === 'en' ? 'zh' : 'en';
};

const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.classList.toggle('dark');
};

const openSignUpDialog = () => {
    showSignUpDialog.value = true;
};

const closeSignUpDialog = () => {
    showSignUpDialog.value = false;
    signUpCredential.value = '';
    signUpPassword.value = '';
};

const submitSignUp = () => {
    console.log(
        'Sign up submitted:',
        signUpCredential.value,
        signUpPassword.value
    );
    // Implement your sign-up logic here
    closeSignUpDialog();
};

const openLoginDialog = () => {
    showLoginDialog.value = true;
};

const closeLoginDialog = () => {
    showLoginDialog.value = false;
    loginCredential.value = '';
    loginPassword.value = '';
};

const submitLogin = () => {
    console.log('Login submitted:', loginCredential.value, loginPassword.value);
    // Implement your login logic here
    closeLoginDialog();
};

// Watch for changes in isDarkMode and update the class on the html element
watch(
    isDarkMode,
    (newValue) => {
        if (newValue) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    },
    { immediate: true }
);
</script>
