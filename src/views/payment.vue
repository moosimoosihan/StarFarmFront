<template>
  <div class="container">
    <div id="payment_wrapper">
      <h1 class="h1">상품 결제</h1>
      <div class="payment_product">
        <!-- 상품 정보 표시 -->
        <div class="product-card">
       <div class="product-content">
        <div class="product-ima">
    <img class="product-image"
      :src="products.goods_img ? require(`../../../StarFarmBack/uploads/uploadGoods/${products.goods_no}/${products.goods_img.split(',')[0]}`) : require(`../assets/2-1.png`)"
      alt="상품 이미지" /></div>
  <div class="payment_product_content">
    <h2>상품명 : {{ products.goods_nm }}</h2>
    <p class="content">상품설명: {{ products.goods_content}}</p>
    <p class="price">가격: {{ products.goods_succ_price }}</p>
  </div>
            <!--판매자 닉네임 및 사진-->
          <div class="profile_box">
              <img  class="img" :width="70" style="border-radius: 10px;"
                  :src="orderUser.user_img ? require(`../../../StarFarmBack/uploads/userImg/${orderUser.user_no}/${orderUser.user_img}`) : require(`../assets/profile.png`)"
                  alt="프로필 사진 미리보기" />
              <span class="user_nick">{{ orderUser.user_nick }}</span>
          </div>
          </div>
        </div>
      </div>
      <!--수령자이름,전화번호-->
      <div class="payment_name">
        <label for="phoneNumber"> 수령자이름 *</label>  
        <li></li>
        <input type="text" v-model="loginUser.user_nick">
      </div>
      <div class="payment_phone">
        <label for="phoneNumber">전화번호 *</label>
        <li></li>
        <input type="text" v-model="loginUser.user_mobile" @input="validateNumber()" maxlength="11">
      </div>
      <div class="payment_deliv">
        <p>배송지 *</p>
        <input type="text" id="sample6_postcode" v-model="loginUser.user_zipcode">
        <button class="zipcode" @click="zipload()">우편번호 찾기</button><br>
        <input type="text" id="sample6_address" v-model="loginUser.user_adr1"><br>
        <input type="text" id="sample6_detailAddress" v-model="loginUser.user_adr2">
      </div>
      <div class="payment_request">
        <li class="textarea">배송 시 요청사항 *</li>
        <textarea v-model="order_content" placeholder="배송 요청사항을 입력해주세요"></textarea>
      </div>
      <div id="payment_submit">
        <div id="payment_pay_btn">
           <a @click="sendDataToBackend()" style="text-decoration:none;">결제</a>
        </div>
        <div id="payment_pay_btn">
          <a @click="gotoProduct()" style="text-decoration:none;">취소</a>
        </div>
          <div v-if="showSendDataButton">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
        data() {
        return {
            showSendDataButton: false, // 조건에 따라 버튼을 표시할지 여부를 결정하는 변수
            postcodeResult: null, // 우편번호 검색 결과를 저장할 변수 추가
            loginUser:{},
            orderUser:{},
            products: {},
            order_content:'',
            //최종가격
            totalPrice:'',
          };
        },
        mounted() {
          const script = document.createElement("script");
          script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
          script.onload = this.initDaumPostcode;
          document.head.appendChild(script);
        },
        created() {
            this.getUser()
            this.getProduct()
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        },
        methods: {
          //판매자 정보 가져오기
          async getUser() {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
                    this.loginUser = response.data[0];
                } catch (error) {
                    console.error(error);
                }
                this.order_zipcode = this.loginUser.user_zipcode;
                this.order_adr1 = this.loginUser.user_adr1;
                this.order_adr2 = this.loginUser.user_adr2;
            },//구매자 정보 가져오기
            async getOrderUser() {
              try {
                const order_user_no = this.products.user_no;
                const response = await axios.get(`http://localhost:3000/mypage/mypage/${order_user_no}`);
                this.orderUser = response.data[0];
              } catch (error) {
                console.error(error);
              }
            },
            // 상품 정보 가져오기
            async getProduct(){
              try {
                const goodsno = this.$route.params.id;
                const response = await axios.get(`http://localhost:3000/goods/goodsInfo/${goodsno}`);
                this.products = response.data[0];
              } catch (error) {
                console.error(error);
              }
              this.getOrderUser()
            },
            //paymentCheck로 데이터 전송
        sendDataToBackend() {
          if(this.order_content==''){
            this.order_content='없음'
          }
          this.$swal({
            title:'결제확인',
            text:'결제를 진행하시겠습니까?',
            confirmButtonText:'확인',
            cancelButtonText:'취소',
            showCancelButton: true,
          }).then((result)=>{
              if(result.isConfirmed){
                this.$router.push(`/paymentCheck/${this.loginUser.user_id}/${this.loginUser.user_mobile}/${this.loginUser.user_email}/${this.products.goods_no}/${this.order_content}/${this.loginUser.user_zipcode}/${this.loginUser.user_adr1}/${this.loginUser.user_adr2}`)
              }
            })
          },
          validateNumber() {
              this.loginUser.user_mobile = this.loginUser.user_mobile.replace(/\D/g, ''); // 숫자 이외의 문자 제거
          },
         zipload() {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var addr = ''; // 주소 변수
                    var extraAddr = '';
                    //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        addr = data.roadAddress;
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                    }
                    // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                    if (data.userSelectedType === 'R') {
                        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            // addr += ' ';
                            extraAddr += data.bname;
                        }
                        // 건물명이 있고, 공동주택일 경우 추가한다.
                        if (data.buildingName !== '' && data.apartment === 'Y') {
                            // addr += ' ';
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                    }
                    this.loginUser.user_zipcode = data.zonecode;
                    this.loginUser.user_adr1 = addr;
                    this.loginUser.user_adr2 = extraAddr;
                }
            }).open();
         },gotoProduct(){
          this.$router.back();
         },
      }
    }
