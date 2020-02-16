<template>
  <div class="loading">
    <div class="bo">
      <div class="tran">

        <div  class="c1">
        </div>
        <div class="c2">
        </div>
      </div>
      <div class="aaa">
        <div class="cirbody">
          <div class="cir"></div>
          <div class="cir"></div>
          <div class="cir"></div>
          <div class="cir"></div>
          <div class="cir"></div>
          <div class="cir"></div>

        </div>
      </div>


    </div>
  </div>
</template>
<script src="../utils/jquery-1.12.4.js"></script><script>
  import axios from 'axios';

  export default {
    name: 'loading',
    props:["scaleSize"],
    data () {
      return {
           
      }
    },
    mounted () {
      console.log("此时的scaleSize为"+this.scaleSize)
      $(".bo").css({
        'transform':`scale(${this.scaleSize})`
      })
    },
    methods:{
     
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin:0px;
  padding: 0px;
}
.bo{
  height:100px ;
  width:200px;
  display: flex;
  align-items: center;
  transform:scale(0.5);
}
.tran{
  position: relative;
  height:100px ;
  width:75px;


}
.cirbody{
  position: relative;
  height:100px ;
  width:150px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.c1{

  width: 100px;
  height: 50px;
  background: #f1c40f;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  animation:C1 0.5s linear infinite;
  transform-origin:50% 100% ;
}
.c2{
  width: 100px;
  height: 50px;
  background: #f1c40f;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  transform-origin:50% 0% ;
  animation:C2 0.5s infinite linear;
}
.cir{
  width: 11px;
  height: 11px;
  background: #FFCCCC;
  border-radius: 50%;

}
.aaa{
  width: 100px;
  height: 100px;
  overflow: hidden;
}
.cir:nth-child(1){
  animation:cir1 0.5s infinite linear;
}
.cir:nth-child(2){
  animation:cir1 0.5s infinite linear;
}
.cir:nth-child(3){
  animation:cir1 0.5s infinite linear;
}
.cir:nth-child(4){
  animation:cir1 0.5s infinite linear;
}
.cir:nth-child(5){
  animation:cir1 0.5s infinite linear;
}
.cir:nth-child(6){
  animation:cir1 0.5s infinite linear;
}
@keyframes C1 {
  50%{
    transform: rotate(-45deg);
  }
}
@keyframes C2 {
  50%{
    transform: rotate(45deg);
  }
}
@keyframes cir1 {
 to{
   transform: translateX(-50px);
 }
}

</style>