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
      this.addMarker(this.lonLatData);
    },
  },
  data() {
    return {
      loading: true,
      map: null,
      zoom: 7.8,
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
        // 320117: 'rgba(83, 168, 217, 0.5)',
        // 320115: 'rgba(83, 168, 217, 0.5)',
        // 320111: 'rgba(83, 168, 217, 0.5)',
        // 320118: 'rgba(83, 168, 217, 0.5)',
        // 320116: 'rgba(83, 168, 217, 0.5)',
        // 320105: 'rgba(83, 168, 217, 0.5)',
        // 320106: 'rgba(83, 168, 217, 0.5)',
        // 320104: 'rgba(83, 168, 217, 0.5)',
        // 320102: 'rgba(83, 168, 217, 0.5)',
        // 320113: 'rgba(83, 168, 217, 0.5)',
        // 320322: 'rgba(83, 168, 217, 0.5)',
        // 320303: 'rgba(83, 168, 217, 0.5)',
        // 320582: 'rgba(83, 168, 217, 0.5)',
      },
    };
  },
  mounted() {
    //调用地图初始化方法
    // this.initAMap();
    console.log(this.mapColor);
  },
  methods: {
    initAMap() {
      let that = this;
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

        setTimeout(() => {
          that.addMarker(that.mapData); // 添加marker标记
          // that.map.panBy(-400, 100); // 偏移位置
        }, 3000);
      });
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

      // that.map.on('complete', function () {
      //   that.loading = false;

      //   // that.addMarker(); // 添加marker标记

      //   let content = [];
      //   //实例化信息窗体
      //   content.push(
      //     '<div class="gp-map__marker">\n' +
      //       ' <div class="gp-map__marker--header">\n' +
      //       '   <span>基本信息</span>\n' +
      //       '   <div id="closeX" class="gp-map__marker--close"></div>\n' +
      //       ' </div>\n' +
      //       ' <div class="gp-map__marker--body">\n' +
      //       '   <p>品种: 品种蒜头  </p>\n' +
      //       '   <p>类型: 蒜头</p>\n' +
      //       '   <p>面积: 130亩</p>\n' +
      //       ' </div>\n' +
      //       ' <div class="gp-map__marker--footer"><a> 查看详情 > </a></div>\n' +
      //       '</div>'
      //   );

      //   that.infoWindow = new AMap.InfoWindow({
      //     anchor: 'top-left',
      //     isCustom: true, //使用自定义窗体
      //     content: content, //调用创建信息窗体的方法--信息窗体的内容
      //     offset: new AMap.Pixel(35, -10),
      //   });

      //   that.infoWindow.on('open', that.showInfoOpen);
      // });
    },
    //添加marker标记
    addMarker(mapDatas) {
      this.map.clearMap();
      let that = this;
      console.log('mapDatas', mapDatas);

      // 绑定点
      for (let i = 0; i < mapDatas.length; i++) {
        let marker = new AMap.Marker({
          map: that.map,
          icon: require('../../../assets/images/icon/mark3.png'),
          title: mapDatas[i].townName,
          zIndex: mapDatas.length - i,
          cursor: 'pointer',
          position: [mapDatas[i].longitude, mapDatas[i].latitude],
        });
        marker.setTitle(mapDatas[i].townName);
        marker.extData = mapDatas[i];

        that.markers.push(
          new AMap.Marker({
            icon: require('../../../assets/images/icon/mark3.png'),
            position: [mapDatas[i].longitude, mapDatas[i].latitude],
          })
        );

        //鼠标点击marker返回参数
        marker.on('click', function (e) {
          that.$emit('ok', e.target.extData);
          // console.log(that.markers);
          // setTimeout(() => {
          //   that.map.remove(that.markers);
          // }, 1000);
        });
      }

      that.map.setFitView(null, false, [250, 150, 600, 60], 15);
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
