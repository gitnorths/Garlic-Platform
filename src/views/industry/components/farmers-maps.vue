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
  name: 'FarmersMaps',
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
      //调用地图初始化方法
      this.initAMap();
    },
    lonLatData() {
      if (this.lonLatData.length != 0) {
        this.addMarker();
      } else {
        this.map.clearMap();
      }
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
      colors: {},
    };
  },
  mounted() {
    this.initAMap();
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
        that.map.panBy(-200, 750); // 偏移位置
      });
    },

    // 创建省份图层
    initPro(adcodes, depths) {
      let that = this;
      this.disProvince && this.disProvince.setMap(null);
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

      this.disProvince.setMap(that.map);

      // 使用CSS默认样式定义地图上的鼠标样式
      this.map.setDefaultCursor('pointer');
      let mapStyle = 'amap://styles/' + this.mapStyle;
      this.map.setMapStyle(mapStyle); // 设置主题颜色
    },

    //添加marker标记
    addMarker() {
      const lonLatData = this.lonLatData;
      this.map.clearMap();
      let that = this;

      // 绑定点
      lonLatData.forEach((item, i) => {
        let marker = new AMap.Marker({
          map: that.map,
          icon: require('../../../assets/images/icon/mark3.png'),
          title: item.nickname,
          zIndex: i,
          cursor: 'pointer',
          position: [item.longitude, item.latitude],
        });
        marker.setTitle(item.nickname);
        marker.extData = item;

        that.markers.push(
          new AMap.Marker({
            icon: require('../../../assets/images/icon/mark3.png'),
            position: [item.longitude, item.latitude],
          })
        );

        //鼠标点击marker弹出自定义的信息窗体
        marker.on('click', function () {
          let content = [];
          //实例化信息窗体
          content.push(
            `<div class="gp-map__marker">\n
              <div class="gp-map__marker--header">\n
              <span>${item.typeName}基本信息</span>\n
              <div id="closeX" class="gp-map__marker--close"></div>\n
              </div>\n
              <div class="gp-map__marker--body">\n
              <p>用户类型：${item.typeName}</p>\n
              <p>用户名称：${item.nickname}</p>\n
              <p>地址：${item.fullAddress}</p>\n
              </div>\n
              </div>`
          );
          // <div class="gp-map__marker--footer"><a> 查看详情 > </a></div>\n

          that.infoWindow = new AMap.InfoWindow({
            anchor: 'top-left',
            isCustom: true, //使用自定义窗体
            content: content, //调用创建信息窗体的方法--信息窗体的内容
            offset: new AMap.Pixel(50, -10),
          });

          that.infoWindow.open(that.map, marker.getPosition());
          that.infoWindow.on('open', that.showInfoWindow);
        });
      });

      // that.map.setFitView(null, false, [50, 50, 350, 750], 15);
    },

    //打开信息窗体
    showInfoWindow() {
      let closeX = document.getElementById('closeX');
      //方法一: 为dom元素绑定js事件
      closeX.onclick = this.closeInfoWindow;
      //方法二: 为dom元素绑定js事件
      //.addEventListener("click", this.closeInfoWindow)
    },

    //关闭信息窗体
    closeInfoWindow() {
      this.map.clearInfoWindow();
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
