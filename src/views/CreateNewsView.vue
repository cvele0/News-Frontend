<template>
    <div class="news-form">
        <h2 class="title">Add New News</h2>
        <form @submit.prevent="addNews">
            <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="news.title" required>
            </div>
            <div class="form-group">
                <label for="text">Text:</label>
                <textarea id="text" v-model="news.text" required></textarea>
            </div>
            <div class="form-group">
                <label for="author">Author:</label>
                <input type="text" id="author" v-model="news.author" required>
            </div>
            <div class="form-group">
                <label for="category">Category:</label>
                <select id="category" v-model="news.categoryId" required>
                    <option v-for="category in categories" :value="category.id" :key="category.id">{{ category.name }}</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Add News</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            news: {
                title: '',
                text: '',
                author: '',
                categoryId: '',
                timeCreated: ''
            },
            categories: [] // Assuming you have an array of categories to populate the dropdown
        };
    },
    methods: {
        addNews() {
            // Make the Axios request to your backend API
            this.$axios.post('/api/news', {
                title: this.news.title,
                text: this.news.text,
                timeCreated: new Date().toISOString(),
                author: this.news.author,
                viewCount: 0,
                category: {
                    id: this.news.categoryId
                }
            })
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    // Handle the response if needed
                    console.log('News added successfully!');
                    // Reset the form
                    this.news.title = '';
                    this.news.text = '';
                    this.news.author = '';
                    this.news.categoryId = '';
                    this.$router.push({ name: 'CmsNews' });
                })
                .catch(error => {
                    // Handle the error if needed
                    console.error('Failed to add news:', error);
                });

        },
        fetchCategories() {
            // Make the Axios request to fetch the categories from the backend
            this.$axios.get('/api/categories')
                .then(response => {
                    // Populate the categories array with the fetched data
                    this.categories = response.data;
                })
                .catch(error => {
                    // Handle the error if needed
                    console.error('Failed to fetch categories:', error);
                });
        }
    },
    mounted() {
        // Fetch the categories when the component is mounted
        this.fetchCategories();
    }
};
</script>

<style>
.news-form {
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
textarea,
select {
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
