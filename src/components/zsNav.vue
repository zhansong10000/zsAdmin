<template>
  <div class="zs-side zs-bg-black">
    <div class="zs-side-scroll">
      <ul class="zs-nav zs-nav-tree site-demo-nav">
        <template v-for="(item,index) in navList">
          <li  v-if="item.children&&item.children.length>0" class="zs-nav-item" :class="{'zs-nav-itemed':item.isCur == true}" @mouseover="onMouseOver('1',$event)">
            <a  href="javascript:void(0);" @click="onNavItemClick(item,index)">{{item.name}}
              <span class="zs-nav-more" ></span>
            </a>
            <dl class="zs-nav-child">
              <dd  v-for="(child,childIndex) in item.children" :class="{'zs-this':activeIndex== index+'-'+childIndex}">
                <a href="javascript:void(0);" @click="onNavItemChildClick(child,index,childIndex)">{{child.name}}</a>
              </dd>
            </dl>
          </li>
          <li v-else class="zs-nav-item" :class="{'zs-this':activeIndex== index+'-0'}"  @mouseover="onMouseOver('1',$event)">
            <a  href="javascript:void(0);" @click="onNavItemChildClick(item,index,0)">{{item.name}}
            </a>
          </li>
        </template>
        <li class="zs-nav-item" style="height: 30px; text-align: center" @mouseover="onMouseOver('2',$event)"></li>
        <span class="zs-nav-bar" :style="navBarStyle"></span>
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
        activeIndex:-1,
        offsetTop:'',
        mouseType:'1'
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
      onNavItemChildClick(item,index,childIndex){
        this.activeIndex = index+'-'+childIndex;
        this.$emit('onNavItemClick',item);
      },
      onMouseOver(mouseType, event){
          this.mouseType = mouseType;
          this.offsetTop = event.currentTarget.offsetTop +'px';
      }
    },
    computed:{
      navBarStyle(){
          if(this.mouseType=="1"){
            return 'top: '+this.offsetTop+'; height: 45px; opacity: 1;';
          }else{
            return 'top: '+this.offsetTop+';height: 0px; opacity: 0;';
          }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .zs-bg-black {
    color: #fff !important;
    background-color: #393D49 !important;
  }

  .zs-side {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    width: 200px;
    overflow-x: hidden;
    .zs-side-scroll {
      position: relative;
      width: 220px;
      height: 100%;
      overflow-x: hidden
    }
  }

  .zs-nav {
    position: relative;
    padding: 0 20px;
    background-color: #393D49;
    color: #fff;
    border-radius: 2px;
    font-size: 0;
    box-sizing: border-box
  }

  .zs-nav {
    position: relative;
    padding: 0 20px;
    background-color: #393D49;
    color: #fff;
    border-radius: 2px;
    font-size: 0;
    box-sizing: border-box
  }

  .zs-nav * {
    font-size: 14px
  }

  .zs-nav .zs-nav-item {
    position: relative;
    display: inline-block;
    *display: inline;
    *zoom: 1;
    vertical-align: middle;
    line-height: 60px
  }

  .zs-nav .zs-nav-item a {
    display: block;
    padding: 0 20px;
    color: #fff;
    color: rgba(255, 255, 255, .7);
    transition: all .3s;
    -webkit-transition: all .3s
  }

  .zs-nav .zs-this:after, .zs-nav-bar, .zs-nav-tree .zs-nav-itemed:after {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 5px;
    background-color: #5FB878;
    transition: all .2s;
    -webkit-transition: all .2s
  }

  .zs-nav-bar {
    z-index: 1000
  }

  .zs-nav .zs-nav-item a:hover, .zs-nav .zs-this a {
    color: #fff
  }

  .zs-nav .zs-this:after {
    content: '';
    top: auto;
    bottom: 0;
    width: 100%
  }

  .zs-nav-img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 50%
  }

  .zs-nav .zs-nav-more {
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

  .zs-nav .zs-nav-mored, .zs-nav-itemed > a .zs-nav-more {
    margin-top: -9px;
    border-style: dashed dashed solid;
    border-color: transparent transparent #fff
  }

  .zs-nav-child {
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

  .zs-nav .zs-nav-child a {
    color: #333
  }

  .zs-nav .zs-nav-child a:hover {
    background-color: #f2f2f2;
    color: #000
  }

  .zs-nav-child dd {
    position: relative
  }

  .zs-nav .zs-nav-child dd.zs-this a, .zs-nav-child dd.zs-this {
    background-color: #5FB878;
    color: #fff
  }

  .zs-nav-child dd.zs-this:after {
    display: none
  }

  .zs-nav-tree {
    width: 200px;
    padding: 0
  }

  .zs-nav-tree .zs-nav-item {
    display: block;
    width: 100%;
    line-height: 45px
  }

  .zs-nav-tree .zs-nav-item a {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap
  }

  .zs-nav-tree .zs-nav-item a:hover {
    background-color: #4E5465
  }

  .zs-nav-tree .zs-nav-bar {
    width: 5px;
    height: 0;
    background-color: #009688
  }

  .zs-nav-tree .zs-nav-child dd.zs-this, .zs-nav-tree .zs-nav-child dd.zs-this a, .zs-nav-tree .zs-this, .zs-nav-tree .zs-this > a, .zs-nav-tree .zs-this > a:hover {
    background-color: #009688;
    color: #fff
  }

  .zs-nav-tree .zs-this:after {
    display: none
  }

  .zs-nav-itemed > a, .zs-nav-tree .zs-nav-title a, .zs-nav-tree .zs-nav-title a:hover {
    color: #fff !important
  }

  .zs-nav-tree .zs-nav-child {
    position: relative;
    z-index: 0;
    top: 0;
    border: none;
    box-shadow: none
  }

  .zs-nav-tree .zs-nav-child a {
    height: 40px;
    line-height: 40px;
    color: #fff;
    color: rgba(255, 255, 255, .7)
  }

  .zs-nav-tree .zs-nav-child, .zs-nav-tree .zs-nav-child a:hover {
    background: 0 0;
    color: #fff
  }

  .zs-nav-tree .zs-nav-more {
    right: 10px
  }

  .zs-nav-itemed > .zs-nav-child {
    display: block;
    padding: 0;
    background-color: rgba(0, 0, 0, .3) !important
  }

  .zs-nav-itemed > .zs-nav-child > .zs-this > .zs-nav-child {
    display: block
  }

  .zs-nav-side {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    z-index: 999
  }

  .zs-bg-blue .zs-nav-bar, .zs-bg-blue .zs-nav-itemed:after, .zs-bg-blue .zs-this:after {
    background-color: #93D1FF
  }

  .zs-bg-blue .zs-nav-child dd.zs-this {
    background-color: #1E9FFF
  }

  .zs-bg-blue .zs-nav-itemed > a, .zs-nav-tree.zs-bg-blue .zs-nav-title a, .zs-nav-tree.zs-bg-blue .zs-nav-title a:hover {
    background-color: #007DDB !important
  }

</style>
