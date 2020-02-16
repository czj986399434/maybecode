<template>
  <div class="timeline">
    <ul>
      <li v-for="(val,index) in cards">
        <div class=" card borderRadius1">
          <h1 class="borderRadius2">
            {{val.cardDate|hideTowords}}
          </h1>
          <h2 class="borderRadius2">
            {{val.cardTitle}}
          </h2>
          <div class="danmu" >
            <div v-for="(onecomment,index2) in val.comments" :data-index="index">
             <el-avatar size="small" :src="onecomment.str_head_portrait"></el-avatar>
             {{onecomment.str_nickname}}:  {{onecomment.comment}}
            </div>
          </div>
          <div class="cardBody borderRadius1" @mouseenter="getComment" @mouseleave="leaveComment" :data-index="index" @click="openDialog">
           <p>
           {{val.cardContent}}
          </p>
        </div>
      </div>
      <div class="cityPic borderRadius1" v-show="showPic">
        <i class="iconfont" v-show="!val.dianzan" @click="dianzan(index)">&#xe73c;</i>
        <i class="iconfont" v-show="val.dianzan" @click="dianzan(index)">&#xe7b4;</i>
       
      <!-- <loadingAni content="展示图片" ></loadingAni> -->
    </div>  
  </li>
</ul>
<el-dialog
title="盲生，你发现了华点"
:visible.sync="dialogVisible"
width="20%"
>
<el-input v-model="comment" maxlength="10"show-word-limit autocomplete="off"></el-input>
<span slot="footer" class="dialog-footer">
  <el-button @click="dialogVisible = false">取 消</el-button>
  <el-button type="primary" @click="insertComment">确 定</el-button>
