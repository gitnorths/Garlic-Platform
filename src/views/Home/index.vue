<template>
  <el-container class="ds ds-home">
    <el-header>
      <div class="ds-flex">
        <div class="left"><span>2022年2月28日 星期三</span></div>
        <div class="right">
          <el-link :underline="false">
            <el-avatar :size="42" :src="setting"></el-avatar>
            设置
          </el-link>
          <el-link :underline="false">
            <el-avatar :size="42" :src="message"></el-avatar>
            消息
          </el-link>
          <el-link :underline="false">
            <el-avatar :size="42" :src="user"></el-avatar>
            李永明
          </el-link>
        </div>
      </div>
    </el-header>
    <el-main>
      <div class="ds-flex">
        <div class="left"></div>
        <div class="center"></div>
        <div class="right"></div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      setting: require('../../assets/images/home/setting.png'),
      message: require('../../assets/images/home/message.png'),
      user: require('../../assets/images/home/user.png'),
    };
  },
};
</script>
