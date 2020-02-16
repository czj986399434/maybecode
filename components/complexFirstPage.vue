<template>
  <div class="complexFirstPage">

    <span class="floatLeft">
      <div class="head bloc beautifulShadow animation1">
        <img src="../../static/pic1.jpg" class="smallPicture leftMargin">
        
        <div class="frame">
          <h1 class="title">个人日记</h1>
          <h1 class="span1">dialog</h1>
          <a-loading scaleSize="0.5" class="aLoading"></a-loading>
        </div>
      </div>
      <div class="main bloc beautifulShadow animation1">
        <tabSet class="leftMargin">内容</tabSet>
        <div class="subject" v-for="(province,index) in allProvince"  >
          <div class="subjectTitle">
            <span>{{province.provinceName}}</span>
            
          </div>
          <div class="sign">{{index+1}}</div>
          <div class="subjectBody ">
            <img :src="province.pic" class="inlineBlock" >
            <input type="file" id="file" @change="preserve">
            <span class="introduce">
             
            </span>
          </div>
          <div class="subjectBottom">
            <div class="actionItem">
              <i class="iconfont ">&#xe8bf;</i>
              {{province.provinceHits}}
            </div>
            <div class="actionItem">
              <i class="iconfont ">&#xe8bc;</i>
            </div>
            <div class="actionItem">
              <i class="iconfont " @click="toDetail(province.provinceName)">&#xe8af;</i>
            </div>
          </div>
        </div>
      </div>
    </span>
    <span class="floatLeft" v-show="showAside">
      <div class="aside2 bloc beautifulShadow animation2" >
       <el-divider content-position="center" class="iconf">
        <i class="iconfont ">&#xeb90;</i>
        <i class="iconfont ">&#xeb92;</i>
        <i class="iconfont ">&#xe8c6;</i>
        <i class="iconfont ">&#xeb94;</i>
      </el-divider>

      
    </div>
  </span>
  <span class="floatLeft" v-show="showAside">
    <div class="aside bloc beautifulShadow animation3" >
     <tabSet class="leftMargin">导航</tabSet>
   </div>
 </span>
 <span class="floatLeft"v-show="showAside">
  <div class="aside2 bloc beautifulShadow animation4" >
   <tabSet class="leftMargin">最近访客</tabSet>
 </div>
