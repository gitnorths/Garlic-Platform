<template>
  <div class="gp-bg gp-integrated">
    <IntegratedMonitoringMaps />
    <div class="gp-left gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>农业遥感监测</span></div>
        <div class="gp-box">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="大蒜种植分布" name="first">
              <el-carousel indicator-position="outside">
                <el-carousel-item v-for="item in 3" :key="item">
                  <h3>{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </el-tab-pane>
            <el-tab-pane label="大蒜冻害分级" name="second">
              <el-carousel indicator-position="outside">
                <el-carousel-item v-for="item in 3" :key="item">
                  <h3>{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </el-tab-pane>
            <el-tab-pane label="大蒜长势监测" name="third">
              <el-carousel indicator-position="outside">
                <el-carousel-item v-for="item in 3" :key="item">
                  <h3>{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="gp-right gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>蒜田环境监控视频</span></div>
        <div class="gp-group">
          <span>监测点</span>
          <p>太仓市浏河镇飞凤路尽头西</p>
        </div>
        <div class="gp-box">
          <div class="gp-box__video"></div>
          <ul class="gp-box__ul">
            <li v-for="(item, index) in integratedData" :key="index">
              <img :src="item.src" alt="" />
              <p>
                <b>{{ item.name }}</b>
                <span>{{ item.value }}{{ item.unit }}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IntegratedMonitoringMaps from './components/integrated-monitoring-maps';

export default {
  name: 'IntegratedMonitoring',
  components: {
    IntegratedMonitoringMaps,
  },
  data() {
    return {
      activeName: 'first',
      integratedData: [
        {
          name: '空气温度',
          value: 14,
          unit: '℃',
          src: require('../../assets/images/icon/kqwd.png'),
        },
        {
          name: '空气湿度',
          value: 23,
          unit: '%',
          src: require('../../assets/images/icon/kqsd.png'),
        },
        {
          name: '风速风向',
          value: '西北偏西风',
          unit: '',
          src: require('../../assets/images/icon/fsfx.png'),
        },
        {
          name: '降雨量',
          value: 0,
          unit: 'mm/min',
          src: require('../../assets/images/icon/jyl.png'),
        },
        {
          name: '光照强度',
          value: 0.2,
          unit: 'Klux',
          src: require('../../assets/images/icon/gzqd.png'),
        },
        {
          name: '土壤温度',
          value: 26.2,
          unit: '℃',
          src: require('../../assets/images/icon/trwd.png'),
        },
        {
          name: '土壤湿度',
          value: 42.3,
          unit: '%',
          src: require('../../assets/images/icon/trsd.png'),
        },
        {
          name: '土壤盐分',
          value: 27.75,
          unit: 'mg/L',
          src: require('../../assets/images/icon/tryf.png'),
        },
        {
          name: '土壤电导率',
          value: 37,
          unit: 'μS/cm',
          src: require('../../assets/images/icon/trddl.png'),
        },
        {
          name: '土壤PH值',
          value: 5.59,
          unit: 'PH',
          src: require('../../assets/images/icon/ph.png'),
        },
        {
          name: '有机质含量',
          value: 15.2,
          unit: 'g/kg',
          src: require('../../assets/images/icon/yjzhl.png'),
        },
        {
          name: '全氮',
          value: 1.5,
          unit: 'g/kg',
          src: require('../../assets/images/icon/qd.png'),
        },
        {
          name: '有效磷',
          value: 10.4,
          unit: 'mg/kg',
          src: require('../../assets/images/icon/yxl.png'),
        },
        {
          name: '速效钾',
          value: 47,
          unit: 'mg/kg',
          src: require('../../assets/images/icon/sxj.png'),
        },
        {
          name: '土壤容重',
          value: 1.47,
          unit: 'g/cm',
          src: require('../../assets/images/icon/trrz.png'),
        },
      ],
    };
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
