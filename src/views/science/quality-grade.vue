<template>
  <div class="gp-bg gp-industry">
    <QualityGradeMaps />
    <div class="gp-right gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1 gp-mb15">
        <div class="gp-title"><span>农户数据详情</span></div>
        <div class="gp-box height">
          <Base-Chart ref="baseChart" :chart-id="baseId" :option="baseOption" @chartClick="baseClick" />
        </div>
      </div>
      <div class="gp-flex gp-flex-direction-column gp-flex2 gp-mb15">
        <div class="gp-box gp-table">
          <el-table :data="tableData" :height="height">
            <el-table-column prop="name" label="农户" align="center" show-overflow-tooltip width="100">
            </el-table-column>
            <el-table-column prop="type" label="类型" align="center" show-overflow-tooltip width="100">
            </el-table-column>
            <el-table-column prop="varieties" label="品种" align="center" show-overflow-tooltip width="120">
            </el-table-column>
            <el-table-column prop="area" label="面积" align="center" show-overflow-tooltip width="100">
            </el-table-column>
            <el-table-column prop="address" label="地址" align="center" show-overflow-tooltip> </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QualityGradeMaps from './components/quality-grade-maps';
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
    QualityGradeMaps,
    BaseChart,
  },
  data() {
    return {
      baseId: 'baseChart', // 面积与品种
      baseOption: {
        title: {
          text: '2426万亩',
          left: '31%',
          y: '42%',
          textAlign: 'center',
          textStyle: {
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '24px',
          },
          subtext: '1126户',
          subtextStyle: {
            color: '#71B0F8',
            fontSize: '18px',
          },
        },
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
          icon: 'circle',
          itemGap: 10,
          itemWidth: 10,
          itemHeight: 10,
          data: legendData,
          formatter: function (name) {
            let num = sData[0].value + sData[1].value + sData[2].value;
            for (let i = 0; i < sData.length; i++) {
              if (name == sData[i].name) {
                return `${name} ${((sData[i].value / num) * 100).toFixed(2)}%\n{value|100户}  {value|${
                  sData[i].value
                }}{value|万亩}`;
              }
            }
          },
          textStyle: {
            rich: {
              value: {
                color: '#ffffff',
                fontSize: '12px',
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
          formatter: '{b}: {c}（{d}%）',
        },
      },
      height: '42vh',
      tableData: [
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
        {
          name: '李大田',
          type: '蒜头',
          varieties: '蒜头001号',
          area: '23亩',
          address: '徐州市铜山县大庄镇18组',
        },
      ],
    };
  },
  mounted() {
    // 面积与品种
    this.baseOption.color = ['#4D81E7', '#00FFCF', '#1AE1E5', '#FFB95B', '#FF7160'];
    this.baseOption.series = [
      {
        name: '面积与品种',
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['32%', '50%'],
        color: ['#4D81E7', '#00FFCF', '#1AE1E5', '#FFB95B', '#FF7160'],
        data: sData.sort(function (a, b) {
          return a.value - b.value;
        }),

        label: {
          show: false,
          rich: {
            b: {
              color: '#d9efff',
              fontSize: 15,
              height: 40,
            },
            c: {
              color: '#fff',
              fontSize: 14,
            },
          },
        },
        itemStyle: {
          borderWidth: 5,
          borderColor: '#010825',
        },
      },
    ];
  },
  methods: {
    baseClick() {},
  },
};
</script>
