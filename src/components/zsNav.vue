<template>
  <div class="layui-side layui-bg-black">
    <div class="layui-side-scroll">
      <ul class="layui-nav layui-nav-tree site-demo-nav">
        <template v-for="(item,index) in navList">
          <li  :class="{'layui-nav-itemed':item.isCur == true,'layui-nav-item':true}" @mouseover="onMouseOver('鼠标从我上面滑过',$event)">
            <a  href="javascript:void(0);" @click="onNavItemClick(item,index)">{{item.name}}
              <span class="layui-nav-more" v-if="item.children&&item.children.length>0"></span>
            </a>
            <dl class="layui-nav-child" v-if="item.children&&item.children.length>0">
              <dd  v-for="(child,childIndex) in item.children" :class="{'layui-this':activeIndex== index+'-'+childIndex}">
                <a href="javascript:void(0);" @click="onNavItemChildClick(child,index,childIndex)">{{child.name}}</a>
              </dd>
            </dl>
          </li>
        </template>
        <li class="layui-nav-item" style="height: 30px; text-align: center"></li>
        <span class="layui-nav-bar" style="top: 202.5px; height: 45px; opacity: 1;"></span>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: "zs-nav",
    props: {
      navList: {
        type: Array,
        default: function () {
          return [];
        }
      }
    },
    data(){
      return{
        activeIndex:-1
      }
    },
    mounted(){
     /* for(let item of this.navList){
        item.isCur = true;
        this.dataList.push(item);
      }*/
    },
    methods:{
      onNavItemClick(item,index){
        let vm = this;
        if(!item.isCur){
          item.isCur = true;
        }else{
          item.isCur = false;
        }
        vm.$set(vm.navList, index, item);
      },
      onNavItemChildClick(child,index,childIndex){
        this.activeIndex = index+'-'+childIndex;
      },
      onMouseOver(message, event){
        console.log(event);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .layui-bg-black {
    color: #fff !important;
    background-color: #393D49 !important;
  }

  .layui-side {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    width: 200px;
    overflow-x: hidden;
    .layui-side-scroll {
      position: relative;
      width: 220px;
      height: 100%;
      overflow-x: hidden
    }
  }

  .layui-nav {
    position: relative;
    padding: 0 20px;
    background-color: #393D49;
    color: #fff;
    border-radius: 2px;
    font-size: 0;
    box-sizing: border-box
  }

  .layui-nav {
    position: relative;
    padding: 0 20px;
    background-color: #393D49;
    color: #fff;
    border-radius: 2px;
    font-size: 0;
    box-sizing: border-box
  }

  .layui-nav * {
    font-size: 14px
  }

  .layui-nav .layui-nav-item {
    position: relative;
    display: inline-block;
    *display: inline;
    *zoom: 1;
    vertical-align: middle;
    line-height: 60px
  }

  .layui-nav .layui-nav-item a {
    display: block;
    padding: 0 20px;
    color: #fff;
    color: rgba(255, 255, 255, .7);
    transition: all .3s;
    -webkit-transition: all .3s
  }

  .layui-nav .layui-this:after, .layui-nav-bar, .layui-nav-tree .layui-nav-itemed:after {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 5px;
    background-color: #5FB878;
    transition: all .2s;
    -webkit-transition: all .2s
  }

  .layui-nav-bar {
    z-index: 1000
  }

  .layui-nav .layui-nav-item a:hover, .layui-nav .layui-this a {
    color: #fff
  }

  .layui-nav .layui-this:after {
    content: '';
    top: auto;
    bottom: 0;
    width: 100%
  }

  .layui-nav-img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%
  }

  .layui-nav .layui-nav-more {
    content: '';
    width: 0;
    height: 0;
    border-style: solid dashed dashed;
    border-color: #fff transparent transparent;
    overflow: hidden;
    cursor: pointer;
    transition: all .2s;
    -webkit-transition: all .2s;
    position: absolute;
    top: 50%;
    right: 3px;
    margin-top: -3px;
    border-width: 6px;
    border-top-color: rgba(255, 255, 255, .7)
  }

  .layui-nav .layui-nav-mored, .layui-nav-itemed > a .layui-nav-more {
    margin-top: -9px;
    border-style: dashed dashed solid;
    border-color: transparent transparent #fff
  }

  .layui-nav-child {
    display: none;
    position: absolute;
    left: 0;
    top: 65px;
    min-width: 100%;
    line-height: 36px;
    padding: 5px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
    border: 1px solid #d2d2d2;
    background-color: #fff;
    z-index: 100;
    border-radius: 2px;
    white-space: nowrap
  }

  .layui-nav .layui-nav-child a {
    color: #333
  }

  .layui-nav .layui-nav-child a:hover {
    background-color: #f2f2f2;
    color: #000
  }

  .layui-nav-child dd {
    position: relative
  }

  .layui-nav .layui-nav-child dd.layui-this a, .layui-nav-child dd.layui-this {
    background-color: #5FB878;
    color: #fff
  }

  .layui-nav-child dd.layui-this:after {
    display: none
  }

  .layui-nav-tree {
    width: 200px;
    padding: 0
  }

  .layui-nav-tree .layui-nav-item {
    display: block;
    width: 100%;
    line-height: 45px
  }

  .layui-nav-tree .layui-nav-item a {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap
  }

  .layui-nav-tree .layui-nav-item a:hover {
    background-color: #4E5465
  }

  .layui-nav-tree .layui-nav-bar {
    width: 5px;
    height: 0;
    background-color: #009688
  }

  .layui-nav-tree .layui-nav-child dd.layui-this, .layui-nav-tree .layui-nav-child dd.layui-this a, .layui-nav-tree .layui-this, .layui-nav-tree .layui-this > a, .layui-nav-tree .layui-this > a:hover {
    background-color: #009688;
    color: #fff
  }

  .layui-nav-tree .layui-this:after {
    display: none
  }

  .layui-nav-itemed > a, .layui-nav-tree .layui-nav-title a, .layui-nav-tree .layui-nav-title a:hover {
    color: #fff !important
  }

  .layui-nav-tree .layui-nav-child {
    position: relative;
    z-index: 0;
    top: 0;
    border: none;
    box-shadow: none
  }

  .layui-nav-tree .layui-nav-child a {
    height: 40px;
    line-height: 40px;
    color: #fff;
    color: rgba(255, 255, 255, .7)
  }

  .layui-nav-tree .layui-nav-child, .layui-nav-tree .layui-nav-child a:hover {
    background: 0 0;
    color: #fff
  }

  .layui-nav-tree .layui-nav-more {
    right: 10px
  }

  .layui-nav-itemed > .layui-nav-child {
    display: block;
    padding: 0;
    background-color: rgba(0, 0, 0, .3) !important
  }

  .layui-nav-itemed > .layui-nav-child > .layui-this > .layui-nav-child {
    display: block
  }

  .layui-nav-side {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    z-index: 999
  }

  .layui-bg-blue .layui-nav-bar, .layui-bg-blue .layui-nav-itemed:after, .layui-bg-blue .layui-this:after {
    background-color: #93D1FF
  }

  .layui-bg-blue .layui-nav-child dd.layui-this {
    background-color: #1E9FFF
  }

  .layui-bg-blue .layui-nav-itemed > a, .layui-nav-tree.layui-bg-blue .layui-nav-title a, .layui-nav-tree.layui-bg-blue .layui-nav-title a:hover {
    background-color: #007DDB !important
  }

</style>
