<template>
  <!--전체-->
  <div class="container">
        <!--판매자페이지-->
  <div class="product-details3">
      <div class="mypage_topbar_container">
           <!--프로필 사진, 닉네임-->
          <div class="profile_box">
            <div class="profile_img_box">
              <img :height="70" :width="70" style="border-radius: 70px;"
                      :src="goodsUser.user_img ? require(`../../../StarFarmBack/uploads/userImg/${goodsUser.user_no}/${goodsUser.user_img}`) : require(`../assets/profile.png`)"
                      alt="프로필 사진 미리보기" @click="gotoUserpage(goodsUser.user_no)" />
            </div>
            <span class="profile_nick">{{ goodsUser.user_nick }}</span>
          </div>
          <!-- 친밀도 -->
          <div class="friendly_box">
            <span class="friendly_text">친밀도</span>
            <div class="friendly_img_box">
              <progress id="progress" :value="goodsUser.user_fr" max="100" ></progress>
              <span class="friendly_score">{{ goodsUser.user_fr }}점</span>
              <p class="friendly_text1">{{ goodsUser.user_adr1 }}</p>
          </div>
        </div>
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
        <span class="dot" v-for="(img,i) in good_img" :key="i" @click="moveToSlideAuction(i)"></span>
      </div>
    </div>
  </div>
  <!--경매시작을 보여주는 화면-->
  <div class="product-details6">
    <div class="product-details1">
      <div class="timer">
        <h1>{{ goods.goods_nm }}
          <p :class="blinktime? 'blinktime' : 'time'">{{ currentTime }}</p></h1></div>
        <p style="text-align: left; margin-left: 0;">시작가: {{ formatPrice(goods.goods_start_price) }}</p>
        <p style="text-align: left; margin-left: 0;" v-if="goodsSuccBid != null">최고 입찰가: {{ formatPrice(goodsSuccBid) }}</p>
        <p  style="text-align: left; margin-left: 0;" v-else>최고 입찰가: 입찰 없음</p>
        <p class="description">
        </p>
        <div class="bid_container">
            <ul>
              <li v-for="(nick, i) in goodsBidList" class="price" :key="i">{{ goodsBidList[i].user_nick }}님이 {{ formatPrice(goodsBidList[i].bid_amount) }} 입찰하셨습니다.</li>
            </ul>

        </div>
          <div v-if="user.user_no!==''">
            <div class="btn_container" v-if="user.user_no != goodsUser.user_no">
              <!--1:1 채팅버튼-->
              <button class="chatroom_container" @click="gotoChatRoom(goodsUser.user_no), createChatRoom()">1:1 채팅</button>
              <!--결제페이지 이동버튼-->
              <button v-if="buyUser && goods.state===0" class="button" @click="gotoPayment()">결제</button>
              <!--금액창-->
              <input v-if="goods.goods_state===0 && this.currentTime !== '경매가 종료되었습니다.'" type="text" id="searchInput" autocomplete="off" size="50" name="bid_value" v-model="bidAmount" @input="validateNumber()"  @keyup.enter="postBidding()">
              <!--입찰버튼-->
              <input v-if="goods.goods_state===0 && this.currentTime !== '경매가 종료되었습니다.'" type="button" id="submit_button" value="입찰" @click="postBidding">
              <!-- 신고버튼 -->
              <button class="button" @click="reportBtn()">신고</button>
            </div>
            <!-- 관심 상품 버튼 -->
            <div :class="likeGoods===0?'heart':'heart is-active'" @click="likeGoods===0?like_goods():likeDelete()"></div>
        </div>
    </div>
  </div>
  <!--경매시작가-->
  <div class="product-details4">
    <div class="product-details1">
      <p> * 카테고리 :{{ goods.goods_category }} > {{ categoryDetail(goods.goods_category, goods.goods_category_detail) }}</p>
      <p> * 상세정보</p>
      <textarea class="goods_con" readonly v-model="goods.goods_content"></textarea>
      <p> * 택배 유형 : {{ goods_trade_(goods.goods_trade) }}</p>
      <p v-if="goods.goods_trade===0">택배비: {{ formatPrice(goods.goods_deliv_price) }}</p>
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
    userFr: 0,

    likeGoods: 0,

    currentTime: Date.now(),
    endTime: Date.now(),
    chatRoomNo: '',
    buyUser: false,

    timer: null,
    intervalId: null, // 자동 슬라이드를 위한 인터벌 ID
    currentIndex: 0,

    blinktime : false,
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
  this.startAutoSlide(); // 페이지가 생성될 때 자동 슬라이드 시작
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
  startAutoSlide() {
    var nextIndex = 0;
    this.intervalId = setInterval(() => {
      if(this.good_img.length>0){
        nextIndex = (this.currentIndex + 1) % this.good_img.length;
      }
      this.moveToSlideAuction(nextIndex);
    }, 4000); // 4초마다 슬라이드 이동
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
      this.likeGoods = 1;
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
      this.likeGoods = 0;
    } catch (error) {
      console.error(error);
    }
  },
  moveToSlideAuction(index) {
    const slidesAuction = document.querySelectorAll('.slide');
    const slideWidthAuction = slidesAuction[0].clientWidth;
    document.querySelector('.slide-wrapper').style.transform = `translateX(-${index * slideWidthAuction}px)`;
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
  gotoChatRoom(index) {
      let popupWindow = window.open(`/chatroom/${index}`, '_blank', 'left=100', 'top=50', 'scrollbars=no', 'resizable=no', 'toolbars=no', 'menubar=no');
      popupWindow.resizeTo(800, 650)
      popupWindow.onresize = (_=>{
          popupWindow.resizeTo(800, 650)
      })
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
    if(this.goodsSuccBid>0){
      if(this.bidAmount<Math.ceil(this.goods.goods_start_price/100)+this.goodsSuccBid){
        this.$swal.fire({
          icon: 'error',
          title: '입찰금액이 너무 적습니다.',
          text:`입찰금액은 ${this.formatPrice(Math.ceil(this.goods.goods_start_price/100+this.goodsSuccBid))}보다 커야 합니다.`
        })
        return
      }
    }
    this.$swal.fire({
      title: '입찰하기',
      text: '입찰하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '입찰하기',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
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
      }
    });
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
    this.timer = setInterval(()=>{
      // 날짜를 초로 바꾸어 저장 후 계산
      let countDownDate = new Date(this.endTime).getTime();
      // 현재 시간을 초로 바꾸어 저장
      this.currentTime = new Date().getTime();
      const distance = countDownDate - this.currentTime;
    
      // 남은 시간 계산
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // 표시할 남은 시간 문자열 생성 포맷은 무조건 해당 포맷 하나만 '00일 남음' '00시간 남음' '00분 00초 남음' 으로만 표기
      if (days > 0) {
        this.currentTime = `${days}일 남음`;
      } else if (hours > 0) {
        this.currentTime = `${hours}시간 남음`;
      } else if (minutes > 0) {
        this.currentTime = `${minutes}분 ${seconds}초 남음`;
      } else {
        if(!this.blinktime){
          this.blinktime = true
        }
        this.currentTime = `${seconds}초 남음`;
      }

      // 만약 종료시간이 지났다면 타이머를 종료하고 경매가 종료되었다는 메시지를 표시
      if (distance < 0) {
          this.blinktime = false
          clearInterval(this.timer);
          this.currentTime = '경매가 종료되었습니다.';
        }
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
  },
  categoryDetail(cate,cate2){
    if(cate=='의류'){
       if(cate2==1){
            return'상의';
        } else if(cate2==2){
            return'하의';
        } else if(cate2==3){
            return'신발';
        } else if(cate2==4){
            return'외투';
        } else {
            return'가방';
        }
    } else if (cate=='뷰티'){
        if(cate2==0){
            return'뷰티';
        } else if(cate2==1){
            return'악세사리';
        } else if(cate2==2){
            return'화장품';
        } else {
            return'향수';
        }
    } else if (cate=='생활가전'){
        if(cate2==0){
            return'생활/가전';
        } else if(cate2==1){
            return'주방용품';
        } else if(cate2==2){
            return'가전제품';
        } else {
            return'생필품';
        }
    } else if (cate=='취미'){
        if(cate2==0){
            return'취미';
        } else if(cate2==1){
            return'스포츠';
        } else if(cate2==2){
            return'게임';
        } else if(cate2==3){
            return'음악';
        } else {
            return'미술';
        }
    } else if (cate=='기타'){
        return'기타';
    }
  },
  stopAutoSlide() {
    clearInterval(this.intervalId);
  },
  stopAutoTimer() {
    clearInterval(this.timer);
  },
},
  unmounted() {
    this.stopAutoSlide(); // 페이지가 파괴될 때 자동 슬라이드 정지
    this.stopAutoTimer(); // 페이지가 파괴될 때 타이머 정지
  },
};

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
/*---------------------*/
body {
  font-family: Arial, sans-serif;
}
  /*판매자페이지 css*/
  .product-details3 {
    float: left;
    width: 1210px;
    height: 150px;
    border-radius: 20px;
    border: rgba(24, 204, 0, 0.1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-left: 10px;
  }
  .product-details3 .mypage_topbar_container p  :not(.friendly_text1) {
    text-align: right;
}

  .mypage_topbar_container{
    width: 100%;
    height: 150px;
    margin-right: auto;
    overflow: hidden;
  }
  /*프로필 닉네임*/
  .profile_box{
    width: 90px;
    height: 50px;
    text-align: center;
    flex-direction: column;
    justify-content: space-around;float: left;
    margin-top: auto;
    max-width: 50%; /* 또는 적절한 크기로 설정 */
  }
  /*프로필 사진*/
  .profile_img_box{
    width: 70px;
    height: 90px;
    overflow: hidden;
    margin: 0 auto;
  }
  /*친밀도*/
  .friendly_box{
    float: left;
    flex-direction: column;
    margin-left: 30px;/*원하는 간격설정*/
  }
  /*친밀도 text 수정*/
  .friendly_text{
    font-weight: bold;/*글씨 진하게*/
    line-height:1.5;
    font-size:20px;
    margin-top:auto;
  }
  .friendly_text1 {
    flex-grow: 2;
    width: 300px;
    margin-top: auto;
    margin-left: 0;
    height: auto;
    margin: 0; /* 여백 초기화 */
    padding: 0; /* 내부 여백 초기화 */
}

  .friendly_img_box{
    width:250px;
    height:40px;
    margin-top:-5px;
  }
  /*이미지 표출 슬라이더*/
 .product-details5{
    float: left;
    width:700px;
    height: 600px;
    border-radius: 20px;
    /*border: rgba(24, 204, 0, 0.1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);*/
    margin-left:10px;
    margin-bottom:10px;
}
 .slider-container{
    width: 100%;
    height: 500px;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 20px;
    box-sizing: border-box;
 }
 .slider{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
 }
 .slide-wrapper {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
 .slide{
    flex: 0 0 100%;
 }
 .dot-navigation{
    text-align:center;
    margin-top: 10px;
 }
 .dot{
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #085f00; /* 도트 색상 */
    margin: 0 5px;
    cursor: pointer;
 }
 /*경매시작을 보여주는 화면*/
 .product-details6{
    float: left;
    width: 500px;
    height: 600px;
    /*border-radius: 20px;*/
    /*border: 2px rgba(24, 204, 0, 0.1) ;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);*/
    margin-left: 10px;
    margin-bottom: 10px;
    border-bottom:2px solid rgb(128, 128, 128);
    border-top:2px solid  rgb(128, 128, 128);
 }
 .product-details6 .product-details1 h1 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    justify-content: space-between;

}

 .product-details1{
    margin-left:20px;
    max-width:100%;
    max-height:100%;
 }
 .description{
    line-height: 1.6;

 }
 .bid_container{
    overflow-y:scroll;
    background-color: #ffffff;
    height: 250px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
 }
 .price{
    font-weight: bold;

 }
 .chatroom_container {
  margin-top: 20px;
  margin-left: 13px;
  padding: 12px 25px;
  border-radius: 4px;
  background-color: #0e3b00;
  color:white;
  border:none;
}
 .button{
    padding: 13px 25px;
    background-color: #0e3b00;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left:6px;
 }
 #searchInput{
    width: 200px; /* 너비 조절 */
    height: 40px; /* 높이 조절 */

 }
 #submit_button{
  padding: 13px 25px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/*경매시작가*/
