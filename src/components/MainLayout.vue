<template>
    <div
        class="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white"
    >
        <!-- Header -->
        <header
            class="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center"
        >
            <!-- Left side: Learning Records Button and Help Button -->
            <div class="flex items-center">
                <button
                    @click="toggleLearningRecords"
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Learning Records
                </button>
                <button
                    v-if="selectedRecord"
                    @click="openHelpDialog"
                    class="ml-5 px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                >
                    ?
                </button>
            </div>

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
        <!-- Main Content -->
        <main class="flex-grow relative overflow-hidden">
            <!-- Learning Records Sidebar -->
            <div
                class="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ease-in-out transform"
                :class="{ '-translate-x-full': !showLearningRecords }"
            >
                <h2 class="text-xl font-bold p-4 border-b dark:border-gray-700">
                    {{ language === 'en' ? 'Learning Records' : '学习记录' }}
                </h2>
                <ul class="p-4 space-y-2">
                    <li
                        v-for="record in learningRecords"
                        :key="record.id"
                        class="flex items-center justify-between"
                    >
                        <button
                            @click="selectRecord(record)"
                            class="flex-grow text-left p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            :class="{
                                'bg-blue-100 dark:bg-blue-900':
                                    selectedRecord === record,
                            }"
                        >
                            {{ record.title }}
                        </button>
                        <button
                            v-if="record.isChanged"
                            @click="saveRecord(record)"
                            class="ml-2 px-2 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        >
                            Save
                        </button>
                    </li>
                </ul>
            </div>

            <!-- Content Area -->
            <div
                class="p-8 transition-all duration-300 ease-in-out"
                :class="{ 'ml-64': showLearningRecords }"
            >
                <div v-if="selectedRecord">
                    <!-- Editable Title -->
                    <h1
                        class="text-3xl font-bold mb-6 cursor-text"
                        @dblclick="startEditing('title')"
                    >
                        <span v-if="!isEditing.title">{{
                            selectedRecord.title
                        }}</span>
                        <input
                            v-else
                            v-model="editableContent.title"
                            @blur="stopEditing('title')"
                            @keyup.enter="stopEditing('title')"
                            class="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500"
                            ref="titleInput"
                        />
                    </h1>

                    <!-- Editable Content -->
                    <div
                        class="prose dark:prose-invert max-w-none"
                        @dblclick="startEditing('content')"
                    >
                        <div
                            v-if="!isEditing.content"
                            v-html="selectedRecord.content"
                        ></div>
                        <div v-else class="relative">
                            <textarea
                                v-model="editableContent.content"
                                @blur="stopEditing('content')"
                                class="w-full min-h-[200px] bg-transparent border rounded p-2 focus:outline-none focus:border-blue-500"
                                ref="contentInput"
                            ></textarea>
                            <div
                                v-if="editableContent.content === ''"
                                class="absolute left-2 top-2 flex items-center space-x-2"
                            >
                                <button
                                    @click="openFormatMenu"
                                    class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p>
                        {{
                            language === 'en'
                                ? 'Select a learning record to view or edit.'
                                : '选择一个学习记录来查看或编辑。'
                        }}
                    </p>
                </div>
            </div>
        </main>

        <!-- Format Menu -->
        <div
            v-if="showFormatMenu"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl">
                <h3 class="text-lg font-bold mb-2">
                    {{ language === 'en' ? 'Choose Format' : '选择格式' }}
                </h3>
                <div class="space-y-2">
                    <button
                        @click="applyFormat('h1')"
                        class="block w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                        H1
                    </button>
                    <button
                        @click="applyFormat('h2')"
                        class="block w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                        H2
                    </button>
                    <button
                        @click="applyFormat('h3')"
                        class="block w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                        H3
                    </button>
                    <button
                        @click="applyFormat('p')"
                        class="block w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                        Plain Text
                    </button>
                </div>
                <h3 class="text-lg font-bold mt-4 mb-2">
                    {{ language === 'en' ? 'Font Size' : '字体大小' }}
                </h3>
                <div class="space-y-2">
                    <button
                        v-for="size in [10, 12, 14, 16, 18, 20]"
                        :key="size"
                        @click="applyFontSize(size)"
                        class="block w-full text-left px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                        {{ size }}px
                    </button>
                </div>
                <button
                    @click="closeFormatMenu"
                    class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    {{ language === 'en' ? 'Close' : '关闭' }}
                </button>
            </div>
        </div>

        <!-- Sign Up Dialog -->
        <!-- Sign Up Dialog -->
        <div
            v-if="showSignUpDialog"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            <div
                class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full"
            >
                <h2 class="text-2xl font-bold mb-4">Sign Up</h2>
                <form @submit.prevent="handleSignUp">
                    <div class="mb-4">
                        <label
                            for="signUpCredential"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Email or Username
                        </label>
                        <input
                            v-model="signUpCredential"
                            id="signUpCredential"
                            type="text"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div class="mb-4">
                        <label
                            for="signUpPassword"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Password
                        </label>
                        <input
                            v-model="signUpPassword"
                            id="signUpPassword"
                            type="password"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div class="mb-4">
                        <label
                            for="signUpPasswordConfirm"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Confirm Password
                        </label>
                        <input
                            v-model="signUpPasswordConfirm"
                            id="signUpPasswordConfirm"
                            type="password"
                            required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div v-if="passwordError" class="text-red-500 text-sm mb-4">
                        {{ passwordError }}
                    </div>
                    <div v-if="signUpAttempts >= 3" class="mb-4">
                        <label
                            for="captcha"
                            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Verification Code
                        </label>
                        <div class="flex items-center">
                            <input
                                v-model="captchaInput"
                                id="captcha"
                                type="text"
                                required
                                class="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            <img
                                :src="captchaImage"
                                alt="Captcha"
                                class="ml-2 h-10 w-32 object-cover"
                                @click="refreshCaptcha"
                            />
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <button
                            type="button"
                            @click="closeSignUpDialog"
                            class="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
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
                <form @submit.prevent="handleLogin">
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

        <!-- Help Dialog -->
        <HelpDialog
            :show="showHelpDialog"
            :title="helpDialogTitle"
            :instructions="helpInstructions"
            :closeButtonText="helpCloseButtonText"
            @close="closeHelpDialog"
        />
    </div>
