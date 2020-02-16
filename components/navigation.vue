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
            val.classList.toggle("opacity",false)
          }
        
      })
      },
     active(indexA){
      var part =document.querySelectorAll(".part");
      part.forEach((val,index)=>{
        if(indexA!=index){
          if(!val.classList.contains("rotateX")){
            val.className+=" rotateX "
            val.classList.toggle("opacity",true)
          }
          setTimeout(()=>{
            val.classList.remove("rotateX")
            val.classList.toggle("opacity",false)
          },2000)
        }
        else{
          this.$emit("beActive",indexA)
          if(val.classList.contains("rotateX")){
            val.classList.remove("rotateX")
            val.classList.toggle("opacity",false)
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
  background:url(../../static/zhankai.png) no-repeat center #409eff;
  background-size:16px;
  transition:all 1s ;
  transform-origin: 0% 50%;
}
.rotateY{
  transform:rotateY(180deg);
}
.rotateX{
  transform:rotate(90deg);
  
}
.opacity{
  opacity: 0;
}
.cancel{
  background: url("../../static/wrong.jpg") no-repeat center ;
  background-size:25px;
  height: 30px;
  width: 30px;
  position: absolute;
  top:-5px;
  right: -25px;
  border-radius: 0px 5px 5px 0px;
  text-align: center;
  line-height: 30px;
  font-size: 25px;
  transition:all 1s;
  transform: scale(0.7);
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
  background: #ffffff;
  text-align: center;
  line-height: 30px;
  color:#409eff;
  transform-origin: 0% 0%;
  transition:all 1s;
  font-family: arial;
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