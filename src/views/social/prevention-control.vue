<template>
  <div class="gp-bg gp-prevention">
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow: auto">
      <el-row :gutter="20">
        <el-col v-for="(item, i) in lists" :key="i" :span="i === 0 ? 24 : 12">
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
  name: 'PreventionControlView',
  components: {},
  data() {
    return {
      lists: [
        {
          src: require('../../assets/images/home/prevention0.png'),
        },
        {
          src: require('../../assets/images/home/prevention1.png'),
        },
        {
          src: require('../../assets/images/home/prevention2.png'),
        },
        {
          src: require('../../assets/images/home/prevention3.png'),
        },
        {
          src: require('../../assets/images/home/prevention4.png'),
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

<style lang="scss" scoped>
.gp-prevention {
  background-color: #010825;
  padding: 100px 15px 45px;

  .infinite-list {
    height: 100%;
    padding-right: 15px;

    img {
      display: block;
      width: 100%;
    }

    .el-row {
      .el-col {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