</template>

<script setup>
import { ref, watch, nextTick, computed } from 'vue';
import HelpDialog from '@/components/common/HelpDialog.vue';
import { signUp, login, SignUpData, LoginData } from '@/api/auth';

const showLearningRecords = ref(false);
const selectedRecord = ref(null);
const language = ref('en');
const isDarkMode = ref(false);

const showSignUpDialog = ref(false);
const showLoginDialog = ref(false);
const signUpCredential = ref('');

//Sign up dialog
const signUpPassword = ref('');
const signUpPasswordConfirm = ref('');
const passwordError = ref('');
const signUpAttempts = ref(0);
const captchaInput = ref('');
const captchaImage = ref('');
const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 12;

    return hasUpperCase && hasLowerCase && isLongEnough;
};

const loginCredential = ref('');
const loginPassword = ref('');

const isEditing = ref({ title: false, content: false });
const editableContent = ref({ title: '', content: '' });
const showFormatMenu = ref(false);
const showHelpDialog = ref(false);

const titleInput = ref(null);
const contentInput = ref(null);

const learningRecords = ref([
    {
        id: 1,
        title: 'Vue 3',
        content: '<p>Vue 3 learning content...</p>',
        isChanged: false,
    },
    {
        id: 2,
        title: 'JavaScript',
        content: '<p>JavaScript learning content...</p>',
        isChanged: false,
    },
    {
        id: 3,
        title: 'Go',
        content: '<p>Go learning content...</p>',
        isChanged: false,
    },
    {
        id: 4,
        title: 'PostgreSQL',
        content: '<p>PostgreSQL learning content...</p>',
        isChanged: false,
    },
]);

const helpDialogTitle = computed(() =>
    language.value === 'en' ? 'Editing Instructions' : '编辑说明'
);
const helpInstructions = computed(() => [
    language.value === 'en'
        ? 'Use <p>...</p> for paragraphs'
        : '使用 <p>...</p> 来创建段落',
    language.value === 'en'
        ? 'Use <h1>...</h1> to <h6>...</h6> for headings'
        : '使用 <h1>...</h1> 到 <h6>...</h6> 来创建标题',
    language.value === 'en'
        ? 'Use <ul> and <li> for unordered lists'
        : '使用 <ul> 和 <li> 来创建无序列表',
    language.value === 'en'
        ? 'Use <ol> and <li> for ordered lists'
        : '使用 <ol> 和 <li> 来创建有序列表',
    language.value === 'en'
        ? 'Use <a href="...">...</a> for links'
        : '使用 <a href="...">...</a> 来创建链接',
]);
const helpCloseButtonText = computed(() =>
    language.value === 'en' ? 'Close' : '关闭'
);

