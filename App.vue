<template>
  <div id="app">
    <router-link to="/FirstPage">
      第一页
    </router-link>
    <router-link to="/timeline">
      给访问的人看的第一页
    </router-link>
    <router-link to="/Skills">
      测试
    </router-link>
    <router-link to="/ceshi">
      真正测试
    </router-link>
    <router-link to="/CopyMap">
      复制的
    </router-link>
    <router-link to="/moban">
      模板
    </router-link>
        <router-link to="/SecondPage">
      第二页
    </router-link>
     <router-link to="/showPic">
      加载
    </router-link>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  
  provide () {
    return {
      reload: this.reload
    }
  },
  data(){
    return{
    isRouterAlive: true,
    }
  },
  methods:{
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
  },
  created(){
    axios.get(`${this.$store.state.address}/updateHits`).then((data)=>{
    })
  }
}
</script>

<style>
.inBottom{
    height: 30px;
    width: 300px;
    position: absolute;
    margin: 0 auto;
    bottom: 10px;
}
i{
  cursor: pointer;
}
.box-card {
    width: 300px;
    height: 200px;
    position: relative;
    display: inline-block;
  }
.emptyBox{
    width: 12px;
    height: 12px;
  } 
.beWide{
    margin-bottom: 20px;
  }
body{
  background: #E9EAED;
}
</style>
