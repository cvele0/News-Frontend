<template>
  <div id="app">
      <MyNavbar/>
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

export default {
    components: {MyNavbar},
}
</script>