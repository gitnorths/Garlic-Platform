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
        <div class="gp-social__div">
          <div class="gp-social__list">
            <div class="gp-social__list-header">
              <h3><b>1</b></h3>
              <i>筛分蒜种环节</i>
            </div>
            <div class="gp-social__list-main">
              <el-row :gutter="30" class="_img">
                <el-col :span="12" class="_img-div" v-for="(item, i) in data1" :key="i">
                  <img :src="item.src" alt="" />
                  <i>{{ item.name }}</i>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="pdLR25">
            <img :src="img_r" alt="" />
          </div>
          <div class="gp-social__list">
            <div class="gp-social__list-header">
              <h3><b>2</b></h3>
              <i>耕整环节</i>
            </div>
            <div class="gp-social__list-main">
              <el-row :gutter="30" class="_img">
                <el-col :span="12" class="_img-div" v-for="(item, i) in data2" :key="i">
                  <img :src="item.src" alt="" />
                  <i>{{ item.name }}</i>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="gp-social__div">
          <el-row style="width: 100%">
            <el-col :span="12" :offset="12">
              <div class="gp-social__badge"><img :src="img_b" alt="" /></div>
            </el-col>
          </el-row>
        </div>
        <div class="gp-social__div">
          <div class="gp-social__list">
            <div class="gp-social__list-header">
              <h3><b>4</b></h3>
              <i>种植管理环节</i>
            </div>
            <div class="gp-social__list-main">
              <el-row :gutter="30" class="_img">
                <el-col :span="12" class="_img-div" v-for="(item, i) in data4" :key="i">
                  <img :src="item.src" alt="" />
                  <i>{{ item.name }}</i>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="pdLR25"><img :src="img_l" alt="" /></div>
          <div class="gp-social__list">
            <div class="gp-social__list-header">
              <h3><b>3</b></h3>
              <i>正芽播种环节</i>
            </div>
            <div class="gp-social__list-main">
              <el-row :gutter="30" class="_img">
                <el-col :span="12" class="_img-div" v-for="(item, i) in data3" :key="i">
                  <img :src="item.src" alt="" />
                  <i>{{ item.name }}</i>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="gp-social__div">
          <el-row style="width: 100%">
            <el-col :span="6" :offset="6">
              <div class="gp-social__badge"><img :src="img_rb" alt="" /></div>
            </el-col>
          </el-row>
        </div>
        <div class="gp-social__div">
          <div class="gp-social__list">
            <div class="gp-social__list-header">
              <h3><b>5</b></h3>
              <i>收获环节</i>
            </div>
            <div class="gp-social__list-main">
              <el-row :gutter="30" class="_img">
                <el-col :span="6" class="_img-div" v-for="(item, i) in data5" :key="i">
                  <img :src="item.src" alt="" />
                  <i>{{ item.name }}</i>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="gp-social__div">
          <div class="gp-social__badge"><img :src="img_b" alt="" /></div>
        </div>
        <div class="gp-social__div">
          <div class="gp-social__list">
            <div class="gp-social__list-header">
              <h3><b>6</b></h3>
              <i>加工环节</i>
            </div>
            <div class="gp-social__list-main">
              <el-row :gutter="30" class="_img">
                <el-col :span="6" class="_img-div" v-for="(item, i) in data6" :key="i">
                  <img :src="item.src" alt="" />
                  <i>{{ item.name }}</i>
                </el-col>
              </el-row>
            </div>
          </div>
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
      img_r: require('../../assets/images/social/mi/right.png'),
      img_l: require('../../assets/images/social/mi/left.png'),
      img_b: require('../../assets/images/social/mi/bottom.png'),
      img_rb: require('../../assets/images/social/mi/rightbottom.png'),
      data1: [
        { name: '大蒜分选机', src: require('../../assets/images/social/mi/1-1.png') },
        { name: '大蒜分瓣机', src: require('../../assets/images/social/mi/1-2.png') },
      ],
      data2: [
        { name: '旋耕', src: require('../../assets/images/social/mi/2-1.png') },
        { name: '起垄（部分地区）', src: require('../../assets/images/social/mi/2-2.png') },
      ],
      data3: [
        { name: '勺链式', src: require('../../assets/images/social/mi/3-1.png') },
        { name: '指甲式', src: require('../../assets/images/social/mi/3-2.png') },
        { name: '播种覆膜一体机', src: require('../../assets/images/social/mi/3-3.png') },
        { name: '播种施肥一体机', src: require('../../assets/images/social/mi/3-4.png') },
      ],
      data4: [
        { name: '节水灌溉', src: require('../../assets/images/social/mi/4-1.png') },
        { name: '撒肥机*', src: require('../../assets/images/social/mi/4-2.png') },
        { name: '覆膜装置*', src: require('../../assets/images/social/mi/4-3.png') },
        { name: '喷药装置', src: require('../../assets/images/social/mi/4-4.png') },
      ],
      data5: [
        { name: '联合收获机', src: require('../../assets/images/social/mi/5-1.png') },
        { name: '打捆式', src: require('../../assets/images/social/mi/5-2.png') },
        { name: '先剪后收式', src: require('../../assets/images/social/mi/5-3.png') },
        { name: '松土式收获机', src: require('../../assets/images/social/mi/5-4.png') },
        { name: '后置式', src: require('../../assets/images/social/mi/5-5.png') },
        { name: '挖掘式收获机', src: require('../../assets/images/social/mi/5-6.png') },
        { name: '剪杆装袋式', src: require('../../assets/images/social/mi/5-7.png') },
        { name: '剪茎粉碎式', src: require('../../assets/images/social/mi/5-8.png') },
      ],
      data6: [
        { name: '分级', src: require('../../assets/images/social/mi/6-1.png') },
        { name: '蒜米加工', src: require('../../assets/images/social/mi/6-2.png') },
        { name: '蒜片加工', src: require('../../assets/images/social/mi/6-3.png') },
        { name: '松土式收获机', src: require('../../assets/images/social/mi/6-4.png') },
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
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding-top: 70px;
    padding-bottom: 30px;
  }

  &__div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 1550px;
  }

  &__badge {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
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

  .gp-social__list {
    width: 100%;
    padding: 15px 0 0;

    &-main {
      padding: 35px 35px 10px;

      ._img {
        margin: 0;
        text-align: center;
        flex-wrap: wrap;

        img {
          width: 300px;
          height: 200px;
        }
        i {
          display: block;
          line-height: 30px;
          font-size: 24px;
          color: #66c7ff;
          margin-bottom: 26px;
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
