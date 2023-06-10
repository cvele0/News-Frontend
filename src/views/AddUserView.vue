<template>
    <div class="user-form">
        <h2 class="title">Add New User</h2>
        <form @submit.prevent="addUser">
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
                <label for="status">Password:</label>
                <input type="password" id="password" v-model="user.hashedPassword" required>
            </div>
            <button type="submit" class="btn btn-primary">Add User</button>
        </form>
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
        addUser() {
            // Make the Axios request to your backend API
            this.$axios
                .post("/api/users", this.user, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}` // Add the token to the request headers
                    }
                })
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    // Handle the response if needed
                    console.log("User added successfully!");
                    // Reset the form
                    this.user.name = "";
                    this.user.surname = "";
                    this.user.email = "";
                    this.user.type = "";
                    this.user.status = "";
                    this.user.hashedPassword = "";
                    this.$router.push({ name: "Users" });
                })
                .catch(error => {
                    // Handle the error if needed
                    console.error("Failed to add user:", error);
                });
        }
    }
};
</script>

<style>
.user-form {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
}

.title {
    text-align: left;
    margin-top: 20px; /* Add margin top value here */
}

h2 {
    text-align: left;
}

.form-group {
    margin-bottom: 20px;
    text-align: left;
}

label {
    display: block;
    font-weight: bold;
    text-align: left;
}

input[type="text"],
input[type="email"] {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    text-align: left;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
}

button:hover {
    background-color: #0056b3;
}
</style>
