<template>
  <div class="gp-bg gp-industry">
    <div class="gp-anchor">
      <el-select v-model="distribution" clearable placeholder="分布" @change="distributionChange">
        <el-option v-for="item in distributionOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="userTypes" @change="getUserTypes">
        <el-option v-for="item in userTypesOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <FarmersMaps :mapData="mapData" :lonLatData="lonLatData" />
    <div class="gp-right gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1 gp-mb15">
        <div class="gp-title"><span>农户数据详情</span></div>
        <div class="gp-box height">
          <Base-Chart ref="baseChart" :chart-id="baseId" :option="baseOption" />
        </div>
      </div>
      <div class="gp-flex gp-flex-direction-column gp-flex2 gp-mb15">
        <div class="gp-box gp-table">
          <el-table :data="tableData" :height="height">
            <el-table-column prop="nickname" label="昵称" align="center" show-overflow-tooltip width="120">
            </el-table-column>
            <el-table-column prop="typeName" label="用户类型" align="center" show-overflow-tooltip width="100">
            </el-table-column>
            <!-- <el-table-column prop="varieties" label="单位名称" align="center" show-overflow-tooltip width="120">
            </el-table-column> -->
            <el-table-column prop="area" label="种植面积" align="center" show-overflow-tooltip width="100">
            </el-table-column>
            <el-table-column prop="fullAddress" label="地址" align="center" show-overflow-tooltip> </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import qs from 'qs';
import FarmersMaps from './components/farmers-maps';
import BaseChart from '@/components/echarts/baseChart';
import { sumBy } from 'lodash';

export default {
  name: 'BasicInformation',
  components: {
    FarmersMaps,
    BaseChart,
  },
  data() {
    return {
      mapData: [], // 地图数据
      lonLatData: [], // 坐标数据
      distribution: null, // 分布
      distributionOptions: [
        {
          value: '320000',
          label: '全省',
        },
        {
          value: '320382000000',
          label: '邳州',
        },
        {
          value: '320321000000',
          label: '丰县',
        },
        {
          value: '320322000000',
          label: '沛县',
        },
        {
          value: '320305000000',
          label: '贾汪',
        },
        {
          value: '320312000000',
          label: '铜山',
        },
        {
          value: '320924000000',
          label: '射阳',
        },
        {
          value: '320904000000',
          label: '大丰',
        },
      ],
      userTypes: '4', // 类型
      userTypesOptions: [
        {
          value: '4',
          label: '基地',
        },
        {
          value: '5',
          label: '企业',
        },
        {
          value: '8',
          label: '农场',
        },
      ],
      baseId: 'baseChart',
      baseOption: {
        title: {
          text: '0亩',
          left: '31%',
          y: '42%',
          textAlign: 'center',
          textStyle: {
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: '24px',
          },
          subtext: '0户',
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
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(50, 123, 222, 0.9)', // 背景
          borderWidth: 0,
          textStyle: {
            color: '#FFFFFF',
          },
          formatter: '{d}%',
        },
      },
      height: '42vh',
      tableData: [],
    };
  },
  mounted() {
    this.getInfo();
    this.queryInviteUsersPage(); // 用户数据
  },
  methods: {
    getInfo() {
      this.getUserTypes(); // 地图坐标数据
      // 农户数据详情
      this.$api
        .postBaseApi('farmland/statUserAndArea')
        .then((res) => {
          if (!res) return;
          if (res.code === 200) {
            let resData = res.result;
            let sum = sumBy(resData.chart, function (o) {
              return parseInt(o.value);
            });
            let farmers = sumBy(resData.chart, function (o) {
              return parseInt(o.user);
            });

            let resColors = ['#4D81E7', '#00FFCF', '#1AE1E5', '#FFB95B', '#FF7160'];
            let legendData = [];
            for (var i = 0; i < resData.chart.length; i++) {
              var data = {
                name: resData.chart[i].name,
                icon: 'circle',
                textStyle: {
                  fontSize: 14,
                  fontWeight: 'bold',
                  lineHeight: 20,
                  color: resColors[i],
                },
              };
              legendData.push(data);
            }
            this.baseOption.title.text = sum + '亩';
            this.baseOption.title.subtext = farmers + '户';
            this.baseOption.legend = {
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
                for (let i = 0; i < resData.chart.length; i++) {
                  if (name == resData.chart[i].name) {
                    return `${name}  ${((parseInt(resData.chart[i].value) / sum) * 100).toFixed(0)}% \n {value|${
                      resData.chart[i].user
                    }户 } {value|${resData.chart[i].value}亩 } `;
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
            };
            this.baseOption.series = [
              {
                name: '农户数据详情',
                type: 'pie',
                radius: ['45%', '70%'],
                center: ['32%', '50%'],
                color: ['#4D81E7', '#00FFCF', '#1AE1E5', '#FFB95B', '#FF7160'],
                data: resData.chart,
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
            this.$refs.baseChart.refresh(this.baseOption);
          }
        })
        .catch(() => {});
    },
    // 分布change
    distributionChange(val) {
      if (val === '320000') {
        this.distribution = null;
      }
      this.getUserTypes('distribution');
    },
    getUserTypes() {
      this.$api
        .postBaseApi('uc/user/querAllInviteUser', {
          countyCode: this.distribution,
          userTypes: [this.userTypes],
        })
        .then((res) => {
          if (!res) return;
          if (res.code === 200) {
            const resData = res.result;
            // this.mapData = resData;
            this.lonLatData = resData;
          }
        })
        .catch(() => {});
    },
    // 用户数据
    queryInviteUsersPage() {
      this.$api
        .postBaseApi('uc/user/queryInviteUsersPage', {
          farmerUserType: -100,
          pageNum: 1,
          pageSize: 100,
        })
        .then((res) => {
          console.log(res);

          if (!res) return;
          if (res.code === 200) {
            const resData = res.result;
            this.tableData = resData.data;
          }
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.gp-anchor {
  right: 580px;
}
</style>
