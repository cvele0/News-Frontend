<template>
    <div>
        <h2>Categories</h2>
        <table class="table">
            <!-- Table header -->
            <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>News</th> <!-- Add a new column for the Edit button -->
                <th>Edit</th> <!-- Add a new column for the Edit button -->
            </tr>
            </thead>
            <!-- Table body -->
            <tbody>
            <tr v-for="category in paginatedCategories" :key="category.id">
                <td>{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <td>
                    <button @click="newsByCategory(category)" class="btn btn-primary">News</button>
                </td> <!-- Add the Edit button in a new column -->
                <td>
                    <button @click="editCategory(category)" class="btn btn-primary">Edit</button>
                </td> <!-- Add the Edit button in a new column -->
            </tr>
            </tbody>
        </table>
        <!-- Pagination -->
        <nav v-if="totalPages > 1">
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
        <br>
        <button @click="goToAddCategory" class="btn btn-primary">Add New Category</button>
        <br> <br>
        <button @click="fetchAllNews" class="btn btn-primary">Show All News</button>
<!--        <CmsNewsComponent :articles="articles"></CmsNewsComponent>-->
        <CmsNewsComponent :articles="this.articles" @update-articles="updateArticles"></CmsNewsComponent>
    </div>
</template>

<script>
import CmsNewsComponent from "@/components/CmsNewsComponent.vue";

export default {
    components: {
        CmsNewsComponent
    },
    data() {
        return {
            categories: [],      // Array of categories
            currentPage: 1,     // Current page number
            pageSize: 10,       // Number of categories per page
            articles: []        // Set the articles data here
        };
    },
    computed: {
        paginatedCategories() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.categories.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.categories.length / this.pageSize);
        },
    },
    methods: {
        changePage(page) {
            this.currentPage = page;
        },
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
        fetchCategories() {
            this.$axios
                .get('/api/categories') // Adjust the URL as per your backend API endpoint
                .then(response => {
                    this.categories = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        goToAddCategory() {
            this.$router.push({ name: 'AddCategory' });
        },
        editCategory(category) {
            this.$router.push({ name: 'EditCategory', params: { id: category.id } });
        },
        newsByCategory(category) {
            this.$axios
                .get(`/api/news/byCategory/${category.id}`) // Adjust the URL as per your backend API endpoint
                .then(response => {
                    this.articles = response.data;
                    // this.$emit('update-articles', this.articles); // Emit the custom event
                })
                .catch(error => {
                    console.error(error);
                });
        },
        updateArticles(articles) {
            this.articles = articles;
        },
        fetchAllNews() {
            this.$axios
                .get('/api/news') // Adjust the URL as per your backend API endpoint
                .then(response => {
                    this.articles = response.data;
                    // this.$emit('update-articles', this.articles); // Emit the custom event
                })
                .catch(error => {
                    console.error(error);
                });
        },
    },
    mounted() {
        this.fetchCategories();
    },
};
</script>
