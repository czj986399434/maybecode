// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAMap from 'vue-amap';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import '@/assets/css/iconfont/iconfont.css'
import echarts from 'echarts'
import VueCookies from 'vue-cookies'
import store from './store'
Vue.use(VueCookies);
Vue.prototype.$echarts = echarts;
Vue.use(echarts);
Vue.config.productionTip = false
Vue.use(VueAMap);
Vue.use(ElementUI);
VueAMap.initAMapApiLoader({
  key: '8658927f241caadbdfcc764245a1f1ee',
  plugin: [
    "AMap.Autocomplete", //输入提示插件
    "AMap.PlaceSearch", //POI搜索插件
    "AMap.Scale", //右下角缩略图插件 比例尺
    "AMap.OverView", //地图鹰眼插件
    "AMap.ToolBar", //地图工具条
    "AMap.MapType", //类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
    "AMap.PolyEditor", //编辑 折线多，边形
    "AMap.CircleEditor", //圆形编辑器插件
    "AMap.Geolocation" ,//定位控件，用来获取和展示用户主机所在的经纬度位置
    "AMap.Geocoder"

  ],
  v: '1.4.4'
});
Vue.directive('morecolor',{
	bind(el,binding,vnode){
		var sum=Math.floor(Math.random()*(-484848)+888888)
		el.style.color="#"+sum;
	}
});
Vue.prototype.dateFormat= function(date){
   // return date.getFullYear()+"-"+date.getMonth()+1+"-"+date.getDate();
   return  `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

Vue.filter('hideW', function (value) {
  if(value.length>3){
    return value.slice(0,3)+".";
  }
  else{
    return value;
  }
})
Vue.filter("hideTowords",function(value){
  return value.slice(2,10)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
