<!--<template>-->
<!--    <div class="home">-->
<!--        <h1>Latest News</h1>-->
<!--        <ul>-->
<!--            <li v-for="article in paginatedArticles" :key="article.id">-->
<!--                <h2>{{ article.title }}</h2>-->
<!--                <p>{{ article.text.slice(0, 100) }}</p>-->
<!--                <p v-if="article.category">Category: {{ article.category.name }}</p>-->
<!--                <p>Publication Date: {{ formatDate(article.timeCreated) }}</p>-->
<!--                <button @click="logArticle(article)">Opsirnije</button>-->
<!--            </li>-->
<!--        </ul>-->

<!--        <nav>-->
<!--            <ul class="pagination">-->
<!--                <li class="page-item" :class="{ disabled: currentPage === 1 }">-->
<!--                    <a class="page-link" href="#" @click="prevPage">Previous</a>-->
<!--                </li>-->
<!--                <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber" :class="{ active: pageNumber === currentPage }">-->
<!--                    <a class="page-link" href="#" @click="changePage(pageNumber)">{{ pageNumber }}</a>-->
<!--                </li>-->
<!--                <li class="page-item" :class="{ disabled: currentPage === totalPages }">-->
<!--                    <a class="page-link" href="#" @click="nextPage">Next</a>-->
<!--                </li>-->
<!--            </ul>-->
<!--        </nav>-->
<!--    </div>-->
<!--</template>-->

<template>
    <div class="home">
        <h1 class="title">CMS - All News</h1>
        <button @click="goToAddNewsForm" class="btn btn-primary"> Create News </button>
        <ul class="list-group">
            <li v-for="article in paginatedArticles" :key="article.id" class="list-group-item">
                <h2 class="mb-2 title">{{ article.title }}</h2>
                <p class="mb-3">{{ article.text.slice(0, 100) }}</p>
                <p v-if="article.category" class="mb-1">Category: {{ article.category.name }}</p>
                <p class="mb-1">Publication Date: {{ formatDate(article.timeCreated) }}</p>
                <button @click="logArticle(article)" class="btn btn-primary">More</button>
                <button @click="editNews(article)" class="btn btn-primary">Edit</button>
            </li>
        </ul>

        <nav>
            <ul class="pagination justify-content-center mt-4">
                <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
                    <a class="page-link" href="#" @click="prevPage">Previous</a>
                </li>
                <li class="page-item" v-for="pageNumber in totalPages" :key="pageNumber" :class="{ 'active': pageNumber === currentPage }">
                    <a class="page-link" href="#" @click="changePage(pageNumber)">{{ pageNumber }}</a>
                </li>
                <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
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
            if (article == null) return;
            if (this.$route.params.id !== article.id) {
                this.$router.push({ name: 'GetNews', params: { id: article.id } });
            }
        },
        editNews(article) {
            this.$router.push({ name: 'EditNews', params: { id: article.id } });
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
        goToAddNewsForm() {
            // Navigate to the form for adding a new news article
            this.$router.push({ name: 'CreateNews' });
        },
    },
    mounted() {
        this.$axios.get('/api/news')
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

<style>
h1.title {
    text-align: left;
}
h2.title {
    text-align: left;
}
h3 {
    color: #2990bf !important;
    text-indent: 10px;
}
.home {
    text-align: left;
    padding: 20px;
}

.list-group-item {
    border: none;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    margin-right: 20px;
    margin-bottom: 20px;
    margin-top: 20px
}

.btn-primary:hover {
    background-color: #0069d9;
    border-color: #0062cc;
}

.page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    cursor: not-allowed;
}

.page-item.disabled .page-link:hover {
    background-color: transparent;
    border-color: transparent;
}
</style>