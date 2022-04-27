/* eslint-disable no-undef */
<template>
  <div class="ds-home-container">
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  name: 'CYXX',
  data() {
    return {
      //实时屏幕高度
      map: null,
      level: 'district',
      district: '江苏省',
      polygons: [],
    };
  },
  mounted() {
    //调用地图初始化方法
    // this.initAMap();
  },
  methods: {
    // initAMap() {
    //   this.map = new AMap.Map('container', {
    //     center: [116.397428, 39.90923], //地图中心点
    //     zoom: 10, //地图显示的缩放级别
    //   });
    //   this.drawBounds();
    // },
    // draw(e) {
    //   if (e.keyCode === 13) {
    //     this.drawBounds();
    //     return false;
    //   }
    //   return true;
    // },
    // drawBounds() {
    //   let that = this;
    //   //清除上次结果
    //   //that.map.remove(that.polygons)
    //   let district = null;
    //   //加载行政区划插件
    //   if (!district) {
    //     //实例化DistrictSearch
    //     let opts = {
    //       subdistrict: 0, //获取边界不需要返回下级行政区
    //       extensions: 'all', //返回行政区边界坐标组等具体信息
    //       level: 'district', //查询行政级别为 市
    //     };
    //     district = new AMap.DistrictSearch(opts);
    //   }
    //   //行政区查询
    //   district.setLevel(that.level);
    //   district.search(that.district, function (status, result) {
    //     that.map.remove(that.polygons); //清除上次结果
    //     that.polygons = [];
    //     let bounds = result.districtList[0].boundaries;
    //     if (bounds) {
    //       for (let i = 0, l = bounds.length; i < l; i++) {
    //         //生成行政区划polygon
    //         let polygon = new AMap.Polygon({
    //           strokeWeight: 1,
    //           path: bounds[i],
    //           fillOpacity: 0.4,
    //           fillColor: '#80d8ff',
    //           strokeColor: '#0091ea',
    //         });
    //         that.polygons.push(polygon);
    //       }
    //     }
    //     that.map.add(that.polygons);
    //     that.map.setFitView(that.polygons); //视口自适应
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.ds-home-container {
  width: 100vw;
  height: 100vh;
}

#container {
  width: 100%;
  height: 100%;
}
</style>
