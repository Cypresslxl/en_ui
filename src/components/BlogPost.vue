<template>
    <div>
        <article>
            <section id="about">
                <h2>About Me</h2>
                <p>{{ about }}</p>
            </section>
            <section id="coding">
                <h2>Coding</h2>
                <p>{{ coding }}</p>
                <ul>
                    <li v-for="skill in codingSkills" :key="skill">
                        {{ skill }}
                    </li>
                </ul>
            </section>
            <section id="cycling">
                <h2>Cycling</h2>
                <p>{{ cycling }}</p>
            </section>
        </article>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const about = ref(
    "Hi, I'm Ethan Lai. I'm passionate about coding and love riding my bicycle in my free time."
);
const coding = ref(
    "Coding is not just my profession, it's my passion. I enjoy solving complex problems and creating efficient solutions."
);
const codingSkills = ref(['JavaScript', 'Vue.js', 'Python', 'Node.js', 'SQL']);
const cycling = ref(
    "When I'm not coding, you can find me exploring the city on my bicycle. Cycling helps me stay fit and gives me a fresh perspective on things."
);
</script>

<style scoped>
article {
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
    color: #0066cc;
    margin-top: 2rem;
}

ul {
    padding-left: 1rem;
}
</style>
