<template>
  <div class="gp-bg gp-qualityGrade">
    <QualityGradeMaps :lonLatData="lonLatData" @ok="getName" />
    <div class="gp-right gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title">
          <span>{{ title }}年耕地质量等级图集</span>
        </div>
        <div class="gp-box">
          <ul class="gp-list" v-infinite-scroll="load" style="overflow: auto">
            <template v-for="items in list">
              <li v-for="(item, index) in items.data" :key="index" class="gp-list__item">
                <b>{{ item.key }}</b>
                <p>耕地{{ item.key }}级</p>
                <span>{{ item.value }} {{ items.unit }}</span>
                <span>{{ parseFloat((item.value / items.sum) * 100).toFixed(2) }}%</span>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QualityGradeMaps from './components/quality-grade-maps';
import { xuZhou } from '@/enums/cityData';

export default {
  name: 'QualityGrade',
  components: {
    QualityGradeMaps,
  },
  data() {
    return {
      mapData: [], // 地图数据
      lonLatData: [], // 坐标数据
      title: null,
      list: null,
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
          icon: require('../../assets/images/icon/mark-green.png'),
        },
        {
          name: '丰县',
          position: [116.658111, 34.697232],
          icon: require('../../assets/images/icon/mark3.png'),
        },
        {
          name: '铜山区',
          position: [117.169698, 34.181162],
          icon: require('../../assets/images/icon/mark3.png'),
        },
        {
          name: '邳州市',
          position: [118.012511, 34.339208],
          icon: require('../../assets/images/icon/mark3.png'),
        },
        {
          name: '贾汪区',
          position: [117.452222, 34.441222],
          icon: require('../../assets/images/icon/mark3.png'),
        },
      ];
    }, 5000);
  },
  methods: {
    load() {},
    getName(name) {
      for (let index = 0; index < xuZhou.length; index++) {
        const element = xuZhou[index];
        if (name === element[0].name) {
          this.list = element;
          this.title = element[0].name + '' + element[0].year;
        }
      }
    },
  },
};
</script>
