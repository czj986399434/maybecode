<template>
  <div class="FirstPage">
    <el-button @click="dialogVisible=true" icon="el-icon-circle-plus-outline"></el-button>
    <div class="amap-wrapper">
      <el-amap class="amap-box" vid="map" 
        :zoom="zoom"
        :center="center"
        >
        <el-amap-marker v-for="(mymarker,index) in mymarkers"
         v-bind:key="index"
        :vid="mymarker"
        :position="mymarker.position" 
        :title="mymarker.title"
        :visible="true"
        :events="mymarker.events">
        </el-amap-marker>
      </el-amap>
    </div>
    <el-dialog
      title="添加地点"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <el-row :gutter="20">
        <el-col :xs="0" :sm="3" :md="3" :lg="3" :xl="6">
          <div class="emptyBox"></div>
        </el-col>
        <el-col :xs="20" :sm="14" :md="12" :lg="12" :xl="12">
          <el-select 
          v-model="province" 
          placeholder="请选择" 
          id="province" 
          class="beWide"
          @change="getCity">
          <el-option
            v-for="(item,index) in prooptions"
            :key="index"
            :label="item.provinceName"
            :value="item.provinceName">
        </el-option>
  </el-select>
        </el-col>
        <el-col :xs="5" :sm="8" :md="6" :lg="5" :xl="8">
          <span  class="fontPretty">省(市)</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="0" :sm="3" :md="3" :lg="3" :xl="6">
          <div class="emptyBox"></div>
        </el-col>
        <el-col :xs="20" :sm="14" :md="12" :lg="12" :xl="12">
          <el-select 
          v-model="city" 
          placeholder="请选择" 
          id="city"
          class="beWide">
          <el-option
            v-for="item in cityoptions"
            :key="item"
            :label="item"
            :value="item"
            >
        </el-option>
  </el-select>
        </el-col>
        <el-col :xs="4" :sm="6" :md="4" :lg="3" :xl="6">
          <span class="fontPretty">市</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="0" :sm="3" :md="3" :lg="3" :xl="6">
          <div class="emptyBox"></div>
        </el-col>
        <el-col :xs="20" :sm="14" :md="12" :lg="12" :xl="12">
          <el-input 
          placeholder="右方查询经纬度" 
          :disabled="true" 
          id="lnglat"
          class="beWide" >
          </el-input>
        </el-col>
        <el-col :xs="4" :sm="6" :md="4" :lg="3" :xl="6">
          <i class="el-icon-search" @click="geoCode" style="margin-top: 10px" >
            
          </i>
        </el-col>
         
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="10">
          <div class="emptyBox"></div>
        </el-col>
        <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
           <el-button type="primary" @click="addMarker">确 定</el-button>
        </el-col>
        <el-col :xs="4" :sm="6" :md="4" :lg="3" :xl="6">
         </el-col>

      </el-row>
            
           
      
      
      
      
</el-dialog> 
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'FirstPage',
  inject:["reload"],
  data () {
    return {
      host:this.$store.state.address,
      fullWidth:document.documentElement.clientWidth,
      dialogVisible: false,
      width:"",
      province:"",
      city:"",
      window:{
        position:"",
        content:"",

      },
      cityoptions:[

      ],
      prooptions:[
      
      ],
      mymarkers:[],
        zoom: 4,
        center: [116, 40],
        events:{
          init (o) {
            console.log("初始化成功")
            console.log(o);
          }
        }
    }
  },
  methods:{
    getAll(){
      axios.post(`${this.host}/getAllMymarkers`).then((data)=>{
        var mymarkers=[];
        for(var i=0;i<data.data.length;i++){
          var cityName=data.data[i].cityName;
          var position=[];
          position[0]=data.data[i].lng;
          position[1]=data.data[i].lnt;
          var mymarker={
            position:position,
            address:data.data[i].provinceName+"-"+data.data[i].cityName,
            introduce:data.data[i].introduce,
            title:"点击获取详细信息",
            hits:0,
            events:{
               click:(e) => {
                console.log(e);
                  this.$router.push({path:"/complexFirstPage",query:{address:e.target.Uh.vid.address}}).then(() => {
                            this.$router.go(0);
                  })
          
               },
            },
          }
          mymarkers.push(mymarker);
        };
        this.mymarkers=mymarkers;
      })
    },
    getCity(){
      this.city="";
      var province=this.province;
      axios.get(`${this.host}/returnCity`,{
         params:{
          provinceName:province,
         },

      }).then((data)=>{
        this.cityoptions=data.data;
      })
    },
    // chushihua(){
    //    var map=this.map;
    //    var mymarkers=map.mymarkers;
    //    for(var i=0;i<mymarkers.length;i++){
    //     this.$options.methods.geoCode();
    //     mymarkers[i].position=document.getElementById('lnglat').value;
    //    }
    // },
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
    handleResize (event) {
      this.fullWidth = document.documentElement.clientWidth;
      var screenWidth=this.fullWidth;
      var that=this;
      if(screenWidth>=1920){
        that.width= "30%"
      }
      else if(screenWidth>=1200){
        that.width= "30%"
      }
      else if(screenWidth>=992){
        that.width= "30%"
      }
      else{
        that.width= "120%"
      }
    },
    addMarker(){

       let that=this;
       if(document.getElementById('lnglat').value===""){
        this.$message('求求你先查询经纬度，老子还不完善');
       }
       else{
        var marker={
          position:document.getElementById('lnglat').value.split(","),
          address:document.getElementById('province').value+"-"+document.getElementById('city').value,
          title:"点击获得详细信息"
        }
        var forpost={
          lng:document.getElementById('lnglat').value.split(",")[0],
          lnt:document.getElementById('lnglat').value.split(",")[1],
          provinceName:document.getElementById('province').value,
          cityName:document.getElementById('city').value,
          title:"点击获得详细信息",
          introduce:"这是段"+document.getElementById('city').value+"的介绍",
        };
        axios.post("http://127.0.0.1:8080/ceshi2",forpost).
        then((data)=>{
          this.$message("data值为"+data.data);
        })

        this.dialogVisible = false;
        // that.mymarkers.push(marker);
       }
    },
    ceshi(){
      for(var i=0;i<this.map.mymarkers.length;i++){
        console.log(this.map.mymarkers[i]);
      }
    }
  },
  created(){
    window.addEventListener('resize', this.handleResize);
    axios.get(`${this.host}/returnProvince`)//获得省
    .then((data)=>{
      for(var i=0;i<data.data.length;i++){
        var province={
          provinceName:data.data[i]
        }
        this.prooptions.push(province);
      }

    });
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  computed:{
    
  },
  updated(){//一直执行
    this.getAll();
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.amap-wrapper {
    width: 1440px;
    height: 600px;

  }
  .fontPretty{
    font-family: sans-serif;
    font-size: 20px;
    text-align: center;
  }
  .emptyBox{
    width: 12px;
    height: 12px;
  }

</style>