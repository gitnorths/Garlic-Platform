<template>
  <div class="gp-bg gp-social">
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow: auto">
      <div class="gp-social__header">
        <div class="gp-social__title">
          <img :src="s_bg_l" alt="" />
          <span>春季大蒜主要病虫害的防治</span>
          <img :src="s_bg_r" alt="" />
        </div>
        <div class="gp-social__box">
          <p>
            2021年对江苏省大蒜病虫害的发生及危害程度进行了调查，根据前期监测的病虫害的发生情况，主要有以下病虫害发生：在大丰多以大蒜紫斑病，同时混合发生大蒜叶枯病、大蒜病毒病为主。在邳州、丰县则主要以大蒜叶枯病为主，同时伴随发生大蒜紫斑病、大蒜病毒病。大蒜锈病各地发生普遍较重，属于危害程度较重的年份。大蒜根腐病和蒜蛆则在部分地区发生，危害相比往年有所减轻。大蒜蚜虫局部地区有所发生，危害较轻。
          </p>
          <p>
            进入2022年1月以来，气温较2021年相比总体偏暖，这有利于大蒜病虫害的越冬，因此未来进入春季后需密切关注病虫害的发生，及时予以防控：
          </p>
        </div>
      </div>
      <div class="gp-social__main">
        <el-row :gutter="28">
          <el-col :span="12">
            <div class="gp-social__list">
              <div class="gp-social__list-header">
                <h3><b>1</b></h3>
                <i>大蒜叶枯病</i>
                <span>为春季多发病害，在各个主产区均有发生。</span>
              </div>
              <div class="gp-social__list-main">
                <p>
                  主要危害叶片和花梗，多从下部老叶尖端开始发病。发病初期病斑呈水渍状,叶色逐渐减褪,叶面出现灰白色稍凹陷的圆形斑点。可使用<font>10%苯醚甲环唑水分散粒剂</font>（有效用量10克/亩）<font>结合50%氟啶胺悬浮剂</font>（有效用量15克/亩）防治大蒜叶枯病，在发病前或发病初期兑水喷雾，7-10天施药2-3次。
                </p>
                <div class="_img">
                  <img v-for="(item, i) in img1" :src="item" :key="i" alt="" />
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="gp-social__list">
              <div class="gp-social__list-header">
                <h3><b>2</b></h3>
                <i>大蒜紫斑病</i>
                <span>在大丰主产区，多发于薹蒜及青蒜品种，头蒜品种发病较轻。</span>
              </div>
              <div class="gp-social__list-main">
                <p>
                  春季多与叶枯病混合发生，多开始于叶尖或花梗中部，初呈稍凹陷白色小斑点，中央微紫色，扩大后病斑呈纺锤形或椭圆形，黄褐色甚至紫色，病斑多具有同心轮纹。可使用<font>10%苯醚甲环唑水分散粒剂</font>25%咪鲜胺乳油（制剂用量100-120克/亩），在发病前或发病初期兑水喷雾，7-10天施药2-3次。
                </p>
                <div class="_img">
                  <img v-for="(item, i) in img2" :src="item" :key="i" alt="" />
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="28">
          <el-col :span="12">
            <div class="gp-social__list">
              <div class="gp-social__list-header">
                <h3><b>3</b></h3>
                <i>大蒜锈病</i>
                <span>主要为害叶片和假茎。</span>
              </div>
              <div class="gp-social__list-main">
                <p>
                  病部初为椭圆形褪绿斑，后在表皮下出现圆形或椭圆形稍凸起的夏孢子堆。该病害在低温多雨湿度大（适宜温度10-23度，相对湿度大于90%）的情况下易爆发流行，防控要点是早发现早防治，在早春时随时监测该病害，及时对轻微发病田或未发病田块，使用<font>40%苯醚甲环唑悬浮剂</font>（制剂用量20毫升/亩）或<font>20%三唑酮乳油</font>（制剂用量45毫升/亩）防治，可达到很好的防控效果。
                </p>
                <div class="_img">
                  <img v-for="(item, i) in img3" :src="item" :key="i" alt="" />
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="gp-social__list">
              <div class="gp-social__list-header">
                <h3><b>4</b></h3>
                <i>大蒜蚜虫</i>
                <span>大蒜蚜虫有桃蚜、葱蚜，属同翅目蚜科。</span>
              </div>
              <div class="gp-social__list-main">
                <p>
                  尤以桃蚜为主，其寄主多达38科144种植物。虫害造成蒜叶蜷缩变形，褪绿变黄而枯干；同时传播大蒜花叶病毒，导致大蒜种性退化。早春时，大蒜蚜虫易发生，可及早喷药防治，把蚜虫控制在点片发生阶段。选用<font>5%吡虫啉乳油</font>，<font>36-45克</font>（有效成分）/公顷或<font>25%噻虫嗪水分散粒剂，30-56.25克</font>（有效成分）/公顷，兑水喷雾，7-10天施药1-2次进行防治。
                </p>
                <div class="_img">
                  <img v-for="(item, i) in img4" :src="item" :key="i" alt="" />
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PreventionControlView',
  components: {},
  data() {
    return {
      s_bg_l: require('../../assets/images/home/s_bg-l.png'),
      s_bg_r: require('../../assets/images/home/s_bg-r.png'),
      img1: [require('../../assets/images/social/pc/1-1.png'), require('../../assets/images/social/pc/1-2.png')],
      img2: [require('../../assets/images/social/pc/2-1.png'), require('../../assets/images/social/pc/2-2.png')],
      img3: [
        require('../../assets/images/social/pc/3-1.png'),
        require('../../assets/images/social/pc/3-2.png'),
        require('../../assets/images/social/pc/3-3.png'),
      ],
      img4: [require('../../assets/images/social/pc/4-1.png')],
    };
  },
  mounted() {},
  methods: {
    load() {},
  },
};
</script>

<style lang="scss" scoped>
.gp-social {
  &__box {
    p {
      line-height: 30px;
      color: #ffffff;
      font-size: 18px;
      font-family: 'PangMenZhengDao';
    }
  }

  ._img {
    img {
      border: 2px solid #008dcf;
    }
  }

  .infinite-list {
    height: 100%;
    padding-right: 15px;
  }
}
</style>
