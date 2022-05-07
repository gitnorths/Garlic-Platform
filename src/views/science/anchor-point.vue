<template>
  <div class="gp-bg gp-science">
    <AnchorPointMaps />
    <div class="gp-right gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1 gp-mb15">
        <div class="gp-title"><span>测土配方施肥长期定位点监测</span></div>
        <div class="gp-box gp-p20 gp-flex gp-flex-direction-column">
          <ul>
            <li v-for="(item, index) in monitorStations" :key="index">
              <span>{{ item.value }}</span>
              <p :class="item.className">{{ item.name }}</p>
            </li>
          </ul>
          <div class="gp-flex gp-flex-direction-column gp-flex1">
            <div class="gp-title"><span>历年数据</span></div>
            <div class="gp-group">
              <span>磷含量</span>
              <el-radio-group size="mini" v-model="tabPosition">
                <el-radio-button label="dan">氮</el-radio-button>
                <el-radio-button label="lin">磷</el-radio-button>
                <el-radio-button label="jia">钾</el-radio-button>
              </el-radio-group>
            </div>
            <div class="gp-box">
              <Base-Chart ref="baseChart" :chart-id="baseId" :option="baseOption" @chartClick="baseClick" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnchorPointMaps from './components/anchor-point-maps';
import BaseChart from '@/components/echarts/baseChart';

export default {
  name: 'AnchorPoint',
  components: {
    AnchorPointMaps,
    BaseChart,
  },
  data() {
    return {
      tabPosition: 'dan',
      monitorStations: [
        { name: '区级监测点', value: 126, className: 'area' },
        { name: '市级监测点', value: 89, className: 'city' },
        { name: '省级监测点', value: 16, className: 'province' },
        { name: '国家级监测点', value: 3, className: 'countries' },
      ],
      baseId: 'baseChart', // 面积与品种
      baseOption: {
        grid: {
          top: '45',
          left: '10',
          right: '0',
          bottom: '10',
          containLabel: true,
        },
        legend: {
          show: false,
          top: 10,
          right: 0,
          itemWidth: 16,
          itemHeight: 8,
          textStyle: {
            color: '#7EC1FF',
            fontSize: 14,
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              width: 2,
              type: 'solid',
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(4, 250, 38, 0.3)',
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(4, 250, 38, 1)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(4, 250, 38, 0.3)',
                  },
                ],
                global: false,
              },
            },
          },
        },
        xAxis: {
          type: 'category',
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
          name: '单位：mg/L',
          min: 0,
          max: 10,
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
    };
  },
  mounted() {
    this.baseOption.color = ['#4D81E7', '#00FFCF', '#1AE1E5', '#FFB95B', '#FF7160'];
    this.baseOption.legend.data = ['蒜头', '蒜薹', '蒜苗'];
    this.baseOption.xAxis.data = ['2016', '2017', '2018', '2019', '2020', '2021'];
    this.baseOption.series = [
      {
        name: '蒜薹',
        type: 'line',
        symbol: 'circle',
        symbolSize: 10,
        showAllSymbol: true,
        lineStyle: {
          normal: {
            color: '#1AE1E5',
            shadowColor: 'rgba(0, 0, 0, .3)',
            shadowBlur: 0,
            shadowOffsetY: 5,
            shadowOffsetX: 5,
          },
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#1AE1E5',
          },
        },
        itemStyle: {
          color: '#1AE1E5',
          borderColor: '#fff',
          borderWidth: 3,
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 2,
          shadowOffsetX: 2,
        },
        tooltip: {
          show: false,
        },
        areaStyle: {
          normal: {
            color: new this.$echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(26, 225, 229,0.3)',
                },
                {
                  offset: 1,
                  color: 'rgba(26, 225, 229,0)',
                },
              ],
              false
            ),
            shadowColor: 'rgba(26, 225, 229, 0.9)',
            shadowBlur: 20,
          },
        },
        data: [6, 7.5, 7, 6, 7.8, 7],
      },
    ];
  },
  methods: {
    baseClick() {},
  },
};
</script>
