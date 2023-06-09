import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MostReadView from "@/views/MostReadView.vue";
import ByOrderView from "@/views/ByCategoryView.vue";
import SingleNewsView from "@/views/SingleNewsView.vue";
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
  {
    path: '/mostRead',
    name: 'MostRead',
    component: MostReadView
  },
  {
    path: '/byCategory/:id',
    name: 'ByCategory',
    component: ByOrderView
  },
  {
    path: '/getNews/:id',
    name: 'GetNews',
    component: SingleNewsView
  }
]

const router = new VueRouter({
  routes
})

export default router
