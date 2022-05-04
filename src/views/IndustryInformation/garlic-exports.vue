<template>
  <div class="gp-bg gp-industry">
    <div class="gp-flex gp-flex-direction-column gp-eports">
      <div class="gp-eports__header">
        <p>总交易量<b>125606</b><span>吨</span></p>
        <p>总交易额<b>105260</b><span>万元</span></p>
      </div>
      <div class="gp-eports__body">
        <WorldEcharts />
      </div>
    </div>
    <div class="gp-right gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1 gp-mb15">
        <div class="gp-title"><span>大蒜交易量及总额</span></div>
        <div class="gp-box">
          <Base-Chart ref="baseChart" :chart-id="baseId" :option="baseOption" @chartClick="baseClick" />
        </div>
      </div>
      <div class="gp-flex gp-flex-direction-column gp-flex2 gp-mb15">
        <div class="gp-title"><span>大蒜出口国家排名</span></div>
        <div class="gp-box">
          <ul class="gp-infinite__list" v-infinite-scroll="load" style="overflow: auto">
            <li v-for="(item, index) in ranking" :key="index" class="gp-infinite__list-item">
              <b>{{ item.index }}</b>
              <p>{{ item.name }}</p>
              <span>{{ item.type }}</span>
              <span>{{ item.value }}{{ item.unit }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WorldEcharts from './components/worldEcharts';
import BaseChart from '@/components/echarts/baseChart';

let sData = [
  {
    value: 85,
    name: '50-100亩',
    percent: '33.33',
  },
  {
    value: 85,
    name: '100-200亩',
    percent: '33.33',
  },
  {
    value: 85,
    name: '200-500亩',
    percent: '33.33',
  },
  {
    value: 85,
    name: '500-1000亩',
    percent: '33.33',
  },
  {
    value: 85,
    name: '1000-1500亩',
    percent: '33.33',
  },
];
let legendColors = ['#4D81E7', '#00FFCF', '#1AE1E5', '#FFB95B', '#FF7160'];
let legendData = [];
for (var j = 0; j < sData.length; j++) {
  var data = {
    name: sData[j].name,
    icon: 'circle',
    textStyle: {
      fontSize: 14,
      fontWeight: 'bold',
      lineHeight: 20,
      color: legendColors[j],
    },
  };
  legendData.push(data);
}

export default {
  name: 'BasicInformation',
  components: {
    WorldEcharts,
    BaseChart,
  },
  data() {
    return {
      ranking: [
        { index: 1, name: '美国', type: '蒜头', value: 239, unit: '万吨' },
        { index: 2, name: '法国', type: '蒜苗', value: 239, unit: '万吨' },
        { index: 3, name: '澳大利亚', type: '蒜薹', value: 239, unit: '万吨' },
        { index: 4, name: '日本', type: '蒜头', value: 239, unit: '万吨' },
        { index: 5, name: '韩国', type: '蒜薹', value: 239, unit: '万吨' },
        { index: 6, name: '印度', type: '蒜头', value: 239, unit: '万吨' },
        { index: 7, name: '泰国', type: '蒜苗', value: 239, unit: '万吨' },
        { index: 8, name: '吉利尼亚', type: '蒜薹', value: 239, unit: '万吨' },
        { index: 9, name: '德国', type: '蒜头', value: 239, unit: '万吨' },
        { index: 10, name: '英国', type: '蒜苗', value: 239, unit: '万吨' },
        { index: 11, name: '俄罗斯', type: '蒜苗', value: 239, unit: '万吨' },
        { index: 12, name: '加拿大', type: '蒜苗', value: 239, unit: '万吨' },
      ],
      baseId: 'baseChart', // 面积与品种
      baseOption: {
        grid: {
          top: '45',
          left: '10',
          right: '10',
          bottom: '10',
          containLabel: true,
        },
        legend: {
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
          padding: [8, 8], //内边距
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
            fontSize: 14,
          },
        },
        yAxis: {
          type: 'value',
          name: '单位：吨',
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
            fontSize: 14,
          },
        },
      },
    };
  },
  mounted() {
    // 大蒜交易量及总额
    this.baseOption.color = ['#003366', '#006699', '#4cabce', '#e5323e'];
    this.baseOption.legend.data = ['蒜头', '蒜薹', '蒜苗'];
    this.baseOption.xAxis.data = ['2019', '2020', '2021', '2020'];
    this.baseOption.series = [
      {
        name: '蒜头',
        type: 'bar',
        itemStyle: {
          show: true,
          color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#4D81E7',
            },
            {
              offset: 1,
              color: '#144FC4',
            },
          ]),
          borderRadius: [6, 6, 0, 0],
          borderWidth: 0,
        },
        barWidth: '12px',
        barGap: '100%',
        data: [320, 332, 301, 334, 390],
      },
      {
        name: '蒜薹',
        type: 'bar',
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
        data: [220, 182, 191, 234, 290],
      },
      {
        name: '蒜苗',
        type: 'bar',
        itemStyle: {
          show: true,
          color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#00FFCF',
            },
            {
              offset: 1,
              color: '#00DDB3',
            },
          ]),
          borderRadius: [6, 6, 0, 0],
          borderWidth: 0,
        },
        barWidth: '12px',
        barGap: '100%',
        data: [150, 232, 201, 154, 190],
      },
      {
        name: '蒜头',
        type: 'line',
        itemStyle: {
          show: true,
          color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#4D81E7',
            },
            {
              offset: 1,
              color: '#144FC4',
            },
          ]),
          borderRadius: [6, 6, 0, 0],
          borderWidth: 0,
        },
        barWidth: '12px',
        barGap: '100%',
        data: [320, 332, 301, 334, 390, 332, 301, 334, 390, 301, 334, 390],
      },
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
        data: [220, 182, 191, 234, 290, 182, 191, 234, 290, 191, 234, 290],
      },
      {
        name: '蒜苗',
        type: 'line',
        itemStyle: {
          show: true,
          color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#00FFCF',
            },
            {
              offset: 1,
              color: '#00DDB3',
            },
          ]),
          borderRadius: [6, 6, 0, 0],
          borderWidth: 0,
        },
        barWidth: '12px',
        barGap: '100%',
        data: [150, 232, 201, 154, 190, 232, 201, 154, 190, 201, 154, 190],
      },
    ];
  },
  methods: {
    baseClick() {},
    load() {
      this.count += 2;
    },
  },
};
</script>
