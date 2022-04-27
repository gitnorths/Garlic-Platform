<template>
  <div class="ds-bg">
    <dv-loading v-if="loading">Loading...</dv-loading>
    <el-container v-else class="ds ds-home">
      <el-header>
        <div class="ds-flex">
          <dv-decoration-10 style="width: 347px; height: 2px; position: absolute; top: 14px; left: 92px" />
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
              <li v-for="(item, index) in numberData.slice(0, 2)" :key="index">
                <p>{{ item.name }}({{ item.unit }})</p>
                <countTo
                  :start-val="Number(item.sVal)"
                  :end-val="Number(item.eVal)"
                  :decimals="decimals"
                  :duration="duration"
                  :class="`${item.cName}`"
                  mountedCallback
                ></countTo>
              </li>
            </ul>
          </div>
          <div class="ds-center">
            <div class="ds-map">
              <JSMap :cdata="cdata" />
              <div v-for="(item, index) in suspend" :key="index" :class="`ds-map__suspend ${item.className}`">
                <router-link :to="`${item.path}`">
                  <p>{{ item.name }}</p>
                  <span></span>
                </router-link>
              </div>
            </div>
          </div>
          <div class="ds-number right">
            <ul>
              <li v-for="(item, index) in numberData.slice(2, 6)" :key="index">
                <p>{{ item.name }}({{ item.unit }})</p>
                <countTo
                  :start-val="Number(item.sVal)"
                  :end-val="Number(item.eVal)"
                  :decimals="decimals"
                  :duration="duration"
                  :class="`${item.cName}`"
                  mountedCallback
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
import { toNumber } from 'lodash';
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
      endVal: 0,
      suspend: [],
      numberData: [],
      cdata: [
        {
          name: '南京',
          value: 10,
        },
        {
          name: '徐州',
          value: 20,
        },
      ],
    };
  },
  mounted() {
    this.cancelLoading();
    this.suspend = [
      { name: '社会化服务', className: '__shhfw', path: '/login' },
      { name: '产业信息', className: '__cyxx', path: '/cyxx' },
      { name: '科学监测', className: '__kxjc', path: '/login' },
    ];
    this.numberData = [
      { name: '产量', unit: '吨', cName: 'color1', sVal: 0, eVal: toNumber(12560.2) },
      { name: '产值', unit: '吨', cName: 'color2', sVal: 0, eVal: toNumber(12560.2) },
      { name: '蒜头种植面积', unit: 'km²', cName: 'color3', sVal: 0, eVal: 12560.2 },
      { name: '蒜苗种植面积', unit: 'km²', cName: 'color4', sVal: 0, eVal: 12560.2 },
      { name: '蒜薹种植面积', unit: 'km²', cName: 'color5', sVal: 0, eVal: 12560.2 },
    ];
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
