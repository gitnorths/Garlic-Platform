<template>
  <div class="app-container" :style="{ height: windowHeight + 'px' }">
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
      map: null,
      depth: 2,
      adcode: 320000,
      district: '江苏省',
      city: ['320000', '320300'], // 江苏省徐州市
      options: [],
      markers: [],
      mapStyle: 'darkblue', // darkblue, grey, dark
      infoWindow: null,
      //实时屏幕高度
      windowHeight: document.documentElement.clientHeight,
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
        center: [117.283752, 32.704224],
        zoom: 9,
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
        // that.loading = false;
        that.initPro();
        that.handlePolygon();
        // that.map.panBy(-50, 750); // 偏移位置
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
          'province-stroke': 'rgba(83, 168, 217, 0.5)',
          'city-stroke': 'rgba(0, 39, 97, 0.5)', // 中国地级市边界
          'county-stroke': 'rgba(129, 213, 241, 1)', // 中国区县边界
        },
      });

      this.disProvince.setMap(this.map);
    },

    //绘制边界线
    handlePolygon() {
      let that = this;
      that.map.clearMap();
      let keyword;
      if (this.city.length > 0) {
        keyword = this.city[this.city.length - 1];
      }
      // 创建行政区查询对象
      let district = new AMap.DistrictSearch({
        // 返回行政区边界坐标等具体信息
        extensions: 'all',
        // 设置查询行政区级别为 区
        level: 'district',
      });

      district.search(keyword, function (status, result) {
        // 获取朝阳区的边界信息
        let bounds = result.districtList[0].boundaries;
        let polygons = [];
        if (bounds) {
          for (let i = 0, l = bounds.length; i < l; i++) {
            //生成行政区划polygon
            let polygon = new AMap.Polygon({
              map: that.map,
              path: bounds[i],
              fillColor: '#002761', //填充色
              fillOpacity: 0.5, //填充透明度
              strokeColor: '#53A8D9', //线颜色
              strokeOpacity: 1, //线透明度
              strokeWeight: 3, //线宽
            });
            polygons.push(polygon);
          }
          // 地图自适应
          that.map.setFitView();
        }
      });
    },

    //添加marker标记
    addMarker() {
      const that = this;
      const lonLatData = this.lonLatData;
      this.map.clearMap();

      this.infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(15, -5) });

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

      // this.map.setFitView(null, false, [50, 50, 950, 150], 12);
    },

    markerClick(e) {
      this.infoWindow.setContent(e.target.content);
      this.infoWindow.open(this.map, e.target.getPosition());
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

<style scoped>
#app-container {
  width: 100%;
  position: relative;
}

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
