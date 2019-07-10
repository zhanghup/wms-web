<template>
    <div class="wrap">
        <div class="search">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        </div>
        <div class="content">
          <el-menu :default-active="defaultActive" :router="true" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
            <div  v-for="(p,i) in menus" :key="p.path">
              <!-- 有子菜单 -->
              <el-submenu v-if="p.children && p.children.length > 0" :index="i+''">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{ p.name }}</span>
                </template>
                <div v-for="(c,ii) in p.children" :key="ii">
                  <el-submenu v-if="c.children && c.children.length > 0" :index="p.path+'/'+c.path">
                    <template slot="title">{{c.name}}</template>
                  </el-submenu>
                  <el-menu-item v-else  :index="p.path+'/'+c.path">
                    <span slot="title">{{ c.name }}</span>
                  </el-menu-item>
                </div>
              </el-submenu>

              <!-- 没有子菜单 -->
              <el-menu-item v-else :index="p.path">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ p.name }}</span>
              </el-menu-item>
            </div>
          </el-menu>
        </div>
    </div>
</template>

<script>
import {menus,ms} from '@/pages/index/router/modules/menus'
console.log(ms)
import { setTimeout } from 'timers';

export default {
  name:"menuTree",
  
  data() {
    return {
      defaultActive:'',
      filterText: '',
      menuDatas:[],
      menus:[]
    };
  },

  watch: {
    filterText(v){
      this.menus = this.filter(v,ms )
    }
  },
  methods: {
    filter(f,datas){
      if (f.length == 0){
        return datas
      }
      let resu = []
      for(let i = 0; i < datas.length; i++){
        if (datas[i].name.indexOf(f) > -1){
          resu.push(datas[i])
        }
      }
      return resu
    }
  },
  mounted(){
    let self =this
    setTimeout(function(){
      self.defaultActive = self.$route.path
    },300)
  },
  created(){
    this.menuDatas = menus
    this.menus = menus
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../assets/variables.scss";
.wrap{
  background-color: $bgc;
}
.search{
  height: 40px;

  .el-input{
    background: transparent;
    width: calc(100%);
    /deep/ .el-input__inner{
      border: none;
      color:#eee;
      font-size: 14px;
      background: rgba(0, 0, 0, 0.1);
      width: 100%;
    }
  }
}
.content{
  height: calc(100% - 40px);
  overflow-y: auto;
  padding-right: 18px;
}
</style>
