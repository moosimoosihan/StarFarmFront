<template>
    <div class="container">
        <div id="store_upload_wrapper">
            <form>
                <div id="store_product_img">
                    <p>상품 이미지(0/5)</p>
                    <div><img src=""><button class="store_img_del" />x</div>
                    <div><img src=""><button class="store_img_del" />x</div>
                    <div><img src=""><button class="store_img_del" />x</div>
                    <div><img src=""><button class="store_img_del" />x</div>
                    <div><img src=""><button class="store_img_del" />x</div>
                </div>
            <div id="store_product_name">
                    <p>상품명</p>
                    <input type="text" placeholder="상품명을 입력해주세요.">
                </div>
                <div id="store_product_category1">
                    <p>카테고리1</p>
                    <select>
                        <option>의류</option>
                        <option>뷰티</option>
                        <option>생활/가전</option>
                        <option>취미</option>
                        <option>기타</option>
                    </select>
                </div>
                <div id="store_product_category2">
                    <p>카테고리2</p>
                    <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option> <!-- 뷰로 카테고리1 선택된 카테고리마다 옵션이 바뀌어야함-->
                    </select>
                </div>
                <div id="store_price_trade">
                    <div>
                        <p>시작가</p>
                        <input type="text" placeholder="경매 시작가를 입력해주세요.">
                    </div>
                    <div>
                    <p>거래유형</p>
                        <select>
                            <option>택배거래</option>
                            <option>직거래</option>
                        </select>
                    </div>
                </div>
                <div id="store_timer_deliv">
                    <div>
                        <p>마감 시간</p>
                        <select>
                            <option>1일</option>
                            <option>2일</option>
                            <option>3일</option>
                            <option>4일</option>
                        </select>
                    </div>
                    <div>
                        <p>택배 비용</p>
                        <input type="text" placeholder="택배 비용">
                    </div>
                </div>
                <div id="store_product_content">
                    <p>설명</p>
                    <textarea placeholder="상품 설명을 입력해주세요. (최소 10글자)"></textarea>
                </div>
                <div id="store_submit">
                    <input type="button" value="취소">
                    <input type="submit" value="상품 등록">
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
    width: 100%;
    height: 100%;
}
/* ------------------------------------------------------------- */

p {
    float: left;
    width: 150px;
    height: 30px;
}
select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    color: #444;
    padding: 0.8em 2em;
    border-radius: 5px;
}
#store_upload_wrapper {
    width: 60%;
    height: 800px;
    margin: 0 auto;
}
#store_product_img {
    width: 100%;
    height: 230px;
    line-height: 200px;
    border-bottom: 1px solid black;
    overflow: hidden;
    padding-bottom: 30px;
}
#store_product_img div {
    width: 170px;
    height: 200px;
    background-color: black;
    float: left;
    margin-left: 20px;
}
#store_product_img button {
    width: 20px;
    height: 20px;
    position: relative;
    top: -92px;
    right: -150px;
    background: none;
    border-radius: 100%;
    background-color: red;
}
#store_product_name {
    width: 100%;
    height: 120px;
    line-height: 120px;
    white-space: nowrap;
}
#store_product_name input {
    width: 40%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid black;
}
#store_product_category1 {
    width: 100%;
    height: 80px;
    line-height: 80px;
}
#store_product_category2 {
    width: 100%;
    height: 80px;
    line-height: 80px;
}
#store_price_trade {
    width: 100%;
    height: 80px;
    line-height: 80px;
}
#store_price_trade input {
    width: 200px;
    height: 40px;
    border: 1px solid black;
    border-radius: 5px;
}
#store_price_trade div {
    float: left;
}
#store_price_trade div:last-child {
    width: 330px;
    height: 50px;
    float: right;
}
#store_timer_deliv {
    width: 100%;
    height: 80px;
    line-height: 80px;
}
#store_timer_deliv div {
    float: left;
}
#store_timer_deliv div:last-child {
    width: 330px;
    height: 50px;
    float: right;
}
#store_timer_deliv input {
    width: 150px;
    height: 40px;
    border: 1px solid black;
    border-radius: 5px;
}
#store_product_content p {
    margin-bottom: 10px;
}
#store_product_content textarea {
    width: 100%;
    height: 300px;
    resize: none;
    text-align: center;
    font-size: large;
    border-radius: 5px;
    padding-top: 50px;
}
#store_submit {
    float: right;
    margin: 10px 0;
}
#store_submit input {
    margin-left: 20px;
    padding: 10px 20px;
    background: none;
    border: none;
    background-color: aqua;
    border-radius: 5px;
}
</style>