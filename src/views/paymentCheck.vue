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
          <p> <p1>주소</p1> {{ loginUser.user_adr1 }}</p>
        </div>
      </div>
      <div class="info_section">
        <div class="section_title">상품 정보</div>
        <div class="payment_list">
          <p><p1>상품명</p1> {{ products.goods_nm }}</p>
          <p><p1>상품설명</p1> {{ products.goods_content }}</p>
          <p><p1>상품금액</p1> {{ goods_succ_bid }}</p>
          <p><p1>배송비</p1> +{{products.goods_deliv_price}}</p>
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
    loginUser:{},
    products: [],
    goods_succ_bid: '',
    order_content:'',
    totalPrice:'',
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
    if(this.products.goods_trade==0){
      this.totalPrice = this.goods_succ_bid + this.products.goods_deliv_price
    }
    else {
      this.totalPrice = this.goods_succ_bid
    }

  },
  /*결제상세정보확인*/
  async gotoPayAPI() {
    try{
    const response = await Bootpay.requestPayment({
      price:`${this.totalPrice}`,
      application_id: "65996d8600c78a0023346015",
      order_name: `${this.loginUser.user_nick}`,
      order_id: `${this.loginUser.user_id}`,
      pg: "nicepay",
    })
    console.log(response)
    switch(response.event) {
      case 'done':
        console.log(response)
        this.$swal({
          title:'결제가 완료되었습니다.',
          confirmButtonText:'확인',
          // 데이터베이스 orderpayment에 보내기
        }).then((response)=>{
          if(response.event=='done') {
            try{
              axios({
                url:"http://localhost:3000/goods/addOrder",
                method: "POST",
                data: {

                }
              })
            } catch(e) {
              console.log(e);
            }
            this.$router.push()



          }
        }).then(()=>{
          /*결제완료 버튼을 누르면 뒤로가기 불가:replace*/ 
          this.$router.replace(`/paymentdetail/${this.products.goods_no}`);
        })
        break
    }
  } catch(e) {
      console.log(e.message)
      switch (e.event) {
        case 'cancel':
            // 사용자가 결제창을 닫을때 호출
            console.log(e.message);
            this.$swal({
              title:'결제가 취소었습니다.',
              confirmButtonText:'확인',
            })
            break
        case 'error':
            // 결제 승인 중 오류 발생시 호출
            console.log(e);
            this.$swal({
              title:'오류가 발생하였습니다.',
            })
            break
          }
        }
      },
  async getUser() {
    try {
        const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
        this.loginUser = response.data[0];
        console.log(this.loginUser);
    } catch (error) {
        console.error(error);
    }
  },
  async getGoods() {
    try {
      const goodsno = this.$route.params.goods_no;
      const response = await axios.get(`http://localhost:3000/goods/goodsInfo/${goodsno}`);
      this.products = response.data[0];
      } catch (error) {
        console.error(error);
      }
  },
  async getBid() {
    try{
      const response_bid = await axios.get(`http://localhost:3000/goods/goodsSuccBid/${this.$route.params.goods_no}`)
      this.goods_succ_bid = response_bid.data[0].succ_bid
    } catch (error) {
      console.error(error)
    }
    this.getTotalPrice()
  },
  gotoBack() {
    this.$router.back();
  }
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