<template>
  <div>
    <Echart ref="mapChartRef" class="ds-echarts" :options="options"></Echart>
  </div>
</template>

<script>
import Echart from '@/common/echart';
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
      handler(newData) {
        console.log(newData);
        // let convertData = function (data) {
        //   let scatterData = [];
        //   for (var i = 0; i < data.length; i++) {
        //     var geoCoord = geoCoordMap[data[i].name];
        //     if (geoCoord) {
        //       scatterData.push({
        //         name: data[i].name,
        //         value: geoCoord.concat(data[i].value),
        //       });
        //     }
        //   }
        //   return scatterData;
        // };

        // let domImg = document.createElement('img');
        // domImg.style.height = domImg.height = domImg.width = domImg.style.width = '8px';
        // domImg.src =
        //   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAIAAAAmKNuZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE4MTE0OTgyQTdDQzExRUI4Q0RBRkMwQkFGMTY2NDhEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE4MTE0OTgzQTdDQzExRUI4Q0RBRkMwQkFGMTY2NDhEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTgxMTQ5ODBBN0NDMTFFQjhDREFGQzBCQUYxNjY0OEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTgxMTQ5ODFBN0NDMTFFQjhDREFGQzBCQUYxNjY0OEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4v4trwAAAAVklEQVR42mL0D225cu0hAzWAjpY8C9CsL19/wIV4uDnI5gKNYmKgKhjcxrFAggBZiBIuyDhqRQWQOxoVo1ExGhWjUTEaFYMiKoB1LVq1TXZUAI0CCDAAcAlaxCt7dtQAAAAASUVORK5CYII=';

        // let domImgHover = document.createElement('img');
        // domImgHover.style.height = domImgHover.height = domImgHover.width = domImgHover.style.width = '8px';
        // domImgHover.src =
        //   'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAIAAAAmKNuZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFDQ0Q2RjYyQTdDRDExRUI4ODUxRDIxRjkzMEExNzg2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFDQ0Q2RjYzQTdDRDExRUI4ODUxRDIxRjkzMEExNzg2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUNDRDZGNjBBN0NEMTFFQjg4NTFEMjFGOTMwQTE3ODYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUNDRDZGNjFBN0NEMTFFQjg4NTFEMjFGOTMwQTE3ODYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6FboimAAAASklEQVR42mIUnL9XtHsDAzXA69IARjWtXJYX7+FCfyQEKeEyMVAVDG7jWCB+RhaihAsybjQqRqNiNCpGo2I0KoZZVDBSt9oGCDAAhYNrvRu3DWEAAAAASUVORK5CYII=';

        // console.log(domImg);
        // console.log(domImgHover);
        // 设置点的位置(经纬度)
        let geoCoordMap = {
          南京: [118.767413, 32.041544],
          无锡: [120.331663, 31.574729],
          徐州: [117.584811, 34.261792],
          常州: [119.946973, 31.772752],
          苏州: [120.619585, 31.299379],
          南通: [120.864608, 32.216212],
          连云港: [119.308821, 34.300018],
          淮安: [119.151265, 33.597506],
          盐城: [120.139998, 33.377631],
          扬州: [119.421003, 32.393159],
          镇江: [119.352753, 32.004402],
          泰州: [120.015176, 32.484882],
          宿迁: [118.575162, 33.963008],
        };

        let seriesData = [
          { name: '南京', value: 26 },
          { name: '无锡', value: 0 },
          { name: '徐州', value: 35 },
          { name: '常州', value: 0 },
          { name: '苏州', value: 0 },
          { name: '南通', value: 0 },
          { name: '连云港', value: 0 },
          { name: '淮安', value: 0 },
          { name: '盐城', value: 0 },
          { name: '扬州', value: 0 },
          { name: '镇江', value: 0 },
          { name: '泰州', value: 0 },
          { name: '宿迁', value: 0 },
        ];

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
              aspectScale: 0.9,
              zoom: 1, // 默认显示级别
              roam: false, // 是否允许缩放
              silent: true,
              z: 3,
              layoutSize: '95%',
              layoutCenter: ['49.4%', '50%'],
              itemStyle: {
                areaColor: '#2082B3',
                borderColor: '#2798D8',
                borderWidth: 6,
              },
              emphasis: {
                show: false,
              },
            },
            {
              map: '江苏',
              aspectScale: 0.9,
              zoom: 1, // 默认显示级别
              roam: false, // 是否允许缩放
              silent: true,
              z: 2,
              layoutSize: '95%',
              layoutCenter: ['48.8%', '50%'],
              itemStyle: {
                areaColor: '#0E6A99',
                borderColor: '#2580B9',
                borderWidth: 6,
              },
            },
            {
              map: '江苏',
              aspectScale: 0.9,
              zoom: 1, // 默认显示级别
              roam: false, // 是否允许缩放
              silent: true,
              z: 1,
              layoutSize: '95%',
              layoutCenter: ['48.2%', '50%'],
              itemStyle: {
                areaColor: '#0A4C74',
                borderColor: '#085589',
                borderWidth: 6,
              },
              emphasis: {
                show: false,
              },
            },
            {
              map: '江苏',
              aspectScale: 0.9,
              zoom: 1, // 默认显示级别
              roam: false, // 是否允许缩放
              silent: true,
              z: 0,
              layoutSize: '95%',
              layoutCenter: ['47.5%', '50%'],
              itemStyle: {
                areaColor: '#054576',
                borderColor: '#013D73',
                borderWidth: 6,
                shadowColor: '#013D73',
                shadowBlur: 50,
                shadowOffsetX: -25,
                shadowOffsetY: 10,
              },
              emphasis: {
                show: false,
              },
            },
          ],
          series: [
            {
              type: 'map',
              map: '江苏',
              roam: false,
              zoom: 1, // 默认显示级别
              z: 40,
              silent: false,
              layoutSize: '95.5%',
              layoutCenter: ['50%', '50%'],
              aspectScale: 0.9,
              label: {
                show: true,
                fontSize: 14,
                color: '#CFD6E3',
                formatter: function (params) {
                  if (params.value > 0) {
                    return '';
                  } else {
                    return params.name;
                  }
                },
              },
              itemStyle: {
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
                show: true,
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
        // 重新选择区域
        // this.handleMapRandomSelect();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // // 开启定时器
    // startInterval() {
    //   const _self = this;
    //   // 应通过接口获取配置时间，暂时写死5s
    //   const time = 2000;
    //   if (this.intervalId !== null) {
    //     clearInterval(this.intervalId);
    //   }
    //   this.intervalId = setInterval(() => {
    //     _self.reSelectMapRandomArea();
    //   }, time);
    // },
    // // 重新随机选中地图区域
    // reSelectMapRandomArea() {
    //   const length = 9;
    //   this.$nextTick(() => {
    //     try {
    //       const map = this.$refs.mapChartRef.chart;
    //       let index = Math.floor(Math.random() * length);
    //       while (index === this.preSelectMapIndex || index >= length) {
    //         index = Math.floor(Math.random() * length);
    //       }
    //       map.dispatchAction({
    //         type: 'mapUnSelect',
    //         seriesIndex: 0,
    //         dataIndex: this.preSelectMapIndex,
    //       });
    //       map.dispatchAction({
    //         type: 'showTip',
    //         seriesIndex: 0,
    //         dataIndex: index,
    //       });
    //       map.dispatchAction({
    //         type: 'mapSelect',
    //         seriesIndex: 0,
    //         dataIndex: index,
    //       });
    //       this.preSelectMapIndex = index;
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   });
    // },
    // handleMapRandomSelect() {
    //   this.$nextTick(() => {
    //     try {
    //       const map = this.$refs.mapChartRef.chart;
    //       const _self = this;
    //       setTimeout(() => {
    //         _self.reSelectMapRandomArea();
    //       }, 0);
    //       // 移入区域，清除定时器、取消之前选中并选中当前
    //       map.on('mouseover', function (params) {
    //         clearInterval(_self.intervalId);
    //         map.dispatchAction({
    //           type: 'mapUnSelect',
    //           seriesIndex: 0,
    //           dataIndex: _self.preSelectMapIndex,
    //         });
    //         map.dispatchAction({
    //           type: 'mapSelect',
    //           seriesIndex: 0,
    //           dataIndex: params.dataIndex,
    //         });
    //         _self.preSelectMapIndex = params.dataIndex;
    //       });
    //       // 移出区域重新随机选中地图区域，并开启定时器
    //       map.on('globalout', function () {
    //         _self.reSelectMapRandomArea();
    //         _self.startInterval();
    //       });
    //       this.startInterval();
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   });
    // },
  },
};
</script>
<style lang="scss" scoped>
.ds-echarts {
  width: 900px !important;
  height: 700px !important;
}
</style>
