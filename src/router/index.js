import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MostReadView from "@/views/MostReadView.vue";
import ByOrderView from "@/views/ByCategoryView.vue";
import SingleNewsView from "@/views/SingleNewsView.vue";
import CategoriesView from "@/views/CategoriesView.vue";
import AddCategoryView from "@/views/AddCategoryView.vue";
import EditCategoryView from "@/views/EditCategoryView.vue";
import CmsNewsView from "@/views/CmsNewsView.vue";
import EditNewsView from "@/views/EditNewsView.vue";
import CreateNewsView from "@/views/CreateNewsView.vue"
import UsersView from "@/views/UsersView.vue";
import AddUserView from "@/views/AddUserView.vue";
import EditUserView from "@/views/EditUserView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  { // most read news - portal
    path: '/mostRead',
    name: 'MostRead',
    component: MostReadView
  },
  { // all news by category - portal
    path: '/byCategory/:id',
    name: 'ByCategory',
    component: ByOrderView
  },
  { // listing single news - portal
    path: '/getNews/:id',
    name: 'GetNews',
    component: SingleNewsView
  },
  { // listing all categories - cms
    path: '/categories',
    name: 'Categories',
    component: CategoriesView
  },
  {
    path: '/addCategory',
    name: 'AddCategory',
    component: AddCategoryView
  },
  {
    path: '/editCategory/:id',
    name: 'EditCategory',
    component: EditCategoryView
  },
  {
    path: '/cmsNews',
    name: 'CmsNews',
    component: CmsNewsView
  },
  {
    path: '/editNews/:id',
    name: 'EditNews',
    component: EditNewsView
  },
  {
    path: '/createNews',
    name: 'CreateNews',
    component: CreateNewsView
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersView
  },
  {
    path: '/addUser',
    name: 'AddUser',
    component: AddUserView
  },
  {
    path: '/editUser',
    name: 'EditUser',
    component: EditUserView
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt');

  if (to.name === 'Users') {
    // Check if the token exists and its type is 'admin'
    if (token && getTokenType(token) === 'admin') {
      next(); // Allow access to the route
    } else {
      // Redirect to another route or display an error message
      next({ name: 'home' }); // Redirect to the home route
    }
  } else {
    next(); // Allow access to other routes
  }
});

function getTokenType(token) {
  // Parse the token and extract the 'type' field
  const parsedToken = JSON.parse(atob(token.split('.')[1]));
  return parsedToken.type;
}

export default router
