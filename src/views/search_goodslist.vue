<template>
    <div class="container" id="scroll" v-if="maxPage!=0">
        <div class="search_title">
            <p>검색어 : {{keyword}}</p>
        </div>
        <div class="search_goods">
            <div v-for="(goods,i) in goodsList" :key="i" @click="gotoProduct(goods.goods_no)">
                <img :width="70" style="border-radius: 10px;"
                    :src="goods.goods_img ? require(`../../../StarFarmBack/uploads/uploadGoods/${goods.goods_no}/${goods.goods_img.split(',')[0]}`) : require(`../assets/2-1.png`)"
                    alt="상품 이미지"/>
                <div class="search_goodsdetails">
                    <p>{{ goods.goods_nm }}</p>
                    <p>입찰가 : {{ goods_succ_bid[i] }}</p>
                    <p>{{ nickList[i] }}</p>
                </div>
            </div>
        </div>
        <div class="page">
            <button v-if="page>1" class="page_btn" @click="prev()">이전</button>
            <button v-for="(num,i) in maxPage" :key="i" class="pageNum" @click="getGoodsList((num-1)*10)">{{num}}</button>
            <button v-if="page<maxPage" class="page_btn" @click="next()">다음</button>
        </div>
    </div>
    <div v-else>
        <p>검색 결과가 없습니다.</p>
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

                category: '',
                categoryDetail: 0,
            }
        },
        mounted() {
            if(this.$route.params.cate=='cate'){
                this.category = this.$route.params.keyword;
                this.categoryDetail = this.$route.params.page;
                
            } else {
                this.keyword = this.$route.params.keyword;
                this.page = this.$route.params.page;
            }
            this.getGoodsList(0);
            this.getMaxPage();
        },
        methods: {
            async getGoodsList(nimNum) {
                if(this.$route.params.cate=='cate'){
                    try{
                        if(this,this.categoryDetail==0){
                            const response = await axios.get(`http://localhost:3000/goods/category_search/${this.category}/${nimNum}`)
                            this.goodsList = response.data;
                        } else {
                            const response = await axios.get(`http://localhost:3000/goods/category_detail_search/${this.category}/${this.categoryDetail}/${nimNum}`)
                            this.goodsList = response.data;
                        }
                    } catch(err) {
                        console.log(err);
                    }
                } else {
                    try{
                        const response = await axios.get(`http://localhost:3000/goods/goodsSearch/${this.keyword}/${nimNum}`)
                        this.goodsList = response.data;
                    } catch(err) {
                        console.log(err);
                    }
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
                this.nickList = [];
                for(let y=0; y<this.goodsList.length; y++){
                    await axios.get(`http://localhost:3000/mypage/mypage/${this.goodsList[y].user_no}`)
                    .then((res) => {
                        this.nickList.push(res.data[0].user_nick);
                    })
                }
                this.page = Math.ceil(nimNum/10)+1;
            },
            async getMaxPage() {
                if(this.$route.params.cate=='cate'){
                    try{
                        if(this,this.categoryDetail==0){
                            const response = await axios.get(`http://localhost:3000/goods/category_search_max/${this.category}`)
                            this.maxPage = Math.ceil(response.data[0].max_page/10);
                        } else {
                            const response = await axios.get(`http://localhost:3000/goods/category_detail_search_max/${this.category}/${this.categoryDetail}`)
                            this.maxPage = Math.ceil(response.data[0].max_page/10);
                        }
                    } catch(err) {
                        console.log(err);
                    }
                } else {
                    try{
                        const response = await axios.get(`http://localhost:3000/goods/goodsSearchMax/${this.keyword}`)
                        this.maxPage = Math.ceil(response.data[0].max_page/10);
                    } catch(err) {
                        console.log(err);
                    }
                }
            },
            gotoProduct(index) {
                this.$router.push(`/product/${index}`);
            },
            prev() {
                this.page--;
                this.getGoodsList((this.page-1)*10);
            },
            next() {
                this.page++;
                this.getGoodsList((this.page-1)*10);
            }
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