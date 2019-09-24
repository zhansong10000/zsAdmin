<template>
  <div class="login">
    <div class="login-header">
      <!--  <img class="company-logo" src="./../assets/image/company_logo.png"/>-->
      <div class="web-title">后台管理系统</div>
    </div>
    <div class="login-main">
      <div class="login-panel">
        <div class="login-form">
          <div class="login-form-title">登 录 LOGIN</div>
          <div class="login-form-input login-form-username">
            <span class="login-user-icon"></span>
            <input v-model="userId" placeholder="请输入账号" type="text"/>
          </div>
          <div class="login-form-input login-form-userpwd">
            <span class="login-pwd-icon"></span>
            <input v-model="userPwd" placeholder="请输入密码" type="password"/>
          </div>
          <div class="login-vercode">
            <input v-model="verCode" placeholder="请输入验证码"/>
            <img class="vercode-image" :src="'data:image/png;base64,'+vertifyCodeSrc" @click = "getCode()"/>
          </div>
          <div class="login-info">
            <div class="auto-login">
              <el-checkbox>记住密码</el-checkbox>
            </div>
            <div class="error-message">{{errorMsg}}</div>
          </div>
          <div class="login-btn pointer" @click="login">登 录</div>
        </div>
      </div>
    </div>
    <div class="login-footer">粤ICP备11108557号-20</div>
  </div>
</template>
<script>
  // 导入样式
  import '@/assets/css/common.scss';

  export default {
    name: 'login',
    components: {},
    data() {
      return {
        userId: "",
        userPwd: "",
        verCode: "",
        vertifyCodeId: "",
        vertifyCodeSrc: "",
        errorMsg:"",
      }
    },
    beforeCreate() {

    },
    created() {
      this.getCode();
    },
    mounted() {
    },
    methods: {
      login(){
        let that = this;
        that.errorMsg = "";
        if (that.userId === "" || that.userPwd === "" || that.verCode === "") {
          that.errorMsg = "用户名、密码和验证码不能为空";
          return;
        }
        that.$http({
            method: 'post',
            url: '/auth/getToken',
            data: {
              loginName: that.userId,
              password: that.userPwd,
              vertifyCodeId: that.vertifyCodeId,
              vertifyCode: that.verCode,
            }
          }
        ).then(result => {
          if (result.code == 0) {

          }else {
            that.errorMsg = result.message;
            that.getCode();
          }
        }).catch(error => {

        });
      },
      getCode() {
        let that = this;
        that.$http({
            method: 'post',
            url: '/auth/getVertifyCode',
            data: {
              width: 113,
              height: 45
            }
          }
        ).then(result => {
          if (result.code == 0) {
            that.vertifyCodeSrc = result.data.vertifyCodeBase64Image;
            that.vertifyCodeId = result.data.vertifyCodeId;
          }
        }).catch(error => {

        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
  }

  .login-header {
    width: 100%;
    height: 72px;
    background: #00ceab;
    border-bottom: 1px solid #52ddc3;

    .company-logo {
      float: left;
      margin: 18px 30px;
    }

    .web-title {
      float: left;
      margin-top: 18px;
      padding-left: 30px;
      height: 36px;
      line-height: 36px;
      border-left: 1px solid #52ddc3;
      font-size: 28px;
      color: #fff;
    }

  }

  .login-main {
    width: 100%;
    height: calc(100% - 112px);
    background: #00ceab;
    position: absolute;
    top: 72px;
    bottom: 40px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    .login-panel {
      height: 420px;
      width: 640px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 2px 2px 5px #888888;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;

      .login-form {
        padding-top: 40px;
        width: 280px;

        input {
          height: 45px;
          border: 1px solid #1bd0a1;
          font-size: 14px;
          color: #464646;
          padding: 0 14px;
          outline: none;
        }

        .login-form-title {
          font-size: 26px;
          color: #19c59e;
          text-align: center;
          margin-bottom: 30px;
        }

        .login-form-input {
          height: 45px;
          width: 100%;
          overflow: hidden;
          margin-bottom: 13px;

          input {
            float: left;
            width: calc(100% - 47px);
          }

          .login-user-icon {
            float: left;
            width: 45px;
            height: 45px;
            display: block;
            background: #1bd0a1 url("./assets/image/login_user_icon.png") no-repeat center;
          }

          .login-pwd-icon {
            float: left;
            width: 45px;
            height: 45px;
            display: block;
            background: #1bd0a1 url("./assets/image/login_pwd_icon.png") no-repeat center;
          }
        }

        .login-vercode {
          width: 100%;
          overflow: hidden;

          input {
            float: left;
            width: 145px;
          }

          .vercode-image {
            border: none;
            background: #e4e4e4;
            color: #000;
            height: 45px;
            width: 113px;
            margin-left: 20px;
            outline: none;
            letter-spacing: 3px;
            cursor: pointer;
          }
        }

        .login-info {
          overflow: hidden;
          border-bottom: 1px dashed #1bd0a1;

          .auto-login {
            float: left;
            line-height: 38px;
          }

          .error-message {
            float: right;
            height: 40px;
            line-height: 40px;
            font-size: 12px;
            color: #f66a5c;
          }
        }

        .login-btn {
          margin: 0 auto;
          margin-top: 30px;
          width: 100%;
          height: 40px;
          line-height: 40px;
          background: #f6aa01;
          font-size: 16px;
          text-align: center;
          color: #fff;
          border-radius: 4px;
          font-family: "SimSun";
          font-weight: bold;
        }
      }
    }
  }

</style>
