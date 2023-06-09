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
};
</script>