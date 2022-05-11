<template>
  <div style="width: 100%; height: 100%">
    <el-container class="gp-container">
      <el-header class="gp-header zIndex101">
        <div class="gp-gohome" @click="goHome"></div>
        <div class="gp-header__title">{{ asyncMenuList[0].meta.title }}</div>
        <el-menu :default-active="$router.currentRoute.path" router class="gp-menu" mode="horizontal">
          <el-menu-item v-for="item in asyncMenuList[0].children" :index="`${item.path}`" :key="item.path">
            <span>{{ item.meta.title }}</span>
          </el-menu-item>
        </el-menu>
        <div class="gp-flex gp-header__form">
          <div>
            <el-avatar :size="30" :src="settings"></el-avatar>
          </div>
          <div>
            <el-badge is-dot type="success">
              <el-avatar :size="30" :src="messages"></el-avatar>
            </el-badge>
          </div>
          <div>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <el-avatar
                  :size="30"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar>

                <b>李永明</b> 管理员 <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="clearfix"> <span @click="layout">退出</span> </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-main class="gp-main">
        <router-view />
      </el-main>
      <el-footer class="gp-footer zIndex101"></el-footer>
    </el-container>
  </div>
</template>

<script>
import { industryRoutes, scienceRoutes, socialRoutes } from '@/router';

export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      title: '',
      activeIndex: '1',
      menuRoutes: [],
      settings: require('../assets/images/icon/setting2.png'),
      messages: require('../assets/images/icon/message2.png'),
    };
  },
  computed: {
    asyncMenuList() {
      if (this.$route.matched[0].name === 'Social') {
        return socialRoutes;
      } else if (this.$route.matched[0].name === 'Science') {
        return scienceRoutes;
      } else if (this.$route.matched[0].name === 'Industry') {
        return industryRoutes;
      } else {
        return industryRoutes;
      }
    },
  },
  methods: {
    goHome() {
      this.$router.push({ path: '/home' });
    },
    layout() {
      this.$router.push({ path: '/login' });
    },
  },
};
</script>
