<template>
  <div class="gp-bg" :style="{ height: windowHeight + 'px' }">
    <dv-loading class="gp-loading" v-show="loading">Loading...</dv-loading>
    <div id="container"></div>
  </div>
</template>

<script>
import AMap from 'AMap';
// import { forEach } from 'lodash';

export default {
  name: 'FormulaMaps',
  data() {
    return {
      //实时屏幕高度
      windowHeight: document.documentElement.clientHeight,
      loading: true,
      map: null,
      city: ['320000'], // 江苏省徐州市 '320000', '320300'
      zoom: 7.8,
      depth: 2,
      adcode: 320000,
      center: [120.530903, 33.112126],
      options: [],
      markers: [],
      district: '江苏省',
      mapStyle: 'darkblue', // darkblue, grey, dark
      mapColors: {
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
    };
  },
  mounted() {
    // 当浏览器被重置大小时执行
    window.onresize = () => {
      return (() => {
        this.windowHeight = document.documentElement.clientHeight;
      })();
    };
    //调用地图初始化方法
    this.initAMap();
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
    initAMap() {
      const that = this;
      this.map = new AMap.Map('container', {
        zoom: that.zoom,
        pitch: 0,
        center: that.center,
      });

      let mapStyle = 'amap://styles/' + that.mapStyle;
      that.map.setMapStyle(mapStyle); // 设置主题颜色

      //行政区划查询
      that.district = new AMap.DistrictSearch({
        subdistrict: 3, // 0：不返回下级行政区 1：返回下一级行政区 2：返回下两级行政区 3：返回下三级行政区
        showbiz: false, //最后一级返回街道信息
      }); //注意：需要使用插件同步下发功能才能这样直接使用

      that.district.search('中国', function (status, result) {
        if (status == 'complete') {
          let subList = result.districtList[0].districtList;
          /*
                利用级联  subList 数组 -> json 进行替换 -> 数组
                因为citycode只到县区一级 描边又无法描出乡镇 又因最多只能返回下三级 所以这里我只用三级联动
                如果实在是想显示四级,可以把省份单独抽出来也可以实现
                这里太烧脑 陆陆续续写了一天 暂时就这样吧
             */
          that.options = JSON.parse(
            JSON.stringify(subList)
              .replace(/adcode/g, 'value')
              .replace(/name/g, 'label')
              .replace(/districtList/g, 'children')
          );
        }
      });

      that.map.on('complete', function () {
        that.initPro();
        // that.map.panBy(-320, 700); // 偏移位置
      });
    },

    // 创建省份图层
    initPro() {
      const that = this;
      that.disProvince && that.disProvince.setMap(null);
      that.disProvince = new AMap.DistrictLayer.Province({
        zIndex: 12,
        adcode: [that.adcode],
        depth: that.depth,
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
    },

    // 颜色辅助方法
    getColorByAdcode(adcode) {
      if (this.mapColors[adcode]) {
        return this.mapColors[adcode];
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
