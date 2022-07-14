<template>
  <div style="height: 100%">
    <Echart ref="mapChartRef" class="gp-echarts" :options="options"></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart';
import worldJson from '@/assets/map/world.json';

export default {
  data() {
    return {
      options: {},
    };
  },
  components: {
    Echart,
  },
  props: {
    cdata: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    cdata: {
      handler() {
        let allData = {
          citys: [
            { name: '印度尼西亚', value: [119.891683, -4.342114, 100] },
            { name: '澳大利亚', value: [135.052972, -24.578233, 2] },
            { name: '越南', value: [108.462627, 14.495199, 4] },
            { name: '巴基斯坦', value: [68.528346, 29.125743, 4] },
            { name: '泰国', value: [100.35, 13.45, 4] },
            { name: '斯里兰卡', value: [80.596973, 7.642284, 4] },
            { name: '新加坡', value: [103.51, 1.18, 4] },
          ],
          moveLines: [
            {
              fromName: '徐州',
              toName: '印度尼西亚',
              coords: [
                [117.584811, 34.261792],
                [119.891683, -4.342114],
              ],
            },
            {
              fromName: '徐州',
              toName: '澳大利亚',
              coords: [
                [117.584811, 34.261792],
                [135.052972, -24.578233],
              ],
            },
            {
              fromName: '徐州',
              toName: '越南',
              coords: [
                [117.584811, 34.261792],
                [108.462627, 14.495199],
              ],
            },
            {
              fromName: '徐州',
              toName: '巴基斯坦',
              coords: [
                [117.584811, 34.261792],
                [68.528346, 29.125743],
              ],
            },
            {
              fromName: '徐州',
              toName: '泰国',
              coords: [
                [117.584811, 34.261792],
                [100.35, 13.45],
              ],
            },
            {
              fromName: '徐州',
              toName: '斯里兰卡',
              coords: [
                [117.584811, 34.261792],
                [80.596973, 7.642284],
              ],
            },
            {
              fromName: '徐州',
              toName: '新加坡',
              coords: [
                [117.584811, 34.261792],
                [103.51, 1.18],
              ],
            },
          ],
        };
        let cityData = [{ name: '徐州', value: [117.584811, 34.261792, 10] }];
        this.$echarts.registerMap('world', worldJson);
        this.options = {
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              if (params.seriesType == 'effectScatter') {
                return params.marker + params.data.name + '' + params.data.value[2];
              } else if (params.seriesType == 'lines') {
                return params.data.fromName + ' -> ' + params.data.toName + '<br />' + params.data.value;
              } else {
                return params.name;
              }
            },
          },
          grid: {
            right: '150',
          },
          geo: {
            map: 'world',
            aspectScale: 1, //长宽比
            zoom: 2,
            left: '-20%',
            tooltip: {
              show: false,
            },
            scaleLimit: {
              min: 1,
              max: 5,
            },
            label: {
              show: false,
            },
            roam: false,
            itemStyle: {
              shadowColor: '#164A7C',
              shadowOffsetX: 5,
              shadowOffsetY: 5,
            },
          },
          series: [
            {
              type: 'map',
              left: '-20%',
              roam: false,
              label: {
                show: false,
              },
              tooltip: {
                show: false,
              },
              itemStyle: {
                borderColor: '#FFC74F',
                borderWidth: 0.2,
                areaColor: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#1867B5', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#1867B5', // 100% 处的颜色
                    },
                  ],
                  globalCoord: true, // 缺省为 false
                },
                emphasis: {
                  show: false,
                  label: {
                    show: false,
                  },
                  areaColor: '#0E83B7',
                  borderWidth: 0.2,
                },
              },
              aspectScale: 1, //长宽比
              zoom: 2,
              // roam: false,
              map: 'world', //使用
              // data: this.difficultData //热力图数据   不同区域 不同的底色
            },
            {
              name: '地点',
              type: 'scatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              left: '-20%',
              rippleEffect: {
                period: 1,
                brushType: 'stroke',
                scale: 8,
              },
              label: {
                show: true,
                position: 'right',
                color: '#9966cc',
                formatter: '{b}',
                textStyle: {
                  color: '#fff',
                },
                emphasis: {
                  show: true,
                },
              },
              symbol: 'pin',
              symbolSize: 50,
              itemStyle: {
                show: true,
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#F65857', // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#EC2624', // 100% 处的颜色
                    },
                  ],
                },
              },
              data: cityData,
            },
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              left: '-20%',
              rippleEffect: {
                //涟漪特效
                period: 15, //动画时间，值越小速度越快
                brushType: 'stroke', //波纹绘制方式 stroke, fill
                scale: 2, //波纹圆环最大限制，值越大波纹越大
              },
              label: {
                show: true,
                position: 'right', //显示位置
                offset: [5, 0], //偏移设置
                formatter: '{b}', //圆环显示文字
                textStyle: {
                  color: 'rgb(214,206,143)',
                },
              },
              emphasis: {
                show: true,
                label: {
                  show: false,
                  backgroundColor: '#000',
                  padding: 2,
                  borderRadius: 2,
                  color: '#fff',
                },
              },
              symbol: 'circle',
              symbolSize: '15',
              itemStyle: {
                color: '#FFC74F',
              },
              data: allData.citys,
            },
            {
              name: '线路',
              type: 'lines',
              coordinateSystem: 'geo',
              zlevel: 2,
              left: '-20%',
              large: true,
              effect: {
                show: true,
                period: 10, //箭头指向速度，值越小速度越快
                trailLength: 0.1, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: 'arrow', //箭头图标
                symbolSize: 7, //图标大小
              },
              lineStyle: {
                color: '#FFC74F',
                // 线条宽度
                width: 2,
                opacity: 1,
                curveness: 0.3,
              },
              label: {
                // show: false,
                position: 'middle',
                formatter: '{b}',
              },
              itemStyle: {
                show: true,
              },
              data: allData.moveLines,
            },
          ],
        };
        // 重新选择区域
        // this.handleMapRandomSelect();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.gp-echarts {
  width: 100% !important;
  height: 100% !important;
}
</style>
