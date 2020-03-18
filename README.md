前言：
===
此为编写此前端全思路.

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
  ```
  可想而知,此页面大多是引入自定义组件。
  其中:cityData表示向navigation子组件传了name是cityData的属性，同时:cityData是v-bind:cityData的意思，后面写的是变量
  ### ./components
