<template>
  <div class="login" style="height:100%">
    <div class="login-header">
       <!-- <img class="company-logo" src="./../assets/image/company_logo.png"/> -->
      <div class="login-inner">
        <h1 class="web-title">吉祥社验光配镜中心</h1>
      </div>
    </div>
    <div class="login-main">
      <div class="login-inner">
        <div class="login-panel">
          <div class="login-form">
            <div class="login-form-title">登 录 LOGIN</div>
            <div class="login-form-input login-form-username" :class="{active: userActive}">
              <span class="login-user-icon"></span>
              <input v-model="userName" placeholder="请输入账号" type="text" @focus="errorMsg ='' || toFocus('user')" @blur="toBlur" />
            </div>
            <div class="login-form-input login-form-userpwd" :class="{active: pwdActive}">
              <span class="login-pwd-icon"></span>
              <input v-model="pwd" placeholder="请输入密码" type="password" @focus="errorMsg ='' || toFocus('pwd')" @blur="toBlur" />
            </div>
            <div class="login-form-input login-vercode" :class="{active: codeActive}">
              <input v-model="captcha" placeholder="请输入验证码" @focus="errorMsg ='' || toFocus('code')" @blur="toBlur"/>
              <img class="vercode-image" :src="vertifyCodeSrc" @click="getCode()" />
            </div>
            <div class="login-info">
              <div class="error-message">
                <span class="error-txt">{{errorMsg}}</span>
              </div>
            </div>
            <div class="login-btn pointer" @click="login">登 录</div>
          </div>
        </div>
      </div>
    </div>
    <div class="login-footer">粤ICP备11108557号-20</div>
  </div>
