<template>
  <div style="width: 100%; height: 100%">
    <dv-loading class="dv-loading" v-show="loading">Loading...</dv-loading>
    <div id="container"></div>
  </div>
</template>

<script>
import AMap from 'AMap';
// import { forEach } from 'lodash';
import { Message } from 'element-ui';

export default {
  name: 'CYXX',
  data() {
    return {
      loading: false,
      map: null,
      mapStyle: 'darkblue', // darkblue, grey
      level: 'district',
      district: '江苏省',
      polygons: [],
      zoom: 7.5,
      adcode: 320000,
      depth: 2,
      colors: {
        320114: 'rgba(91, 146, 255, 1)',
        320117: 'rgba(91, 146, 255, 1)',
        320115: 'rgba(91, 146, 255, 1)',
        320111: 'rgba(91, 146, 255, 1)',
        320118: 'rgba(91, 146, 255, 1)',
        320116: 'rgba(91, 146, 255, 1)',
        320105: 'rgba(91, 146, 255, 1)',
        320106: 'rgba(91, 146, 255, 1)',
        320104: 'rgba(91, 146, 255, 1)',
        320102: 'rgba(91, 146, 255, 1)',
        320113: 'rgba(91, 146, 255, 1)',
        320322: 'rgba(0, 255, 207, 1)',
        320303: 'rgba(26, 251, 255, 1)',
        320582: 'rgba(36, 251, 255, 1)',
      },
    };
  },
  mounted() {
    //调用地图初始化方法
    this.initAMap();
  },
  methods: {
    initAMap() {
      let that = this;
      //创建地图
      this.map = new AMap.Map('container', {
        zoom: that.zoom,
        center: [118.767413, 32.941544],
        pitch: 0,
        viewMode: '3D',
      });

      that.initPro(that.adcode, that.depth);
    },

    // 创建省份图层
    initPro(adcodes, depths) {
      let that = this;
      that.disProvince && that.disProvince.setMap(null);
      that.disProvince = new AMap.DistrictLayer.Province({
        zIndex: 12,
        adcode: [adcodes],
        depth: depths,
        styles: {
          fill: function (properties) {
            // properties为可用于做样式映射的字段，包含
            // NAME_CHN:中文名称
            // adcode_pro
            // adcode_cit
            // adcode
            let adcode = properties.adcode;
            return that.getColorByAdcode(adcode);
          },
          'province-stroke': 'rgba(83, 168, 217, 1)',
          'city-stroke': 'rgba(129, 213, 241, 0.2)', // 中国地级市边界
          'county-stroke': 'rgba(129, 213, 241, 0.1)', // 中国区县边界
        },
      });

      that.disProvince.setMap(that.map);

      // 使用CSS默认样式定义地图上的鼠标样式
      that.map.setDefaultCursor('pointer');
      let mapStyle = 'amap://styles/' + this.mapStyle;
      that.map.setMapStyle(mapStyle); // 设置主题颜色

      that.map.on('complete', function () {
        that.loading = false;

        Message({
          message: '地图加载完成',
          type: 'success',
        });
      });
    },

    // 颜色辅助方法
    getColorByAdcode(adcode) {
      if (this.colors[adcode]) {
        return this.colors[adcode];
      } else {
        return 'rgba(0, 39, 97, 0.5)';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.dv-loading {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 101;
}
</style>
