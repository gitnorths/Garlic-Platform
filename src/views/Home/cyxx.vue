<template>
  <div id="container" style="width: 100%; height: 100%"></div>
</template>

<script>
import AMap from 'AMap';
export default {
  name: 'CYXX',
  data() {
    return {
      map: null,
      mapStyle: 'darkblue', // darkblue, grey
      level: 'district',
      district: '江苏省',
      polygons: [],
      depth: 2,
    };
  },
  mounted() {
    //调用地图初始化方法
    this.initAMap();
  },
  methods: {
    initAMap() {
      this.map = new AMap.Map('container', {
        zoom: 11,
        adcode: [320000],
        depth: 2,
        styles: {
          fill: function (properties) {
            // properties为可用于做样式映射的字段，包含
            // NAME_CHN:中文名称
            // adcode_pro
            // adcode_cit
            // adcode
            let adcode = properties.adcode;
            return this.getColorByAdcode(adcode);
          },
          'province-stroke': 'cornflowerblue',
          'city-stroke': 'white', // 中国地级市边界
          'county-stroke': 'rgba(255,255,255,0.5)', // 中国区县边界
        },
      });
      //使用CSS默认样式定义地图上的鼠标样式
      this.map.setDefaultCursor('pointer');
      let mapStyle = 'amap://styles/' + this.mapStyle;
      this.map.setMapStyle(mapStyle);
      this.drawBounds();
    },
    //自定义鼠标样式图标
    switchMapStyle() {
      let mapStyle = 'amap://styles/' + this.mapStyle;
      this.map.setMapStyle(mapStyle);
    },
    drawBounds() {
      let that = this;
      //清除上次结果
      //that.map.remove(that.polygons)
      let district = null;
      //加载行政区划插件
      if (!district) {
        //实例化DistrictSearch
        let opts = {
          subdistrict: 0, //获取边界不需要返回下级行政区
          extensions: 'all', //返回行政区边界坐标组等具体信息
          level: 'district', //查询行政级别为 市
        };
        district = new AMap.DistrictSearch(opts);
      }
      //行政区查询
      district.setLevel(that.level);
      district.search(that.district, function (status, result) {
        that.map.remove(that.polygons); //清除上次结果
        that.polygons = [];

        let bounds = result.districtList[0].boundaries;
        if (bounds) {
          for (let i = 0, l = bounds.length; i < l; i++) {
            //生成行政区划polygon
            let polygon = new AMap.Polygon({
              strokeWeight: 1,
              path: bounds[i],
              fillOpacity: 0.4,
              fillColor: '#80d8ff',
              strokeColor: '#0091ea',
            });
            that.polygons.push(polygon);
          }
        }
        that.map.add(that.polygons);
        that.map.setFitView(that.polygons); //视口自适应
      });
    },

    // 颜色辅助方法
    getColorByAdcode(adcode) {
      if (!this.colors[adcode]) {
        let gb = Math.random() * 155 + 50;
        this.colors[adcode] = 'rgb(' + gb + ',' + gb + ',255)';
      }
      return this.colors[adcode];
    },
  },
};
</script>

<style lang="scss" scoped>
#app-container {
  width: 100%;
  position: relative;
}
</style>
