<template>
    <header>
        <h1>{{ title }}</h1>
        <nav>
            <ul>
                <li v-for="item in navItems" :key="item">
                    <a href="#" @click.prevent="scrollTo(item)">{{ item }}</a>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup>
import { ref } from 'vue';

const title = ref("Ethan Lai's Blog");
const navItems = ref(['About', 'Coding', 'Cycling']);

const scrollTo = (section) => {
    const element = document.getElementById(section.toLowerCase());
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};
</script>

<style scoped>
header {
    background-color: #f4f4f4;
    padding: 1rem;
    margin-bottom: 2rem;
}

h1 {
    color: #333;
}

nav ul {
    list-style-type: none;
    padding: 0;
}

nav ul li {
    display: inline;
    margin-right: 1rem;
}

nav ul li a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
}

nav ul li a:hover {
    color: #0066cc;
}
</style>
