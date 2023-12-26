<template>
  <div class="container">
    <div id="payment_wrapper">
      <form id="payment_form">
        <h1>주문 상세 보기</h1>

        
        <div class="info-row">
          <p class="info-label">수령자 이름 *</p>
          <p class="info-value">{{ userInfo.name }}</p>
        </div>

        <!-- 전화번호 -->
        <div class="info-row">
          <p class="info-label">전화번호 *</p>
          <p class="info-value">{{ userInfo.phone }}</p>
        </div>

        <!-- 배송지 주소 -->
        <div class="info-row">
          <p class="info-label">배송지 *</p>
          <p class="info-value">{{ userInfo.address }}</p>
        </div>

        <!-- 상세주소, 참고항목 -->
        <div class="info-row">
          <p class="info-label">상세주소 *</p>
          <p class="info-value">{{ userInfo.detailAddress }}</p>
        </div>

        <!-- 배송 요청사항 -->
        <div class="info-row">
          <p class="info-label">배송 요청사항</p>
          <p class="info-value">{{ userInfo.deliveryRequest }}</p>
        </div>

        <!-- 상품 정보 -->
        <div id="payment_product">
          <p>{{ productInfo.name }}</p>
          <p>{{ productInfo.number }}</p>
          <p>{{ productInfo.address }}</p>
          <p>{{ productInfo.addressHope }}</p>
          <!-- 상품 상세 정보 표시 -->
        </div>

        <div id="payment_submit">
          <div id="home_button">
            <router-link to="./" style="text-decoration: none; color: white;">
              홈으로
            </router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: '홍길동',
        phone: '010-1234-5678',
        address: '서울시 강남구',
        detailAddress: '123동 456호',
        deliveryRequest: '부재 시 문 앞에 놓아주세요.',
      },
      productInfo: {
        name: '상품1',
        number: '12345',
        address: '상품 배송지',
        addressHope: '참고항목',
      },
    };
  },
};
</script>

<style scoped>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;

}

#payment_wrapper {
  width: 70%;
}

#payment_form h1 {
  margin-bottom: 16%;
}

.info-row {
  display: flex;
  margin-bottom: 80px;
}

.info-label {
  font-size: 18px;
  font-weight: 700;
  margin-right: 10px;
  margin-bottom: 20px;
}

.info-value {
  font-size: 18px;
}
#payment_submit {
  display: flex;
  justify-content: center;
  margin-bottom: 10%;
}

#home_button {
  width: 100px;
  height: 50px;
  background-color: pink;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>