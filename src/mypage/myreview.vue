<template>
    <main class="mt-3">
        <div class="container">
            <div class="myinfo">
                <div class="review_title">
                    <span class="title">내가 쓴 리뷰</span>
                </div>
                <div class="review">
                    <table class="table" style="width:100%;">
                        <thead>
                            <tr>
                                <th>상품 이미지</th>
                                <th>상품명</th>
                                <th>판매자명</th>
                                <th>리뷰 내용</th>
                                <th>리뷰 점수</th>
                                <th>작성 날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(review,i) in reviewList" :key="i" @click="gotoProduct(review.goods_no)">
                                <td>
                                    <img :width="70" style="border-radius: 10px;"
                                        :src="review.goods_img ? require(`../../../StarFarmBack/uploads/uploadGoods/${review.goods_no}/${review.goods_img.split(',')[0]}`) : require(`../assets/2-1.png`)"
                                        alt="상품 이미지" />
                                </td>
                                <td>
                                    <p>{{ review.goods_nm }}</p>
                                </td>
                                <td>
                                    <p>{{ review.user_nick }}</p>
                                </td>
                                <td>
                                    <p>{{ review.review_con }}</p>
                                </td>
                                <td>
                                    <div v-if="review.review_score === 0">
                                        <img :width="70" style="border-radius: 10px;"
                                            :src="require(`../assets/smile.png`)" alt="리뷰 점수 이미지" />
                                    </div>
                                    <div v-if="review.review_score === 1">
                                        <img :width="70" style="border-radius: 10px;"
                                            :src="require(`../assets/bad.png`)" alt="리뷰 점수 이미지" />
                                    </div>
                                    <div v-if="review.review_score === 2">
                                        <img :width="70" style="border-radius: 10px;"
                                            :src="require(`../assets/normal.png`)" alt="리뷰 점수 이미지" />
                                    </div>
                                </td>
                                <td>
                                    <p>{{ formatDateTime(review.review_create_dt) }}</p>
                                </td>
                            </tr>
                            <tr v-if="reviewList.length === 0">
                                <td colspan="6">리뷰가 없습니다.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="page_container">
                    <button v-if="page>0" class="pageNum" @click="prev()">이전</button>
                    <button v-for="(num, i) in pageCount" :key="i" class="pageNum" @click="getReviewList(i)">{{i+1}}</button>
                    <button v-if="page<(pageCount-1)" class="pageNum" @click="next()">다음</button>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import axios from 'axios'

    export default {
        name: 'myreview',
        data() {
            return {
                reviewList: [],

                page: 0,
                pageCount: 0,
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        created() {
            this.getReviewList(this.page);
        },
        methods: {
            async getReviewCount() {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/myreviewCount/${this.user.user_no}`);
                    this.pageCount = Math.ceil(response.data[0].count / 10);
                } catch (error) {
                    console.error(error);
                }
            },
            async getReviewList(page) {
                this.getReviewCount()
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/myreview/${this.user.user_no}/${page}`);
                    this.reviewList = response.data;
                } catch (error) {
                    console.error(error);
                }
                this.page=page;
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
          gotoProduct(goods_no) {
            this.$router.push(`/product/${goods_no}`);
          },
          prev() {
            this.page -= 1;
            this.getReviewList(this.page);
            },
          next(){
            this.page += 1;
            this.getReviewList(this.page)
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

.review .table {
    max-width: 1200px;
    text-align: center;
    background-color: #f9f9f9;
    border-radius: 10px;
}

.review .table th {
    text-align: center;
    padding: 20px 0;
}

.review p {
    width: 120px;
    font-size: 1rem;
    display: inline-block;
    vertical-align: middle;
    padding: 2px;
    padding-top: 10px;
    margin: 20px 30px 16px 0px;
    /* border: 1px solid red; */
}

.review .detail {
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
  width: 16%;
}

th:nth-child(2),
td:nth-child(2) {
  width: 16%;
}

th:nth-child(3),
td:nth-child(3) {
  width: 16%;
}
th:nth-child(4),
td:nth-child(4) {
  width: 16%;
}
th:nth-child(5),
td:nth-child(5) {
  width: 16%;
}
th:nth-child(6),
td:nth-child(6) {
  width: 16%;
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