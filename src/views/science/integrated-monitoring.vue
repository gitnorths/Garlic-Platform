<template>
  <div class="gp-bg gp-integrated">
    <IntegratedMonitoringMaps :mapData="mapData" @ok="getData" />
    <div class="gp-left gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>农业遥感监测</span></div>
        <div class="gp-box">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="大蒜种植分布" name="first">
              <el-carousel indicator-position="outside" :autoplay="false">
                <el-carousel-item v-for="item in 1" :key="item">
                  <img :src="`${require('@/assets/images/science/zzfb/0' + item + '.png')}`" alt="" />
                </el-carousel-item>
              </el-carousel>
            </el-tab-pane>
            <el-tab-pane label="大蒜冻害分级" name="second">
              <el-carousel indicator-position="outside" :autoplay="false">
                <el-carousel-item v-for="item in 2" :key="item">
                  <img :src="`${require('@/assets/images/science/dhfj/0' + item + '.png')}`" alt="" />
                </el-carousel-item>
              </el-carousel>
            </el-tab-pane>
            <el-tab-pane label="大蒜长势监测" name="third">
              <el-carousel indicator-position="outside" :autoplay="false">
                <el-carousel-item v-for="item in 8" :key="item">
                  <img :src="`${require('@/assets/images/science/zsjc/0' + item + '.png')}`" alt="" />
                </el-carousel-item>
              </el-carousel>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div class="gp-right gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title">
          <span>蒜田环境监控视频</span>
        </div>
        <div class="gp-group">
          <span>监测点</span>
          <p>{{ title }}</p>
        </div>
        <div class="gp-box">
          <div class="gp-box__video"></div>
          <ul class="gp-box__ul">
            <li v-for="(item, index) in sensorsData" :key="index">
              <img :src="item.src" alt="" />
              <p>
                <b>{{ item.FullName }}</b>
                <span>{{ item.GuagedValue }}{{ item.Unit }}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
import IntegratedMonitoringMaps from './components/integrated-monitoring-maps';

export default {
  name: 'IntegratedMonitoring',
  components: {
    IntegratedMonitoringMaps,
  },
  data() {
    return {
      title: '',
      mapData: [],
      activeName: 'first',
      sensorsData: [],
      integratedData: [
        {
          resource: 105,
          FullName: '空气温度',
          Unit: '℃',
          src: require('../../assets/images/icon/kqwd.png'),
        },
        {
          resource: 106,
          FullName: '空气湿度',
          Unit: '%',
          src: require('../../assets/images/icon/kqsd.png'),
        },
        {
          resource: 108,
          FullName: '风速',
          Unit: 'm/s',
          src: require('../../assets/images/icon/fsfx.png'),
        },
        {
          resource: 109,
          FullName: '雨量',
          Unit: 'mm/min',
          src: require('../../assets/images/icon/jyl.png'),
        },
        {
          resource: 113,
          FullName: '光照强度',
          Unit: 'Klux',
          src: require('../../assets/images/icon/gzqd.png'),
        },
        {
          resource: 125,
          FullName: '土壤温度',
          Unit: '℃',
          src: require('../../assets/images/icon/trwd.png'),
        },
        {
          resource: 126,
          FullName: '土壤湿度',
          Unit: '%',
          src: require('../../assets/images/icon/trsd.png'),
        },
        {
          resource: 127,
          FullName: '土壤pH值',
          Unit: '',
          src: require('../../assets/images/icon/ph.png'),
        },
        {
          resource: 128,
          FullName: '土壤盐分',
          Unit: 'mg/L',
          src: require('../../assets/images/icon/tryf.png'),
        },
        {
          resource: 129,
          FullName: '土壤电导率',
          Unit: 'mS/cm',
          src: require('../../assets/images/icon/trddl.png'),
        },
        {
          resource: 137,
          FullName: '土壤有机质',
          Unit: 'g/kg',
          src: require('../../assets/images/icon/yjzhl.png'),
        },
        {
          resource: 138,
          FullName: '土壤全氮',
          Unit: 'g/kg',
          src: require('../../assets/images/icon/qd.png'),
        },
        {
          resource: 139,
          FullName: '土壤有效磷',
          Unit: 'mg/kg',
          src: require('../../assets/images/icon/yxl.png'),
        },
        {
          resource: 140,
          FullName: '土壤速效钾',
          Unit: 'mg/kg',
          src: require('../../assets/images/icon/sxj.png'),
        },
        {
          resource: 141,
          FullName: '土壤容重',
          Unit: 'g/cm3',
          src: require('../../assets/images/icon/trrz.png'),
        },
      ],
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      // 监控数据
      this.$api
        .postBaseApi(
          'pes/encoderList',
          qs.stringify({
            level: '',
          })
        )
        .then((res) => {
          if (!res) return;
          if (res.code === 200 && res.result.length > 0) {
            this.mapData = res.result;
            this.getIntegratedData(res.result[0]);
          }
        })
        .catch(() => {});
    },
    getData(res) {
      this.getIntegratedData(res);
    },
    getIntegratedData(res) {
      // address: "白口村"
      // area: "850.0"
      // contents: "监控：白口村长势监测点<br/>设备：诺丽网络摄像机<br/><br/>监控：白口村采集点<br/>设备：诺丽环境数据采集器（2 代）<br/><br/>监控：白口村监控点<br/>设备：诺丽网络摄像机<br/><br/>"
      // encoderId: "127"
      // latitude: "34.3623734"
      // longitude: "117.768539"
      // person: "刘贤松"
      // phone: "13805223875"
      this.$api
        .postBaseApi(
          'pes/getRealtimeDatasByEncoderId',
          qs.stringify({
            encoderId: res.encoderId,
          })
        )
        .then((res) => {
          if (!res) return;
          if (res.code === 200) {
            this.title = res.result.Encoder.FullName + '，设备编码：' + res.result.Encoder.Deviceid;
            if (res.result.Sensors.length != 0) {
              let resList = res.result;
              resList.Sensors.forEach((value) => {
                value.src = this.getIcon(value.Resource, this.integratedData);
              });
              this.sensorsData = resList.Sensors;
            } else {
              this.sensorsData = this.integratedData;
            }
          }
        })
        .catch(() => {});
    },
    getIcon(value, options) {
      let obj = options.find((item) => item.resource == value);
      if (obj) {
        return obj.src;
      }
      return '';
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.gp-integrated {
  .gp-group {
    position: relative;
    justify-content: flex-start;
    padding: 15px 0 15px 20px;
    background-color: #000d1c;
    border-bottom: 1px dashed #004191;

    &::after {
      display: block;
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 16px;
      background: linear-gradient(0deg, rgba(0, 65, 145, 0.3) 0%, rgba(0, 65, 145, 0) 100%);
    }
  }

  ::v-deep .el-carousel {
    &__item {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
