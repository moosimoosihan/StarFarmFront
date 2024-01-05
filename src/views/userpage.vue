<template>
    <div class="container">
        <div id="userpage_wrapper">
            <div id="userpage_profile">
                <div id="userpage_profile_box">
                    <div id="userpage_profile_img">
                        <img :src="userInfo.user_img ? require(`../../../StarFarmBack/uploads/userImg/${userInfo.user_no}/${userInfo.user_img}`) : require(`../assets/profile.png`)">
                    </div>
                    <span>{{  userInfo.user_nick  }}</span>
                </div>
                <div id="userpage_friendly">
                    <span>{{ userInfo.user_nick }}의 친밀도</span>
                    <progress value="70" max="100"></progress>
                    <a href="">1대1 채팅</a>
                </div>
                <a href="" id="userpage_report">신고</a>
            </div>
            <div class="wrap">
                <div class="button_tab">
                    <button
                        v-for="(tab, index) in tabList"
                        :key="index"
                        @click.prevent="currentTab = index"
                        :class="{'active' : currentTab === index}"
                    >
                        {{ tab.name }}
                    </button>
                </div>
                <ul class="product-tab-content" v-if="currentTab === 0">
                    <li v-for="(item, index) in userProductList" :key="index">
                        <div class="userpage_product">
                            <img :src="require(`../../../StarFarmBack/uploads/uploadGoods/${userProductList[index].goods_no}/${userProductList[index].goods_img.split(',')[0]}`)" class="userpage_product_img">
                            <h1 class="userpage_product_name">{{ userProductList[index].goods_nm }}</h1>
                        </div>
                    </li>
                </ul>
                <ul class="review-tab-content" v-if="currentTab === 1">
                    <li v-for="(item, index) in userReviewList" :key="index">
                        <div id="userpage_review_list">
                            <div id="userpage_review_user">
                                <h1>{{userReviewList[index].goods_nm}}</h1>
                                <p>{{ userReviewList[index].user_nick }}</p>
                            </div>
                            <img :src="require(`../../../StarFarmBack/uploads/uploadGoods/${userReviewList[index].goods_no}/${userReviewList[index].goods_img.split(',')[0]}`)" id="userpage_product_review_img">
                            <div id="userpage_review_content"><p>{{ userReviewList[index].review_con }}</p></div>
                            
                            <p id="userpage_review_date">{{ userReviewList[index].review_create_dt }}</p>
                        </div>
                    </li>
                </ul>
                
        </div>
            <div id="tab-1" class="tab-content current"></div>
            <div id="tab-2" class="tab-content"></div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

    export default {
    name: "Tab",
    data() {
        return {
        currentTab: 0,
        tabList: [
            { name: "판매 리스트" },
            { name: "판매자 리뷰" },
        ],
        userInfo: [],
        userReviewList: [],
        userProductList: [],
        };
    },
    created() {
        this.getUserInfo();
        this.getReviewList();
        this.getProductList();
    },
    methods: {
        async getUserInfo() {
            try {
                const user_no = this.$route.params.id;
                const response = await axios.get(`http://localhost:3000/mypage/mypage/${user_no}`);
                this.userInfo = response.data[0];
            } catch (error) {
                console.error(error);
            }
        },
        async getProductList() {
            try {
                const user_no = this.$route.params.id;
                const response = await axios.get(`http://localhost:3000/mypage/get_user_product/${user_no}`);
                this.userProductList = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        async getReviewList() {
            try {
                const user_no = this.$route.params.id;
                const response = await axios.get(`http://localhost:3000/mypage/get_user_review/${user_no}`);
                this.userReviewList = response.data;
            } catch (error) {
                console.error(error);
            }
        }
    },
    };
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.container {
    width: 100%;
    height: 1260px;
}
/* ------------------------------------------------------------- */

/* 유저 페이지 상단 */
progress {
    width: 200px;
    height: 50px;
}
#userpage_wrapper {
    width: 60%;
    height: 800px;
    margin: 0 auto;
}
#userpage_profile {
    width: 100%;
    height: 200px;
    border: 1px solid rgb(227, 208, 208);
}
#userpage_profile a {
    display: block;
    width: 50px;
    height: 30px;
    background-color: red;
    float: right;
    margin: 10px 10px;
    line-height: 30px;
    padding-left: 10px;
    border-radius: 10px;
    text-decoration: none;
}
#userpage_profile a:first-child {
    width: 100px;
    height: 50px;
}
#userpage_profile_box {
    width: 200px;
    height: 100%;
    float: left;
}
#userpage_profile_box span {
    margin-left: 35%;
    margin-top: 10px;
    float: left;
}
#userpage_profile_img {
    width: 150px;
    height: 75%;
    border-radius: 100%;
    margin: 0 auto;
    overflow: hidden;
}
#userpage_profile_img img {
    width: 150px;
    height: 100%;
    object-fit: cover;
}
#userpage_friendly {
    width: 400px;
    height: 100%;
    float: left;
}
#userpage_friendly span {
    float: left;
    line-height: 80px;
}
#userpage_friendly progress {
    float: left;
    margin-top: 15px;
    margin-left: 20px;
}
#userpage_friendly a {
    display: block;
    width: 100px;
    height: 40px;
    background-color:aliceblue;
    line-height: 40px;
    padding-left: 10px;
    border-radius: 10px;
    float: left;
    margin-top: 80px;
    text-decoration: none;
}
#userpage_tab {
    width: 100%;
    height: 100px;
    margin-top: 19px;
}
.tab-link {
    width: 50%;
    height: 70px;
    background-color: rgb(201, 34, 129);
    float: left;
    list-style: none;
    line-height: 70px;
}
#userpage_tab li:first-child {
    background-color: pink;
}
.tab-link a {
    display: block;
    padding-left: 40%;
    text-decoration: none;
    color: black;
}
/* 유저 페이지 상단 끝 */

