<template>
  <div class="gp-bg gp-mechanization">
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow: auto">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="gp-mechanization__title">
            <img :src="mechanizationSrc" alt="" />
            <div class="gp-mechanization__box">
              <div class="gp-mechanization__box-left">
                <p>大蒜的全程机械化包括：<span>耕整、播种、植保、收获、加工</span>等环节。</p>
                <p>
                  为了便于机械化收获，必须统一耕整地方式，统一行距、株距。改变传统农艺，以适应机械化生产，真正实现农机农艺的融合。
                </p>
                <p>耕整地、植保、加工等环节的机械化一般都有通用机械设备，最关键的在于播种和收获。</p>
              </div>
              <div class="gp-mechanization__box-right">
                <el-button type="primary" icon="el-icon-video-play"> 履带自走式大蒜联合收获机 </el-button>
                <el-button type="primary" icon="el-icon-video-play"> 大蒜正牙播种机 </el-button>
              </div>
            </div>
          </div>
        </el-col>
        <el-col v-for="(item, i) in lists" :key="i" :span="24">
          <div class="grid-prevention">
            <img :src="item.src" alt="" />
          </div>
        </el-col>
      </el-row>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MechanizationIntellectualizationView',
  data() {
    return {
      mechanizationSrc: require('../../assets/images/home/mechanization0.png'),
      lists: [
        {
          src: require('../../assets/images/home/mechanization1.png'),
        },
        {
          src: require('../../assets/images/home/mechanization2.png'),
        },
      ],
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.gp-mechanization {
  background-color: #010825;
  padding: 100px 15px 45px;

  &__title {
    background: rgba(#041141, 0.9);
    border: 1px solid rgba(#0073df, 0.9);
    border-radius: 4px;

    img {
      display: block;
      margin: 0 auto;
    }
  }

  &__box {
    display: flex;
    padding: 30px 20px 30px 45px;

    p {
      color: #ffffff;
      font-size: 20px;
      line-height: 36px;
    }

    span {
      color: #16d0ff;
    }

    &-left {
      flex: 1;
    }

    &-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .el-button {
        min-width: 320px;
        margin: 5px 0;
      }
    }
  }

  .infinite-list {
    height: 100%;
    padding-right: 15px;

    img {
      display: block;
      margin: 0 auto;
    }

    .el-row {
      .el-col {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
