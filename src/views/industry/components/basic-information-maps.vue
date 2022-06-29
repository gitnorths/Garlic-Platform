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
  name: 'MapsView',
  props: {
    mapData: {
      type: Array,
      required: true,
    },
    mapColor: {
      type: Object,
      require: true,
    },
    lonLatData: {
      type: Array,
      required: true,
    },
  },
  watch: {
    mapData() {
      this.initAMap();
    },
    lonLatData() {
      this.addMarker();
    },
  },
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
      markers: [],
      polygons: [],
      infoWindow: null,
      colors: {
        // 320114: 'rgba(83, 168, 217, 0.5)',
      },
    };
  },
  mounted() {},
  methods: {
    initAMap() {
      const that = this;
      //创建地图
      this.map = new AMap.Map('container', {
        zoom: that.zoom,
        center: that.center,
        pitch: 0,
        viewMode: '3D',
      });

      this.map.on('complete', function () {
        that.loading = false;
        that.initPro(that.adcode, that.depth);
        that.map.panBy(-50, 750); // 偏移位置
      });
    },

    // 创建省份图层
    initPro(adcodes, depths) {
      let that = this;
      this.disProvince && that.disProvince.setMap(null);
      this.disProvince = new AMap.DistrictLayer.Province({
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

      this.disProvince.setMap(this.map);

      // 使用CSS默认样式定义地图上的鼠标样式
      this.map.setDefaultCursor('pointer');
      let mapStyle = 'amap://styles/' + this.mapStyle;
      this.map.setMapStyle(mapStyle); // 设置主题颜色

      // setTimeout(() => {
      // this.addMarker(this.mapData); // 添加marker标记
      // }, 3000);
    },
    //添加marker标记
    addMarker() {
      const mapDatas = this.lonLatData;
      this.map.clearMap();

      // 绑定点
      for (let i = 0; i < mapDatas.length; i++) {
        let marker = new AMap.Marker({
          map: this.map,
          icon: require('../../../assets/images/icon/mark3.png'),
          title: mapDatas[i].townName,
          zIndex: mapDatas.length - i,
          cursor: 'pointer',
          position: [mapDatas[i].longitude, mapDatas[i].latitude],
        });
        marker.setTitle(mapDatas[i].townName);
        marker.extData = mapDatas[i];

        this.markers.push(
          new AMap.Marker({
            icon: require('../../../assets/images/icon/mark3.png'),
            position: [mapDatas[i].longitude, mapDatas[i].latitude],
          })
        );

        //鼠标点击marker返回参数
        marker.on('click', function (e) {
          this.$emit('ok', e.target.extData);
        });
      }

      // this.map.setFitView(null, false, [50, 50, 950, 150], 12);
    },

    // 颜色辅助方法
    getColorByAdcode(adcode) {
      if (this.mapColor[adcode]) {
        return this.mapColor[adcode];
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
