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
                            <router-link to="/mostRead" tag="a" class="nav-link" :class="{active: $route.name === 'MostRead'}">Most-read</router-link>
                        </li>
                        <li class="nav-item dropdown">
                            <b-dropdown id="categoryDropdown" text="Categories" variant="light">
                                <b-dropdown-item v-for="category in categories" :key="category.id" @click="selectCategory(category.id)">
                                    {{ category.name }}
                                </b-dropdown-item>
                            </b-dropdown>
                        </li>
                    </ul>
                    <button @click="changeNavbarType" class="navbar-button"> CMS </button>
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
import { BDropdown, BDropdownItem } from 'bootstrap-vue'

export default {
    components: {
        BDropdown,
        BDropdownItem
    },
  name: "MyNavbar",
  computed: {
      canLogout() {
          const jwt = localStorage.getItem('jwt');
          return jwt !== null && jwt.length > 0;
      }
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt');
      this.isLoggedIn = false;
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
        const jwt = localStorage.getItem('jwt');

        // Decode the JWT to extract the payload
        const jwtPayload = jwt.split('.')[1];
        const decodedPayload = JSON.parse(atob(jwtPayload));

        // Retrieve the "type" attribute from the payload
        const type = decodedPayload.type;

        // Use the "type" attribute as needed
        if (type !== 'admin' && type !== 'content-creator') {
            this.$toasted.show('Access denied. You do not have the required permissions.', {
                theme: 'my-navbar-toast' // Use the registered toast theme
            });
            setTimeout(() => {
                this.$toasted.clear(); // Dismiss the toast after the specified duration
            }, 3000); // Adjust the duration as needed (in milliseconds)
            return;
        }
        this.$emit('change-navbar-type'); // Emit the custom event
        this.$router.push({name: 'Categories'});
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
  created() {
      this.$toasted.register('my-navbar-toast', message => {
          return message; // Modify this as per your toast notification component or styling
      }, {
          type: 'error', // Type of the toast (error, success, info, etc.)
          duration: 3000, // Duration to show the toast in milliseconds (3 seconds in this example)
          position: 'top-right', // Position of the toast notification
          action: {
              text: 'Close',
              onClick: (e, toastObject) => {
                  toastObject.goAway(0); // Dismiss the toast when the "Close" button is clicked
              }
          },
          className: 'my-navbar-toast' // Custom CSS class for the toast
      });
  },
}
</script>

<style scooped>
.navbar-button {
    margin-right: 10px;
}

.login-button {
    background-color: green;
    color: white;
}

.logout-button {
    background-color: blue;
    color: white;
}

.login-button:hover,
.logout-button:hover {
    opacity: 0.8;
}

.login-button:focus,
.logout-button:focus {
    outline: none;
    box-shadow: none;
}

.login-button:active,
.logout-button:active {
    transform: translateY(1px);
}

.my-navbar-toast {
    background-color: #fa3e3e;
    color: white;
    font-family: Amiri;
    font-weight: bolder;
    font-weight: bold;
}
</style>
