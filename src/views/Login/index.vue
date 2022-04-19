<template>
  <div class="hung-login">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item>
        <!-- <el-image :src="url"></el-image> -->
        <img :src="urls" alt="" />
      </el-form-item>
      <el-form-item prop="phone">
        <el-input v-model="ruleForm.phone" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      ruleForm: {
        phone: "",
        password: "",
        urls: null,
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号码" },
          { type: "number", message: "手机号码必须为数字值" },
        ],
        password: [
          { required: true, message: "密码不能为空" },
          { type: "number", message: "密码必须为数字值" },
        ],
      },
    };
  },
  mounted() {
    this.urls = require("@/assets/images/login-title.png");
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
