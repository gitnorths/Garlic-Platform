<template>
  <div>
    <Echart id="mapChartRef" class="gp-echarts" :options="options"></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart';
export default {
  data() {
    return {
      myChart: null,
      options: {},
    };
  },
  components: {
    Echart,
  },
  props: {
    mapData: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    mapData: {
      handler(data) {
        this.initMap(data);
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    const that = this;
    that.myChart = that.$echarts.init(document.getElementById('mapChartRef'));
    that.resizeFn = that.debounce(() => {
      // 通过捕获系统的onresize事件触发需要执行的事件
      console.log(this.mapData);
      that.options = {};
      this.initMap(this.mapData);
      that.myChart.resize();
    }, 100);
    window.addEventListener('resize', that.resizeFn);
  },
  methods: {
    initMap(seriesData) {
      // 设置点的位置(经纬度)
      let geoCoordMap = {
        南京: [118.767413, 32.041544],
        无锡: [120.331663, 31.574729],
        徐州: [117.784811, 34.561792],
        常州: [119.946973, 31.772752],
        苏州: [120.619585, 31.299379],
        南通: [120.864608, 32.216212],
        连云港: [119.308821, 34.300018],
        淮安: [119.151265, 33.597506],
        盐城: [120.039998, 33.677631],
        扬州: [119.421003, 32.393159],
        镇江: [119.352753, 32.004402],
        泰州: [120.015176, 32.484882],
        宿迁: [118.575162, 33.963008],
      };

      // 动态计算柱形图的高度（定一个max）
      let lineMaxHeight = function () {
        const maxValue = Math.max(...seriesData.map((item) => item.value));
        return 0.9 / maxValue;
      };

      // 柱状体的主干
      let lineData = function () {
        return seriesData.map((item) => {
          return {
            coords: [
              geoCoordMap[item.name],
              [geoCoordMap[item.name][0], geoCoordMap[item.name][1] + item.value * lineMaxHeight()],
            ],
          };
        });
      };

      // 柱状体的顶部
      let scatterData = function () {
        return seriesData.map((item) => {
          if (item.value > 0) {
            return [
              geoCoordMap[item.name][0],
              geoCoordMap[item.name][1] + item.value * lineMaxHeight(),
              item.name,
              item.value,
            ];
          } else {
            return {};
          }
        });
      };

      // 柱状体的底部
      let scatterData2 = function () {
        return seriesData.map((item) => {
          if (item.value > 0) {
            return {
              name: item.name,
              value: geoCoordMap[item.name],
            };
          } else {
            return {
              name: '',
              value: '',
            };
          }
        });
      };

      this.options = {
        showLegendSymbol: true,
        tooltip: {
          show: false,
          trigger: 'item',
          lineHeight: 22,
          backgroundColor: 'rgba(29, 38, 71)',
          textStyle: {
            color: '#20fbff',
            fontSize: 14,
          },
          formatter: (params) => {
            return params.name + ': ' + params.value;
          },
        },
        // 底部背景
        geo: [
          {
            map: '江苏',
            aspectScale: 1,
            zoom: 1, // 默认显示级别
            roam: false, // 是否允许缩放
            silent: true,
            z: 1,
            layoutSize: '100%',
            layoutCenter: ['52%', '50%'],
            label: {
              show: false,
            },
            itemStyle: {
              opacity: 0,
              areaColor: '#2082B3',
              borderColor: '#2798D8',
              borderWidth: 6,
            },
            emphasis: {
              disabled: false,
            },
          },
        ],
        series: [
          {
            type: 'map',
            map: '江苏',
            roam: false,
            zoom: 1, // 默认显示级别
            z: 2,
            silent: false,
            layoutSize: '100%',
            layoutCenter: ['52%', '50%'],
            aspectScale: 0.9,
            label: {
              show: false,
              formatter: function () {
                return '';
              },
            },
            itemStyle: {
              opacity: 0,
              borderColor: '#A1E8FF',
              borderWidth: 1,
              areaColor: {
                type: 'linear-gradient',
                x: 0,
                y: 300,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: '#0a56BC',
                  },
                  {
                    offset: 1,
                    color: '#12A6F2',
                  },
                ],
                global: true, // 缺省为 false
              },
            },
            emphasis: {
              disabled: false,
              itemStyle: {
                borderWidth: 2,
                areaColor: {
                  type: 'linear-gradient',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#F5B615',
                    },
                    {
                      offset: 1,
                      color: '#E27B0d',
                    },
                  ],
                },
              },
            },
            data: seriesData,
          },
          // 柱状体的主干
          {
            type: 'lines',
            zlevel: 5,
            effect: {
              show: false,
              // period: 4, //箭头指向速度，值越小速度越快
              // trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              // symbol: 'arrow', //箭头图标
              // symbol: imgDatUrl,
              symbolSize: 5, // 图标大小
            },
            lineStyle: {
              width: 25, // 尾迹线条宽度
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgb(199,145,41)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgb(199,145,41)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgb(223,176,32)',
                  },
                  {
                    offset: 1,
                    color: 'rgb(223,176,32)',
                  },
                  {
                    offset: 1,
                    color: 'rgb(199,145,41)',
                  },
                ],
                global: false, // 缺省为 false
              },
              opacity: 1, // 尾迹线条透明度
              curveness: 0, // 尾迹线条曲直度
            },
            label: {
              show: false,
              position: 'end',
              formatter: '245',
            },
            silent: true,
            data: lineData(),
          },
          // 柱状体上
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            geoIndex: 0,
            zlevel: 5,
            label: {
              show: true,
              position: 'top',
              offset: [0, -10],
              // padding: [6, 10],
              // backgroundColor: '#10346B',
              // borderColor: '#60B6FF',
              // borderWidth: 1,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#20fbff',
              formatter(params) {
                if (params.data[3] > 0) {
                  return params.data[2];
                } else {
                  return '';
                }
              },
            },
            symbol: 'diamond',
            symbolSize: [25, 10],
            itemStyle: {
              color: '#ffd133',
              opacity: 1,
            },
            silent: true,
            data: scatterData(),
          },
          // 柱状体下
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            geoIndex: 0,
            zlevel: 5,
            label: {
              show: false,
            },
            symbol: 'diamond',
            symbolSize: [25, 10],
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgb(199,145,41)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgb(199,145,41)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgb(223,176,32)',
                  },
                  {
                    offset: 1,
                    color: 'rgb(223,176,32)',
                  },
                  {
                    offset: 1,
                    color: 'rgb(199,145,41)',
                  },
                ],
                global: false, // 缺省为 false
              },
              opacity: 1,
            },
            silent: true,
            data: scatterData2(),
          },
          // 底部外框
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            geoIndex: 0,
            zlevel: 4,
            label: {
              show: false,
            },
            symbol: 'circle',
            symbolSize: [35, 15],
            itemStyle: {
              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: '#ffd133', // 0% 处的颜色
                  },
                  {
                    offset: 0.75,
                    color: 'RGBA(255, 255, 0, 0.1)', // 100% 处的颜色
                  },
                  {
                    offset: 0.751,
                    color: 'RGBA(255, 255, 0, 0.1)', // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#ffd133', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
              opacity: 1,
            },
            silent: true,
            data: scatterData2(),
          },
        ],
      };
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
<style lang="scss" scoped>
.gp-echarts {
  width: 100% !important;
  height: 75vh !important;
}
</style>