</span>
</el-dialog>
</div>
</template>
<script src="../utils/jquery-1.12.4.js"></script>
<script>
  import axios from 'axios';
  import loadingAni from "./loadingAni"
  export default {
    name: 'timeline',
    props:["cards"],
    inject:["reload"],
    components: {
     "loadingAni":loadingAni
   },
   data () {
    return {
     screenWidth:"",
     screenHeight:"",
     host:this.$store.state.address,
     showPic:true,
     comment:"",
     pi:[{
      src:"http://thirdqq.qlogo.cn/g?b=oidb&k=MpwfbUmkOQgJPM14R5oIeA&s=40&t=1554773102"
     },{
      src:"http://thirdqq.qlogo.cn/g?b=oidb&k=MpwfbUmkOQgJPM14R5oIeA&s=40&t=1554773102"
     },{
      src:"http://thirdqq.qlogo.cn/g?b=oidb&k=MpwfbUmkOQgJPM14R5oIeA&s=40&t=1554773102"
     },{
      src:"http://thirdqq.qlogo.cn/g?b=oidb&k=MpwfbUmkOQgJPM14R5oIeA&s=40&t=1554773102"
     }],
     alreadyComment:{

     },
     user:  {
      int_user_id: 2,
      str_username: null,
      str_openid: "5F639C6A95D11C1E7739B98B07685628",
      str_nickname: "做一只旅行青蛙、",
      str_autograph: null,
      str_head_portrait: "http://thirdqq.qlogo.cn/g?b=oidb&k=MpwfbUmkOQgJPM14R5oIeA&s=40&t=1554773102",

      int_gender: 1,
      int_user_type: 1
    },
    dialogVisible: false
  }
},
mounted () {
  this.screenWidth = document.body.clientWidth;
  this.screenHeight = document.body.clientHeight;
  if(this.screenWidth<=1050){
    this.showPic=false;
  }
  else{
    this.showPic=true;
  }
  if(this.screenWidth<=450){
    console.log("aaa")
    var card=document.querySelectorAll(".card");

    [].forEach.call(card,(val,index)=>{
      var scaleS=val.offsetWidth/450
      console.log(scaleS)
      val.style.transform=`scale(${scaleS})`
    })
  }
  window.onresize = () => {
    this.screenWidth = document.body.clientWidth;
    this.screenHeight = document.body.clientHeight;
    var li=document.querySelectorAll("li")
    return (() => {
      if(this.screenWidth<=1050){
        this.showPic=false;
        [].forEach.call(li,(val,index)=>{
          val.style.setProperty("--left","5%")
        })
      }
      else{
        [].forEach.call(li,(val,index)=>{
          val.style.setProperty("--left","50%")
        })
        this.showPic=true;
      }
      if(this.screenWidth<=450){
       var card=document.querySelectorAll(".card");

       [].forEach.call(card,(val,index)=>{
        var scaleS=this.screenWidth/450
        val.style.transform=`scale(${scaleS})`
      })
     }
   })();
 }
 window.addEventListener('scroll',this.handleScroll,true)

},
methods:{
  getMessage(data,result,succMessage,failMessage){
       if(data==result){
         this.$message({
          type:"success",
          message:succMessage,
        })
         
       }
       else{
         this.$message({
          type:"error",
          message:failMessage,
        })
       }
     },
  dianzan(index2){
    this.cards[index2].dianzan=!this.cards[index2].dianzan;
    if(this.cards[index2].dianzan==true){
     this.cards[index2].onehit=this.cards[index2].onehit+1;
   }
   else{
    this.cards[index2].onehit=this.cards[index2].onehit-1;
  }
  var onehit=this.cards[index2].onehit;
  var cardId=this.cards[index2].cardId;
  if(cardId==null){
    this.getMessage(cardId,-1,null,"请刷新再点赞")
  }else{
    console.log(onehit)
    axios.get(`${this.host}/updateOnehit`,{
      params:{
        onehit:onehit,
        cardId:cardId,
      }
    }).then((data)=>{
      this.$forceUpdate();
      this.getMessage(data.status,200,"操作成功","操作失败")
    })
  }

},
openDialog(e){
  console.log("???")
  var cardBody=e.target;
  let index=e.target.getAttribute("data-index")
  var cardId=this.cards[index].cardId;
  this.$cookies.set("cardId",cardId);
  this.dialogVisible=true;
},
insertComment(cardId){
  var that=this;
  this.dialogVisible=false;
  var cardId=this.$cookies.get("cardId")
  var  str_openid;
  var str_head_portrait;
  var str_nickname;
  var that=this;
  if(this.$cookies.get("qqOpenid")){
   str_openid=this.$cookies.get("qqOpenid");
 }else{
  str_openid=this.user.str_openid;
}
if(this.$cookies.get("qqHeadPortrait")){
 str_head_portrait=this.$cookies.get("qqHeadPortrait");
}else{
  str_head_portrait=this.user.str_openid;
}
if(this.$cookies.get("qqNickname")){
 str_nickname=this.$cookies.get("str_nickname");
}else{
  str_nickname=this.user.str_nickname;
}
this.alreadyComment={
  str_openid,
  str_head_portrait,
  str_nickname,
  cardId,
  comment:that.comment,
}
axios.post(`${this.$store.state.nodeAdd}/insertComments`,this.alreadyComment)
.then(data=>{
  if(data.data==1){
    this.$message('评论成功');
    that.reload();
  }
  else{
    this.$message("评论失败");
  }
})
},

rgb(){
  var r = Math.floor(Math.random()*256);
  var g = Math.floor(Math.random()*256);
  var b = Math.floor(Math.random()*256);
  var rgb = '('+r+','+g+','+b+')';
  return rgb;
},
leaveComment(e){
  var cardBody=e.target;
  cardBody.classList.toggle("translucent",false)
},
async getComment(e){
  var cardBody=e.target;
  let index=e.target.getAttribute("data-index")
  var cardId=this.cards[index].cardId;
  await axios.get(`${this.$store.state.nodeAdd}/selectComments?cardId=${cardId}`)
  .then(data=>{
    this.cards[index].comments=data.data
  })
  let divList=cardBody.previousElementSibling.childNodes;
  for(let i=0;i<divList.length;i++){
    divList[i].style.transform=`translate(${i*300}px,0px)`;
    divList[i].style.color=`rgb${this.rgb()}`
    divList[i].style.animationDelay=` ${i*2}s `
    if(i==divList.length-1){
      cardBody.classList.toggle("translucent",true);
    }
  }
  this.$forceUpdate();


},
isElementInViewport(el) {
      //获取元素是否在可视区域
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
        (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    change(card){
      var that=this;
      [].forEach.call(card,function(val,index){
        if(that.isElementInViewport(val)){

          val.classList.toggle("aniCA",true);
          val.classList.toggle("transparent",false);

        }
        else{
          val.classList.toggle("aniCA",false);
          val.classList.toggle("transparent",true);
          
        }
      })
    },
    handleScroll(){
      var that=this;
      var card=document.querySelectorAll("li>.card")
      var comment=document.querySelectorAll("li>.comment");
      this.change(card);
      
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul{
  margin-top: 100px;
  padding-top: 50px;
  margin-bottom: 170px;
}

li{
  position: relative;
  list-style: none;
  height: 250px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  --left: 50%;
}
li:before{
  position: absolute;
  content: "";
  width: 20px;
  height: 20px;
  background: #ffffff;
  border-radius: 3px;
  top:-14px;
  left: var(--left);
  transform:translateX(-50%) rotate(45deg) 
}
li:after{
  position: absolute;
  content: "";
  width: 7px;
  height: 100%;
  background: #ffffff;
  top:0px;
  left: var(--left);
  transform:translateX(-50%);
}
.card{
  position: relative;
  background: #ffffff;
  width: 400px;
  height: 140px;
  margin:30px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  transform-origin: 0% 0%;
}
.aniCA{
  animation: cardAppear 1s;
}
.cityPic{
  position: relative;
  background: transparent;
  
  width: 400px;
  height: 140px;
  margin:30px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: 100% 100%;

}
.transparent{
  opacity: 0;
}
.card>h1{
  font-size: 14px;
  background: #6B69D6;
  display: inline-block;
  position: absolute;
  top: -22px;
  left: 20px;
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-weight: normal;
  letter-spacing: .1em;
}
.card>h2{
  font-size: 14px;
  background: #409eff;
  display: inline-block;
  position: absolute;
  top: -22px;
  right: 20px;
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-weight: normal;
  letter-spacing: .1em;
}
.borderRadius1{
 border-radius: 10px;
}
.borderRadius2{
  border-radius: 3px;
}
.cardBody{
  width: 360px;
  height: 100px;
  background: #ffffff;
  box-shadow: 4px 13px 30px 1px rgba(1, 0, 56, 0.1);
  line-height: 1.4em;
  text-indent: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:all 1s;
  position:relative;
}
.danmu{
  width: 360px;
  height: 100px;
  background: #ffffff;
  position:absolute;
  overflow: hidden;
  box-sizing: border-box;
  padding: 10px;
}
.danmu>div{
  display: inline-block;
  position: absolute;
  width: 400px;
  height: 30px;
  top:30px;
  line-height: 30px;
  animation: danmu 8s infinite linear;
}
p{
  margin:0 20px 0 20px;
}
.sort{
  font-size: 14px;
  background: #409eff;
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-weight: normal;
  letter-spacing: .1em;
  transform:translateX(-50%);
}
.transition{
  transition:all 1s;
}
.sortBig{
  font-size: 14px;
  background: #409eff;
  display: inline-block;
  width: 50px;
  height: 90px;
  text-align: center;
  line-height: 30px;
  font-weight: normal;
  letter-spacing: .1em;
  transform:translateX(-50%);
}
.menu{
  margin-left:10%;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.translucent{
  opacity: 0.3;
  background: #000;
}
@keyframes cardAppear {
  from{
    opacity: 0;
    transform: rotate(-30deg);
  }
  to{
    opacity: 1;
    transform: rotate(0deg);
  }
}
@keyframes danmu{
  0%{

  }
  50%{
    transform:translate(-300px,0);
  }
  80%{
    opacity: 0
  }
  100%{
    opacity: 0
  }
}
</style>