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
          <!-- <div class="gp-box__video"></div> -->
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
            setTimeout(() => {
              this.mapData = res.result;
            }, 5000);
            this.getIntegratedData(res.result[res.result.length - 1]);
          }
        })
        .catch(() => {});
    },
    getData(ids) {
      this.getIntegratedData(ids);
    },
    getIntegratedData(ids) {
      this.$api
        .postBaseApi(
          'pes/getRealtimeDatasByEncoderId',
          qs.stringify({
            encoderId: ids,
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
  .gp-left,
  .gp-right {
    .gp-box {
      background-color: rgba(0, 13, 28, 0.8);
    }
  }

  .gp-left {
    width: 420px;
    bottom: auto;

    .gp-box {
      .el-tabs {
        padding-top: 17px;

        &__nav {
          display: flex;
          justify-content: center;
          width: 100%;
          padding: 0 8px;

          &-wrap::after {
            background: initial;
            border-bottom: 1px dashed #004191;
          }
        }

        &__item {
          flex: 1;
          background: rgba(0, 56, 129, 0.5);
          border-radius: 8px 8px 0px 0px;
          color: #84aeff;
          margin: 0 3px;
          padding: 0;
          height: 42px;
          font-size: 16px;
          font-weight: bold;
          text-align: center;

          &.is-active {
            background: linear-gradient(180deg, #1c63c4 0%, rgba(28, 99, 196, 0) 100%);
          }
        }

        &__active-bar {
          display: none;
        }

        &__content {
          padding: 0 15px 15px;
        }
      }

      .el-carousel {
        &__container {
          height: 570px;
        }

        &__item {
          background-color: #000000;
        }

        &__indicator {
          &.is-active {
            .el-carousel__button {
              background-color: #20fbff;
            }
          }
        }

        &__button {
          width: 14px;
          height: 6px;
          border-radius: 3px;
          background-color: rgba(#ffffff, 0.5);
        }
      }
    }
  }

  .gp-right {
    width: 560px;

    .gp-group {
      background: #000d1c;
    }

    .gp-box {
      display: flex;
      flex-direction: column;
      padding: 18px;

      &__video {
        position: relative;
        width: 100%;
        height: 300px;
        background: #000d1c;
        border: 2px solid #004191;
        border-radius: 8px;
      }

      &__ul {
        flex: 1;
        display: flex;
        flex-flow: wrap;

        li {
          display: flex;
          align-items: center;
          flex: 0 0 33.33%;

          img {
            display: block;
            width: 45px;
            height: 45px;
          }

          p {
            padding-left: 10px;

            b {
              display: block;
              color: #0b95f0;
              font-size: 12px;
            }

            span {
              color: #ffffff;
              font-size: 16px;
              font-weight: bold;
            }
          }
        }
      }
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
