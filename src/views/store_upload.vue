<template>
            <div class="container">
            <div id="store_upload_wrapper">
            <form>
            <div id="store_product_img">
             <p>상품 이미지(0/5)</p>
            <div class="product-image-container">
            <div class="image-box"><img src=""><button class="store_img_del" />x</div>
            <div class="image-box"><img src=""><button class="store_img_del" />x</div>
            <div class="image-box"><img src=""><button class="store_img_del" />x</div>
            <div class="image-box"><img src=""><button class="store_img_del" />x</div>
            </div>
            </div>
            <div id="store_product_name">
              <p>상품명</p>
              <input type="text" placeholder="상품명을 입력해주세요." style="width: 100%;">
           </div>
           <div id="store_product_category1">
             <p>카테고리1</p>
             <select style="width: 100%;">
             <option>의류</option>
             <option>뷰티</option>
             <option>생활/가전</option>
             <option>취미</option>
             <option>기타</option>
             </select>
           </div>
           <div id="store_product_category2">
               <p>카테고리2</p>
               <select style="width: 100%;">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            </select>
           </div>
           <div id="store_price_trade">
           <div>
            시작가
            <input type="text" placeholder="경매 시작가를 입력해주세요." style="width: 100%;">
          </div>
          <div>
            거래유형
            <select style="width: 100%;">
              <option>택배거래</option>
              <option>직거래</option>
            </select>
           </div>
           </div>
           <div id="store_timer_deliv">
           <div>
            마감 시간
            <select style="width: 100%;">
              <option>1일</option>
              <option>2일</option>
              <option>3일</option>
              <option>4일</option>
            </select>
            </div>
            <div>
            택배 비용
            <input type="text" placeholder="택배 비용" style="width: 100%;">
            </div>
            </div>
            <div id="store_product_content">
            <p>설명</p>
            <textarea style="width: 100%; height: 400px;" placeholder="상품 설명을 입력해주세요. (최소 10글자)"></textarea>
           </div>
           <div id="store_submit">
            <input type="button" value="취소" class="cancel-btn">
            <input type="submit" value="상품 등록" class="submit-btn">
           </div>
            </form>
           </div>
           </div>
</template>




<style scoped>
   .container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #store_upload_wrapper {
    width: 80%;
    padding: 20px;
    border: 1px solid #ccc;
  }

  #store_product_img {
    display: flex;
  flex-wrap: wrap;
  }

  .product-image-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .image-box {
  width: 100px; /* 이미지 박스의 가로 크기 조절 */
  margin-right: 10px; /* 이미지 박스 간격 조절 */
  margin-bottom: 20px;
}

.image-box img {
  width: 100%; /* 이미지가 이미지 박스 안에 꽉 차도록 설정 */
}

.store_img_del {
  display: block;
  margin-top: 300px;
}

  #store_submit {
  margin-top: 25px; /* 버튼 간의 간격 조절 */
  float: right;
 }

.cancel-btn {
  margin-right:20px; /* "취소" 버튼 오른쪽 마진 조절 */
  float: right;
  margin-left:15px
}


</style>