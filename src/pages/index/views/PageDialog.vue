<template>

  <div style="width: 100%;">
    <a herf="javascript:void(0)" @click="dialogVisible = true"> 弹出窗口 弹出窗口 弹出窗口 弹出窗口 弹出窗口 弹出窗口 弹出窗口 弹出窗口 弹出窗口 弹出窗口 弹出窗口</a>
    <zs-dialog :showDialog="dialogVisible" :moveDialog="true" :width="900" :height="550" @close="closeDialog">
      <template slot="content">
        <h1>Here might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page titleHere might be a page title</h1>
      </template>
      <template slot="button">
        <a class="zs-btn zs-btn-primary zs-btn-sm">确定</a>
        <a class="zs-btn zs-btn-normal zs-btn-sm">取消</a>
      </template>
    </zs-dialog>
  </div>

</template>
<script>

  export default {
    name:'pageDialog',
    data(){
      return{
        dialogVisible:false,
      }
    },
    components: {

    },
    mounted(){

    },
    methods:{
      closeDialog(val){
        this.dialogVisible = val;
      }
    }
  }
</script>
