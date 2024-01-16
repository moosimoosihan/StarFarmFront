<template>
    <main class="mt-3">
        <div class="container">
            <div class="myinfo">
                <div class="buylist_title">
                    <span class="title">구매 상품 이력</span>
                </div>
                <div class="goods">
                    <table class="table" style="width: 100%;">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>상품이미지</th>
                                <th>상품명</th>
                                <th>구매금액</th>
                                <th>구매일시</th>
                                <th>상세보기</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(order, i) in orderList" :key="i">
                                <td>
                                    <p>{{ i+1 }}</p>
                                </td>
                                <td>
                                    <img :width="70" style="border-radius: 10px;"
                                        :src="goods_img_List[i] ? require(`../../../StarFarmBack/uploads/uploadGoods/${order.GOODS_NO}/${goods_img_List[i].split(',')[0]}`) : require(`../assets/2-1.png`)"
                                        alt="상품 이미지" @click="gotoProduct(order.GOODS_NO)" />
                                </td>
                                <td>
                                    <p>{{ goods_name_List[i] }}</p>
                                </td>
                                <td>
                                    <p>구매가 : {{ this.succ_bidList[i] }}</p>
                                </td>
                                <td>
                                    <p>{{ formatDateTime(order.ORDER_DATE) }}</p>
                                </td>
                                <td>
                                    <button @click="gotoDetail(order.ORDER_NO)">상세 보기</button>
                                </td>
                            </tr>
                            <tr v-if="orderList.length === 0">
                                <td colspan="6">결제한 상품이 없습니다.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import axios from 'axios'

    export default {
        name: "orderlist",
        data() {
            return {
                loginUser: {},
                orderList: [],
                succ_bidList: [],
                goods_img_List: [],
                goods_name_List: [],
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        created() {
            this.getOrderList();
        },
        methods: {
            gotoProduct(index) {
                this.$router.push(`/product/${index}`);
            },
            async getOrderList() {
                try {
                    const response = await axios.get(`http://localhost:3000/goods/orderlist/${this.user.user_no}`);
                    this.orderList = response.data;
                } catch (error) {
                    console.error(error);
                }
                for(let i=0; i<this.orderList.length; i++){
                    this.succ_bidList.push(await this.getTotalPrice(this.orderList[i].GOODS_NO));
                    this.goods_img_List.push(await this.getGoodsImg(this.orderList[i].GOODS_NO));
                    this.goods_name_List.push(await this.getGoodsName(this.orderList[i].GOODS_NO));
                }
            },
            async getTotalPrice(goods_no) {
                var succ_bid = '';
                var deliv_price = '';
                try {
                    const response = await axios.get(`http://localhost:3000/goods/goodsSuccBid/${goods_no}`);
                    succ_bid = response.data[0].succ_bid;
                } catch (error) {
                    console.error(error);
                }
                try{
                    const response = await axios.get(`http://localhost:3000/goods/goodsInfo/${goods_no}`);
                    const goods = response.data[0];
                    if(goods.goods_trade==1){
                        deliv_price = goods.goods_deliv_price;
                    } else {
                        deliv_price = 0;
                    }
                } catch (error) {
                    console.error(error);
                }
                return Number(succ_bid) + Number(deliv_price);
            },
            async getGoodsImg(goods_no) {
                try {
                    const response = await axios.get(`http://localhost:3000/goods/goodsInfo/${goods_no}`);
                    return response.data[0].goods_img;
                } catch (error) {
                    console.error(error);
                }
            },
            async getGoodsName(goods_no) {
                try {
                    const response = await axios.get(`http://localhost:3000/goods/goodsInfo/${goods_no}`);
                    return response.data[0].goods_nm;
                } catch (error) {
                    console.error(error);
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
                const formattedDateTime = date.toLocaleDateString("ko-KR", options);
                return formattedDateTime;
            },
            gotoDetail(order_no) {
                this.$router.push(`/paymentdetail/${order_no}`);
            }
        }
    }
</script>
<style scoped>
.container {
    margin: 40px 30px;
}
.myinfo{
    margin-top: 30px;
}

.goods .table {
    max-width: 1200px;
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

#complete {
    background-color: #00bfa5;
}
#biding {
    background-color: #ff6d00;
}
#cancel {
    background-color: #ff1744;
}
#ing {
    background-color: #ffea00;
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
}

td p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    grid-area: text;
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
  width: 5%;
}

th:nth-child(2),
td:nth-child(2) {
  width: 10%;
}

th:nth-child(3),
td:nth-child(3) {
  width: 20%;
}
th:nth-child(4),
td:nth-child(4) {
  width: 35%;
}
th:nth-child(5),
td:nth-child(5) {
  width: 5%;
}
th:nth-child(6),
td:nth-child(6) {
  width: 15%;
}
th:nth-child(7),
td:nth-child(7) {
  width: 10%;
}

th, td {
  border-left: none;
  border-right: none;
  color: #008807;
}

tr {
    height: 80px;
}
</style>