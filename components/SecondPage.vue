<template>
  <div class="SecondPage">
    <el-button @click="nothing">测试</el-button>
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <el-row >
      <el-col :xs="8" :sm="8" :md="4" :lg="4" :xl="4">
        <el-button icon="el-icon-document-add" size="mini"type="primary" @click="addCard">添加</el-button>
      </el-col>
    </el-row>
    <el-collapse accordion class="homepage">
      <el-collapse-item v-for="(city,index) in oneProvince" :key="index">
        <template slot="title">
          {{city.cityName}}
          <i class="header-icon el-icon-info"></i>
          {{city.introduce}}
        </template>
        <div class="emptyBox" v-morecolor="111"></div>
        <el-timeline :reverse="true">
          <el-timeline-item 
          :timestamp="card.cardDate" 
          placement="top" 
          v-for="(card,index2) in city.cards"
          :key="index2" 
          style="margin-bottom:30px;position: relative;">
          <el-card class="box-card">
           <div slot="header" class="clearfix">
            <span>{{card.cardTitle}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">置顶</el-button>
            <el-button style="float: right; padding: 3px 10px" type="text" @click="deleteCard(index,index2)">删除</el-button>
          </div>
          <div>{{card.cardContent}}</div>
          <el-row >
            <el-col :span="12">
              <div class="emptyBox"></div>
            </el-col>
            <el-col :span="4">
              {{card.onehit}}
              <i class="iconfont" v-show="!card.dianzan" @click="dianzan(index,index2)">&#xe73c;</i>
              <i class="iconfont" v-show="card.dianzan" @click="dianzan(index,index2)">&#xe7b4;</i>
            </el-col>
            <el-col :span="4">
              <i class="el-icon-s-order"></i>
            </el-col>
            <el-col :span="4">
              <i class="iconfont" @click="changeInput(index,index2,nothing)">&#xe635;</i>
            </el-col>
          </el-row>
          <transition name = "fade">
            <el-input
            class="comment beWide"
            placeholder="点击其他区域即可发评论"
            v-model="input" 
            v-show="card.openinput"
            clearable
            maxlength="20"
            show-word-limit
            autofocus
            @blur="changeInput(index,index2,setComment)">
          </el-input> 
        </transition>
        <el-divider></el-divider>
        <div
        v-for="(comment,cindex) in card.comments" 
        :key="cindex">
        <el-row :gutter="70">
          <el-col :span="18" >
            <div class="commentsDiv" @mouseover="nothing"><span  v-morecolor="111">{{comment.commentAuthor}}:{{comment.comment}}</span></div>
            
          </el-col>
          <el-col :span="6"><i class="el-icon-circle-close" @click="deleteComment(index,index2,cindex)"></i></el-col>
        </el-row>
        
      </div>
      <div class="inBottom">
      </div>
    </el-card>
    <el-divider card-position="left">
      {{beautifulSentence[index]}}
    </el-divider>
  </el-timeline-item>
</el-timeline>
</el-collapse-item>
</el-collapse>
<el-dialog
title="添加卡片"
:visible.sync="dialogVisible"
width="30%"
>
<el-form ref="form" :model="add" label-width="80px">


  <el-form-item label="城市:">
   <el-row><el-col ::xs="18" :sm="18" :md="18" :lg="18" :xl="18">
     <el-select v-model="add.cityName" style="width: 100%;"clearable placeholder="请选择">
      <el-option
      v-for="(city,index) in oneProvince"
      :key="city.index"
      :label="city.cityName"
      :value="city.cityName">
    </el-option>
  </el-select>
</el-col></el-row>
</el-form-item >
<el-form-item label="标题:">
 <el-row><el-col ::xs="18" :sm="18" :md="18" :lg="18" :xl="18">
   <el-input 
   placeholder="请输入内容"
   v-model="add.cardTitle"
   maxlength="10"
   show-word-limit style="width: 100%;"></el-input>
 </el-col>
</el-row>

</el-form-item>
<el-form-item label="正文:">
 <el-row>
  <el-col ::xs="18" :sm="18" :md="18" :lg="18" :xl="18">
   <el-input
   type="textarea" 
   placeholder="请输入内容"
   v-model="add.cardContent"
   maxlength="50"
   show-word-limit style="width: 100%;">
 </el-input>
</el-col>
</el-row>

</el-form-item>
<el-form-item label="时间:">


  <el-row>
    <el-col ::xs="18" :sm="18" :md="18" :lg="18" :xl="18"> 
      <el-date-picker type="date" placeholder="选择日期" v-model="add.cardDate" style="width: 100%;">
      </el-date-picker>
    </el-col>
  </el-row>

</el-form-item>
</el-form>
<span slot="footer" class="dialog-footer">
  <el-row >
    <el-col :xs="8" :sm="15" :md="12" :lg="10" :xl="7">
      <el-button @click="dialogVisible = false">取 消</el-button>
    </el-col>
    <el-col :xs="4" :sm="9" :md="8" :lg="8" :xl="8">
      <el-button type="primary" @click="InsertCard">确 定</el-button>
    </el-col>
  </el-row>
  
  
</span>
</el-dialog>

</div>
</template>

<script>
  import $ from 'jquery'
  import axios from 'axios';
  export default {
    name: 'SecondPage',
    inject:["reload"],
    data () {
      return {
        host:this.$store.state.address,
        add:{
          cityName:"",
          cardTitle:"",
          cardContent:"",
          cardDate:"",
          onehit:0,
          openinput:0,
          dianzan:0,
        },
        dialogVisible:false,
        oneProvince:[],
        beautifulSentence:[,"我没了","你呢","生活就是一个劲的感悟"],
        input:"",
        activeNames: ['1'],
        index:"",
        editor: null,
        editorcard: '',
        cards:[],
      }
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
     deleteCard(index,index2){
      var cardId=this.oneProvince[index].cards[index2].cardId;
      if(cardId==null){
        this.getMessage(cardId,-1,null,"刚创建的卡片刷新后才可删除")
      }else{
        axios.get(`${this.host}/deleteCard?cardId=`+cardId).then((data)=>{
          this.getMessage(data.status,200,"删除成功","删除失败")
          this.oneProvince[index].cards.splice(index2,1);
          this.$forceUpdate();
        })
      }
      
    },
    InsertCard(){
      this.add.cardDate=this.dateFormat(this.add.cardDate)
      console.log(this.add.cardDate)
      axios.post(`${this.host}/insertCard`,this.add).then((data)=>{
        if(data.status===200){
          this.$message({
            type:"success",
            message:"添加成功!"
          })
          for(var i=0;i<this.oneProvince.length;i++){
            console.log("在筛选")
            if(this.oneProvince[i].cityName.trim().indexOf(this.add.cityName)!=-1){
              console.log(this.oneProvince[i].cards)
              if(this.oneProvince[i].cards){
                this.oneProvince[i].cards.push(this.add);
              }
              else{
                this.reload()
              }
              this.$forceUpdate();
            }
          }

        }
      })

      this.dialogVisible = false;
    },
    deleteComment(index,index2,cindex){
      console.log(this.oneProvince[index].cards[index2].comments[cindex])
      if(this.oneProvince[index].cards[index2].comments[cindex].commentId==null){
        this.$message({
          type: 'info',
          message: '最新评论请刷新再删除!'
        });
      }else{
        this.$confirm('是否删除该评论', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get(`${this.host}/deleteComment?commentId=`+this.oneProvince[index].cards[index2].comments[cindex].commentId).then((data)=>{
            if(data.status===200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.oneProvince[index].cards[index2].comments.splice(cindex,1);
              this.$forceUpdate();
            }else{
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
      
    },
    addCard(){
      this.dialogVisible=true;
    },
    nothing(){
      console.log()
    },
    goBack() {
      this.$router.push({path:"/FirstPage"});
    },
    handleChange(val) {
      console.log(val);
    },
    setComment(index,index2){
      if(this.input.trim()!==""){
        var cardId=this.oneProvince[index].cards[index2].cardId;
        var comment={
          comment:this.input,
          commentAuthor:"czj",
          cardId:cardId
        }
        axios.post(`${this.host}/insertComment`,comment).then((data)=>{
          if(data.status===200){
            this.oneProvince[index].cards[index2].comments.push(comment);
            this.$forceUpdate();
            this.$message({
              message: '添加成功',
              type: 'success'
            });
          }
          else{
            this.$message({
              message: '不知什么原因添加失败',
              type: 'error'
            });
          }
        })
      }
      else{
        this.$message({
          message:"不能评论空字符",
          type:"error"
        })
      }
      this.input="";
    },
    changeInput(index,index2,callback){
      this.oneProvince[index].cards[index2].openinput=!this.oneProvince[index].cards[index2].openinput;
      this.$forceUpdate() 
      callback(index,index2);
    },
    dianzan(index,index2){
        // var dianzan=this.cards[index].dianzan;//靠这直接赋值而不是对象
        // console.log(dianzan)
        this.oneProvince[index].cards[index2].dianzan=!this.oneProvince[index].cards[index2].dianzan;
        if(this.oneProvince[index].cards[index2].dianzan==true){
         this.oneProvince[index].cards[index2].onehit=this.oneProvince[index].cards[index2].onehit+1;
       }
       else{
        this.oneProvince[index].cards[index2].onehit=this.oneProvince[index].cards[index2].onehit-1;
      }
      var onehit=this.oneProvince[index].cards[index2].onehit;
      var cardId=this.oneProvince[index].cards[index2].cardId;
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

    }
  },
  created(){
   var provinceName;
   if(this.$cookies.get("provinceName")){
     provinceName=this.$cookies.get("provinceName");
   }
   if(this.$route.query.provinceName){
    provinceName=this.$route.query.provinceName;
  }
  console.log("此provinceName值为"+provinceName);
  axios.get(`${this.host}/selectOneProvince`,{
   params:{
    provinceName:provinceName
  }
}).then((data)=>{
 this.oneProvince=data.data;
 for(var i=0;i<this.oneProvince.length;i++){
  axios.get(`${this.host}/selectCards`,{
   params:{
    cityName:this.oneProvince[i].cityName
  }
}).then((data2)=>{
  for(var j=0;j<this.oneProvince.length;j++){
    if(data2.data[0]){
      if(this.oneProvince[j].cityName.trim().indexOf(data2.data[0].cityName)!=-1){
        this.oneProvince[j].cards=data2.data
      }
    }

    this.$forceUpdate() 
  }
}); 
}
});
},

}
</script>

<style scoped>
.Group{
 width: 300px;
 margin:0 auto;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
  opacity: 0
}
.box-card {
  width: 480px;
  min-height: 300px;
  height: auto;
}
.emptyBox{
  height: 30px;
}
.homepage{
  width: 600px;
  height: 600px;
}
.commentsDiv{
  width: 100%;height: 24px;
}
body{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>