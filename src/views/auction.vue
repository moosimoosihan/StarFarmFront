<template>
    <div class="container" id="scroll">
        <!--판매자 페이지-->
        <div class="product-details3">
            <div class="product-details">
                <img src="1.jpg" alt="Slide 1" width="200" height="200">
                <p>판매자닉네임</p>
                <p>판매자 온도</p>
                <p>판매자지역:종로구</p>
            </div>
        </div>
        <!--경매시작가+타임-->
        <div class="product-details4">
            <div class="product-details1">
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
                            <img src="1.jpg" alt="Slide 1" width="500" height="400">
                        </div>
                        <div class="slide">
                            <img src="2.jpg" alt="Slide 2" width="500" height="400">
                        </div>
                        <div class="slide">
                            <img src="3.jpg" alt="Slide 3" width="500" height="400">
                        </div>
                        <!-- 추가 이미지 경로 추가 가능 -->
                    </div>
                </div>
                <button class="slider-button" onclick="prevSlide()">이전</button>
                <button class="slider-button" onclick="nextSlide()">다음</button>
            </div>
        </div>
        <!--경매시작을 보여주는 화면-->
        <div class="product-details6">
            <div class="product-details">
                <h1>경매 시작</h1>
                <p class="description"></p>
                <p class="price">1.000님: 21000원 입찰</p>
                <p class="price">2.000님: 25000원 입찰</p>
                <p class="price">3.555님: 35000원 입찰</p>
                <p class="price">4.555님: 45000원 입찰</p>
                <p class="price">5.555님: 5000원 입찰</p>
                <p class="price">6.555님: 6000원 입찰</p>
                <p class="price">7.555님: 65000원 입찰</p>
                <div class="mid_wrapper">
                    <!--1:1 채팅버튼-->
                    <button class="button" onclick="button">1:1 채팅</button>
                    <!--검색창-->
                    <input type="text" id="" autocomplete="off" size="50">
                    <!--검색버튼-->
                    <input type="button" id="submit_button" value="검색">
                </div>
            </div>
        </div>
    </div>
</template>
<script>

</script>
<style scoped>

  .container {
    width: 100%;
    height: 100%;
  }

  #scroll {
    overflow: scroll;
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
    width: 700px;
    height: 500px;
    background-Color: #6d5fbb;
  }

  /* <!--하,좌--> */
  .product-details5 {
    float: left;
    width: 700px;
    height: 500px;

    background-Color: #FFF2FF;
  }

  /* <!--상,우--> */
  .product-details4 {
    float: left;
    width: 700px;
    height: 500px;
    background-Color: #FFFFF2;
  }

  /* <!--하,우--> */
  .product-details6 {
    float: left;
    width: 700px;
    height: 500px;
    background-Color: #EFEFEF;
  }


  .product-details {
    width: 700px;
    height: 500px;
    background-color: #6d5fbb;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    box-sizing: border-box;
  }

  .product-details1 {
    width: 700px;
    height: 500px;
    background-color: #fff;
    border-radius: 8px;
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
    width: 700px;
    height: 500px;
    background-color: #007bff;
    border-radius: 8px;
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
</style>