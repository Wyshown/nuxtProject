<template>
    <div class="search" style="overflow-y:auto;clear: both">
        <!--返回 查询列表-->
        <div style="width:100%;height:2.2rem;line-height: 2.2rem; text-align: center;border-bottom: 1px #B3A9BF solid;background: #fff">

            <div style="position: fixed;width: 100%;background: #ffffff;border-bottom: 1px solid #696363">
                <div style=" height:2.2rem;float: left;width:10%;" @click="$router.back(-1)">
                    <img style="margin-top:0.25rem;text-align:center;  height: 1.5rem" src="../../static/img/ic_back_dark.png" >
                </div>
                <input v-model="queryFoodParam" placeholder="请输入食物名称" style="padding-left: 8px; margin-top: 0.3rem;outline: none; background: #f0f0f0; height:1.6rem;line-height: 1.4rem;font-size:14px;float: left;width:80%;text-align: left">
                <div @click = "pushLocalStoreValue(queryFoodParam)" style="width: 10%;color: red; float: left;" class="iconfont icon-sousuo"></div>
            </div>
            <div style="padding-top: 2.2rem;">
                <div style="height: 1.8rem;background: #f0f0f0;width: 100%;text-align: left">
                    <i style="font-size: 14px;font-style: normal;padding-left: 17px">最近搜过</i>
                </div>
                <div v-if="localStorageValue.length" >
                    <div v-for = "localValue in localStorageValue" >
                        <div class="iconfont icon-shizhong" style="float: left;width: 10%;" ></div>
                        <div  @click="pushLocalStoreValue(localValue)" style="float: left;width: 80%;text-align: left;border-bottom: 1px solid #ccc;font-size: 14px;">{{localValue}}</div>

                        <div  @click="pushLocalStoreValue(localValue)"  class="iconfont icon-gengduo" style="float: left;width: 10%;border-bottom: 1px solid #ccc" > </div>
                    </div>
                </div>
                <div v-if="localStorageValue.length"  @click="clearLocalStoreValue" style="border-bottom: 1px solid #ccc;font-size: 14px;"><i class="iconfont icon-shanchu"></i><i style="font-style: normal;color: #7f828b">&nbsp;清空历史记录</i></div>

                <div v-if="!localStorageValue.length" style="height: 6rem;width: 100%;text-align: center;margin-top: 3rem;">
                    暂无历史查询记录
                </div>
            </div>
            <!--大家都在搜-->
            <div style="height: 1.8rem;background: #f0f0f0;width: 100%;text-align: left">
                <i style="font-size: 14px;font-style: normal;padding-left: 17px">大家都在搜</i>
            </div>
            <div v-for="(fixationValue,index) in fixationValueList">
                <div @click="pushLocalStoreValue(fixationValue)" style="float: left;width: 50%;border-bottom: 1px solid #ccc; ">{{fixationValue}}</div>
            </div>
        </div>
    </div>
</template>
<script>
  import Vue from 'vue';
  import {apiAjax} from '../../static/js/api.js'
  Vue.prototype.$apiAjax = apiAjax;

  export default {
    data(){
      return{
        queryFoodParam:"",
        queryFoodBln:false,
        localStorageValue:[],
        // 大家都在搜索
        fixationValueList:["苹果","香蕉","馒头","红薯","酸奶","米饭","玉米","鸡蛋","豆浆","草莓"]
      }

    },
    mounted(){
      if (localStorage.getItem("locaQueryHistoryList")) {
        this.localStorageValue =  localStorage.getItem("locaQueryHistoryList").split(",");
      }
    },
    methods: {
      // 添加查询的历史日志,并跳转到查询的二级页面
      pushLocalStoreValue(queryVal){
        var that = this;
        that.queryFoodParam = queryVal;
        console.log("queryVal: ",queryVal)
        if (queryVal == "") {
          return
        }

        // 判断是否包含 如果无测添加 证明无元素
        var valIndex =  that.localStorageValue.indexOf(queryVal);
        if (valIndex == -1) {
          that.localStorageValue.unshift(queryVal);
          localStorage.setItem("locaQueryHistoryList",that.localStorageValue);

        } else {
          that.localStorageValue.splice(valIndex,1)
          // 把元素添加为每一个
          that.localStorageValue.unshift(queryVal);
          localStorage.removeItem("locaQueryHistoryList");
          localStorage.setItem("locaQueryHistoryList",that.localStorageValue);
        }
        console.log("locaQueryHistoryList",that.localStorageValue)
        console.log("queryFoodParam",that.queryFoodParam)

        that.$router.push({
          path: '/food/foodList',
          query: {
            sourceType: 2,
            foodName: that.queryFoodParam
          }
        })

      },
      /*清空所有的查询历史记录*/
      clearLocalStoreValue(){
        var that = this;
        that.localStorageValue = [];
        localStorage.removeItem("locaQueryHistoryList");
      }

    }
  }

</script>
<style>

    @font-face {font-family: "iconfont";
        src: url('//at.alicdn.com/t/font_571611_mu4oppn8qqag7gb9.eot?t=1526980065558'); /* IE9*/
        src: url('//at.alicdn.com/t/font_571611_mu4oppn8qqag7gb9.eot?t=1526980065558#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
        url('//at.alicdn.com/t/font_571611_mu4oppn8qqag7gb9.ttf?t=1526980065558') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
        url('//at.alicdn.com/t/font_571611_mu4oppn8qqag7gb9.svg?t=1526980065558#iconfont') format('svg'); /* iOS 4.1- */
    }

    .iconfont {
        font-family:"iconfont" !important;
        font-size:16px;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .icon-moreunfold:before { content: "\e6a6"; }

    .icon-search:before { content: "\e6ac"; }

    .icon-shizhong:before { content: "\e74f"; }

    .icon-xiala:before { content: "\e6b9"; }

    .icon-sousuo:before { content: "\e61a"; }

    .icon-shangla:before { content: "\e797"; }

    .icon-gengduo:before { content: "\e620"; }

    .icon-sousuo:before { content: "\e61a"; }

    .icon-shanchu:before { content: "\e67c";font-size: 14px; }

    .hanDisPlayNone{
        display: none;
    }
    .hanDisPlayFlex{
        display: block;
    }
</style>

