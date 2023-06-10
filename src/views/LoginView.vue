<template>
  <div class="pt-5">
    <h1 v-if="name">Hello, {{name}}</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="name">name</label>
        <input v-model="name" type="text" class="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name">
        <small id="nameHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary mt-2">Submit</button>
    </form>

    <div class="modal" :class="{ 'is-active': isPopupVisible }">
        <!-- Pop-up content -->
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class="box">
                <h2>Error logging</h2>
                <p>Invalid credentials</p>
                <button @click="closePopup">Close</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      name: '',
      password: '',
        isPopupVisible: false
    }
  },
  methods: {
    login() {
        this.$axios.post('/api/users/login', {
            name: this.name, // Update the property name to "name"
            password: this.password,
        })
            .then(response => {
                localStorage.setItem('jwt', response.data.jwt);
                this.$router.push({ name: 'home' });
            })
            .catch(error => {
                // Handle the error here
                console.error('Error occurred during login:', error);
                // Optionally, you can display an error message to the user
                this.errorMessage = 'An error occurred during login. Please try again.';
                this.showPopUp();
            });
    },
    showPopUp() {
        this.isPopupVisible = true;
    },
    closePopup() {
        this.isPopupVisible = false;
    }
  },
}
</script>

<style scoped>

</style>
