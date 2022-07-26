<template>
  <div class="gp-flex gp-flex-direction-column gp-flex1">
    <div class="gp-title"><span>产值信息</span></div>
    <div class="gp-box">
      <Base-Chart ref="chart" :chart-id="chartId" :option="chartOption" />
    </div>
  </div>
</template>

<script>
import qs from 'qs';
import { BaseColors, GradientColors } from '@/enums/color';
import BaseChart from '@/components/echarts/baseChart';
export default {
  name: 'ProductionValue',
  components: {
    BaseChart,
  },
  computed: {
    barChart() {
      return this.$refs.chart && this.$refs.chart.myChart;
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
      chartId: 'chart',
      chartOption: {
        color: BaseColors,
        grid: {
          top: '45',
          left: '0',
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
          trigger: 'axis',
          backgroundColor: 'rgba(50, 123, 222, 0.9)', // 背景
          textStyle: {
            color: '#FFFFFF',
            fontFamily: 'PangMenZhengDao',
          },
          borderWidth: 0,
          padding: [8, 8],
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
    console.log(this.regions, this.levels);
  },
  methods: {
    getChartData() {
      // 产值信息
      this.$api
        .postBaseApi(
          'cc/outputValue/getChartData',
          qs.stringify({
            type: 1, // 0 产量 1 产值
            region: this.regions,
            level: this.levels,
          })
        )
        .then((res) => {
          if (!res?.result || !res?.result.data.length) return;
          this.chartData = res.result;

          let that = this;
          let resData = res.result;
          let resArr = [];
          this.chartOption.legend.data = [];
          this.chartOption.xAxis.data = [];
          this.chartOption.series = [];
          this.$refs.chart.refresh(this.chartOption);
          // 产值信息
          if (resData.data) {
            this.chartOption.legend.data = resData.legend;
            this.chartOption.xAxis.data = resData.category;
            for (let i = 0; i < resData.data.length; i++) {
              resArr.push({
                name: resData.data[i].name,
                type: resData.data[i].type,
                // label: {
                //   show: true,
                //   fontSize: 14,
                //   fontFamily: 'PangMenZhengDao',
                //   borderWidth: 0,
                //   color: '#FFFFFF',
                //   position: 'top',
                //   formatter: '{c}',
                // },
                itemStyle: {
                  show: true,
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: that.gradientColor[i][0],
                    },
                    {
                      offset: 1,
                      color: that.gradientColor[i][1],
                    },
                  ]),
                  borderRadius: [6, 6, 0, 0],
                  borderWidth: 0,
                },
                barWidth: '12px',
                barGap: '100%',
                data: resData.data[i].data,
              });
            }
            this.chartOption.series = resArr;
            this.$refs.chart.refresh(this.chartOption);
          }

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
          if (this.barChart) {
            this.barChart.dispatchAction({
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
