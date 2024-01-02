<template>
  <div class="container">
    <div id="payment_wrapper">
      <div class="payment_form">
      </div>
        <h1>상품 결제</h1>
        <div class="payment_product">
          <!-- 상품 정보 표시 -->
          <div v-for="(product, index) in products" :key="index" class="product-card">
              <div class="product-content">
                <img :src="require(`./${product.imageURL}`)" alt="상품 이미지" class="product-image">
              <div class="payment_product_content">
                <h2>{{ product.name }}</h2>
                <p>{{ product.description }}</p>
                <p>가격: {{ product.price }}</p>
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
          <input type="text"  placeholder="이름">
        </div>
        <div class="payment_phone">
          <label for="phoneNumber">전화번호 *</label>
          <li></li>
          <input type="text"  placeholder="전화번호">
        </div>
        <div class="payment_deliv">
          <p>배송지 *</p>
          <input type="text" id="sample6_postcode" placeholder="우편번호">
          <button @click="openKakaoMap">우편번호 찾기</button><br>
          <input type="text" id="sample6_address" placeholder="주소"><br>
          <input type="text" id="sample6_detailAddress" placeholder="상세주소">
          <input type="text" id="sample6_extraAddress" placeholder="참고항목">
         </div>
         <div class="payment_request">
           <li>배송 시 요청사항</li>
           <textarea placeholder="배송 요청사항을 입력해주세요"></textarea>
         </div>
         <div id="payment_submit">
         <div id="payment_pay_btn">
           <a href="./search_goodslist" style="text-decoration:none;color:black">취소</a>
         </div>
            <input type="submit" value="결제" id="payment_pay_btn" @click="processPayment">
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
        items: [
        // 실제 데이터를 추가하거나, 사용자 입력 시 동적으로 할당
        {
          name: '',
          Num: '', // 전화번호 형식으로 변경
          Address: '',
          AddressHope: '',
          price:''
         },
         {
          name: '상품2',
          Num: '01098765432', // 다른 전화번호 예시
          Address: '주소2',
          AddressHope: '참고항목2',
          price:'20000'
        },
        ],
        products: [
        {
          name: '셔츠',
          description: '옷입니다 옷 많이 사세요',
          price: '25000',
          imageURL: '3.jpg'
        },
      ],

        postcodeResult: null, // 우편번호 검색 결과를 저장할 변수 추가
        loginUser:{},
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
            },
                 //주문상세보기 페이지 연결
        processPayment() {
          this.$router.push({path:'/paymentDetail'})
        },
        
        sendDataToBackend() {
           initDaumPostcode() 
        // 서버로 데이터를 전송하는 로직
        const dataToSend = {
        // 원하는 데이터를 이 부분에 추가
        // 예시로 수령자 이름, 전화번호 등을 추가했으나 실제로 필요한 데이터로 교체해야 함
        recipientName: this.recipientName,
        phoneNumber: this.phoneNumber,
        // 이하 필요한 데이터 추가
        };  

        // Axios를 사용하여 서버로 데이터 전송
        axios.post('localhost:8081/paymentDetail', dataToSend)
        .then(response => {
          // 전송 성공 시 실행할 로직
          console.log('데이터 전송 성공');
         })
        .catch(error => {
          // 전송 실패 시 실행할 로직
          console.error('데이터 전송 실패', error);
         });
         },
        openKakaoMap() {
     
        new daum.Postcode({
        oncomplete: (data) => {
        

          this.postcodeResult = data;
          this.handlePostcodeResult(data);
         }
         }).open();
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


</style>