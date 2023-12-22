<template>
    <main class="mt-3">
        <div class="container">
            <div class="myinfo">
                <div class="review_title">
                    <span>내가 쓴 리뷰</span>
                </div>
                <div class="review">
                    <table class="table" style="width:100%;">
                        <thead>
                            <tr>
                                <th>상품 이미지</th>
                                <th>상품명</th>
                                <th>리뷰 내용</th>
                                <th>리뷰 점수</th>
                                <th>작성 날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(review,i) in reviewList" :key="i">
                                <td>
                                    <img :width="70" style="border-radius: 10px;"
                                        :src="review.items[0].ORDER_GOODS_IMG ? require(`../../../StarFarmBack/uploads/uploadGoods/${review.items[0].ORDER_GOODS_IMG}`) : '../assets/2-1.png'"
                                        alt="상품 이미지" />
                                </td>
                                <td @click="gotoProduct(review.items[0].GOODS_NO)">
                                    {{ review.items[0].ORDER_GOODS_NM }}
                                </td>
                                <td>
                                    <p>{{ review.items[0].REVIEW_CONTENTS }}</p>
                                </td>
                                <td>
                                    <div v-if="review.items[0].REVIEW_SCORE === 0">
                                        <img :width="70" style="border-radius: 10px;"
                                            :src="require(`../assets/smile.png`)" alt="리뷰 점수 이미지" />
                                    </div>
                                    <div v-if="review.items[0].REVIEW_SCORE === 1">
                                        <img :width="70" style="border-radius: 10px;"
                                            :src="require(`../assets/bad.png`)" alt="리뷰 점수 이미지" />
                                    </div>
                                    <div v-if="review.items[0].REVIEW_SCORE === 2">
                                        <img :width="70" style="border-radius: 10px;"
                                            :src="require(`../assets/normal.png`)" alt="리뷰 점수 이미지" />
                                    </div>
                                </td>
                                <td>
                                    <p>{{ formatDateTime(review.items[0].REVIEW_DATE) }}</p>
                                </td>
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
        name: 'myreview',
        methods: {
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
th, td {
    border: 1px solid #444444;
}
</style>