<template>

    <div>
        <div :class="sourceType_param == 1 ? 'hanDisPlayFlex' : 'hanDisPlayNone'" style="position: fixed;width:100%;height:2.2rem;line-height: 2.2rem; text-align: center;border-bottom: 1px #B3A9BF solid;background: #fff;top:0;left:0">
            <div style=" height:2.2rem;float: left;width:10%;" @click="$router.back(-1)">
                <img style="margin-top:0.25rem;text-align:center;  height: 1.5rem" src="../../static/img/ic_back_dark.png" >
            </div>
            <div style="float: left;width:80%;margin-right: 10%;text-align: left">{{queryParams.foodTypeName}}</div>
        </div>

        <div :class="sourceType_param == 2 ? 'hanDisPlayFlex' : 'hanDisPlayNone'" style="position: fixed;width: 100%;background: #ffffff;border-bottom: 1px solid #696363;height:2.2rem;line-height: 2.2rem;top:0;left:0">
            <div style=" height:2.2rem;float: left;width:10%;" @click="$router.back(-1)">
                <img style="margin-top:0.25rem;text-align:center;  height: 1.5rem" src="../../static/img/ic_back_dark.png" >
            </div>
            <input v-model="foodName_param"  style="padding-left: 8px; margin-top: 0.3rem;outline: none; background: #f0f0f0; height:1.6rem;line-height: 1.4rem;font-size:14px;float: left;width:80%;text-align: left">
            <div @click = "pushLocalStoreValue(foodName_param)" style="text-align: center;width: 10%;color: red; float: left;" class="iconfont icon-sousuo"></div>
        </div>

        <div style="position: fixed;width:100%;top:2.2rem; border-bottom: 1px #B3A9BF solid;height:  1.6rem;line-height: 1.6rem;background: #fff">
            <!--营养素排行-->
            <div @click="shanglaOrxiala = !shanglaOrxiala"  style="float: left;width:10%;line-height: 1.6rem;font-size: 14px;width: 30%;  " >
                <i style="padding-left: 15px;">{{nutrientNme_param}}</i>
                <i class="iconfont" :class="shanglaOrxiala ? 'icon-xiala' : 'icon-shangla'"></i>
            </div>
            <!--由高到低 由低到高-->
            <div @click="changePabulumSort " style="margin-left:40%;float: left;height: 100%;width:30%;color: red; font-size:14px;text-align: center"
                 :class = "nutrientSortBln_param  ? 'hanDisPlayFlex' :'hanDisPlayNone' ">
                {{nutrientSortParams[nutrientSort].sortName}}
            </div>
        </div>
        <!--营养素排行里的参数值-->
            <ul  :class="shanglaOrxiala ? 'hanDisPlayNone' :'hanDisPlayFlex'" style="background: #fff;position: fixed;margin-top: 3.8rem;">
                <li v-for="nutrientElement in nutrientElementParams" @click = "fun_changePabulumFont(nutrientElement)">
                    {{nutrientElement.nutrientNme}}
                </li>
            </ul>
        <div style="padding-top: 3.8rem;">
            <div v-for = "foodList in foodListArr" style="  height: 3.4rem;background: #f0f0f0;border-bottom: 1px solid #e5e5e5;">
                <!-- 跳转到食物的详情页面-->
                <router-link :to="{path:'/food/fooddetails',query:{'foodId':foodList.id,'foodName':foodList.foodCnNam}}">
                    <div style="clear:both;width: 16%;float: left;height: 3rem;text-align: center;">
                        <img v-if = "foodList.thumbImageUrl != ''" style="margin-top: 0.5rem; text-align: center;height: 2.4rem;width: 2.4rem;border-radius:25px" :src="foodList.thumbImageUrl">
                        <img v-else = "foodList.thumbImageUrl == ''" style="margin-top: 0.5rem; text-align: center;height: 2.4rem;width: 2.4rem;border-radius:25px" src="~/static/img/moren.png">
                    </div>
                    <div style="float: left;width: 74%; height: 3rem;padding-left: 5px;">
                        <div style="height: 1.5rem;padding-top: 7px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                            <i style="font-size: 14px;white-space: nowrap;color: black;">{{foodList.foodCnName}}</i>
                        </div>
                        <div style="margin-top: 0.2rem;">
                            <i style="font-size: 12px;color: #da3434;font-weight: 500;">{{foodList.calory | numToFloor}}</i><i style="font-size: 12px;color: #1f1b1b">&nbsp;千卡/100克</i>
                        </div>
                    </div>
                    <div style="width: 10%;float: left;height: 3rem;text-align: center;">
                        <img v-if = "foodList.healthLight == 1" style="margin-top: 1.2rem; height: 0.6rem;width: 0.6rem;" src="~/static/img/ic_food_light_green.png">
                        <img v-if = "foodList.healthLight == 2" style="margin-top: 1.2rem; height: 0.6rem;width: 0.6rem;" src="~/static/img/ic_food_light_yellow.png">
                        <img v-if = "foodList.healthLight == 3" style="margin-top: 1.2rem; height: 0.6rem;width: 0.6rem;" src="~/static/img/ic_food_light_red.png">
                    </div>
                </router-link>

            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {apiAjax} from '../../static/js/api.js'
    Vue.prototype.$apiAjax = apiAjax

    export default {
      data() {
        return {
          // 自动加载的距离 默认为一条数据的行高
          autoLoadingPosition:"3",
          // 搜索时的加载项目
          queryFoodParam:"",
          localStorageValue:[],

          // 默认加载的页码和行数
          page_param:1,
          pagenum_param:20,

          foodListArr:[],
          sourceType_param:"1",
          nutrientNme_param:"常见",
          nutrientCode_param:"",

          shanglaOrxiala:true,
          searchBarFixed:true,
          // 查询条件
          foodKindId_param:-1,
          foodType_param: -1,
          foodId_param:-1,
          foodName_param:'',
          orderName_param:'FOOD_CN_NAME',
          // ASC与nutrientSort == 1对应 DESC与与nutrientSort == 0对应
          orderSort_param:'ASC',

          queryParams: '',
          nutrientElementParams:[
            {"nutrientNme":"热量","nutrientCode":"calory","sort":"1"},
            {"nutrientNme":"蛋白质","nutrientCode":"protein","sort":"2"},
            {"nutrientNme":"脂肪","nutrientCode":"fat","sort":"3"},
            {"nutrientNme":"膳食纤维","nutrientCode":"fiber_dietary","sort":"4"},

            {"nutrientNme":"碳水化合物","nutrientCode":"carbohydrate","sort":"5"},
            {"nutrientNme":"维生素a","nutrientCode":"vitamin_a","sort":"6"},
            {"nutrientNme":"维生素b1","nutrientCode":"thiamine","sort":"7"},
            {"nutrientNme":"胡萝卜素","nutrientCode":"lactoflavin","sort":"8"},

            {"nutrientNme":"维生素c","nutrientCode":"vitamin_c","sort":"9"},
            {"nutrientNme":"维生素e","nutrientCode":"vitamin_e","sort":"10"},
            {"nutrientNme":"烟酸","nutrientCode":"niacin","sort":"11"},
            {"nutrientNme":"钠","nutrientCode":"natrium","sort":"12"},

            {"nutrientNme":"钙","nutrientCode":"calcium","sort":"13"},
            {"nutrientNme":"铁","nutrientCode":"iron","sort":"14"},
            {"nutrientNme":"钾","nutrientCode":"kalium","sort":"15"},
            {"nutrientNme":"碘","nutrientCode":"iodine","sort":"16"},

            {"nutrientNme":"锌","nutrientCode":"zinc","sort":"17"},
            {"nutrientNme":"硒","nutrientCode":"selenium","sort":"18"},
            {"nutrientNme":"镁","nutrientCode":"magnesium","sort":"19"},
            {"nutrientNme":"铜","nutrientCode":"copper","sort":"20"},

            {"nutrientNme":"锰","nutrientCode":"manganese","sort":"21"},
            {"nutrientNme":"胆固醇","nutrientCode":"cholesterol","sort":"22"}
          ],
          nutrientSortParams:[
            {"sortName":"由低到高↑","sortCode":"ASC","sort":"2"},
            {"sortName":"由高到低↓","sortCode":"DESC","sort":"1"}

          ],
          nutrientSort:0,
          nutrientSortBln_param: false

        }
      },
      mounted () {
        console.log(this.nutrientSort)
        this.queryParams = this.$route.query
        console.log("this.queryParams: ",this.queryParams)
        this.foodKindId_param = this.queryParams.foodKindId;
        this.foodName_param = this.queryParams.foodName;
        console.log("this.foodName_param: ", this.foodName_param)

        this.sourceType_param = this.queryParams.sourceType;
        console.log("sourceType_param",this.sourceType_param)

        if (localStorage.getItem("locaQueryHistoryList")) {
          this.localStorageValue =  localStorage.getItem("locaQueryHistoryList").split(",");
        }

        this.findAllFoodByQuery();
        console.log("this.foodKindId_param,",this.foodKindId_param)

        window.addEventListener('scroll', this.handleScroll);
      },
      methods: {
        pushLocalStoreValue(queryVal){
          var that = this;

          that.queryFoodParam = that.foodName_param;

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

          that.findAllFoodByQuery();

        },
        findAllFoodByQuery() {
          const that = this;

          console.log('-----------findAllFoodBy111Query-----111------',that.foodKindId_param,this.queryParams.foodKindId)

          const params = {
            "page":that.page_param,
            "pagenum": that.pagenum_param,
            "foodKindId": that.foodKindId_param,
//            "foodType": that.foodType_param,
//            "foodId": that.foodId_param,
            "foodName": that.foodName_param,
            "orderName":that.orderName_param,
            "orderSort": that.orderSort_param
          }

          console.log("that.queryParams",that.queryParams);
          const url = 'food/findAllFoodByQuery';

          this.$apiAjax.post(url,params,(res)=>{
            const that = this;
            that.foodListArr = res.data.data;
            console.log('---1111111111--222--',res.data.count)
            console.log(that.foodListArr)

          })

        },
        /**
         * 更改营养的由低再高 或者 由高到低的排序
         * @param param
         */
        changePabulumSort(){
          var that = this
          if (that.nutrientSort == 1) {
            that.nutrientSort = 0;
            that.orderSort_param = "ASC";
          } else {
            that.orderSort_param = "DESC";
            that.nutrientSort = 1;
          }

          console.log("that.nutrientSort",that.nutrientSort)
          that.findAllFoodByQuery();
        },
        /**
         * 更改营养排行
         * @param param
         */
        fun_changePabulumFont(param){
          var that = this;
          that.nutrientCode_param = param.nutrientCode;
          that.nutrientNme_param = param.nutrientNme;
          that.shanglaOrxiala = true;
          that.nutrientSortBln_param = true;

          that.orderName_param = param.nutrientCode;

          console.log("nutrientCode",param,that.nutrientNme_param,that.nutrientCode_param)
          console.log("排序字段",that.orderName_param);
          that.findAllFoodByQuery();

        },
        handleScroll () {
          var that = this;
          // 当前的距离
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          // 目前设定的自动加载的高度
          var offsetTop = that.page_param * that.pagenum_param * that.autoLoadingPosition * 5;

          console.log("scrollTop: ",scrollTop,"offsetTop: ",offsetTop);

          if (this.realDis == 0 ) {
            this.realDis = offsetTop;
          }
          if (scrollTop > offsetTop) {
            // 自动加载的高度 大于 当前距离时 页码加1 并出发重新加载的方法
            that.page_param = that.page_param + 1;

            const params = {
              "page":that.page_param,
              "pagenum": that.pagenum_param,
              "foodKindId": that.foodKindId_param,
//            "foodType": that.foodType_param,
//            "foodId": that.foodId_param,
              "foodName": that.foodName_param,
              "orderName":that.orderName_param,
              "orderSort": that.orderSort_param
            }

            console.log("that.queryParams",that.queryParams);
            const url = 'food/findAllFoodByQuery';

            this.$apiAjax.post(url,params,(res)=>{
              const that = this;
              that.foodListArr =  that.foodListArr.concat(res.data.data);
            })
          }
        }
      },
      destroyed () {
        window.removeEventListener('scroll', this.handleScroll)
      },
      filters: {
        numToFloor: function (value) {
          if (!value) return ''
          return Math.floor(value);
        }
      }
    }
