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
        <button @click="deleteCategory" class="btn btn-danger">Delete Category</button>

        <div class="modal" :class="{ 'is-active': isPopupVisible }">
            <!-- Pop-up content -->
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <h2>Cannot delete category</h2>
                    <p>There are news with this category</p>
                    <button @click="closePopup">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            category: {
                name: '',
                description: '',
            },
            isPopupVisible: false
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
        },
        deleteCategory() {
            const categoryId = this.$route.params.id;
            // Make the Axios request to check if news by category ID is empty
            this.$axios.get(`/api/news/byCategory/${categoryId}`)
                .then(response => {
                    if (response.data.length === 0) {
                        // The result is empty, proceed with category deletion
                        // Make the Axios request to delete the category on the backend
                        this.$axios.delete(`/api/categories/${categoryId}`)
                            // eslint-disable-next-line no-unused-vars
                            .then(response => {
                                // Handle the response if needed
                                console.log('Category deleted successfully!');
                                this.$router.push({ name: 'Categories' });
                            })
                            .catch(error => {
                                // Handle the error if needed
                                console.error('Failed to delete category:', error);
                            });
                    } else {
                        // The result is not empty, show a warning message or take alternative action
                        this.showPopup();
                        console.log('Cannot delete category. News articles exist in this category.');
                    }
                })
                .catch(error => {
                    // Handle the error if needed
                    console.error('Failed to fetch news by category:', error);
                });
        },
        showPopup() {
            this.isPopupVisible = true; // Show the pop-up
        },
        closePopup() {
            this.isPopupVisible = false; // Close the pop-up
        },
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

.modal {
    display: none;
}

.modal.is-active {
    display: block;
}

.modal-background {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
}

.box {
    margin-bottom: 20px;
}
</style>
