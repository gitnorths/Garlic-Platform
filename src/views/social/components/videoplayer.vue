<template>
  <el-dialog :title="title" width="1182" :visible.sync="visible" custom-class="dialogVideo" @close="closeVideo">
    <video ref="videoPlayer" id="videoplayer" class="video-js vjs-default-skin vjs-big-play-centered"></video>
  </el-dialog>
</template>

<script>
export default {
  name: 'VideoPlayer',
  props: {
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      visible: true,
      player: null,
    };
  },
  created() {
    // setTimeout(() => {
    this.$nextTick(() => {
      this.player = this.$VideoJs(this.$refs.videoPlayer, this.options);
      const player = this.$VideoJs('videoplayer_html5_api');
      player.ready(function () {
        let _this = this;
        _this.autoplay(true);
      });
    });
    // }, 300);
  },
  mounted() {},
  beforeDestroy() {
    console.log(this.player);
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    closeVideo() {
      console.log(this.player);
      if (this.player) {
        this.player.dispose();
        this.visible = false;
        this.$emit('cancel');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog {
  background: rgba(4, 17, 65, 0.9);
  border: 1px solid rgba(0, 115, 223, 0.9);

  &__header {
    padding: 0;

    span {
      display: block;
      position: relative;
      width: 800px;
      height: 60px;
      line-height: 60px;
      padding-left: 52px;
      background: linear-gradient(90deg, #004191 0%, rgba(0, 65, 145, 0) 100%);

      &::before {
        position: absolute;
        left: 15px;
        top: 0;
        display: block;
        content: '';
        width: 20px;
        height: 100%;
        background-image: url('@/assets/images/icon/title.png');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center center;
      }
    }

    &btn {
      i {
        font-size: 30px;
        font-weight: bold;
        color: #1661c7;
      }
    }
  }

  &__title {
    font-size: 24px;
    color: #fff;
  }

  &__body {
    padding: 30px;
  }
}

::v-deep .vjs-time-control {
  display: block !important;
}
::v-deep .vjs-remaining-time {
  display: none !important;
}

::v-deep .vjs-big-play-button {
  font-size: 2.5em !important;
  line-height: 90px !important;
  height: 90px !important;
  width: 90px !important;
  border-radius: 50% !important;
  background-color: rgba(0, 0, 0, 0.9) !important;
  margin-top: -45px !important;
  margin-left: -45px !important;
}
::v-deep .vjs-big-play-button .vjs-icon-placeholder {
  font-size: 1.63em !important;
}

::v-deep .vjs-paused .vjs-big-play-button,
::v-deep .vjs-paused.vjs-has-started .vjs-big-play-button {
  display: block !important;
}
</style>
