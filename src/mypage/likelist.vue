<template>
    <div class="container" id="scroll">
        <div>
            <div class="likelist_title">
                <span>관심 상품</span>
            </div>
            <div class="likelist_container">
                <img class="likelist_goods_img" src="" alt="상품 이미지">
                <div class="likelist_goodsdetails_container">
                    <span class="price">최저가~</span><br>
                    <span>상품명</span><br>
                    <span>올린 사람</span>
                </div>
            </div>
            <div class="likelist_container">
                <img class="likelist_goods_img" src="" alt="상품 이미지">
                <div class="likelist_goodsdetails_container">
                    <span class="price">최저가~</span><br>
                    <span>상품명</span><br>
                    <span>올린 사람</span>
                </div>
            </div>
            <div class="likelist_container">
                <img class="likelist_goods_img" src="" alt="상품 이미지">
                <div class="likelist_goodsdetails_container">
                    <span class="price">최저가~</span><br>
                    <span>상품명</span><br>
                    <span>올린 사람</span>
                </div>
            </div>
            <div class="likelist_container">
                <img class="likelist_goods_img" src="" alt="상품 이미지">
                <div class="likelist_goodsdetails_container">
                    <span class="price">최저가~</span><br>
                    <span>상품명</span><br>
                    <span>올린 사람</span>
                </div>
            </div>
            <div class="likelist_container">
                <img class="likelist_goods_img" src="" alt="상품 이미지">
                <div class="likelist_goodsdetails_container">
                    <span class="price">최저가~</span><br>
                    <span>상품명</span><br>
                    <span>올린 사람</span>
                </div>
            </div>
            <div class="likelist_container">
                <img class="likelist_goods_img" src="" alt="상품 이미지">
                <div class="likelist_goodsdetails_container">
                    <span class="price">최저가~</span><br>
                    <span>상품명</span><br>
                    <span>올린 사람</span>
                </div>
            </div>
            <div class="likelist_container">
                <img class="likelist_goods_img" src="" alt="상품 이미지">
                <div class="likelist_goodsdetails_container">
                    <span class="price">최저가~</span><br>
                    <span>상품명</span><br>
                    <span>올린 사람</span>
                </div>
            </div>
            <div class="likelist_container">
                <img class="likelist_goods_img" src="" alt="상품 이미지">
                <div class="likelist_goodsdetails_container">
                    <span class="price">최저가~</span><br>
                    <span>상품명</span><br>
                    <span>올린 사람</span>
                </div>
            </div>
            <div class="likelist_container">
                <img class="likelist_goods_img" src="" alt="상품 이미지">
                <div class="likelist_goodsdetails_container">
                    <span class="price">최저가~</span><br>
                    <span>상품명</span><br>
                    <span>올린 사람</span>
                </div>
            </div>
            <div class="likelist_container">
                <img class="likelist_goods_img" src="" alt="상품 이미지">
                <div class="likelist_goodsdetails_container">
                    <span class="price">최저가~</span><br>
                    <span>상품명</span><br>
                    <span>올린 사람</span>
                </div>
            </div>
            <div class="likelist_container">
                <img class="likelist_goods_img" src="" alt="상품 이미지">
                <div class="likelist_goodsdetails_container">
                    <span class="price">최저가~</span><br>
                    <span>상품명</span><br>
                    <span>올린 사람</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'likelist'
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
#scroll {
    overflow: scroll;
}
/* -------------------- */

.likelist_container {
    width: 150px;
    height: 200px;
    text-align: center;
    margin-top: 20px;
    margin-left: 10%;
    background-color: #f5f5f5;
    float : left;
}
.likelist_goods_img {
    width: 100px;
    height: 100px;
    margin-top: 5px;
    margin-left: 20px;
    background-color: red;
}
.price {
    font-size: 18px;
}
</style>