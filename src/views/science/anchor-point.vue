<template>
  <div class="gp-bg gp-science">
    <AnchorPointMaps :mapData="mapData" :lonLatData="lonLatData" @getHandleData="getHandleData" />
    <div class="gp-right gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1 gp-mb15">
        <div class="gp-title"><span>测土配方施肥长期定位点监测</span></div>
        <div class="gp-box gp-p20 gp-flex gp-flex-direction-column">
          <div class="gp-flex gp-flex-direction-column gp-flex1">
            <div class="gp-title"><span>历年数据</span></div>
            <div class="gp-group">
              <span>{{ tabName }}</span>
              <el-radio-group size="mini" v-model="tabPosition" @change="tabHandle">
                <el-radio-button label="ph">pH</el-radio-button>
                <el-radio-button label="organicMatter">有机质</el-radio-button>
                <el-radio-button label="totalNitrogen">全氮</el-radio-button>
                <el-radio-button label="availablePhosphorus">有效磷</el-radio-button>
                <el-radio-button label="fastActingPotassium">速效钾</el-radio-button>
                <el-radio-button label="testWeight">容重</el-radio-button>
                <el-radio-button label="salt">盐分</el-radio-button>
                <el-radio-button label="cec">CEC</el-radio-button>
                <el-radio-button label="availableIron">有效铁</el-radio-button>
                <el-radio-button label="availableManganese">有效锰</el-radio-button>
                <el-radio-button label="effectiveCopper">有效铜</el-radio-button>
                <el-radio-button label="availableZinc">有效锌</el-radio-button>
                <el-radio-button label="waterSolubleBoron">水溶态硼</el-radio-button>
                <el-radio-button label="effectiveMolybdenum">有效钼</el-radio-button>
                <el-radio-button label="cadmium">镉</el-radio-button>
                <el-radio-button label="hg">汞</el-radio-button>
                <el-radio-button label="arsenic">砷</el-radio-button>
                <el-radio-button label="lead">铅</el-radio-button>
                <el-radio-button label="chromium">铬</el-radio-button>
                <el-radio-button label="nickel">镍</el-radio-button>
                <el-radio-button label="zinc">锌</el-radio-button>
              </el-radio-group>
            </div>
            <div class="gp-box">
              <Base-Chart ref="baseChart" :chart-id="baseId" :option="baseOption" />
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
import anchorPointJSON from '@/enums/anchorPoint.json';

/**
countySoilClassName 县土类名称
countySubclassName 县亚类名称
countyName 县土属名称
countySoilTypeName 县土种名称
monitoringYear 监测年度
ph pH
organicMatter 有机质
totalNitrogen 全氮
availablePhosphorus 有效磷
fastActingPotassium 速效钾
testWeight 容重
salt 盐分
cec CEC
availableIron 有效铁
availableManganese 有效锰
effectiveCopper 有效铜
availableZinc 有效锌
waterSolubleBoron 水溶态硼
effectiveMolybdenum 有效钼
cadmium 镉
hg 汞
arsenic 砷
lead 铅
chromium 铬
nickel 镍
zinc 锌
**/

export default {
  name: 'AnchorPoint',
  components: {
    AnchorPointMaps,
    BaseChart,
  },
  data() {
    return {
      mapData: [], // 地图数据
      lonLatData: [], // 坐标数据
      tabName: '',
      tabPosition: 'ph',
      cacheData: [],
      monitorStations: [
        { name: '区级监测点', value: 126, className: 'area' },
        { name: '市级监测点', value: 89, className: 'city' },
        { name: '省级监测点', value: 16, className: 'province' },
        { name: '国家级监测点', value: 3, className: 'countries' },
      ],
      baseId: 'baseChart',
      baseOption: {
        color: ['#4D81E7', '#00FFCF', '#1AE1E5', '#FFB95B', '#FF7160'],
        grid: {
          top: '45',
          left: '20',
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
          formatter: '{b} : {c}',
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
        series: [
          {
            type: 'bar',
            name: '出口量',
            itemStyle: {
              show: true,
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(26, 225, 229,0.3)',
                },
                {
                  offset: 1,
                  color: 'rgba(26, 225, 229,0.8)',
                },
              ]),
              borderRadius: [6, 6, 0, 0],
              borderWidth: 0,
            },
            barWidth: '20%',
            barGap: '100%',
          },
        ],
      },
    };
  },
  mounted() {
    this.mapData = anchorPointJSON.list;
    this.getHandleData(this.mapData[0].data[0]);
    this.cacheData = this.mapData[0].data[0];

    setTimeout(() => {
      this.lonLatData = this.mapData[0].data;
    }, 3000);
  },
  methods: {
    tabHandle() {
      this.getHandleData(this.cacheData);
    },
    getHandleData(data) {
      this.cacheData = data;
      let xData = [];
      let sdata = [];
      this.mapData.forEach((item) => {
        xData.push(item.time);
        item.data.forEach((element) => {
          if (element.code === data.code) {
            sdata.push(parseInt(element[this.tabPosition]));
            this.tabName = `${element.city + element.county} (${element.agriculturalArea})  代码：${element.code}`;
          }
        });
      });

      this.baseOption.legend.data = [this.tabPosition];
      this.baseOption.xAxis.data = xData;
      this.baseOption.series[0].name = this.tabPosition;
      this.baseOption.series[0].data = sdata;
      this.$refs.baseChart.refresh(this.baseOption);
    },
  },
};
</script>
