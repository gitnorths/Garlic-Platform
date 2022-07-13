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
      this.loading = false;
      if (this.lonLatData.length != 0) {
        this.addMarker();
      } else {
        this.map.clearMap();
      }
    },
  },
  data() {
    return {
      //实时屏幕高度
      windowHeight: document.documentElement.clientHeight,
      loading: true,
      map: null,
      city: ['320000'], // 江苏省徐州市 '320000', '320300'
      zoom: 9,
      depth: 2,
      adcode: 320000,
      center: [117.283752, 32.704224],
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
      infoWindow: null,
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
  },
  methods: {
    initAMap() {
      let that = this;
      this.map = new AMap.Map('container', {
        zoom: that.zoom,
        pitch: 0,
        center: that.center,
      });

      let mapStyle = 'amap://styles/' + this.mapStyle;
      this.map.setMapStyle(mapStyle); // 设置主题颜色

      //行政区划查询
      this.district = new AMap.DistrictSearch({
        subdistrict: 3, // 0：不返回下级行政区 1：返回下一级行政区 2：返回下两级行政区 3：返回下三级行政区
        showbiz: false, //最后一级返回街道信息
      }); //注意：需要使用插件同步下发功能才能这样直接使用

      this.district.search('中国', function (status, result) {
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

      this.map.on('complete', function () {
        that.initPro();
      });
    },

    // 创建省份图层
    initPro() {
      const that = this;
      this.disProvince && this.disProvince.setMap(null);
      this.disProvince = new AMap.DistrictLayer.Province({
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

      this.disProvince.setMap(this.map);
    },

    //添加marker标记
    addMarker() {
      const lonLatData = this.lonLatData;
      this.map.clearMap();

      // 绑定点
      this.infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(15, -5) });

      lonLatData.forEach((item, i) => {
        let marker = new AMap.Marker({
          map: this.map,
          icon: require('../../../assets/images/icon/mark3.png'),
          title: item.code,
          zIndex: i,
          cursor: 'pointer',
          position: [item.longitude, item.latitude],
        });
        marker.extData = item;
        marker.content = item.address;
        marker.on('click', this.markerClick);
        marker.emit('click', { target: marker });
      });

      this.map.panBy(-120, 320); // 偏移位置
    },

    markerClick(e) {
      const item = e.target.extData;
      let content = [];
      //实例化信息窗体
      // <div id="closeX" class="gp-map__marker--close"></div>\n
      content.push(
        `<div class="gp-map__marker">\n
              <div class="gp-map__marker--header">\n
              <span>${item.typeName}基本信息</span>\n
              </div>\n
              <div class="gp-map__marker--body">\n
              <p>用户类型：${item.typeName}</p>\n
              <p>用户名称：${item.nickname}</p>\n
              <p>地址：${item.fullAddress}</p>\n
              </div>\n
              </div>`
      );
      // <div class="gp-map__marker--footer"><a> 查看详情 > </a></div>\n

      this.infoWindow = new AMap.InfoWindow({
        anchor: 'top-left',
        isCustom: true, //使用自定义窗体
        content: content, //调用创建信息窗体的方法--信息窗体的内容
        offset: new AMap.Pixel(55, -25),
      });

      this.infoWindow.open(this.map, e.target.getPosition());
      this.infoWindow.on('open', this.showInfoWindow);
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
  width: 100%;
  height: 100%;
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
