<template>
  <div class="gp-bg gp-formula">
    <FormulaMaps />
    <div class="gp-right gp-flex gp-flex-direction-column zIndex100">
      <div class="gp-flex gp-flex-direction-column gp-flex1">
        <div class="gp-title"><span>测土配方施肥</span></div>
        <div class="gp-group">
          <span>太仓市浏河镇飞凤路尽头西</span>
          <p>39.1202°, 116.1235°</p>
        </div>
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
            <el-descriptions-item v-for="(item, index) in flList_sd" :key="index" :label="item.time_fei_name">
              有机肥100公斤+45%配方肥25公斤+尿素8公斤
            </el-descriptions-item>
            <el-descriptions-item label="返青肥">尿素8公斤，浅水撒施</el-descriptions-item>
            <el-descriptions-item label="膨大肥">叶面肥肥力素1-2包，随防病治虫一起喷施</el-descriptions-item>
          </el-descriptions>
          <el-descriptions title="配方二" :column="1" border>
            <el-descriptions-item label="基肥">有机肥100公斤+45%配方肥25公斤+尿素8公斤 </el-descriptions-item>
            <el-descriptions-item label="返青肥">尿素8公斤，浅水撒施</el-descriptions-item>
            <el-descriptions-item label="膨大肥">叶面肥肥力素1-2包，随防病治虫一起喷施</el-descriptions-item>
          </el-descriptions>
          <div class="gp-formula-title">
            <span>推荐配方 [大蒜-玉米套作]</span>
          </div>
          <el-descriptions title="配方一" :column="1" border>
            <el-descriptions-item label="基肥">有机肥100公斤+45%配方肥25公斤+尿素8公斤 </el-descriptions-item>
            <el-descriptions-item label="返青肥">尿素8公斤，浅水撒施</el-descriptions-item>
            <el-descriptions-item label="膨大肥">叶面肥肥力素1-2包，随防病治虫一起喷施</el-descriptions-item>
          </el-descriptions>
          <el-descriptions title="配方二" :column="1" border>
            <el-descriptions-item label="基肥">有机肥100公斤+45%配方肥25公斤+尿素8公斤 </el-descriptions-item>
            <el-descriptions-item label="返青肥">尿素8公斤，浅水撒施</el-descriptions-item>
            <el-descriptions-item label="膨大肥">叶面肥肥力素1-2包，随防病治虫一起喷施</el-descriptions-item>
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
      flList_sd: [],
      flList_ym: [],
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
            // this.flList = res.feiliaoList;
            // return false;
            this.flList_sd = [];
            this.flList_ym = [];
            for (let i = 0; i < res.feiliaoList.length; i++) {
              if (res.feiliaoList[i].type_fei === 0) {
                this.flList_sd.push({
                  ...res.feiliaoList[i],
                  time_fei_name: this.getValue(res.feiliaoList[i].time_fei, this.timeFei),
                  type_fei_name: this.getValue(res.feiliaoList[i].type_fei, this.typeFei),
                });
              } else if (res.feiliaoList[i].type_fei === 1) {
                this.flList_ym.push({
                  ...res.feiliaoList[i],
                  time_fei_name: this.getValue(res.feiliaoList[i].time_fei, this.timeFei),
                  type_fei_name: this.getValue(res.feiliaoList[i].type_fei, this.typeFei),
                });
              }
            }
            console.log(this.flList_sd, this.flList_ym);
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
  .gp-group,
  .gp-crop {
    background-color: rgba(0, 13, 28, 0.8);
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
