<template>
  <div class="zs-pagetabs">
    <div class="zs-icon zs-tabs-control zs-icon-prev" layadmin-event="leftPage"></div>
    <div class="zs-icon zs-tabs-control zs-icon-next" layadmin-event="rightPage"></div>
    <div class="zs-tab">
      <ul class="zs-tab-title"  style="left: 0px;">
        <template  v-for="(item,index) in dataList" >
          <li :class="{'zs-this':item.isSelect}" @click ="clickItem(item,index)">
            <span>{{item.name}}</span>
            <i class="zs-icon zs-unselect zs-tab-close" @click.stop="removeItem(item,index)">&#x1006;</i>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: "zs-navTab",
    props: {
      dataList: {
        type: Array,
        default:()=>{
          [];
        }
      },
      newItem:{
        type:Object,
        default:()=>{
          return null;
        }
      }
    },
    data(){
      return{
        activeIndex:-1,
        offsetTop:'',
        mouseType:'1'
      }
    },
    mounted(){

    },
    methods:{
      addItem(item){
        let vm = this;
        let isExist = false;
        for(let i = 0 ;i<vm.dataList.length;i++){
          let temp = this.dataList[i];
          if(temp.name == item.name){
            temp.isSelect = true;
            isExist = true;
          }else{
            temp.isSelect = false;
          }
          vm.$set(vm.dataList, i, temp);
        }
        if(this.dataList.length==0||!isExist){
          item.isSelect = true;
          this.dataList.push(item)
        }
      },
      removeItem(item,index){
        var vm = this;
        if(item.isSelect){
          var nextIndex = index-1;
          if(nextIndex<0){
             nextIndex =1 ;
          }
          var nextItem = vm.dataList[nextIndex];
          if(nextItem){
            this.setSelectItem(nextItem,nextIndex);
            nextItem.isSelect = true;
            vm.$set(vm.dataList, nextIndex, nextItem);
            this.$emit('onItemSelect',nextItem);
          }else{
            this.$emit('onItemSelect');
          }
        }
        this.dataList.splice(index,1);
      },
      clickItem(item,index){
        this.setSelectItem(item,index);
      },
      setSelectItem(item,index){
        let vm = this;
        for(let temp of vm.dataList){
          temp.isSelect = false;
        }
        item.isSelect = true;
        vm.$set(vm.dataList, index, item);
        this.$emit('onItemSelect',item);
      }
    },
    computed:{
    },
    watch: {
      newItem(newVal, oldVal){
        this.addItem(newVal);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .zs-pagetabs {
    height: 40px;
    line-height: 40px;
    padding: 0 80px 0 40px;
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .1);
    transition: all .3s;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    left: 220px;
    .zs-icon-prev {
      left: 0;
      border-left: none;
      border-right: 1px solid #f6f6f6;
      &:before{
        content: "\e65a";
      }
    }
    .zs-icon-next {
      right: 40px;
      &:before{
        content: "\e65b";
      }
    }
    .zs-tabs-control {
      position: absolute;
      top: 0;
      width: 40px;
      height: 100%;
      text-align: center;
      cursor: pointer;
      transition: all .3s;
      -webkit-transition: all .3s;
      box-sizing: border-box;
      border-left: 1px solid #f6f6f6;
    }
    .zs-tab {
      margin: 0;
      overflow: hidden;
      text-align: left !important;
    }
    .zs-tab-title {
      height: 40px;
      border: none;
      .zs-this {
        color: #000;
        background-color: #f6f6f6;
        &:after {
          width: 100%;
          border: none;
          height: 2px;
          background-color: #292B34;
        }
        &:hover {
          background-color: #f6f6f6;
          &:after {
            width: 100%;
          }
        }
      }
      li {
        min-width: 0;
        line-height: 40px;
        max-width: 160px;
        text-overflow: ellipsis;
        padding-right: 40px;
        overflow: hidden;
        color: #666;
        border-right: 1px solid #f6f6f6;
        vertical-align: top;
        .zs-tab-close {
          position: absolute;
          right: 8px;
          top: 50%;
          margin: -7px 0 0;
          width: 16px;
          height: 16px;
          line-height: 16px;
          border-radius: 50%;
          font-size: 12px;
          &:hover{
            background-color: #FF5722;
            color: #fff;
          }
        }
        &:hover {
          background-color: #f6f6f6;
          &:after {
            width: 100%;
          }
        }
        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 2px;
          border-radius: 0;
          background-color: #292B34;
          transition: all .3s;
          -webkit-transition: all .3s;
        }
      }
    }
  }

  .zs-tab {
    text-align: left !important;
  }
  .zs-tab-title {
    position: relative;
    left: 0;
    height: 40px;
    white-space: nowrap;
    font-size: 0;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    transition: all .2s;
    -webkit-transition: all .2s;
    li {
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      transition: all .2s;
      -webkit-transition: all .2s;
      position: relative;
      line-height: 40px;
      min-width: 65px;
      padding: 0 15px;
      text-align: center;
      cursor: pointer;
    }
  }


</style>
