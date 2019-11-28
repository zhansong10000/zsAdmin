<template>
  <div style="width:100%;">
    <div class="zs_head">
      <div class="head-left">吉祥社验光配镜中心</div>
      <div class="head-right">
        <em></em>
        <div
          class="user-info"
          @mouseenter="showPanl=true"
          @mouseleave="showPanl=false"
          v-if="userInfo"
        >
          {{userInfo.nickname}}
          <span class="head-icon-down"></span>
          <ul class="head-tabs show-layer-fadeIn" :class="{'zs-show':showPanl}">
            <li class="tab-item" @click.stop="showModifyPwd">
              <i class="zs-icon zs-icon-bianji"></i>
              <span>修改密码</span>
            </li>
            <li class="tab-item" @click.stop="logout">
              <i class="zs-icon zs-icon-tuichu"></i>
              <span>退出</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <zs-dialog
      :showDialog="showEditDialog"
      @close="showEditDialog = false"
      title="修改密码"
      width="450"
      height="300"
    >
      <template slot="content">
        <el-form ref="form" :model="modelForm" :rules="rules" label-width="90px">
          <el-form-item label="当前密码" prop="pwd">
            <el-input v-model="modelForm.pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="modelForm.newPwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="newPwd">
            <el-input v-model="modelForm.newPwdConfirm" type="password"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template slot="button">
        <el-button type="primary" size="small" @click="savePwd">保存</el-button>
        <el-button size="small" @click="showEditDialog = false">关闭</el-button>
      </template>
    </zs-dialog>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "zs-head",
  data() {
    let vm = this;
    return {
      showPanl: false,
      showEditDialog: false,
      modelForm: {
        pwd: "",
        newPwd: "",
        newPwdConfirm: ""
      },
      rules: {
        pwd: [{ required: true, message: "不能为空", trigger: "blur" }],
        newPwd: [{ required: true, message: "不能为空", trigger: "blur" }],
        newPwdConfirm: [
          { required: true, message: "不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getUserInfo();
    this.isLogin();
  },
  methods: {
    isLogin() {
      if (this.userInfo) {
        return;
      }
      this.$alert("会话已超时,请返回登录页面", {
        confirmButtonText: "确定",
        callback: action => {
          window.location.href = "login.html";
        }
      });
    },
    showModifyPwd() {
      for (let key in this.modelForm) {
        this.modelForm[key] = "";
      }
      this.showEditDialog = true;
    },
    savePwd() {
      let vm = this;
      vm.$refs.form.validate(valid => {
        if (valid) {
          vm.$http({
            method: "post",
            url: "/sys/user/updatePwd",
            params: vm.modelForm
          })
            .then(result => {
              if (result.code == 0) {
                vm.$success("保存成功");
                this.showEditDialog = false;
              } else {
                vm.$error(result.msg);
              }
            })
            .catch(error => {});
        }
      });
    },
    logout() {
      let vm = this;
      vm.$confirm("此操作将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          vm.$http({
            method: "get",
            url: "page/sys/logout"
          })
            .then(result => {
              if (result.code == 0) {
                window.location.href = "login.html";
              } else {
                vm.$error(result.msg);
              }
            })
            .catch(error => {});
        })
        .catch(() => {});
    },
    ...mapMutations({
      getUserInfo: "GET_USER_INFO"
    })
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  }
};
</script>
<style lang="scss" scoped>
.zs_head {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .head-left {
    float: left;
    clear: both;
    display: flex;
    align-items: center;
    padding-left: 15px;
    font-size: 24px;
    font-weight: 600;
    color: #fff;
    width: 270px;
    background: url(../../assets/image/logo.png) no-repeat left center;
    text-indent: -9999px;
    margin-left: 10px;
  }
  .head-right {
    float: right;
    display: flex;
    align-items: center;
    padding-right: 15px;
    em {
      width: 30px;
      height: 30px;
      margin-right: 8px;
      display: inline-block;
      background-size: 100%;
      background-image: url("../../assets/image/user_head_logo.png");
    }
    .user-info {
      position: relative;
      display: flex;
      cursor: pointer;
      color: #fff;
      font-weight: 400;
      font-size: 15px;
      height: 100%;
      align-items: center;
    }
    .head-icon-down {
      content: "";
      width: 0;
      height: 0;
      margin-top: 10px;
      margin-left: 8px;
      border-style: solid dashed dashed;
      border-color: #fff transparent transparent;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.2s;
      border-width: 8px;
      border-top-color: #fff;
    }
    .head-tabs {
      display: none;
      position: absolute;
      right: 5px;
      top: 54px;
      z-index: 999;
      border: 1px solid #e6ebf5;
      border-radius: 2px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
      background-color: #fff;
      transform-origin: center top;
      .tab-item {
        width: 160px;
        line-height: 36px;
        padding: 0 10px;
        color: #333;
        border-bottom: 1px solid#ebeef5;
        i {
          margin: 0 5px;
          font-size: 16px;
        }
        span {
          font-size: 13px;
        }
      }
      :last-child {
        border-bottom: none;
      }
      .tab-item:hover {
        background: #f2f2f2;
      }
    }
  }
}
</style>