/* 판매자 리뷰 */
.button_tab {
    width:100%;
    height:100px;
}
.button_tab button {
    width: 50%;
    height: 100%;
    border:none;
}
.active {
    background-color: red;
}
#userpage_review_list {
    width: 100%;
    height: 150px;
    background-color: beige;
    margin: 30px auto;
    border-radius: 20px;
    overflow:hidden;
}
#userpage_review_user {
    width: 153px;
    height: 60%;
    padding-left: 22px;
    padding-top: 16px;
    float: left;
}
#userpage_review_list div h1 {
    font-size: 20px;
}
#userpage_review_list div p {
    font-size: 14px;
    margin: 34px auto;
}
#userpage_product_review_img {
    width: 200px;
    height: 100%;
    background-color: rgb(198, 247, 222);
    float: left;
}
#userpage_review_content {
    width: 300px;
    height: 100%;
    float: left;
}
#userpage_review_img {
    width: 70px;
    height: 70px;
    margin-top: 30px;
    margin-left: 40px;
}
#userpage_review_date {
    float: right;
    margin-right: 46px;
    line-height: 160px;
}
/* 판매자 리뷰 끝 */

/* 판매자 상품 리스트 */
.userpage_product {
    width: 200px;
    height: 250px;
    background-color: rgb(246, 244, 198);
    float: left;
    margin-top: 50px;
    border-radius: 10px;
}
.userpage_product:nth-child(4n) {
    margin-right: 0;
}
.userpage_product:nth-child(4n+1) {
    margin-left: 50px;
}
.userpage_product_img {
    width: 100%;
    height: 70%;
}
.userpage_product_name {
    font-size: 20px;
    line-height: 70px;
    margin-left: 55px;
}
.product-tab-content {
    width: 100%;
    height: 800px;
    background-color: beige;
}
.product-tab-content li {
    list-style: none;
}
.review-tab-content li {
    margin-bottom: 30px;
    list-style: none;
}

/* 판매자 상품 리스트 끝 */
</style>