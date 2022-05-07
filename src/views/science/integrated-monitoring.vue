<template>
  <div class="gp-bg gp-integrated">
    <IntegratedMonitoringMaps />
    <div class="gp-right gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1 gp-mb15">
        <div class="gp-title"><span>蒜田环境监控视频</span></div>
        <div class="gp-group">
          <span>监测点</span>
          <p>太仓市浏河镇飞凤路尽头西</p>
        </div>
        <div class="gp-box"></div>
      </div>
    </div>
  </div>
</template>

<script>
import IntegratedMonitoringMaps from './components/integrated-monitoring-maps';

export default {
  name: 'IntegratedMonitoring',
  components: {
    IntegratedMonitoringMaps,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    baseClick() {},
  },
};
</script>
