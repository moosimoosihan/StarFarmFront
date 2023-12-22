<template>
    <div class="container">
        <div class="review_wrapper">
            <h1>리뷰 작성</h1>
            <div class="review_product_name">
                <img src="" class="review_product_img">
                <h2>상품명</h2>
                <div class="review_user">
                <img src="" class="review_user_img">
                <span class="review_user_nick">판매자 닉네임</span>
                </div>
            </div>
            <p>리뷰 평가</p>
            <div class="review_rating">
                <button><img src="../assets/smile.png"></button>
                <button><img src="../assets/normal.png"></button>
                <button><img src="../assets/bad.png"></button>
            </div>
            <form>
                <textarea></textarea>
                <input type="submit" value="확인">
                <input type="button" value="취소">
            </form>
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
    width: 100%;
    height: 100%;
}
/* ------------------------------------------------------------- */

.review_wrapper {
    width: 60%;
    height: 800px;
    margin: 0 auto;
}
.review_wrapper h1 {
    font-size: 40px;
    font-weight: 100;
    margin-bottom: 20px;
}
.review_product_name {
    width: 100%;
    height: 200px;
    border: 1px solid black;
    border-radius: 20px;
}
.review_product_img {
    width: 200px;
    height:100%;
    background-color: bisque;
    float: left;
}
.review_product_name h2 {
    font-size: 25px;
    font-weight: 400;
    margin-left: 30px;
    float: left;
}
.review_product_name span {
    font-size: 15px;
    margin-left: 20px;
}
.review_user {
    width: 130px;
    height: 100%;
    float: right;
    margin: 20px 20px 0 0;
}
.review_user_img {
    height: 70%;
    width: 140px;
    border-radius: 100%;
    background-color: blue;
}

.review_wrapper p {
    margin-top: 20px;
    font-size: 25px;
    font-weight: 200;
    text-align: center;
}
.review_rating {
    width: 40%;
    height: 100px;
    margin: 10px auto;
}
.review_rating button {
    width: 25%;
    margin-left: 12%;
    border: none;
    border-radius: 100%;
}
.review_rating button img {
    width: 100%;
    height: 100%;
}
.review_rating button:first-child {
    float:left;
    margin-left: 0;
}
.review_rating button:last-child {
    float: right;
    margin-left: 0;
}
textarea {
    width: 100%;
    height: 300px;
    box-sizing: border-box;
    border: solid black 1px;
    border-radius: 5px;
    resize: none;
    margin-top: 50px;
}
form input {
    width: 100px;
    height: 50px;
    float: right;
    border: none;
    background:none;
    background-color: aqua;
    margin-left: 20px;
    border-radius: 10px;
}
</style>