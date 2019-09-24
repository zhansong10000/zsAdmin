<template>
  <div class="login">
    <div class="login-header">
        <img class="company-logo" src="./../assets/image/company_logo.png" />
        <div class="web-title">{{webTitle}}</div>
    </div>
    <div class="login-main">
      <div class="login-panel">
        <div class="login-welcome"></div>
        <div class="login-form">
          <div class="login-form-title">{{loginPanelTitle}}</div>
          <div class="login-form-input login-form-username">
            <span class="login-user-icon"></span>
            <input type="text"
                   v-model="userId"
                   :placeholder="noneUsernameMsg"
                   v-on:focus="clearMsg"
                   @keyup.enter="userLogin"/>
          </div>
          <div class="login-form-input login-form-userpwd">
            <span class="login-pwd-icon"></span>
            <input type="password"
                   v-model="userPwd"
                   :placeholder="noneUserpwdMsg"
                   v-on:focus="clearMsg"
                   @keyup.enter="userLogin" />
          </div>
          <div class="login-vercode">
            <input v-model="verCode"
                   :placeholder="noneVerCodeMsg"
                   v-on:focus="clearMsg"
                   @keyup.enter="userLogin"/>
            <img id="code" :codeID="vertifyCodeId" @click="createCode" class="verification-image" :src="'data:image/png;base64,'+codeImgUrl">
          </div>
          <div class="login-info">
            <div class="auto-login">
              <el-checkbox v-model="autoLoginStatus">{{autoLoginMsg}}</el-checkbox>
            </div>
            <div class="error-message">{{ErrorMessage}}</div>
          </div>
          <div class="login-btn pointer" @click="userLogin">{{loginBtnInfo}}</div>
        </div>
      </div>
    </div>
    <div class="login-footer">{{copyrightInfo}}&nbsp;<a href="http://www.beian.miit.gov.cn">粤ICP备11108557号-20</a></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import axios from "axios";
import store from "./../vuex/store";
import * as types from "./../vuex/types";
import * as apiConfig from "./../api/config";
import ReferralRights from "./../utils/ReferralRights";
import ValidateInfo from "./../utils/ValidateInfo";

@Component
export default class Login extends Vue {
  webTitle: string = "医联体云平台";
  loginPanelTitle = "登录 LOGIN";
  noneUsernameMsg: string = "请输入账号";
  noneUserpwdMsg: string = "请输入密码";
  noneVerCodeMsg: string = "请输入验证码";
  loginBtnInfo: string = "登 录";
  autoLoginMsg: string = "记住密码";
  copyrightInfo: string = "版权所有：深圳中兴网信科技有限公司";
  userId: string = "";
  userPwd: string = "";
  verCode: string = "";
  checkCode: string = "";
  ErrorMessage: string = "";
  codeImgUrl: string = "";
  vertifyCodeId: string = "";
  autoLoginStatus: boolean = false;
  codeImgSize: {} = { width: 113, height: 45 };

  userLogin() {
    const _this = this;
    if (this.userId === "" || this.userPwd === "" || this.verCode === "") {
      this.ErrorMessage = "用户名、密码和验证码不能为空";
    } else {
      var loginRequestModel: {} = {
        loginName: _this.userId,
        password: _this.userPwd,
        vertifyCodeId: _this.vertifyCodeId,
        vertifyCode: _this.verCode,
        encodeType: ""
      };

      Vue.prototype.$http
        .post(apiConfig.API.getToken, loginRequestModel)
        .then(function(response: any) {
          if (response.data.code === apiConfig.MESSAGECODE.SUCCESS) {
            const data = response.data.data;
           /*  store.commit(types.LOGIN, {
              token: data.token,
              //baseUrl: data.serviceBaseUrl,
              baseUrl: window.location.protocol + '//' + window.location.host+'/mtps-api-bussiness/',
              integrationUrl: data.integrationUrl,
              integrationEduUrl: data.integrationEduUrl,
              rights: data.rights
            }) */;
            store.commit(types.LOGIN, {
              token: data.token,
              //baseUrl: data.serviceBaseUrl,
              baseUrl: 'http://111.40.160.176:22225/mtps-api-bussiness/',
              integrationUrl: 'http://111.40.160.176:22225',
              integrationEduUrl: '111.40.160.176:22225',
              rights: data.rights
            })
            localStorage.userId = _this.userId;
            // 判断是否需要保存密码
            if (_this.autoLoginStatus) {
              // localStorage.userId = _this.userId;
              localStorage.userPwd = _this.userPwd;
            } else {
              // localStorage.removeItem("userId");
              localStorage.removeItem("userPwd");
            }

            _this.$router.push({ path: "platform" });
          } else if (response.data.code === apiConfig.MESSAGECODE.ERROR) {
            _this.ErrorMessage = response.data.message;
            _this.createCode();
          } else {
            _this.ErrorMessage = response.data.message;
            _this.createCode();
          }
        })
        .catch(function(error: any) {
          console.log(error);
        });
    }
  }

