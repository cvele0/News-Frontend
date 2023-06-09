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
// import LoginView from "@/views/LoginView.vue";
// import LoginView from '../views/LoginView.vue';

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
  }
]

const router = new VueRouter({
  routes
})

// const navbarType = localStorage.getItem('navbarType');
//
// // Check if a default route is stored in localStorage
// if (navbarType === 'portal') {
//   // Replace the current route with the stored default route
//   router.replace({ name: 'home' });
// } else {
//   // Set a default route if no route is stored in localStorage
//   router.replace({ name: 'Categories' });
// }

export default router
