<template>
    <div>
        <div style="position: fixed;width:100%;height:2.2rem;line-height: 2.2rem; text-align: center;border-bottom: 1px #B3A9BF solid;background: #fff;top:0;left:0">
            <div style=" height:2.2rem;float: left;width:10%;" @click="$router.back(-1)">
                <img style="margin-top:0.25rem;text-align:center;  height: 1.5rem" src="../../static/img/ic_back_dark.png" >
            </div>
            <div style="float: left;width:80%;margin-right: 10%;font-size: 14px;">营养元素</div>
        </div>

        <div class = "divTable1" style="background: #f0f0f0;">
            <div class = "divTr"><p class="divTh" style="color: #999">营养元素</p></div>
            <div class = "divTr"><p class="divTh" style="color: #999">每100g</p></div>
            <div class = "divTr"><p class="divTh" style="color: #999">备注</p></div>
        </div>

        <div class = "divTable" style="padding-top: 4.4rem;">
            <div class = "divTr"><p class="divTh">热量</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.calory}} 千卡</p></div>
            <div class = "divTr"><p v-if="foodDetails.caloryStateRemark == 3" class="divTh" style="color: #ff5c4b">高热量</p></div>
        </div>

        <div class = "divTable">
            <div class = "divTr"><p class="divTh">蛋白质</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.protein}} 克</p></div>
            <div class = "divTr"><p v-if="foodDetails.fatStateRemark == 3" class="divTh" style="color: #ff5c4b">高蛋白</p></div>
        </div>
        <div class = "divTable">
            <div class = "divTr"><p class="divTh">脂肪</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.fat}} 克</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>
        <div class = "divTable">
            <div class = "divTr"><p class="divTh">碳水化合物</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.carbohydrate}} 克</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>
        <div class = "divTable">
            <div class = "divTr"><p class="divTh">膳食化纤</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.fiberDietary}} 克</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>

        <div class = "divTable">
            <div class = "divTr"><p class="divTh">维生素A</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.vitaminA}} μgRe</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>
        <div class = "divTable">
            <div class = "divTr"><p class="divTh">维生素B1(硫胺素)</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.thiamine}} 毫克</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>
        <div class = "divTable">
            <div class = "divTr"><p class="divTh">胡萝卜素</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.lactoflavin}} 微克</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>
        <div class = "divTable">
            <div class = "divTr"><p class="divTh">维生素C</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.vitaminC}} 毫克</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>
        <div class = "divTable">
            <div class = "divTr"><p class="divTh">维生素E</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.vitaminE}} 毫克</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>

        <div class = "divTable">
            <div class = "divTr"><p class="divTh">盐酸</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.niacin}} 毫克</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>
        <div class = "divTable">
            <div class = "divTr"><p class="divTh">钠</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.natrium}} 毫克</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>
        <div class = "divTable">
            <div class = "divTr"><p class="divTh">钙</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.calcium}} 毫克</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>
        <div class = "divTable">
            <div class = "divTr"><p class="divTh">钾</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.kalium}} 毫克</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>

        <div class = "divTable">
            <div class = "divTr"><p class="divTh">铁</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.iron}} 毫克</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>

        <div class = "divTable">
            <div class = "divTr"><p class="divTh">碘</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.iodine}} 毫克</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>

        <div class = "divTable">
            <div class = "divTr"><p class="divTh">锌</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.zinc}} 毫克</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>
        <div class = "divTable">
            <div class = "divTr"><p class="divTh">硒</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.selenium}} 微克</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>
        <div class = "divTable">
            <div class = "divTr"><p class="divTh">镁</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.magnesium}} 毫克</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>
        <div class = "divTable">
            <div class = "divTr"><p class="divTh">铜</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.copper}} 毫克</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>
        <div class = "divTable">
            <div class = "divTr"><p class="divTh">锰</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.manganese}} 毫克</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>
        <div class = "divTable">
            <div class = "divTr"><p class="divTh">胆固醇</p></div>
            <div class = "divTr"><p class="divTh">{{foodDetails.cholesterol}} 微克</p></div>
            <div class = "divTr"><p class="divTh"></p></div>
        </div>

    </div>

</template>
<script>

  import Vue from 'vue';
  import NuxtLink from '~/.nuxt/components/nuxt-link';
  import {apiAjax} from '~/static/js/api.js';
  Vue.prototype.$apiAjax = apiAjax;
  export default {
    data(){
      return {
        foodDetails:{}

      }
    },
    mounted(){
      this.foodId_param = this.$route.query.foodId
      this.findAllFoodByQuery();

    },
    methods:{
      findAllFoodByQuery() {
        const that = this;
        const params = {
          "foodId": that.foodId_param
        }
        const url = 'food/findAllFoodByQuery';
        this.$apiAjax.post(url,params,(res)=>{
          const that = this;
          that.foodDetails = res.data.data[0];
          console.log('---1111111111--222--',res.data.count)
          console.log(that.foodDetails)
        })
      }
    }
  }
</script>
<style scoped>
    .divTable{
        height: 2.2rem;
        text-align: center;
        font-size: 12px;
        border-bottom: 1px solid #f0f0f0
    }
    .divTable1{
        position: fixed;
        height: 2.2rem;
        text-align: center;
        font-size: 12px;
        border-bottom: 1px solid #f0f0f0;
        top: 2.2rem;
        left: 0;
        width: 100%;
    }
    .divTr{
        float: left;
        width: 33%;
        height: 2.2rem;
    }
    .divTh{
        height: 1rem;
        margin-top: 0.6rem;
    }

</style>
