<template>
  <div class="gp-bg">
    <dv-loading v-if="loading">Loading...</dv-loading>
    <el-container v-else class="gp gp-home">
      <el-header>
        <div class="gp-flex">
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
        <div class="gp-flex">
          <div class="gp-number left">
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
          <div class="gp-center">
            <div class="gp-map">
              <div class="gp-map__information">
                <JSMap class="jsmap" :cdata="cdata" />
                <div class="gp-map__orbits"></div>
              </div>

              <div class="__bg"></div>
              <div v-for="(item, index) in suspend" :key="index" :class="`gp-map__suspend ${item.className}`">
                <router-link :to="`${item.path}`">
                  <p>{{ item.name }}</p>
                  <span></span>
                </router-link>
              </div>
            </div>
          </div>
          <div class="gp-number right">
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
import JSMap from '@/components/maps/JiangSu.vue';

export default {
  name: 'HomeView',
  components: { countTo, JSMap },
  data() {
    return {
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
      numberData: [],
      cdata: [
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
    this.cancelLoading();
    this.suspend = [
      { name: '社会化服务', className: '__shhfw', path: '/procurement' },
      { name: '产业信息', className: '__cyxx', path: '/basic-information' },
      { name: '科学监测', className: '__kxjc', path: '/anchor-point' },
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

<style lang="scss" scoped>
.gp {
  .jsmap {
    position: relative;
    z-index: 10;
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
}
</style>
