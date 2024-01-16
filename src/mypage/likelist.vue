<template>
    <main class="mt-3">
        <div class="container">
            <div class="myinfo">
                <div class="likelist_title">
                    <span class="title">관심 상품</span>
                    <select class="form-select" aria-label="Default select example" v-model="sort" @change="getLikeGoods(sort,page)">
                        <option value="none" selected>전체</option>
                        <option value="0">경매 중</option>
                        <option value="1">거래 중</option>
                        <option value="2">거래 완료</option>
                        <option value="3">유찰</option>
                    </select>
                </div>
                <div class="likegoods">
                    <table class="table" style="width: 100%;">
                        <thead>
                            <tr>
                                <th>상품 이미지</th>
                                <th>상품명</th>
                                <th>금액</th>
                                <th>상품상태</th>
                                <th>판매자</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(likegoods, i) in likeList" :key="i" @click="gotoProduct(likegoods.GOODS_NO)">
                                <td>
                                    <img :width="70" style="border-radius: 10px;"
                                        :src="likegoods.goods_img ? require(`../../../StarFarmBack/uploads/uploadGoods/${likegoods.GOODS_NO}/${likegoods.goods_img.split(',')[0]}`) : require(`../assets/2-1.png`)"
                                        alt="상품 이미지" />
                                </td>
                                <td>
                                    {{ likegoods.goods_nm }}
                                </td>
                                <td>
                                    <span>시작가 : {{ formatPrice(likegoods.goods_start_price) }}</span><br>
                                    <span>입찰가 : {{ formatPrice(succ_bidList[i])===0+' 원' ? '입찰 없음' : formatPrice(succ_bidList[i]) }}</span>
                                </td>
                                <td>
                                    {{ getOrderStatusText(likegoods.goods_state) }}
                                </td>
                                <td>
                                    {{ likeGoodsUserNick[i] }}
                                </td>
                            </tr>
                            <tr v-if="likeList.length === 0">
                                <td colspan="5">관심 상품이 없습니다.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="page_container">
                    <button v-if="page>0" class="pageNum" @click="prev()">이전</button>
                    <button v-for="(num, i) in pageCount" :key="i" class="pageNum" @click="getLikeGoods(sort,i)">{{i+1}}</button>
                    <button v-if="page<(pageCount-1)" class="pageNum" @click="next()">다음</button>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import axios from 'axios'

    export default {
        name: 'likelist',
        data() {
            return {
                likeList: [],
                succ_bidList: [],
                likeGoodsUserNick: [],
                
                page: 0,
                pageCount: 0,

                sort: 'none',
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
        },
        created() {
            this.getLikeGoods(this.sort, this.page)
        },
        methods: {
            gotoProduct(index) {
                this.$router.push(`/product/${index}`)
            },
            async getLikeCount(sort) {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/likecount/${this.user.user_no}/${sort}`);
                    this.pageCount = Math.ceil(response.data[0].count/10)
                } catch (error) {
                    console.error(error);
                }
            },
            async getLikeGoods(sort, page) {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/likelist/${this.user.user_no}/${sort}/${page}`);
                    this.likeList = response.data;
                    for(let i=0; i<this.likeList.length; i++){
                        let val = await this.getSuccBid(this.likeList[i].GOODS_NO)
                        await this.getUserNick(this.likeList[i].user_no)
                        if(val === undefined || val === null){
                            val = 0;
                        }
                        this.succ_bidList.push(val)
                    }
                } catch (error) {
                    console.error(error);
                }
                await this.getLikeCount(sort)
            },
            formatPrice(price) {
                if (price !== undefined) {
                    const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    return `${formattedPrice} 원`;
                }
                return "";
            },
            formatDateTime(dateTime) {
                const date = new Date(dateTime);
                const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                };
                const formattedDateTime = date.toLocaleDateString("ko-KR", options);
                return formattedDateTime;
            },
            async getSuccBid(goods_no) {
                try {
                    const response = await axios.get(`http://localhost:3000/goods/goodsSuccBid/${goods_no}`);
                    if(response.data[0].succ_bid === null)
                        return 0;
                    else
                        return response.data[0].succ_bid;
                } catch (error) {
                    console.error(error);
                }
            },
            async getUserNick(user_no) {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/mypage/${user_no}`);
                    this.likeGoodsUserNick.push(response.data[0].user_nick)
                } catch (error) {
                    console.error(error);
                }
            },
            getOrderStatusText(status) {
                switch (status) {
                    case 0:
                        return "경매 중";
                    case 1:
                        return "거래 중";
                    case 2:
                        return "거래 완료";
                    case 3:
                        return "유찰";
                    case 4:
                        return "삭제";
                    default:
                        return "";
                }
            },
            prev() {
                this.page -= 1;
                this.getLikeGoods(this.sort,this.page);
            },
            next(){
                this.page += 1;
                this.getLikeGoods(this.sort,this.page)
            },
        }
    }
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    border-spacing: 0px;
}
.container {
    margin: 40px 30px;
}
.myinfo{
    margin-top: 30px;
}

.likegoods .table {
    max-width: 1200px;
    text-align: center;
    background-color: #f9f9f9;
    border-radius: 10px;
}

.likegoods .table th {
    text-align: center;
    padding: 20px 0;
}

.likegoods p {
    width: 120px;
    font-size: 1rem;
    display: inline-block;
    vertical-align: middle;
    padding: 2px;
    padding-top: 10px;
    margin: 20px 30px 16px 0px;
    /* border: 1px solid red; */
}

.likegoods .detail {
    display: flex;
}

table {
  border-collapse: collapse;
  width: 500px;
  margin-top: 20px;
  background-color: white;
}

thead{
  box-shadow: 4px 4px 10px rgba(0,0,0,0.1);
}

/* 테이블 행 */
td {
  padding: 1px;
  text-align: left;
  border-bottom: 1px solid #008d07f1;
  text-align: center;
  height: 40px;
}

th {
  padding: 8px;
  text-align: left;
  text-align: center;
  border-top: 2px solid #008807;
  border-bottom: 2px solid #008807;
  color: #189200;
}

/* 테이블 올렸을 때 */
tbody tr:hover {
  background-color: #e0ffae;
  opacity: 0.9;
  cursor: pointer;
}

/* 테이블 비율 */
th:nth-child(1),
td:nth-child(1) {
  width: 20%;
}

th:nth-child(2),
td:nth-child(2) {
  width: 20%;
}

th:nth-child(3),
td:nth-child(3) {
  width: 20%;
}
th:nth-child(4),
td:nth-child(4) {
  width: 20%;
}
th:nth-child(5),
td:nth-child(5) {
  width: 20%;
}

th, td {
  border-left: none;
  border-right: none;
  color: #008807;
}

tr {
    height: 80px;
}
.title {
    font-size: 24px;
}
.form-select {
    width: 100px;
    height: 30px;
    margin-left: 20px;
}
.page_container {
  width: 400px;
  height: 100px;
  margin-left: 50%;
  margin-top: 20px;
}
.page_container button {
  min-width:32px;
  width: 50px;
  height: 40px;
  padding:2px 6px;
  text-align:center;
  margin:0 3px;
  border-radius: 6px;
  border:1px solid #eee;
  color:#666;
  cursor: pointer;
}
</style>