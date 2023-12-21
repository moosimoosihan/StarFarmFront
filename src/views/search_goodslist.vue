<template>
    <div class="container" id="scroll">
        <div class="search_title">
            <span class="search_bigcate">대분류</span>
            <span>></span>
            <span>소분류</span>
        </div>
        <div class="search_goods">
            <div>
                <img class="search_goods_img" src="" alt="상품 이미지">
                <div class="search_goodsdetails">
                    <p>상품명</p>
                    <p>가격</p>
                    <p>판매자</p>
                </div>
            </div>
        </div>
        <div class="search_goods">
            <div>
                <img class="search_goods_img" src="" alt="상품 이미지">
                <div class="search_goodsdetails">
                    <p>상품명</p>
                    <p>가격</p>
                    <p>판매자</p>
                </div>
            </div>
        </div>
        <div class="search_goods">
            <div>
                <img class="search_goods_img" src="" alt="상품 이미지">
                <div class="search_goodsdetails">
                    <p>상품명</p>
                    <p>가격</p>
                    <p>판매자</p>
                </div>
            </div>
        </div>
        <div class="search_goods">
            <div>
                <img class="search_goods_img" src="" alt="상품 이미지">
                <div class="search_goodsdetails">
                    <p>상품명</p>
                    <p>가격</p>
                    <p>판매자</p>
                </div>
            </div>
        </div>
        <div class="search_goods">
            <div>
                <img class="search_goods_img" src="" alt="상품 이미지">
                <div class="search_goodsdetails">
                    <p>상품명</p>
                    <p>가격</p>
                    <p>판매자</p>
                </div>
            </div>
        </div>
        <div class="search_goods">
            <div>
                <img class="search_goods_img" src="" alt="상품 이미지">
                <div class="search_goodsdetails">
                    <p>상품명</p>
                    <p>가격</p>
                    <p>판매자</p>
                </div>
            </div>
        </div>
        <div class="search_goods">
            <div>
                <img class="search_goods_img" src="" alt="상품 이미지">
                <div class="search_goodsdetails">
                    <p>상품명</p>
                    <p>가격</p>
                    <p>판매자</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name : 'search_goodslist'
    }
</script>
<style>
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

.search_goods {
    width: 150px;
    height: 200px;
    text-align: center;
    margin-top: 20px;
    margin-left: 10%;
    background-color: #f5f5f5;
    float : left;
}

.search_goods_img {
    width: 100px;
    height: 100px;
    margin-top: 5px;
    margin-left: 20px;
    background-color: red;
}
.search_bigcate {
    font-size: 25px;
}
.search_title {
    margin-top: 10px;
    margin-left: 10px;
}
</style>