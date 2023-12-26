<template>
    <div class="container">
        <div id="payment_wrapper">
            <form id="payment_form">
                <h1>상품 결제</h1>
                <div id="payment_product">
                    상품 정보
                    리뷰 페이지에서 가져오면 됨
                </div>
                <div id="payment_user_name">
                    <p>수령자 이름 *</p>
                    <input type="text" placeholder="이름">
                </div>
                <div id="payment_phone">
                    <p>전화번호 *</p>
                    <input type="text" placeholder="전화번호">
                </div>
                <div id="payment_deliv">
                    <p>배송지 *</p>
                    <input type="text" placeholder="주소" id="payment_address1">
                    <input type="button" value="우편번호" id="payment_address_btn">
                    <input type="text" placeholder="상세 주소" id="payment_address2">
                </div>
                <div id="payment_request">
                    <p>배송 시 요청사항</p>
                    <textarea placeholder="배송 요청사항을 입력해주세요"></textarea>
                </div>
                <div id="payment_submit">
                    <div id="payment_pay_btn">
                        <a href="" style="text-decoration:none;color:black">취소</a>
                    </div>
                    <input type="submit" value="결제" id="payment_pay_btn">
                </div>
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
    width: 1900px;
    height: 100%;
}
/* ------------------------------------------------------------- */

#payment_wrapper {
    width: 55%;
    height: 1000px;
    margin:  auto;
    padding-top: 2px;
}
#payment_form h1 {
    margin-bottom: 20px;
}
#payment_product {
    width: 100%;
    height: 150px;
    background-color: bisque;
    border-radius: 20px;
    margin-bottom: 20px;
}
#payment_user_name {
    height: 100px;
}
#payment_user_name p {
    font-size: 20px;
    font-weight: 700;
}
#payment_user_name input {
    width: 150px;
    height: 30px;
    background: none;
    border: 0;
    border-bottom: 1px solid black;
    margin-top: 10px;
    font-size: 15px;
}
#payment_phone {
    height: 100px;
}
#payment_phone p {
    font-size: 20px;
    font-weight: 700;
}
#payment_phone input {
    width: 250px;
    height: 30px;
    background: none;
    border: 0;
    border-bottom: 1px solid black;
    margin-top: 10px;
    font-size: 15px;
}
#payment_deliv {
    height: 100px;
}
#payment_deliv p {
    font-size: 20px;
    font-weight: 700;
}
#payment_address1 {
    width: 80%;
    height: 40px;
    background: none;
    border: 0;
    border-bottom: 1px solid black;
    margin-top: 10px;
    font-size: 15px;

}
#payment_address_btn {
    width: 80px;
    height: 30px;
}
#payment_address2 {
    width: 90%;
    height: 40px;
    background: none;
    border: 0;
    border-bottom: 1px solid black;
    margin-top: 10px;
    font-size: 15px;
}
#payment_request {
    margin-top: 40px;
}
#payment_request p {
    font-size: 20px;
    font-weight: 700;
}
#payment_request textarea {
    width: 100%;
    height: 300px;
    resize: none;
    font-size: 15px;
    line-height: 100px;
    padding-left: 20%;
}

#payment_pay_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 35px;
    background: none;
    float: right;
    border: 0;
    background-color: bisque;
    margin-left: 30px;
    text-align: center;
    font-size:17px
}
</style>