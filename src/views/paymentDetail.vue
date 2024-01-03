<template>
  <div class="container">
    <div id="payment_wrapper">
      <div class="line">
      </div>

        <h1>주문 상세 보기</h1>
        <div class="info-row">
          <p><p1>수령자 이름*</p1> {{ loginUser.user_id }}</p>
          <p><p1>전화번호*</p1>   {{ loginUser.user_mobile }}</p>
          <p><p1> 배송지*</p1>   {{ loginUser.user_zipcode }}</p>
          <p><p1>상세주소*</p1>  {{ loginUser.user_adr1 + ' ' + loginUser.user_adr2 }}</p>
        <!-- 배송 요청사항 -->
          <p class="info-label">배송 요청사항</p>
          <p class="info-value">{{ loginUser.AddressHope }}</p>
        </div>
           <div class="line">
           </div>
          <!-- 상품 정보 -->
          <h1>상품정보</h1>
        <div  class="payment_product">
            <img class="product-image"
                    :src="products.goods_img ? require(`../../../StarFarmBack/uploads/uploadGoods/${products.goods_no}/${products.goods_img.split(',')[0]}`) : require(`../assets/2-1.png`)"
                    alt="상품 이미지" />
          <p>상품명:{{ products.goods_nm }}</p>
          <p>상품설명:{{ products.goods_content }}</p>
          <p>주문금액:{{ products.goods_succ_price }}</p>
          </div>
          <div class="line"></div>
          <!--배송지 및 배송가격-->
             <div class="info-row">
           <p><p1>상품가격*</p1>{{products.goods_succ_price }}</p>
           <p><p1>배송비*</p1>{{ loginUser.goods_deliv_price }}</p>
           <p><p1>상세주소*</p1>{{ loginUser.user_adr1 + ' ' + loginUser.user_adr2 }}</p>
            <p><p1>총 금액*</p1></p>
             </div>
        <div id="payment_submit">
          <button id="home_button" @click="gotoHome()">
            홈으로
          </button>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'paymentdetail',
  data() {
    return {
      loginUser: {},
      products: {}, // 제품 속성을 추가합니다.
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  created() {
    this.getUser();
    this.getProduct(); // 제품 정보를 가져 오기
  },
  methods: {
    async getUser() {
      try {
        const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
        this.loginUser = response.data[0];
        console.log(this.loginUser);
      } catch (error) {
        console.error(error);
      }
    },
    async getProduct() {
       try {
        const goodsno = this.$route.params.id;
        const response = await axios.get(`http://localhost:3000/goods/goodsInfo/${goodsno}`);
        console.log(response.data[0]);
        this.products = response.data[0];
        } catch (error) {
          console.error(error);
        }
    },
    gotoHome() {
      this.$router.push('/');
    }
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
.info-row {
  margin-bottom: 40px;
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
  background-color: greenyellow;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.line{
  width:100%;
  height:2px;
  background-color:gainsboro;
}
.payment_product{
   width: 100%;
    height: 150px;
    /*background-color 추후박스색깔설정*/
    float:center;
    flex:1;
}
.payment_form{
    margin-bottom: 20px;
}
p1{
  font-size: 20px;
   font-weight: bold;
   display: inline-block; width: 200px;
}
p{
  font-size:20px;
}
.product-image {
  width: 150px;
  height: 150px; /* 이미지 파일 경로를 실제 이미지 파일로 변경하세요 */
  background-size: cover;
  background-position: center;
  margin-right: 20px;
  float:left;
}
h1{
   margin-bottom: 10px;
}
</style>