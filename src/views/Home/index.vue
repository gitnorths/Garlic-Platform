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
        <div class="ds-number left">
          <ul>
            <li>
              <p>产量(吨）</p>
              <countTo
                :startVal="startVal"
                :endVal="endVal"
                :decimals="decimals"
                :duration="duration"
                class="color1"
              ></countTo>
            </li>
            <li>
              <p>产值(吨）</p>
              <countTo
                :startVal="startVal"
                :endVal="endVal"
                :decimals="decimals"
                :duration="duration"
                class="color2"
              ></countTo>
            </li>
          </ul>
        </div>
        <div class="ds-map"></div>
        <div class="ds-number right">
          <ul>
            <li>
              <p>蒜头种植面积(km²)</p>
              <countTo
                :startVal="startVal"
                :endVal="endVal"
                :decimals="decimals"
                :duration="duration"
                class="color3"
              ></countTo>
            </li>
            <li>
              <p>蒜苗种植面积(km²)</p>
              <countTo
                :startVal="startVal"
                :endVal="endVal"
                :decimals="decimals"
                :duration="duration"
                class="color4"
              ></countTo>
            </li>
            <li>
              <p>蒜薹种植面积(km²)</p>
              <countTo
                :startVal="startVal"
                :endVal="endVal"
                :decimals="decimals"
                :duration="duration"
                class="color5"
              ></countTo>
            </li>
          </ul>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import countTo from 'vue-count-to';
export default {
  name: 'HomeView',
  components: { countTo },
  data() {
    return {
      setting: require('../../assets/images/home/setting.png'),
      message: require('../../assets/images/home/message.png'),
      user: require('../../assets/images/home/user.png'),
      decimals: 1,
      duration: 1500,
      startVal: 0,
      endVal: 12560.2,
    };
  },
};
</script>
