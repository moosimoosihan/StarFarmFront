<template>
    <div class="container">
        <div id="userpage_wrapper">
            <div id="userpage_profile">
                <div id="userpage_profile_box">
                    <div id="userpage_profile_img">
                        <img src="../assets/profile.png">
                    </div>
                    <span>닉네임</span>
                </div>
                <div id="userpage_friendly">
                    <span>닉네임의 친밀도</span>
                    <progress value="70" max="100"></progress>
                    <a href="">1대1 채팅</a>
                </div>
                <a href="" id="userpage_report">신고</a>
            </div>
            <div id="userpage_tab">
                <ul class="userpage_tabs">
                    <li class="tab-link current" data-tab="tab-1"><a href="">판매 리스트</a></li>
                    <li class="tab-link" data-tab="tab-2"><a href="">판매자 리뷰</a></li>
                </ul>
                <div id="tab-1" class="tab-content current"></div>
                <div id="tab-2" class="tab-content"></div>
            </div>
            <div id="userpage_review_list">
                <div id="userpage_review_user">
                    <h1>구매한 물건</h1>
                    <p>구매자 닉네임</p>
                </div>
                <img src="" id="userpage_product_review_img">
                <div id="userpage_review_content"><p>리뷰 내용 ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</p></div>
                <img src="../assets/smile.png" id="userpage_review_img">
                <p id="userpage_review_date">2023-12-11</p>
            </div>
            <div id="userpage_product_list">
                <div class="userpage_product">
                    <img src="" class="userpage_product_img">
                    <h1 class="userpage_product_name">상품 이름</h1>
                </div>
                <div class="userpage_product">
                    <img src="" class="userpage_product_img">
                    <h1 class="userpage_product_name">상품 이름</h1>
                </div>
                <div class="userpage_product">
                    <img src="" class="userpage_product_img">
                    <h1 class="userpage_product_name">상품 이름</h1>
                </div>
                <div class="userpage_product">
                    <img src="" class="userpage_product_img">
                    <h1 class="userpage_product_name">상품 이름</h1>
                </div>
                <div class="userpage_product">
                    <img src="" class="userpage_product_img">
                    <h1 class="userpage_product_name">상품 이름</h1>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.container {
    width: 2000px;
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
#userpage_review_list {
    width: 100%;
    height: 40%;
    background-color: beige;
    margin: 0 auto;
    border-radius: 20px;
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

#userpage_product_list {
    width: 100%;
    height: 800px;
}
.userpage_product {
    width: 200px;
    height: 250px;
    background-color: rgb(246, 244, 198);
    float: left;
    margin-right: 100px;
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

/* 판매자 상품 리스트 끝 */
</style>