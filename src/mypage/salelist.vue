<template>
    <main class="mt-3">
        <div class="container">
            <div class="myinfo">
                <div class="salelist_title">
                    <span>판매 상품 관리</span>
                </div>
                <div class="salelist">
                    <table class="table" style="width:100%;">
                        <thead>
                            <tr>
                                <th>상품 이미지</th>
                                <th>상품명</th>
                                <th>판매 상태</th>
                                <th>판매 기간</th>
                                <th>기타</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(salelist,i) in salelistList" :key="i">
                                <td>
                                    <!-- <img :width="70" style="border-radius: 10px;"
                                        :src="salelist.items[0].GOODS_IMG ? require(`../../../StarFarmBack/uploads/uploadGoods/${salelist.items[0].GOODS_IMG}`) : '../assets/2-1.png'"
                                        alt="상품 이미지" /> -->
                                    <img :width="70" style="border-radius: 10px;"
                                        src="../assets/2-1.png"
                                        alt="상품 이미지" />
                                </td>
                                <td @click="gotoProduct(salelist.items[0].GOODS_NO)">
                                    {{ salelist.items[0].GOODS_NM }}
                                </td>
                                <td>
                                    <p>{{ getOrderStatusText(salelist.items[0].ORDER_STATUS) }}</p>
                                </td>
                                <td>
                                    <p>{{ formatDateTime(salelist.items[0].GOODS_DATE) }}</p>
                                </td>
                                <td>
                                    <!-- 판매완료 -->
                                    <div v-if="salelist.items[0].ORDER_STATUS===2">
                                        <button>후기 작성</button>
                                        <button>결제 내역</button>
                                        <button>내역 삭제</button>
                                    </div>

                                    <!-- 거래 중 -->
                                    <div v-if="salelist.items[0].ORDER_STATUS===1">
                                        <button>거래 완료</button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="salelistList.length === 0">
                                <td colspan="5">판매 상품이 없습니다.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
    export default {
        name: 'salelist',
        data () {
            return {
                loginUser: {},
                saleList: [],
            }
        },
        created() {
            this.getUser();
            this.getSaleList();
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            salelistList() {
                const uniqueOrders = [];
                const tradeNos = [];

                for (const order of this.saleList) {
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
            },
        },
        methods: {
            async getUser() {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
                    this.loginUser = response.data[0];
                } catch (error) {
                    console.error(error);
                }
            },
            async getSaleList() {
                try {
                    const response = await axios.get(`http://localhost:3000/goods/salelist/${this.user.user_no}`);
                    this.saleList = response.data;
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

.salelist .table {
    max-width: 1200px;
    text-align: center;
    background-color: #f9f9f9;
    border-radius: 10px;
}

.salelist .table th {
    text-align: center;
    padding: 20px 0;
}

.salelist p {
    width: 120px;
    font-size: 1rem;
    display: inline-block;
    vertical-align: middle;
    padding: 2px;
    padding-top: 10px;
    margin: 20px 30px 16px 0px;
    /* border: 1px solid red; */
}

.salelist .detail {
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