<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
<!--                <a class="navbar-brand" href="/categories">Categories</a>-->
                <router-link to="/categories" class="navbar-brand">Categories</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
<!--                        <li class="nav-item">-->
<!--                            <router-link to="/cmsNews" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Home'}">News</router-link>-->
<!--                        </li>-->
                        <li class="nav-item dropdown">
                            <router-link to="/users" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Home'}">Users</router-link>
                        </li>
                    </ul>
                    <button @click="changeNavbarType" class="navbar-button"> PORTAL </button>
                    <form class="d-flex" @submit.prevent="login" v-if="!isLoggedIn">
                        <button class="btn btn-success ms-2" type="submit">Login</button>
                    </form>
                    <form class="d-flex" @submit.prevent="logout" v-else>
                        <button class="btn btn-danger login-button" type="submit">Logout</button>
                    </form>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>

export default {
    components: {

    },
    name: "CmsNavbar",
    computed: {
        canLogout() {
            const jwt = localStorage.getItem('jwt');
            return jwt !== null && jwt.length > 0;
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('jwt');
            this.loggedIn = false;
            this.$router.push({name: 'Login'});
        },
        login() {
            this.$router.push({ name: 'Login' });
        },
        fetchCategories() {
            this.$axios.get('/api/categories') // Replace '/api/categories' with your actual API endpoint
                .then(response => {
                    this.categories = response.data; // Update the categories array with the fetched data
                })
                .catch(error => {
                    console.error(error);
                });
        },
        selectCategory(categoryId) {
            const currentRoute = this.$router.currentRoute;

            // Check if the selected category is already the current route
            if (currentRoute.params.id === categoryId.toString()) {
                // Category is already selected, no need to navigate again
                return;
            }
            if (this.$route.params.id !== categoryId) {
                this.$router.push({ name: 'ByCategory', params: { id: categoryId } });
            }
        },
        changeNavbarType() {
            // Emit the custom event
            this.$emit('change-navbar-type');
            this.$router.push({ name: 'home' });
        },
    },
    mounted() {
        this.fetchCategories(); // Fetch categories when the component is mounted
        this.isLoggedIn = localStorage.getItem('jwt') !== null;
    },
    data() {
        return {
            categories: [],
            isLoggedIn: false
        }
    },
}
</script>

<style scoped>
.navbar-button {
    margin-right: 10px;
}

form {
    margin-left: 10px;
}

form button {
    margin-left: 10px;
}

.btn-outline-danger {
    border-color: red;
    color: red;
}

.btn-outline-success {
    border-color: green;
    color: green;
}
</style>
