<template>
    <div class="wrap">
        <div class="search">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        </div>
        <div class="content">
          <el-tree class="filter-tree" :data="menuDatas" :props="defaultProps" default-expand-all :filter-node-method="filterNode" @node-click="router" ref="menuTree"></el-tree>
        </div>
    </div>
</template>

<script>
import menu from '@/pages/index/router/modules/menus'

  export default {
    name:"menuTree",
    watch: {
      filterText(val) {
        this.$refs.menuTree.filter(val);
      }
    },
    data() {
      return {
        filterText: '',
        menuDatas:[],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      };
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      router(a,b,c){
        if (!b.isLeaf){
          return
        }
        function PathFormat(node){
          let path = node.data.path
          if (path.lastIndexOf("/") == path.length - 1){
            path = path.substr(0,path.length -1)
          }
          if (node.level == 1){
            return path
          }
          return PathFormat(node.parent) + "/" + path
        }
        let path = PathFormat(b)
        this.$router.push(path)
      }
    },
    created(){
      this.menuDatas = menu
    }
  };
</script>

<style lang="scss" scoped>
$bg : rgb(48, 65, 86);
$font:rgb(191, 203, 217);
.wrap{
  background-color: $bg;
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
  .filter-tree{
    background-color: $bg;
    /deep/ .el-tree-node__label{
      color:$font;
    }
    /deep/ .el-tree-node__content{
      cursor: pointer;
      color: inherit;
      text-decoration: none;
      background-color: transparent;
    }
    /deep/ .el-tree-node__content:hover{
      cursor: pointer;
      color: inherit;
      text-decoration: none;
      background-color: #001528;
    }
  }
}
</style>
