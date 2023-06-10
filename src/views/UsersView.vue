<template>
    <div>
        <h2>Users</h2>
        <table class="table">
            <!-- Table header -->
            <thead>
            <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Type</th>
                <th>Status</th>
                <th>Edit</th>
            </tr>
            </thead>
            <!-- Table body -->
            <tbody>
            <tr v-for="user in paginatedUsers" :key="user.id">
                <td>{{ user.name }}</td>
                <td>{{ user.surname }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.type }}</td>
                <td>{{ user.status }}</td>
                <td>
                    <button @click="editUser(user)" class="btn btn-primary">Edit</button>
                </td>
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
        <button @click="goToAddUser" class="btn btn-primary">Add New User</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [],          // Array of users
            currentPage: 1,    // Current page number
            pageSize: 10       // Number of users per page
        };
    },
    computed: {
        paginatedUsers() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            return this.users.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.users.length / this.pageSize);
        }
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
        fetchUsers() {
            this.$axios
                .get('/api/users') // Adjust the URL as per your backend API endpoint
                .then(response => {
                    this.users = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        goToAddUser() {
            this.$router.push({ name: 'AddUser' });
        },
        editUser(user) {
            this.$router.push({ name: 'EditUser', params: { id: user.id } });
        }
    },
    mounted() {
        this.fetchUsers();
    }
};
</script>

<style>
/* Add your custom styles here */
</style>
