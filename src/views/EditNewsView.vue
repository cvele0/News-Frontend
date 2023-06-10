<template>
    <div class="news-form">
        <h2 class="title">Edit News</h2>
        <form @submit.prevent="updateNews">
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
            <button type="submit" class="btn btn-primary">Update News</button>
            <button @click="deleteNews" class="btn btn-danger">Delete News</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            news: {
                id: '', // Set the news ID
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
        updateNews() {
            // Make the Axios request to update the news
            this.$axios.put(`/api/news/${this.news.id}`, {
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
                    console.log('News updated successfully!');
                    this.$router.push({ name: 'CmsNews' });
                })
                .catch(error => {
                    // Handle the error if needed
                    console.error('Failed to update news:', error);
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
        },
        fetchNews() {
            // Make the Axios request to fetch the news to be edited
            const newsId = this.$route.params.id; // Get the news ID from the route parameters
            this.$axios.get(`/api/news/getNews/${newsId}`)
                .then(response => {
                    // Populate the news object with the fetched data
                    this.news = response.data;
                })
                .catch(error => {
                    // Handle the error if needed
                    console.error('Failed to fetch news:', error);
                });
        },
        deleteNews() {
            const newsId = this.news.id;

            // Make the Axios request to delete the news on the backend
            this.$axios.delete(`/api/news/${newsId}`)
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    // Handle the response if needed
                    console.log('News deleted successfully!');

                    // Delete comments associated with the news
                    this.deleteComments(newsId);

                    this.$router.push({ name: 'CmsNews' });
                })
                .catch(error => {
                    // Handle the error if needed
                    console.error('Failed to delete news:', error);
                });
        },
        deleteComments(newsId) {
            // Make the Axios request to delete comments associated with the news
            this.$axios.delete(`/api/comments/byNewsId/${newsId}`)
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    // Handle the response if needed
                    console.log('Comments deleted successfully!');
                })
                .catch(error => {
                    // Handle the error if needed
                    console.error('Failed to delete comments:', error);
                });
        }
    },
    mounted() {
        // Fetch the categories when the component is mounted
        this.fetchCategories();

        // Fetch the news to be edited
        this.fetchNews();
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
