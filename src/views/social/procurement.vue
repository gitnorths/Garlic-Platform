<template>
  <div class="gp-bg gp-procurement">
    <ProcurementMaps />
    <div class="gp-left gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>收购网点信息</span></div>
        <div class="gp-box">
          <ul class="gp-list __header">
            <li v-for="(item, index) in listLeftHeader" :key="index" class="gp-list__item">
              <b>{{ item.type }}</b>
              <p>{{ item.name }}</p>
              <span>{{ item.phone }}</span>
              <span>{{ item.address }}</span>
            </li>
          </ul>
          <ul class="gp-list __body" v-infinite-scroll="load">
            <li v-for="(item, index) in listLeft" :key="index" class="gp-list__item">
              <b :class="item.type === '加工企业' ? 'green' : 'blue'">{{ item.type }}</b>
              <p>{{ item.name }}</p>
              <span>{{ item.phone }}</span>
              <span><img :src="item.address" alt="" /></span>
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
      listLeftHeader: [
        {
          type: '类型',
          name: '企业名称',
          phone: '电话',
          address: '地址',
        },
      ],
      listLeft: [
        {
          name: '徐州蜀河食品',
          type: '加工企业',
          phone: '13813800011',
          address: require('../../assets/images/icon/mark-green-small.png'),
        },
        {
          name: '彭州中信蒜业食品',
          type: '加工企业',
          phone: '13813800011',
          address: require('../../assets/images/icon/mark-green-small.png'),
        },
        {
          name: '邳州市三友食品',
          type: '收购网点',
          phone: '13813800011',
          address: require('../../assets/images/icon/mark-blue-small.png'),
        },
        {
          name: '欧美食品有限公司',
          type: '收购网点',
          phone: '13813800011',
          address: require('../../assets/images/icon/mark-blue-small.png'),
        },
        {
          name: '东方黎明股份有限公司',
          type: '收购网点',
          phone: '13813800011',
          address: require('../../assets/images/icon/mark-blue-small.png'),
        },
        {
          name: '绿之源食品有限公司',
          type: '加工企业',
          phone: '13813800011',
          address: require('../../assets/images/icon/mark-green-small.png'),
        },
        {
          name: '徐州蜀河食品',
          type: '加工企业',
          phone: '13813800011',
          address: require('../../assets/images/icon/mark-green-small.png'),
        },
        {
          name: '彭州中信蒜业食品',
          type: '收购网点',
          phone: '13813800011',
          address: require('../../assets/images/icon/mark-blue-small.png'),
        },
        {
          name: '邳州市三友食品',
          type: '收购网点',
          phone: '13813800011',
          address: require('../../assets/images/icon/mark-blue-small.png'),
        },
        {
          name: '欧美食品有限公司',
          type: '加工企业',
          phone: '13813800011',
          address: require('../../assets/images/icon/mark-green-small.png'),
        },
        {
          name: '东方黎明股份有限公司',
          type: '加工企业',
          phone: '13813800011',
          address: require('../../assets/images/icon/mark-green-small.png'),
        },
        {
          name: '绿之源食品有限公司',
          type: '收购网点',
          phone: '13813800011',
          address: require('../../assets/images/icon/mark-blue-small.png'),
        },
        {
          name: '徐州蜀河食品',
          type: '收购网点',
          phone: '13813800011',
          address: require('../../assets/images/icon/mark-blue-small.png'),
        },
        {
          name: '彭州中信蒜业食品',
          type: '收购网点',
          phone: '13813800011',
          address: require('../../assets/images/icon/mark-blue-small.png'),
        },
        {
          name: '邳州市三友食品',
          type: '加工企业',
          phone: '13813800011',
          address: require('../../assets/images/icon/mark-green-small.png'),
        },
        {
          name: '欧美食品有限公司',
          type: '加工企业',
          phone: '13813800011',
          address: require('../../assets/images/icon/mark-green-small.png'),
        },
        {
          name: '东方黎明股份有限公司',
          type: '收购网点',
          phone: '13813800011',
          address: require('../../assets/images/icon/mark-blue-small.png'),
        },
      ],
      listRightHeader: [
        {
          type: '',
          variety: '品种',
          number: '数量',
          time: '时间',
        },
      ],
      listRight: [
        {
          type: '收购',
          variety: '大蒜 紫皮蒜',
          number: '2',
          unit: '吨',
          time: '03/6 10:49',
        },
        {
          type: '收购',
          variety: '大蒜 红皮蒜',
          number: '500',
          unit: '斤',
          time: '03/6 10:49',
        },
        {
          type: '收购',
          variety: '大蒜 独头蒜',
          number: '10000',
          unit: '斤',
          time: '03/6 10:49',
        },
        {
          type: '销售',
          variety: '大蒜 白皮蒜',
          number: '120000',
          unit: '斤',
          time: '03/6 10:49',
        },
        {
          type: '收购',
          variety: '大蒜 红皮蒜',
          number: '20000',
          unit: '斤',
          time: '03/6 10:49',
        },
        {
          type: '销售',
          variety: '大蒜 紫皮蒜',
          number: '2000',
          unit: '斤',
          time: '03/6 10:49',
        },
        {
          type: '收购',
          variety: '大蒜 白皮蒜',
          number: '10000',
          unit: '斤',
          time: '03/6 10:49',
        },
        {
          type: '收购',
          variety: '大蒜 紫皮蒜',
          number: '200',
          unit: '斤',
          time: '03/6 10:49',
        },
        {
          type: '销售',
          variety: '大蒜 紫皮蒜',
          number: '1',
          unit: '吨',
          time: '03/6 10:49',
        },
        {
          type: '收购',
          variety: '大蒜 紫皮蒜',
          number: '5',
          unit: '吨',
          time: '03/6 10:49',
        },
        {
          type: '收购',
          variety: '大蒜 紫皮蒜',
          number: '2',
          unit: '吨',
          time: '03/6 10:49',
        },
        {
          type: '收购',
          variety: '大蒜 紫皮蒜',
          number: '2',
          unit: '吨',
          time: '03/6 10:49',
        },
        {
          type: '收购',
          variety: '大蒜 红皮蒜',
          number: '500',
          unit: '斤',
          time: '03/6 10:49',
        },
        {
          type: '收购',
          variety: '大蒜 独头蒜',
          number: '10000',
          unit: '斤',
          time: '03/6 10:49',
        },
        {
          type: '销售',
          variety: '大蒜 白皮蒜',
          number: '120000',
          unit: '斤',
          time: '03/6 10:49',
        },
        {
          type: '收购',
          variety: '大蒜 红皮蒜',
          number: '20000',
          unit: '斤',
          time: '03/6 10:49',
        },
        {
          type: '销售',
          variety: '大蒜 紫皮蒜',
          number: '2000',
          unit: '斤',
          time: '03/6 10:49',
        },
        {
          type: '收购',
          variety: '大蒜 白皮蒜',
          number: '10000',
          unit: '斤',
          time: '03/6 10:49',
        },
        {
          type: '收购',
          variety: '大蒜 紫皮蒜',
          number: '200',
          unit: '斤',
          time: '03/6 10:49',
        },
        {
          type: '销售',
          variety: '大蒜 紫皮蒜',
          number: '1',
          unit: '吨',
          time: '03/6 10:49',
        },
        {
          type: '收购',
          variety: '大蒜 紫皮蒜',
          number: '5',
          unit: '吨',
          time: '03/6 10:49',
        },
        {
          type: '收购',
          variety: '大蒜 紫皮蒜',
          number: '2',
          unit: '吨',
          time: '03/6 10:49',
        },
      ],
    };
  },
  mounted() {},
  methods: {
    load() {},
  },
};
</script>
