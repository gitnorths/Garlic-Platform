<template>
  <div style="width: 100%; height: 100%">
    <!-- <amap :zoom="15" :center="position">
      <amap-marker
        :position="position"
        :label="{
          content: 'Hello, AMap-Vue!',
          direction: 'bottom',
        }"
        draggable
      />
    </amap> -->
    <!-- <amap>
      <amap-district-layer-province :styles="styles" :adcode="adcode" />
    </amap> -->
    <amap>
      <amap-district-layer-province
        ref="layer"
        :opacity="opacity"
        :depth="2"
        :adcode="province.adcode"
        :styles="province.styles"
      />
    </amap>
  </div>
</template>

<script>
export default {
  name: 'CYXX',
  data() {
    return {
      position: [116.473179, 39.993169],
      styles: '',
      adcode: '江苏省',
      mapStyle: 'normal',
      opacity: 1.0,
      province: {
        map: {
          center: [118.767413, 32.041544],
          zoom: 6,
        },
        adcode: '江苏省',
      },
    };
  },
  mounted() {
    this.switchMapStyle();
  },
  methods: {
    //自定义鼠标样式图标
    switchMapStyle() {
      let mapStyle = 'amap://styles/' + this.mapStyle;
      this.map.setMapStyle(mapStyle);
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
