<template>
  <div class="FirstPage">
    <el-divider content-position="left" class="jikai">
      <i class="iconfont beBig"@mouseover="getDialog(0)"@mouseleave="hide()"@click="cheat(0)">&#xeb90;</i>
      <i class="iconfont beBig"@mouseover="getDialog(1)"@mouseleave="hide()"@click="cheat(1)">&#xeb92;</i>
      <i class="iconfont beBig"@mouseover="getDialog(2)"@mouseleave="hide()"@click="cheat(2)">&#xe8c6;</i>
      <i class="iconfont beBig"@mouseover="getDialog(3)"@mouseleave="hide()"@click="cheat(3)">&#xeb94;</i>
    </el-divider>
    <div id="square">
    </div>
    <div id="text0"></div>
    <div class="box" v-for="(city,index) in allcity" :key="index" @mousedown="incookie(city.provinceName)">
      <el-button >{{city.provinceName|hideW}}</el-button>
      <el-dropdown  style="padding-left:20px; "size="medium" @command="menu" split-button trigger="click">
        <el-tooltip class="item" effect="light" content="上传图片" placement="top">
          <i class="iconfont" style="font-size: 10px;" @click="clickFile">
            &#xe8c8;
          </i>
        </el-tooltip>
        <input type="file" id="file" @change="preserve">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a" disabled>
            <i class="iconfont">&#xeb94;</i>
            评分
          </el-dropdown-item>
          <el-dropdown-item command="b">
            <i class="iconfont">&#xe8af;
            </i>
            查看
          </el-dropdown-item>
          <el-dropdown-item command="c">
            <i class="iconfont">&#xe8b1;</i>
            分享
          </el-dropdown-item>
          <el-dropdown-item command="d">
           <i class="iconfont">&#xe8ac;</i>
           编辑
         </el-dropdown-item>
         <el-dropdown-item command="e" >
          <i class="iconfont">&#xe8ba;</i>
          删除
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-image class="imgg"
    style="width: 80px; height: 80px"
    :src="city.pic"
    ></el-image>
    <div class="inBottom">
      <el-row >
        <el-col :span="1">
          <div class="emptyBox"></div>
        </el-col>
        <el-col :span="9">
          <i class="iconfont">&#xe8bf;</i>
          热度:{{city.provinceHits}}
        </el-col>
        <el-col :span="4">
          <i class="el-icon-star-off"@click="collect(index)" v-if="!city.collectinfo" ></i>
          <i class="el-icon-star-on" v-if="city.collectinfo" @click="collect(index)"></i>
        </el-col>
        <el-col :span="4">
        </el-col>
        <el-col :span="4">
          <i class="el-icon-unlock" @click="lock(index)" v-if="!city.lock"></i>
          <i class="el-icon-lock" @click="lock(index)" v-if="city.lock"></i>
        </el-col>
      </el-row>
    </div>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="50%">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</div>
