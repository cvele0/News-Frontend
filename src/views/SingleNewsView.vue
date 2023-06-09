<template>
    <div class="news-details">
        <h2>{{ news.title }}</h2>
        <p>Date: {{ formatDate(news.timeCreated) }}</p>
        <p>Author: {{ news.author }}</p>
        <p>View Count: {{ news.viewCount }}</p>
        <p>{{ news.text }}</p>

        <h3>Tags:</h3>
<!--        <ul>-->
<!--            <li v-for="tag in news.tags" :key="tag.id">{{ tag.name }}</li>-->
<!--        </ul>-->

        <h3>Comments:</h3>
        <ul>
            <li v-for="comment in paginatedComments" :key="comment.id">
                <p><strong>Author:</strong> {{ comment.author }}</p>
                <p>{{ comment.text }}</p>
                <p><em>Date: {{ formatDate(comment.timeCreated) }}</em></p>
            </li>
        </ul>

        <nav>
            <ul class="pagination">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <a class="page-link" href="#" @click="prevPage">Previous</a>
                </li>
                <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber" :class="{ active: pageNumber === currentPage }">
                    <a class="page-link" href="#" @click="changePage(pageNumber)">{{ pageNumber }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <a class="page-link" href="#" @click="nextPage">Next</a>
                </li>
            </ul>
        </nav>

        <br> <h3>Add New Comment:</h3> <br>
        <form @submit.prevent="addComment">
            <input type="text" v-model="newComment.author" placeholder="Author" required>
            <br> <br>
            <textarea v-model="newComment.text" placeholder="Comment" required></textarea>
            <br>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            news: {}, // Single news object
            comments: [], // All comments for the news
            currentPage: 1, // Current page number
            commentsPerPage: 10, // Number of comments to display per page
            newComment: {
                author: '',
                text: ''
            }
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.comments.length / this.commentsPerPage);
        },
        paginatedComments() {
            const startIndex = (this.currentPage - 1) * this.commentsPerPage;
            const endIndex = startIndex + this.commentsPerPage;
            return this.comments.slice(startIndex, endIndex);
        },
    },
    methods: {
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        changePage(pageNumber) {
            this.currentPage = pageNumber;
        },
        formatDate(timestamp) {
            const date = new Date(timestamp);

            // Format the date and time
            const formattedDate = date.toLocaleDateString(); // Adjust the format as per your requirement
            const formattedTime = date.toLocaleTimeString(); // Adjust the format as per your requirement

            // Return the formatted date and time
            return formattedDate + ' ' + formattedTime;
        },
        fetchNews(newsId) {
            this.$axios.get(`/api/news/getNews/${newsId}`)
              .then(response => {
                  this.news = response.data;
                  this.fetchComments(newsId);
                  this.news.viewCount++; // Assuming `viewCount` is initially set to 0
                  this.updateNewsViewCount(newsId, this.news.viewCount);
              })
              .catch(error => {
                console.error(error);
              });
        },
        fetchComments(newsId) {
            this.$axios.get(`/api/comments/byNewsId/${newsId}`)
                .then(response => {
                    this.comments = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        updateNewsViewCount(newsId, count) {
            if (!count) return;
            if (!newsId) return;
            this.$axios
                .put(`api/news/incrementViewCount/${newsId}?count=${count}`)
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    console.log('View count incremented successfully');
                })
                .catch(error => {
                    console.error('Error incrementing view count', error);
                });
        },
        addComment() {
            // Create the payload for the new comment
            const newCommentPayload = {
                author: this.newComment.author,
                text: this.newComment.text,
                timeCreated: new Date().toISOString(),
                news: {
                    id: this.news.id,
                    title: this.news.title,
                    text: this.news.text,
                    timeCreated: this.news.timeCreated,
                    author: this.news.author,
                    viewCount: this.news.viewCount,
                    comments: this.news.comments,
                    tags: this.news.tags,
                    category: {
                        id: this.news.category.id,
                        name: this.news.category.name,
                        description: this.news.category.description,
                    },
                },
            };

            // Perform an HTTP request to add the new comment
            // Replace this with your actual API call
            // Example using Axios:
            this.$axios.post('/api/comments', newCommentPayload)
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    // Handle the response as needed
                    console.log('Comment added successfully');
                    this.newComment.author = '';
                    this.newComment.text = '';
                    this.fetchComments(this.$route.params.id); // Assuming you have a fetchComments method to fetch the latest comments
                })
                .catch(error => {
                    console.error(error);
                    // Handle the error as needed
                });
        },
    },
    mounted() {
        // Fetch the news data when the component is mounted
        const newsId = this.$route.params.id;
        this.fetchNews(newsId);
    },
};
</script>

<style scoped>

.news-details {
    margin: 30px
}

.pagination {
    display: flex;
    list-style-type: none;
    padding: 0;
}

.page-item {
    margin: 0 5px;
}

.page-link {
    cursor: pointer;
}
</style>
