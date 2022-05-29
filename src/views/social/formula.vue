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
        <div class="gp-btn">
          <el-button class="active">蒜头</el-button>
          <el-button>蒜苗</el-button>
        </div>
        <div class="gp-box">
          <div class="gp-formula-title">
            <span>推荐配方 [大蒜-水稻轮作]</span>
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
    return {};
  },
  mounted() {},
  created() {
    // this.getInfo();
  },
  methods: {
    getInfo() {
      // 监控数据
      this.$api
        .getBaseApi('noni/sfengine/dasuan/', {
          crop: 'suantai',
          method: '0',
          soiln: '20000',
          soilap: '12000',
          soilak: '30000',
          soilsom: '12000000',
        })
        .then((res) => {
          if (!res) return;
        })
        .catch(() => {});
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
