<template>
  <div class="gp-bg">
    <DsMaps />
    <div class="gp-left gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>产值信息</span></div>
        <div class="gp-box">
          <Base-Chart ref="czChart" :chart-id="czId" :option="czOption" @chartClick="czClick" />
        </div>
      </div>
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>大蒜价格行情</span></div>
        <div class="gp-box">
          <Base-Chart ref="dshqChart" :chart-id="dshqId" :option="dshqOption" @chartClick="dshqClick" />
        </div>
      </div>
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>收购与加工</span></div>
        <div class="gp-box">
          <Base-Chart ref="sgyjgChart" :chart-id="sgyjgId" :option="sgyjgOption" @chartClick="sgyjgClick" />
        </div>
      </div>
    </div>
    <div class="gp-right gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>产量信息</span></div>
        <div class="gp-box">
          <Base-Chart ref="clxxChart" :chart-id="clxxId" :option="clxxOption" @chartClick="clxxClick" />
        </div>
      </div>
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>面积与品种</span></div>
        <div class="gp-box">
          <Base-Chart ref="mjypzChart" :chart-id="mjypzId" :option="mjypzOption" @chartClick="mjypzClick" />
        </div>
      </div>
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>社会化服务组织</span></div>
        <div class="gp-box">
          <Base-Chart ref="shhfwzzChart" :chart-id="shhfwzzId" :option="shhfwzzOption" @chartClick="shhfwzzClick" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DsMaps from './components/maps';
import BaseChart from '@/components/echarts/baseChart';

let xData = ['加工企业', '收购网点', '出口'];
let yList = [32, 58, 64];
let xData2 = ['播种', '打药', '施肥', '收割'];
let yList2 = [32, 58, 64, 29];
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

let sData = [
  {
    value: 1349,
    name: '蒜头',
  },
  {
    value: 512,
    name: '蒜薹',
  },
  {
    value: 384,
    name: '蒜苗',
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
    DsMaps,
    BaseChart,
  },
  data() {
    return {
      czId: 'czChart', // 产值信息
      czOption: {
        grid: {
          top: '45',
          left: '0',
          right: '0',
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
      dshqId: 'dshqChart', // 大蒜价格行情
      dshqOption: {
        grid: {
          top: '45',
          left: '0',
          right: '0',
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
            fontSize: '14',
          },
        },
      },
      sgyjgId: 'sgyjgChart', // 收购与加工
      sgyjgOption: {
        grid: {
          top: '45',
          left: '10',
          right: '0',
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
            fontSize: '14',
          },
        },
      },
      clxxId: 'clxxChart', // 产量信息
      clxxOption: {
        grid: {
          top: '45',
          left: '0',
          right: '0',
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
      mjypzId: 'mjypzChart', // 面积与品种
      mjypzOption: {
        grid: {
          top: '45',
          left: '10',
          right: '0',
          bottom: '10',
          containLabel: true,
        },
        legend: {
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
            let num = sData[0].value + sData[1].value + sData[2].value;
            for (let i = 0; i < sData.length; i++) {
              if (name == sData[i].name) {
                return `${name} ${((sData[i].value / num) * 100).toFixed(2)}%\n{value|面积：}{value|${
                  sData[i].value
                } } {value|k㎡}`;
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
      shhfwzzId: 'shhfwzzChart', // 社会化服务组织
      shhfwzzOption: {
        grid: {
          top: '45',
          left: '10',
          right: '0',
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
            fontWeight: 'normal',
            fontSize: '14',
          },
        },
      },
    };
  },
  mounted() {
    // 产值信息
    this.czOption.color = ['#003366', '#006699', '#4cabce', '#e5323e'];
    this.czOption.legend.data = ['蒜头', '蒜薹', '蒜苗'];
    this.czOption.xAxis.data = ['2019', '2020', '2021', '2020'];
    this.czOption.series = [
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
    ];

    // 大蒜价格行情
    this.dshqOption.color = ['#003366', '#006699', '#4cabce', '#e5323e'];
    this.dshqOption.legend.data = ['蒜头', '蒜薹', '蒜苗'];
    this.dshqOption.xAxis.data = [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月',
    ];
    this.dshqOption.series = [
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

    // 收购与加工
    this.sgyjgOption.color = ['#003366', '#006699', '#4cabce', '#e5323e'];
    this.sgyjgOption.legend.data = ['蒜头', '蒜薹', '蒜苗'];
    this.sgyjgOption.xAxis.data = xData;
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
        data: yList,
      },
      {
        z: 2,
        type: 'pictorialBar',
        data: yList,
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
        data: yList,
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

    // 产量信息
    this.clxxOption.color = ['#003366', '#006699', '#4cabce', '#e5323e'];
    this.clxxOption.legend.data = ['蒜头', '蒜薹', '蒜苗'];
    this.clxxOption.xAxis.data = ['2019', '2020', '2021', '2022'];
    this.clxxOption.series = [
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
        data: [320, 332, 301, 334],
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
        data: [220, 182, 191, 234],
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
        data: [150, 232, 201, 154],
      },
    ];

    // 面积与品种
    this.mjypzOption.color = ['#003366', '#006699', '#4cabce', '#e5323e'];
    this.mjypzOption.series = [
      {
        name: '面积与品种',
        type: 'pie',
        radius: '50%',
        center: ['35%', '50%'],
        color: ['#1AE1E5', '#00FFCF', '#4D81E7'],
        data: sData.sort(function (a, b) {
          return a.value - b.value;
        }),

        label: {
          formatter: function (params) {
            return '{b|' + params.name + '}';
          },
          rich: {
            b: {
              color: '#ffffff',
              fontSize: 14,
              height: 40,
              padding: [21, 0],
            },
          },
        },
        // labelLine: {
        //   length: 30,
        //   length2: 20,
        //   maxSurfaceAngle: 80,
        // },
        itemStyle: {
          borderWidth: 5,
          borderColor: '#010825',
        },
      },
    ];

    // 社会化服务组织
    this.shhfwzzOption.color = ['#003366', '#006699', '#4cabce', '#e5323e'];
    this.shhfwzzOption.legend.data = ['蒜头', '蒜薹', '蒜苗'];
    this.shhfwzzOption.xAxis.data = xData2;
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
        data: yList2,
      },
      {
        z: 2,
        type: 'pictorialBar',
        data: yList2,
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
        data: yList2,
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
  },
  methods: {
    czClick() {},
    dshqClick() {},
    sgyjgClick() {},
    clxxClick() {},
    mjypzClick() {},
    shhfwzzClick() {},
  },
};
</script>
