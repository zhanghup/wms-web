<script>
export default {
  name:'eventBus',
  created(){
    this.$on("init-dict",dicts=>{
      this.$store.commit('common/SET_DICT',dicts)
    })
  }
}
</script>