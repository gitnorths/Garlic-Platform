<template>
  <div class="ds-bg">
    <dv-loading v-if="loading">Loading...</dv-loading>
    <el-container v-else class="ds ds-home">
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
              操作员
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
                  class="color2"
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
          <div class="ds-map">
            <JSMap :cdata="cdata" />
          </div>
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
  </div>
</template>

<script>
import countTo from 'vue-count-to';
import JSMap from '@/components/echarts/JiangSu.vue';

export default {
  name: 'HomeView',
  components: { JSMap, countTo },
  data() {
    return {
      timing: null,
      loading: true,
      setting: require('../../assets/images/home/setting.png'),
      message: require('../../assets/images/home/message.png'),
      user: require('../../assets/images/home/user.png'),
      decimals: 1,
      duration: 1500,
      startVal: 0,
      endVal: 12560.2,

      cdata: [
        {
          name: '南京',
          value: 10,
          elseData: {
            // 这里放置地图 tooltip 里想显示的数据
          },
        },
        {
          name: '徐州',
          value: 10,
        },
      ],
    };
  },
  mounted() {
    this.cancelLoading();
  },
  beforeDestroy() {
    clearInterval(this.timing);
  },
  methods: {
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
  },
};
</script>
