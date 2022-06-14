<template>
  <div class="gp-bg">
    <dv-loading class="gp-loading" v-show="loading">Loading...</dv-loading>
    <div id="container"></div>
  </div>
</template>

<script>
import AMap from 'AMap';
// import { forEach } from 'lodash';

export default {
  name: 'CYXX',
  data() {
    return {
      loading: true,
      map: null,
      infoWindow: null,
      mapStyle: 'darkblue', // darkblue, grey
      level: 'district',
      district: '江苏省',
      polygons: [],
      zoom: 7.5,
      adcode: 320000,
      depth: 2,
      colors: {
        // 320302: 'rgba(83, 168, 217, 0.5)', // 鼓楼区
        // 320303: 'rgba(83, 168, 217, 0.5)', // 云龙区
        // 320305: 'rgba(79, 255, 245, 0.5)', // 贾汪区
        // 320311: 'rgba(83, 168, 217, 0.5)', // 泉山区
        // 320312: 'rgba(83, 168, 217, 0.5)', // 铜山区
        // 320321: 'rgba(83, 168, 217, 0.5)', // 丰县
        // 320322: 'rgba(83, 168, 217, 0.5)', // 沛县
        // 320324: 'rgba(83, 168, 217, 0.5)', // 睢宁县
        // 320381: 'rgba(83, 168, 217, 0.5)', // 新沂市
        // 320382: 'rgba(83, 168, 217, 0.5)', // 邳州
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
        center: [117.283752, 34.204224],
        pitch: 0,
        viewMode: '3D',
      });
      this.map.panBy(-450, -100);

      that.initPro(that.adcode, that.depth);
    },

    // 创建省份图层
    initPro(adcodes, depths) {
      let that = this;
      that.disProvince && that.disProvince.setMap(null);
      that.disProvince = new AMap.DistrictLayer.Province({
        zIndex: 1,
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
.gp-loading {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 101;
}
</style>
