<template>
    <div class="user-form">
        <h2 class="title">Edit User</h2>
        <form @submit.prevent="updateUser">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="user.name" required>
            </div>
            <div class="form-group">
                <label for="surname">Surname:</label>
                <input type="text" id="surname" v-model="user.surname" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="user.email" required>
            </div>
            <div class="form-group">
                <label for="type">Type:</label>
                <input type="text" id="type" v-model="user.type" required>
            </div>
            <div class="form-group">
                <label for="status">Status:</label>
                <input type="text" id="status" v-model="user.status" required>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="user.hashedPassword" required>
            </div>
            <button type="submit" class="btn btn-primary">Update User</button>
        </form>
        <button @click="deleteUser" class="btn btn-danger">Delete User</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                name: "",
                surname: "",
                email: "",
                type: "",
                status: "",
                hashedPassword: ""
            }
        };
    },
    methods: {
        fetchUser() {
            const userId = this.$route.params.id;
            // Make the Axios request to fetch the user data from the backend
            this.$axios
                .get(`/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}` // Add the token to the request headers
                    }
                })
                .then(response => {
                    // Populate the form fields with the fetched user data
                    const { name, surname, email, type, status, hashedPassword } = response.data;
                    this.user.name = name;
                    this.user.surname = surname;
                    this.user.email = email;
                    this.user.type = type;
                    this.user.status = status;
                    this.user.hashedPassword = hashedPassword;
                })
                .catch(error => {
                    // Handle the error if needed
                    console.error('Failed to fetch user:', error);
                });
        },
        updateUser() {
            const userId = this.$route.params.id;
            // Make the Axios request to update the user data on the backend
            this.$axios
                .put(`/api/users/${userId}`, this.user, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}` // Add the token to the request headers
                    }
                })
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    // Handle the response if needed
                    console.log('User updated successfully!');
                    this.$router.push({ name: 'Users' });
                })
                .catch(error => {
                    // Handle the error if needed
                    console.error('Failed to update user:', error);
                });
        },
        deleteUser() {
            const userId = this.$route.params.id;
            // Make the Axios request to delete the user on the backend
            this.$axios
                .delete(`/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}` // Add the token to the request headers
                    }
                })
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    // Handle the response if needed
                    console.log('User deleted successfully!');
                    this.$router.push({ name: 'Users' });
                })
                .catch(error => {
                    // Handle the error if needed
                    console.error('Failed to delete user:', error);
                });
        }
    },
    mounted() {
        // Fetch the user data when the component is mounted
        this.fetchUser();
    }
};
</script>

<style>
/* Styles for the user form go here */
</style>