</div>
</template>
<script>
  import axios from 'axios';
  import $ from 'jquery';
  export default {
    name: 'FirstPage',
    inject:["reload"],
    data () {
      return {
        that:this,
        host:this.$store.state.address,
        dialogVisible: false,
        types:["info","info","warning","error"],
        egao:["要不点击打赏本猿？","还是现金支付？(滑稽)","但是，你可以点击此加小哥哥","点击吐槽"],
        cheats:["开个joke","你把我当什么people了","哼,单身不可撩,(wl除外)","对不起,没门儿"],
        allcity:[],
        pic:"",
      }
    },
    methods:{
      clickFile(){
       var file=document.getElementById("file");
       file.click();
     },
     preserve(){
      var that=this;
      var formData=new FormData();
      var file =document.getElementById("file").files[0];
      var provinceName=this.$cookies.get("provinceName");
      formData.append('filess',file);
      $.ajax({
        async:true,
        url:`${this.$store.state.nodeAdd}/getProName?provinceName=${provinceName}`,
        type:"get",
        success:function(data){

        }
      })
      $.ajax({
        url:`${this.$store.state.nodeAdd}/preserve`,
        contentType:false,
        type:"post",
        data:formData,
        processData: false,
        success:function (data) {
         this.pic=data.data;
         that.reload()
       }
     })
    },
    incookie(provinceName){
      this.$cookies.set("provinceName",provinceName);
        // console.log(this.$cookies.get("provinceName"))
      },
      menu(command){
        var that=this;
        var provinceName=this.$cookies.get("provinceName");
        switch(command){
          case "a":
          break;
          case "b":
          that.toGroup();
          break;
          case "c":
          break;
          case "d":
          break;
          case "e":
          that.deleteT();
        }
      },
      toGroup(){
        console.log()
        this.$router.push({path:"/SecondPage"})
      },
      lock(index){
        this.allcity[index].lock=!this.allcity[index].lock;
      },
      edit(index){
        this.dialogVisible=true;
      },
      collect(index){
        if(this.allcity[index].collectinfo==false){
          this.allcity[index].collectinfo=true;
          this.$nextTick(function () {
           this.$message({
             type:"success",
             message:"收藏成功",
           });
         })


        }
        else{
          this.allcity[index].collectinfo=false;
          this.$nextTick(function () {
           this.$message({
             type:"success",
             message:"已取消收藏",
           });
         })
        }

      },
      deleteT(){
        var provinceName=this.$cookies.get("provinceName");
        console.log(provinceName)
        axios.get(`${this.$store.state.nodeAdd}/deleteProv?provinceName=${provinceName}`).then(data=>{
          this.$message(`${data.data}`);
        })
      },
      getOption(index){
        this.allcity[index].display=!this.allcity[index].display;
      },
      ceshi(){
        for(var i=0;i<this.allcity.length;i++){
          console.log(this.allcity[i].city)
        }
      },
      cheat(index){
        this.$notify({
          type:this.types[index],
          message:this.cheats[index],
        })
      },
      hide(){
        var dialog0=document.getElementById("square");
        var text0=document.getElementById("text0");
        dialog0.style.display="none";
        text0.style.display="none";
      },
      getDialog(index){
        var dialog0=document.getElementById("square")
        dialog0.style.left=(80+index*34)+"px";
        var text0=document.getElementById("text0");
        text0.style.left=(31+index*34)+"px";
        text0.innerHTML=this.egao[index];
        dialog0.style.display="block";
        text0.style.display="block";
      },
      matchString(a,b){
        return a.trim().indexOf(b.trim());
      }
    },
    created(){

      // console.log(this.$route.query.address)
      axios.get(`${this.host}/selectMyProvince`).then((data)=>{
        console.log(data.data)
        for(var i=0;i<data.data.length;i++){
          var province={
            provinceName:data.data[i],
            display:false,
            collectinfo:false,
            lock:false,
          }
          this.allcity.push(province);
        }
        return this.allcity;
      }).then((allcity)=>{
        allcity.forEach((val)=>{
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
        console.log(allcity)
      });
      this.$nextTick(()=>{
        axios.post(`${this.host}/getAllMymarkers`).then((data)=>{
         for(var i=0;i<this.allcity.length;i++){
          this.allcity[i].city=[];
          for(var j=0;j<data.data.length;j++){
            if(this.allcity[i].provinceName.trim().indexOf(data.data[j].provinceName.trim())!=-1){
              this.allcity[i].city.push(data.data[j]);
            }
          }
        }

        axios.get(`${this.host}/selectProvinceHit`).then((data)=>{
          for(var i=0;i<data.data.length;i++){
            for(var j=0;j<this.allcity.length;j++){
              if(this.matchString(data.data[i].provinceName,this.allcity[j].provinceName)!=-1){
                this.allcity[j].provinceHits=data.data[i].provinceHits
              }
            }
          }
          this.$forceUpdate()
        })
      });
      })
    },
    computed:{

    },
    beforeDestroy(){
      this.$cookies.remove("index");
    }

  }
</script>

<style scoped>
#file{
  display: none;
}
.container {
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
.beBig{
  font-size: 30px;
}
#text0{
  height: 100px;
  width: 200px;
  position: absolute;
  top:100px;
  left: 31px;
  display: none;
  font-family: Arial;
  text-align: center;
}
#square{
  top:10px;
  left: 114px;
  width:100px;
  height:200px;
  border:2px solid black;
  margin:20px auto;
  position:absolute;
  transform: rotate(270deg);
  display: none;
  transition: all 1s;
}
#square:before{
  content:"";
  width:0px;
  height:0px;
  border:10px solid transparent;
  border-left-color:black;
  position:absolute;
  top:20px;
  left:100px;
}
#square:after{
  content:"";
  width:0px;
  height:0px;
  border:8px solid transparent;
  border-left-color:white;
  position:absolute;
  top:22px;
  left:100px;
}
.box {
  margin-bottom: 20px;
  margin-left: 40px;
  display: inline-block;
  height: 200px;
  width: 200px;
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
.box:hover{
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.card{
 position: absolute;
 right: 0px;
 box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
 transition: 0.3s;
 border-radius: 5px;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.smallbox{
  padding-bottom: 5px;
  padding-top: 5px;
  position: absolute;
  right: -40px;
  top: 0px;
  height: 50px;
  width: 40px;
  border-radius: 1px ;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  word-wrap:break-word;
  font-size: 12px;
  text-align: center;
}
.jikai:hover{
  margin-bottom: 150px;
}
.jikai{
  transition:all 1s;
}
.imgg{
  border: 6px solid white;
  box-shadow: 1px 1px 5px #333333;
}
</style>
