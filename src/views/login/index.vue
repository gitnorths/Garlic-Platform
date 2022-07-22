<template>
  <div class="gp gp-login">
    <el-form :model="ruleForm" :rules="rules" ref="loginFormRef">
      <el-form-item>
        <!-- <el-image :src="urls"></el-image> -->
        <h1><img :src="iconTitle" alt="" /></h1>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" clearable placeholder="手机号码">
          <img :src="iconPhone" alt="" slot="prefix" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" type="password" clearable placeholder="密码">
          <img :src="iconPassWord" alt="" slot="prefix" />
        </el-input>
      </el-form-item>
      <el-form-item prop="imageCode">
        <el-row :gutter="16">
          <el-col :span="14">
            <el-input v-model="ruleForm.imageCode" clearable placeholder="验证码">
              <img :src="iconVerify" alt="" slot="prefix" />
            </el-input>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              <img :src="captchaImg" class="imgcaptcha" @click="refreshCaptcha" alt />
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="login-checked">
        <div class="login-checked__content">
          <el-checkbox v-model="checked">记住账号</el-checkbox>
          <el-link type="primary" :underline="false">忘记密码？</el-link>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"> 登 录 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import qs from 'qs';
import storage from '@/utils/storage';

export default {
  name: 'LoginView',
  data() {
    return {
      ruleForm: {
        username: null,
        password: null,
        imageCode: null,
      },
      checked: false,
      iconTitle: require('../../assets/images/login/title.png'),
      iconPhone: require('../../assets/images/login/phone.png'),
      iconPassWord: require('../../assets/images/login/pass.png'),
      iconVerify: require('../../assets/images/login/verify.png'),
      rules: {
        username: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '请输入合法手机号码', trigger: 'blur' },
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        imageCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { min: 4, max: 6, message: '验证码长度为4-6个字符', trigger: 'blur' },
        ],
      },
      captchaImg: '',
    };
  },
  mounted() {
    let username = localStorage.getItem('username');
    if (username !== null) {
      this.ruleForm.username = username;
      this.checked = true;
    }
    window.addEventListener('keydown', this.keyDown); //监听用户回车事件
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
  },
  created() {
    this.refreshCaptcha();
  },
  methods: {
    submitForm() {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          const { username } = this.ruleForm;
          //记住账号 13222056811, 13222011111
          localStorage.setItem('username', username);
          storage.setLocal(['authority'], username);
          if (username !== null) {
            this.$store
              .dispatch('user/login', this.ruleForm)
              .then(() => {
                console.log(1);
                this.$router.push({ path: '/home' }).catch(() => {
                  // this.refreshCaptcha(true);
                });
              })
              .catch(() => {});
          } else {
            localStorage.removeItem('username');
          }
        } else {
          return false;
        }
      });
    },
    refreshCaptcha(reset) {
      if (reset) {
        this.ruleForm.imageCode = '';
        this.$store.commit('SET_TOKEN', '');
      } else {
        this.$api
          .postBaseApi('auth/code/image')
          .then((res) => {
            if (!res) return;
            if (res.code === 200) {
              this.captchaImg = 'data:image/gif;base64,' + res.result;
            }
          })
          .catch(() => {
            this.$message({
              type: 'warning',
              message: '验证码获取失败!',
            });
          });
      }
    },
    //回车登录
    keyDown(e) {
      if (e.keyCode == 13) {
        //13是回车键的keycode
        if (this.ruleForm != '') {
          this.submitForm();
        } else {
          this.submitForm('ruleForm');
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.gp-login {
  background-image: url('@/assets/images/login/bg.png');

  ::v-deep .el-form {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: 150px;
    width: 380px;
    height: 100%;

    &-item {
      width: 100%;
      margin-bottom: 26px;

      &__error {
        font-size: 16px;
      }

      h1 {
        padding-top: 80px;

        img {
          width: 100%;
          display: block;
          margin-bottom: 6px;
        }
      }

      .el-input {
        &__inner {
          padding-left: 44px;
          height: 50px;
          font-size: 16px;
          background-color: rgba(#001e62, 0.5);
          border-color: rgba(#4171c1, 0.5);
          color: #ffffff;
          transition: all 0.3s;
        }

        &__prefix {
          display: flex;
          align-items: center;
          left: 14px;

          img {
            width: 22px;
            height: 22px;
          }
        }
      }

      .el-checkbox {
        color: #e4f3ff;

        &.is-checked {
          .el-checkbox__inner {
            background-color: #40acff;
          }
        }

        &__inner {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          font-weight: bold;
          background-color: initial;
          margin-top: -2px;

          &::after {
            border-width: 3px;
            top: 3px;
            left: 6px;
          }
        }

        &__label {
          font-size: 18px;
        }
      }

      .el-button {
        width: 100%;
        height: 50px;
        font-size: 20px;
        background-color: #40acff;
        box-shadow: 0px 8px 16px 0px rgba(#40acff, 0.25);
      }

      .el-link {
        font-size: 18px;
      }
    }

    .login-checked {
      margin-bottom: 22px;

      .el-form-item__content {
        line-height: initial;
      }

      &__content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }
    }
  }
}
.imgcaptcha {
  display: block;
  margin: 0;
  width: 100%;
  height: 50px;
  border-radius: 4px;
}
</style>
