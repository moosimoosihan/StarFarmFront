<template>
    <main class="mt-3">
        <div class="container">
            <div class="myinfo">
                <div class="likelist_title">
                    <span>관심 상품</span>
                </div>
                <div class="likegoods">
                    <table class="table" style="width: 100%%">
                        <thead>
                            <tr>
                                <th>상품 이미지</th>
                                <th>금액</th>
                                <th>상품명</th>
                                <th>판매자</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(likegoods, i) in likegoodsList" :key="i">
                                <td>
                                    <!-- <img :width="70" style="border-radius: 10px;"
                                        :src="likegoods.items[0].GOODS_IMG ? require(`../../../StarFarmBack/uploads/uploadGoods/${likegoods.GOODS_IMG}`) : '../assets/2-1.png'"
                                        alt="상품 이미지" /> -->
                                    <img :width="70" style="border-radius: 10px;"
                                        :src="'../assets/2-1.png'"
                                        alt="상품 이미지" />
                                </td>
                                <td>
                                    입찰가 {{ formatPrice(likegoods.items[0].BID_PRICE) }}
                                </td>
                                <td @click="gotoProduct(likegoods.items[0].GOODS_NO)">
                                    {{ likegoods.items[0].GOODS_NM }}
                                </td>
                                <td>
                                    {{ likegoods.items[0].USER_ID }}
                                </td>
                            </tr>
                            <tr v-if="likegoodsList.length === 0">
                                <td colspan="4">관심 상품이 없습니다.</td>
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
        name: 'likelist',
        data() {
            return {
                loginUser: {},
                goodsList: [],
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            likegoodsList() {
                const likegoods = []
                const tradeNos = []

                for(const goods of this.goodsList) {
                    if(!tradeNos.includes(goods.GOODS_NO)){
                        likegoods.push({
                            ORDER_TRADE_NO: goods.ORDER_TRADE_NO,
                            items:[goods],
                        })
                        tradeNos.push(goods.GOODS_NO)
                    } else {
                        const index = likegoods.findIndex((o) => o.ORDER_TRADE_NO === goods.ORDER_TRADE_NO)
                        likegoods[index].items.push(goods)
                    }
                }
                return likegoods;
            }
        },
        created() {
            this.getUser()
            this.getLikeGoods()
        },
        methods: {
            gotoProduct(index) {
                this.$router.push(`/product/${index}`)
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
                    this.likegoods = response.data;
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
            // 
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

th, td {
    border: 1px solid #444444;
}
</style>