<template>
    <div class="container" id="scroll">
        <div>
            <div class="salelist_title">
                <span>판매 상품 관리</span>
            </div>
            <div class="salelist_container" id="completed">
                <img class="salelist_goods_img" src="" alt="상품 이미지">
                <div class="salelist_goodsdetails_container">
                    <span>상품명</span><br>
                    <span>판매 완료</span><br>
                    <span>2023-12-12 10:35:00</span>
                </div>
                <div class="salelist_buttons_container">
                    <button>후기 작성</button>
                    <button>내역 삭제</button><br>
                    <button>상품 보기</button>
                </div>
            </div>
            <div class="salelist_container" id="saleing">
                <img class="salelist_goods_img" src="" alt="상품 이미지">
                <div class="salelist_goodsdetails_container">
                    <span>상품명</span><br>
                    <span>거래 중</span><br>
                    <span>2023-12-12 10:35:00</span>
                </div>
                <div class="salelist_buttons_container">
                    <button>거래 완료</button>
                    <button>내역 삭제</button><br>
                    <button>상품 보기</button>
                </div>
            </div>
            <div class="salelist_container" id="biding">
                <img class="salelist_goods_img" src="" alt="상품 이미지">
                <div class="salelist_goodsdetails_container">
                    <span>상품명</span><br>
                    <span>입찰 중</span><br>
                    <span>2023-12-12 10:35:00</span>
                </div>
                <div class="salelist_buttons_container">
                    <button>상품 보기</button>
                    <button>내역 삭제</button>
                </div>
            </div>
            <div class="salelist_container" id="completed">
                <img class="salelist_goods_img" src="" alt="상품 이미지">
                <div class="salelist_goodsdetails_container">
                    <span>상품명</span><br>
                    <span>판매 완료</span><br>
                    <span>2023-12-12 10:35:00</span>
                </div>
                <div class="salelist_buttons_container">
                    <button>후기 작성</button>
                    <button>내역 삭제</button><br>
                    <button>상품 보기</button>
                </div>
            </div>
            <div class="salelist_container" id="saleing">
                <img class="salelist_goods_img" src="" alt="상품 이미지">
                <div class="salelist_goodsdetails_container">
                    <span>상품명</span><br>
                    <span>거래 중</span><br>
                    <span>2023-12-12 10:35:00</span>
                </div>
                <div class="salelist_buttons_container">
                    <button>거래 완료</button>
                    <button>내역 삭제</button><br>
                    <button>상품 보기</button>
                </div>
            </div>
            <div class="salelist_container" id="biding">
                <img class="salelist_goods_img" src="" alt="상품 이미지">
                <div class="salelist_goodsdetails_container">
                    <span>상품명</span><br>
                    <span>입찰 중</span><br>
                    <span>2023-12-12 10:35:00</span>
                </div>
                <div class="salelist_buttons_container">
                    <button>상품 보기</button>
                    <button>내역 삭제</button>
                </div>
            </div>
            <div class="salelist_container" id="completed">
                <img class="salelist_goods_img" src="" alt="상품 이미지">
                <div class="salelist_goodsdetails_container">
                    <span>상품명</span><br>
                    <span>판매 완료</span><br>
                    <span>2023-12-12 10:35:00</span>
                </div>
                <div class="salelist_buttons_container">
                    <button>후기 작성</button>
                    <button>내역 삭제</button><br>
                    <button>상품 보기</button>
                </div>
            </div>
            <div class="salelist_container" id="saleing">
                <img class="salelist_goods_img" src="" alt="상품 이미지">
                <div class="salelist_goodsdetails_container">
                    <span>상품명</span><br>
                    <span>거래 중</span><br>
                    <span>2023-12-12 10:35:00</span>
                </div>
                <div class="salelist_buttons_container">
                    <button>거래 완료</button>
                    <button>내역 삭제</button><br>
                    <button>상품 보기</button>
                </div>
            </div>
            <div class="salelist_container" id="biding">
                <img class="salelist_goods_img" src="" alt="상품 이미지">
                <div class="salelist_goodsdetails_container">
                    <span>상품명</span><br>
                    <span>입찰 중</span><br>
                    <span>2023-12-12 10:35:00</span>
                </div>
                <div class="salelist_buttons_container">
                    <button>상품 보기</button>
                    <button>내역 삭제</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'salelist'
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

.salelist_container {
    width: 800px;
    height: 100px;
    text-align: center;
    margin-top: 20px;
    margin-left: 10%;
}

#completed {
    background-color: #f5f5f5;
}
#saleing {
    background-color:darkgray;
}
#biding {
    background-color: antiquewhite;
}

.salelist_goods_img {
    width: 90px;
    height: 90px;
    float: left;
    margin-top: 5px;
    margin-left: 20px;
    background-color: red;
}
.salelist_goodsdetails_container{
    width: 300px;
    height: 80%;
    float: left;
    margin-top: 20px;
    margin-left: 20px;
}

.salelist_buttons_container {
    width: 300px;
    height: 80%;
    float: left;
    margin-top: 10px;
    margin-left: 20px;
}

.salelist_buttons_container button {
    width: 100px;
    height: 30px;
    margin-top: 10px;
    margin-left: 20px;
    float: left;
    background-color: #f5f5f5;
    border: 1px solid black;
}

.salelist_title {
    margin-top: 10px;
    margin-left: 10px;
}
</style>