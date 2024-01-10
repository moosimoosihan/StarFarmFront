<template>
    <div class="container" id="scroll">
        <div class="search_title">
            <p>검색어 : {{keyword}}</p>
        </div>
        <div class="search_goods">
            <div v-for="(goods,i) in goodsList" :key="i" @click="gotoProduct(goods.goods_no)">
                <img :width="70" style="border-radius: 10px;"
                    :src="order.goods_img ? require(`../../../StarFarmBack/uploads/uploadGoods/${goods.goods_no}/${goods.goods_img.split(',')[0]}`) : require(`../assets/2-1.png`)"
                    alt="상품 이미지"/>
                <div class="search_goodsdetails">
                    <p>{{ goods.goods_nm }}</p>
                    <p>입찰가 : {{ goods_succ_bid[i] }}</p>
                    <p>{{ nickList[i] }}</p>
                </div>
            </div>
        </div>
        <div class="page">
            <button v-if="page>1" class="page_btn" @click="getGoodsList(page-1)">이전</button>
            <button v-for="(num,i) in maxPage" :key="i" class="pageNum" @click="getGoodsList((num-1)*10)">{{num}}</button>
            <button v-if="page<maxPage" class="page_btn" @click="getGoodsList(page+1)">다음</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
    export default {
        name : 'search_goodslist',
        data() {
            return {
                keyword : '',
                goodsList : [],
                goods_succ_bid: [],
                nickList: [],
                page:1,
                maxPage: 0,
            }
        },
        mounted() {
            this.keyword = this.$route.params.keyword;
            this.page = this.$route.params.page;
            this.getGoodsList(0);
            this.getMaxPage();
        },
        methods: {
            async getGoodsList(nimNum) {
                try{
                    const response = await axios.get(`http://localhost:3000/goods/goodsSearch/${this.keyword}/${nimNum}`)
                    this.goodsList = response.data;
                } catch(err) {
                    console.log(err);
                }
                this.goods_succ_bid = [];
                for(let i=0; i<this.goodsList.length; i++){
                    await axios.get(`http://localhost:3000/goods/goodsSuccBid/${this.goodsList[i].goods_no}`)
                    .then((res) => {
                        if(res.data[0].succ_bid==null){
                            this.goods_succ_bid.push('입찰 없음');
                        } else {
                            this.goods_succ_bid.push(res.data[0].succ_bid);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                }
                for(let y=0; y<this.goodsList.length; y++){
                    const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.goodsList[y].user_no}`)
                    this.nickList.push(response.data[0].user_nick);
                }
            },
            async getMaxPage() {
                try{
                    const response = await axios.get(`http://localhost:3000/goods/goodsSearchMax/${this.keyword}`)
                    this.maxPage = Math.ceil(response.data[0].max_page/10);
                } catch(err) {
                    console.log(err);
                }
            },
            gotoProduct(index) {
                this.$router.push(`/product/${index}`);
            },
        }
    }
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.container {
    width: 100%;
    height: 100%;
}
#scroll {
    overflow: scroll;
}
/* -------------------- */

.search_goods {
    width: 150px;
    height: 200px;
    text-align: center;
    margin-top: 20px;
    margin-left: 10%;
    background-color: #f5f5f5;
    float : left;
}

.search_goods_img {
    width: 100px;
    height: 100px;
    margin-top: 5px;
    margin-left: 20px;
    background-color: red;
}
.search_bigcate {
    font-size: 25px;
}
.search_title {
    margin-top: 10px;
    margin-left: 10px;
}
</style>