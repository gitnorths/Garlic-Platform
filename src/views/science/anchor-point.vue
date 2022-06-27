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
                <el-radio-button label="ph">pH1</el-radio-button>
                <el-radio-button label="organicMatter">有机质1</el-radio-button>
                <el-radio-button label="totalNitrogen">全氮1</el-radio-button>
                <el-radio-button label="availablePhosphorus">有效磷1</el-radio-button>
                <el-radio-button label="fastActingPotassium">速效钾1</el-radio-button>
                <el-radio-button label="testWeight">容重1</el-radio-button>
                <el-radio-button label="salt">盐分1</el-radio-button>
                <el-radio-button label="cec">CEC1</el-radio-button>
                <el-radio-button label="availableIron">有效铁1</el-radio-button>
                <el-radio-button label="availableManganese">有效锰1</el-radio-button>
                <el-radio-button label="effectiveCopper">有效铜1</el-radio-button>
                <el-radio-button label="availableZinc">有效锌1</el-radio-button>
                <el-radio-button label="waterSolubleBoron">水溶态硼1</el-radio-button>
                <el-radio-button label="effectiveMolybdenum">有效钼1</el-radio-button>
                <el-radio-button label="cadmium">镉1</el-radio-button>
                <el-radio-button label="hg">汞1</el-radio-button>
                <el-radio-button label="arsenic">砷1</el-radio-button>
                <el-radio-button label="lead">铅1</el-radio-button>
                <el-radio-button label="chromium">铬1</el-radio-button>
                <el-radio-button label="nickel">镍1</el-radio-button>
                <el-radio-button label="zinc">锌1</el-radio-button>
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
          },
        ],
      },
    };
  },
  mounted() {
    this.mapData = [
      {
        time: '2021',
        data: [
          {
            latitude: '34.30153',
            longitude: '116.38074',
            code: 'JST248',
            city: '徐州市',
            county: '丰县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '典型潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '飞泡砂土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '8.2', // pH
            organicMatter: '16.2', //	有机质
            totalNitrogen: '1.5', //	全氮
            availablePhosphorus: '18.2', //	有效磷
            fastActingPotassium: '95', //	速效钾
            testWeight: '1.28', //	容重
            salt: '2', //	盐分
            cec: '10.2', //	CEC
            availableIron: '43.1', //	有效铁
            availableManganese: '12.9', //	有效锰
            effectiveCopper: '1.7', //	有效铜
            availableZinc: '1.4', //	有效锌
            waterSolubleBoron: '1.41', //	水溶态硼
            effectiveMolybdenum: '0.14', //	有效钼
            cadmium: '0.13', //	镉
            hg: '0.03', //	汞
            arsenic: '7', //	砷
            lead: '25', //	铅
            chromium: '80', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.37532',
            longitude: '116.39549',
            code: 'JST249',
            city: '徐州市',
            county: '丰县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '典型潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '两合土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '8.2', // pH
            organicMatter: '22.2', //	有机质
            totalNitrogen: '1.6', //	全氮
            availablePhosphorus: '18.2', //	有效磷
            fastActingPotassium: '95', //	速效钾
            testWeight: '1.28', //	容重
            salt: '2', //	盐分
            cec: '', //	CEC
            availableIron: '43.1', //	有效铁
            availableManganese: '12.9', //	有效锰
            effectiveCopper: '1.7', //	有效铜
            availableZinc: '1.4', //	有效锌
            waterSolubleBoron: '1.41', //	水溶态硼
            effectiveMolybdenum: '0.14', //	有效钼
            cadmium: '0.13', //	镉
            hg: '0.03', //	汞
            arsenic: '7', //	砷
            lead: '25', //	铅
            chromium: '80', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.46182',
            longitude: '116.35294',
            code: 'JSW250',
            city: '徐州市',
            county: '丰县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '典型潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '两合土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '8.6', // pH
            organicMatter: '10.7', //	有机质
            totalNitrogen: '0.68', //	全氮
            availablePhosphorus: '8.7', //	有效磷
            fastActingPotassium: '47', //	速效钾
            testWeight: '1.28', //	容重
            salt: '0.3', //	盐分
            cec: '', //	CEC
            availableIron: '5.1', //	有效铁
            availableManganese: '2.8', //	有效锰
            effectiveCopper: '0.48', //	有效铜
            availableZinc: '0.19', //	有效锌
            waterSolubleBoron: '0.41', //	水溶态硼
            effectiveMolybdenum: '0.12', //	有效钼
            cadmium: '0.05', //	镉
            hg: '0.03', //	汞
            arsenic: '8', //	砷
            lead: '26', //	铅
            chromium: '76', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.39135',
            longitude: '116.41285',
            code: 'JSW251',
            city: '徐州市',
            county: '丰县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '典型潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '两合土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '8.2', // pH
            organicMatter: '34.5', //	有机质
            totalNitrogen: '2', //	全氮
            availablePhosphorus: '47.9', //	有效磷
            fastActingPotassium: '159', //	速效钾
            testWeight: '1.3', //	容重
            salt: '0.6', //	盐分
            cec: '', //	CEC
            availableIron: '44.1', //	有效铁
            availableManganese: '9.2', //	有效锰
            effectiveCopper: '2.33', //	有效铜
            availableZinc: '2.07', //	有效锌
            waterSolubleBoron: '1.02', //	水溶态硼
            effectiveMolybdenum: '0.14', //	有效钼
            cadmium: '0.14', //	镉
            hg: '0.03', //	汞
            arsenic: '8', //	砷
            lead: '24', //	铅
            chromium: '82', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.36403',
            longitude: '116.43148',
            code: 'JSE252',
            city: '徐州市',
            county: '丰县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '典型潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '砂土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '8.3', // pH
            organicMatter: '17.6', //	有机质
            totalNitrogen: '1.12', //	全氮
            availablePhosphorus: '54', //	有效磷
            fastActingPotassium: '62', //	速效钾
            testWeight: '1.3', //	容重
            salt: '0.4', //	盐分
            cec: '', //	CEC
            availableIron: '36.7', //	有效铁
            availableManganese: '5.4', //	有效锰
            effectiveCopper: '1.83', //	有效铜
            availableZinc: '1.67', //	有效锌
            waterSolubleBoron: '0.43', //	水溶态硼
            effectiveMolybdenum: '0.1', //	有效钼
            cadmium: '0.12', //	镉
            hg: '0.02', //	汞
            arsenic: '7', //	砷
            lead: '22', //	铅
            chromium: '59', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.3048',
            longitude: '116.5654',
            code: 'JSE253',
            city: '徐州市',
            county: '沛县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '盐化潮土', // 县亚类名称
            countyName: '碱性土', // 县土属名称
            countySoilTypeName: '瓦碱土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '7.8', // pH
            organicMatter: '19', //	有机质
            totalNitrogen: '1.21', //	全氮
            availablePhosphorus: '19.6', //	有效磷
            fastActingPotassium: '131', //	速效钾
            testWeight: '1.31', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '40.8', //	有效铁
            availableManganese: '13.3', //	有效锰
            effectiveCopper: '2.42', //	有效铜
            availableZinc: '2.49', //	有效锌
            waterSolubleBoron: '0.83', //	水溶态硼
            effectiveMolybdenum: '0.12', //	有效钼
            cadmium: '0.23', //	镉
            hg: '0.06', //	汞
            arsenic: '11', //	砷
            lead: '22.7', //	铅
            chromium: '70', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.4212',
            longitude: '116.5605',
            code: 'JSV254',
            city: '徐州市',
            county: '沛县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '典型潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '两合土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '7.7', // pH
            organicMatter: '33.1', //	有机质
            totalNitrogen: '2.3', //	全氮
            availablePhosphorus: '179.7', //	有效磷
            fastActingPotassium: '241', //	速效钾
            testWeight: '1.28', //	容重
            salt: '0.96', //	盐分
            cec: '13.6', //	CEC
            availableIron: '99.8', //	有效铁
            availableManganese: '7.8', //	有效锰
            effectiveCopper: '10.4', //	有效铜
            availableZinc: '15.6', //	有效锌
            waterSolubleBoron: '0.77', //	水溶态硼
            effectiveMolybdenum: '0.12', //	有效钼
            cadmium: '0.13', //	镉
            hg: '0.13', //	汞
            arsenic: '10', //	砷
            lead: '14.4', //	铅
            chromium: '58', //	铬
            nickel: '', //	镍
            zinc: '16', //	锌
          },
          {
            latitude: '34.3048',
            longitude: '116.5654',
            code: 'JSW255',
            city: '徐州市',
            county: '沛县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '典型潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '砂土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '8.2', // pH
            organicMatter: '18.9', //	有机质
            totalNitrogen: '1.2', //	全氮
            availablePhosphorus: '6.5', //	有效磷
            fastActingPotassium: '209', //	速效钾
            testWeight: '1.29', //	容重
            salt: '0.5', //	盐分
            cec: '10', //	CEC
            availableIron: '6.4', //	有效铁
            availableManganese: '4.7', //	有效锰
            effectiveCopper: '1.13', //	有效铜
            availableZinc: '3.08', //	有效锌
            waterSolubleBoron: '0.24', //	水溶态硼
            effectiveMolybdenum: '0.08', //	有效钼
            cadmium: '0.09', //	镉
            hg: '0.09', //	汞
            arsenic: '8', //	砷
            lead: '12.4', //	铅
            chromium: '45', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.4024',
            longitude: '170.0124',
            code: 'JSW256',
            city: '徐州市',
            county: '沛县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '典型潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '淤土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '8.1', // pH
            organicMatter: '49.5', //	有机质
            totalNitrogen: '3.04', //	全氮
            availablePhosphorus: '86.6', //	有效磷
            fastActingPotassium: '195', //	速效钾
            testWeight: '1.3', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '35', //	有效铁
            availableManganese: '5.1', //	有效锰
            effectiveCopper: '7.71', //	有效铜
            availableZinc: '2', //	有效锌
            waterSolubleBoron: '0.63', //	水溶态硼
            effectiveMolybdenum: '0.1', //	有效钼
            cadmium: '0.28', //	镉
            hg: '0.12', //	汞
            arsenic: '19', //	砷
            lead: '22.5', //	铅
            chromium: '83', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.22517',
            longitude: '117.08313',
            code: 'JSE257',
            city: '徐州市',
            county: '铜山区',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '典型潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '两合土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '7.6', // pH
            organicMatter: '24.32', //	有机质
            totalNitrogen: '1.62', //	全氮
            availablePhosphorus: '22.1', //	有效磷
            fastActingPotassium: '140', //	速效钾
            testWeight: '1.25', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '14.2', //	有效铁
            availableManganese: '10.5', //	有效锰
            effectiveCopper: '9', //	有效铜
            availableZinc: '3.66', //	有效锌
            waterSolubleBoron: '1.05', //	水溶态硼
            effectiveMolybdenum: '0.06', //	有效钼
            cadmium: '0.35', //	镉
            hg: '0.15', //	汞
            arsenic: '8', //	砷
            lead: '18.6', //	铅
            chromium: '50', //	铬
            nickel: '', //	镍
            zinc: '58', //	锌
          },
          {
            latitude: '34.2461',
            longitude: '117.0151',
            code: 'jsf258',
            city: '徐州市',
            county: '沛县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '典型潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '砂土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '8.2', // pH
            organicMatter: '18.9', //	有机质
            totalNitrogen: '1.2', //	全氮
            availablePhosphorus: '6.5', //	有效磷
            fastActingPotassium: '209', //	速效钾
            testWeight: '1.29', //	容重
            salt: '0.5', //	盐分
            cec: '10', //	CEC
            availableIron: '6.4', //	有效铁
            availableManganese: '4.7', //	有效锰
            effectiveCopper: '1.13', //	有效铜
            availableZinc: '3.08', //	有效锌
            waterSolubleBoron: '0.24', //	水溶态硼
            effectiveMolybdenum: '0.08', //	有效钼
            cadmium: '0.09', //	镉
            hg: '0.09', //	汞
            arsenic: '8', //	砷
            lead: '12.4', //	铅
            chromium: '45', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.30128',
            longitude: '117.04472',
            code: 'jsf259',
            city: '徐州市',
            county: '沛县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '典型潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '淤土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '8.1', // pH
            organicMatter: '49.5', //	有机质
            totalNitrogen: '3.04', //	全氮
            availablePhosphorus: '86.6', //	有效磷
            fastActingPotassium: '195', //	速效钾
            testWeight: '1.3', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '35										', //	有效铁
            availableManganese: '5.1', //	有效锰
            effectiveCopper: '7.71', //	有效铜
            availableZinc: '2', //	有效锌
            waterSolubleBoron: '0.63', //	水溶态硼
            effectiveMolybdenum: '0.1', //	有效钼
            cadmium: '0.28', //	镉
            hg: '0.12', //	汞
            arsenic: '19', //	砷
            lead: '22.5', //	铅
            chromium: '83', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.0635',
            longitude: '117.1536',
            code: 'JSV260',
            city: '徐州市',
            county: '铜山区',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '盐化潮土', // 县亚类名称
            countyName: '盐性土', // 县土属名称
            countySoilTypeName: '轻盐性土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '7.8', // pH
            organicMatter: '25.2', //	有机质
            totalNitrogen: '1.55', //	全氮
            availablePhosphorus: '18.2', //	有效磷
            fastActingPotassium: '170', //	速效钾
            testWeight: '1.31', //	容重
            salt: '0.52', //	盐分
            cec: '10', //	CEC
            availableIron: '41.5', //	有效铁
            availableManganese: '29.1', //	有效锰
            effectiveCopper: '10', //	有效铜
            availableZinc: '1.67', //	有效锌
            waterSolubleBoron: '0.7', //	水溶态硼
            effectiveMolybdenum: '0.12', //	有效钼
            cadmium: '0.26', //	镉
            hg: '0.1', //	汞
            arsenic: '9', //	砷
            lead: '13.9', //	铅
            chromium: '41', //	铬
            nickel: '33', //	镍
            zinc: '65', //	锌
          },
          {
            latitude: '34.2131',
            longitude: '117.1247',
            code: 'jsw262',
            city: '徐州市',
            county: '铜山区',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '	典型潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '砂土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '7.5', // pH
            organicMatter: '23.2', //	有机质
            totalNitrogen: '1.21', //	全氮
            availablePhosphorus: '27', //	有效磷
            fastActingPotassium: '203', //	速效钾
            testWeight: '1.27', //	容重
            salt: '0.17', //	盐分
            cec: '9.4', //	CEC
            availableIron: '33.3', //	有效铁
            availableManganese: '8.9', //	有效锰
            effectiveCopper: '2.68', //	有效铜
            availableZinc: '2.3', //	有效锌
            waterSolubleBoron: '0.66', //	水溶态硼
            effectiveMolybdenum: '0.19', //	有效钼
            cadmium: '0.26', //	镉
            hg: '0.08', //	汞
            arsenic: '8', //	砷
            lead: '15.1', //	铅
            chromium: '44', //	铬
            nickel: '36', //	镍
            zinc: '55', //	锌
          },
          {
            latitude: '34.1353',
            longitude: '117.55185',
            code: 'JSF263',
            city: '徐州市',
            county: '邳州市',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '盐化潮土', // 县亚类名称
            countyName: '盐性土', // 县土属名称
            countySoilTypeName: '轻盐性土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '7.8', // pH
            organicMatter: '21.7', //	有机质
            totalNitrogen: '1.34', //	全氮
            availablePhosphorus: '21.7', //	有效磷
            fastActingPotassium: '52', //	速效钾
            testWeight: '1.36', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '80.5', //	有效铁
            availableManganese: '12.5', //	有效锰
            effectiveCopper: '3.74', //	有效铜
            availableZinc: '0.41', //	有效锌
            waterSolubleBoron: '0.94', //	水溶态硼
            effectiveMolybdenum: '0.04', //	有效钼
            cadmium: '0.26', //	镉
            hg: '0.06', //	汞
            arsenic: '11', //	砷
            lead: '24.5', //	铅
            chromium: '70', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.1353',
            longitude: '117.55185',
            code: 'JSF264',
            city: '徐州市',
            county: '邳州市',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '典型潮土', // 县亚类名称
            countyName: '棕潮土', // 县土属名称
            countySoilTypeName: '棕黄土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '7.4', // pH
            organicMatter: '23.6', //	有机质
            totalNitrogen: '1.88', //	全氮
            availablePhosphorus: '30.9', //	有效磷
            fastActingPotassium: '251', //	速效钾
            testWeight: '1.28', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '', //	有效铁
            availableManganese: '54.9', //	有效锰
            effectiveCopper: '1.51', //	有效铜
            availableZinc: '18.8', //	有效锌
            waterSolubleBoron: '0.85', //	水溶态硼
            effectiveMolybdenum: '0.23', //	有效钼
            cadmium: '0.11', //	镉
            hg: '0.2', //	汞
            arsenic: '3', //	砷
            lead: '46', //	铅
            chromium: '48', //	铬
            nickel: '', //	镍
            zinc: '23', //	锌
          },
          {
            latitude: '34.2538',
            longitude: '117.56235',
            code: 'JSE265',
            city: '徐州市',
            county: '邳州市',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '典型潮土', // 县亚类名称
            countyName: '棕潮土', // 县土属名称
            countySoilTypeName: '棕黄土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '7.9', // pH
            organicMatter: '22.8', //	有机质
            totalNitrogen: '2.15', //	全氮
            availablePhosphorus: '32.5', //	有效磷
            fastActingPotassium: '368', //	速效钾
            testWeight: '1.28', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '', //	有效铁
            availableManganese: '22.7', //	有效锰
            effectiveCopper: '1.54', //	有效铜
            availableZinc: '27', //	有效锌
            waterSolubleBoron: '0.79', //	水溶态硼
            effectiveMolybdenum: '0.22', //	有效钼
            cadmium: '0.07', //	镉
            hg: '0.17', //	汞
            arsenic: '4', //	砷
            lead: '36', //	铅
            chromium: '31', //	铬
            nickel: '', //	镍
            zinc: '32', //	锌
          },
          {
            latitude: '34.51101',
            longitude: '117.47145',
            code: 'JSV266',
            city: '徐州市',
            county: '邳州市',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '典型潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '两合土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '7.8', // pH
            organicMatter: '21.2', //	有机质
            totalNitrogen: '1.69', //	全氮
            availablePhosphorus: '26.1', //	有效磷
            fastActingPotassium: '214', //	速效钾
            testWeight: '1.25', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '', //	有效铁
            availableManganese: '10', //	有效锰
            effectiveCopper: '0.75', //	有效铜
            availableZinc: '10', //	有效锌
            waterSolubleBoron: '0.87', //	水溶态硼
            effectiveMolybdenum: '0.2', //	有效钼
            cadmium: '0.07', //	镉
            hg: '0.11', //	汞
            arsenic: '16', //	砷
            lead: '46', //	铅
            chromium: '35', //	铬
            nickel: '', //	镍
            zinc: '15', //	锌
          },
          {
            latitude: '34.26159',
            longitude: '118.7495',
            code: 'JSW267',
            city: '徐州市',
            county: '邳州市',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '典型潮土', // 县亚类名称
            countyName: '棕潮土', // 县土属名称
            countySoilTypeName: '棕砂土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '7.7', // pH
            organicMatter: '19', //	有机质
            totalNitrogen: '1.71', //	全氮
            availablePhosphorus: '55', //	有效磷
            fastActingPotassium: '257', //	速效钾
            testWeight: '1.44', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '', //	有效铁
            availableManganese: '11.4', //	有效锰
            effectiveCopper: '0.56', //	有效铜
            availableZinc: '46.4', //	有效锌
            waterSolubleBoron: '0.67', //	水溶态硼
            effectiveMolybdenum: '0.21', //	有效钼
            cadmium: '0.08', //	镉
            hg: '0.13', //	汞
            arsenic: '6', //	砷
            lead: '59', //	铅
            chromium: '34', //	铬
            nickel: '', //	镍
            zinc: '51', //	锌
          },
          {
            latitude: '34.37456',
            longitude: '117.54377',
            code: 'JSW268',
            city: '徐州市',
            county: '邳州市',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '砂姜黑土', // 县土类名称
            countySubclassName: '砂姜黑土', // 县亚类名称
            countyName: '湖黑土', // 县土属名称
            countySoilTypeName: '湖黑土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '7.4', // pH
            organicMatter: '21', //	有机质
            totalNitrogen: '0.77', //	全氮
            availablePhosphorus: '28.9', //	有效磷
            fastActingPotassium: '304', //	速效钾
            testWeight: '1.23', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '', //	有效铁
            availableManganese: '62.1', //	有效锰
            effectiveCopper: '1.05', //	有效铜
            availableZinc: '44.2', //	有效锌
            waterSolubleBoron: '0.7', //	水溶态硼
            effectiveMolybdenum: '0.23', //	有效钼
            cadmium: '0.06', //	镉
            hg: '0.05', //	汞
            arsenic: '7', //	砷
            lead: '53', //	铅
            chromium: '54', //	铬
            nickel: '', //	镍
            zinc: '49', //	锌
          },
          {
            latitude: '34.25289',
            longitude: '117.34183',
            code: 'JSF279',
            city: '徐州市',
            county: '贾汪区',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '褐土', // 县土类名称
            countySubclassName: '潮褐土', // 县亚类名称
            countyName: '山淤土', // 县土属名称
            countySoilTypeName: '山淤土', // 县土种名称
            monitoringYear: '2021', // 监测年度
            ph: '6.7', // pH
            organicMatter: '29.1', //	有机质
            totalNitrogen: '1.69', //	全氮
            availablePhosphorus: '51.4', //	有效磷
            fastActingPotassium: '201', //	速效钾
            testWeight: '', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '54.8', //	有效铁
            availableManganese: '49.4', //	有效锰
            effectiveCopper: '1.73', //	有效铜
            availableZinc: '0.71', //	有效锌
            waterSolubleBoron: '1.14', //	水溶态硼
            effectiveMolybdenum: '0.19', //	有效钼
            cadmium: '0.16', //	镉
            hg: '0.07', //	汞
            arsenic: '12', //	砷
            lead: '29.5', //	铅
            chromium: '85', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
        ],
      },
      {
        time: '2020',
        data: [
          {
            latitude: '34.30153',
            longitude: '116.38074',
            code: 'JSF248',
            city: '徐州市',
            county: '丰县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '飞泡砂土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '8', // pH
            organicMatter: '15.6', //	有机质
            totalNitrogen: '0.9', //	全氮
            availablePhosphorus: '45.8', //	有效磷
            fastActingPotassium: '115', //	速效钾
            testWeight: '1.28', //	容重
            salt: '0.9', //	盐分
            cec: '10.5', //	CEC
            availableIron: '0', //	有效铁
            availableManganese: '0', //	有效锰
            effectiveCopper: '0', //	有效铜
            availableZinc: '0', //	有效锌
            waterSolubleBoron: '0', //	水溶态硼
            effectiveMolybdenum: '0', //	有效钼
            cadmium: '0', //	镉
            hg: '0', //	汞
            arsenic: '0', //	砷
            lead: '0', //	铅
            chromium: '0', //	铬
            nickel: '0', //	镍
            zinc: '0', //	锌
          },
          {
            latitude: '34.37532',
            longitude: '116.39549',
            code: 'JSF249',
            city: '徐州市',
            county: '丰县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '两合土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '7.8', // pH
            organicMatter: '27.4', //	有机质
            totalNitrogen: '1.76', //	全氮
            availablePhosphorus: '12.4', //	有效磷
            fastActingPotassium: '221', //	速效钾
            testWeight: '1.28', //	容重
            salt: '0', //	盐分
            cec: '0', //	CEC
            availableIron: '0', //	有效铁
            availableManganese: '0', //	有效锰
            effectiveCopper: '0', //	有效铜
            availableZinc: '0', //	有效锌
            waterSolubleBoron: '0', //	水溶态硼
            effectiveMolybdenum: '0', //	有效钼
            cadmium: '0', //	镉
            hg: '0', //	汞
            arsenic: '0', //	砷
            lead: '0', //	铅
            chromium: '0', //	铬
            nickel: '0', //	镍
            zinc: '0', //	锌
          },
          {
            latitude: '34.46182',
            longitude: '116.35294',
            code: 'JSW250',
            city: '徐州市',
            county: '丰县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '两合土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '7.9', // pH
            organicMatter: '19.2', //	有机质
            totalNitrogen: '1.15', //	全氮
            availablePhosphorus: '24.5', //	有效磷
            fastActingPotassium: '99', //	速效钾
            testWeight: '1.29', //	容重
            salt: '0', //	盐分
            cec: '0', //	CEC
            availableIron: '0', //	有效铁
            availableManganese: '0', //	有效锰
            effectiveCopper: '0', //	有效铜
            availableZinc: '0', //	有效锌
            waterSolubleBoron: '0', //	水溶态硼
            effectiveMolybdenum: '0', //	有效钼
            cadmium: '0', //	镉
            hg: '0', //	汞
            arsenic: '0', //	砷
            lead: '0', //	铅
            chromium: '0', //	铬
            nickel: '0', //	镍
            zinc: '0', //	锌
          },
          {
            latitude: '34.39135',
            longitude: '116.41285',
            code: 'JSW251',
            city: '徐州市',
            county: '丰县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '两合土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '8', // pH
            organicMatter: '21.8', //	有机质
            totalNitrogen: '1.01', //	全氮
            availablePhosphorus: '25.6', //	有效磷
            fastActingPotassium: '105', //	速效钾
            testWeight: '1.3', //	容重
            salt: '0', //	盐分
            cec: '0', //	CEC
            availableIron: '0', //	有效铁
            availableManganese: '0', //	有效锰
            effectiveCopper: '0', //	有效铜
            availableZinc: '0', //	有效锌
            waterSolubleBoron: '0', //	水溶态硼
            effectiveMolybdenum: '0', //	有效钼
            cadmium: '0', //	镉
            hg: '0', //	汞
            arsenic: '0', //	砷
            lead: '0', //	铅
            chromium: '0', //	铬
            nickel: '0', //	镍
            zinc: '0', //	锌
          },
          {
            latitude: '34.36403',
            longitude: '116.43148',
            code: 'JSE252',
            city: '徐州市',
            county: '丰县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '砂土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '8', // pH
            organicMatter: '20.1', //	有机质
            totalNitrogen: '1.05', //	全氮
            availablePhosphorus: '25.9', //	有效磷
            fastActingPotassium: '84', //	速效钾
            testWeight: '1.3', //	容重
            salt: '0', //	盐分
            cec: '0', //	CEC
            availableIron: '0', //	有效铁
            availableManganese: '0', //	有效锰
            effectiveCopper: '0', //	有效铜
            availableZinc: '0', //	有效锌
            waterSolubleBoron: '0', //	水溶态硼
            effectiveMolybdenum: '0', //	有效钼
            cadmium: '0', //	镉
            hg: '0', //	汞
            arsenic: '0', //	砷
            lead: '0', //	铅
            chromium: '0', //	铬
            nickel: '0', //	镍
            zinc: '0', //	锌
          },
          {
            latitude: '34.3048',
            longitude: '116.5654',
            code: 'JSE253',
            city: '徐州市',
            county: '沛县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '盐化潮土', // 县亚类名称
            countyName: '碱性土', // 县土属名称
            countySoilTypeName: '瓦碱土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '8.1', // pH
            organicMatter: '23.9', //	有机质
            totalNitrogen: '0.16', //	全氮
            availablePhosphorus: '14.8', //	有效磷
            fastActingPotassium: '302', //	速效钾
            testWeight: '1.31', //	容重
            salt: '0.56', //	盐分
            cec: '11', //	CEC
            availableIron: '30.7', //	有效铁
            availableManganese: '9.1', //	有效锰
            effectiveCopper: '4.4', //	有效铜
            availableZinc: '2.2', //	有效锌
            waterSolubleBoron: '0', //	水溶态硼
            effectiveMolybdenum: '0.15', //	有效钼
            cadmium: '0.29', //	镉
            hg: '0.05', //	汞
            arsenic: '8', //	砷
            lead: '14.3', //	铅
            chromium: '57', //	铬
            nickel: '0', //	镍
            zinc: '	7', //	锌
          },
          {
            latitude: '34.4212',
            longitude: '116.5605',
            code: 'JSV254',
            city: '徐州市',
            county: '沛县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '两合土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '8.1', // pH
            organicMatter: '34.4', //	有机质
            totalNitrogen: '1.62', //	全氮
            availablePhosphorus: '62.6', //	有效磷
            fastActingPotassium: '199', //	速效钾
            testWeight: '1.3', //	容重
            salt: '0.98', //	盐分
            cec: '13.5', //	CEC
            availableIron: '40.1', //	有效铁
            availableManganese: '14', //	有效锰
            effectiveCopper: '3.1', //	有效铜
            availableZinc: '1.2', //	有效锌
            waterSolubleBoron: '0', //	水溶态硼
            effectiveMolybdenum: '0.17', //	有效钼
            cadmium: '0.1', //	镉
            hg: '0.02', //	汞
            arsenic: '7', //	砷
            lead: '11.4', //	铅
            chromium: '45', //	铬
            nickel: '0', //	镍
            zinc: '2', //	锌
          },
          {
            latitude: '34.3048',
            longitude: '116.5654',
            code: 'JSW255',
            city: '徐州市',
            county: '沛县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '砂土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '7.9', // pH
            organicMatter: '27', //	有机质
            totalNitrogen: '1.23', //	全氮
            availablePhosphorus: '34.2', //	有效磷
            fastActingPotassium: '88', //	速效钾
            testWeight: '1.29', //	容重
            salt: '0.47', //	盐分
            cec: '9.9', //	CEC
            availableIron: '15.6', //	有效铁
            availableManganese: '13.5', //	有效锰
            effectiveCopper: '2.1', //	有效铜
            availableZinc: '4.5', //	有效锌
            waterSolubleBoron: '0', //	水溶态硼
            effectiveMolybdenum: '0.17', //	有效钼
            cadmium: '0.18', //	镉
            hg: '0.03', //	汞
            arsenic: '7', //	砷
            lead: '13.8', //	铅
            chromium: '45', //	铬
            nickel: '0', //	镍
            zinc: '2', //	锌
          },
          {
            latitude: '34.4024',
            longitude: '170.0124',
            code: 'JSW256',
            city: '徐州市',
            county: '沛县',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '淤土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '7.7', // pH
            organicMatter: '52.7', //	有机质
            totalNitrogen: '3.6', //	全氮
            availablePhosphorus: '77.8', //	有效磷
            fastActingPotassium: '259', //	速效钾
            testWeight: '1.33', //	容重
            salt: '0.88', //	盐分
            cec: '11', //	CEC
            availableIron: '76', //	有效铁
            availableManganese: '20.1', //	有效锰
            effectiveCopper: '3.2', //	有效铜
            availableZinc: '2.1', //	有效锌
            waterSolubleBoron: '0', //	水溶态硼
            effectiveMolybdenum: '0.16', //	有效钼
            cadmium: '0.11', //	镉
            hg: '0.02', //	汞
            arsenic: '6', //	砷
            lead: '12.8', //	铅
            chromium: '53', //	铬
            nickel: '0', //	镍
            zinc: '2', //	锌
          },
          {
            latitude: '34.22517',
            longitude: '117.08313',
            code: 'JSE257',
            city: '徐州市',
            county: '铜山区',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '两合土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '7.4', // pH
            organicMatter: '23.42', //	有机质
            totalNitrogen: '1.57', //	全氮
            availablePhosphorus: '21.2', //	有效磷
            fastActingPotassium: '144', //	速效钾
            testWeight: '1.28', //	容重
            salt: '0.66', //	盐分
            cec: '13.3', //	CEC
            availableIron: '14.8', //	有效铁
            availableManganese: '10.3', //	有效锰
            effectiveCopper: '10', //	有效铜
            availableZinc: '3.88', //	有效锌
            waterSolubleBoron: '1.02', //	水溶态硼
            effectiveMolybdenum: '0.07', //	有效钼
            cadmium: '0.38', //	镉
            hg: '0.11', //	汞
            arsenic: '9', //	砷
            lead: '18.6', //	铅
            chromium: '51', //	铬
            nickel: '41', //	镍
            zinc: '58', //	锌
          },
          {
            latitude: '34.2461',
            longitude: '117.0151',
            code: 'JSf258',
            city: '徐州市',
            county: '铜山区',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '淤土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '6.9', // pH
            organicMatter: '26.56', //	有机质
            totalNitrogen: '1.72', //	全氮
            availablePhosphorus: '21', //	有效磷
            fastActingPotassium: '150', //	速效钾
            testWeight: '1.32', //	容重
            salt: '0.56', //	盐分
            cec: '17', //	CEC
            availableIron: '80.7', //	有效铁
            availableManganese: '32.3', //	有效锰
            effectiveCopper: '10', //	有效铜
            availableZinc: '4.81', //	有效锌
            waterSolubleBoron: '0.98', //	水溶态硼
            effectiveMolybdenum: '0.08', //	有效钼
            cadmium: '0.36', //	镉
            hg: '0.13', //	汞
            arsenic: '15', //	砷
            lead: '27.5', //	铅
            chromium: '60', //	铬
            nickel: '36', //	镍
            zinc: '79', //	锌
          },
          {
            latitude: '34.30128',
            longitude: '117.04472',
            code: 'JSf259',
            city: '徐州市',
            county: '铜山区',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '两合土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '8.1', // pH
            organicMatter: '25.89', //	有机质
            totalNitrogen: '1.79', //	全氮
            availablePhosphorus: '15.4', //	有效磷
            fastActingPotassium: '167', //	速效钾
            testWeight: '1.38', //	容重
            salt: '0.4', //	盐分
            cec: '15.1', //	CEC
            availableIron: '70.6', //	有效铁
            availableManganese: '42.4', //	有效锰
            effectiveCopper: '10', //	有效铜
            availableZinc: '5', //	有效锌
            waterSolubleBoron: '0.49', //	水溶态硼
            effectiveMolybdenum: '0.19', //	有效钼
            cadmium: '0.31', //	镉
            hg: '0.09', //	汞
            arsenic: '8', //	砷
            lead: '18.9', //	铅
            chromium: '43', //	铬
            nickel: '37', //	镍
            zinc: '71', //	锌
          },
          {
            latitude: '34.0635',
            longitude: '117.1536',
            code: 'JSV260',
            city: '徐州市',
            county: '铜山区',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '盐化潮土', // 县亚类名称
            countyName: '盐性土', // 县土属名称
            countySoilTypeName: '轻盐性土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '8', // pH
            organicMatter: '25.13', //	有机质
            totalNitrogen: '1.53', //	全氮
            availablePhosphorus: '18.7', //	有效磷
            fastActingPotassium: '175', //	速效钾
            testWeight: '1.31', //	容重
            salt: '0.52', //	盐分
            cec: '10', //	CEC
            availableIron: '41.6', //	有效铁
            availableManganese: '29.1', //	有效锰
            effectiveCopper: '10', //	有效铜
            availableZinc: '1.67', //	有效锌
            waterSolubleBoron: '0.7', //	水溶态硼
            effectiveMolybdenum: '0.12', //	有效钼
            cadmium: '0.26', //	镉
            hg: '0.1', //	汞
            arsenic: '9', //	砷
            lead: '13.9', //	铅
            chromium: '41', //	铬
            nickel: '33	65', //	锌
          },
          {
            latitude: '34.2131',
            longitude: '117.1247',
            code: 'JSw262',
            city: '徐州市',
            county: '铜山区',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '砂土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '8', // pH
            organicMatter: '19.7', //	有机质
            totalNitrogen: '1.23', //	全氮
            availablePhosphorus: '19.3', //	有效磷
            fastActingPotassium: '97', //	速效钾
            testWeight: '1.27', //	容重
            salt: '0.17', //	盐分
            cec: '9.4', //	CEC
            availableIron: '56.1', //	有效铁
            availableManganese: '28.1', //	有效锰
            effectiveCopper: '6.8', //	有效铜
            availableZinc: '4.55', //	有效锌
            waterSolubleBoron: '0.66', //	水溶态硼
            effectiveMolybdenum: '0.19', //	有效钼
            cadmium: '0.26', //	镉
            hg: '0.08', //	汞
            arsenic: '8', //	砷
            lead: '15.1', //	铅
            chromium: '44', //	铬
            nickel: '36	55', //	锌
          },
          {
            latitude: '34.1353',
            longitude: '117.55185',
            code: 'JSF263',
            city: '徐州市',
            county: '邳州市',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '盐化潮土', // 县亚类名称
            countyName: '盐性土', // 县土属名称
            countySoilTypeName: '轻盐性土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '8.2', // pH
            organicMatter: '30.6', //	有机质
            totalNitrogen: '2.47', //	全氮
            availablePhosphorus: '35.6', //	有效磷
            fastActingPotassium: '196', //	速效钾
            testWeight: '1.36', //	容重
            salt: '0', //	盐分
            cec: '0', //	CEC
            availableIron: '10.6', //	有效铁
            availableManganese: '19.3', //	有效锰
            effectiveCopper: '1.61', //	有效铜
            availableZinc: '0.77', //	有效锌
            waterSolubleBoron: '0.11', //	水溶态硼
            effectiveMolybdenum: '0', //	有效钼
            cadmium: '0', //	镉
            hg: '0', //	汞
            arsenic: '0', //	砷
            lead: '0', //	铅
            chromium: '0', //	铬
            nickel: '0', //	镍
            zinc: '0', //	锌
          },
          {
            latitude: '34.1353',
            longitude: '117.55185',
            code: 'JSF264',
            city: '徐州市',
            county: '邳州市',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '潮土', // 县亚类名称
            countyName: '棕潮土', // 县土属名称
            countySoilTypeName: '棕黄土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '7.7', // pH
            organicMatter: '38.3', //	有机质
            totalNitrogen: '0.24', //	全氮
            availablePhosphorus: '54.5', //	有效磷
            fastActingPotassium: '335', //	速效钾
            testWeight: '1.28', //	容重
            salt: '0', //	盐分
            cec: '0', //	CEC
            availableIron: '38.9', //	有效铁
            availableManganese: '58.7', //	有效锰
            effectiveCopper: '1.87', //	有效铜
            availableZinc: '2.39', //	有效锌
            waterSolubleBoron: '0.56', //	水溶态硼
            effectiveMolybdenum: '0', //	有效钼
            cadmium: '0', //	镉
            hg: '0', //	汞
            arsenic: '0', //	砷
            lead: '0', //	铅
            chromium: '0', //	铬
            nickel: '0', //	镍
            zinc: '0', //	锌
          },
          {
            latitude: '34.2538',
            longitude: '117.56235',
            code: 'JSE265',
            city: '徐州市',
            county: '邳州市',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '潮土', // 县亚类名称
            countyName: '棕潮土', // 县土属名称
            countySoilTypeName: '棕黄土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '5', // pH
            organicMatter: '26.1', //	有机质
            totalNitrogen: '0.16', //	全氮
            availablePhosphorus: '56.4', //	有效磷
            fastActingPotassium: '143', //	速效钾
            testWeight: '0', //	容重
            salt: '0', //	盐分
            cec: '0', //	CEC
            availableIron: '19', //	有效铁
            availableManganese: '29.4', //	有效锰
            effectiveCopper: '2.12', //	有效铜
            availableZinc: '3.8', //	有效锌
            waterSolubleBoron: '0.55', //	水溶态硼
            effectiveMolybdenum: '0', //	有效钼
            cadmium: '0', //	镉
            hg: '0', //	汞
            arsenic: '0', //	砷
            lead: '0', //	铅
            chromium: '0', //	铬
            nickel: '0', //	镍
            zinc: '0', //	锌
          },
          {
            latitude: '34.51101',
            longitude: '117.47145',
            code: 'JSV266',
            city: '徐州市',
            county: '邳州市',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '潮土', // 县亚类名称
            countyName: '黄潮土', // 县土属名称
            countySoilTypeName: '两合土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '6.5', // pH
            organicMatter: '17.3', //	有机质
            totalNitrogen: '0.07', //	全氮
            availablePhosphorus: '67', //	有效磷
            fastActingPotassium: '132', //	速效钾
            testWeight: '0', //	容重
            salt: '0', //	盐分
            cec: '0', //	CEC
            availableIron: '71.3', //	有效铁
            availableManganese: '20.7', //	有效锰
            effectiveCopper: '2.13', //	有效铜
            availableZinc: '1.94', //	有效锌
            waterSolubleBoron: '0.17', //	水溶态硼
            effectiveMolybdenum: '0', //	有效钼
            cadmium: '0', //	镉
            hg: '0', //	汞
            arsenic: '0', //	砷
            lead: '0', //	铅
            chromium: '0', //	铬
            nickel: '0', //	镍
            zinc: '0', //	锌
          },
          {
            latitude: '34.26159',
            longitude: '118.7495',
            code: 'JSW267',
            city: '徐州市',
            county: '邳州市',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '潮土', // 县土类名称
            countySubclassName: '潮土', // 县亚类名称
            countyName: '棕潮土', // 县土属名称
            countySoilTypeName: '棕砂土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '6.5', // pH
            organicMatter: '17.3', //	有机质
            totalNitrogen: '0.07', //	全氮
            availablePhosphorus: '67', //	有效磷
            fastActingPotassium: '132', //	速效钾
            testWeight: '1.44', //	容重
            salt: '0', //	盐分
            cec: '0', //	CEC
            availableIron: '94.3', //	有效铁
            availableManganese: '39.6', //	有效锰
            effectiveCopper: '2.43', //	有效铜
            availableZinc: '1.89', //	有效锌
            waterSolubleBoron: '0.33', //	水溶态硼
            effectiveMolybdenum: '0', //	有效钼
            cadmium: '0', //	镉
            hg: '0', //	汞
            arsenic: '0', //	砷
            lead: '0', //	铅
            chromium: '0', //	铬
            nickel: '0', //	镍
            zinc: '0', //	锌
          },
          {
            latitude: '34.37456',
            longitude: '117.54377',
            code: 'JSW268',
            city: '徐州市',
            county: '邳州市',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '砂姜黑土', // 县土类名称
            countySubclassName: '砂姜黑土', // 县亚类名称
            countyName: '湖黑土', // 县土属名称
            countySoilTypeName: '湖黑土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '5', // pH
            organicMatter: '28.1', //	有机质
            totalNitrogen: '0.17', //	全氮
            availablePhosphorus: '71', //	有效磷
            fastActingPotassium: '350', //	速效钾
            testWeight: '0', //	容重
            salt: '0', //	盐分
            cec: '0', //	CEC
            availableIron: '85.2', //	有效铁
            availableManganese: '151', //	有效锰
            effectiveCopper: '2.44', //	有效铜
            availableZinc: '1.63', //	有效锌
            waterSolubleBoron: '0.48', //	水溶态硼
            effectiveMolybdenum: '0', //	有效钼
            cadmium: '0', //	镉
            hg: '0', //	汞
            arsenic: '0', //	砷
            lead: '0', //	铅
            chromium: '0', //	铬
            nickel: '0', //	镍
            zinc: '0', //	锌
          },
          {
            latitude: '34.25289',
            longitude: '117.34183',
            code: 'JSF279',
            city: '徐州市',
            county: '贾汪区',
            agriculturalArea: '徐淮农区',
            countySoilClassName: '褐土', // 县土类名称
            countySubclassName: '潮褐土', // 县亚类名称
            countyName: '山淤土', // 县土属名称
            countySoilTypeName: '山淤土', // 县土种名称
            monitoringYear: '2020	', // 监测年度
            ph: '7.3', // pH
            organicMatter: '36.4', //	有机质
            totalNitrogen: '2.16', //	全氮
            availablePhosphorus: '48.2', //	有效磷
            fastActingPotassium: '350', //	速效钾
            testWeight: '0', //	容重
            salt: '0', //	盐分
            cec: '0', //	CEC
            availableIron: '0', //	有效铁
            availableManganese: '0', //	有效锰
            effectiveCopper: '0', //	有效铜
            availableZinc: '0', //	有效锌
            waterSolubleBoron: '0', //	水溶态硼
            effectiveMolybdenum: '0', //	有效钼
            cadmium: '0', //	镉
            hg: '0', //	汞
            arsenic: '0', //	砷
            lead: '0', //	铅
            chromium: '0', //	铬
            nickel: '0', //	镍
            zinc: '0', //	锌
          },
        ],
      },
    ];
    this.lonLatData = this.mapData[0].data;
    this.getHandleData(this.mapData[0].data[0]);
    this.cacheData = this.mapData[0].data[0];
  },
  methods: {
    tabHandle(value) {
      console.log(value);
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

      console.log(xData, sdata);
      this.baseOption.legend.data = [this.tabPosition];
      this.baseOption.xAxis.data = xData;
      this.baseOption.series[0].name = this.tabPosition;
      this.baseOption.series[0].data = sdata;
      this.$refs.baseChart.refresh(this.baseOption);
    },
  },
};
</script>