</script>
<style>
    @font-face {
        font-family: 'iconfont';  /* project id 571611 */
        src: url('//at.alicdn.com/t/font_571611_r28yawoboo0i19k9.eot');
        src: url('//at.alicdn.com/t/font_571611_r28yawoboo0i19k9.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_571611_r28yawoboo0i19k9.woff') format('woff'),
        url('//at.alicdn.com/t/font_571611_r28yawoboo0i19k9.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_571611_r28yawoboo0i19k9.svg#iconfont') format('svg');
    }

    .iconfont {
        font-family:"iconfont" !important;
        font-size:16px;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .icon-search:before { content: "\e6ac"; }

    .icon-xiala:before { content: "\e6b9"; }

    .icon-sousuo:before { content: "\e61a"; }
    .icon-shangla:before { content: "\e797"; }
    .icon-shizhong:before { content: "\e74f"; }


    ul{
        clear: both;
        list-style:none;
        margin:0px;
        width:100%;
        line-height:26px;
        border-top:0px;
        font-size:12px;
        padding: 0;
        z-index: 99;
        position:absolute;
        border-bottom: 1px solid #ccc;


    }
    .hanDisPlayNone{
        display: none;
    }
    .hanDisPlayFlex{
        display: block;
    }
    ul li{
        /*display:block;*/
        width:33.3%;
        float:left;
        height:26px;
        line-height:26px;
        padding-left: 15px;
        border-bottom: 1px solid #ccc;
    }
    li:last-child{
        border: none;
    }


</style>