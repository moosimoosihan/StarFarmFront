<template>
    <main class="mt-3">
        <div class="container">
            <div class="myinfo">
                <div class="likelist_title">
                    <span class="title">관심 상품</span>
                </div>
                <div class="likegoods">
                    <table class="table" style="width: 100%;">
                        <thead>
                            <tr>
                                <th>상품 이미지</th>
                                <th>상품명</th>
                                <th>금액</th>
                                <th>판매자</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(likegoods, i) in likegoodsList" :key="i" @click="gotoProduct(likegoods.items[0].GOODS_NO)">
                                <td>
                                    <img :width="70" style="border-radius: 10px;"
                                        :src="likegoods.items[0].goods_img ? require(`../../../StarFarmBack/uploads/uploadGoods/${likegoods.items[0].GOODS_NO}/${likegoods.items[0].goods_img.split(',')[0]}`) : require(`../assets/2-1.png`)"
                                        alt="상품 이미지" />
                                </td>
                                <td>
                                    {{ likegoods.items[0].goods_nm }}
                                </td>
                                <td>
                                    <span>시작가 {{ formatPrice(likegoods.items[0].goods_start_price) }}</span><br>
                                    <span>입찰가 {{ formatPrice(succ_bidList[i]) }}</span>
                                </td>
                                <td>
                                    {{ likegoods.items[0].user_nick }}
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
import axios from 'axios'

    export default {
        name: 'likelist',
        data() {
            return {
                loginUser: {},
                likeList: [],
                succ_bidList: [],
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            likegoodsList() {
                const likegoods = []
                const tradeNos = []

                for(const goods of this.likeList) {
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
            async getLikeGoods() {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/likelist/${this.user.user_no}`);
                    this.likeList = response.data;
                    for(let i=0; i<this.likeList.length; i++){
                        let val = await this.getSuccBid(this.likeList[i].GOODS_NO)
                        if(val === undefined || val === null){
                            val = 0;
                        }
                        this.succ_bidList.push(val)
                    }
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
            async getSuccBid(goods_no) {
                try {
                    const response = await axios.get(`http://localhost:3000/goods/goodsSuccBid/${goods_no}`);
                    console.log(response.data[0].succ_bid);
                    return response.data[0].succ_bid;
                } catch (error) {
                    console.error(error);
                }
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
  width: 25%;
}

th:nth-child(2),
td:nth-child(2) {
  width: 25%;
}

th:nth-child(3),
td:nth-child(3) {
  width: 25%;
}
th:nth-child(4),
td:nth-child(4) {
  width: 25%;
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
</style>