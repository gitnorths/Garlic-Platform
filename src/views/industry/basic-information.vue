<template>
  <div class="gp-bg">
    <div class="gp-anchor">
      <el-select v-model="distribution" clearable placeholder="分布" @change="getDistribution">
        <el-option v-for="item in distributionOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="keyword" clearable placeholder="类型" @change="getKeyword">
        <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
    </div>
    <BasicInformationMaps :mapData="mapData" :lonLatData="lonLatData" :mapColor="mapColor" @ok="getData" />
    <div class="gp-left gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>产值信息</span></div>
        <div class="gp-box">
          <Base-Chart ref="czChart" :chart-id="czId" :option="czOption" />
        </div>
      </div>
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>大蒜价格行情</span></div>
        <div class="gp-box">
          <Base-Chart ref="dshqChart" :chart-id="dshqId" :option="dshqOption" />
        </div>
      </div>
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>收购与加工</span></div>
        <div class="gp-box">
          <Base-Chart ref="sgyjgChart" :chart-id="sgyjgId" :option="sgyjgOption" />
        </div>
      </div>
    </div>
    <div class="gp-right gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>产量信息</span></div>
        <div class="gp-box">
          <Base-Chart ref="clxxChart" :chart-id="clxxId" :option="clxxOption" />
        </div>
      </div>
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>面积与品种</span></div>
        <div class="gp-box">
          <Base-Chart ref="mjypzChart" :chart-id="mjypzId" :option="mjypzOption" />
        </div>
      </div>
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>社会化服务组织</span></div>
        <div class="gp-box">
          <Base-Chart ref="shhfwzzChart" :chart-id="shhfwzzId" :option="shhfwzzOption" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
import BasicInformationMaps from './components/basic-information-maps';
import BaseChart from '@/components/echarts/baseChart';
import { sumBy } from 'lodash';

