<template>
  <div class="gp-bg">
    <dv-loading v-if="loading">Loading...</dv-loading>
    <el-container v-else class="gp gp-home">
      <el-header>
        <div class="gp-flex">
          <!-- <dv-decoration-10 style="width: 347px; height: 2px; position: absolute; top: 14px; left: 92px" /> -->
          <div class="left">
            <span>{{ toDay }}</span>
          </div>
          <div class="right">
            <!-- <el-link :underline="false">
              <el-avatar :size="42" :src="setting"></el-avatar>
              设置
            </el-link>
            <el-link :underline="false">
              <el-avatar :size="42" :src="message"></el-avatar>
              消息
            </el-link> -->
            <el-link :underline="false">
              <el-avatar :size="42" :src="user"></el-avatar>
              {{ username }}
            </el-link>
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="gp-flex">
          <div class="gp-number left">
            <ul>
              <li v-for="(item, index) in numberLeftData" :key="index">
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
          <div class="gp-center">
            <div class="gp-map">
              <div class="gp-map__information">
                <JSMap class="jsmap" :mapData="mapData" />
                <div class="gp-map__orbits">
                  <div class="pulse">
                    <div class="ring"></div>
                    <div class="ring"></div>
                    <div class="ring"></div>
                    <div class="ring"></div>
                  </div>
                </div>
              </div>

              <!-- <div class="__bg"></div> -->
              <div v-for="(item, index) in suspend" :key="index" :class="`gp-map__suspend ${item.className}`">
                <router-link :to="`${item.path}`">
                  <p>{{ item.name }}</p>
                  <span></span>
                </router-link>
              </div>
            </div>
          </div>
          <div class="gp-bottom"></div>
          <div class="gp-number right">
            <ul>
              <li v-for="(item, index) in numberRightData" :key="index">
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
import qs from 'qs';
// import { toNumber } from 'lodash';
import countTo from 'vue-count-to';
import JSMap from '@/components/maps/JiangSu.vue';
import { arrToMap } from '@/utils';
import { DayWeek } from '@/enums/option';

