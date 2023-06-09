<template>
    <div>
        <h2>Categories</h2>
        <table class="table">
            <!-- Table header -->
            <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Edit</th> <!-- Add a new column for the Edit button -->
            </tr>
            </thead>
            <!-- Table body -->
            <tbody>
            <tr v-for="category in paginatedCategories" :key="category.id">
                <td>{{ category.name }}</td>
                <td>{{ category.description }}</td>
                <td>
                    <button @click="editCategory(category)" class="btn btn-primary">Edit</button>
                </td> <!-- Add the Edit button in a new column -->
            </tr>
            </tbody>
        </table>
        <!-- Pagination -->
        <nav v-if="totalPages > 1">
            <ul class="pagination">
                <!-- Pagination code here -->
            </ul>
        </nav>
        <br>
        <button @click="goToAddCategory" class="btn btn-primary">Add New Category</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categories: [],      // Array of categories
            currentPage: 1,     // Current page number
            pageSize: 10,       // Number of categories per page
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
            this.$axios.get('/api/categories')
                .then(response => {
                    this.categories = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        goToAddCategory() {
            this.$router.push({name: 'AddCategory'});
        },
        editCategory(category) {
            this.$router.push({ name: 'EditCategory', params: { id: category.id } });
        },
    },
    mounted() {
        this.fetchCategories();
    },
};
</script>
