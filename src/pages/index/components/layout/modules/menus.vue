<template>
    <div class="wrap">
        <div class="search">
          <el-input v-show="!collapse" placeholder="输入菜单名称进行过滤" v-model="filterText"></el-input>
          <div @click="collapse = !collapse" style="cursor:pointer;">
            <i v-show="!collapse" class="el-icon-s-fold"></i>
            <i v-show="collapse" class="el-icon-s-unfold"></i>
          </div>
        </div>
        <div class="content">
          <el-menu :collapse="collapse" :default-active="defaultActive" :router="true" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
            <div  v-for="(p,i) in menus" :key="p.path">
              <!-- 有子菜单 -->
              <el-submenu v-if="p.children && p.children.length > 0" :index="i+''">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span v-show="!collapse">{{ p.name }}</span>
                </template>
                <div v-for="(c,ii) in p.children" :key="ii">
                  <el-submenu v-if="c.children && c.children.length > 0" :index="menuMap[p.key]">
                    <template slot="title">{{c.name}}</template>
                  </el-submenu>
                  <el-menu-item v-else  :index="p.path+'/'+c.path">
                    <span slot="title">{{ c.name }}</span>
                  </el-menu-item>
                </div>
              </el-submenu>

              <!-- 没有子菜单 -->
              <el-menu-item v-else :index="menuMap[p.key]">
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

import { setTimeout } from 'timers';

export default {
  name:"zmenu",
  
  data() {
    return {
      collapse:false,
      defaultActive:'',
      filterText: '',
      menuDatas:[],
      menus:[],
      menuMap:{},
    };
  },

  watch: {
    filterText(v){
      this.menus = this.filter(v,ms)
      
    }
  },
  methods: {
    index(datas,prefix){
      if (!prefix || prefix.length == 0){
        prefix = ""
      }
      for(let i = 0; i < datas.length; i++){
        let url = ""
        if (datas[i].path.indexOf("/") === 0){
          url = datas[i].path
        }else{
          url = "/" + datas[i].path
        }
        if(datas[i].key){
          this.menuMap[datas[i].key] = prefix + url
        }

        if (datas[i].children && datas[i].children.length > 0){
          this.index(datas[i].children,url)
        }
      }
    },
    filter(f,datas){
      let resu = []

      if (f.length == 0){
        return menus
      }
      
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
    this.index(menus)
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../../style/variables.scss";
.wrap{
  background-color: $bgc;
  display: flex;
  flex-direction: column;
}
.search{
  display: flex;
  justify-content: center;

  .el-input{
    padding: 0px;
    border-radius: 0px;
    background: transparent;
    /deep/ .el-input__inner{
      border: none;
      color:#eee;
      font-size: 14px;
      background: rgba(0, 0, 0, 0.1);
      width: 100%;
      border-radius: 0px;
    }
  }
  div{
    padding: 8px;
    i{
      font-size: 24px;
      color: #fff;
    }
  }
}
.content{
  flex-grow: 1;
  overflow-y: auto;
  position: relative;
  .el-menu{
    border: none;
  }  
}

// 滚动条样式
::-webkit-scrollbar {/*滚动条整体样式*/
  width: 0px;    
}

</style>
