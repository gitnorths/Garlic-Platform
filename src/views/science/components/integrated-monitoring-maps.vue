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
  name: 'IntegratedMonitoringMaps',
  props: {
    mapData: {
      type: Array,
      required: true,
    },
  },
  watch: {
    mapData() {
      this.initAMap();
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
      mapStyle: 'darkblue', // darkblue, grey
      district: '江苏省',
      markers: [],
      polygons: [],
      colors: {
        320303: 'rgba(79, 255, 245, 0.5)', // 云龙区
        320305: 'rgba(79, 255, 245, 0.5)', // 贾汪区
        320321: 'rgba(79, 255, 245, 0.5)', // 丰县
        320302: 'rgba(79, 255, 245, 0.5)', // 鼓楼区
        320322: 'rgba(79, 255, 245, 0.5)', // 沛县
        320312: 'rgba(79, 255, 245, 0.5)', // 铜山区
        320311: 'rgba(79, 255, 245, 0.5)', // 泉山区
        320382: 'rgba(79, 255, 245, 0.5)', // 邳州市
        320324: 'rgba(79, 255, 245, 0.5)', // 睢宁县
        320381: 'rgba(79, 255, 245, 0.5)', // 新沂市
      },
      infoWindow: null,
    };
  },
  mounted() {
    //调用地图初始化方法
    // this.initAMap();
  },
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
        that.map.panBy(-150, 450); // 偏移位置
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

      this.disProvince.setMap(that.map);

      // 使用CSS默认样式定义地图上的鼠标样式
      this.map.setDefaultCursor('pointer');
      let mapStyle = 'amap://styles/' + this.mapStyle;
      this.map.setMapStyle(mapStyle); // 设置主题颜色
    },

    //添加marker标记
    addMarker() {
      const that = this;
      const lonLatData = this.mapData;
      this.map.clearMap();

      this.infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(15, -5) });
      // 绑定点
      lonLatData.forEach((item) => {
        let marker = new AMap.Marker({
          map: that.map,
          title: item.address,
          icon: require('../../../assets/images/icon/mark3.png'),
          position: [item.longitude, item.latitude],
          encoderId: item.encoderId,
        });
        marker.content = item.address;
        marker.on('click', this.markerClick);
        marker.emit('click', { target: marker });
      });

      // that.map.setFitView(overlays, immediately, avoid, maxZoom); // 无参数时，自动自适应所有覆盖物
      // overlays (Array<Overlay>) 覆盖物
      // immediately (Boolean = false) 是否立即过渡
      // avoid (Array<Number> = [60,60,60,60]) 四周边距，上、下、左、右
      // maxZoom (Number = zooms[1]) 最大 zoom 级别

      // that.map.setFitView(null, false, [50, 150, 50, 600], 15);
    },
    markerClick(e) {
      this.$emit('ok', e.target._originOpts.encoderId);
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
