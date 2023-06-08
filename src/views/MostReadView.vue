<template>
    <div class="home">
        <h1>Most Read News</h1>
        <ul>
            <li v-for="article in paginatedArticles" :key="article.id">
                <h2>{{ article.title }}</h2>
                <p>{{ article.text.slice(0, 100) }}</p>
                <p v-if="article.category">Category: {{ article.category.name }}</p>
                <p>Publication Date: {{ formatDate(article.timeCreated) }}</p>
                <button @click="logArticle(article)">Log Article</button>
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            articles: [], // All articles retrieved from the API
            currentPage: 1, // Current page number
            articlesPerPage: 10, // Number of articles to display per page
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.articles.length / this.articlesPerPage);
        },
        paginatedArticles() {
            const startIndex = (this.currentPage - 1) * this.articlesPerPage;
            const endIndex = startIndex + this.articlesPerPage;
            return this.articles.slice(startIndex, endIndex);
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
        logArticle(article) {
            console.log(article);
        },
        formatDate(timestamp) {
            // Convert the timestamp to a Date object
            const date = new Date(timestamp);

            // Format the date and time
            const formattedDate = date.toLocaleDateString(); // Adjust the format as per your requirement
            const formattedTime = date.toLocaleTimeString(); // Adjust the format as per your requirement

            // Return the formatted date and time
            return formattedDate + ' ' + formattedTime;
        },
    },
    mounted() {
        this.$axios.get('/api/news/mostRead')
            .then(response => {
                this.articles = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }
    // Add any necessary lifecycle hooks or methods
}
</script>