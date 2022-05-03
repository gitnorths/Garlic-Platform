import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/layout';

Vue.use(VueRouter);

export const baseRoutes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录页' },
    component: () => import('@/views/Login'),
  },
  {
    path: '/home',
    name: 'Home',
    meta: { title: '首页' },
    component: () => import('@/views/Home'),
  },
];

// 产业信息
export const industryRoutes = [
  {
    path: '/industry-information',
    name: 'IndustryInformation',
    meta: { title: '产品信息' },
    component: Layout,
    children: [
      {
        path: '/basic-information',
        name: 'BasicInformation',
        component: () => import('@/views/IndustryInformation/basic-information.vue'),
        meta: { title: '基本信息' },
      },
      {
        path: '/farmers-data',
        name: 'FarmersData',
        component: () => import('@/views/IndustryInformation/farmers-data.vue'),
        meta: { title: '农户数据' },
      },
      {
        path: '/garlic-exports',
        name: 'GarlicExports',
        component: () => import('@/views/IndustryInformation/garlic-exports.vue'),
        meta: { title: '大蒜出口' },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...baseRoutes, ...industryRoutes],
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