export default {
  name: 'BasicInformation',
  components: {
    BasicInformationMaps,
    BaseChart,
  },
  data() {
    return {
      mapData: [], // 地图数据
      lonLatData: [], // 坐标数据
      mapColor: {},
      keyword: '', // 类型
      distributionOptions: [
        {
          value: '320000',
          label: '全省',
        },
        {
          value: '320382000000',
          label: '邳州',
        },
        {
          value: '320321000000',
          label: '丰县',
        },
        {
          value: '320322000000',
          label: '沛县',
        },
        {
          value: '320305000000',
          label: '贾汪',
        },
        {
          value: '320312000000',
          label: '铜山',
        },
        {
          value: '320924000000',
          label: '射阳',
        },
        {
          value: '320904000000',
          label: '大丰',
        },
      ],
      distribution: null, // 分布
      typeOptions: [
        {
          value: '蒜头',
          label: '蒜头',
        },
        {
          value: '蒜薹',
          label: '蒜薹',
        },
        {
          value: '蒜苗',
          label: '蒜苗',
        },
      ],
      // 产值信息
      czId: 'czChart',
      czOption: {
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
          },
          borderWidth: 0,
          padding: [8, 8], //内边距
          // formatter: function (params) {
          //   let str = params[0].name + '<br />';
          //   for (let i = 0; i < params.length; i++) {
          //     if (params[i].seriesName !== '') {
          //       str += params[i].seriesName + '：' + params[i].value + '吨<br/>';
          //     }
          //   }
          //   return str;
          // },
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
          },
        },
      },
      // 大蒜价格行情
      dshqId: 'dshqChart',
      dshqOption: {
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
          },
          borderWidth: 0,
          // padding: [8, 8], //内边距
          // formatter: function (params) {
          //   let str = params[0].name + '<br />';
          //   for (let i = 0; i < params.length; i++) {
          //     if (params[i].seriesName !== '') {
          //       str += params[i].seriesName + '：' + params[i].value + '吨<br/>';
          //     }
          //   }
          //   return str;
          // },
        },
        xAxis: {
          type: 'category',
          axisPointer: {
            label: {
              color: '#00FF00',
            },
            lineStyle: {
              color: '#00FF00',
            },
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
          },
        },
      },
      // 收购与加工
      sgyjgId: 'sgyjgChart',
      sgyjgOption: {
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
          backgroundColor: 'rgba(50, 123, 222, 0.9)', // 背景
          textStyle: {
            color: '#FFFFFF',
          },
          borderWidth: 0,
          // padding: [8, 8], //内边距
          // formatter: function (params) {
          //   console.log(params);
          //   return params.name + '：' + params.value + '吨';
          // },
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
          },
        },
      },
      // 产量信息
      clxxId: 'clxxChart',
      clxxOption: {
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
          },
          borderWidth: 0,
        },
        xAxis: {
          type: 'category',
          axisPointer: {
            label: {
              color: '#00FF00',
            },
            lineStyle: {
              color: '#00FF00',
            },
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
          },
        },
      },
      // 面积与品种
      mjypzId: 'mjypzChart',
      mjypzOption: {
        grid: {
          top: '45',
          left: '10',
          right: '10',
          bottom: '10',
          containLabel: true,
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(50, 123, 222, 0.9)', // 背景
          borderWidth: 0,
          textStyle: {
            color: '#FFFFFF',
          },
          formatter: '{b} : {c} ({d}%)',
        },
      },
      // 社会化服务组织
      shhfwzzId: 'shhfwzzChart',
      shhfwzzOption: {
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
          backgroundColor: 'rgba(50, 123, 222, 0.9)', // 背景
          textStyle: {
            color: '#FFFFFF',
          },
          borderWidth: 0,
          // padding: [8, 8], //内边距
          // formatter: function (params) {
          //   console.log(params);
          //   return params.name + '：' + params.value + '吨';
          // },
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
            fontWeight: 'normal',
            fontSize: 12,
          },
        },
      },
    };
  },
  mounted() {
    this.getInfo();
    this.getMapsInfo();
  },
  methods: {
    async getInfo(regions, levels) {
      regions = regions ? regions : '';
      levels = levels ? levels : '';

      console.log(regions, levels);

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
      let resColor = [
        ['#4D81E7', '#144FC4'],
        ['#1AE1E5', '#0CCFD3'],
        ['#00FFCF', '#00DDB3'],
      ];
      // 产值信息
      this.$api
        .postBaseApi(
          'cc/outputValue/getChartData',
          qs.stringify({
            type: 1, // 0 产量 1 产值
            region: regions,
            level: levels,
          })
        )
        .then((res) => {
          console.log(res);
          if (!res) return;
          console.log(123);
          if (res.code === 200) {
            let resData = res.result;
            let resArr = [];
            // 产值信息
            if (!resData.data) {
              this.czOption.series = [];
              this.$refs.czChart.refresh(this.czOption);
            } else {
              this.czOption.color = ['#4D81E7', '#1AE1E5', '#00FFCF'];
              this.czOption.legend.data = resData.legend;
              this.czOption.xAxis.data = resData.category;
              for (let i = 0; i < resData.data.length; i++) {
                resArr.push({
                  name: resData.data[i].name,
                  type: resData.data[i].type,
                  itemStyle: {
                    show: true,
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: resColor[i][0],
                      },
                      {
                        offset: 1,
                        color: resColor[i][1],
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
              this.czOption.series = resArr;
              this.$refs.czChart.refresh(this.czOption);
            }
          }
        })
        .catch(() => {});

      // 大蒜价格行情
      this.$api
        .postBaseApi(
          'cc/garlicPrice/getChartData',
          qs.stringify({
            region: regions,
            level: levels,
          })
        )
        .then((res) => {
          if (!res) return;
          if (res.code === 200) {
            let resData = res.result;
            let resArr = [];
            // 大蒜价格行情
            if (!resData.data) {
              this.dshqOption.series = [];
              this.$refs.dshqChart.refresh(this.czOption);
            } else {
              this.dshqOption.legend.data = resData.legend;
              this.dshqOption.xAxis.data = resData.category;

              for (let i = 0; i < resData.data.length; i++) {
                resArr.push({
                  name: resData.data[i].name,
                  type: resData.data[i].type,
                  itemStyle: {
                    show: true,
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: resColor[i][0],
                      },
                      {
                        offset: 1,
                        color: resColor[i][1],
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
              this.dshqOption.series = resArr;
              this.$refs.dshqChart.refresh(this.dshqOption);
            }
          }
        })
        .catch(() => {});

      // 收购与加工
      this.$api
        .postBaseApi(
          'cc/acquisitionProcessing/getChartData',
          qs.stringify({
            region: regions,
            level: levels,
          })
        )
        .then((res) => {
          if (!res) return;
          if (res.code === 200) {
            let resData = res.result;

            if (!resData.data) {
              this.sgyjgOption.series = [];
              this.$refs.sgyjgChart.refresh(this.czOption);
            } else {
              this.sgyjgOption.legend.data = resData.category;
              this.sgyjgOption.xAxis.data = resData.category;
              this.sgyjgOption.series = [
                {
                  type: 'bar',
                  barWidth: barWidth,
                  itemStyle: {
                    color: function (params) {
                      return colors[params.dataIndex % 7];
                    },
                  },
                  label: {
                    show: true,
                    position: [barWidth / 2, -barWidth],
                    color: '#ffffff',
                    fontSize: 12,
                    fontStyle: 'bold',
                    align: 'center',
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
              this.$refs.sgyjgChart.refresh(this.sgyjgOption);
            }
          }
        })
        .catch(() => {});

      // 产量信息
      this.$api
        .postBaseApi(
          'cc/outputValue/getChartData',
          qs.stringify({
            type: 0, // 0 产量 1 产值
            region: regions,
            level: levels,
          })
        )
        .then((res) => {
          if (!res) return;
          if (res.code === 200) {
            let resData = res.result;
            let resColor = [
              ['#4D81E7', '#144FC4'],
              ['#1AE1E5', '#0CCFD3'],
              ['#00FFCF', '#00DDB3'],
            ];
            let resArr = [];

            if (!resData.data) {
              this.clxxOption.series = [];
              this.$refs.clxxChart.refresh(this.czOption);
            } else {
              this.clxxOption.color = ['#4D81E7', '#1AE1E5', '#00FFCF'];
              this.clxxOption.legend.data = resData.legend;
              this.clxxOption.xAxis.data = resData.category;
              for (let i = 0; i < resData.data.length; i++) {
                resArr.push({
                  name: resData.data[i].name,
                  type: 'line',
                  itemStyle: {
                    show: true,
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: resColor[i][0],
                      },
                      {
                        offset: 1,
                        color: resColor[i][1],
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
              this.clxxOption.series = resArr;
              this.$refs.clxxChart.refresh(this.clxxOption);
            }
          }
        })
        .catch(() => {});

      // 面积与品种
      this.$api
        .postBaseApi(
          'cc/areaVariety/getChartData',
          qs.stringify({
            region: regions,
            level: levels,
          })
        )
        .then((res) => {
          if (!res) return;
          if (res.code === 200) {
            let resData = res.result;
            // 面积与品种
            let resColors = ['#4D81E7', '#00FFCF', '#1AE1E5', '#FFB95B', '#FF7160'];
            let legendData = [];

            if (!resData.data) {
              this.mjypzOption.series = [];
              this.$refs.mjypzChart.refresh(this.czOption);
            } else {
              for (var j = 0; j < resData.data.length; j++) {
                var data = {
                  name: resData.data[j].name,
                  icon: 'circle',
                  textStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                    lineHeight: 20,
                    color: resColors[j],
                  },
                };
                legendData.push(data);
              }

              this.mjypzOption.legend = {
                orient: 'vertical',
                right: '10',
                y: 'center',
                padding: 10,
                icon: 'circle',
                itemGap: 10,
                itemWidth: 10,
                itemHeight: 10,
                data: legendData,
                formatter: function (name) {
                  let sum = sumBy(resData.data, function (o) {
                    return parseInt(o.value);
                  });
                  for (let i = 0; i < resData.data.length; i++) {
                    if (name == resData.data[i].name) {
                      return `${name} ${((parseInt(resData.data[i].value) / sum) * 100).toFixed(
                        2
                      )}% \n {value|面积：} {value|${resData.data[i].value} } {value|k㎡}`;
                    }
                  }
                },
                textStyle: {
                  rich: {
                    value: {
                      color: '#ffffff',
                      fontSize: 12,
                    },
                  },
                },
              };
              this.mjypzOption.series = [
                {
                  name: '面积与品种',
                  type: 'pie',
                  radius: '50%',
                  center: ['35%', '50%'],
                  color: resColors,
                  data: resData.data,

                  label: {
                    formatter: function (params) {
                      return '{b|' + params.name + '}';
                    },
                    rich: {
                      b: {
                        color: '#ffffff',
                        fontSize: 12,
                        height: 40,
                        padding: [21, 0],
                      },
                    },
                  },
                  itemStyle: {
                    borderWidth: 5,
                    borderColor: '#010825',
                  },
                },
              ];
              this.$refs.mjypzChart.refresh(this.mjypzOption);
            }
          }
        })
        .catch(() => {});

      // 社会化服务组织
      this.$api
        .postBaseApi(
          'cc/socialService/getChartData',
          qs.stringify({
            region: regions,
            level: levels,
          })
        )
        .then((res) => {
          if (!res) return;
          if (res.code === 200) {
            let resData = res.result;

            // 社会化服务组织
            if (!resData.data) {
              this.shhfwzzOption.series = [];
              this.$refs.shhfwzzChart.refresh(this.shhfwzzOption);
            } else {
              this.shhfwzzOption.legend.data = resData.category;
              this.shhfwzzOption.xAxis.data = resData.category;
              this.shhfwzzOption.series = [
                {
                  type: 'bar',
                  barWidth: barWidth,
                  itemStyle: {
                    color: function (params) {
                      return colors[params.dataIndex % 7];
                    },
                  },
                  label: {
                    show: true,
                    position: [barWidth / 2, -barWidth],
                    color: '#ffffff',
                    fontSize: 12,
                    fontStyle: 'bold',
                    align: 'center',
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
              this.$refs.shhfwzzChart.refresh(this.shhfwzzOption);
            }
          }
        })
        .catch(() => {});
    },
    getData() {
      // this.getMapsInfo();
    },
    // 分布change
    getDistribution(val) {
      if (val === '320000') {
        this.distribution = '';
      }
      this.getInfo(this.distribution, 3);
      this.getMapsInfo('distribution');
    },
    // 类型change
    getKeyword() {
      this.getMapsInfo('keyword');
    },
    // 地图坐标拾取
    getMapsInfo(type) {
      let params = {
        region: this.distribution,
        level: this.distribution ? '3' : null,
      };
      if (type === 'keyword') {
        params.keyword = this.keyword;
      }
      this.$api
        .postBaseApi('gc/cropDistributed/getCropDistributeds', params)
        .then((res) => {
          if (!res) return;
          if (res.code === 200) {
            if (type === 'keyword' || type === 'distribution') {
              this.lonLatData = res.result;
            } else {
              this.lonLatData = res.result;
              this.mapData = res.result;
            }
            // for (let i = 0; i < res.result.length; i++) {
            //   this.mapColor[res.result[i].townCode] = 'rgba(83, 168, 217, 0.5)';
            // }
          }
        })
        .catch(() => {});
    },
  },
};
</script>
