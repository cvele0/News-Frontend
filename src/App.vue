<template>
  <div id="app">
      <MyNavbar v-if="navbarType === 'portal'" @change-navbar-type="changeNavbarType" />
      <CmsNavbar v-else @change-navbar-type="changeNavbarType" />
<!--    <nav>-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link> |-->
<!--        <router-link to="/login">Login</router-link>-->
<!--    </nav>-->
    <router-view/>
  </div>
</template>

<script>

import MyNavbar from "@/components/MyNavbar.vue";
import CmsNavbar from "@/components/CmsNavbar.vue";

export default {
    data() {
        return {
            navbarType: localStorage.getItem('navbarType') || 'portal'
        };
    },
    methods: {
        changeNavbarType() {
            if (this.navbarType === 'portal') {
                this.navbarType = 'cms';
                localStorage.setItem('navbarType', this.navbarType); // Store the updated navbar type in localStorage
            } else {
                this.navbarType = 'portal';
                localStorage.setItem('navbarType', this.navbarType); // Store the updated navbar type in localStorage
            }
        }
    },
    components: {
        MyNavbar,
        CmsNavbar,
    },
    created() {
        // Check if navbarType is already stored in localStorage
        const storedNavbarType = localStorage.getItem('navbarType');

        if (storedNavbarType) {
            // If navbarType is stored in localStorage, assign it to the component's data
            this.navbarType = storedNavbarType;
        } else {
            // If navbarType is not stored in localStorage, set it to "portal"
            this.navbarType = 'portal';
            localStorage.setItem('navbarType', 'portal'); // Store the initial navbar type in localStorage
        }
    },
};
</script>