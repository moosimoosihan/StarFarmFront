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
          <p><p1>상품금액</p1> {{ goods.goods_succ_price }}</p>
          <p><p1>배송비</p1> {{goods.goods_deliv_price}}</p>
        </div>
        <div class="payment_list1">      
          <p><p1>총 금액</p1> {{ getTotalPrice() }}원</p>
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
//부트페이 코드 데이터 가져올때 필요함
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
    goods: {},
    order_content:'',
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
},
mounted() {
  // this.gotoPayAPI()
},
methods: {
    /*총 금액*/
    getTotalPrice(){
    if(this.goods.goods_trade==0){
      return Number(this.goods.goods_succ_price) + Number(this.goods.goods_deliv_price)
    }
    else {
      return Number(this.goods.goods_succ_price)
    }
  },
  /*결제상세정보확인*/
  async gotoPayAPI() {
    try{
      const response = await Bootpay.requestPayment({
        price:`${this.getTotalPrice()}`,
        application_id: "65996d8600c78a0023346015",
        order_name: `${this.loginUser.user_nick}`,
        order_id: `${this.loginUser.user_id}`,
        pg: "nicepay",
      })
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
                  url:"http://localhost:3000/goods/orderPayment",
                  method: "POST",
                  data: {
                    order_receive_nm: this.loginUser.user_id,
                    order_mobile: this.loginUser.user_mobile,
                    order_addr1: this.loginUser.user_adr1,
                    order_addr2: this.loginUser.user_adr2,
                    order_zipcode: this.loginUser.user_zipcode,
                    order_content: this.order_content,
                    goods_no: this.goods.goods_no,
                    user_no: this.user.user_no,
                  }
                })
              } catch(e) {
                console.log(e);
              }
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
      },//사용자 정보 가져오기
      getUser() {
        this.loginUser.user_id = this.$route.params.user_id
        this.loginUser.user_mobile = this.$route.params.user_mobile
        this.loginUser.user_email = this.$route.params.user_email
        this.loginUser.user_zipcode = this.$route.params.user_zipcode
        this.loginUser.user_adr1 = this.$route.params.user_adr1
        this.loginUser.user_adr2 = this.$route.params.user_adr2
        this.order_content = this.$route.params.order_content
      },//판매자 정보가져오기
      async getGoods() {
        try {
          const goodsno = this.$route.params.goods_no;
          axios({
            url:`http://localhost:3000/goods/goodsInfo/${goodsno}`,
            method:'get',
          })
            .then((response) => {
              this.goods = response.data[0];
            })
        } catch (error) {
          console.error(error);
        }
      },//뒤로가기
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
  margin: 0 auto;
}
.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow-y: scroll;
    margin-top: 30px;
}
.container::-webkit-scrollbar {
  display: none;
}
/*----------------------------------------------*/
.payment_check {
  background-color: #f9f9f9;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 45px;
}
.check1 {
  text-align: center;
  margin-bottom: 5px;
}
.payment_list{
  width: 750px; /* 상자의 폭 */
  height: 147px; /* 상자의 높이 */
  background-color: #f0f0f0; /* 상자의 배경색 */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  margin: 0 auto; /* 수평 가운데 정렬을 위한 margin 설정 */
  border: 2px solid black;
  padding-left: 1%;
}
.payment_list1{
  width: 750px; /* 상자의 폭 */
  height: 45px; /* 상자의 높이 */
  background-color: #f0f0f0; /* 상자의 배경색 */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  margin: 0 auto; /* 수평 가운데 정렬을 위한 margin 설정 */
  border: 2px solid black;
  padding-left: 1%;

}

.payment_check2{
  width: 750px; 
  height: 55px;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;

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
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 7px;
  padding-left: 1%;
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