</template>
<script>
// 导入样式
import "@/assets/css/common.scss";
import { mapMutations } from "vuex";
export default {
  name: "login",
  components: {},
  data() {
    return {
      userName: "",
      pwd: "",
      captcha: "",
      vertifyCodeSrc: "/jxs/page/captcha.jpg",
      errorMsg: "",
      userActive: false,
      pwdActive: false,
      codeActive: false,
    };
  },
  beforeCreate() {},
  created() {},
  mounted() {},
  methods: {
    toFocus(val){
      if (val === 'user') {
        this.userActive = true
        this.pwdActive = false
        this.codeActive = false
      }
      else if (val === 'pwd') {
        this.userActive = false
        this.pwdActive = true
        this.codeActive = false
      }
      else {
        this.userActive = false
        this.pwdActive = false
        this.codeActive = true
      }
    },
    toBlur(){
      this.userActive = false
      this.pwdActive = false
      this.codeActive = false
    },
    login() {
      let that = this;
      that.errorMsg = "";
      if (that.userName === "" || that.pwd === "" || that.captcha === "") {
        that.errorMsg = "用户名、密码和验证码不能为空";
        return;
      }
      that
        .$http({
          method: "post",
          url: "sys/common/login",
          params: {
            userName: that.userName,
            pwd: that.pwd,
            captcha: that.captcha
          }
        })
        .then(result => {
          if (result.code == 0) {
            let userInfo = result.data;
            this.setUserInfo(userInfo);
            window.location.href = "index.html";
          } else {
            that.errorMsg = result.message;
            that.getCode();
          }
        })
        .catch(error => {});
    },
    getCode() {
      this.vertifyCodeSrc = "/jxs/page/captcha.jpg?c=" + Math.random();
    },
    ...mapMutations({
      setUserInfo: "SET_USER_INFO"
    })
  }
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
html,body{
  height: 100%;
  background: #b2e1ff;
}
input:-webkit-autofill , textarea:-webkit-autofill, select:-webkit-autofill {
    -webkit-text-fill-color: #ededed !important;
    background-color:transparent;
    background-image: none;
    transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
}
.login{
  background: #b2e1ff;
}
.login-header {
  width: 100%;
  height: 72px;
  // background: #00ceab;
  // border-bottom: 1px solid #52ddc3;
  .login-inner{
    width: 1200px;
    margin: 0 auto;
    &:before{
      content: "";
      display: table;
    }
  }
  .company-logo {
    float: left;
    margin: 18px 30px;
  }

  .web-title {
    // float: left;
    margin: 25px auto 0;
    padding-left: 30px;
    height: 36px;
    line-height: 36px;
    // border-left: 1px solid #52ddc3;
    font-size: 28px;
    color: #333;
    font-weight: normal;
    width: 269px;
    height: 54px;
    background: url(assets/image/logo.png) no-repeat top left;
    text-indent: -9999px;
    
  }
}

.login-main {
  width: 100%;
  height: calc(100% - 100px);
  // background: #00ceab;
  // position: absolute;
  // top: 72px;
  // bottom: 40px;
  // display: flex;
  // flex-flow: row nowrap;
  // justify-content: center;
  // align-items: center;
  .login-inner{
    width: 1200px;
    margin: 0 auto;
    height: 100%;
    position: relative;
  }
  .login-panel {
    height: 394px;
    width: 358px;
    background: #fff;
    border-radius: 8px;
    // box-shadow: 2px 2px 5px #ddd;
    display: flex;
    flex-flow: row nowrap;
    // justify-content: center;
    // position: absolute;
    // right: 0;
    // top: 30px;
    margin: 25px auto;
    .login-form {
      padding-top: 20px;
      width: 300px;
      margin: 0 auto;
      input {
        height: 43px;
        border: 1px solid #ddd;
        font-size: 14px;
        color: #464646;
        padding: 0 14px;
        outline: none;
        border-radius: 5px;
      }

      .login-form-title {
        font-size: 20px;
        color: #e52d11;
        text-align: center;
        margin-bottom: 30px;
        border-bottom: 1px solid #eee;
        padding-bottom: 20px;
      }

      .login-form-input {
        height: 43px;
        width: 100%;
        overflow: hidden;
        margin-bottom: 13px;
        border: 1px solid #ddd;
        border-radius: 5px;
        &.active{
          border: 1px solid #aaa;
          box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
        }
        input {
          float: left;
          width: calc(100% - 47px);
          border: transparent;
        }
        .login-user-icon,.login-pwd-icon{
           background: url("./assets/image/loginIcon.png") no-repeat;
           margin-top: 5px;
        }
        .login-user-icon {
          float: left;
          width: 42px;
          height: 31px;
          display: block;
          background-position: 0 0;
        }

        .login-pwd-icon {
          float: left;
          width: 42px;
          height: 31px;
          display: block;
          background-position: 0 -31px;
        }
      }

      .login-vercode {
        width: 100%;
        overflow: hidden;

        input {
          float: left;
          width: 165px;
        }

        .vercode-image {
          border: none;
          background: #e4e4e4;
          color: #000;
          height: 36px;
          width: 110px;
          margin-left: 20px;
          outline: none;
          letter-spacing: 3px;
          cursor: pointer;
          margin-top: 2px;
          border-radius: 3px;
        }
      }

      .login-info {
        overflow: hidden;
        border-bottom: 1px dashed #dddee1;

        .auto-login {
          float: left;
          line-height: 38px;
        }

        .error-message {
          // float: right;
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          // background: rgba(255,73,73,0.15);
          border-radius: 2px;
          margin-bottom: 5px;
          color: #e52d11;
          padding-left: 3px;
          // .error-txt{
          //   height: 30px;
          //   line-height: 30px;
          //   border-radius: 2px;
          //   padding: 0 10px;
          //   background: rgba(255,73,73,0.15);
          // }
        }
      }

      .login-btn {
        margin: 0 auto;
        margin-top: 30px;
        width: 100%;
        height: 44px;
        line-height: 44px;
        background-image: linear-gradient(to right, #e52d11, #ff5e46);
        font-size: 18px;
        text-align: center;
        color: #fff;
        border-radius: 4px;
        // font-family: "SimSun";
        // font-weight: bold;
        &:hover{
          background: #e52d11;
        }
      }
    }
  }
}
.login-footer{
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  height: 86px;
  line-height: 86px;
  background: rgba(0,0,0,0.1);
  color: #fff;
}
</style>
