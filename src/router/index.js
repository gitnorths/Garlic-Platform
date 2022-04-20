import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/Home/';
import LoginView from '../views/Login/';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('authorith');
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router;
