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
        320114: 'rgba(83, 168, 217, 0.5)',
        320117: 'rgba(83, 168, 217, 0.5)',
        320115: 'rgba(83, 168, 217, 0.5)',
        320111: 'rgba(83, 168, 217, 0.5)',
        320118: 'rgba(83, 168, 217, 0.5)',
        320116: 'rgba(83, 168, 217, 0.5)',
        320105: 'rgba(83, 168, 217, 0.5)',
        320106: 'rgba(83, 168, 217, 0.5)',
        320104: 'rgba(83, 168, 217, 0.5)',
        320102: 'rgba(83, 168, 217, 0.5)',
        320113: 'rgba(83, 168, 217, 0.5)',
        320322: 'rgba(83, 168, 217, 0.5)',
        320303: 'rgba(83, 168, 217, 0.5)',
        320582: 'rgba(83, 168, 217, 0.5)',
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

        // that.addMarker(); // 添加marker标记

        let content = [];
        //实例化信息窗体
        content.push(
          '<div class="gp-map__marker">\n' +
            ' <div class="gp-map__marker--header">\n' +
            '   <span>基本信息</span>\n' +
            '   <div id="closeX" class="gp-map__marker--close"></div>\n' +
            ' </div>\n' +
            ' <div class="gp-map__marker--body">\n' +
            '   <p>品种：品种蒜头  </p>\n' +
            '   <p>类型：蒜头</p>\n' +
            '   <p>面积：130亩</p>\n' +
            ' </div>\n' +
            ' <div class="gp-map__marker--footer"><a> 查看详情 > </a></div>\n' +
            '</div>'
        );

        that.infoWindow = new AMap.InfoWindow({
          anchor: 'top-left',
          isCustom: true, //使用自定义窗体
          content: content, //调用创建信息窗体的方法--信息窗体的内容
          offset: new AMap.Pixel(35, -10),
        });

        that.infoWindow.on('open', that.showInfoOpen);
      });
    },

    //打开信息窗体
    showInfoOpen() {
      let closeX = document.getElementById('closeX');
      //方法一: 为dom元素绑定js事件
      closeX.onclick = this.closeInfoWindow;
      //方法二: 为dom元素绑定js事件
      //.addEventListener("click", this.closeInfoWindow)
    },

    //添加marker标记
    addMarker() {
      // 绑定点
      let lnglats = [
        [118.796911, 32.063653], // 南京
        [118.276374, 33.960094], // 宿迁
      ];

      let that = this;
      that.map.clearMap();

      for (let i = 0; i < lnglats.length; i++) {
        let marker = new AMap.Marker({
          map: that.map,
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
          position: lnglats[i],
        });
        //鼠标点击marker弹出自定义的信息窗体
        marker.on('click', function () {
          that.infoWindow.open(that.map, marker.getPosition());
        });
      }
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
