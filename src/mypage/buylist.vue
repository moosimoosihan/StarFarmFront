<template>
    <main class="mt-3">
        <div class="container">
            <div class="myinfo">
                <div class="buylist_title">
                    <span>입찰 상품 이력</span>
                </div>
                <div class="goods">
                    <table class="table" style="width: 100%;">
                        <thead>
                            <tr>
                                <th>입찰번호</th>
                                <th>상품이미지</th>
                                <th>상품명</th>
                                <th>금액</th>
                                <th>상품상태</th>
                                <th>일시</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(order, i) in uniqueOrderList" :key="i">
                                <td>{{ order.ORDER_TRADE_NO }}</td>
                                <td>
                                    <!-- <img :width="70" style="border-radius: 10px;"
                                        :src="order.items[0].ORDER_GOODS_IMG ? require(`../../../StarFarmBack/uploads/uploadGoods/${order.items[0].ORDER_GOODS_IMG}`) : '../assets/2-1.png'"
                                        alt="상품 이미지" /> -->
                                        <img :width="70" style="border-radius: 10px;"
                                        :src="'../assets/2-1.png'"
                                        alt="상품 이미지" />
                                </td>
                                <td @click="gotoProduct(order.items[0].GOODS_NO)">
                                    {{ order.items[0].ORDER_GOODS_NM }}
                                </td>
                                <td>
                                    <span>시작가 : {{ formatPrice(order.items[0].GOODS_PRICE) }}</span><br>
                                    <span>입찰가: {{ formatPrice(order.items[0].BID_PRICE) }}</span><br>
                                    <span>낙찰가:{{ formatPrice(order.items[0].BID_COMP_PRICE) }}</span><br>
                                </td>
                                <td>
                                    <p>{{ getOrderStatusText(order.items[0].ORDER_STATUS) }}</p>
                                </td>
                                <td>
                                    <div class="trash_icon" @click="deleteItem(order.ORDER_TRADE_NO)">
                                        <i class="fas fa-solid fa-trash"></i>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="orderList.length === 0">
                                <td colspan="7">입찰 상품이 없습니다.</td>
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
        name: "buylist",
        data() {
            return {
                loginUser: {},
                orderList: [],
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            uniqueOrderList() {
                const uniqueOrders = [];
                const tradeNos = [];

                for (const order of this.orderList) {
                    if (!tradeNos.includes(order.ORDER_TRADE_NO)) {
                        uniqueOrders.push({
                            ORDER_TRADE_NO: order.ORDER_TRADE_NO,
                            items: [order],
                        });
                        tradeNos.push(order.ORDER_TRADE_NO);
                    } else {
                        const index = uniqueOrders.findIndex((o) => o.ORDER_TRADE_NO === order.ORDER_TRADE_NO);
                        uniqueOrders[index].items.push(order);
                    }
                }
                return uniqueOrders;
            }
        },
        created() {
            this.getUser();
            this.getOrderList();
        },
        methods: {
            gotoProduct(index) {
                this.$router.push(`/product/${index}`);
            },
            async getUser() {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
                    this.loginUser = response.data[0];
                } catch (error) {
                    console.error(error);
                }
            },
            async getOrderList() {
                try {
                    const response = await axios.get(`http://localhost:3000/goods/orderlist/${this.user.user_no}`);
                    this.orderList = response.data;
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
        },
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
    max-width: 1200px;
    text-align: center;
    background-color: #f9f9f9;
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
.trash_icon {
    font-size: 20px;
    
}
th, td {
    border: 1px solid #444444;
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

</style>