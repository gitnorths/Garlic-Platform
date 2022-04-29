<template>
  <div style="width: 100%; height: 100%">
    <DsEcharts />
  </div>
</template>

<script>
import DsEcharts from './components/echarts';

export default {
  name: 'HomeView',
  components: {
    DsEcharts,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
