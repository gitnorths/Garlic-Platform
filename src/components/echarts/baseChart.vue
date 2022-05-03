<template>
  <div :id="newId" class="chart-common" />
</template>

<script>
export default {
  props: {
    chartId: {
      type: String,
      required: true,
    },
    option: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      myChart: null,
    };
  },
  computed: {
    newId() {
      return this.chartId + this.$route.name;
    },
  },
  mounted() {
    const self = this;
    setTimeout(function () {
      self.init();
    }, 20);
  },
  methods: {
    init() {
      this.myChart = this.$echarts.init(document.getElementById(this.newId));
      this.myChart.setOption(this.option, true);
      const self = this;
      this.myChart.on('click', function (params) {
        self.$emit('chartClick', params);
      });
      this.resizeFn = this.debounce(() => {
        // 通过捕获系统的onresize事件触发需要执行的事件
        this.myChart.resize();
      }, 1000);
      window.addEventListener('resize', this.resizeFn);
    },
    refresh(newOption) {
      this.myChart && this.myChart.setOption(newOption, true);
    },
    debounce(fn, delay) {
      let timer = null; //借助闭包
      return function () {
        if (timer) {
          clearTimeout(timer); //进入该分支语句，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
          timer = setTimeout(fn, delay);
        } else {
          timer = setTimeout(fn, delay); // 进入该分支说明当前并没有在计时，那么就开始一个计时
        }
      };
    },
  },
};
</script>

<style>
.chart-common {
  width: 100%;
  height: 100%;
  color: #9ab8e3;
}
</style>
