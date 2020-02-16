import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import FirstPage from '../components/FirstPage'
import SecondPage from '../components/SecondPage'
import Group from '../components/Group'
import ceshi from '../components/ceshi'
import CopyMap from '../components/CopyMap'
import timeline from '../components/timeline'
import moban from '../components/moban'
import showPic from '../components/showPic'
import complexFirstPage from '../components/complexFirstPage'
import tabSet from '../components/tabSet'
import complexSecondPage from '../components/complexSecondPage'
import navigation from '../components/navigation'
Vue.use(Router)

export default new Router({
  routes: [
  {
    path:"/FirstPage",
    name:"FirstPage",
    component:FirstPage
  },
  {
    path:"/SecondPage",
    name:"SecondPage",
    component:SecondPage
  },
  {
    path:"/Group",
    name:"Group",
    component:Group
  },
  {
   path:"/ceshi",
   name:"ceshi",
   component:ceshi,
 },{
   path:"/CopyMap",
   name:"CopyMap",
   component:CopyMap,
 },{
  path:"/timeline",
  name:"timeline",
  component:timeline
},{
 path:"/moban",
 name:"moban",
 component:moban,
},{
  path:"/showPic",
  name:"showPic",
  component:showPic,
},{
  path:"/complexFirstPage",
  name:"complexFirstPage",
  component:complexFirstPage,
},{
  path:"/tabSet",
  name:"tabSet",
  component:tabSet,
},{
  path:"/complexSecondPage",
  name:"complexSecondPage",
  component:complexSecondPage,
},{
  path:"/navigation",
  name:"navigation",
  component:navigation,
}
],
mode:"history"
})