  Login(userInfo:any){
    Vue.prototype.$http
      .post(apiConfig.API.getToken, userInfo)
      .then((response: any) => {
        if (response.data.code === apiConfig.MESSAGECODE.SUCCESS) {
          const data = response.data.data;
          store.commit(types.LOGIN, {
            token: data.token,
//            baseUrl: data.serviceBaseUrl,
            baseUrl: window.location.protocol + '//' + window.location.host+'/mtps-api-bussiness/',
            integrationUrl: data.integrationUrl,
            integrationEduUrl: data.integrationEduUrl,
            rights: data.rights
          });
          localStorage.userId = this.userId;
          // 判断是否需要保存密码
          if (this.autoLoginStatus) {
            // localStorage.userId = _this.userId;
            localStorage.userPwd = this.userPwd;
          } else {
            // localStorage.removeItem("userId");
            localStorage.removeItem("userPwd");
          }

          this.$router.push({ path: "platform" });
        } else if (response.data.code === apiConfig.MESSAGECODE.ERROR) {
          this.ErrorMessage = response.data.message;
          this.createCode();
        } else {
          this.ErrorMessage = response.data.message;
          this.createCode();
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }


  clearMsg() {
    this.ErrorMessage = "";
  }

  // 图片验证码
  createCode() {
    var _this = this;
    Vue.prototype.$http
      .post(apiConfig.API.getVertifyCode, _this.codeImgSize)
      .then(function(response: any) {
        _this.codeImgUrl = response.data.data.vertifyCodeBase64Image;
        _this.vertifyCodeId = response.data.data.vertifyCodeId;
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  mounted() {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("serviceBaseUrl")
    ) {
      this.$router.push({ path: "platform" });
    }


    // 判断是否记住密码
    if (localStorage.getItem("userId") && localStorage.getItem("userPwd")) {
      this.userId = localStorage.getItem("userId") as string;
      this.userPwd = localStorage.getItem("userPwd") as string;
      this.autoLoginStatus = true;
    }

    this.createCode();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

body {
}

.login {
  width: 100%;
  height: 100%;
  min-width: 1024px;
  min-height: 500px;
  overflow: auto;
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
    height: calc(100% - 132px);
    background: #00ceab;
    position: absolute;
    top: 72px;
    bottom: 60px;

    .login-panel {
      display: inline-block;
      position: absolute;
      top: 50%;
      margin-top: -220px;
      left: 50%;
      margin-left: -420px;
      height: 440px;
      width: 840px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 2px 2px 5px #888888;
      overflow: hidden;

      .login-welcome {
        float: left;
        width: 490px;
        height: 440px;
        background: url("./../assets/image/login_welcome_icon.png") no-repeat
          center;
      }

      .login-form {
        float: left;
        width: 280px;
        padding-top: 50px;

        input {
          height: 45px;
          border: 1px solid #1bd0a1;
          font-size: 14px;
          color: #464646;
          padding: 0 14px;
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
            background: #1bd0a1 url("./../assets/image/login_user_icon.png")
              no-repeat center;
          }

          .login-pwd-icon {
            float: left;
            width: 45px;
            height: 45px;
            display: block;
            background: #1bd0a1 url("./../assets/image/login_pwd_icon.png")
              no-repeat center;
          }
        }

        .login-vercode {
          width: 100%;
          overflow: hidden;

          input {
            float: left;
            width: 145px;
          }

          .verification-image {
            border: none;
            background: #e4e4e4;
            color: #000;
            height: 45px;
            width: 113px;
            margin-left: 20px;
            outline: none;
            letter-spacing: 3px;
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

    @media screen and (max-width: 1366px) {
      .login-panel {
        display: inline-block;
        position: absolute;
        top: 50%;
        margin-top: -170px;
        left: 50%;
        margin-left: -320px;
        height: 340px;
        width: 640px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 2px 2px 5px #888888;
        overflow: hidden;

        .login-welcome {
          float: left;
          width: 355px;
          height: 340px;
          background: url("./../assets/image/login_welcome_icon.png") no-repeat
            center;
          background-size: 80%;
        }

        .login-form {
          float: left;
          width: 260px;
          padding-top: 20px;

          input {
            height: 35px;
            border: 1px solid #1bd0a1;
            font-size: 14px;
            color: #464646;
            padding: 0 14px;
          }

          .login-form-title {
            font-size: 22px;
            color: #19c59e;
            text-align: center;
            margin-bottom: 20px;
          }

          .login-form-input {
            height: 35px;
            width: 100%;
            overflow: hidden;
            margin-bottom: 13px;

            input {
              float: left;
              width: calc(100% - 40px);
            }

            .login-user-icon {
              float: left;
              width: 35px;
              height: 35px;
              display: block;
              background: #1bd0a1 url("./../assets/image/login_user_icon.png")
                no-repeat center;
            }

            .login-pwd-icon {
              float: left;
              width: 35px;
              height: 35px;
              display: block;
              background: #1bd0a1 url("./../assets/image/login_pwd_icon.png")
                no-repeat center;
            }
          }

          .login-vercode {
            width: 100%;
            overflow: hidden;

            input {
              float: left;
              width: 150px;
            }

            .verification-image {
              border: none;
              background: #e4e4e4;
              color: #000;
              height: 35px;
              width: 95px;
              margin-left: 10px;
              outline: none;
              letter-spacing: 3px;
            }
          }

          .login-info {
            overflow: hidden;
            border-bottom: 1px dashed #1bd0a1;

            .auto-login {
              float: left;
              line-height: 35px;
            }

            .error-message {
              float: right;
              height: 35px;
              line-height: 35px;
              font-size: 10px;
              color: #f66a5c;
            }
          }

          .login-btn {
            margin: 0 auto;
            margin-top: 20px;
            width: 100%;
            height: 35px;
            line-height: 35px;
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

    .login-footer {
      height: 40px;
    }
  }

  .login-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #fff;
    height: 60px;
    line-height: 60px;
    font-size: 12px;
    color: #999999;
    text-align: center;
    font-family: "Simsun";
    a{
      color:#428bca;
    }
  }
}
</style>
