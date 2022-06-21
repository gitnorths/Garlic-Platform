<template>
  <div class="gp-bg gp-industry">
    <div class="gp-flex gp-flex-direction-column gp-eports">
      <div class="gp-eports__header">
        <p>
          总交易量<b>{{ totalVolume }}</b> <span>吨</span>
        </p>
        <p>
          总交易额<b>{{ turnover }}</b> <span>万元</span>
        </p>
      </div>
      <div class="gp-eports__body">
        <WorldEcharts />
      </div>
    </div>
    <div class="gp-right gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1 gp-mb15">
        <div class="gp-title"><span>大蒜交易量及总额</span></div>
        <div class="gp-box height">
          <Base-Chart ref="baseChart" :chart-id="baseId" :option="baseOption" />
        </div>
      </div>
      <div class="gp-flex gp-flex-direction-column gp-flex2 gp-mb15">
        <div class="gp-title"><span>大蒜出口国家排名</span></div>
        <div class="gp-box">
          <ul class="gp-list" v-infinite-scroll="load" style="overflow: auto">
            <li v-for="(item, index) in list" :key="index" class="gp-list__item">
              <b>{{ item.index }}</b>
              <p>{{ item.name }}</p>
              <!-- <span>{{ item.type }}</span> -->
              <span>{{ item.value }} {{ item.unit }}</span>
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

let units = ['吨', '万美元'];

export default {
  name: 'FarlicExports',
  components: {
    WorldEcharts,
    BaseChart,
  },
  data() {
    return {
      totalVolume: '125606',
      turnover: '105260',
      list: [
        { index: 1, name: '印度尼西亚', type: '蒜头', value: 23539, unit: '吨' },
        { index: 2, name: '泰国', type: '蒜苗', value: 18682, unit: '吨' },
        { index: 3, name: '越南', type: '蒜薹', value: 12365, unit: '吨' },
        { index: 4, name: '新加坡', type: '蒜头', value: 9684, unit: '吨' },
        { index: 5, name: '巴基斯坦', type: '蒜薹', value: 6532, unit: '吨' },
        { index: 6, name: '斯里兰卡', type: '蒜头', value: 3806, unit: '吨' },
      ],
      baseId: 'baseChart', // 面积与品种
      baseOption: {
        grid: {
          top: '50',
          left: '10',
          right: '10',
          bottom: '10',
          containLabel: true,
        },
        legend: {
          top: 5,
          x: 'center',
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
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999',
            },
            lineStyle: {
              type: 'dashed',
            },
          },
          formatter: (params) => {
            console.log(params);
            let paramsData = '';
            for (let i = 0; i < params.length; i++) {
              paramsData += `${i === 0 ? params[i].name + '大蒜' : ''}<br /> ${params[i].marker}${
                params[i].seriesName
              }： ${params[i].value} ${units[i]}`;
            }
            return paramsData;
          },
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
            show: true,
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
        yAxis: [
          {
            type: 'value',
            position: 'left',
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
                type: 'dashed',
                color: '#415A89 ',
              },
            },
            axisLabel: {
              color: '#476294',
              fontSize: 14,
            },
          },
          {
            type: 'value',
            position: 'right',
            name: '单位：万美元',
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
              show: false,
              lineStyle: {
                color: '#415A89 ',
              },
            },
            axisLabel: {
              color: '#476294',
              fontSize: 14,
            },
          },
        ],
      },
    };
  },
  mounted() {
    // 大蒜交易量及总额
    this.baseOption.legend.data = ['出口量', '出口额'];
    this.baseOption.xAxis.data = ['2019', '2020', '2021'];
    this.baseOption.series = [
      {
        name: '出口量',
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
        barWidth: '20%',
        barGap: '100%',
        data: [74608, 76340, 64843.8],
      },
      {
        name: '出口额',
        type: 'bar',
        yAxisIndex: 1,
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
        barWidth: '20%',
        barGap: '100%',
        data: [8334.96, 6307.4, 6582.9],
      },
    ];
  },
  methods: {
    load() {},
  },
};
</script>
