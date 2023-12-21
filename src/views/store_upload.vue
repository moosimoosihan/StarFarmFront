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
    width: 2000px;
    height: 100%;
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
    border: 1px solid black;
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
}
.tab-link {
    width: 50%;
    height: 70px;
    background-color: red;
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
    width: 80%;
    height: 130px;
    background-color: beige;
    margin: 0 auto;
    border-radius: 20px;
}
#userpage_review_user {
    width: 200px;
    height: 100%;
    padding-left: 20px;
    padding-top: 10px;
    float: left;
}
#userpage_review_list div h1 {
    font-size: 20px;
}
#userpage_review_list div p {
    font-size: 12px;
    margin: 30px auto;
}
#userpage_product_review_img {
    width: 200px;
    height: 100%;
    background-color: slateblue;
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
    margin-right: 20px;
    line-height: 130px;
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
    background-color: brown;
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