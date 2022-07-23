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
          <span> 蒜田环境监控视频 </span>
          <el-popover placement="top-start" title="视频无法播放？" width="200" trigger="hover">
            <span>
              请联系相关人员或者参考<el-link
                type="primary"
                href="https://garlic.chinanoni.com/dashboard/%E8%A7%86%E9%A2%91%E6%8F%92%E4%BB%B6%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B.pdf"
                target="_blank"
              >
                插件安装教程
              </el-link>
              。
            </span>
            <i slot="reference" class="el-icon-question"></i>
          </el-popover>
        </div>
        <div class="gp-group">
          <span> 监测点 </span>
          <p>{{ title }}</p>
        </div>
        <div class="gp-box">
          <el-empty v-if="sensorsData.length === 0" :image-size="50"></el-empty>
          <div v-if="sensorsData.length != 0" class="gp-box__video">
            <a :href="nonidtHref">{{ nonidtName }}</a>
          </div>
          <ul v-if="sensorsData.length != 0" class="gp-box__ul">
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
import AMap from 'AMap';
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
      nonidtHref: '',
      nonidtName: '',
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
  mounted() {
    setTimeout(() => {
      this.getMapsInfo();
    }, 3000);
  },
  methods: {
    getMapsInfo() {
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
            let that = this;
            let resData = res.result;
            that.mapData = [];

            resData.forEach((item) => {
              AMap.convertFrom([item.longitude, item.latitude], 'gps', function (status, result) {
                if (result.info === 'ok') {
                  const lnglats = result.locations[0];
                  that.mapData.push({
                    ...item,
                    latitude: lnglats.lat,
                    longitude: lnglats.lng,
                  });
                }
              });
            });
            // this.getIntegratedData(res.result[0].encoderId);
          }
        })
        .catch(() => {});
    },
    getData(ids) {
      this.getIntegratedData(ids);
    },
    // 获取坐标数据
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
            // nonidt://title,nodeId,streamMode
            // title：项目的名称，示例中：“绿色化生产模式监控点”
            // nodeId：视频节点编号，示例中127
            // streamMode：码流类型：1为主码流，2：辅码流，示例中2辅码流
            this.nonidtHref = 'nonidt://' + res.result.Encoder.FullName + ',' + res.result.Encoder.Deviceid + ',2';
            this.nonidtName = '视频监控：' + res.result.Encoder.FullName;

            this.title = res.result.Encoder.FullName + '，设备编码：' + res.result.Encoder.Deviceid;
            if (res.result.Sensors.length != 0) {
              let resList = res.result;
              resList.Sensors.forEach((value) => {
                value.src = this.getIcon(value.Resource, this.integratedData);
              });
              this.sensorsData = resList.Sensors;
            } else {
              this.sensorsData = [];
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
    // 获取图片
    getImage() {
      this.$api
        .getCaptureApi({
          BeginDate: '2021-11-01',
          EndDate: '2021-11-08',
          ows: 20,
          page: 1,
          encoderId: 17,
          landid: '',
        })
        .then((res) => {
          if (!res) return;
        })
        .catch(() => {});
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

    .gp-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .gp-group {
      background: #000d1c;
    }

    .gp-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 18px;

      &__video {
        position: relative;
        width: 100%;
        height: 150px;
        background: #000d1c;
        border: 2px solid #004191;
        border-radius: 8px;

        a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          font-size: 16px;
          color: #abf7ff;
          cursor: pointer;
        }
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
