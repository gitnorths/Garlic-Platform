<template>
  <div class="gp-bg gp-qualityGrade">
    <QualityGradeMaps />
    <div class="gp-right gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>贾汪县2020年耕地质量等级图集</span></div>
        <div class="gp-box">
          <ul class="gp-list" v-infinite-scroll="load" style="overflow: auto">
            <li v-for="(item, index) in list" :key="index" class="gp-list__item">
              <b>{{ item.index }}</b>
              <p>{{ item.name }}</p>
              <span>{{ item.value }}{{ item.unit }}</span>
              <span>{{ item.percent }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QualityGradeMaps from './components/quality-grade-maps';

export default {
  name: 'QualityGrade',
  components: {
    QualityGradeMaps,
  },
  data() {
    return {
      list: [
        { index: 1, name: '耕地1级', value: 139039.8, unit: '亩', percent: '36.67%' },
        { index: 2, name: '耕地2级', value: 148039.4, unit: '亩', percent: '39.06%' },
        { index: 3, name: '耕地3级', value: 77182.95, unit: '亩', percent: '20.53%' },
        { index: 4, name: '耕地4级', value: 11181.9, unit: '亩', percent: '2.95%' },
        { index: 5, name: '耕地5级', value: 3483.6, unit: '亩', percent: '0.92%' },
        { index: 6, name: '耕地6级', value: 209.3, unit: '亩', percent: '0.06%' },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>
