import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const store=new Vuex.Store({
  state:{
    address:"http://49.234.216.21:8080",
    nodeAdd:"https://www.maybecode.cn:5001"
  }
})
export default store
