/**
* @Description:    vue-datetime-picker 移动端日期、时间选择插件，日期选择面板以日历形式展示。支持上下滑动切换日期、时间
* @Author:         TSY
* @CreateDate:     2019/05/23 00:08
* @email:          t@tsy6.com
*/
<template>
    <div class="body">
        <div class="tips" v-show="isShowTips"></div>
        <!--github入口-->
        <github></github>
    </div>
</template>

<script>
    import JSZip from 'jszip'
    import saveAs from './saveAs'
    import MapRange from "./MapRange";
    import MoneyDialog from "./MoneyDialog";
    import Github from "./Github";

    export default {
        name: "demo",
        components: {
            Github
        },
        data() {
            return {
                isShowTips: false,//是否显示下载提示
            }
        },
        mounted() {

        },
        methods: {

        }
    }
</script>

<style lang="stylus" scoped>

    * {
        font-size 14px
    }

    .tips {
        position fixed
        bottom 30%
        left 40%
        padding 10px 15px
        border-radius 5px
        color #fff
        background rgba(0, 0, 0, .8)
        z-index 999
    }
</style>
