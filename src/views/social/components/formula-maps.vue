<template>
  <div class="gp-bg">
    <dv-loading class="gp-loading" v-show="loading">Loading...</dv-loading>
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
      loading: true,
      map: null,
      infoWindow: null,
      mapStyle: 'darkblue', // darkblue, grey
      level: 'district',
      district: '江苏省',
      polygons: [],
      zoom: 9,
      adcode: 320000,
      depth: 2,
      colors: {
        320302: 'rgba(83, 168, 217, 0.5)', // 鼓楼区
        320303: 'rgba(83, 168, 217, 0.5)', // 云龙区
        320305: 'rgba(79, 255, 245, 0.5)', // 贾汪区
        320311: 'rgba(83, 168, 217, 0.5)', // 泉山区
        320312: 'rgba(83, 168, 217, 0.5)', // 铜山区
        320321: 'rgba(83, 168, 217, 0.5)', // 丰县
        320322: 'rgba(83, 168, 217, 0.5)', // 沛县
        320324: 'rgba(83, 168, 217, 0.5)', // 睢宁县
        320381: 'rgba(83, 168, 217, 0.5)', // 新沂市
        320382: 'rgba(83, 168, 217, 0.5)', // 邳州
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
      this.map.panBy(-420, 100);

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

        that.addMarker(); // 添加marker标记

        let content = [];
        //实例化信息窗体
        content.push(
          '<div class="gp-map__marker __marker2">\n' +
            ' <div class="gp-map__marker--header header2">\n' +
            '   <span>耕地等级面积及耕地面积占比</span>\n' +
            '   <div id="closeX" class="gp-map__marker--close close2"></div>\n' +
            ' </div>\n' +
            ' <div class="gp-map__marker--nav">\n' +
            '   <span>2021年 铜山区茂春镇大庄村</span>\n' +
            ' </div>\n' +
            ' <div class="gp-map__marker--body body2">\n' +
            ' </div>\n' +
            '</div>'
        );

        that.infoWindow = new AMap.InfoWindow({
          anchor: 'top-left',
          isCustom: true, //使用自定义窗体
          content: content, //调用创建信息窗体的方法--信息窗体的内容
          offset: new AMap.Pixel(65, -180),
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
        [117.465137, 34.536492], // 贾汪区
        [116.658111, 34.697232], // 丰县
        [117.169698, 34.181162], // 铜山区
        [118.012511, 34.339208], // 邳州市
        [117.169698, 34.181162], // 铜山区
      ];

      let that = this;
      that.map.clearMap();

      for (let i = 0; i < lnglats.length; i++) {
        let marker = new AMap.Marker({
          map: that.map,
          // icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
          icon:
            i === 0
              ? require('../../../assets/images/icon/mark-green.png')
              : require('../../../assets/images/icon/mark.png'),
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
