<template>
  <div class="gp-bg gp-formula">
    <FormulaMaps />
    <div class="gp-right gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>测土配方施肥</span></div>
        <!-- <div class="gp-group">
          <span>太仓市浏河镇飞凤路尽头西</span>
          <p>39.1202°, 116.1235°</p>
        </div> -->
        <el-radio-group class="gp-crop" v-model="cropModel" @change="handleChange">
          <el-radio-button v-for="(item, key) in crop" :label="item.key" :key="key">{{ item.value }}</el-radio-button>
        </el-radio-group>
        <!-- <div class="gp-btn">
          <el-button class="active">蒜头</el-button>
          <el-button>蒜苗</el-button>
        </div> -->
        <div class="gp-box">
          <div class="gp-formula-title">
            <span>推荐配方 [大蒜-水稻轮作]</span>
          </div>
          <el-descriptions title="配方一" :column="1" border>
            <el-descriptions-item v-for="(item, index) in flList_lz" :key="index" :label="item.time_fei_name">
              {{ item.type_fei_name }}{{ item.volumn }}公斤 + 氮{{ item.n }}(mg/t) + 磷{{ item.p }}(mg/t) + 钾{{
                item.k
              }}(mg/t)
            </el-descriptions-item>
          </el-descriptions>
          <div class="gp-formula-title">
            <span>推荐配方 [大蒜-玉米套作]</span>
          </div>
          <el-descriptions title="配方一" :column="1" border>
            <el-descriptions-item v-for="(item, index) in flList_tz" :key="index" :label="item.time_fei_name">
              {{ item.type_fei_name }}{{ item.volumn }}公斤 + 氮{{ item.n }}(mg/t) + 磷{{ item.p }}(mg/t) + 钾{{
                item.k
              }}(mg/t)
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormulaMaps from './components/formula-maps';

export default {
  name: 'FormulaView',
  components: {
    FormulaMaps,
  },
  data() {
    return {
      cropModel: 'suantou',
      flList_tz: [], // 套作
      flList_lz: [], // 轮作
      crop: [
        { key: 'suantou', value: '蒜头' },
        { key: 'suantai', value: '蒜薹' },
        { key: 'suanmiao', value: '蒜苗' },
      ],
      method: [
        { key: 0, value: '轮作' },
        { key: 1, value: '套作' },
      ],
      typeFei: [
        { key: 0, value: '无机肥' },
        { key: 1, value: '有机无机肥' },
      ],
      timeFei: [
        { key: 0, value: '机肥' },
        { key: 1, value: '返青肥' },
        { key: 2, value: '抽薹肥' },
        { key: 3, value: '膨大肥' },
        { key: 4, value: '追肥' },
      ],
      feiLiao: [
        { key: 'n', value: '氮' },
        { key: 'p', value: '磷' },
        { key: 'k', value: '钾' },
      ],
    };
  },
  mounted() {
    this.handleChange('suantou');
  },
  created() {},
  methods: {
    handleChange(cropKey) {
      // 获取套作
      this.$api
        .getSuanApi('noni/gongmi/suan', {
          crop: cropKey,
          method: 0,
          soiln: 1000,
          soilap: 8500,
          soilak: 8800,
        })
        .then((res) => {
          if (!res) return;
          if (res.feiliaoList) {
            this.flList_tz = [];
            // 蒜头
            for (let i = 0; i < res.feiliaoList.length; i++) {
              this.flList_tz.push({
                ...res.feiliaoList[i],
                time_fei_name: this.getValue(res.feiliaoList[i].time_fei, this.timeFei),
                type_fei_name: this.getValue(res.feiliaoList[i].type_fei, this.typeFei),
              });
            }
          }
        })
        .catch(() => {});

      // 获取轮作
      this.$api
        .getSuanApi('noni/gongmi/suan', {
          crop: cropKey,
          method: 1,
          soiln: 1000,
          soilap: 8500,
          soilak: 8800,
        })
        .then((res) => {
          if (!res) return;
          if (res.feiliaoList) {
            this.flList_lz = [];
            // 蒜头
            for (let i = 0; i < res.feiliaoList.length; i++) {
              this.flList_lz.push({
                ...res.feiliaoList[i],
                time_fei_name: this.getValue(res.feiliaoList[i].time_fei, this.timeFei),
                type_fei_name: this.getValue(res.feiliaoList[i].type_fei, this.typeFei),
              });
            }
          }
        })
        .catch(() => {});
    },
    getValue(value, options) {
      let label = options.find((item) => item.key == value);
      if (label) {
        return label.value;
      }
      return '';
    },
  },
};
</script>

<style lang="scss">
.gp-formula {
  .gp-right {
    width: 700px;

    .gp-group,
    .gp-btn,
    .gp-box,
    .gp-crop {
      background-color: rgba(0, 13, 28, 0.8);
    }

    .gp-box {
      flex: initial;
      height: 71.5vh;
      overflow-y: auto;
      padding: 0 26px;

      .el-descriptions {
        border: 1px solid #004191;
        margin-bottom: 14px;

        &__header {
          height: 50px;
          background: #09183b;
          margin: 0;
        }

        &__title {
          width: 140px;
          height: 50px;
          line-height: 50px;
          // text-align: center;
          padding-left: 30px;
          color: #ffffff;
          font-size: 20px;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          background-image: url('@/assets/images/home/title3.png');
        }

        &__body {
          color: #ffffff;
          background-color: initial;

          td {
            border-color: #004191;
            padding-left: 20px;
          }
        }

        &-item {
          &__label {
            width: 100px;
            color: #50a2d3;
            font-size: 16px;
            padding-left: 20px;
            background: initial;
            border-color: #004191;
          }

          &__content {
            color: #ffffff;
            font-size: 16px;
          }
        }
      }
    }
  }

  &-title {
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: linear-gradient(90deg, #004191 0%, rgba(0, 65, 145, 0) 100%);
    padding-left: 52px;
    margin-bottom: 20px;

    &::before {
      position: absolute;
      left: 15px;
      top: 50%;
      margin-top: -18px;
      display: block;
      content: '';
      width: 28px;
      height: 36px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      background-image: url('@/assets/images/icon/formula.png');
    }

    span {
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      background: linear-gradient(0deg, #96cfff 0%, #ffffff 100%);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
    }
  }
}

.gp-crop {
  padding: 20px 25px;
  .el-radio-button {
    margin-right: 20px;
    &__inner {
      width: 150px;
      background: rgba(0, 57, 128, 0.7);
      border-color: #004191;
      border-radius: 4px !important;
      color: #88abda;
      font-size: 18px;
      font-weight: bold;
    }

    &.is-active {
      .el-radio-button__inner {
        border-image: linear-gradient(180deg, #71acfd, #5198f8) 10 10;
        background: linear-gradient(180deg, #1c63c4 0%, rgba(28, 99, 196, 0) 100%);
        border-radius: 4px !important;
      }
    }
  }
}
</style>
