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
          <div class="gp-box_img">
            <el-image :src="url" :preview-src-list="srcList"> </el-image>
            <p>数据提供单位：江苏省耕地质量与农业环境保护站</p>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="耕地等级面积及耕地面积占比"
      width="740px"
      :modal="false"
      custom-class="dialog_qg"
      :visible.sync="dialogEchartsVisible"
    >
    </el-dialog>
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
      dialogEchartsVisible: false,
      mapData: [], // 地图数据
      lonLatData: [], // 坐标数据
      title: null,
      list: null,
      url: '',
      srcList: [],
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
          src: require('../../assets/images/science/zldj/px.jpg'),
        },
        {
          name: '丰县',
          position: [116.658111, 34.697232],
          src: require('../../assets/images/science/zldj/fx.jpg'),
        },
        {
          name: '铜山区',
          position: [117.169698, 34.181162],
          src: require('../../assets/images/science/zldj/tsq.jpg'),
        },
        {
          name: '邳州市',
          position: [118.012511, 34.339208],
          src: require('../../assets/images/science/zldj/pzs.jpg'),
        },
        {
          name: '贾汪区',
          position: [117.452222, 34.441222],
          src: require('../../assets/images/science/zldj/jwq.jpg'),
        },
      ];
    }, 3000);
  },
  methods: {
    load() {},
    getName(name) {
      for (let index = 0; index < xuZhou.length; index++) {
        const element = xuZhou[index];
        if (name === element[0].name) {
          this.list = element;
          this.title = element[0].name + '' + element[0].year;
          // this.dialogEchartsVisible = true;
        }
      }

      for (let i = 0; i < this.lonLatData.length; i++) {
        const element = this.lonLatData[i];
        if (name === element.name) {
          this.url = element.src;
          this.srcList = [element.src];
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.gp-qualityGrade {
  .gp-right {
    width: 420px;
    bottom: 0;
    padding-bottom: 40px;

    > .gp-flex {
      overflow: hidden;
    }

    .gp-box {
      display: flex;
      flex-direction: column;
      height: calc(100% - 50px);

      &_img {
        flex: 1;
        padding-top: 20px;

        .el-image {
          width: 100%;
        }
        p {
          font-size: 16px;
          color: #73afff;
          text-align: right;
        }
      }
    }
  }

  :deep(.el-dialog) {
    height: 640px;
    background-color: rgba(4, 17, 65, 0.9);
    border: 1px solid rgba(0, 115, 223, 0.9);
  }
}

.gp-list {
  height: auto;
}
</style>
