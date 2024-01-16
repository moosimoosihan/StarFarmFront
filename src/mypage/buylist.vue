<template>
    <main class="mt-3">
        <div class="container">
            <div class="myinfo">
                <div class="buylist_title">
                    <span class="title">입찰 상품 이력</span>
                    <select class="form-select" aria-label="Default select example" v-model="sort" @change="getOrderList(sort,page)">
                        <option value="none" selected>전체</option>
                        <option value="0">경매 중</option>
                        <option value="1">거래 중</option>
                        <option value="2">거래 완료</option>
                        <option value="3">유찰</option>
                    </select>
                </div>
                <div class="goods">
                    <table class="table" style="width: 100%;">
                        <thead>
                            <tr>
                                <th>입찰번호</th>
                                <th>상품이미지</th>
                                <th>상품명</th>
                                <th>거래형태</th>
                                <th>금액</th>
                                <th>상품상태</th>
                                <th>일시</th>
                                <th>기타</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(order, i) in orderList" :key="i">
                                <td>
                                    <p>{{ order.goods_no }}</p>
                                </td>
                                <td>
                                    <img :width="70" style="border-radius: 10px;"
                                        :src="order.goods_img ? require(`../../../StarFarmBack/uploads/uploadGoods/${order.goods_no}/${order.goods_img.split(',')[0]}`) : require(`../assets/2-1.png`)"
                                        alt="상품 이미지" @click="gotoProduct(order.goods_no)" />
                                </td>
                                <td>
                                    <p>{{ order.goods_nm }}</p>
                                </td>
                                <td>
                                    <p>{{ order.goods_trade===0 ? '택배' : '직거래' }}</p>
                                </td>
                                <td>
                                    <span>시작가 : {{ formatPrice(order.goods_start_price) }}</span><br>
                                    <span>입찰가 : {{ formatPrice(order.bid_amount) }}</span><br>
                                    <span style="font-weight: 600;" v-if="getOrderStatusText(order.goods_state)=='경매 중'">최고입찰 : {{ formatPrice(succ_bidList[i]) }}</span>
                                    <span v-else>낙찰가 :{{ formatPrice(succ_bidList[i]) }}</span><br>
                                </td>
                                <td>
                                    <p>{{ getOrderStatusText(order.goods_state) }}</p>
                                </td>
                                <td>
                                    <p>{{ formatDateTime(order.goods_timer) }}</p>
                                </td>
                                <td>
                                    <span v-if="order.goods_state===1 && order.goods_trade===1" @click="saleComp(i)">거래 완료</span>
                                    <span v-else-if="order.goods_state===1 && order.goods_trade===0 && succ_bid_user_no[i]===user.user_no && order_count[i]===0" @click="gotoPay(i)">결제</span>
                                    <span v-else-if="order.goods_state===1 && order.goods_trade===0 && succ_bid_user_no[i]===user.user_no && order_count[i]!=0" @click="saleComp(i)">거래 완료</span>
                                    <!-- 내가 리뷰를 썻다면 표시 안되도록 -->
                                    <span v-if="order.goods_state===2 && review_count[i]===0" @click="writeReview(order.goods_no)">리뷰쓰기</span>
                                </td>
                            </tr>
                            <tr v-if="orderList.length === 0">
                                <td colspan="8">입찰 상품이 없습니다.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="page_container">
                    <button v-if="page>0" class="pageNum" @click="prev()">이전</button>
                    <button v-for="(num, i) in pageCount" :key="i" class="pageNum" @click="getOrderList(sort,i)">{{i+1}}</button>
                    <button v-if="page<(pageCount-1)" class="pageNum" @click="next()">다음</button>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import axios from 'axios'

    export default {
        name: "buylist",
        data() {
            return {
                orderList: [],
                succ_bidList: [],
                succ_bid_user_no: [],
                review_count: [],
                order_count: [],

                page: 0,
                pageCount: 0,

                sort: 'none',
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        created() {
            this.getOrderList(this.sort, this.page)
        },
        methods: {
            gotoProduct(index) {
                this.$router.push(`/product/${index}`);
            },
            async getBuyCount() {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/orderCount/${this.user.user_no}/${this.sort}`);
                    this.pageCount = Math.ceil(response.data.length/10);
                } catch (error) {
                    console.error(error);
                }
            },
            async getOrderList(sort, page) {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/orderlist/${this.user.user_no}/${sort}/${page}`);
                    this.orderList = response.data;
                    console.log(this.orderList)
                } catch (error) {
                    console.error(error);
                }
                this.page = page;
                await this.getSuccBid()
                await this.getReviewCount()
                await this.getBuyCount()
            },
            async getSuccBid() {
                for(let i=0; i<this.orderList.length; i++){
                    try {
                        const response = await axios.get(`http://localhost:3000/goods/goodsSuccBid/${this.orderList[i].goods_no}`);
                        this.succ_bidList.push(response.data[0].succ_bid)
                        this.succ_bid_user_no.push(response.data[0].user_no)
                    } catch (error) {
                        console.error(error);
                    }
                }
            },
            async getReviewCount() {
                for(let i=0; i<this.orderList.length; i++){
                    try {
                        const response = await axios.get(`http://localhost:3000/goods/reviewCount/${this.orderList[i].goods_no}/${this.user.user_no}`);
                        this.review_count.push(response.data[0].count)
                    } catch (error) {
                        console.error(error);
                    }
                }
            },
            async getOrderCount() {
                for(let i=0; i<this.orderList.length; i++){
                    try {
                        const response = await axios.get(`http://localhost:3000/goods/orderCount/${this.orderList[i].goods_no}/${this.user.user_no}`);
                        this.order_count.push(response.data[0].count)
                    } catch (error) {
                        console.error(error);
                    }
                }
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
                const formattedDateTime = date.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" });

                return formattedDateTime;
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
            writeReview(goods_no) {
                this.$router.push(`/review/${goods_no}/none`);
            },
            async saleComp(i){
                if(confirm("거래 완료 처리 하시겠습니까?")){
                    try {
                        await axios.post(`http://localhost:3000/goods/saleComp/${this.orderList[i].goods_no}`);
                        this.$swal("거래 완료 처리 되었습니다.")
                        this.getOrderList();
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    this.$swal("거래 완료 처리가 취소되었습니다.");
                }
            },
            gotoPay(index) {
                this.$router.push(`/payment/${this.orderList[index].goods_no}`);
            },
            prev() {
                this.page -= 1;
                this.getOrderList(this.sort,this.page);
                },
            next(){
                this.page += 1;
                this.getOrderList(this.sort,this.page)
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

.goods .table {
    max-width: 1300px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 10px;
}

.goods .table th {
    text-align: center;
    padding: 20px 0;
}

.goods p {
    width: 120px;
    font-size: 1rem;
    display: inline-block;
    vertical-align: middle;
    padding: 2px;
    padding-top: 10px;
    margin: 20px 30px 16px 0px;
    /* border: 1px solid red; */
}

.goods .detail {
    display: flex;
}

.title {
    font-size: 24px;
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
  font-size: 13px;
}

th {
  padding: 8px;
  text-align: left;
  text-align: center;
  border-top: 2px solid #008807;
  border-bottom: 2px solid #008807;
  color: #189200;
}
th p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    grid-area: text;
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
  width: 12.5%;
}

th:nth-child(2),
td:nth-child(2) {
  width: 12.5%;
}

th:nth-child(3),
td:nth-child(3) {
  width: 12.5%;
}
th:nth-child(4),
td:nth-child(4) {
  width: 12.5%;
}
th:nth-child(5),
td:nth-child(5) {
  width: 15%;
}
th:nth-child(6),
td:nth-child(6) {
  width: 12.5%;
}
th:nth-child(7),
td:nth-child(7) {
  width: 12.5%;
}
th:nth-child(8),
td:nth-child(8) {
  width: 12.5%;
}

th, td {
  border-left: none;
  border-right: none;
  color: #008807;
}

tr {
    height: 80px;
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