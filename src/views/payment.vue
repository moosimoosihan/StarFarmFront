<template>
  <div class="container">
    <div id="payment_wrapper">
      <div class="payment_form">
      </div>
        <h1>상품 결제</h1>
        <div class="payment_product">
          <!-- 상품 정보 표시 -->
          <div class="product-card">
              <div class="product-content">
                <img class="product-image"
                    :src="products.goods_img ? require(`../../../StarFarmBack/uploads/uploadGoods/${products.goods_no}/${products.goods_img.split(',')[0]}`) : require(`../assets/2-1.png`)"
                    alt="상품 이미지" />
              <div class="payment_product_content">
                <h2>상품명 : {{ products.goods_nm }}</h2>
                <p>상품설명: {{ products.goods_content}}</p>
                <p>가격: {{ goods_succ_bid }}</p>
              </div>
              <!--판매자 닉네임 및 사진-->
              <div class="profile_box">
                <img :width="70" style="border-radius: 10px;"
                            :src="loginUser.user_img ? require(`../../../StarFarmBack/uploads/userImg/${loginUser.user_no}/${loginUser.user_img}`) : require(`../assets/profile.png`)"
                            alt="프로필 사진 미리보기" />
                            <span>{{ loginUser.user_nick }}</span>
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
          <input type="text" v-model="loginUser.user_mobile">
        </div>
        <div class="payment_deliv">
          <p>배송지 *</p>
          <input type="text" id="sample6_postcode" v-model="loginUser.user_zipcode">
          <button @click="zipload()">우편번호 찾기</button><br>
          <input type="text" id="sample6_address" v-model="loginUser.user_adr1"><br>
          <input type="text" id="sample6_detailAddress" v-model="loginUser.user_adr2">
         </div>
         <div class="payment_request">
           <li>배송 시 요청사항</li>
           <textarea v-model="order_content" placeholder="배송 요청사항을 입력해주세요"></textarea>
         </div>
         <div id="payment_submit">
         <div id="payment_pay_btn">
          <a @click="gotoProduct()" style="text-decoration:none;color:black">취소</a>
           <!--<a @click="gotoProduct()" style="text-decoration:none;color:black">취소</a>-->
         </div>
         <div id="payment_pay_btn">
         <a @click="sendDataToBackend()" style="text-decoration:none;color:black">결제</a>
         </div>
         <div v-if="showSendDataButton">
        </div>
        </div>
        <div v-for="(item, index) in reports" :key="index">
         {{ report.name }} 
         {{ report.Num }}
         {{ report.Address }}
         {{ report.AddressHope }}
         {{ report.price}}
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
            products: [],
            goods_succ_bid: '',
            order_content:'',
            order_zipcode:'',
            order_adr1: '',
            order_adr2: '',
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
          async getUser() {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
                    this.loginUser = response.data[0];
                    console.log(this.loginUser);
                } catch (error) {
                    console.error(error);
                }
                this.order_zipcode = this.loginUser.user_zipcode;
                this.order_adr1 = this.loginUser.user_adr1;
                this.order_adr2 = this.loginUser.user_adr2;
            },
            // 상품 정보 가져오기
            async getProduct(){
              try {
                const goodsno = this.$route.params.id;
                const response = await axios.get(`http://localhost:3000/goods/goodsInfo/${goodsno}`);
                console.log(response.data[0]);
                this.products = response.data[0];
                } catch (error) {
                  console.error(error);
                }
                try{
                  const response_bid = await axios.get(`http://localhost:3000/goods/goodsSuccBid/${this.products.goods_no}`)
                  this.goods_succ_bid = response_bid.data[0].succ_bid
                } catch (error) {
                  console.error(error)
                }
            },
        sendDataToBackend() {
         this.$swal({
          title:'결제확인',
          text:'상세정보확인',
          confirmButtonText:'결제확인',
          cancelButtonText:'취소',
          showCancelButton: true,
         }).then((result)=>{
            if(result.isConfirmed){
              this.$router.push(`/paymentCheck/${this.products.goods_no}/${this.loginUser.user_no}/${this.goods_succ_bid}/${this.order_content}/${this.order_zipcode}/${this.order_adr1}/${this.order_adr2}`)
            }
          })
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
                    this.order_zipcode = data.zonecode;
                    this.loginUser.user_adr1 = addr;
                    this.order_adr1 = addr;
                    this.loginUser.user_adr2 = extraAddr;
                    this.order_adr2 = extraAddr;
                }
            }).open();
         },gotoProduct(){
          this.$router.back();
          
         },
         handlePostcodeResult(data) {
    
        this.$nextTick(() => {
        
        document.getElementById('sample6_postcode').value = data.zonecode;
        document.getElementById('sample6_address').value = data.address;
        document.getElementById('sample6_detailAddress').value = ''; // 상세주소 초기화
        document.getElementById('sample6_extraAddress').value = ''; // 참고항목 초기화
      });
      },
      }
      };
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
@media screen and(max-width: 1400px){

}

.payment_name label,
.payment_phone label {
  display: inline-block;
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: 700;
}

#payment_wrapper {
    width: 80%;
    height: 100%;
    margin:  auto;
    padding-top: 2px;
        margin-bottom: 40px;
}
#payment_form h1 {
    margin-bottom: 20px;
}
.payment_product {
  width: 100%;
  height: 170px;
}

.payment_product_content {
    width: 70%;
    height: 150px;
    background-color:rgb(255, 236, 253);
    float:right;
    flex:1;
}
.payment_phone {
    height: 100px;
    font-size: 20px;
    font-weight: 700;
}

.payment_name {
  height: 100px;
  font-size: 20px;
  font-weight: 700;
}
.payment_phone input {
    width: 250px;
    height: 30px;
    background: none;
    border: 0;
    border-bottom: 1px solid black;
    margin-top: 10px;
    font-size: 15px;
}
.payment_deliv {
    height: 100px;
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
.payment_address_btn {
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
.payment_request {
    margin-top: 40px;
    font-size: 20px;
    font-weight: 700;
}
.payment_request textarea {
    width: 100%;
    height: 250px;
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
    background-color: rgb(255, 236, 253);
    margin-left: 30px;
    text-align: center;
    font-size:17px
    
}
.product-description {
  color: #555;
}

.product-price {
  font-weight: bold;
  margin-top: 10px;
}
.product-image {
  width: 150px;
  height: 150px;
  float: left;
  align-items: center;
}

li {
    list-style-type: none;
}
.product-content {
  display: flex;
  align-items: center;
}
.profile_box {
    width: 150px;
    height: 150px;
    float:right;
    align-items:center;
    background-color: rgb(255, 236, 253);
}
.paymentCheck {
  margin-top: 20px;
  margin-left: 10%;
  padding: 10px 20px;
  border-radius: 4px;
  background-color:blue;
}

</style>