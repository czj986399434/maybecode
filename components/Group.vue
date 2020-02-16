<template>
  <div class="Group">
    <el-button @click="ceaaa">测试</el-button>
    <el-page-header @back="goBack" content="详情页面">
    </el-page-header>
    <el-collapse accordion class="homepage">
      <el-collapse-item v-for="(city,index) in oneProvince" :key="index">
        <template slot="title">
          {{city.cityName}}
          <i class="header-icon el-icon-info"></i>
          {{city.introduce}}

        </template>

        <div class="emptyBox" v-morecolor="111"></div>
        {{index}}
        <el-timeline :reverse="true">
          <el-timeline-item 
          :timestamp="content.timestamp" 
          placement="top" 
          v-for="(content,index) in contents"
          :key="index" 
          style="margin-bottom:30px;position: relative;">
          <el-card class="box-card">
           <div slot="header" class="clearfix">
            <span>{{content.title}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">置顶</el-button>
          </div>
          <div>{{content.body}}</div>
          <el-row >
            <el-col :span="12">
              <div class="emptyBox"></div>
            </el-col>
            <el-col :span="4">
              {{content.dianzanNum}}
              <i class="iconfont" v-show="!content.dianzan" @click="dianzan(index)">&#xe73c;</i>
              <i class="iconfont" v-show="content.dianzan" @click="dianzan(index)">&#xe7b4;</i>
            </el-col>
            <el-col :span="4">
              <i class="el-icon-s-order"></i>
            </el-col>
            <el-col :span="4">
              <i class="iconfont" @click="changeInput(index)">&#xe635;</i>
            </el-col>
          </el-row>
          <transition name = "fade">
            <el-input
            class="comment beWide"
            placeholder="评论区"
            v-model="input" 
            v-show="content.openinput"
            clearable>
          </el-input> 
        </transition>
        <el-divider></el-divider>
        <div
        v-for="(comment,cindex) in content.comments" 
        :key="cindex"
        :timestamp="comment.timestamp">
        <span v-morecolor="111">{{comment.content}}</span>
      </div>
      <div class="inBottom">
      </div>
    </el-card>
    <el-divider content-position="left">
      {{beautifulSentence[index]}}
    </el-divider>
  </el-timeline-item>
</el-timeline>
</el-collapse-item>
</el-collapse>


</div>
</template>

<script>
  import $ from 'jquery'
  import axios from 'axios';
  export default {
    name: 'Group',
    data () {
      return {
        host:this.$store.state.address,
        oneProvince:[],
        finalProvince:[],
        beautifulSentence:[,"我没了","你呢","生活就是一个劲的感悟"],
        input:"",
        activeNames: ['1'],
        index:"",
        editor: null,
        editorContent: '',
        cards:[],
        contents:[
        {
          title:"一致性 Consistency",
          body:"与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；",
          openinput:true,
          dianzan:false,
          dianzanNum:0,
          timestamp:"2018/4/12",
          comments:[{
            content: '活动按期开始',
            timestamp: '2018-04-15'
          }, {
            content: '通过审核',
            timestamp: '2018-04-13'
          }, {
            content: '创建成功',
            timestamp: '2018-04-11'
          }],
        },
        {
          title:"反馈 Feedback",
          body:"控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；",
          openinput:false,
          dianzan:true,
          dianzanNum:5,
          timestamp:"2018/4/15",
          comments:[{
            content: '活动按期开始',
            timestamp: '2018-04-15'
          }],
        },
        {
         title:"效率 Efficiency",
         openinput:false,
         dianzan:false,
         dianzanNum:0,
         timestamp:"2018/4/13",
         comments:[{
          content: '活动按期开始',
          timestamp: '2018-04-15'
        }],
      },
      {
       openinput:false,
       dianzan:false,
       dianzanNum:10,
       timestamp:"2018/4/12",
       comments:[{
        content: '创建成功',
        timestamp: '2018-04-11'
      }],
    },],
  }
},
methods:{
  ceaaa(){
    console.log(this.finalProvince)
  },
  goBack() {
    this.$router.push({path:"/FirstPage"});
  },
  handleChange(val) {
    console.log(val);
  },
  changeInput(index){
    this.contents[index].openinput=!this.contents[index].openinput;

  },
  dianzan(index){
        var dianzan=this.contents[index].dianzan;//靠这直接赋值而不是对象
        console.log(dianzan)
        this.contents[index].dianzan=!this.contents[index].dianzan;
        this.$nextTick(() => {
          if(this.contents[index].dianzan==true){
            this.contents[index].dianzanNum+=1;
          }
          else{
            this.contents[index].dianzanNum-=1;
          }
        })
      }
    },
    created(){
      var provinceName=this.$cookies.get("provinceName");
      console.log("此cookie值为"+provinceName);
      axios.get(`${this.host}/selectOneProvince`,{
       params:{
        provinceName:provinceName
      }
    }).then((data)=>{
     this.oneProvince=data.data;
     for(var i=0;i<this.oneProvince.length;i++){
      let aaaa=i;
      axios.get(`${this.host}/selectCards`,{
       params:{
        cityName:this.oneProvince[i].cityName
      }
    }).then((data2)=>{
     this.cards.push(data2.data);

   }); 
  }
});
    this.contents.sort(function(a,b){
      var shuzu1=a.timestamp.split("/");
      var shuzu2=b.timestamp.split("/");
      if(shuzu1[0]>shuzu2[0]){
        return 1;
      }else if(shuzu1[0]<shuzu2[0]){
        return -1;
      }
      else{
        if(shuzu1[1]>shuzu2[1]){
          return 1;
        }
        else if(shuzu1[1]<shuzu2[1]){
          return -1;
        }else{
          if(shuzu1[2]>shuzu2[2]){
            return 1;
          }else {
            return -1;
          }
        }
      }
    })

  },
  computed:{

  },
  mounted(){
  }


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
  width: 800px;
  height: 600px;
}
</style>