前言：
===
此为编写此前端稍微有用的思路.

安装：
---
elementUI(前期),
vuex(单纯用来存储本地测试和上线的地址),
axios,
vueAmap(高德地图,了解部分api，只是用来添加项目的不同之处)
vuecookie(个人实现的和localstorage的作用无异)
jquery(便于编写代码)
iconfont(好看的图标)

编写
---
### ./components/CopyMap(当时就这个未用小驼峰式编写)


高德地图的编写(main.js引入插件省略)
高德地图在vue里以组件形式来呈现
```
 <div class="amap-wrapper">
  </div>
  
  
  .amap-wrapper {
    width: 1440px;
    height: 600px;

  }
  ```
  需要设置宽高
  介绍一个主要的功能，查询地址
  ```
  geoCode() {
      var geocoder = new AMap.Geocoder({
        
    });
        var address  = document.getElementById("province").value+"-"+document.getElementById("city").value;
        console.log(address)
        geocoder.getLocation(address, function(status, result) {
            if (status === 'complete'&&result.geocodes.length) {
                var lnglat = result.geocodes[0].location
                document.getElementById('lnglat').value = lnglat;
                console.log(lnglat)
            }else{
                console.log('根据地址查询位置失败');
            }
        });
    },  
```
    
 需要创建一个实例，getLocation是地址转经纬度，我是用来实现将一个详细的地址保存为地图上的点，而保存点需要知道经纬度
 
  ### ./components/complexFirstPage(地图点击后第一个页面)
  下面介绍有用的点
  ## 1.动画
  ```
@keyframes appearLeft{
  from{
    opacity: 0;
    /*margin-left: -100px;*/
    transform:translate(-100px)
  }
  to{
    opacity: 1;
    /*margin-left: 15px;*/
    transform:translate(0px);
  }
}
.animation1{
  animation: appearLeft 2s ;
}
  ```
  再在created里用jquery来控制animation-delay
  ```
      let $animation1=$(".animation1");
    $animation1.each((index,val)=>{
      $(val).css("animation-duration",`${index+1}s`)
    })
 ```
  这里就是利用 jquery 里的each,专门用来遍历jquery对象的,即$animation1
  其次，需要注意each传的回调函数里第一个参数是下标,第二个参数是dom元素！
  所以里面如果再需要使用jquery还得再利用一次jq核心函数，才能调用jq的api
  这里实现的就是我定义的几个组件依次进入页面的代码，强调时序性
  
  ## 2.前后端图片传输
  ```
  axios.get(`${this.$store.state.nodeAdd}/download/12345?picName=test1.png`,{
      responseType: 'arraybuffer'
    }).then(response=>{
      return 'data:image/png;base64,' + btoa(
        new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
    }).then(result=>{
      this.pic=result
    });
  ```
  axios其实就是用promise封装了ajax，所以会有then
  这里表明需要接收的类型是arraybuffer
  之后利用then回调函数返回字符串(利用reduce来做归并操作)
  之后result接收字符串，此时就是图片的字节流了，img的src是能解析字节流的
  
  ```
  var formData=new FormData();
    var file =document.getElementById("file").files[0];
    var provinceName=this.$cookies.get("provinceName");
    formData.append('filess',file);
    console.log(provinceName)
    $.ajax({
      async:true,
      url:`${this.$store.state.nodeAdd}/getProName?provinceName=${provinceName}`,
      type:"get",
      success:function(data){
        console.log("省份上传")
      }
    })
    $.ajax({
      url:`${this.$store.state.nodeAdd}/preserve`,
      contentType:false,
      type:"post",
      data:formData,
      processData: false,
      success:function (data) {
        that.$message({
          type: 'success',
          message: '上传成功!'
        });
        that.reload()
      }
    })
  ```
  这是上传图片所用的函数，
  利用formdata，以及ajax，设置async=true是为了后一个ajax所需的值的传递(具体操作在后端完成)
  上传成功后用vue的reload()不闪屏式刷新
  
   ### ./components/complexSecondPage(第三个页面)
  
  ```
  <template>
  <div class="complexSecondPage">
    <navigation :cityData="oneProvince" @beActive="beActive"></navigation>
    <p><el-radio v-model="radio" label="1">按时间</el-radio>
      <el-radio v-model="radio" label="2">按热度</el-radio></p>
      <timeline :cards="city.cards">
       
      </timeline>
    </div>
  </template>
  
  
  import navigation from './navigation'
    import mycard from "./mycard"
    import timeline from './timeline'

 export default {
      name: 'complexSecondPage',
      components: {
       navigation,
       mycard,
       timeline
     },
     }
  ```
  可想而知,此页面大多是引入自定义组件。
  其中:cityData表示向navigation子组件传了name是cityData的属性，同时:cityData是v-bind:cityData的意思，后面写的是变量。
  其次 @beActive="beActive"是子组件传给父组件值。子组件通过this.$emit("beActive",...)来传值，父组件用@beActive="func"来接收
  这里也需要注册引入自定义组件，import引入，在components里注册
  ### ./components/navigation
  用于侧方导航栏
  主要是用动画增添了趣味性，
  transition:all 1s ;
  利用transition进行平缓过渡，实现动画效果(因为动画效果简单，所以用transition，如果复杂动画，需要使用keyframes)
  同时
   ```
  var part =document.querySelectorAll(".part");
        part.forEach(function(val,index){
          if(val.classList.contains("rotateX")){
            val.classList.remove("rotateX")
            val.classList.toggle("opacity",false)
          }
         
  ```
   利用val.classList.toggle("opacity",false)用来移出dom元素的opacity类(当第二个参数是true，如果原classList包含opacity，则不操作，若原classList不包含opacity，则添加)
   当然，这里代码太杂碎了，也可以利用vue动态绑定class 
  
  ### ./components/timeline
  
