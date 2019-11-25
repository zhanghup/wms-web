<template>
  <div style="display:inline-block;">
    <i class="iconfont iconcaidan" @click="onOpen" />
    <el-drawer title="菜单权限" :visible.sync="open" direction="rtl" size="560px">
      <div class="transfer" v-if="open">
        <div class="left">
          <div class="content">
            <div style="text-align:center;">
              <h3>未分配权限</h3>
            </div>
            <el-tree default-expand-all ref="leftTree" node-key="id" :data="menus" show-checkbox> </el-tree>
          </div>
        </div>
        <div class="middle">
          <div>
            <el-button icon="el-icon-arrow-right" circle @click="toRight"></el-button>
          </div>
          <div style="height:20px;"></div>
          <div>
            <el-button icon="el-icon-arrow-left" circle @click="toLeft"></el-button>
          </div>
        </div>
        <div class="right">
          <div class="content">
            <div style="text-align:center;">
              <h3>已分配权限</h3>
            </div>
            <el-tree default-expand-all ref="rightTree" node-key="id" :data="selectMenus" show-checkbox> </el-tree>
          </div>
        </div>
      </div>
      <div class="bottom">
        <el-button :loading="loading" type="primary" @click="onOk" style="width:100%;border-radius:0px;position:absolute;bottom:0px;padding:10px 0;font-size:16px;">确&nbsp;&nbsp;&nbsp;&nbsp;定</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import Menus from "../../../router/index";
export default {
  name: "system-modules-role-menu",
  props:{
    role:{required:true,type:String}
  },
  data() {
    return {
      open: false,
      menus: [],
      selectMenus: [],
      perms: [],
      loading:false,
    };
  },
  methods: {
    onOpen() {
      this.loadData()
      this.open = true;
    },
    loadData(){
      this.$query(`
        query Perms{
          role_perms(id:"${this.role}",type:"menu")
        }
      `).then(r=>{
        this.perms = r.role_perms
        this.initMenu();
        this.initSelectMenu();
      })
    },
    formatPerms() {
      let a = {};
      for (let o of this.perms) {
        a[o] = 1;
      }
      this.perms = [];
      for (let k in a) {
        this.perms.push(k);
      }
    },
    toRight() {
      let ids = this.$refs.leftTree.getCheckedKeys();
      let ids2 = this.$refs.leftTree.getHalfCheckedKeys();
      this.perms = [...this.perms, ...ids, ...ids2.map(r => `$$$${r}`)];
      this.formatPerms();
      this.initMenu();
      this.initSelectMenu();
    },
    toLeft() {
      let ids = this.$refs.rightTree.getCheckedKeys();
      let result = [];
      for (let o of this.perms) {
        if (ids.indexOf(o.replace("$$$", "")) == -1) {
          result.push(o);
        }
      }
      this.perms = result;
      this.formatPerms();
      this.initMenu();
      this.initSelectMenu();
    },

    initMenu() {
      let routes = Menus.options.routes;
      let self = this;
      let unselect = self.perms
        .filter(r => r.indexOf("$$$") == -1)
        .map(r => r.replace("$$$", ""));
      function format(ms) {
        if (!ms || ms.length == 0) return [];
        let result = [];
        for (let o of ms) {
          if (!o.id) continue;
          if (unselect.indexOf(o.id) !== -1) continue;
          let m = {
            id: o.id,
            label: o.name,
            children: format(o.children)
          };
          result.push(m);
        }
        return result;
      }
      this.menus = format(routes);
    },
    initSelectMenu() {
      let routes = Menus.options.routes;
      let self = this;
      let unselect = self.perms.map(r => r.replace("$$$", ""));
      function format(ms) {
        if (!ms || ms.length == 0) return [];
        let result = [];
        for (let o of ms) {
          if (!o.id) continue;

          if (unselect.indexOf(o.id) === -1) continue;
          let m = {
            id: o.id,
            label: o.name,
            children: format(o.children)
          };
          result.push(m);
        }
        return result;
      }

      this.selectMenus = format(routes);
    },
    onOk(){
      this.loading = true
      this.$mutate(`
        mutation Ok( $perms: [String!]!){
          role_perm_create(id:"${this.role}",type:"menu",perms:$perms)
        }
      `,{
        perms:this.perms
      }).then(r=>{
        this.$emit("on-ok")
        this.open = false
        this.loading = false
      }).catch(r=>{
        this.loading = false
      })
    }
  },
  created() {
  }
};
</script>
<style lang="less" scoped>
.transfer {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  justify-content: center;

  .middle {
    width: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    button {
      width: 34px;
    }
  }
  .left,
  .right {
    width: 220px;
    padding: 10px;
  }
  .content {
    border: 1px solid #ccc;
    height: 100%;
  }
}
.bottom {
  height: 60px;
}
</style>