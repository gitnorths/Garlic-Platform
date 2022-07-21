<template>
  <div class="gp-bg gp-social">
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow: auto">
      <div class="gp-social__header">
        <div class="gp-social__title">
          <img :src="s_bg_l" alt="" />
          <span>大蒜生产全程机械化</span>
          <img :src="s_bg_r" alt="" />
        </div>
        <div class="gp-social__box">
          <div class="gp-social__box-left">
            <p>大蒜的全程机械化包括：<span>耕整、播种、植保、收获、加工</span>等环节。</p>
            <p>
              为了便于机械化收获，必须统一耕整地方式，统一行距、株距。改变传统农艺，以适应机械化生产，真正实现农机农艺的融合。
            </p>
            <p>耕整地、植保、加工等环节的机械化一般都有通用机械设备，最关键的在于播种和收获。</p>
          </div>
          <div class="gp-social__box-right">
            <div class="btn-video" @click="showVideo(1)"><span>履带自走式大蒜联合收获机</span></div>
            <div class="btn-video" @click="showVideo(2)"><span> 大蒜正牙播种机 </span></div>
          </div>
        </div>
      </div>
      <div class="gp-social__main">
        <div class="gp-social__prevention" v-for="(item, i) in lists" :key="i">
          <img :src="item.src" alt="" />
        </div>
      </div>
    </ul>
    <Video-player
      v-if="showVideoPlayer"
      ref="videoPlayer"
      class="videoplayer"
      :title="title"
      :options="options"
      @cancel="cancelVideoPlayer"
    />
  </div>
</template>

<script>
import VideoPlayer from './components/videoplayer';

export default {
  name: 'MechanizationIntellectualizationView',
  components: {
    VideoPlayer,
  },
  data() {
    return {
      //数据:
      showVideoPlayer: false,
      title: '',
      options: {
        autoplay: true,
        muted: false,
        loop: false,
        preload: 'auto',
        controls: true,
        language: 'zh-CN',
        aspectRatio: '16:9',
        fluid: true,
        sources: [
          {
            src: '',
            type: 'video/mp4',
          },
        ],
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
        controlBar: {
          remainingTimeDisplay: false, //
          currentTimeDisplay: true, // 当前时间
          timeDivider: true, // 时间分割线
          durationDisplay: true, // 总时间
          progressControl: true, // 进度条
          volumeMenuButton: true, //音量控制

          customControlSpacer: true, //
          fullscreenToggle: true, // 全屏按钮
          volumePanel: true,
        },
      },
      mechanizationSrc: require('../../assets/images/home/mechanization0.png'),
      s_bg_l: require('../../assets/images/home/s_bg-l.png'),
      s_bg_r: require('../../assets/images/home/s_bg-r.png'),
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
  methods: {
    showVideo(key) {
      console.log(this.showVideoPlayer);
      switch (key) {
        case 1:
          this.showVideoPlayer = true;
          this.title = '履带自走式大蒜联合收获机';
          this.options.sources[0].src = 'http://fiveone.oss-cn-shanghai.aliyuncs.com/static/六行播种.mp4';
          break;
        case 2:
          this.showVideoPlayer = true;
          this.title = '大蒜正牙播种机';
          this.options.sources[0].src = 'http://fiveone.oss-cn-shanghai.aliyuncs.com/static/四行收获.mp4';
          break;

        default:
          break;
      }
    },
    cancelVideoPlayer() {
      this.showVideoPlayer = false;
    },
    load() {},
  },
};
</script>

<style lang="scss" scoped>
.gp-social {
  &__main {
    padding-top: 70px;
  }

  &__box {
    display: flex;
    padding: 35px 45px;

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

      .btn-video {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 320px;
        height: 54px;
        margin: 5px 0;
        padding: 0;
        // border: 1px solid;
        // border-image: linear-gradient(0deg, #71acfd, #b3d3ff) 10 10;
        background: linear-gradient(0deg, #0854bb 0%, #2c75d9 100%);
        border-radius: 8px;
        cursor: pointer;

        &:hover {
          background: linear-gradient(0deg, #2c75d9 0%, #2c75d9 100%);
        }

        span {
          position: relative;
          display: inline-block;
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 44px;
          padding-left: 44px;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: left center;
          background-image: url('@/assets/images/icon/video2.png');
        }
      }
    }
  }

  &__prevention {
    text-align: center;
  }

  .infinite-list {
    height: 100%;
    padding-right: 15px;
  }
}
</style>
