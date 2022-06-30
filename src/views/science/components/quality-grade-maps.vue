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
  name: 'quality-grade-maps',
  data() {
    return {
      loading: true,
      map: null,
      zoom: 9,
      level: 'district',
      depth: 2,
      adcode: 320000,
      center: [117.283752, 32.704224],
      district: '江苏省',
      mapStyle: 'darkblue', // darkblue, grey
      polygons: [],
      infoWindow: null,
      colors: {
        320302: 'rgba(79, 255, 245, 0.5)', // 鼓楼区
        320303: 'rgba(79, 255, 245, 0.5)', // 云龙区
        320305: 'rgba(79, 255, 245, 0.5)', // 贾汪区
        320311: 'rgba(79, 255, 245, 0.5)', // 泉山区
        320312: 'rgba(79, 255, 245, 0.5)', // 铜山区
        320321: 'rgba(79, 255, 245, 0.5)', // 丰县
        320322: 'rgba(79, 255, 245, 0.5)', // 沛县
        320324: 'rgba(79, 255, 245, 0.5)', // 睢宁县
        320381: 'rgba(79, 255, 245, 0.5)', // 新沂市
        320382: 'rgba(79, 255, 245, 0.5)', // 邳州
      },
      markers: [
        {
          name: '沛县',
          position: [116.727222, 34.888222],
          icon: require('../../../assets/images/icon/mark-green.png'),
        },
        {
          name: '丰县',
          position: [116.658111, 34.697232],
          icon: require('../../../assets/images/icon/mark3.png'),
        },
        {
          name: '铜山区',
          position: [117.169698, 34.181162],
          icon: require('../../../assets/images/icon/mark3.png'),
        },
        {
          name: '邳州市',
          position: [118.012511, 34.339208],
          icon: require('../../../assets/images/icon/mark3.png'),
        },
        {
          name: '贾汪区',
          position: [117.452222, 34.441222],
          icon: require('../../../assets/images/icon/mark3.png'),
        },
      ],
    };
  },

  mounted() {
    //调用地图初始化方法
    this.initAMap();
    this.addMarker(); // 添加marker标记
  },
  methods: {
    initAMap() {
      //创建地图
      const that = this;
      this.map = new AMap.Map('container', {
        zoom: that.zoom,
        center: that.center,
        pitch: 0,
        viewMode: '3D',
      });

      this.map.on('complete', function () {
        that.loading = false;
        that.initPro(that.adcode, that.depth);
        that.map.panBy(-200, 450); // 偏移位置
      });
    },

    // 创建省份图层
    initPro(adcodes, depths) {
      const that = this;
      this.disProvince && this.disProvince.setMap(null);
      this.disProvince = new AMap.DistrictLayer.Province({
        zIndex: 12,
        adcode: [adcodes],
        depth: depths,
        styles: {
          fill: function (properties) {
            let adcode = properties.adcode;
            return that.getColorByAdcode(adcode);
          },
          'province-stroke': 'rgba(83, 168, 217, 1)',
          'city-stroke': 'rgba(129, 213, 241, 0.2)', // 中国地级市边界
          'county-stroke': 'rgba(129, 213, 241, 0.1)', // 中国区县边界
        },
      });

      this.disProvince.setMap(this.map);

      // 使用CSS默认样式定义地图上的鼠标样式
      this.map.setDefaultCursor('pointer');
      let mapStyle = 'amap://styles/' + this.mapStyle;
      this.map.setMapStyle(mapStyle); // 设置主题颜色
    },

    //添加marker标记
    addMarker() {
      const lonLatData = this.markers;
      this.map.clearMap();

      this.infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(15, -5) });

      lonLatData.forEach((item, i) => {
        let marker = new AMap.Marker({
          map: this.map,
          icon: require('../../../assets/images/icon/mark3.png'),
          title: item.name,
          cursor: 'pointer',
          zIndex: lonLatData.length - i,
          position: item.position,
        });
        marker.content = item.name;
        marker.on('click', this.markerClick);
        marker.emit('click', { target: marker });
      });
    },
    markerClick(e) {
      this.$emit('ok', e.target.content);
      this.infoWindow.setContent(e.target.content);
      this.infoWindow.open(this.map, e.target.getPosition());
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