export default {
  name: 'HomeView',
  components: { countTo, JSMap },
  computed: {
    dayWeeklMap() {
      return arrToMap(DayWeek);
    },
  },
  data() {
    return {
      toDay: null,
      timeId: null,
      timing: null,
      loading: true,
      setting: require('../../assets/images/icon/setting.png'),
      message: require('../../assets/images/icon/message.png'),
      user: require('../../assets/images/icon/user.png'),
      decimals: 1,
      duration: 1500,
      startVal: 0,
      endVal: 0,
      suspend: [],
      username: '',
      numberLeftData: [],
      numberRightData: [],
      mapData: [
        {
          name: '盐城',
          value: 20,
        },
        {
          name: '徐州',
          value: 10,
        },
      ],
    };
  },
  mounted() {
    this.getInfo();
    this.timeId = setInterval(() => {
      this.toDay = this.$dayjs().format('YYYY年MM月DD日 HH:mm:ss') + '  ' + this.dayWeeklMap[this.$dayjs().day()];
    }, 1000);
    this.cancelLoading();
    this.suspend = [
      { name: '社会化服务', className: '__shhfw', path: '/procurement' },
      { name: '产业信息', className: '__cyxx', path: '/basic-information' },
      { name: '科学监测', className: '__kxjc', path: '/anchor-point' },
    ];

    if (sessionStorage.getItem('UserData')) {
      const userData = JSON.parse(sessionStorage.getItem('UserData'));
      this.username = userData.nickname;
    }
  },
  beforeDestroy() {
    clearInterval(this.timing);
  },
  methods: {
    async getInfo() {
      // 左侧数据
      this.$api
        .postBaseApi(
          'cc/outputValue/statistics',
          qs.stringify({
            region: '',
            level: '',
          })
        )
        .then((res) => {
          if (!res) return;
          if (res.code === 200) {
            let resData = res.result;
            this.numberLeftData = [];

            for (let i = 0; i < resData.data.length; i++) {
              this.numberLeftData.push({
                name: `${resData.data[i].name}产量`,
                unit: '吨',
                cName: `color${i + 1}`,
                sVal: 0,
                eVal: resData.data[i].value,
              });
            }
          }
        })
        .catch(() => {});
      // 右侧数据
      this.$api
        .postBaseApi(
          'cc/areaVariety/getChartData',
          qs.stringify({
            region: '',
            level: '',
          })
        )
        .then((res) => {
          if (!res) return;
          if (res.code === 200) {
            let resData = res.result;
            this.numberRightData = [];

            for (let i = 0; i < resData.area.length; i++) {
              this.numberRightData.push({
                name: `${resData.area[i].name}种植面积`,
                unit: '亩',
                cName: `color${i + 3}`,
                sVal: 0,
                eVal: resData.area[i].value,
              });
            }
          }
        })
        .catch(() => {});
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .gp-home {
  background-image: url('@/assets/images/home/bg.png');
  background-color: #000000;

  &::after,
  &::before {
    position: absolute;
    left: 0;
    right: 0;
    display: block;
    content: '';
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
  }

  &::after {
    height: 400px;
    bottom: 0;
    background-image: url('@/assets/images/home/bottom.png');
  }

  &::before {
    z-index: 201;
    height: 10px;
    bottom: 20px;
    background-image: url('@/assets/images/home/footer.png');
  }

  .el-header {
    height: 106px !important;
    padding: 0 38px;
    background-image: url('@/assets/images/home/header-center.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;

    .gp-flex {
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }

    span {
      font-size: 16px;
      color: #e2effe;
    }

    .right {
      .el-link {
        margin-left: 40px;

        &--inner {
          display: flex;
          align-items: center;
          color: #ffffff;

          &:hover {
            color: rgba(#ffffff, 0.75);
          }
        }

        .el-avatar {
          background: initial;
          margin-right: 10px;
        }
      }
    }
  }

  .el-main {
    position: relative;
    padding: 0;
    z-index: 101;
    overflow: hidden;

    .gp-flex {
      position: relative;
      height: 100%;

      &::before,
      &::after {
        position: absolute;
        top: 0;
        bottom: 135px;
        display: block;
        content: '';
        width: 172px;
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center center;
      }

      &::before {
        left: 30px;
        background-image: url('@/assets/images/home/left.png');
      }

      &::after {
        right: 30px;
        background-image: url('@/assets/images/home/right.png');
      }

      .gp-number {
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 135px;

        ul {
          li {
            margin: 50px 0;
            color: #ffffff;

            span {
              font-size: 40px;
              font-family: 'DIN-BoldItalic';
              font-style: italic;
              font-weight: bold;

              &.color1 {
                color: #20fbff;
              }
              &.color2 {
                color: #34d2ff;
              }
              &.color3 {
                color: #6996fe;
              }
              &.color4 {
                color: #20fbff;
              }
              &.color5 {
                color: #34d2ff;
              }
            }

            p {
              font-size: 18px;
              font-family: 'PingFang-SC-Medium';
              color: #ffffff;
            }
          }
        }

        &.left {
          left: 155px;
        }

        &.right {
          right: 155px;
        }
      }
    }

    .gp-map {
      display: flex;
      justify-content: center;
      position: relative;
      width: 1412px;
      height: 100%;

      &__information {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
      }

      .__bg {
        position: absolute;
        left: 0;
        bottom: 35px;
        width: 100%;
        height: 300px;
        z-index: -1;
        border-radius: 50%;
        background-color: rgba(29, 83, 131, 0.4);
        box-shadow: 0 0 80px rgba(29, 83, 131, 0.8);
        transform: rotateX(15deg);
        animation: warn 6s ease-in-out;
        animation-iteration-count: infinite;
      }

      &__orbits {
        position: absolute;
        bottom: 0;
        z-index: 10;
        width: 100%;
        height: 401px;
        // transform: rotateX(-70deg) scaleY(2);
        transform-style: preserve-3d; //子元素是位于 3D 空间中

        &::after {
          position: absolute;
          display: block;
          content: '';
          left: 0;
          z-index: 11;
          width: 100%;
          height: 100%;
          background-image: url('@/assets/images/home/disc.png');
          background-repeat: no-repeat;
          background-size: 100%;
          background-position: center bottom;

          // animation-name: operation; //动画名称
          // animation-duration: 6s; //持续时间
          // animation-delay: 1s; //一秒后执行
          // animation-iteration-count: infinite; //无限次播放
          // animation-timing-function: linear; //均速
        }

        .pulse {
          position: absolute;
          left: 0;
          bottom: 0;
          z-index: -1;
          width: 100%;
          height: 246px;
          background-color: #011f3b;
          border-radius: 50%;
          .ring {
            position: absolute;
            background-color: inherit;
            height: 100%;
            width: 100%;
            border-radius: 100%;
            opacity: 0.8;
            animation: pulsing 4s ease-out infinite;

            &:nth-of-type(1) {
              animation-delay: -1.5s;
            }

            &:nth-of-type(2) {
              animation-delay: -3s;
            }

            &:nth-of-type(3) {
              animation-delay: -5.5s;
            }
          }
        }
      }

      &__suspend {
        position: absolute;
        width: 114px;
        height: 114px;
        z-index: 201;

        p {
          position: absolute;
          top: -45px;
          width: 240px;
          height: 56px;
          background-repeat: no-repeat;
          background-size: contain;
          text-indent: -9999px;
        }

        span {
          display: block;
          position: relative;
          height: 100%;
          background-image: url('@/assets/images/home/suspend-bg.png');
          background-repeat: no-repeat;
          background-size: contain;

          &::before {
            position: absolute;
            left: 0;
            top: 0;
            display: block;
            content: '';
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-size: 90px 90px;
            background-position: center center;
          }

          &::after {
            position: absolute;
            left: 0;
            top: 100%;
            display: block;
            content: '';
            width: 114px;
            height: 60px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-image: url('@/assets/images/home/suspend-bot.png');
          }
        }

        &.__shhfw {
          top: 50%;
          left: 50%;
          margin-top: -85px;
          margin-left: -350px;
          p {
            right: -23px;
            background-image: url('@/assets/images/home/suspend-shhfw.png');
          }
          span {
            &::before {
              background-image: url('@/assets/images/home/shhfw.png');
            }
          }
        }

        &.__cyxx {
          top: 120px;
          right: 50%;
          margin-right: -330px;
          p {
            left: -20px;
            background-image: url('@/assets/images/home/suspend-cyxx.png');
          }
          span {
            &::before {
              background-image: url('@/assets/images/home/cyxx.png');
            }
          }
        }

        &.__kxjc {
          top: 50%;
          right: 50%;
          margin-top: -100px;
          margin-right: -460px;
          p {
            left: -20px;
            background-image: url('@/assets/images/home/suspend-kxjc.png');
          }
          span {
            &::before {
              background-image: url('@/assets/images/home/kxjc.png');
            }
          }
        }
      }
    }
  }
}

.gp {
  .jsmap {
    z-index: 101;
    position: relative;
    height: 75vh;
    background-image: url('@/assets/images/home/map.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    transform-style: preserve-3d; //子元素是位于 3D 空间中
  }
  &-marker {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 30px;
    height: 30px;
    z-index: 101;

    &.xuzhou {
      margin-left: -160px;
      margin-top: -230px;
    }

    &__bottom {
      width: 50px;
      height: 50px;
      background-color: #ffff00;
      border-radius: 50%;
      transform: rotateX(-45deg) rotateY(0deg);
    }

    .cuboid {
      position: absolute;
      bottom: 35px;
      left: 17px;
      z-index: 1;
      transform-style: preserve-3d; /* 使得所有子元素在3D空间中呈现 */
      transform: rotateX(-30deg) rotateY(30deg);

      & > div {
        width: 18px;
        position: absolute;
        opacity: 0.5; /* 半透明效果方便查看绘制情况 */
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .back {
        height: 36px;
        background-color: #9900ff;
        transform: rotateY(180deg) translateZ(9px);
      }
      .right {
        height: 36px;
        background-color: #333333;
        transform: rotateY(90deg) translateZ(9px);
      }
      .left {
        height: 36px;
        background-color: #00ff99;
        transform: rotateY(-90deg) translateZ(9px);
      }
      .top {
        height: 18px;
        background-color: #0099ff;
        transform: rotateX(90deg) translateZ(9px);
      }
      .bottom {
        height: 18px;
        background-color: #ffcc00;
        transform: rotateX(-90deg) translateZ(27px);
      }
      .front {
        height: 36px;
        background-color: #ff5757;
        transform: rotateY(0deg) translateZ(9px);
      }
    }
  }

  &-center {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  &-bottom {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 400px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-image: url('@/assets/images/home/bot1.png');

    &::before {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      display: block;
      content: '';
      background-repeat: no-repeat;
      background-size: 100%;
    }

    &::before {
      background-image: url('@/assets/images/home/bot2.png');
    }
  }
}
</style>
