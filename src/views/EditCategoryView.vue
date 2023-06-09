<!--<template>-->
<!--    <div class="category-form">-->
<!--        <h2 class="title">Edit Category</h2>-->
<!--        <form @submit.prevent="updateCategory">-->
<!--            <div class="form-group">-->
<!--                <label for="name">Name:</label>-->
<!--                <input type="text" id="name" v-model="category.name" required>-->
<!--            </div>-->
<!--            <div class="form-group">-->
<!--                <label for="description">Description:</label>-->
<!--                <textarea id="description" v-model="category.description" required></textarea>-->
<!--            </div>-->
<!--            <button type="submit" class="btn btn-primary">Update Category</button>-->
<!--        </form>-->
<!--    </div>-->
<!--</template>-->

<template>
    <div class="category-form">
        <h2 class="title">Edit Category</h2>
        <form @submit.prevent="updateCategory">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="category.name" required>
            </div>
            <div class="form-group">
                <label for="description">Description:</label>
                <textarea id="description" v-model="category.description" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Update Category</button>
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
        fetchCategory() {
            const categoryId = this.$route.params.id;
            // Make the Axios request to fetch the category data from the backend
            this.$axios.get(`/api/categories/${categoryId}`)
                .then(response => {
                    // Populate the form fields with the fetched category data
                    // this.category = response.data;
                    const { name, description } = response.data;
                    this.$set(this.category, 'name', name);
                    this.$set(this.category, 'description', description);
                })
                .catch(error => {
                    // Handle the error if needed
                    console.error('Failed to fetch category:', error);
                });
        },
        updateCategory() {
            const categoryId = this.$route.params.id;
            // Make the Axios request to update the category data on the backend
            this.$axios.put(`/api/categories/${categoryId}`, this.category)
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    // Handle the response if needed
                    console.log('Category updated successfully!');
                    this.$router.push({ name: 'Categories' });
                })
                .catch(error => {
                    // Handle the error if needed
                    console.error('Failed to update category:', error);
                });
        }
    },
    mounted() {
        // Fetch the category data when the component is mounted
        this.fetchCategory();
    },
    beforeMount() {
        // this.fetchCategory();
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
    text-align: center;
    margin-top: 20px; /* Add margin-top value here */
}

h2 {
    text-align: center;
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
