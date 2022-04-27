import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '../views/Login/';
import HomeView from '../views/Home/';
import CyxxView from '../views/Home/cyxx';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/cyxx',
    name: 'cyxx',
    component: CyxxView,
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
    //若要跳转的页面是个人界面
    let token = localStorage.getItem('authority'); //获取本地存储的token值
    console.log(token);
    if (token === null || token === '') {
      //若token为空则验证不成功，跳转到登录页面
      next('/login');
    } else {
      //不为空则验证成功
      next();
    }
  }
});

export default router;
