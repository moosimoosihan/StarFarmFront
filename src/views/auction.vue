<template>
  <div class="container">
  <!--판매자 페이지-->
  <div class="product-details3">
    <div class="product-details">
      <div class="mypage_topbar_container">
        <div class="profile_lapper">
          <!-- 프로필 사진, 닉네임 -->
          <div class="profile_box">
            <div class="profile_img_box">
              <img :width="70" style="border-radius: 10px;"
                      :src="goodsUser.user_img ? require(`../../../StarFarmBack/uploads/userImg/${goodsUser.user_no}/${goodsUser.user_img}`) : require(`../assets/profile.png`)"
                      alt="프로필 사진 미리보기" @click="gotoUserpage(goodsUser.user_no)" />
            </div>
            <span class="profile_nick">{{ goodsUser.user_nick }}</span>
          </div>
        </div>

        <div class="friendly_lapper">
          <!-- 친밀도 -->
          <div class="friendly_box">
            <span class="friendly_text">친밀도</span>
            <div class="friendly_img_box">
              <progress :value="goodsUser.user_fr" max="100"></progress>
              <span>{{ goodsUser.user_fr }}점</span>
              <p>{{ goodsUser.user_adr1 }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--경매시작가+타임-->
  <div class="product-details4">
    <div class="product-details1">
      <h2>상품명: {{ goods.goods_nm }}</h2>
      <p>시작가: {{ formatPrice(goods.goods_start_price) }}</p>
      <p v-if="goodsSuccBid!=null">최고 입찰가: {{ formatPrice(goodsSuccBid) }}</p>
      <p v-else>최고 입찰가: 입찰 없음</p>
      <p>택배 유형: {{ goods_trade_(goods.goods_trade) }}</p>
      <p v-if="goods.goods_trade===0">택배비: {{ goods.goods_deliv_price }}</p>
      <p>남은시간: {{ currentTime }}</p>
    </div>
  </div>
  <!--이미지표출 슬라이더-->
  <div class="product-details5">
    <div class="slider-container">
      <div class="slider">
        <div class="slide-wrapper">
          <div class="slide" v-for="(img, i) in good_img" :key="i">
            <img :src="require(`../../../StarFarmBack/uploads/uploadGoods/${goods.goods_no}/${img}`)" alt="Slide" width="500" height="400">
          </div>
        </div>
      </div>
      <div class="dot-navigation">
        <span class="dot" v-for="(img,i) in good_img" :key="i" @click="moveToSlide(i)"></span>
      </div>
    </div>
  </div>
  <!--경매시작을 보여주는 화면-->
  <div class="product-details6">
    <div class="product-details1">
        <h1>경매 시작</h1>
        <p class="description">
        </p>
        <div class="bid_container">
            <ul>
              <li v-for="(nick, i) in goodsBidList" class="price" :key="i">{{ goodsBidList[i].user_nick }}님이 {{ formatPrice(goodsBidList[i].bid_amount) }} 입찰하셨습니다.</li>
            </ul>

        </div>
          <div v-if="user.user_no!==''">
            <!-- 관심 상품 버튼 -->
          <div v-if="likeGoods===0" class="heart_icon" @click="like_goods()">
            <i  class="far fa-regular fa-heart"></i>
          </div>
          <div v-else class="heart_icon" @click="likeDelete()">
            <i class="fas fa-regular fa-heart"></i>
          </div>
          <div v-if="user.user_no != goodsUser.user_no">
            <!--1:1 채팅버튼-->
            <button class="chatroom_container" @click="gotoChatRoom(goodsUser.user_no), createChatRoom()">1:1 채팅</button>
            <!--결제페이지 이동버튼-->
            <button v-if="buyUser" class="button" @click="gotoPayment()">결제</button>
            <!--금액창-->
            <input v-if="goods.goods_state===0 && this.currentTime !== '경매가 종료되었습니다.'" type="text" id="searchInput" autocomplete="off" size="50" name="bid_value" v-model="bidAmount" @input="validateNumber()">
            <!--입찰버튼-->
            <input v-if="goods.goods_state===0 && this.currentTime !== '경매가 종료되었습니다.'" type="button" id="submit_button" value="입찰" @click="postBidding">
            <!-- 신고버튼 -->
            <button class="button" @click="reportBtn()">신고</button>
          </div>
        </div>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios';

export default {
data() {
  return {
    currentIndex: 0,
    bidAmount: '', // 사용자가 입력한 입찰 값
    displayBidAmount: '', // 화면에 표시될 입찰 값
    startPrice: '',
    goods: {},
    goodsUser: {},
    goodsSuccBid: 0,
    goodsBidList: {},

    good_img : [],

    likeGoods: 0,

    currentTime: Date.now(),
    endTime: Date.now(),
    chatRoomNo: '',
    buyUser: false,
  };
},
computed: {
      user() {
          return this.$store.state.user;
      }
},
created() {
  this.getGoods();
  this.getGoodsUser();
  this.getSuccBid();
  this.getBidList();
  this.checkLikeGoods();
  this.updateTimer();
  // this.getChatRoomNo();
},
beforeUpdate() {
  if(this.currentTime !== '경매가 종료되었습니다.'){
    this.getBidList()
    this.getSuccBid()
  } else {
    this.checkBuyUser();
  }
},
methods: {
  goods_trade_(goods_trade){
    if (goods_trade===0){
        return '택배거래'
    } else if(goods_trade===1){
        return '직거래'
    }
  },
  formatPrice(price) {
      if (price !== undefined && price !== null) {
          const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return `${formattedPrice} 원`;
      }
      return "";
  },
  async like_goods() {
    try {
      const goodsno = this.$route.params.id;
      await axios({
        url: `http://localhost:3000/goods/likeInsert/${this.user.user_no}/${goodsno}`,
        method: "POST",
        data: {
          goods_no: this.goods.goods_no,
          user_no: this.user.user_no,
        }
      })
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  },
  async checkLikeGoods() {
    try {
      const goodsno = this.$route.params.id;
      const response = await axios.post(`http://localhost:3000/goods/likeCheck/${this.user.user_no}/${goodsno}`);
      if(response.data.isLiked){
        this.likeGoods = 1;
      } else {
        this.likeGoods = 0;
      }
    } catch (error) {
      console.error(error);
    }
  },
  async likeDelete() {
    try {
      const goodsno = this.$route.params.id;
      await axios({
        url: `http://localhost:3000/goods/likeDelete/${goodsno}/${this.user.user_no}`,
        method: "POST",
        data: {
          goods_no: this.goods.goods_no,
          user_no: this.user.user_no,
        }
      })
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  },
  moveToSlide(index) {
    const slides = this.$el.querySelectorAll('.slide');
    const slideWidth = slides[0].clientWidth;
    this.$el.querySelector('.slide-wrapper').style.transform = `translateX(-${index * slideWidth}px)`;
    this.currentIndex = index;
  },
  //1:1 채팅룸 생성
  async createChatRoom() {
    try {
      const user_no = this.goodsUser.user_no;

      if (this.user.user_no == this.goodsUser.user_no) {
        return this.$swal('본인과의 채팅은 불가능합니다.');
      } else {
        await axios({
          url: `http://localhost:3000/chat/createChatRoom/${user_no}`,
          method: "POST",
          data: {
            buyer: this.user.user_no,
            seller: this.goodsUser.user_no,
          }
        })
      }
    } catch (error) {
      console.error(error);
    }
  },
  //1:1 채팅룸 방번호 가져오기
  // async getChatRoomNo() {
  //   const seller_no = this.goodsUser.user_no;
  //   const buyer_no = this.user.user_no;
  //   console.log(this.goodsUser);
  //
  //   const response = await axios.get(`http://localhost:3000/chat/checkChatRoom/${seller_no}/${buyer_no}`);
  // },
  /*1:1 채팅룸 열기*/
  async gotoChatRoom(index) {
    let popupWindow = window.open(`/chatroom/${index}`, '_blank', 'width=800', 'height=620', 'left=100', 'top=50', 'scrollbars=no', 'resizable=no', 'toolbars=no', 'menubar=no');
    popupWindow.resizeTo(800, 620);
    popupWindow.onresize = () => {
      popupWindow.resizeTo(800, 620);
    };
  },
  /* 팝업창 열고 닫기*/
  handleBid() {
    const bidValue = document.getElementById('searchInput').value.trim();

    if (bidValue === '') {
      alert('입찰 숫자를 입력하세요.');
      window.close(); // 입력값이 비어있을 때 바로 창을 닫음
    } else {
      this.bidAmount = bidValue; // 사용자가 입력한 값 업데이트
      this.displayBidAmount = this.bidAmount; // 화면에 표시할 값 업데이트
    }
  },
  async getGoods() {
    try {
      const goodsno = this.$route.params.id;
      const response = await axios.get(`http://localhost:3000/goods/goodsInfo/${goodsno}`);
      this.goods = response.data[0];
      this.good_img = this.goods.goods_img.split(',');
      this.endTime = this.goods.goods_timer;
      } catch (error) {
        console.error(error);
      }
  },
  async getGoodsUser() {
    try {
      const goodsno = this.$route.params.id;
      const response = await axios.get(`http://localhost:3000/goods/goodsInfoUser/${goodsno}`);
      this.goodsUser = response.data[0];
    } catch (error) {
      console.error(error);
    }
  },
  async getSuccBid() {
    try {
      const goodsno = this.$route.params.id;
      const response = await axios.get(`http://localhost:3000/goods/goodsSuccBid/${goodsno}`);
      this.goodsSuccBid = response.data[0].succ_bid;
    } catch (error) {
      console.error(error);
    }
  },
  async getBidList() {
    try {
      const goodsno = this.$route.params.id;
      const response = await axios.get(`http://localhost:3000/goods/goodsBidList/${goodsno}`);
      this.goodsBidList = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async postBidding() {
    if(this.goods.goods_start_price>=this.bidAmount){
      this.$swal.fire({
        icon: 'error',
        title: '입찰금액이 시작가보다 낮습니다.',
        text: '다시 입력해주세요.',
      });
      return;
    }
    if(this.goodsSuccBid>=this.bidAmount){
      this.$swal.fire({
        icon: 'error',
        title: '입찰금액이 입찰가 낮습니다.',
        text: '다시 입력해주세요.',
      });
      return;
    }
    try {
      const goodsno = this.$route.params.id;
      await axios({
        url: `http://localhost:3000/goods/goodsBidding/${goodsno}`,
        method: "POST",
        data: {
          bid_amount: this.bidAmount,
          goods_no: this.goods.goods_no,
          user_no: this.user.user_no,
        }
      })
      .then(res => {
        if(res.data.message == 'bidding_fail'){
          this.$swal("경매가 마감되었습니다.")
        }
      })
      this.bidAmount = ''
    } catch (error) {
      console.error(error);
    }
    this.getSuccBid();
    // window.location.reload();
  },
  validateNumber() {
      this.bidAmount = this.bidAmount.replace(/\D/g, ''); // 숫자 이외의 문자 제거
  },
  reportBtn() {
    this.$swal.fire({
      title: '신고하기',
      text: '신고하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '신고하기',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        this.$router.push(`/report/${this.goodsUser.user_no}`);
      }
    });
  },
  updateTimer() {
    let timer = setInterval(()=>{
      // 날짜를 초로 바꾸어 저장 후 계산
      let countDownDate = new Date(this.endTime).getTime();
      // 현재 시간을 초로 바꾸어 저장
      this.currentTime = new Date().getTime();
      const distance = countDownDate - this.currentTime;
      // 만약 종료시간이 지났다면 타이머를 종료하고 경매가 종료되었다는 메시지를 표시
      if (distance < 0) {
        clearInterval(timer);
        this.currentTime = '경매가 종료되었습니다.';
        return;
      }
      // 남은 시간 계산
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // 표시할 남은 시간 문자열 생성
      this.currentTime = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
    }, 1000);
  },
  async checkBuyUser() {
    // 경매가 종료되었는지 확인, 로그인 되어있는지, 상품 상태가 경매중인지
    if(this.currentTime === '경매가 종료되었습니다.' && this.user.user_no !== '' && this.buyUser == false && this.goods.goods_state===1){
      // 로그인 한 유저가 최고가 입찰자인지 확인
      const response = await axios.get(`http://localhost:3000/goods/goodsSuccBid/${this.goods.goods_no}`)

      const buyU = response.data[0].user_no
      const logU = this.user.user_no
      if(buyU === logU){
        this.buyUser = true;
      }
    }
  },
  async gotoPayment() {
    this.$router.push(`/payment/${this.goods.goods_no}`);
  },
  gotoUserpage(user_no) {
    this.$router.push(`/userpage/${user_no}`);
  }
}
}


</script>

<style scoped>
* {
  margin-top: 20px;
  padding: 0;
  box-sizing: border-box;
}
.container {
  width: 1300px;
  height: 100%;
  overflow: hidden; /* 스크롤 제거 */
  display: flex;
  flex-wrap: wrap;
  margin: auto;
}
/*------------*/
/* 상세페이지 스타일 */
body {
  font-family: Arial, sans-serif;
}
/* <!--상,좌--> */
.product-details3 {
  float: left;
  width: 600px;
  height: 250px;
  border-radius: 30px;
  border: rgba(24, 204, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 10px;
}
/* <!--하,좌--> */
.product-details5 {
  float: left;
  width: 600px;
  height: 600px;
  border-radius: 30px;
  border: rgba(24, 204, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 10px;
  margin-bottom: 10px;
}
/* <!--상,우--> */
.product-details4 {
  float: left;
  width: 600px;
  height: 250px;
  border-radius: 30px;
  border: rgba(24, 204, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 10px;
}
/* <!--하,우--> */
.product-details6 {
  float: left;
  width: 600px;
  height: 600px;
  border-radius: 30px;
  border: 2px rgba(24, 204, 0, 0.1) ;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 10px;
  margin-bottom: 10px;
}

.product-details1 {
  margin-left:20px;
}


.product-details4 > h1, h2, p {
  margin-bottom: 10px;
  margin-top: 20px;
  margin-left: 10px;
}

.description {
  line-height: 1.6;
}
.price {
  font-weight: bold;
}
button {
  padding: 12px 25px;
  background-color: #0e3b00;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: rgb(48, 206, 0);
}
/* 슬라이더 스타일 */
.slider-container {
  width: 100%;
  height: 500px;
  padding: 20px;
  box-sizing: border-box;
}

.slider {
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
}
.slide-wrapper {
  display: flex;
  transition: transform 0.5s ease-in-out;
}
.slide {
  flex: 0 0 100%;
}

.slider-button {
  margin-bottom: 10px;
}
#searchInput {
  width: 200px; /* 너비 조절 */
  height: 40px; /* 높이 조절 */
  /* 다른 스타일링을 추가하고 싶다면 여기에 작성하세요 */
}
#submit_button{
  padding: 13px 25px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

}

.mypage_topbar_container {
  width: 500px;
  height: 200px;
  margin: 0 auto;
  border: none;
}
.profile_lapper {
margin-left: 20px;
margin-top: 15px;
float: left;
}

.profile_box {
width: 90px;
height: 100px;
text-align: center;
flex-direction: column;
justify-content: space-around;
float: left;
}

.profile_img_box {
width: 70px;
height: 90px;
overflow: hidden;
margin: 0 auto;
}
.friendly_box {
width: 300px;
height: 50px;
float: left;
flex-direction: column;
margin-top: 20px;
margin-left: 10px;
}


#me {
text-align: end;
}

.bid_container{
overflow-y:scroll;
background-color: #ffffff;
height: 350px;
}

.dot-navigation {
text-align: center;
margin-top: 10px;
}

.dot {
display: inline-block;
width: 10px;
height: 10px;
border-radius: 50%;
background-color: #085f00; /* 도트 색상 */
margin: 0 5px;
cursor: pointer;
}

.slide img {
max-width: 100%; /* 이미지가 부모 요소를 넘어가지 않도록 최대 너비 설정 */
max-height: 100%; /* 이미지가 부모 요소를 넘어가지 않도록 최대 높이 설정 */
display: block; /* 이미지 간격을 없애기 위해 inline 속성 제거 */
margin: auto; /* 가운데 정렬을 위한 마진 설정 */
}

.chatroom_container {
  margin-top: 20px;
  margin-left: 13px;
  padding: 12px 25px;
  border-radius: 4px;
  background-color: #0e3b00;
}

.heart_icon {
  font-size: 25px;
}

</style>