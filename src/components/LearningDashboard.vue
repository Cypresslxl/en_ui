<template>
    <div class="flex h-screen bg-gray-100">
        <!-- Foldable left column -->
        <div
            :class="[
                'transition-all duration-300 ease-in-out bg-white shadow-lg',
                isOpen ? 'w-64' : 'w-16',
            ]"
        >
            <button
                @click="toggleSidebar"
                class="w-full p-4 text-left text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                :aria-expanded="isOpen"
                aria-controls="sidebar-content"
            >
                <span class="sr-only">{{
                    isOpen ? 'Close sidebar' : 'Open sidebar'
                }}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-6 h-6 inline-block"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
                <span :class="['ml-2', { hidden: !isOpen }]"
                    >Learning Records</span
                >
            </button>
            <div id="sidebar-content" v-show="isOpen" class="p-4">
                <h2 class="text-xl font-bold mb-4">Topics</h2>
                <ul class="space-y-2">
                    <li v-for="topic in topics" :key="topic.name">
                        <button
                            @click="selectTopic(topic)"
                            class="w-full text-left p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            :class="{ 'bg-blue-100': topic === selectedTopic }"
                        >
                            {{ topic.name }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Main content area -->
        <div class="flex-1 p-8">
            <h1 class="text-3xl font-bold mb-6">{{ pageTitle }}</h1>
            <div v-if="selectedTopic">
                <h2 class="text-2xl font-semibold mb-4">
                    {{ selectedTopic.name }} Learning Records
                </h2>
                <ul class="list-disc pl-5 space-y-2">
                    <li v-for="record in selectedTopic.records" :key="record">
                        {{ record }}
                    </li>
                </ul>
            </div>
            <div v-else>
                <p>
                    Select a topic from the sidebar to view your learning
                    records.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const pageTitle = "Ethan Lai's Learning Dashboard";

const isOpen = ref(true);
const selectedTopic = ref(null);

const topics = ref([
    {
        name: 'Vue 3',
        records: [
            'Learned about Composition API',
            'Practiced with reactive refs',
            'Built a custom directive',
        ],
    },
    {
        name: 'JavaScript',
        records: [
            'Studied ES6+ features',
            'Implemented async/await patterns',
            'Explored functional programming concepts',
        ],
    },
    {
        name: 'Go',
        records: [
            'Set up Go development environment',
            'Wrote first Go program',
            'Learned about goroutines and channels',
        ],
    },
    {
        name: 'PostgreSQL',
        records: [
            'Installed PostgreSQL',
            'Created first database and table',
            'Practiced writing complex queries',
        ],
    },
]);

const toggleSidebar = () => {
    isOpen.value = !isOpen.value;
};

const selectTopic = (topic) => {
    selectedTopic.value = topic;
};
</script>

<style scoped>
/* Any additional component-specific styles can go here */
</style>
