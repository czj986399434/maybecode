<template>
  <div class="ceshi">
    <el-button @click="change" style="position: absolute;left: 10%;top: 40%">点击切换</el-button>
    <el-button @click="clickFile">点击添加</el-button>
    <div class="container mymoveAni">
      <img :src="val.src" v-for="(val,index) in img" class="leftTop" @mouseenter="imgMouseover" @mouseleave="imgMouseout" @click="imgClick">
    </div>

    <div class="curtain displayNone" @click="curtainClick"><img src="" id="curtainPic"></div>
<input type="file" name="filess"id="file" style="display: none;" @change="upload" >
  </div>
</template>
<script src="../../utils/jquery-1.12.4.js"></script>
<script>
  import axios from 'axios';
  export default {
    name: 'ceshi',
    inject:["reload"],
  data () {
    return {
      address:this.$store.state.address,
img:[],
changeFlag:true,
}
},
methods:{
  curtainClick(){
   var curtain=document.querySelector(".curtain"); 
   curtain.classList.toggle("displayNone",true);
  },
  imgClick(){
    var img = document.querySelectorAll('.container>img');
   var ceshi=document.querySelector(".ceshi"); 
   var curtain=document.querySelector(".curtain"); 
   var curtainPic=document.querySelector("#curtainPic");
curtain.classList.toggle("displayNone",false);
     console.log(val)
    curtainPic.src=val.src;
  },
  imgMouseout(){
   var container=document.querySelector(".container");
container.style.animationPlayState="running";

  },
  imgMouseover(){
   var container=document.querySelector(".container");
   console.log(container)
container.style.animationPlayState="paused"
  },
  clickFile(){
     var file=document.getElementById("file");
     file.click();
   },
   upload(){
    var that=this;
    var formData=new FormData();
    var file =document.getElementById("file").files[0];
    formData.append('filess',file);
    $.ajax({
      url:`${this.$store.state.nodeAdd}/upload/picSpace`,
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
  change(){
    var img = document.querySelectorAll('img');
    var container =document.querySelector(".container")
    if(this.changeFlag==true){
      for (let i = 0; i < img.length; i++) {
        // 图片旋转分散 36°`
        img[i].style.transform = `rotateY(0deg) `;
// translateX(${(i-img.length/2)*220}px)
        img[i].classList.toggle("leftTop",false)
        img[i].classList.toggle("relative",true)
      }
      container.classList.toggle("mymoveAni",false)
    }
    else{
     this.defaultAni();
   }
   this.changeFlag=!this.changeFlag;
 },
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
  },
  async created(){
    var length;
    await axios.get(`${this.$store.state.nodeAdd}/getLength/picSpace`).then(data=>{
      length=data.data
      console.log(typeof(length))
    })
    for(let i=0;i<length;i++){
      console.log(length)
      console.log("在循环")
    axios.get(`${this.$store.state.nodeAdd}/downloadAll/picSpace?index=${i}`,{
            responseType: 'arraybuffer'
          }).then(response=>{
            console.log(response)
            return 'data:image/png;base64,' + btoa(
              new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
              )
          }).then(result=>{
            var json={
              src:result
            }
            this.img.push(json);
            console.log(this.img)
          });
  }
  },
  mounted () {
   this.change();
   // [].forEach.call(img,(val,index)=>{
   //  if(index!=0){
   //    val.onmouseover=function(){
   //    mymoveAni.style.animationPlayState="paused"
   //  }
   //  val.onmouseout=function(){
   //    mymoveAni.style.animationPlayState="running"
   //        // container.classList.toggle("pause",false);
   //      }
   //      val.onclick=function(){
   //        curtain.classList.toggle("displayNone",false);
   //        console.log(val)
   //        curtainPic.src=val.src;
   //      }
   //      curtain.onclick=function(){
   //        curtain.classList.toggle("displayNone",true);
   //      }
   //  }
     
   //    })
 }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  position: relative;
  transition: all 1s;
  height:800px;
  width: 1000px;
  margin:auto;
  transform:rotateX(-30deg);
  transform-style:preserve-3d;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content:flex-start;
  flex-wrap:wrap;
  align-content: flex-start
  /*background:-webkit-radial-gradient(#490338 10%,#000);*/

}
.ceshi{
  perspective: 2200px;
}
.pause{
  animation-play-state: paused;
}
.mymoveAni{
 animation: mymove 6s infinite linear;

}

.leftTop{
 top:20%;
 left: 20%;
}
.container>img{
  margin:20px;
  width: 200px;
  height: 200px;
  position: absolute;
}
.relative{
  position: relative!important;
}
#curtainPic{
  height: 300px;
  width: 300px;
  animation: show 2s ;
  position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  opacity: 1;
}
.curtain{
  background:#000;
  height: 100%;
  width:100%;
  position: fixed;
  left: 0;
  top: 0;
  
  opacity: 0.5;
}
.displayNone{
  display: none;
}
/*p {
  position:absolute;
  top:10%;
  left: 15%;
  width:800px;
  height:800px;
  background:-webkit-radial-gradient(#490338 10%,#000);
  transform:translateY(100px) rotateX(90deg);
  border-radius:50%;
}*/
.displayFlex{
  display: flex;
  align-items: center;
  justify-content: center;
}
img:first-child{
  border:2px solid black;
}
@keyframes mymove{
 from{
   transform:rotateY(360deg);
 }
 to{
  transform:rotateY(0deg);
}
}
@keyframes show{
  from{
    opacity:0;
    width: 0;
    height: 0;
  }
  to{
    opacity: 1;
    width: 300px;
    height: 300px;
  }
}
</style>
