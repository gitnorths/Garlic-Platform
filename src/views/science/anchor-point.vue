<template>
  <div class="gp-bg gp-science">
    <AnchorPointMaps :mapData="mapData" :lonLatData="lonLatData" />
    <div class="gp-right gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1 gp-mb15">
        <div class="gp-title"><span>测土配方施肥长期定位点监测</span></div>
        <div class="gp-box gp-p20 gp-flex gp-flex-direction-column">
          <div class="gp-flex gp-flex-direction-column gp-flex1">
            <div class="gp-title"><span>历年数据</span></div>
            <div class="gp-group">
              <span>pH1</span>
              <el-radio-group size="mini" v-model="tabPosition">
                <el-radio-button label="pH1">pH1</el-radio-button>
                <el-radio-button label="有机质1">有机质1</el-radio-button>
                <el-radio-button label="全氮1">全氮1</el-radio-button>
                <el-radio-button label="有效磷1">有效磷1</el-radio-button>
                <el-radio-button label="速效钾1">速效钾1</el-radio-button>
                <el-radio-button label="容重1">容重1</el-radio-button>
                <el-radio-button label="盐分1">盐分1</el-radio-button>
                <el-radio-button label="CEC1">CEC1</el-radio-button>
                <el-radio-button label="有效铁1">有效铁1</el-radio-button>
                <el-radio-button label="有效锰1">有效锰1</el-radio-button>
                <el-radio-button label="有效铜1">有效铜1</el-radio-button>
                <el-radio-button label="有效锌1">有效锌1</el-radio-button>
                <el-radio-button label="水溶态硼1">水溶态硼1</el-radio-button>
                <el-radio-button label="有效钼1">有效钼1</el-radio-button>
                <el-radio-button label="镉1">镉1</el-radio-button>
                <el-radio-button label="汞1">汞1</el-radio-button>
                <el-radio-button label="砷1">砷1</el-radio-button>
                <el-radio-button label="铅1">铅1</el-radio-button>
                <el-radio-button label="铬1">铬1</el-radio-button>
                <el-radio-button label="镍1">镍1</el-radio-button>
                <el-radio-button label="锌1">锌1</el-radio-button>
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
      mapData: [], // 地图数据
      lonLatData: [], // 坐标数据
      tabPosition: 'pH1',
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
    this.lonLatData = [
      {
        latitude: '34.30153',
        longitude: '116.38074',
        code: 'JST248',
      },
      {
        latitude: '34.37532',
        longitude: '116.39549',
        code: 'JST249',
      },
      {
        latitude: '34.46182',
        longitude: '116.35294',
        code: 'JSW250',
      },
      {
        latitude: '34.39135',
        longitude: '116.41285',
        code: 'JSW251',
      },
      {
        latitude: '34.36403',
        longitude: '116.43148',
        code: 'JSE252',
      },
      {
        latitude: '34.3048',
        longitude: '116.5654',
        code: 'JSE253',
      },
      {
        latitude: '34.4212',
        longitude: '116.5605',
        code: 'JSV254',
      },
      {
        latitude: '34.3048',
        longitude: '116.5654',
        code: 'JSW255',
      },
      {
        latitude: '34.4024',
        longitude: '170.0124',
        code: 'JSW256',
      },
      {
        latitude: '34.22517',
        longitude: '117.08313',
        code: 'JSE257',
      },
      {
        latitude: '34.2461',
        longitude: '117.0151',
        code: 'jsf258',
      },
      {
        latitude: '34.30128',
        longitude: '117.04472',
        code: 'jsf259',
      },
      {
        latitude: '34.0635',
        longitude: '117.1536',
        code: 'JSV260',
      },
      {
        latitude: '34.2131',
        longitude: '117.1247',
        code: 'jsw262',
      },
      {
        latitude: '34.1353',
        longitude: '117.55185',
        code: 'JSF263',
      },
      {
        latitude: '34.1353',
        longitude: '117.55185',
        code: 'JSF264',
      },
      {
        latitude: '34.2538',
        longitude: '117.56235',
        code: 'JSE265',
      },
      {
        latitude: '34.51101',
        longitude: '117.47145',
        code: 'JSV266',
      },
      {
        latitude: '34.26159',
        longitude: '118.7495',
        code: 'JSW267',
      },
      {
        latitude: '34.37456',
        longitude: '117.54377',
        code: 'JSW268',
      },
      {
        latitude: '34.25289',
        longitude: '117.34183',
        code: 'JSF279',
      },
    ];
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
            county: '',
            agriculturalArea: '',
            countySoilClassName: '', // 县土类名称
            countySubclassName: '', // 县亚类名称
            countyName: '', // 县土属名称
            countySoilTypeName: '', // 县土种名称
            monitoringYear: '', // 监测年度
            ph: '', // pH
            organicMatter: '', //	有机质
            totalNitrogen: '', //	全氮
            availablePhosphorus: '', //	有效磷
            fastActingPotassium: '', //	速效钾
            testWeight: '', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '', //	有效铁
            availableManganese: '', //	有效锰
            effectiveCopper: '', //	有效铜
            availableZinc: '', //	有效锌
            waterSolubleBoron: '', //	水溶态硼
            effectiveMolybdenum: '', //	有效钼
            cadmium: '', //	镉
            hg: '', //	汞
            arsenic: '', //	砷
            lead: '', //	铅
            chromium: '', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.0635',
            longitude: '117.1536',
            code: 'JSV260',
            city: '徐州市',
            county: '',
            agriculturalArea: '',
            countySoilClassName: '', // 县土类名称
            countySubclassName: '', // 县亚类名称
            countyName: '', // 县土属名称
            countySoilTypeName: '', // 县土种名称
            monitoringYear: '', // 监测年度
            ph: '', // pH
            organicMatter: '', //	有机质
            totalNitrogen: '', //	全氮
            availablePhosphorus: '', //	有效磷
            fastActingPotassium: '', //	速效钾
            testWeight: '', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '', //	有效铁
            availableManganese: '', //	有效锰
            effectiveCopper: '', //	有效铜
            availableZinc: '', //	有效锌
            waterSolubleBoron: '', //	水溶态硼
            effectiveMolybdenum: '', //	有效钼
            cadmium: '', //	镉
            hg: '', //	汞
            arsenic: '', //	砷
            lead: '', //	铅
            chromium: '', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.2131',
            longitude: '117.1247',
            code: 'jsw262',
            city: '徐州市',
            county: '',
            agriculturalArea: '',
            countySoilClassName: '', // 县土类名称
            countySubclassName: '', // 县亚类名称
            countyName: '', // 县土属名称
            countySoilTypeName: '', // 县土种名称
            monitoringYear: '', // 监测年度
            ph: '', // pH
            organicMatter: '', //	有机质
            totalNitrogen: '', //	全氮
            availablePhosphorus: '', //	有效磷
            fastActingPotassium: '', //	速效钾
            testWeight: '', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '', //	有效铁
            availableManganese: '', //	有效锰
            effectiveCopper: '', //	有效铜
            availableZinc: '', //	有效锌
            waterSolubleBoron: '', //	水溶态硼
            effectiveMolybdenum: '', //	有效钼
            cadmium: '', //	镉
            hg: '', //	汞
            arsenic: '', //	砷
            lead: '', //	铅
            chromium: '', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.1353',
            longitude: '117.55185',
            code: 'JSF263',
            city: '徐州市',
            county: '',
            agriculturalArea: '',
            countySoilClassName: '', // 县土类名称
            countySubclassName: '', // 县亚类名称
            countyName: '', // 县土属名称
            countySoilTypeName: '', // 县土种名称
            monitoringYear: '', // 监测年度
            ph: '', // pH
            organicMatter: '', //	有机质
            totalNitrogen: '', //	全氮
            availablePhosphorus: '', //	有效磷
            fastActingPotassium: '', //	速效钾
            testWeight: '', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '', //	有效铁
            availableManganese: '', //	有效锰
            effectiveCopper: '', //	有效铜
            availableZinc: '', //	有效锌
            waterSolubleBoron: '', //	水溶态硼
            effectiveMolybdenum: '', //	有效钼
            cadmium: '', //	镉
            hg: '', //	汞
            arsenic: '', //	砷
            lead: '', //	铅
            chromium: '', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.1353',
            longitude: '117.55185',
            code: 'JSF264',
            city: '徐州市',
            county: '',
            agriculturalArea: '',
            countySoilClassName: '', // 县土类名称
            countySubclassName: '', // 县亚类名称
            countyName: '', // 县土属名称
            countySoilTypeName: '', // 县土种名称
            monitoringYear: '', // 监测年度
            ph: '', // pH
            organicMatter: '', //	有机质
            totalNitrogen: '', //	全氮
            availablePhosphorus: '', //	有效磷
            fastActingPotassium: '', //	速效钾
            testWeight: '', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '', //	有效铁
            availableManganese: '', //	有效锰
            effectiveCopper: '', //	有效铜
            availableZinc: '', //	有效锌
            waterSolubleBoron: '', //	水溶态硼
            effectiveMolybdenum: '', //	有效钼
            cadmium: '', //	镉
            hg: '', //	汞
            arsenic: '', //	砷
            lead: '', //	铅
            chromium: '', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.2538',
            longitude: '117.56235',
            code: 'JSE265',
            city: '徐州市',
            county: '',
            agriculturalArea: '',
            countySoilClassName: '', // 县土类名称
            countySubclassName: '', // 县亚类名称
            countyName: '', // 县土属名称
            countySoilTypeName: '', // 县土种名称
            monitoringYear: '', // 监测年度
            ph: '', // pH
            organicMatter: '', //	有机质
            totalNitrogen: '', //	全氮
            availablePhosphorus: '', //	有效磷
            fastActingPotassium: '', //	速效钾
            testWeight: '', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '', //	有效铁
            availableManganese: '', //	有效锰
            effectiveCopper: '', //	有效铜
            availableZinc: '', //	有效锌
            waterSolubleBoron: '', //	水溶态硼
            effectiveMolybdenum: '', //	有效钼
            cadmium: '', //	镉
            hg: '', //	汞
            arsenic: '', //	砷
            lead: '', //	铅
            chromium: '', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.51101',
            longitude: '117.47145',
            code: 'JSV266',
            city: '徐州市',
            county: '',
            agriculturalArea: '',
            countySoilClassName: '', // 县土类名称
            countySubclassName: '', // 县亚类名称
            countyName: '', // 县土属名称
            countySoilTypeName: '', // 县土种名称
            monitoringYear: '', // 监测年度
            ph: '', // pH
            organicMatter: '', //	有机质
            totalNitrogen: '', //	全氮
            availablePhosphorus: '', //	有效磷
            fastActingPotassium: '', //	速效钾
            testWeight: '', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '', //	有效铁
            availableManganese: '', //	有效锰
            effectiveCopper: '', //	有效铜
            availableZinc: '', //	有效锌
            waterSolubleBoron: '', //	水溶态硼
            effectiveMolybdenum: '', //	有效钼
            cadmium: '', //	镉
            hg: '', //	汞
            arsenic: '', //	砷
            lead: '', //	铅
            chromium: '', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.26159',
            longitude: '118.7495',
            code: 'JSW267',
            city: '徐州市',
            county: '',
            agriculturalArea: '',
            countySoilClassName: '', // 县土类名称
            countySubclassName: '', // 县亚类名称
            countyName: '', // 县土属名称
            countySoilTypeName: '', // 县土种名称
            monitoringYear: '', // 监测年度
            ph: '', // pH
            organicMatter: '', //	有机质
            totalNitrogen: '', //	全氮
            availablePhosphorus: '', //	有效磷
            fastActingPotassium: '', //	速效钾
            testWeight: '', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '', //	有效铁
            availableManganese: '', //	有效锰
            effectiveCopper: '', //	有效铜
            availableZinc: '', //	有效锌
            waterSolubleBoron: '', //	水溶态硼
            effectiveMolybdenum: '', //	有效钼
            cadmium: '', //	镉
            hg: '', //	汞
            arsenic: '', //	砷
            lead: '', //	铅
            chromium: '', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.37456',
            longitude: '117.54377',
            code: 'JSW268',
            city: '徐州市',
            county: '',
            agriculturalArea: '',
            countySoilClassName: '', // 县土类名称
            countySubclassName: '', // 县亚类名称
            countyName: '', // 县土属名称
            countySoilTypeName: '', // 县土种名称
            monitoringYear: '', // 监测年度
            ph: '', // pH
            organicMatter: '', //	有机质
            totalNitrogen: '', //	全氮
            availablePhosphorus: '', //	有效磷
            fastActingPotassium: '', //	速效钾
            testWeight: '', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '', //	有效铁
            availableManganese: '', //	有效锰
            effectiveCopper: '', //	有效铜
            availableZinc: '', //	有效锌
            waterSolubleBoron: '', //	水溶态硼
            effectiveMolybdenum: '', //	有效钼
            cadmium: '', //	镉
            hg: '', //	汞
            arsenic: '', //	砷
            lead: '', //	铅
            chromium: '', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
          {
            latitude: '34.25289',
            longitude: '117.34183',
            code: 'JSF279',
            city: '徐州市',
            county: '',
            agriculturalArea: '',
            countySoilClassName: '', // 县土类名称
            countySubclassName: '', // 县亚类名称
            countyName: '', // 县土属名称
            countySoilTypeName: '', // 县土种名称
            monitoringYear: '', // 监测年度
            ph: '', // pH
            organicMatter: '', //	有机质
            totalNitrogen: '', //	全氮
            availablePhosphorus: '', //	有效磷
            fastActingPotassium: '', //	速效钾
            testWeight: '', //	容重
            salt: '', //	盐分
            cec: '', //	CEC
            availableIron: '', //	有效铁
            availableManganese: '', //	有效锰
            effectiveCopper: '', //	有效铜
            availableZinc: '', //	有效锌
            waterSolubleBoron: '', //	水溶态硼
            effectiveMolybdenum: '', //	有效钼
            cadmium: '', //	镉
            hg: '', //	汞
            arsenic: '', //	砷
            lead: '', //	铅
            chromium: '', //	铬
            nickel: '', //	镍
            zinc: '', //	锌
          },
        ],
      },
    ];
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
