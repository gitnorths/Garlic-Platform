<template>
  <div class="gp-bg" :style="{ height: windowHeight + 'px' }">
    <dv-loading class="gp-loading" v-show="loading">Loading...</dv-loading>
    <div id="container"></div>
  </div>
</template>

<script>
import AMap from 'AMap';
export default {
  name: 'BasicInformationMaps',
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
      //实时屏幕高度
      windowHeight: document.documentElement.clientHeight,
      loading: true,
      map: null,
      city: ['320000'], // 江苏省徐州市 '320000', '320300'
      zoom: 7.8,
      depth: 2,
      adcode: 320000,
      center: [118.530903, 33.112126],
      options: [],
      markers: [],
      district: '江苏省',
      mapStyle: 'darkblue', // darkblue, grey, dark
      mapColors: {
        // 徐州市
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

        // 盐城市
        320902: 'rgba(79, 255, 245, 0.5)', // 亭湖区
        320903: 'rgba(79, 255, 245, 0.5)', // 盐都区
        320904: 'rgba(79, 255, 245, 0.5)', // 大丰区
        320921: 'rgba(79, 255, 245, 0.5)', // 响水县
        320922: 'rgba(79, 255, 245, 0.5)', // 滨海县
        320923: 'rgba(79, 255, 245, 0.5)', // 阜宁县
        320924: 'rgba(79, 255, 245, 0.5)', // 射阳县
        320925: 'rgba(79, 255, 245, 0.5)', // 建湖县
        320981: 'rgba(79, 255, 245, 0.5)', // 东台市
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
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
    // 初始化地图
    initAMap() {
      const that = this;
      that.map = new AMap.Map('container', {
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
        // that.map.panBy(0, 700); // 偏移位置
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

    //添加marker标记
    addMarker() {
      const that = this;
      const lonLatData = that.lonLatData;
      that.map.clearMap();

      that.infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(15, -5) });

      // 绑定点
      lonLatData.forEach((item, i) => {
        let marker = new AMap.Marker({
          map: that.map,
          title: item.townName,
          icon: require('../../../assets/images/icon/mark3.png'),
          position: [item.longitude, item.latitude],
        });
        marker.content = item.townName;
        if (i === 0) {
          marker.on('click', that.markerClick);
          marker.emit('click', { target: marker });
        }

        marker.on('click', function (e) {
          that.markerClick(e);
        });
      });

      // 地图自适应
      // this.map.setFitView();
      this.map.setFitView(null, false, [250, 0, 600, 0], 9);
    },

    markerClick(e) {
      this.infoWindow.setContent(e.target.content);
      this.infoWindow.open(this.map, e.target.getPosition());
    },

    // 颜色辅助
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

<style scoped>
#container {
  width: 100%;
  height: 100%;
}

.input-card {
  position: absolute;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 30px;
  left: 30px;
  padding: 10px;
  width: 300px;
}

.input-card .input-item {
  margin: 10px 0;
}

.input-item .input-item-text {
  display: inline-block;
  width: 60px;
}
</style>
