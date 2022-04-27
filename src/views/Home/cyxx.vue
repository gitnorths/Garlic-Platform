<template>
  <div class="ds-home-container">
    <baidu-map
      class="bmView"
      :map-types="mapTypes"
      anchor="BMAP_ANCHOR_TOP_LEFT"
      :scroll-wheel-zoom="true"
      :center="location"
      :zoom="zoom"
    >
    </baidu-map>
  </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue';
export default {
  name: 'CYXX',
  components: {
    BaiduMap,
  },
  data() {
    return {
      location: {
        lng: 118.767413,
        lat: 32.041544,
      },
      mapTypes: ['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP'],
      zoom: 12.8,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.ds-home-container {
  width: 100vw;
  height: 100vh;
}
.bmView {
  width: 100vw;
  height: 100vh;
}
</style>
