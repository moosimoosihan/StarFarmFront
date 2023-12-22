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
                <img class="profile_img" src="" alt="프로필 사진">
              </div>
              <span class="profile_nick">닉네임</span>
            </div>
          </div>

          <div class="friendly_lapper">
            <!-- 친밀도 -->
            <div class="friendly_box">
              <span class="friendly_text">친밀도</span>
              <div class="friendly_img_box">
                <progress value="50" max="100"></progress>
                <span>50점</span>
                <p>종로구:블라블라</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--경매시작가+타임-->
    <div class="product-details4">
      <div class="product-details1">
        <p>시작가:</p>
        <p>시작가:</p>
        <p>입찰가:</p>
      </div>
    </div>
    <!--이미지표출 슬라이더-->
    <div class="product-details5">
      <div class="slider-container">
        <div class="slider">
          <div class="slide-wrapper">
            <div class="slide">
              <img src="../assets/1.jpg" alt="Slide 1" width="500" height="400">
            </div>
            <div class="slide">
              <img src="../assets/2.jpg" alt="Slide 2" width="500" height="400">
            </div>
            <div class="slide">
              <img src="../assets/3.jpg" alt="Slide 3" width="500" height="400">
            </div>
            <!-- 추가 이미지 경로 추가 가능 -->
          </div>
        </div>
         <!-- 추가 이미지에 대한 dot 추가 -->
        <div class="dot-navigation">
          <span class="dot" @click="moveToSlide(0)"></span>
          <span class="dot" @click="moveToSlide(1)"></span>
          <span class="dot" @click="moveToSlide(2)"></span>
        </div>
      </div>
    </div>
    <!--경매시작을 보여주는 화면-->
    <div class="product-details6">
      <div class="product-details">
        <h1>경매 시작</h1>
        <p class="description">
        </p>
        <div class="bid_container">
            <p class="price">1.000님: 21000원 입찰</p>
            <p class="price">2.000님: 25000원 입찰</p>
            <p class="price">3.555님: 35000원 입찰</p>
            <p class="price" id="me">4.555님: 45000원 입찰</p>
            <p class="price">5.555님: 5000원 입찰</p>
            <p class="price">6.555님: 6000원 입찰</p>
            <p class="price">7.555님: 65000원 입찰</p>
            <p class="price" v-if="displayBidAmount" id="me">000님: {{ displayBidAmount }}원 입찰</p>
            <p class="price" v-if="displayBidAmount" id="me">002님: {{ displayBidAmount }}원 입찰</p>

        </div>
        <div class="mid_wrapper">
          <!--1:1 채팅버튼-->
          <button class="chatroom_container" @click="gotoChatRoom(0)">1:1 채팅</button>
          <!--결제페이지 이동버튼-->
          <button class="button" @click="button">결제</button>
          <!--검색창-->
          <input type="text" id="searchInput" autocomplete="off" size="50">
          <!--입찰버튼-->
          <!-- <input type="button" id="submit_button" value="입찰">-->
            <input type="button" id="submit_button" value="입찰" @click="handleBid">
        </div>1233
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentIndex: 0,
      bidAmount: '', // 사용자가 입력한 입찰 값
      displayBidAmount: '' // 화면에 표시될 입찰 값
    };
  },
  methods: {
    moveToSlide(index) {
      const slides = this.$el.querySelectorAll('.slide');
      const slideWidth = slides[0].clientWidth;
      this.$el.querySelector('.slide-wrapper').style.transform = `translateX(-${index * slideWidth}px)`;
      this.currentIndex = index;
    },
    /*1:1 채팅룸 열기*/
    gotoChatRoom(index) {
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
    }
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
    overflow: hidden; /* 스크롤 제거 */
  }
  /*------------*/
  /* 상세페이지 스타일 */
  body {
    font-family: Arial, sans-serif;
    background-color: #ffffff;
  }
  /* <!--상,좌--> */
  .product-details3 {
    float: left;
    width: 50%;
    height: 500px;
    background-Color: #6d5fbb;
  }
  /* <!--하,좌--> */
  .product-details5 {
    float: left;
    width: 50%;
    height: 500px;
    background-Color: #FFF2FF;
  }
  /* <!--상,우--> */
  .product-details4 {
    float: left;
    width: 50%;
    height: 500px;
    background-Color: #FFFFF2;
  }
  /* <!--하,우--> */
  .product-details6 {
    float: left;
    width: 50%;
    height: 500px;
    background-Color: #EFEFEF;
  }
  .product-details {
    width: 100%;
    height: 100%;
    background-color: #6d5fbb;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    box-sizing: border-box;
  }
  .product-details1 {
    width: 100%;
    height: 100%;
    background-color: #fff;
    
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }
  h1,
  p {
    margin-bottom: 10px;
  }
  .product-image {
    width: 100%;
    max-width: 400px;
    height: auto;
    margin-bottom: 20px;
  }
  .description {
    line-height: 1.6;
  }
  .price {
    font-weight: bold;
  }
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  /* 슬라이더 스타일 */
  .slider-container {
    width: 100%;
    height: 500px;
    background-color: #007bff;
    
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

  }

  .mypage_topbar_container {
    width: 350px;
    height: 200px;
    margin: 0 auto;
    border: 2px solid black;
}
.profile_lapper {
  margin-left: 20px;
  float: left;
}
.profile_box {
  width: 90px;
  height: 100px;
  text-align: center;
  flex-direction: column;
  justify-content: space-around;
  background-color: red;
  float: left;
}
.profile_img_box {
  width: 80px;
  height: 80px; 
  border-radius: 30%;
  overflow: hidden;

}
.friendly_box {
  width: 200px;
  height: 50px;
  float: left;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 10px;
}
.profile_img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#me {
  text-align: end;
}

.bid_container{
  overflow-y:scroll;
  background-color: #ffffff;
  height: 200px;
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
  background-color: #fff; /* 도트 색상 */
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
    margin-left: 10%;
    padding: 10px 20px;
    border-radius: 4px;
    background-color:blue;
}

</style>