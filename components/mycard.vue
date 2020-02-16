<template>
  <div class="mycard">
    <div class="container">
      <slot></slot>
      
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'mycard',
    data () {
      return {
         ccc:[{
          a:"czj"
         },{
          a:"lwl"
         },{
          a:"zw"
         },{
          a:"zs"
         },{
          a:"ljz"
         }]
      }
    },
    mounted () {
    },
    methods:{
      
  },
}
</script>
<style scoped>
.container{
  position: relative;
  width: auto;
  height: auto;
  min-height: 21px;
  max-width: 70%;
  background: #484348;
  margin-left: 50px;
  color:#ffffff;
  line-height: 21px;
  font-size: 18px;
  letter-spacing: .2em;
  padding: 20px;
  word-wrap: break-word;
  display: inline-block;
}
.container:before{
  position: absolute;
  content: "";
  width: 0px;
  height: 0px;
  top:10px;
  left: -20px;
  border-left: 10px solid transparent;
  border-top:6px solid transparent;
  border-right: 10px solid #484348;
  border-bottom: 6px solid transparent;
}
img{
  width: 600px;
  display: block;
  margin:10px 0 10px 0;
}
</style>