学会用防抖控制scroll监听器。
```
debounce(fn, wait) {    
    var timeout = null;    
    return function() {        
        if(timeout !== null)   clearTimeout(timeout);        
        timeout = setTimeout(fn, wait);    
    }
   
```
然后在created钩子函数里创建scroll事件监听
```
window.addEventListener('scroll',this.debounce(this.handleScroll,500),true)
```

其次
```
async getComment(e){
  var cardBody=e.target;
  let index=e.target.getAttribute("data-index")
  var cardId=this.cards[index].cardId;
  await axios.get(`${this.$store.state.nodeAdd}/selectComments?cardId=${cardId}`)
  .then(data=>{
    this.cards[index].comments=data.data
  })
  let divList=cardBody.previousElementSibling.childNodes;
  for(let i=0;i<divList.length;i++){
    divList[i].style.transform=`translate(${i*300}px,0px)`;
    divList[i].style.color=`rgb${this.rgb()}`
    divList[i].style.animationDelay=` ${i*2}s `
    if(i==divList.length-1){
      cardBody.classList.toggle("translucent",true);
    }
  }
```
这里是利用 async 申明这是异步函数，这样就能在函数里面使用await，当然，async 申明的另一意义在于返回出去的是一个promise对象
await用于等待这个后面的异步函数执行完成。
```
li{
  position: relative;
  list-style: none;
  height: 250px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  --left: 50%;
}
```
用于flex布局
### ./components/showPic
3D相册的编写
```
defaultAni(){
 let img = document.querySelectorAll('img');
 let container =document.querySelector(".container")
 for (let i = 0; i < img.length; i++) {
        // 图片旋转分散 36°
        img[i].classList.toggle("leftTop",true)
        img[i].classList.toggle("relative",false)
        img[i].style.transform = 'rotateY(' + i * 360 / img.length + 'deg) translateZ(300px)';
        img[i].style.transition = 'transform 1s ' + (img.length - i) * 0.1 + 's';
      }
      container.classList.toggle("mymoveAni",true)
    }
 ```
 transition就是设置过渡效果
 
 下面设置相册自动旋转
 ```
 .mymoveAni{
 animation: mymove 6s infinite linear;
}
  @keyframes mymove{
   from{
     transform:rotateY(360deg);
   }
   to{
    transform:rotateY(0deg);
  }
}
```
 
