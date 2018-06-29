<template>

    <div>
        <div style="position: fixed;width:100%;height:2.2rem;line-height: 2.2rem; text-align: center;border-bottom: 1px #B3A9BF solid;background: #fff;top:0;left:0">
            <div style=" height:2.2rem;float: left;width:10%;" @click="$router.back(-1)">
                <img style="margin-top:0.25rem;text-align:center;  height: 1.5rem" src="../../static/img/ic_back_dark.png" >
            </div>
            <div style="float: left;width:80%;margin-right: 10%;font-size: 14px;">{{foodDetails.foodCnName}}</div>
        </div>
        <div style = "margin-top: 2.2rem;height: 4.4rem;">
            <div style="clear:both;width: 16%;float: left;height: 3rem;text-align: center;margin-top: 0.7rem;">
                <img v-if = "foodDetails.thumbImageUrl != ''" style="text-align: center;height: 3rem;width: 3rem;border-radius:25px;border:1px solid white;"  :src="foodDetails.thumbImageUrl">
                <img v-else = "foodDetails.thumbImageUrl == ''" style="text-align: center;height: 3rem;width: 3rem;border-radius:25px;border:1px solid white;"  src="~/static/img/moren.png">
            </div>
            <div style="float: left;width: 74%; height: 3rem;margin-top: 0.7rem;padding-left: 10px;">
                <div style="height: 1.5rem;padding-top: 4px">
                    <i style="font-size: 14px;white-space: nowrap;font-style: normal;">{{foodDetails.foodCnName}}</i>
                </div>
                <div style="height: 1.5rem;padding-bottom: 4px">
                    <i style="font-size: 16px;font-style: normal;">{{foodDetails.calory | numToFloor}}千卡 </i><i style="font-size: 14px;font-style: normal">/&nbsp;100克</i>
                </div>
            </div>
        </div>
        <div style="background: #f0f0f0;height: .6rem;"> </div>
        <div>
            <div style="height: 2.2rem;border: 1px solid #f0f0f0;margin-top: 1.2rem;text-align: center;margin-left: 5%;width: 90%;">
                <div style="height: 1rem;height: 1.8rem;width:98%;margin-top: 0.1rem;margin-left: 1%; background: #f0f0f0">
                    <p style="font-size: 14px;height: 1.8rem;margin-top: 0.2rem;padding-top: 0.2rem;color: #999;">每100g</p>
                </div>
            </div>
            <div>
                <div class = "divTable">
                    <div class = "divTr"><p class="divTh" style="color: #999">营养元素</p></div>
                    <div class = "divTr"><p class="divTh" style="color: #999">每100g</p></div>
                    <div class = "divTr"><p class="divTh" style="color: #999">备注</p></div>
                </div>

                <div class = "divTable">
                    <div class = "divTr"><p class="divTh">热量</p></div>
                    <div class = "divTr"><p class="divTh">{{foodDetails.calory}}千卡{{foodDetails.caloryStateRemark}}</p></div>
                    <div class = "divTr"><p v-if="foodDetails.caloryStateRemark == 3" class="divTh" style="color: #ff5c4b">高热量</p></div>
                </div>

                <div class = "divTable">
                    <div class = "divTr"><p class="divTh">蛋白质</p></div>
                    <div class = "divTr"><p class="divTh">{{foodDetails.protein}}克</p></div>
                    <div class = "divTr"><p v-if="foodDetails.fatStateRemark == 3" class="divTh" style="color: #ff5c4b">高蛋白</p></div>
                </div>
                <div class = "divTable">
                    <div class = "divTr"><p class="divTh">脂肪</p></div>
                    <div class = "divTr"><p class="divTh">{{foodDetails.fat}}克</p></div>
                    <div class = "divTr"><p class="divTh"></p></div>
                </div>
                <div class = "divTable">
                    <div class = "divTr"><p class="divTh">碳水化合物</p></div>
                    <div class = "divTr"><p class="divTh">{{foodDetails.carbohydrate}}克</p></div>
                    <div class = "divTr"><p class="divTh"></p></div>
                </div>
                <router-link :to="{path:'/food/foodDetailsParamList',query:{'foodId':foodDetails.id}}">
                    <div style="height: 2.2rem;text-align: center;font-size: 12px;border-bottom: 1px solid #f0f0f0"><div style="padding-top: 0.6rem; height: 1rem;color: #999">更多营养元素</div></div>
                </router-link>
                <!--GI GL值-->
                <div style="background: #f0f0f0;height: .6rem;"> </div>
                <div v-if="foodDetails.gi != '' && foodDetails.gi != 0" class = "divTable"  style="color: #ff5c4b">
                    <div class = "divTr"><p class="divTh" >GI值</p></div>
                    <div class = "divTr"><p class="divTh">{{foodDetails.gi}}</p></div>
                    <div v-if="foodDetails.giStateRemark == 1" class = "divTr"><p class="divTh">低GI</p></div>
                    <div v-if="foodDetails.giStateRemark == 2" class = "divTr"><p class="divTh">一般GI</p></div>
                    <div v-if="foodDetails.giStateRemark == 3" class = "divTr"><p class="divTh">高GI</p></div>
                </div>
                <div v-if="foodDetails.gl != '' && foodDetails.gl != 0" class = "divTable"  style="color: #ff5c4b">
                    <div class = "divTr"><p class="divTh" >GL值</p></div>
                    <div class = "divTr"><p class="divTh">{{foodDetails.gl}}</p></div>
                    <div v-if="foodDetails.glStateRemark == 1" class = "divTr"><p class="divTh">低GL</p></div>
                    <div v-if="foodDetails.glStateRemark == 2" class = "divTr"><p class="divTh">一般GL</p></div>
                    <div v-if="foodDetails.glStateRemark == 3" class = "divTr"><p class="divTh">高GL</p></div>
                </div>
                <div v-if="(foodDetails.gl != '' && foodDetails.gl != 0) || (foodDetails.gl != '' && foodDetails.gl != 0)" style="background: #f0f0f0;height: .6rem;"> </div>

                <!--食物红绿灯:-->
                <div v-if="foodDetails.healthLight != '' || foodDetails.healthLightGradeRemark != ''">
                    <div style="height: 1.2rem;font-size: 13px;padding-left: 5%;padding-top: 5px;">
                        食物红绿灯:
                    </div>
                    <div style = "height: 3.6rem;margin-top: 5px;padding-left: 5%;">
                        <div style="float: left;width: 20%;height: 3.6rem;font-size: 12px;">
                            <div style="width: 10%;float: left;height: 3rem;text-align: center;">
                                <img v-if = "foodDetails.healthLight == 1" style="margin-top: 1.2rem; height: 0.6rem;width: 0.6rem;" src="~/static/img/ic_food_light_green.png">
                                <img v-else-if = "foodDetails.healthLight == 2" style="margin-top: 1.2rem; height: 0.6rem;width: 0.6rem;" src="~/static/img/ic_food_light_yellow.png">
                                <img v-else-if = "foodDetails.healthLight == 3" style="margin-top: 1.2rem; height: 0.6rem;width: 0.6rem;" src="~/static/img/ic_food_light_red.png">
                            </div>
                            <div v-if = "foodDetails.healthLight == 1" style="margin-top: 1rem;padding-left: 1rem;">推荐</div>
                            <div v-else-if = "foodDetails.healthLight == 2" style="margin-top: 1rem;padding-left: 1rem;">适量</div>
                            <div v-else-if = "foodDetails.healthLight == 3" style="margin-top: 1rem;padding-left: 1rem;">少吃</div>
                        </div>
                        <div v-if="foodDetails.healthLightGradeRemark != ''" style="float: left;width: 80%;height: 3.6rem;font-size: 12px;overflow:hidden">{{foodDetails.healthLightGradeRemark}}</div>
                        <div v-else="foodDetails.healthLightGradeRemark != ''" style="float: left;width: 80%;height: 3.6rem;font-size: 12px;overflow:hidden">对不起, 目前暂无食物等级安全说明,给您造成不便,敬请谅解, 我们会尽快补全说明!</div>
                    </div>
                    <div style="background: #f0f0f0;height: .6rem;"> </div>
                </div>


                <!--尿毒症红绿灯:-->
                <div v-if="foodDetails.uremiaSateGrade != '' || foodDetails.uremiaSateGradeRemark != ''">
                    <div style="height: 1.2rem;font-size: 13px;padding-left: 5%;padding-top: 5px;">
                        尿毒症红绿灯:
                    </div>
                    <div style = "height: 3.6rem;margin-top: 5px;padding-left: 5%;">
                        <div style="float: left;width: 20%;height: 3.6rem;font-size: 12px;">
                            <div style="width: 10%;float: left;height: 3rem;text-align: center;">
                                <img v-if = "foodDetails.uremiaSateGrade == 1" style="margin-top: 1.2rem; height: 0.6rem;width: 0.6rem;" src="~/static/img/ic_food_light_green.png">
                                <img v-else-if = "foodDetails.uremiaSateGrade == 2" style="margin-top: 1.2rem; height: 0.6rem;width: 0.6rem;" src="~/static/img/ic_food_light_yellow.png">
                                <img v-else-if = "foodDetails.uremiaSateGrade == 3" style="margin-top: 1.2rem; height: 0.6rem;width: 0.6rem;" src="~/static/img/ic_food_light_red.png">
                            </div>
                            <div v-if = "foodDetails.uremiaSateGrade == 1" style="margin-top: 1rem;padding-left: 1rem;">推荐</div>
                            <div v-else-if = "foodDetails.uremiaSateGrade == 2" style="margin-top: 1rem;padding-left: 1rem;">适量</div>
                            <div v-else-if = "foodDetails.uremiaSateGrade == 3" style="margin-top: 1rem;padding-left: 1rem;">少吃</div>
                        </div>
                        <div style="float: left;width: 80%;height: 3.6rem;font-size: 12px;overflow:hidden">{{foodDetails.uremiaSateGradeRemark}}</div>
                    </div>
                    <div style="background: #f0f0f0;height: .6rem;"> </div>
                </div>


                <!--糖尿病肾病红绿灯:-->
                <div v-if="foodDetails.dnSateGrade != '' || foodDetails.dnSateGradeRemark != ''">
                    <div style="height: 1.2rem;font-size: 13px;padding-left: 5%;padding-top: 5px;">
                        糖尿病肾病红绿灯:
                    </div>
                    <div style = "height: 3.6rem;margin-top: 5px;padding-left: 5%;">
                        <div style="float: left;width: 20%;height: 3.6rem;font-size: 12px;">
                            <div style="width: 10%;float: left;height: 3rem;text-align: center;">
                                <img v-if = "foodDetails.dnSateGrade == 1" style="margin-top: 1.2rem; height: 0.6rem;width: 0.6rem;" src="~/static/img/ic_food_light_green.png">
                                <img v-else-if = "foodDetails.dnSateGrade == 2" style="margin-top: 1.2rem; height: 0.6rem;width: 0.6rem;" src="~/static/img/ic_food_light_yellow.png">
                                <img v-else-if = "foodDetails.dnSateGrade == 3" style="margin-top: 1.2rem; height: 0.6rem;width: 0.6rem;" src="~/static/img/ic_food_light_red.png">
                            </div>
                            <div v-if = "foodDetails.dnSateGrade == 1" style="margin-top: 1rem;padding-left: 1rem;">推荐</div>
                            <div v-else-if = "foodDetails.dnSateGrade == 2" style="margin-top: 1rem;padding-left: 1rem;">适量</div>
                            <div v-else-if = "foodDetails.dnSateGrade == 3" style="margin-top: 1rem;padding-left: 1rem;">少吃</div>
                        </div>
                        <div style="float: left;width: 80%;height: 3.6rem;font-size: 12px;overflow:hidden">{{foodDetails.dnSateGradeRemark}}</div>
                    </div>
                    <div style="background: #f0f0f0;height: .6rem;"> </div>
                </div>


                <!--iga肾病红绿灯-->
                <div v-if="foodDetails.igaSateGrade != '' || foodDetails.igaSateGradeRemark != ''">
                    <div style="height: 1.2rem;font-size: 13px;padding-left: 5%;padding-top: 5px;">
                        iga肾病红绿灯:
                    </div>
                    <div style = "height: 3.6rem;margin-top: 5px;padding-left: 5%;">
                        <div style="float: left;width: 20%;height: 3.6rem;font-size: 12px;">
                            <div style="width: 10%;float: left;height: 3rem;text-align: center;">
                                <img v-if = "foodDetails.igaSateGrade == 1" style="margin-top: 1.2rem; height: 0.6rem;width: 0.6rem;" src="~/static/img/ic_food_light_green.png">
                                <img v-else-if = "foodDetails.igaSateGrade == 2" style="margin-top: 1.2rem; height: 0.6rem;width: 0.6rem;" src="~/static/img/ic_food_light_yellow.png">
                                <img v-else-if = "foodDetails.igaSateGrade == 3" style="margin-top: 1.2rem; height: 0.6rem;width: 0.6rem;" src="~/static/img/ic_food_light_red.png">
                            </div>
                            <div v-if = "foodDetails.igaSateGrade == 1" style="margin-top: 1rem;padding-left: 1rem;">推荐</div>
                            <div v-else-if = "foodDetails.igaSateGrade == 2" style="margin-top: 1rem;padding-left: 1rem;">适量</div>
                            <div v-else-if = "foodDetails.igaSateGrade == 3" style="margin-top: 1rem;padding-left: 1rem;">少吃</div>
                        </div>
                        <div style="float: left;width: 80%;height: 3.6rem;font-size: 12px;overflow:hidden">{{foodDetails.igaSateGradeRemark}}</div>
                    </div>
                    <div style="background: #f0f0f0;height: .6rem;"> </div>
                </div>


                <!--膜性肾病红绿灯-->
                <div v-if="foodDetails.maSateGrade != '' || foodDetails.maSateGradeRemark != ''">
                    <div style="height: 1.2rem;font-size: 13px;padding-left: 5%;padding-top: 5px;">
                        膜性肾病红绿灯:
                    </div>
                    <div style = "height: 3.6rem;margin-top: 5px;padding-left: 5%;">
                        <div style="float: left;width: 20%;height: 3.6rem;font-size: 12px;">
                            <div style="width: 10%;float: left;height: 3rem;text-align: center;">
                                <img v-if = "foodDetails.maSateGrade == 1" style="margin-top: 1.2rem; height: 0.6rem;width: 0.6rem;" src="~/static/img/ic_food_light_green.png">
                                <img v-else-if = "foodDetails.maSateGrade == 2" style="margin-top: 1.2rem; height: 0.6rem;width: 0.6rem;" src="~/static/img/ic_food_light_yellow.png">
                                <img v-else-if = "foodDetails.maSateGrade == 3" style="margin-top: 1.2rem; height: 0.6rem;width: 0.6rem;" src="~/static/img/ic_food_light_red.png">
                            </div>
                            <div v-if = "foodDetails.maSateGrade == 1" style="margin-top: 1rem;padding-left: 1rem;">推荐</div>
                            <div v-else-if = "foodDetails.maSateGrade == 2" style="margin-top: 1rem;padding-left: 1rem;">适量</div>
                            <div v-else-if = "foodDetails.maSateGrade == 3" style="margin-top: 1rem;padding-left: 1rem;">少吃</div>
                        </div>
                        <div style="float: left;width: 80%;height: 3.6rem;font-size: 12px;overflow:hidden">{{foodDetails.maSateGradeRemark}}</div>
                    </div>
                    <div style="background: #f0f0f0;height: .6rem;"> </div>
                </div>



            </div>
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
        foodDetails:{},
        foodId_param:""

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
      },
    },
    filters: {
      numToFloor: function (value) {
        if (!value) return ''
        return Math.floor(value);
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