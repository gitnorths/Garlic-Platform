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
    component: () => import(/* webpackChunkName:"login"*/ '@/views/login'),
  },
  {
    path: '/home',
    name: 'Home',
    meta: { title: '首页' },
    component: () => import(/* webpackChunkName:"home"*/ '@/views/home'),
  },
];

// 产业信息
export const industryRoutes = [
  {
    path: '/industry',
    name: 'Industry',
    meta: { title: '产品信息' },
    component: Layout,
    children: [
      {
        path: '/basic-information',
        name: 'BasicInformation',
        component: () => import(/* webpackChunkName:"basic-information"*/ '@/views/industry/basic-information.vue'),
        meta: { title: '基本信息' },
      },
      {
        path: '/farmers-data',
        name: 'FarmersData',
        component: () => import(/* webpackChunkName:"farmers-data"*/ '@/views/industry/farmers-data.vue'),
        meta: { title: '农户数据' },
      },
      {
        path: '/garlic-exports',
        name: 'GarlicExports',
        component: () => import(/* webpackChunkName:"garlic-exports"*/ '@/views/industry/garlic-exports.vue'),
        meta: { title: '大蒜出口' },
      },
    ],
  },
];

// 科学监测
export const scienceRoutes = [
  {
    path: '/science',
    name: 'Science',
    meta: { title: '科学监测' },
    component: Layout,
    children: [
      {
        path: '/anchor-point',
        name: 'AnchorPoint',
        component: () => import(/* webpackChunkName:"anchor-point"*/ '@/views/science/anchor-point.vue'),
        meta: { title: '测土配方施肥定位点监测' },
      },
      {
        path: '/integrated-monitoring',
        name: 'IntegratedMonitoring',
        component: () =>
          import(/* webpackChunkName:"integrated-monitoring"*/ '@/views/science/integrated-monitoring.vue'),
        meta: { title: '蒜田综合监控' },
      },
      {
        path: '/quality-grade',
        name: 'QualityGrade',
        component: () => import(/* webpackChunkName:"quality-grade"*/ '@/views/science/quality-grade.vue'),
        meta: { title: '耕地质量等级' },
      },
    ],
  },
];

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [...baseRoutes, ...industryRoutes, ...scienceRoutes],
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
