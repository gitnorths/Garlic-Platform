<template>
  <div class="gp-flex gp-flex-direction-column gp-flex1">
    <div class="gp-title"><span>收购与加工</span></div>
    <div class="gp-box">
      <Base-Chart ref="apChart" :chart-id="apChartId" :option="apChartOption" />
    </div>
  </div>
</template>

<script>
import qs from 'qs';
import { BaseColors, GradientColors } from '@/enums/color';
import BaseChart from '@/components/echarts/baseChart';
export default {
  name: 'AcquisitionProcessing',
  components: {
    BaseChart,
  },
  computed: {
    apChart() {
      return this.$refs.apChart && this.$refs.apChart.myChart;
    },
  },
  props: {
    regions: {
      type: String,
      required: true,
    },
    levels: {
      type: String,
      require: true,
    },
  },
  watch: {
    regions() {
      this.getChartData();
    },
  },
  data() {
    return {
      color: BaseColors,
      gradientColor: GradientColors,
      chartTimer: null,
      chartIndex: -1,
      chartLoad: false,
      chartData: [],
      apChartId: 'apChart',
      apChartOption: {
        color: BaseColors,
        grid: {
          top: '45',
          left: '10',
          right: '10',
          bottom: '10',
          containLabel: true,
        },
        legend: {
          top: 10,
          right: 15,
          itemWidth: 16,
          itemHeight: 8,
          textStyle: {
            color: '#7EC1FF',
            fontSize: 12,
          },
        },
        tooltip: {
          show: 'true',
          trigger: 'item',
          position: 'top',
          backgroundColor: 'rgba(50, 123, 222, 0.9)', // 背景
          textStyle: {
            color: '#FFFFFF',
            fontFamily: 'PangMenZhengDao',
          },
          borderWidth: 0,
        },
        xAxis: {
          type: 'category',
          axisPointer: {
            type: 'shadow',
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#415A89',
            },
          },
          axisLabel: {
            inside: false,
            color: '#476294',
            fontSize: 12,
            fontFamily: 'PangMenZhengDao',
          },
        },
        yAxis: {
          type: 'value',
          name: '单位：吨',
          nameTextStyle: {
            color: '#7EC1FF',
            fontSize: 12,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#415A89',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#415A89 ',
            },
          },
          axisLabel: {
            color: '#476294',
            fontSize: 12,
            fontFamily: 'PangMenZhengDao',
          },
        },
      },
    };
  },
  mounted() {
    this.getChartData();
  },
  methods: {
    getChartData() {
      this.$api
        .postBaseApi(
          'cc/acquisitionProcessing/getChartData',
          qs.stringify({
            region: this.regions,
            level: this.levels,
          })
        )
        .then((res) => {
          if (!res?.result || !res?.result.data.length) return;
          this.chartData = res.result;

          let resData = res.result;
          let barWidth = 30;
          let colors = [
            {
              type: 'linear',
              x: 0,
              x2: 1,
              y: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: '#57E9A1',
                },
                {
                  offset: 0.5,
                  color: '#4DD592',
                },
                {
                  offset: 0.5,
                  color: '#4DE49A',
                },
                {
                  offset: 1,
                  color: '#38D086',
                },
              ],
            },
            {
              type: 'linear',
              x: 0,
              x2: 1,
              y: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: '#5D9CF3',
                },
                {
                  offset: 0.5,
                  color: '#4287E5',
                },
                {
                  offset: 0.5,
                  color: '#5393EB',
                },
                {
                  offset: 1,
                  color: '#3F82DF',
                },
              ],
            },
            {
              type: 'linear',
              x: 0,
              x2: 1,
              y: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: '#1AEDF3',
                },
                {
                  offset: 0.5,
                  color: '#13DBE1',
                },
                {
                  offset: 0.5,
                  color: '#12E8EE',
                },
                {
                  offset: 1,
                  color: '#00C7CD',
                },
              ],
            },
            {
              type: 'linear',
              x: 0,
              x2: 1,
              y: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: '#FFBD2E',
                },
                {
                  offset: 0.5,
                  color: '#FFF002',
                },
                {
                  offset: 0.5,
                  color: '#FFFF00',
                },
                {
                  offset: 1,
                  color: '#FFB91E',
                },
              ],
            },
          ];
          this.apChartOption.legend.data = [];
          this.apChartOption.xAxis.data = [];
          this.apChartOption.series = [];
          this.$refs.apChart.refresh(this.apChartOption);

          this.apChartOption.legend.data = resData.category;
          this.apChartOption.xAxis.data = resData.category;

          this.apChartOption.series = [
            {
              type: 'bar',
              barWidth: barWidth,
              itemStyle: {
                color: function (params) {
                  return colors[params.dataIndex % 7];
                },
              },
              data: resData.data,
            },
            {
              z: 2,
              type: 'pictorialBar',
              data: resData.data,
              symbol: 'diamond',
              symbolOffset: [0, '50%'],
              symbolSize: [barWidth, barWidth * 0.5],
              itemStyle: {
                color: function (params) {
                  return colors[params.dataIndex % 7];
                },
              },
            },
            {
              z: 3,
              type: 'pictorialBar',
              symbolPosition: 'end',
              data: resData.data,
              symbol: 'diamond',
              symbolOffset: [0, '-50%'],
              symbolSize: [barWidth, barWidth * 0.5],
              itemStyle: {
                borderWidth: 0,
                color: function (params) {
                  return colors[params.dataIndex % 7].colorStops[0].color;
                },
              },
            },
          ];
          this.$refs.apChart.refresh(this.apChartOption);

          setTimeout(() => {
            !this.chartTimer && this.startAnimation();
          }, 500);
        })
        .finally(() => {});
    },
    startAnimation() {
      const dataLen = this.chartData.category.length;
      if (dataLen > 1) {
        this.chartTimer = setInterval(() => {
          if (this.chartIndex < dataLen - 1) {
            this.chartIndex++;
          } else {
            this.chartIndex = 0;
          }
          if (this.apChart) {
            this.apChart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: this.chartIndex,
            });
          }
        }, 3000);
      }
    },
  },
};
</script>