.product-details4 {
  float: left;
  width:1210px;
  max-height:100%;
  /*border-radius: 20px;*/
  /*border: rgba(24, 204, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);*/
  margin-left: 10px;
  margin-top: 5px; 
  border-top:solid rgba(0, 0, 0, 0.1);
  font-weight: bold;
}

.product-details4 > h1, h2, p {
  margin-bottom: 10px;
  margin-top: 20px;
  margin-left: 10px;
}
button:hover {
  background-color: rgb(48, 206, 0);
}
.product-details1 textarea {
  padding:2px;
}
.slide img {
max-width: 100%; /* 이미지가 부모 요소를 넘어가지 않도록 최대 너비 설정 */
max-height: 100%; /* 이미지가 부모 요소를 넘어가지 않도록 최대 높이 설정 */
display: block; /* 이미지 간격을 없애기 위해 inline 속성 제거 */
margin: auto; /* 가운데 정렬을 위한 마진 설정 */
}
#me{
    text-align: end;
}

@keyframes blink-effect{
  50% {
    opacity: 0;
  }
}
/*상세정보부분 설정 더 이상 안됨*/
.goods_con {
  max-width:100%;
  max-height:100%;
  text-align: start;
  display:block;
  resize:none;
  margin-left: 20px;
  font-size: 15px;
  overflow-y: auto; /* 필요 시 수직 스크롤을 자동으로 표시 */
  font-weight: bold;
  color: black;
}

