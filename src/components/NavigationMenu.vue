<template>
    <nav>
        <router-link to="/">Home Page</router-link> |
        <router-link to="/most-read">Najčitanije</router-link> |
        <router-link v-for="category in categories" :key="category.id" :to="'/category/' + category.id">{{ category.name }}</router-link>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            categories: [
                { id: 1, name: "Sport" },
                { id: 2, name: "Politika" },
                { id: 3, name: "Kultura" },
            ],
        };
    },
};
</script>