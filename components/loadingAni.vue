<template>
  <div class="loadingAni">
    <div class="qiu"><div class="f">
    <span>{{this.content}}</span>
</div></div>
  </div>
</template>
<script src="../utils/jquery-1.12.4.js"></script>
<script>
  import axios from 'axios';

  export default {
    name: 'loadingAni',
    props:{
      content:{
        default:"正在加载"
      },
      size:{
        default:1,
        type:Number
      }
    },
    data () {
      return {
       
      }
    },
    mounted () {
         $(".qiu").css({
        'transform':`scale(${this.size})`
      })
    },
    methods:{
      aaa(){
        
      }
      
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.f{
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border-top:10px solid #e74c3c;
    box-sizing: border-box;
   animation: rotat 3s infinite;
    animation-timing-function: linear;
    background: #34495e;
}
@keyframes rotat {
    100%{
        transform: rotate(360deg);
    }
}
@keyframes rotat2 {
    100%{
        transform: rotate(-360deg);
    }
}
.f:before ,.f:after{
    position: absolute;
    content: "";
    display: inline-block;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    top:-10px;
    box-sizing: border-box;
}
.f>span{
    position: absolute;
    width:200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    animation:rotat2 3s infinite ;
    animation-timing-function: linear;
}
.f:before{
    border-top:10px solid  #3498db;
    transform: rotate(120deg);
}
.f:after{
    border-top:10px solid  #f1c40f;
    left: 0px;
    transform: rotate(240deg);
}
        body{
           margin: 0px;
            padding: 0px;

        }
        /*.container{*/
        /*    height: 100%;*/
        /*    width: 100%;*/
        /*    display: flex;*/
        /*    justify-content: center;*/
        /*    align-items: center;*/
        /*    background: #34495e;*/
        /*    animation: bo 3s ;*/

        /*}*/
        @keyframes bo {
           0%{
               opacity: 0;
           }
            100%{
                opacity: 1;
            }
        }
</style>