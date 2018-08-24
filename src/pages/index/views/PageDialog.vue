<template>

  <div style="width: 100%;">
    <a herf="javascript:void(0)"  class="zs-btn zs-btn-primary"  @click="dialogVisible = true"> 弹出窗口</a>
    <a herf="javascript:void(0)"  class="zs-btn zs-btn-primary"  @click="showConfirm"> 弹出Confirm</a>
    <a herf="javascript:void(0)"  class="zs-btn zs-btn-primary"  @click="showAlert" > 弹出Alert</a>
    <zs-dialog :showDialog="dialogVisible" :moveDialog="true" :width="900" :height="550" @close="closeDialog">
      <template slot="content">
        <h1>Here might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere
          might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might
          be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a
          page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page
          titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page
          titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page
          titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page
          titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page
          titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page
          titleHere might be a page title</h1>
      </template>
      <template slot="button">
        <a class="zs-btn zs-btn-primary zs-btn-sm">确定</a>
        <a class="zs-btn zs-btn-normal zs-btn-sm">取消</a>
      </template>
    </zs-dialog>
  </div>

</template>
<script>
  import Vue from 'vue'
  import {zsMessage} from '@/components/zsui/src';

  export default {
    name: 'pageDialog',
    data() {
      return {
        dialogVisible: false,
      }
    },
    mounted() {

    },
    methods: {
      closeDialog(val) {
        this.dialogVisible = val;
      },
      showAlert(){
        zsMessage.alert("内容","标题");
      },
      showConfirm(){
        zsMessage.confirm("内容","标题").then(action => {
            alert(action)
        }).catch(action => {
            alert(action)
        });
      }
    }
  }
</script>
<style>

</style>