</span>
</div>
</template>
<script src="../utils/jquery-1.12.4.js"></script>
<script>
  import axios from 'axios';
  import loading from './loading';
  import tabSet from './tabSet'
  export default {
   components: {
     'a-loading':loading  ,  
     'tabSet':tabSet
   },
   name: 'complexFirstPage',
   inject:["reload"],
   data () {
    return {
      that:this,
      host:this.$store.state.address,
      allProvince:[],
      offsetWidth: document.documentElement.offsetWidth,
      scrollHeight: document.body.scrollHeight,
      pic:"",
      screenWidth:"",
      screenHeight:"",
      showAside:true
    }
  },
  created(){
    this.getProvince();
    axios.get(`${this.$store.state.nodeAdd}/download/12345?picName=test1.png`,{
      responseType: 'arraybuffer'
    }).then(response=>{
      return 'data:image/png;base64,' + btoa(
        new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
    }).then(result=>{
      this.pic=result
    });
  },
  mounted () {
    console.log($(".animation1"))
    let $animation1=$(".animation1");
    $animation1.each((index,val)=>{
      $(val).css("animation-duration",`${index+1}s`)
    })
    this.screenWidth = document.body.clientWidth;
      this.screenHeight = document.body.clientHeight;
      if(this.screenWidth<=1342){
            this.showAside=false;
          }
          else{
            this.showAside=true;
          }
      window.onresize = () => {
        this.screenWidth = document.body.clientWidth;
      this.screenHeight = document.body.clientHeight;
      console.log(this.screenWidth)
        return (() => {
          if(this.screenWidth<=1342){
            this.showAside=false;
          }
          else{
           
            this.showAside=true;
          }
          
         
          
          // let bloc=document.querySelectorAll(".bloc");
          // [].forEach.call(bloc,(val,index)=>{
          //   console.log(val.style.width.slice(0,2))
          //     var scaleS=val.style.width.slice(0,2)/this.screenWidth;
          //     val.style.transform=` scale(${scaleS}) `;
          //   })
        })();
      };
  },
  methods:{
    clickFile(provinceName){
     var file=document.getElementById("file");
     this.$cookies.set("provinceName",provinceName)
     file.click();
   },
   preserve(){
    var that=this;
    console.log("上传中")
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
  },
  matchString(a,b){
    return a.trim().indexOf(b.trim());
  },
  toDetail(provinceName){
    console.log(provinceName)
    this.$router.push({path:"/complexSecondPage",query:{
      provinceName:provinceName
    }})
  },
  getProvince(){
    axios.get(`${this.host}/selectMyProvince`).then((data)=>{
      console.log(data.data)
      for(var i=0;i<data.data.length;i++){
        var province={
          provinceName:data.data[i],
          display:false,
          collectinfo:false,
          lock:false,
        }
        this.allProvince.push(province);
      }
      return this.allProvince;
    }).then((allProvince)=>{
      allProvince.forEach((val)=>{
        axios.get(`${this.$store.state.nodeAdd}/sendPic?provinceName=${val.provinceName}`,{
          responseType: 'arraybuffer'
        }).then(response=>{
          return 'data:image/png;base64,' + btoa(
            new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            )
        }).then(result=>{
          val.pic=result;
          this.$forceUpdate()
        });
      })
    });
    this.$nextTick(()=>{
      axios.post(`${this.host}/getAllMymarkers`).then((data)=>{
       for(var i=0;i<this.allProvince.length;i++){
        this.allProvince[i].city=[];
        for(var j=0;j<data.data.length;j++){
          if(this.allProvince[i].provinceName.trim().indexOf(data.data[j].provinceName.trim())!=-1){
            this.allProvince[i].city.push(data.data[j]);
          }
        }
      }
      axios.get(`${this.host}/selectProvinceHit`).then((data)=>{
        for(var i=0;i<data.data.length;i++){
          for(var j=0;j<this.allProvince.length;j++){
            if(this.matchString(data.data[i].provinceName,this.allProvince[j].provinceName)!=-1){
              this.allProvince[j].provinceHits=data.data[i].provinceHits
            }
          }
        }
        this.$forceUpdate()
      })
    });
      this.allProvince.sort((a,b)=>{
        return b.provinceHits-a.provinceHits;
      })
    })

    console.log(this.allProvince)
  }
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin:0;
  padding: 0;
}
.aside{
  width: 282px;
  height: 451px;
}
.aside2{
  width: 282px;
  height: 300px;
}
.head{
  width: 900px;
  height: 140px;
  display: flex;
  align-items: center;
}
.main{
  width: 900px;
  height: 100%;
}
.bloc{
  background:#fff;
  border-radius: 5px;
  margin: 15px;
  padding: 10px;

}
.animation1{
  animation: appearLeft 2s ;
}
.animation2{
  animation: appearTop 2s ;
}
.animation3{
  animation:appearTop2 4s;
}
.animation4{
 animation:appearTop3 6s;
}
.flexCenter{
  display: flex;
  align-items: center;
  justify-content: center;
}
.beautifulShadow{
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
}
.inlineBlock{
  display: inline-block;
}
.floatLeft{
 float: left;
}
.floatRight{
  float: right;
}
.smallPicture{

  height:130px;
}
.title{
  display: block;
  position: absolute;
  top : 0px;
  left: 10px;
  font-size: 30px;
  font-family: Arial;
}
.actionItem>i{
  font-size: 22px;
}
.leftMargin{
  margin-left: 20px;
}
.aLoading{
  position: absolute;
  right: 20px;
  animation:delayAppearL 4s;
}
span{ 
  position: relative;
  margin: 10px;
  /*animation: appearLeft 2s ;*/
}
h1{
 position: relative;
 font-size: 20px;
 margin: 10px;
}
.span1{
 margin-left: 20px;
 margin-top: 40px;
}
#file{
  display: none;
}
.frame{
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
}
i{
  font-size: 30px;
}
h1:nth-child(2){
  font-weight: normal;
}
.iconf{
  margin-top: 20px;
}
.subject{
  width: 800px;
  height:174px;
  margin-top:30px;
  /*  background: #ffff11;*/
  position: relative;
  transition: all 1s;
  display: flex;
  flex-direction:column;
  justify-content : space-between;
}
.subject:hover{
  box-shadow: 0 2px 5px rgba(0,0,0,.5);
  transform:translateY(-5px);
}
.subjectTitle{
  width: 80%;
  height: 40px;
  /*  background: blue;*/
  border-bottom: 2px solid #f7f2f2
}
.subjectTitle>span{
  font-size: 20px;
}
.subjectBody{
  width: 100%;
  height: 80px;
  /*  background: #ffff66;*/
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.subjectBody>img{
  width: 80px;
  height: 80px;
}
.subjectBottom{
  border-top:2px solid #f7f2f2;
  width: 100%;
  height: 46px;
  display: flex;
  justify-content: space-around;
}
.actionItem{
  width: 266px;
  text-align: center;
  line-height: 46px;
}
.actionItem:nth-child(1){
  border-right: 2px solid #f7f2f2;
}
.actionItem:nth-child(2){
  border-right: 2px solid #f7f2f2;
}
.introduce{
 text-align: center;
 line-height: 80px;
 height: 80px;
 width: 800px;

}
.sign{
  width: 92px;
  height: 66px;
  /*  background: red;*/
  position: absolute;
  right: 20px;
  font-size: 50px;
  text-align: center;
  line-height: 66px;
}
@keyframes delayAppearL{
  0%{
    opacity: 0;
    transform:translate(-100px)
  }
  50%{
    opacity: 0;
    transform:translate(-100px)
  }
  100%{
    transform:translate(0px);
  }
}
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
@keyframes appearTop{
  from{
    opacity: 0;
    /*margin-top: -100px;*/
    transform:translateY(-100px);
  }
  to{
    opacity: 1;
    transform:translateY(0px);
    /*margin-top: 15px;*/
  }
}
@keyframes appearTop2{
  0%{
    opacity: 0;
    transform:translateY(-100px);
  }
  50%{
    opacity: 0;
    transform:translateY(-100px);
  }
  100%{
    opacity: 1;
    transform:translateY(0px);
    /*margin-top: 15px;*/
  }
}
@keyframes appearTop3{
  0%{
    opacity: 0;
    transform:translateY(-100px);
  }
  33%{
    opacity: 0;
    transform:translateY(-100px);
  }
  66%{
    opacity: 0;
    transform:translateY(-100px);
    /*margin-top: 15px;*/
  }
  100%{
    opacity: 1;
    transform:translateY(0px);
  }
}
</style>