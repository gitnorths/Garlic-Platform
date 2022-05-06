<template>
  <div class="gp-bg gp-science">
    <Science-Maps />
    <div class="gp-right gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-mb15">
        <div class="gp-title"><span>测土配方施肥长期定位点监测</span></div>
        <div class="gp-box">
          <ul>
            <li>
              <span>126</span>
              <p class="area">区级监测点</p>
            </li>
            <li>
              <span>89</span>
              <p class="city">市级监测点</p>
            </li>
            <li>
              <span>16</span>
              <p class="province">省级监测点</p>
            </li>
            <li>
              <span>3</span>
              <p class="countries">国家级监测点</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="gp-flex gp-flex-direction-column gp-flex2 gp-mb15">
        <div class="gp-title"><span>历年数据</span></div>
        <div class="gp-box">
          <Base-Chart ref="baseChart" :chart-id="baseId" :option="baseOption" @chartClick="baseClick" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ScienceMaps from './components/science-maps';
import BaseChart from '@/components/echarts/baseChart';

export default {
  name: 'BasicInformation',
  components: {
    ScienceMaps,
    BaseChart,
  },
  data() {
    return {
      baseId: 'baseChart', // 面积与品种
      baseOption: {
        grid: {
          top: '45',
          left: '0',
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
            fontSize: 14,
          },
        },
        yAxis: {
          type: 'value',
          name: '单位：吨',
          min: 0,
          max: 10,
          nameTextStyle: {
            color: '#7EC1FF',
            fontSize: 14,
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
            fontSize: '14',
          },
        },
      },
    };
  },
  mounted() {
    // 面积与品种
    this.baseOption.color = ['#4D81E7', '#00FFCF', '#1AE1E5', '#FFB95B', '#FF7160'];
    this.baseOption.legend.data = ['蒜头', '蒜薹', '蒜苗'];
    this.baseOption.xAxis.data = ['2016', '2017', '2018', '2019', '2020', '2021'];
    this.baseOption.series = [
      {
        name: '蒜薹',
        type: 'line',
        itemStyle: {
          show: true,
          color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#1AE1E5',
            },
            {
              offset: 1,
              color: '#0CCFD3',
            },
          ]),
          borderRadius: [6, 6, 0, 0],
          borderWidth: 0,
        },
        barWidth: '12px',
        barGap: '100%',
        data: [6, 7.5, 7, 6, 7.8, 7],
      },
    ];
  },
  methods: {
    baseClick() {},
  },
};
</script>
