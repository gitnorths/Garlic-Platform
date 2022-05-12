<template>
  <div class="gp gp-login">
    <el-form :model="ruleForm" :rules="rules" ref="loginFormRef">
      <el-form-item>
        <!-- <el-image :src="urls"></el-image> -->
        <h1><img :src="iconTitle" alt="" /></h1>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input v-model="ruleForm.phone" clearable placeholder="手机号码">
          <img :src="iconPhone" alt="" slot="prefix" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" type="password" clearable placeholder="密码">
          <img :src="iconPassWord" alt="" slot="prefix" />
        </el-input>
      </el-form-item>
      <el-form-item prop="verify">
        <el-row :gutter="16">
          <el-col :span="14">
            <el-input v-model="ruleForm.verify" clearable placeholder="验证码">
              <img :src="iconVerify" alt="" slot="prefix" />
            </el-input>
          </el-col>
          <el-col :span="10">
            <div class="grid-content bg-purple">
              <img :src="captchaImg" class="imgcaptcha" @click="getCaptcha" alt />
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="login-checked">
        <div class="login-checked__content">
          <el-checkbox v-model="ruleForm.checked">记住账号</el-checkbox>
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
import storage from '@/utils/storage';
import { codeImage } from '@/api/';

export default {
  name: 'LoginView',
  data() {
    return {
      ruleForm: {
        phone: '',
        password: '',
        verify: '',
        checked: false,
      },
      iconTitle: require('../../assets/images/login/title.png'),
      iconPhone: require('../../assets/images/login/phone.png'),
      iconPassWord: require('../../assets/images/login/pass.png'),
      iconVerify: require('../../assets/images/login/verify.png'),
      rules: {
        phone: [
          { required: true, message: '请输入手机号码' },
          { pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '请输入合法手机号码', trigger: 'blur' },
        ],
        password: [{ required: true, message: '密码不能为空' }],
        verify: [
          { required: true, message: '验证码不能为空' },
          { min: 6, max: 6, message: '验证码长度为6个字符', trigger: 'blur' },
        ],
      },
      captchaImg: '',
    };
  },
  mounted() {
    this.getCaptcha();
    window.addEventListener('keydown', this.keyDown); //监听用户回车事件
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false); //销毁回车事件，如果不销毁，在其他页面敲回车也会执行回车登录操作。
  },
  created() {
    let phone = localStorage.getItem('phone');
    if (phone !== null) {
      this.ruleForm.phone = phone;
      this.ruleForm.checked = true;
    }
  },
  methods: {
    getCaptcha() {
      console.log(123);
      codeImage().then((res) => {
        console.log(res);
      });
    },
    submitForm() {
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          const { phone } = this.ruleForm;
          //记住账号
          if (phone !== null) {
            localStorage.setItem('phone', this.ruleForm.phone);
            storage.setLocal(['authority'], this.ruleForm.phone);
            this.$message({
              message: '登录成功！',
              type: 'success',
            });
            this.$router.push('/home');
          } else {
            localStorage.removeItem('phone');
          }
        } else {
          return false;
        }
      });
    },
    //回车登录
    keyDown(e) {
      if (e.keyCode == 13) {
        //13是回车键的keycode
        if (this.ruleForm != '') {
          this.login();
        } else {
          this.submitForm('ruleForm');
        }
      }
    },
  },
};
</script>

<style lang="scss">
.imgcaptcha {
  margin: 8px;
  background: white;
  width: 93px;
  height: 34px;
}
</style>
