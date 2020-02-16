<template>
  <div class="navigation">
    <div class="brief " @click="change(1)"></div>
    <div class="container  rotateY"@click="change(2)">
        <div class="part aniAppear" v-for="(val,index) in test">{{val.aaa}}</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'navigation',
    props:["scaleSize"],
    data () {
      return {
       test:[
       {
        aaa:"czj"
       }, {
        aaa:"lwl"
       }, {
        aaa:"ls"
       }, {
        aaa:"zs"
       }, {
        aaa:"ckn"
       }]
      }
    },
    mounted () {
    },
    methods:{
      change(para){
        console.log(document.querySelector(".aaa"))
        var brief=document.querySelector(".brief");
        var container=document.querySelector(".container")
        switch(para){
          case 1:
            brief.className+="rotateY";
            container.className+="aniPull";
            container.classList.remove("rotateY")
            container.className+="delay"
            brief.classList.remove("delay")
            // container.classList.remove("displayNone")
            // if()
            // if(document.querySelector(".reverse")){
            //   container.classList.remove("reverse")
            // }
            
            break;
          case 2:
            // container.className+="reverse"
            brief.classList.remove("rotateY")
            container.className+="rotateY";
            container.classList.remove("aniPull")
            brief.className+="delay"
            container.classList.remove("delay")
            // setTimeout(function(){
            //   container.className+="displayNone"
            // },1000);
            break;
        }
      }
      
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.brief{
  width: 40px;
  height: 40px;
  border-radius: 0px 5px  5px 0px;
  position: fixed;
  top: 150px;
  left: 0px;
  background:url(../../static/zhankai.png) no-repeat center #333;
  background-size:16px;
  transition:all 1s ;
  transform-origin: 0% 50%;
}
.rotateY{
  transform:rotateY(180deg);
}
.container:after{
  content: "";
  background: url("../../static/wrong.jpg") no-repeat center ;
  background-size:25px;
  height: 30px;
  width: 30px;
  /*box-shadow: */
  position: absolute;
  top:0px;
  right: -35px;
  border-radius: 0px 5px 5px 0px;
  text-align: center;
  line-height: 30px;
  font-size: 25px;
  transition:all 1s;
}
.container{
  position: fixed;
  width: 100px;
  height: auto;
  background: #2c3e50;
  top:150px;
  left:0px;
  transform-origin: 0 50%;
  min-height: 20px;
}
.aniPull{
  animation-delay: 1s;
  animation: pullDown 3s;
  animation-timing-function: ease;
}
.delay{
  animation-delay: 1s;
  transition-delay: 1s;
}
.reverse{
  animation-direction: reverse;
}
.aniAppear{
  animation-delay: 1s;
  animation: appear 5s;
}
.part{
  width: 100px;
  height: 30px;
  background: #2c3e50;
  border-bottom: 1px solid #2c3e50;
  padding-left: 5px;
  text-align: center;
  line-height: 30px;
  color:#ffffff;
}
@keyframes appear{
  0%{
    opacity: 0;
  }
  60%{
    opacity: 0;
  }
  100%{
     opacity: 1;
  }
}
@keyframes pullDown{
  0%{
    transform: rotateY(180deg);
  }
  30%{
     transform: rotateY(0deg);
  }
  50%{
    transform: scaleY(0.1);
  }
  70%{
    transform: scaleY(1.2);
  }
  85%{
    transform: scaleY(0.9);
  }
  100%{
    height: auto;
  }

}
</style>
<template>
  <div class="navigation">
    <div class="container aniPull " @mouseenter="activeAll">
      <div class="onMenu" @click="onMenu(2)"></div>
        <div class="part aniAppear " @click="active(index)" v-for="(val,index) in cityData">{{val.cityName}}</div>
        <div class="cancel"@click="onMenu(1)"></div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'navigation',
    props:["cityData"],
    data () {
      return {
       
      }
    },
    mounted () {
    },
    methods:{
      onMenu(ind){
        var container=document.querySelector(".container");
        if(ind==1){
          container.classList.add("rotateY");
        }
        else if(ind==2){
          container.classList.remove("rotateY");
        }
      },
      activeAll(){
        var part =document.querySelectorAll(".part");
        part.forEach(function(val,index){
          if(val.classList.contains("rotateX")){
            val.classList.remove("rotateX")
          }
        
      })
      },
     active(indexA){
      var part =document.querySelectorAll(".part");
      part.forEach((val,index)=>{
        if(indexA!=index){
          if(!val.classList.contains("rotateX")){
            val.className+=" rotateX "
          }
          
        }
        else{
          this.$emit("beActive",indexA)
          if(val.classList.contains("rotateX")){
            val.classList.remove("rotateX")
          }
        }
      })
     }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.onMenu{
  width: 40px;
  height: 40px;
  border-radius: 5px 0px  0px 5px;
  position: absolute;
  left: -40px;
  background:url(../../static/zhankai.png) no-repeat center #333;
  background-size:16px;
  transition:all 1s ;
  transform-origin: 0% 50%;
}
.rotateY{
  transform:rotateY(180deg);
}
.rotateX{
  transform:rotate(90deg);
  width: 0px;
}
.cancel{
  background: url("../../static/wrong.jpg") no-repeat center ;
  background-size:25px;
  height: 30px;
  width: 30px;
  position: absolute;
  top:0px;
  right: -30px;
  border-radius: 0px 5px 5px 0px;
  text-align: center;
  line-height: 30px;
  font-size: 25px;
  transition:all 1s;
  animation: appear2 5s;
}
.container{
  position: fixed;
  width: 100px;
  height: auto;
  top:150px;
  left:0px;
  transform-origin: 0 50%;
  min-height: 20px;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.1);
  transition:all 1s;
}
.aniPull{
  animation-delay: 1s;
  animation: pullDown 3s;
  animation-timing-function: ease;
}
.delay{
  animation-delay: 1s;
  transition-delay: 1s;
}
.reverse{
  animation-direction: reverse;
}
.aniAppear{
  animation-delay: 1s;
  animation: appear 5s;
}
.part{
  width: 100%;
  height: 30px;
  background: #2c3e50;
  border-bottom: 1px solid #2c3e50;
  text-align: center;
  line-height: 30px;
  color:#ffffff;
  transform-origin: 0% 0%;
  transition:all 1s;
}
@keyframes appear2{
  0%{
    opacity: 0;
  }
  90%{
    opacity: 0;
  }
  100%{
     opacity: 1;
  }
}
@keyframes appear{
  0%{
    opacity: 0;
  }
  60%{
    opacity: 0;
  }
  100%{
     opacity: 1;
  }
}
@keyframes pullDown{
  0%{
    transform: rotateY(180deg);
  }
  30%{
     transform: rotateY(0deg);
  }
  50%{
    transform: scaleY(0.1);
  }
  70%{
    transform: scaleY(1.2);
  }
  85%{
    transform: scaleY(0.9);
  }
  100%{
    height: auto;
  }

}
</style>
    //下面是loading里面的傻逼的东西
    //  let scale=this.size/100
     // let $div=$("div");
     // $div.each((index,val)=>{
     //  if($(val)!=$("div #app")){
     //     var $val=$(val)
     //  this.setStyle($val,"width",scale);
     //  this.setStyle($val,"height",scale);
     //  this.setStyle($val,"border-top-left-radius",scale);
     //  this.setStyle($val,"border-top-right-radius",scale);
     //  this.setStyle($val,"border-bottom-left-radius",scale);
     //  this.setStyle($val,"border-bottom-right-radius",scale);
     //  }
      // var width=$val.css("width");
      // var height=$val.css("height");
      // var borderTLR=$val.css("border-top-left-radius");
      // var borderTRR=$val.css("border-top-right-radius");
      // var borderBLR=$val.css("border-bottom-left-radius");
      // var borderBRR=$val.css("border-bottom-right-radius");
     //  $(val)
     // })
      // setStyle($val,style,scale){
      //   console.log($val)
      //   if($val.css(style)){
      //     var sty=$val.css(style);
      //     sty=sty*scale;
      //     $val.css(style,sty)
      //   }
      // }