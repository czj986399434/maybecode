<template>
  <div class="tabSet">
    <h2 >
      <span><slot></slot></span>
    </h2>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'tabSet',
    data () {
      return {
      }
    },
    mounted () { 
    },
    methods:{


    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2{
  position: relative;
  display: inline-block;
  width: 80%;
  height: 41px;
  border-bottom: 2px solid #eee;
  font-size: 16px;
  line-height: 40px;
  color: #484848;
}
span{
  cursor: pointer;
}
h2::before{
  content: "";
  width: 60px;
  height: 2px;
  position: absolute;
  background: #000000;
  bottom:0px;
  transition:all 1s;
}
h2:hover:before{

  width: 100px;
}
</style>