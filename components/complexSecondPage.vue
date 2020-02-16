<template>
  <div class="complexSecondPage">
    <navigation :cityData="oneProvince" @beActive="beActive"></navigation>
    <p><el-radio v-model="radio" label="1">按时间</el-radio>
      <el-radio v-model="radio" label="2">按热度</el-radio></p>
      <timeline :cards="city.cards">
       
      </timeline>
    </div>
  </template>

  <script>
    import axios from 'axios';
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
     data () {
      return {
       oneProvince:[],
       city:[],
       host:this.$store.state.address,
       radio: '1'
     }
   },
   watch:{
     "radio"(val,oldVal){
      this.sortCard(val)
     }
   },
   mounted () {
   },
   created(){
    var provinceName;
    if(this.$cookies.get("provinceName")){
     provinceName=this.$cookies.get("provinceName");
   }
   if(this.$route.query.provinceName){
    provinceName=this.$route.query.provinceName;
  }
  if(! provinceName){
    provinceName="浙江省"
  }
  console.log("此provinceName值为"+provinceName);
  axios.get(`${this.host}/selectOneProvince`,{
   params:{
    provinceName:provinceName
  }
}).then((data)=>{
 this.oneProvince=data.data;
 this.beActive(0)
})

},
methods:{
  giveTimeSort(date){
   var a=date.split("-");
   var num=0;
   a.forEach((val,index)=>{
     if(index==0){
      num=num+val*365
     }else if(index==1){
      num=num+val*30
     }else{
      num=num+val
     }
   })
},
  beActive(activeIndex){
    var city=this.oneProvince[activeIndex]
    console.log(city)
    axios.get(`${this.$store.state.nodeAdd}/selectCards`,{
     params:{
      cityName:city.cityName
    }
  }).then(async data=>{
    city.cards=data.data
   console.log(city.cards)
    this.city=city;
    console.log(this.city)
    this.sortCard(1)
  })
},
  sortCard(index){
     var cards=this.city.cards;
    if(index==1){
       var that=this;
    cards.sort((a,b)=>{
      return that.giveTimeSort(b.cardDate)-that.giveTimeSort(a.cardDate)
    })
    }
   else{
    cards.sort((a,b)=>{
      return b.onhit-a.onehit;
    })
   }
  }

},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.filter{
  width: 100px;
  height: 100px;
  background-image: url()
}
.timeUnit1{
  font-size: 22px;
}
.cityCard{
  margin-left:5%;
  padding-left: 5%;
  background: #ffffff;
  width:70%;
  
}
.complexSecondPage{
  display: flex;
  align-items: center;
  justify-content: center;
}
p{
  display: inline-block;
  position: absolute;
  top: 0px;
  left: 46%;

}
</style>