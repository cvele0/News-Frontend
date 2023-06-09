<!--<template>-->
<!--    <div>-->
<!--        <h2>Add New Category</h2>-->
<!--        <form @submit.prevent="addCategory">-->
<!--            <div>-->
<!--                <label for="name">Name:</label>-->
<!--                <input type="text" id="name" v-model="category.name" required>-->
<!--            </div>-->
<!--            <div>-->
<!--                <label for="description">Description:</label>-->
<!--                <textarea id="description" v-model="category.description" required></textarea>-->
<!--            </div>-->
<!--            <button type="submit">Add Category</button>-->
<!--        </form>-->
<!--    </div>-->
<!--</template>-->


<template>
    <div class="category-form">
        <h2 class="title">Add New Category</h2>
        <form @submit.prevent="addCategory">
        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="category.name" required>
        </div>
        <div class="form-group">
            <label for="description">Description:</label>
            <textarea id="description" v-model="category.description" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Add Category</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            category: {
                name: '',
                description: ''
            }
        };
    },
    methods: {
        addCategory() {
            // Make the Axios request to your backend API
            this.$axios.post('/api/categories', this.category)
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    // Handle the response if needed
                    console.log('Category added successfully!');
                    // Reset the form
                    this.category.name = '';
                    this.category.description = '';
                    this.$router.push({ name: 'Categories' });
                })
                .catch(error => {
                    // Handle the error if needed
                    console.error('Failed to add category:', error);
                });
        }
    }
};
</script>

<style>
.category-form {
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
textarea {
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