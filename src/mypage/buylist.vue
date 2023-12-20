<template>
    <div class="container" id="scroll">
        <div>
            <div class="buylist_title">
                <span>입찰 상품 이력</span>
            </div>
            <div class="buylist_container" id="completed">
                <img class="buylist_goods_img" src="" alt="상품 이미지">
                <div class="buylist_goodsdetails_container">
                    <span>상품명</span><br>
                    <span>구매 완료</span><br>
                    <span>2023-12-12 10:35:00</span>
                </div>
                <div class="buylist_buttons_container">
                    <button>후기 작성</button>
                    <button>1:1 대화</button>
                    <button>상품 보기</button>
                    <button>내역 삭제</button>
                </div>
            </div>
            <div class="buylist_container" id="buying">
                <img class="buylist_goods_img" src="" alt="상품 이미지">
                <div class="buylist_goodsdetails_container">
                    <span>상품명</span><br>
                    <span>거래 중</span><br>
                    <span>2023-12-12 10:35:00</span>
                </div>
                <div class="buylist_buttons_container">
                    <button>결제 하기</button>
                    <button>1:1 대화</button>
                    <button>상품 보기</button>
                    <button>내역 삭제</button>
                </div>
            </div>
            <div class="buylist_container" id="biding">
                <img class="buylist_goods_img" src="" alt="상품 이미지">
                <div class="buylist_goodsdetails_container">
                    <span>상품명</span><br>
                    <span>입찰 중</span><br>
                    <span>2023-12-12 10:35:00</span>
                </div>
                <div class="buylist_buttons_container">
                    <button>1:1 대화</button>
                    <button>상품 보기</button>
                    <button>내역 삭제</button>
                </div>
            </div>
            <div class="buylist_container" id="completed">
                <img class="buylist_goods_img" src="" alt="상품 이미지">
                <div class="buylist_goodsdetails_container">
                    <span>상품명</span><br>
                    <span>구매 완료</span><br>
                    <span>2023-12-12 10:35:00</span>
                </div>
                <div class="buylist_buttons_container">
                    <button>후기 작성</button>
                    <button>1:1 대화</button>
                    <button>상품 보기</button>
                    <button>내역 삭제</button>
                </div>
            </div>
            <div class="buylist_container" id="buying">
                <img class="buylist_goods_img" src="" alt="상품 이미지">
                <div class="buylist_goodsdetails_container">
                    <span>상품명</span><br>
                    <span>거래 중</span><br>
                    <span>2023-12-12 10:35:00</span>
                </div>
                <div class="buylist_buttons_container">
                    <button>결제 하기</button>
                    <button>1:1 대화</button>
                    <button>상품 보기</button>
                    <button>내역 삭제</button>
                </div>
            </div>
            <div class="buylist_container" id="biding">
                <img class="buylist_goods_img" src="" alt="상품 이미지">
                <div class="buylist_goodsdetails_container">
                    <span>상품명</span><br>
                    <span>입찰 중</span><br>
                    <span>2023-12-12 10:35:00</span>
                </div>
                <div class="buylist_buttons_container">
                    <button>1:1 대화</button>
                    <button>상품 보기</button>
                    <button>내역 삭제</button>
                </div>
            </div>
            <div class="buylist_container" id="completed">
                <img class="buylist_goods_img" src="" alt="상품 이미지">
                <div class="buylist_goodsdetails_container">
                    <span>상품명</span><br>
                    <span>구매 완료</span><br>
                    <span>2023-12-12 10:35:00</span>
                </div>
                <div class="buylist_buttons_container">
                    <button>후기 작성</button>
                    <button>1:1 대화</button>
                    <button>상품 보기</button>
                    <button>내역 삭제</button>
                </div>
            </div>
            <div class="buylist_container" id="buying">
                <img class="buylist_goods_img" src="" alt="상품 이미지">
                <div class="buylist_goodsdetails_container">
                    <span>상품명</span><br>
                    <span>거래 중</span><br>
                    <span>2023-12-12 10:35:00</span>
                </div>
                <div class="buylist_buttons_container">
                    <button>결제 하기</button>
                    <button>1:1 대화</button>
                    <button>상품 보기</button>
                    <button>내역 삭제</button>
                </div>
            </div>
            <div class="buylist_container" id="biding">
                <img class="buylist_goods_img" src="" alt="상품 이미지">
                <div class="buylist_goodsdetails_container">
                    <span>상품명</span><br>
                    <span>입찰 중</span><br>
                    <span>2023-12-12 10:35:00</span>
                </div>
                <div class="buylist_buttons_container">
                    <button>1:1 대화</button>
                    <button>상품 보기</button>
                    <button>내역 삭제</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "buylist",
        data() {
            return {
                buylist: [],
            }
        },
        methods: {
            // getBuylist() {
            //     this.$axios.get('/buylist')
            //         .then((res) => {
            //             this.buylist = res.data;
            //         })
            //         .catch((err) => {
            //             console.log(err);
            //         })
            // }
        },
        mounted() {
            // this.getBuylist();
        }
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

.buylist_container {
    width: 800px;
    height: 100px;
    text-align: center;
    margin-top: 20px;
    margin-left: 10%;
}

#completed {
    background-color: #f5f5f5;
}
#buying {
    background-color:darkgray;
}
#biding {
    background-color: #c1a3a3;
}

.buylist_goods_img {
    width: 90px;
    height: 90px;
    float: left;
    margin-top: 5px;
    margin-left: 20px;
    background-color: red;
}
.buylist_goodsdetails_container{
    width: 300px;
    height: 80%;
    float: left;
    margin-top: 20px;
    margin-left: 20px;
}

.buylist_buttons_container {
    width: 300px;
    height: 80%;
    float: left;
    margin-top: 10px;
    margin-left: 20px;
}

.buylist_buttons_container button {
    width: 100px;
    height: 30px;
    margin-top: 10px;
    margin-left: 20px;
    float: left;
    background-color: #f5f5f5;
    border: 1px solid black;
}

.buylist_title {
    margin-top: 10px;
    margin-left: 10px;
}
</style>