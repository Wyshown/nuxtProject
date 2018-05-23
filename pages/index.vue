<template>
    <div style="background: #f5f5f5">
        <div class="home_head">
            <p style="text-align: center;color: white; font-weight: 600; font-size: 18px; padding-top: 1rem;box-sizing: border-box">食物派</p>
            <p style="text-align: center;color: white; font-size: 14px; padding-top: 4rem;box-sizing: border-box">查询食物信息</p>
            <div  :class="searchBarFixed == true ? 'isFixed' :''" id="searchBar" >
                <router-link :to = "{path:'search/search'}">
                    <input placeholder="请输入食物名称" :class="searchBarFixed == true ? 'inputClassFixed' :'inputClass'">
                </router-link>
                <i class="iconfont icon-search" :class="searchBarFixed == true ? 'iClassFixed' :'iClass'"></i>
            </div>

        </div>
        <div v-for="foodKind_for in foodKindArr" class = "forDiv clear">
            <div class="forFoodKindType">
                <a v-if="foodKind_for.foodKind == 'group'">食物分类</a>
                <a v-if="foodKind_for.foodKind == 'brand'">热门品牌</a>
                <a v-if="foodKind_for.foodKind == 'restaurant'">连锁餐饮</a>
            </div>
            <div style="padding-left: 0.5rem;">
                <div class="groupKindName" v-if="foodKind_for.foodKind == 'group'" v-for="forParams in foodKindType_groupArr">
                    <div class="forFoodKindImg">
                        <!--sourceType为1 代表从首页列表页进来 sourceType为2 代表从首页查询入口进来-->
                        <router-link :to="{path:'/food/foodList',query:{foodTypeName:forParams.foodKindName,foodKindId:forParams.id,sourceType:1}}">
                            <img style="text-align: center;height: 3.5rem;width: 3.5rem;" :src="forParams.imageUrl">
                        </router-link>
                    </div>
                    <div style="white-space: nowrap; height: 1rem;width:5rem;line-height: 1rem;text-align: center;">
                        {{forParams.foodKindName}}
                    </div>
                </div>
            </div>

            <div class="forFoodKindName" v-if="foodKind_for.foodKind == 'brand'" v-for="forParams in foodKindType_brandArr">
                <div class="forFoodKindImg">
                    <router-link :to="{path:'/food/foodList',query:{foodTypeName:forParams.foodKindName,foodKindId:forParams.id}}">
                        <img style="text-align: center;height: 2rem;width: 3.5rem;" :src="forParams.imageUrl">
                    </router-link>
                </div>
                <div style="height: 1rem;width:5rem;line-height: 1rem;text-align: center;">
                    {{forParams.foodKindName}}
                </div>
            </div>
            <div class="forFoodKindName" v-if="foodKind_for.foodKind == 'restaurant'" v-for="forParams in foodKindType_restaurantArr">
                <div class="forFoodKindImg">
                    <router-link :to="{path:'/food/foodList',query:{foodTypeName:forParams.foodKindName,foodKindId:forParams.id}}">
                        <img style="text-align: center;height: 2rem;width: 3.5rem;" :src="forParams.imageUrl">
                    </router-link>
                </div>
                <div style="height: 1rem;width:5rem;line-height: 1rem;text-align: center;">
                    {{forParams.foodKindName}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import NuxtLink from '../.nuxt/components/nuxt-link'
import {apiAjax} from '../static/js/api.js'
Vue.prototype.$apiAjax = apiAjax

export default {

  data(){
    return {
      foodKindArr:[],
      foodKindType_groupArr:[],
      foodKindType_brandArr:[],
      foodKindType_restaurantArr:[],
      searchBarFixed:false,
      realDis:0 //搜索框真实距离

    }
  },
  mounted() {
    this.findAllFoodKindTypeAndTypeList();
    window.addEventListener('scroll', this.handleScroll);


  } ,
  methods: {
    // 活的首页列表页面
    findAllFoodKindTypeAndTypeList () {
      console.log("------------1----------")
      const url = 'foodKind/findAllFoodKindTypeAndTypeList';
      const params = {}
      this.$apiAjax.post(url,params,
        (res) => {
          let that = this;
          that.foodKindArr = res.data.foodKind;
          that.foodKindType_groupArr = res.data.foodKindType_group;
          that.foodKindType_brandArr = res.data.foodKindType_brand
          that.foodKindType_restaurantArr = res.data.foodKindType_restaurant;
        }
      )
    },
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var offsetTop = document.querySelector('#searchBar').offsetTop
      if (this.realDis == 0 ) {
        this.realDis = offsetTop;
      }
      if (scrollTop > this.realDis) {
        this.searchBarFixed = true
        console.log("this.searchBarFixed",this.searchBarFixed)
      }
      else {
        this.searchBarFixed = false
        console.log("this.searchBarFixed",this.searchBarFixed)
      }
    },

  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  components: {
    NuxtLink
  }
}
</script>
<style scoped>
    .home_head{
        height: 11.5rem;
        position: relative;
        background-size: cover;
        background-image:url('./../static/img/img_home_bg.png');
    }
    .forDiv{
        margin-top: 1rem;
        margin-left: 5%;
        margin-right: 5%;
        background: #FFFFFF;

    }
    .forFoodKindType {
        text-align: center;
        height: 1.8rem;
        border:1px dashed #e8e1e1;
        color: #aaa;
        font-size: 14px;
        padding-top: 4px;
    }
    .groupKindName {
        margin-top: 0.5rem;
        margin-left:1.4rem;
        float:left;
        width:5rem;
        height:5rem;
        font-size: 10px;
    }
    .forFoodKindName {
        margin-top: 0.5rem;
        margin-left:1.4rem;
        float:left;
        width:5rem;
        height:4rem;
        font-size: 10px;
    }
    .search{
        background-image:url(./../static/img/search.png);
        position:absolute;
        width:50px;
        height:50px;
        top:4px;
        left:100px;
        z-index:99;
    }

    .forFoodKindImg {
        display: table-cell;
        vertical-align: middle;
        text-align:center;
        width: 5rem;
        height: 2rem;
    }
    .clear:after{
        content:'';
        display:block;
        clear:both;
    }
    @font-face {font-family: "iconfont";
        src: url('//at.alicdn.com/t/font_571611_dxmqp5t4qw6lmcxr.eot?t=1519295953408'); /* IE9*/
        src: url('//at.alicdn.com/t/font_571611_dxmqp5t4qw6lmcxr.eot?t=1519295953408#iefix') format('embedded-opentype'), /* IE6-IE8 */
        url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAWAAAsAAAAAB/gAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFZW70iWY21hcAAAAYAAAABeAAABhpvoBr5nbHlmAAAB4AAAAbMAAAHkrDfvsGhlYWQAAAOUAAAALwAAADYQiMGeaGhlYQAAA8QAAAAcAAAAJAfeA4RobXR4AAAD4AAAAAwAAAAMC+kAAGxvY2EAAAPsAAAACAAAAAgAdgDybWF4cAAAA/QAAAAfAAAAIAESAF1uYW1lAAAEFAAAAUUAAAJtPlT+fXBvc3QAAAVcAAAAIwAAADTX4Nt+eJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2Bk/sE4gYGVgYOpk+kMAwNDP4RmfM1gxMjBwMDEwMrMgBUEpLmmMDgwVDxbw9zwv4EhhrmBoREozAiSAwAwKQ0ZeJzFkMENgDAMAy9t6QMxCA8G4sUcHapzdY1iQnkwQS05VhxLiQIsQBQPMYFdGA9OueZ+ZHU/eSZLjUBptXf1nyqiWXYNKplpsHmr/9i87qPTVyiDOrHVl4QbCv0OPwAAeJw1kDtrFGEYhb/3u883N3euu7PZnZ0dM6PEjDjupYjOFtooQgSrdOYHxDaN4DaCiIX9khQi2EZiGbCwjsX+A9Fqkf0Jq18EXx5eDhxOcQ5iCP35QS5IG/noBrqDHqKnCAHfgaGDe5CVowrvQJixMA4cUuZlJvJhRe5DPORBVE9GRcwFd8GBPtzN6klZ4RLGowbvQR31ADrd5Jm3veWR96DaZf/15jH+AGGab7nN7ubRrVlQD3x5bHlex/PeSc6YxJi6DhzFkcEMxTcfmZuEF+lNnILVKZMnB/ag6x2+Gb3obccGwHwOfnfgfJq1kpbmZRL5Xkdcs2U7sfPrARz/Mtu+1St+In2gu74iv8kc7SPEivFtKP4RR1w0MK6gdED0Ia5noGmgAhfrJVwtygam2gm4cCAlUQqasphMr3pPGyArzJQKvwZKEMC8eUBXn89WjK3OpCycbFcp4am8bxCzby8uKb1cLL7TvanAGDPDDK5yWkqJnUC/5xSkaUXfQlPqQax7pwfna8bW51/WDIiyqRcoYkpMgC5PT5aULk/2344tyen/FNcpEbSwsAxd+y9IektQAHicY2BkYGAAYjeev4vi+W2+MnCzMIDAtS37LiLo//UsDMwNQC4HAxNIFABOMQvjAHicY2BkYGBu+N/AEMPCAAJAkpEBFTADAEcJAmwEAAAAA+kAAAQAAAAAAAAAAHYA8nicY2BkYGBgZghkYGUAASYg5gJCBob/YD4DABD3AXAAeJxlj01OwzAQhV/6B6QSqqhgh+QFYgEo/RGrblhUavdddN+mTpsqiSPHrdQDcB6OwAk4AtyAO/BIJ5s2lsffvHljTwDc4Acejt8t95E9XDI7cg0XuBeuU38QbpBfhJto41W4Rf1N2MczpsJtdGF5g9e4YvaEd2EPHXwI13CNT+E69S/hBvlbuIk7/Aq30PHqwj7mXle4jUcv9sdWL5xeqeVBxaHJIpM5v4KZXu+Sha3S6pxrW8QmU4OgX0lTnWlb3VPs10PnIhVZk6oJqzpJjMqt2erQBRvn8lGvF4kehCblWGP+tsYCjnEFhSUOjDFCGGSIyujoO1Vm9K+xQ8Jee1Y9zed0WxTU/3OFAQL0z1xTurLSeTpPgT1fG1J1dCtuy56UNJFezUkSskJe1rZUQuoBNmVXjhF6XNGJPyhnSP8ACVpuyAAAAHicY2BigAAuBuyAmZGJkZmRhYGxgq04NbEoOYOBAQAVxAMRAA==') format('woff'),
        url('//at.alicdn.com/t/font_571611_dxmqp5t4qw6lmcxr.ttf?t=1519295953408') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
        url('//at.alicdn.com/t/font_571611_dxmqp5t4qw6lmcxr.svg?t=1519295953408#iconfont') format('svg'); /* iOS 4.1- */
    }

    .iconfont {
        font-family:"iconfont" !important;
        font-size:16px;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .icon-search:before { content: "\e6ac"; }

    input::-webkit-input-placeholder{
        color: #dc6710;
    }
    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:#dc6710;
    }
    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:#dc6710;
    }
    input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
        color:#dc6710;
    }
    .isFixed{
        clear: both;
        position:fixed;
        top: 0;
        background: red;
        outline:none;
        width:100%;
        height:2.4rem;
        bottom: 1rem;
        background: #eb854b;

    }
    .inputClass{
        padding-left: 10px;
        padding-right: 40px;
        outline:none;
        width:90%;
        height:2rem;
        margin-left: 5%;
        position:absolute;
        bottom: 1rem;
    }
    .inputClassFixed{
        padding-left: 10px;
        outline:none;
        width:90%;
        height:2rem;
        margin-left: 5%;
        bottom: 1rem;
        margin-top: 0.2rem;
    }

    .iClass{
        color: #DC8F5B;
        font-size: 1.2rem;
        position: absolute;
        bottom: 1.2rem;
        left: 88%;
        z-index: 1
    }
    .iClassFixed{
        color: #DC8F5B;
        font-size: 1.2rem;
        position: absolute;
        bottom: 1.2rem;
        left: 88%;
        z-index: 1;
        top: 8px;
    }

</style>

