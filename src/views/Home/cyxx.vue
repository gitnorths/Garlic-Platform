<template>
  <div style="width: 100%; height: 400px">
    <amap :zoom="15" :center="position">
      <amap-marker
        :position="position"
        :label="{
          content: 'Hello, AMap-Vue!',
          direction: 'bottom',
        }"
        draggable
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
    };
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
#app-container {
  width: 100%;
  position: relative;
}
</style>