</script>

<style scoped>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    margin: 0 auto;
}
.container {
  width: 80%;
  height: 1500px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 10px;

}
/* ------------------------------------------------------------- */
@media screen and(max-width: 1400px){

}

.payment_name label,
.payment_phone label {
  display: inline-block;
  margin-bottom: 15px;
  font-size: 27px;
  font-weight: 700;
}
.h1{
  margin-bottom:30px;
  text-align: center;
}

#payment_wrapper {
    width: 60%;
    height: 100%;
    margin:  auto;
    padding-top: 2px;
    margin-bottom: 100px;
    padding : 31px;
 	  text-align: left;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
    
}
.payment_product {
  width: 100%;
  height: 150px;
  background-color: rgb(255, 255, 255);
  border-style: solid;
  border-width: 2px;
  border-radius: 5px;
  border-color: rgb(219, 219, 219);
  margin-top: 5px;
  margin-bottom:35px;
  margin-right: 15px;
  overflow: hidden;
  box-shadow: 1px 1px 1px gray; 
  
}
.payment_product_content {
    width: 100%;
    height: 150px;
    font-size:  16px;
    background-color:white;
    flex: 1;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 18px;
}
.payment_phone {
    height: 110px;
    font-size: 23px;
    font-weight: 700;    
}
.payment_name {
  height: 110px;
  font-size: 23px;
  font-weight: 700;
}
.payment_name input{
  width: 500px;
   height: 30px;
  font-size:  17px;
  border-radius: 7px;
  padding-left: 10px;
  border: 1px solid black;
}
.payment_phone input {
    width: 500px;
    height: 25px;
    background: none;
    border: 0;
    border-bottom: 1px solid black;
    margin-top: 10px;
    font-size: 17px;
}
.payment_deliv {
    height: 100px;
    font-size: 19px;
    font-weight: 700;
    margin-top: 10px;
    margin-bottom: 60px;
}
.payment_deliv input{
  font-size: 18px;
  height: 34px;
  width: 500px;
  margin-bottom: 10px;
  border-radius: 7px;
  padding-left: 10px;
  border: 1px solid black;
}
.payment_address_btn {
    width: 80px;
    height: 30px;
    font-size: 25px;
}
.zipcode{
   display: flex;
    align-items: center;
    justify-content: center;
    background-color: #33cc00;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    float: right;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 강조된 그림자 */
    margin-right:2px;
}
.payment_request {
    margin-top: 40px;
    margin-bottom: 10px;
    font-size: 22px;
    font-weight: 700;
}
.payment_request textarea {
    width: 100%;
    height: 150px;
    resize: none;
    font-size: 18px;
    padding-top: 10px;
    padding-left: 2%;
}
#payment_pay_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #33cc00;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    float: right;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 강조된 그림자 */
    margin-right:2px;
}
.product-description {
  color: #555;
}
.product-price {
  font-weight: bold;
  margin-top: 10px;
}
.product-ima {
  max-width: 100%; /* 이미지의 최대 너비 설정 */
  max-height: 100%; 
}
.product-image {
  width: 150px; /* 이미지의 가로 너비 100%로 설정 */
  height: 150px;
}
li {
    list-style-type: none;  
}
.product-content {
  display: flex; 
  align-items: center;
  width: 100%;
  height: 150px;
}
.profile_box {
  display: flex;
    width: 150px;
    height: 150px;
    float:right;
    align-items:center;
    background-color:white;
    text-align: center;
}
.user_nick{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.paymentCheck {
  margin-top: 20px;
  margin-left: 10%;
  padding: 10px 20px;
  border-radius: 4px;
  background-color:blue;
}
.img{
  max-width: 100%;
  max-height: 100%;
}
.content{
margin-top: 10px;
}
.price{
margin-top: 10px;
}
.textarea{
margin-bottom:10px;
}
.input{
  width:200px;
  height: 50px;
  font-size:100px;
}
</style>