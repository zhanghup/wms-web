<script>
export default {
    functional: true,
    name:"components-table-modules-column-render",
    render: function (h, ctx){
        return ctx.props.render(h,{row: ctx.props.row})
    },
    props: {
        render : Function,
        col: Object,
        row: Object
    },
    created(){
    }
}
</script>