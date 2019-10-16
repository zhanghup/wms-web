<template>
  <div >
    <div>
      <div class="filter-select" v-if="filters && filters.length > 0">
        <div class="flex">
          <el-dropdown size="mini" @command="selectType" >
            <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon--right"></i></span>
            <span style="font-size:12px;margin-left:5px;">{{selectText}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in filters" :command="item.key" :key="item.key">{{item.title}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div v-for="item in filters" :key="item.key" v-show="select == item.key" style="display:flex;">
            <el-input style="width:180px" v-if="item.type == 'string'" size="mini" v-model="query[item.key]" :placeholder="'请输入'+item.title" />
            <el-input-number style="width:180px" v-show="select == item.key" v-if="item.type == 'number'" size="mini" v-model="query[item.key]"  :label="'请输入' + item.title" />
          </div>
            <el-button size="mini" @click="filterSearch()" icon="el-icon-search"></el-button>
        </div>
      </div>
      <div>
        <el-tag v-for="item in tags" style="margin-right:5px;" :key="item.key" @close="tagClose(item.key)"  closable type="success">{{item.title + ":"+item.value}}</el-tag>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'z-filter',
  props: {
    filters: Array
  },
  data () {
    return {
      select: '',
      selectText: '',
      query: {},
      queryModel: {},
      tags: []
    }
  },
  computed: {
  },
  methods: {
    selectType (ty) {
      this.select = ty
      this.selectText = this.filters.find(r => r.key === ty).title
    },
    tagClose (key) {
      delete this.queryModel[key]
      this.tagFormat()
    },
    filterSearch () {
      this.queryModel[this.select] = {
        key: this.select,
        title: this.selectText,
        type: this.query[this.select],
        value: this.query[this.select],
        time: new Date().getTime()
      }
      this.query = {}
      this.tagFormat()
    },
    tagFormat () {
      let result = []
      for (let k in this.queryModel) {
        result.push(this.queryModel[k])
      }
      this.tags = result.sort((o1, o2) => o1.time < o2.time)
      this.onSearch()
    },
    onSearch () {
      let query = {}
      for (let o of this.tags) {
        switch (o.type) {
          default:
            query[o.key] = o.value
        }
      }
      this.$emit('on-search', query)
    },
    initFilter () {
      if (this.filters && this.filters.length > 0) {
        this.select = this.filters[0].key
        this.selectText = this.filters[0].title
      }
    }
  },
  mounted () {
  },
  created () {
    this.initFilter()
  }
}
</script>
<style lang="scss" scoped>
$radius:0px;
$border:#C0C4CC;

.filter-select{
  display: inline-block;

  .flex{
    display: flex;
    border:1px solid $border;
    border-radius: $radius;

    /deep/ .el-dropdown-menu__item{
      line-height:28px;
      height:28px;
      font-size:12px;
    }
    /deep/ .el-dropdown{
      display:flex;
      align-items:center;
      background:#fff;
    }

    /deep/ .el-select--mini{
      .el-input--mini input{
        color: #444;
      }
      .el-icon-arrow-up{
        color: #444;
      }

    }
    /deep/ .el-input--mini input{
      border:none;
      border-radius: 0;
      border-bottom-left-radius: $radius;
      border-top-left-radius: $radius;
    }
    /deep/ .el-button--mini{
      border:none;
      border-left: 1px solid $border;
      border-radius: 0;
      border-bottom-right-radius: $radius;
      border-top-right-radius: $radius;
    }
  }
}
</style>
