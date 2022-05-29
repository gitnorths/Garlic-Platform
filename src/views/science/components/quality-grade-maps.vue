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
      infoWindow: null,
      mapStyle: 'darkblue', // darkblue, grey
      level: 'district',
      district: '江苏省',
      polygons: [],
      zoom: 7.8,
      adcode: 320000,
      center: [117.283752, 32.704224],
      depth: 2,
      colors: {
        320302: 'rgba(83, 168, 217, 0.5)', // 鼓楼区
        320303: 'rgba(83, 168, 217, 0.5)', // 云龙区
        320305: 'rgba(83, 168, 217, 0.5)', // 贾汪区
        320311: 'rgba(83, 168, 217, 0.5)', // 泉山区
        320312: 'rgba(83, 168, 217, 0.5)', // 铜山区
        320321: 'rgba(83, 168, 217, 0.5)', // 丰县
        320322: 'rgba(79, 255, 245, 0.5)', // 沛县
        320324: 'rgba(83, 168, 217, 0.5)', // 睢宁县
        320381: 'rgba(83, 168, 217, 0.5)', // 新沂市
        320382: 'rgba(83, 168, 217, 0.5)', // 邳州
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
  },
  methods: {
    initAMap() {
      //创建地图
      let that = this;
      this.map = new AMap.Map('container', {
        zoom: 7.8,
        center: [117.283752, 32.704224],
        pitch: 0,
        viewMode: '3D',
      });

      this.map.on('complete', function () {
        that.loading = false;
        that.initPro(that.adcode, that.depth);
        setTimeout(() => {
          that.addMarker(); // 添加marker标记
          // 第一个参数为空，表明用图上所有覆盖物 setFitview
          // 第二个参数为false, 非立即执行
          // 第三个参数设置上左下右的空白
          that.map.setFitView(null, false, [150, 150, 150, 150]);
          // that.map.panBy(-400, 100);
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
    },

    //添加marker标记
    addMarker() {
      let that = this;
      that.map.clearMap();

      for (let i = 0; i < that.markers.length; i++) {
        that.map.add(that.markers[i]);
        let marker = new AMap.Marker({
          map: that.map,
          // icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png',
          icon: that.markers[i].icon,
          position: that.markers[i].position,
        });
        marker.content = that.markers[i].name;
        //鼠标点击marker弹出自定义的信息窗体
        marker.on('click', function (e) {
          // console.log(e.target.content);

          that.$emit('ok', e.target.content);

          that.colors = {
            320302: 'rgba(79, 255, 245, 0.5)', // 鼓楼区
          };
        });
      }
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