textarea {
  width: 100%;
  height:100px;
  resize: none; /* Optional: Prevent resizing */
}
.btn_container input, button {
  margin-left:4px;  
}

#progress::-webkit-progress-bar {
    background:#f5f5f5;
    border-radius:10px;
    width: 200px;
    height: 15px;
}
#progress::-webkit-progress-value {
    border-radius:10px;
    background: #ff43ec;
    background: linear-gradient(to right, #fff3ff, #ffbeff);
}
.friendly_img_box progress {
    background-color: white;
}
.friendly_score{
  margin-left: 30px;
}
.timer {
  font-size: 20px;
  margin-top: 2px;
  min-width: 150px;
}
.time { 
  text-align: right;
  align-self: flex-end;
  font-size: 25px;
  margin-top: 2px;
  min-width: 150px;
}

.blinktime { 
  text-align: right;
  align-self: flex-end;
  font-size: 25px;
  margin-top: 2px;
  min-width: 150px;
  -webkit-animation: blink 0.5s ease-in-out infinite alternate;
  -moz-animation: blink 0.5s ease-in-out infinite alternate;
  animation: blink 0.5s ease-in-out infinite alternate;
}

@-webkit-keyframes blink{
  0% {opacity: 0.5;}
  100% {opacity: 1;}
}

@-moz-keyframes blink{
  0% {opacity: 0.5;}
  100% {opacity: 1;}
}

@keyframes blink{
  0% {opacity: 0.5;}
  100% {opacity: 1;}
}
.heart {
  position: relative;
  bottom: 450px;
  left: 400px;
  color: black;
  width: 100px;
  height: 100px;
  background: url("https://cssanimation.rocks/images/posts/steps/heart.png")
    no-repeat;
  background-position: 0 0;
  cursor: pointer;
  transition: background-position 1s steps(28);
  transition-duration: 0s;
}
.is-active {
  transition-duration: 1s;
  background-position: -2800px 0;
}

</style>