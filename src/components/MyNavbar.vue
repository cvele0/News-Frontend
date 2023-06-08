<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Home page</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/mostRead" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Home'}">Most-read</router-link>
            </li>
              <li class="nav-item dropdown">
                  <b-dropdown id="categoryDropdown" text="Categories" variant="light">
                      <b-dropdown-item v-for="category in categories" :key="category.id" @click="selectCategory(category.id)">
                          {{ category.name }}
                      </b-dropdown-item>
                  </b-dropdown>
              </li>
          </ul>
          <form v-if="canLogout" class="d-flex" @submit.prevent="logout">
            <button class="btn btn-outline-secondary" type="submit">Logout</button>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { BDropdown, BDropdownItem } from 'bootstrap-vue'

export default {
    components: {
        BDropdown,
        BDropdownItem
    },
  name: "MyNavbar",
  computed: {
    canLogout() {
      return this.$route.name !== 'Login';
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt');
      this.$router.push({name: 'Login'});
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
        if (this.$route.params.id !== categoryId) {
            this.$router.push({ name: 'ByCategory', params: { id: categoryId } });
        }
    }
  },
  mounted() {
      this.fetchCategories(); // Fetch categories when the component is mounted
  },
  data() {
      return {
          categories: []
      }
  },
  created() {

  },
}
</script>

<style scoped>

</style>