const toggleLearningRecords = () => {
    showLearningRecords.value = !showLearningRecords.value;
    if (!showLearningRecords.value) {
        selectedRecord.value = null;
    }
};

const selectRecord = (record) => {
    selectedRecord.value = record;
    editableContent.value = { title: record.title, content: record.content };
};

const startEditing = (field) => {
    isEditing.value[field] = true;
    nextTick(() => {
        if (field === 'title' && titleInput.value) {
            titleInput.value.focus();
        } else if (field === 'content' && contentInput.value) {
            contentInput.value.focus();
        }
    });
};

const stopEditing = (field) => {
    isEditing.value[field] = false;
    if (selectedRecord.value) {
        if (selectedRecord.value[field] !== editableContent.value[field]) {
            selectedRecord.value[field] = editableContent.value[field];
            selectedRecord.value.isChanged = true;
        }
    }
};

const saveRecord = async (record) => {
    try {
        // Simulating a backend request
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Saving record:', record);
        record.isChanged = false;
        // You would typically update the backend here
    } catch (error) {
        console.error('Error saving record:', error);
    }
};

const openFormatMenu = () => {
    showFormatMenu.value = true;
};

const closeFormatMenu = () => {
    showFormatMenu.value = false;
};

const openHelpDialog = () => {
    showHelpDialog.value = true;
};

const closeHelpDialog = () => {
    showHelpDialog.value = false;
};

const applyFormat = (format) => {
    const content = editableContent.value.content;
    editableContent.value.content = `<${format}>${content}</${format}>`;
    closeFormatMenu();
};

const applyFontSize = (size) => {
    const content = editableContent.value.content;
    editableContent.value.content = `<span style="font-size: ${size}px;">${content}</span>`;
    closeFormatMenu();
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
    signUpPasswordConfirm.value = '';
    passwordError.value = '';
    signUpAttempts.value = 0;
    captchaInput.value = '';
};

const handleSignUp = async () => {
    if (signUpPassword.value !== signUpPasswordConfirm.value) {
        passwordError.value = 'Passwords do not match';
        return;
    }

    if (!validatePassword(signUpPassword.value)) {
        passwordError.value =
            'Password must contain both uppercase and lowercase letters, and be at least 12 characters long';
        return;
    }

    if (signUpAttempts.value >= 3 && captchaInput.value !== 'CAPTCHA') {
        // Replace 'CAPTCHA' with actual verification
        passwordError.value = 'Invalid verification code';
        refreshCaptcha();
        return;
    }

    const signUpData = {
        credential: signUpCredential.value || '',
        password: signUpPassword.value || '',
    };

    try {
        const response = await signUp(signUpData);
        if (response.success) {
            console.log('Sign up successful:', response.message);
            // Handle successful sign up (e.g., show success message, auto-login, etc.)
            closeSignUpDialog();
        } else {
            console.error('Sign up failed:', response.message);
            passwordError.value = response.message;
            signUpAttempts.value++;
            if (signUpAttempts.value >= 3) {
                refreshCaptcha();
            }
        }
    } catch (error) {
        console.error('Error during sign up:', error);
        passwordError.value =
            'An error occurred during sign up. Please try again.';
        signUpAttempts.value++;
        if (signUpAttempts.value >= 3) {
            refreshCaptcha();
        }
    }
};

const handleLogin = async () => {
    const loginData = {
        credential: loginCredential.value || '',
        password: loginPassword.value || '',
    };

    try {
        const response = await login(loginData);
        if (response.success) {
            console.log('Login successful:', response.message);
            // Handle successful login (e.g., store token, update UI, etc.)
            closeLoginDialog();
        } else {
            console.error('Login failed:', response.message);
            // Handle login failure (e.g., show error message)
        }
    } catch (error) {
        console.error('Error during login:', error);
        // Handle error (e.g., show error message)
    }
};

const refreshCaptcha = () => {
    // In a real application, you would generate a new captcha image here
    // For this example, we'll just use a placeholder
    captchaImage.value = `/placeholder.svg?height=40&width=120&text=CAPTCHA`;
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

<style>
/* Add any additional styles here if needed */
.prose {
    max-width: none;
}
</style>
