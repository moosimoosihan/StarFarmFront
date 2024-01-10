<template>
  <div class="container">
    <div class="payment_check">
      <div class="check1">
        <h1>결제정보 확인</h1>
      </div>
      <div class="info_section">
        <div class="section_title">사용자 정보</div>
        <div class="payment_list">
          <p><p1>이름</p1> {{ loginUser.user_id }}</p>
          <p><p1>전화번호</p1> {{ loginUser.user_mobile }}</p>
          <p><p1>이메일</p1> {{ loginUser.user_email }}</p>
          <p> <p1>주소</p1> {{ loginUser.user_zipcode }} {{ loginUser.user_adr1 }} {{ loginUser.user_adr2 }}</p> 
        </div>
      </div>
      <div class="info_section">
        <div class="section_title">상품 정보</div>
        <div class="payment_list">
          <p><p1>상품명</p1> {{ goods.goods_nm }}</p>
          <p><p1>상품설명</p1> {{ goods.goods_content }}</p>
          <p><p1>상품금액</p1> {{ goods_succ_bid }}</p>
          <p><p1>배송비</p1> {{goods.goods_deliv_price}}</p>
        </div>
        <div class="payment_list1">      
          <p><p1>총 금액</p1> {{ totalPrice }}원</p>
        </div>
      </div>
      <div class="payment_check2">
        <button class="left-button" @click="gotoBack()">취소</button>
        <button class="right-button" @click="gotoPayAPI">결제</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { Bootpay } from '@bootpay/client-js'


export default {
data() {
  return {
    loginUser:{
      user_id:'',
      user_mobile:'',
      user_email:'',
      user_zipcode:'',
      user_adr1:'',
      user_adr2:'',
    },
    goods: {
      goods_nm:'',
      goods_content:'',
      goods_trade:'',
      goods_deliv_price:0,
    },
    goods_succ_bid: 0,
    order_content:'',
    adr:'',
    totalPrice:0,
  };
},
computed: {
  user() {
      return this.$store.state.user;
  }
},
created() {
  this.getUser()
  this.getGoods()
  this.getBid()
},
mounted() {
  // this.gotoPayAPI()
},
methods: {
    /*총 금액*/
    getTotalPrice(){
    if(this.goods.goods_trade==0){
      this.totalPrice = Number(this.goods_succ_bid) + Number(this.goods.goods_deliv_price)
    }
    else {
      this.totalPrice = this.goods_succ_bid
    }
  },
  /*결제상세정보확인*/
  async gotoPayAPI() {
    try{
              axios({
                url:"http://localhost:3000/goods/orderPayment",
                method: "POST",
                data: {
                  order_receive_nm: this.loginUser.user_id,
                  order_mobile: this.loginUser.user_mobile,
                  order_addr1: this.loginUser.user_adr1,
                  order_addr2: this.loginUser.user_adr2,
                  order_zipcode: this.loginUser.user_zipcode,
                  order_content: this.order_content,
                  user_no: this.user.user_no,
                }
              })
                .then((response)=>{
                  if(response.data.message=='완료'){
                    this.$swal({
                      title:'결제가 완료되었습니다.',
                      confirmButtonText:'확인',
                    })
                    .then(()=>{
                      this.$router.replace(`/paymentdetail/${this.products.goods_no}/${response.data.order_no}/${this.totalPrice}`);
                    })
                  }
                  else {
                    this.$swal({
                      title:'결제가 실패하였습니다.',
                      confirmButtonText:'확인',
                    })
                  }
                })
                
            } catch(e) {
              console.log(e);
            }
            return
      },
  getUser() {
    this.loginUser.user_id = this.$route.params.user_id
    this.loginUser.user_mobile = this.$route.params.user_mobile
    this.loginUser.user_email = this.$route.params.user_email
    this.loginUser.user_zipcode = this.$route.params.user_zipcode
    this.loginUser.user_adr1 = this.$route.params.user_adr1
    this.loginUser.user_adr2 = this.$route.params.user_adr2
    this.order_content = this.$route.params.order_content
  },
  getGoods() {
    this.goods.goods_nm = this.$route.params.goods_nm
    this.goods.goods_content = this.$route.params.goods_content
    this.goods.goods_trade = this.$route.params.goods_trade
    this.goods.goods_deliv_price = this.$route.params.goods_deliv_price
  },
  getBid() {
    this.goods_succ_bid = this.$route.params.goods_succ_bid
    this.getTotalPrice()
  },
  gotoBack() {
    this.$router.back();
  },
}
}


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
/*----------------------------------------------*/
.payment_check {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
.check1 {
  text-align: center;
  margin-bottom: 15px;
}
.payment_list{
  width: 600px; /* 상자의 폭 */
  height: 130px; /* 상자의 높이 */
  background-color: #f0f0f0; /* 상자의 배경색 */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  margin: 0 auto; /* 수평 가운데 정렬을 위한 margin 설정 */
  border: 2px solid black;
}
.payment_list1{
  width: 600px; /* 상자의 폭 */
  height: 40px; /* 상자의 높이 */
  background-color: #f0f0f0; /* 상자의 배경색 */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  margin: 0 auto; /* 수평 가운데 정렬을 위한 margin 설정 */
  border: 2px solid black;

}

.payment_check2{
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;

}
p{
  font-size:22px;
}
p1{
  font-weight: bold;
  display: inline-block; width: 200px;
}
h1{
  text-align: center;
}

.section_title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
}
.left-button {
  background-color: #33cc00;;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  float: right;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 강조된 그림자 */
}
.right-button {
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
.line{
  width:100%;
  height:4px;
  background-color:gray;
}
</style>