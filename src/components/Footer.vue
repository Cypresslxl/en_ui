<template>
    <footer>
        <p>{{ copyright }}</p>
        <div class="social-links">
            <a
                v-for="link in socialLinks"
                :key="link.name"
                :href="link.url"
                target="_blank"
                >{{ link.name }}</a
            >
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue';

const copyright = ref(
    `© ${new Date().getFullYear()} Ethan Lai. All rights reserved.`
);
const socialLinks = ref([
    { name: 'GitHub', url: 'https://github.com/ethanlai' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/ethanlai' },
    { name: 'Twitter', url: 'https://twitter.com/ethanlai' },
]);
</script>

<style scoped>
footer {
    background-color: #f4f4f4;
    padding: 1rem;
    text-align: center;
    margin-top: 2rem;
}

.social-links {
    margin-top: 1rem;
}

.social-links a {
    margin: 0 0.5rem;
    color: #0066cc;
    text-decoration: none;
}

.social-links a:hover {
    text-decoration: underline;
}
</style>
