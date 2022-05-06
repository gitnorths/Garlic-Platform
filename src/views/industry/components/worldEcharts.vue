<template>
  <div>
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
            { name: '美国', value: [-118.24311, 34.052713, 100] },
            { name: '澳大利亚', value: [149.08, -35.15, 2] },
            { name: '以色列', value: [35.12, 31.47, 4] },
            { name: '巴西', value: [-48.678945, -10.493623, 4] },
            { name: '泰国', value: [100.35, 13.45, 4] },
            { name: '沙特阿拉伯', value: [46.42, 24.41, 4] },
            { name: '新加坡', value: [103.51, 1.18, 4] },
            { name: '新西兰', value: [174.46, -41.19, 4] },
            { name: '阿根廷', value: [-60.0, -36.3, 4] },
            { name: '埃塞俄比亚', value: [38.42, 9.02, 4] },
            { name: '哥伦比亚', value: [-74.0, 4.34, 4] },
          ],
          moveLines: [
            {
              fromName: '徐州',
              toName: '美国',
              coords: [
                [117.584811, 34.261792],
                [-118.24311, 34.052713],
              ],
            },
            {
              fromName: '徐州',
              toName: '澳大利亚',
              coords: [
                [117.584811, 34.261792],
                [149.08, -35.15],
              ],
            },
            {
              fromName: '徐州',
              toName: '以色列',
              coords: [
                [117.584811, 34.261792],
                [35.12, 31.47],
              ],
            },
            {
              fromName: '徐州',
              toName: '巴西',
              coords: [
                [117.584811, 34.261792],
                [-48.678945, -10.493623],
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
              toName: '沙特阿拉伯',
              coords: [
                [117.584811, 34.261792],
                [46.42, 24.41],
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
            {
              fromName: '徐州',
              toName: '新西兰',
              coords: [
                [117.584811, 34.261792],
                [174.46, -41.19],
              ],
            },
            {
              fromName: '徐州',
              toName: '阿根廷',
              coords: [
                [117.584811, 34.261792],
                [-60.0, -36.3],
              ],
            },
            {
              fromName: '徐州',
              toName: '埃塞俄比亚',
              coords: [
                [117.584811, 34.261792],
                [38.42, 9.02],
              ],
            },
            {
              fromName: '徐州',
              toName: '哥伦比亚',
              coords: [
                [117.584811, 34.261792],
                [-74.0, 4.34],
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
            right: '8%',
            // top:'5%'
          },
          geo: {
            map: 'world',
            aspectScale: 0.65, //长宽比
            zoom: 1.12,
            tooltip: {
              show: !1,
            },
            scaleLimit: {
              min: 1,
              max: 5,
            },
            label: {
              show: !1,
            },
            roam: false,
            itemStyle: {
              normal: {
                shadowColor: '#164A7C',
                shadowOffsetX: 5,
                shadowOffsetY: 5,
              },
            },
          },
          series: [
            {
              type: 'map',
              roam: false,
              label: {
                show: !1,
              },
              tooltip: {
                show: !1,
              },
              itemStyle: {
                normal: {
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
                },
                emphasis: {
                  label: {
                    // show: !1,
                    color: '#fff',
                  },
                  areaColor: '#0E83B7',
                  //    shadowColor: 'rgb(12,25,50)',
                  borderWidth: 0.2,
                },
              },
              aspectScale: 0.65, //长宽比
              zoom: 1.12,
              //     roam: false,
              map: 'world', //使用
              // data: this.difficultData //热力图数据   不同区域 不同的底色
            },
            {
              name: '地点',
              type: 'scatter',
              coordinateSystem: 'geo',
              zlevel: 2,
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
              symbolSize: 20,
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
                scale: !0,
                label: {
                  show: true,
                  backgroundColor: '#000',
                  padding: 2,
                  borderRadius: 2,
                  color: '#fff',
                },
              },
              symbol: 'circle',
              symbolSize: '15',

              itemStyle: {
                normal: {
                  show: false,
                  color: '#FFC74F',
                },
              },
              data: allData.citys,
            },
            {
              name: '线路',
              type: 'lines',
              coordinateSystem: 'geo',
              zlevel: 2,
              large: true,
              effect: {
                show: true,
                period: 10, //箭头指向速度，值越小速度越快
                trailLength: 0.1, //特效尾迹长度[0,1]值越大，尾迹越长重
                symbol: 'arrow', //箭头图标
                symbolSize: 7, //图标大小
              },
              lineStyle: {
                normal: {
                  color: '#FFC74F',
                  // 线条宽度
                  width: 2,
                  opacity: 1,
                  curveness: 0.3,
                },
              },
              label: {
                normal: {
                  show: false,
                  position: 'middle',
                  formatter: '{b}',
                },
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
  height: 75vh !important;
}
</style>
