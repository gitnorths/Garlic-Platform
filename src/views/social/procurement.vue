<template>
  <div class="gp-bg gp-procurement">
    <!-- <div class="gp-anchor">
      <el-select v-model="distribution" clearable placeholder="分布" @change="distributionChange">
        <el-option v-for="item in distributionOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="userTypes" @change="getUserTypes">
        <el-option v-for="item in userTypesOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div> -->
    <ProcurementMaps :mapData="mapData" :lonLatData="lonLatData" />
    <div class="gp-left gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>收购网点信息</span></div>
        <div class="gp-box">
          <ul class="gp-list __header">
            <li v-for="(item, index) in listLeftHeader" :key="index" class="gp-list__item">
              <b>{{ item.type }}</b>
              <p>{{ item.name }}</p>
              <span>{{ item.mobile }}</span>
              <span>{{ item.address }}</span>
            </li>
          </ul>
          <ul class="gp-list __body" v-infinite-scroll="load">
            <li v-for="(item, index) in listLeft" :key="index" class="gp-list__item">
              <b :class="item.type === '6' ? 'green' : 'blue'">{{ item.type === 6 ? '收购网点' : '加工企业' }}</b>
              <p>{{ item.nickname }}</p>
              <span>{{ item.mobile }}</span>
              <span><img :src="item.addressIcon" :title="item.address" /></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="gp-right gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>大蒜收购、销售信息</span></div>
        <div class="gp-box">
          <ul class="gp-list __header">
            <li v-for="(item, index) in listRightHeader" :key="index" class="gp-list__item">
              <b>{{ item.type }}</b>
              <p>{{ item.variety }}</p>
              <span>{{ item.number }}</span>
              <span>{{ item.time }}</span>
            </li>
          </ul>
          <ul class="gp-list __body" v-infinite-scroll="load">
            <li v-for="(item, index) in listRight" :key="index" class="gp-list__item">
              <b :class="item.type === '收购' ? 'bgGreen' : 'bgOrange'">{{ item.type }}</b>
              <p>{{ item.variety }}</p>
              <span>{{ item.number + item.unit }}</span>
              <span>{{ item.time }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProcurementMaps from './components/procurement-maps';

export default {
  name: 'ProcurementView',
  components: {
    ProcurementMaps,
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
      userTypes: '6, 7', // 类型
      userTypesOptions: [
        {
          value: '6, 7',
          label: '加工',
        },
      ],
      listLeftHeader: [
        {
          type: '类型',
          name: '企业名称',
          mobile: '电话',
          address: '地址',
        },
      ],
      listLeft: [],
      listRightHeader: [
        {
          type: '',
          variety: '品种',
          number: '数量',
          time: '时间',
        },
      ],
      listRight: [
        // {
        //   type: '收购',
        //   variety: '大蒜 紫皮蒜',
        //   number: '2',
        //   unit: '吨',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '收购',
        //   variety: '大蒜 红皮蒜',
        //   number: '500',
        //   unit: '斤',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '收购',
        //   variety: '大蒜 独头蒜',
        //   number: '10000',
        //   unit: '斤',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '销售',
        //   variety: '大蒜 白皮蒜',
        //   number: '120000',
        //   unit: '斤',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '收购',
        //   variety: '大蒜 红皮蒜',
        //   number: '20000',
        //   unit: '斤',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '销售',
        //   variety: '大蒜 紫皮蒜',
        //   number: '2000',
        //   unit: '斤',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '收购',
        //   variety: '大蒜 白皮蒜',
        //   number: '10000',
        //   unit: '斤',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '收购',
        //   variety: '大蒜 紫皮蒜',
        //   number: '200',
        //   unit: '斤',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '销售',
        //   variety: '大蒜 紫皮蒜',
        //   number: '1',
        //   unit: '吨',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '收购',
        //   variety: '大蒜 紫皮蒜',
        //   number: '5',
        //   unit: '吨',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '收购',
        //   variety: '大蒜 紫皮蒜',
        //   number: '2',
        //   unit: '吨',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '收购',
        //   variety: '大蒜 紫皮蒜',
        //   number: '2',
        //   unit: '吨',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '收购',
        //   variety: '大蒜 红皮蒜',
        //   number: '500',
        //   unit: '斤',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '收购',
        //   variety: '大蒜 独头蒜',
        //   number: '10000',
        //   unit: '斤',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '销售',
        //   variety: '大蒜 白皮蒜',
        //   number: '120000',
        //   unit: '斤',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '收购',
        //   variety: '大蒜 红皮蒜',
        //   number: '20000',
        //   unit: '斤',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '销售',
        //   variety: '大蒜 紫皮蒜',
        //   number: '2000',
        //   unit: '斤',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '收购',
        //   variety: '大蒜 白皮蒜',
        //   number: '10000',
        //   unit: '斤',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '收购',
        //   variety: '大蒜 紫皮蒜',
        //   number: '200',
        //   unit: '斤',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '销售',
        //   variety: '大蒜 紫皮蒜',
        //   number: '1',
        //   unit: '吨',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '收购',
        //   variety: '大蒜 紫皮蒜',
        //   number: '5',
        //   unit: '吨',
        //   time: '03/6 10:49',
        // },
        // {
        //   type: '收购',
        //   variety: '大蒜 紫皮蒜',
        //   number: '2',
        //   unit: '吨',
        //   time: '03/6 10:49',
        // },
      ],
    };
  },
  mounted() {
    this.getUserTypes(); // 地图坐标数据
    this.getUserTypesLeft(); // 收购网点信息
  },
  methods: {
    // 分布change
    // distributionChange(val) {
    //   if (val === '320000') {
    //     this.distribution = null;
    //   }
    //   this.getUserTypes('distribution');
    // },
    getUserTypes() {
      this.$api
        .postBaseApi('uc/user/querAllInviteUser', {
          countyCode: this.distribution,
          userTypes: [6, 7],
        })
        .then((res) => {
          if (!res) return;
          if (res.code === 200) {
            const resData = res.result;
            this.mapData = resData;
            setTimeout(() => {
              this.lonLatData = resData;
            }, 5000);
          }
        })
        .catch(() => {});
    },
    // 收购网点信息
    getUserTypesLeft() {
      this.$api
        .postBaseApi('uc/user/querAllInviteUser', {
          countyCode: this.distribution,
          userTypes: [6],
        })
        .then((res) => {
          if (!res) return;
          if (res.code === 200) {
            const resData = res.result;
            this.listLeft = [];
            resData.forEach((item) => {
              this.listLeft.push({
                ...item,
                addressIcon: require('../../assets/images/icon/mark-green-small.png'),
              });
            });
          }
        })
        .catch(() => {});
    },
    load() {},
  },
};
</script>
