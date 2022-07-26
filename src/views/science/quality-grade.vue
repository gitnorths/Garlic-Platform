<template>
  <div class="gp-bg gp-qualityGrade">
    <QualityGradeMaps :lonLatData="lonLatData" @ok="getName" />
    <div class="gp-qualityGrade__img">
      <el-image :src="url" :preview-src-list="srcList">
        <div slot="error" class="image-slot">
          <i class="el-icon-loading"></i>
        </div>
      </el-image>
      <p>数据提供单位：江苏省耕地质量与农业环境保护站</p>
    </div>
    <div class="gp-right gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title">
          <span>{{ title }}</span>
        </div>
        <div class="gp-box">
          <ul class="gp-list" v-infinite-scroll="load" style="overflow: auto">
            <template v-for="items in list">
              <li v-for="(item, index) in items.data" :key="index" class="gp-list__item">
                <b>{{ index + 1 }}</b>
                <p>{{ item.name }}</p>
                <span>{{ item.value }} {{ items.unit }}</span>
                <span>{{ parseFloat((item.value / items.sum) * 100).toFixed(2) }}%</span>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <el-dialog
      title="耕地等级面积及耕地面积占比"
      :modal="false"
      custom-class="dialog_qg"
      :visible.sync="dialogEchartsVisible"
    >
      <div class="gp-group">
        <p>{{ title2 }}</p>
      </div>
      <Base-Chart ref="baseCharts" :chart-id="baseId" :option="chartOption" />
    </el-dialog>
  </div>
</template>

<script>
import QualityGradeMaps from './components/quality-grade-maps';
import BaseChart from '@/components/echarts/baseChart';
import { xuZhou } from '@/enums/cityData';

export default {
  name: 'QualityGrade',
  components: {
    BaseChart,
    QualityGradeMaps,
  },
  data() {
    return {
      dialogEchartsVisible: false,
      mapData: [], // 地图数据
      lonLatData: [], // 坐标数据
      title: null,
      title2: null,
      list: null,
      url: '',
      srcList: [],
      baseId: 'baseCharts',
      chartOption: {
        grid: {
          top: '45',
          left: '10',
          right: '10',
          bottom: '10',
          containLabel: true,
        },
        legend: {
          top: '10',
          itemGap: 10,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            color: '#FFFFFF',
            fontFamily: 'PangMenZhengDao',
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
    };
  },
  mounted() {
    this.list = xuZhou[0];
    this.title = xuZhou[0][0].name + '' + xuZhou[0][0].year;

    setTimeout(() => {
      this.lonLatData = [
        {
          name: '沛县',
          position: [116.727222, 34.888222],
          src: require('../../assets/images/science/zldj/px.png'),
        },
        {
          name: '丰县',
          position: [116.658111, 34.697232],
          src: require('../../assets/images/science/zldj/fx.png'),
        },
        {
          name: '铜山区',
          position: [117.169698, 34.181162],
          src: require('../../assets/images/science/zldj/tsq.png'),
        },
        {
          name: '邳州市',
          position: [118.012511, 34.339208],
          src: require('../../assets/images/science/zldj/pzs.png'),
        },
        {
          name: '贾汪区',
          position: [117.452222, 34.441222],
          src: require('../../assets/images/science/zldj/jwq.png'),
        },
      ];
    }, 3000);
  },
  methods: {
    load() {},
    getName(name) {
      let that = this;

      for (let i = 0; i < this.lonLatData.length; i++) {
        const element = this.lonLatData[i];
        if (name === element.name) {
          this.url = element.src;
          this.srcList = [element.src];
        }
      }

      for (let index = 0; index < xuZhou.length; index++) {
        const element = xuZhou[index];
        if (name === element[0].name) {
          this.list = element;
          this.title = element[0].name + '' + element[0].year + '年耕地质量等级图集';
          this.title2 = element[0].year + '年' + element[0].name;
          this.dialogEchartsVisible = true;

          // let resColors = ['#4D81E7', '#00FFCF', '#1AE1E5', '#FFB95B', '#FF7160'];

          // that.chartOption.legend.data = element[0].data.map((item) => item.name);
          that.chartOption.series = [
            {
              name: '耕地质量等级图集',
              type: 'pie',
              radius: '50%',
              center: ['50%', '55%'],
              label: {
                color: '#FFFFFF',
                fontFamily: 'PangMenZhengDao',
                rich: {
                  rich_blue: {
                    color: '#4D88FE',
                  },
                  rich_orange: {
                    color: '#FFBF3C',
                  },
                  rich_green: {
                    color: '#50CCCB',
                  },
                },
                formatter: function (params) {
                  return params.name + ' ' + params.value + ' 亩 ' + `{rich_orange|${params.percent}%}`;
                },
              },
              labelLine: {
                length: 10,
                length2: 60,
              },
              // color: resColors,
              // itemStyle: {
              //   color: function (params) {
              //     return resColors[params.dataIndex];
              //   },
              // },
              data: element[0].data,
            },
          ];
          that.$refs.baseCharts.refresh(that.chartOption);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.gp-qualityGrade {
  &__img {
    position: absolute;
    left: 0;
    bottom: 35px;
    flex: 1;
    padding-left: 20px;

    .el-image {
      width: 200px;
      cursor: pointer;
    }

    p {
      padding: 10px 0;
      color: #73afff;
      font-size: 16px;
      text-align: right;
    }
  }

  .gp-right {
    width: 420px;
    bottom: 0;
    padding-bottom: 40px;
  }
}
</style>
