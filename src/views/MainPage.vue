<template>
    <div class="container">
      <div class="slide-imges_container">
        <div class="slider-container" v-if="mainEventGoods.length>0">
          <div class="slider">
            <div class="slide-wrapper">
              <div class="slide" v-for="(goods,i) in mainEventGoods" :key="i">
                <img :src="require(`../../../StarFarmBack/uploads/uploadGoods/${goods.goods_no}/${goods.goods_img.split(',')[0]}`)" width="550" @click="gotoAuction(goods.goods_no)">
              </div>
            </div>
          </div>
          <div class="dot-navigation">
            <span class="dot" v-for="(goods,i) in mainEventGoods" :key="i" :id="currentIndex==i? 'selectImg':''" @click="moveToSlide(i)"></span>
          </div>
        </div>
        <div class="slider-container" v-else-if="mainEventGoods.length===0">
          <div class="slider">
            <div class="slide-wrapper">
              <div class="slide" v-for="(goods,i) in mainDefaultGoods" :key="i">
                <img :src="require(`../../../StarFarmBack/uploads/uploadGoods/${goods.goods_no}/${goods.goods_img.split(',')[0]}`)" width="550" @click="gotoAuction(goods.goods_no)">
              </div>
            </div>
          </div>
          <div class="dot-navigation">
            <span class="dot" v-for="(goods,i) in mainDefaultGoods" :key="i" @click="moveToSlide(i)"></span>
          </div>
        </div>
        <div class="slider-container" v-else>
          <div class="slider">
            <div class="slide-wrapper">
              <div class="slide" v-for="(img,i) in eventImageList" :key="i">
                <img :src="require(`../assets/${img}`)" alt="EventSlide" width="550">
              </div>
            </div>
          </div>
          <div class="dot-navigation">
            <span class="dot" v-for="(img,i) in eventImageList" :key="i" @click="moveToSlide(i)"></span>
          </div>
        </div>
        <!-- 인기 혹은 최신 상품 -->
        <div class="slider-info-container">
          <div class="goods" v-if="mainEventGoods.length>0">
            <h1>* 인기 상품 *</h1>
            <div class="hot-Data" v-for="(goods, i) in mainEventGoods" :key="i" @click="gotoAuction(goods.goods_no)">
              <div class="hot-container">
                <div class="image-container">
                  <img :src="require(`../../../StarFarmBack/uploads/uploadGoods/${goods.goods_no}/${goods.goods_img.split(',')[0]}`)" alt="상품 이미지" class="hot-img">
                </div>
                <div class="data-container">
                  <p class="slider-name">{{ goods.goods_nm }}</p>
                  <p class="slider-startprice">시작가 : {{ formatPrice(goods.goods_start_price) }}</p>
                  <p class="slider-nowprice">입찰가 : {{ formatPrice(main_goods_succ_bid[i]) }}</p>
                  <p class="slider-nowprice1" font-color:red v-if="goods.goods_timer">{{ eventGoodsTimer[i] }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="mainEventGoods.length===0">
            <h1>최신 상품</h1>
            <div class="hot-Data" v-for="(goods,i) in mainDefaultGoods" :key="i" @click="gotoAuction(goods.goods_no)">
              <div class="hot-container">
                <div class="image-container">
              <img :src="require(`../../../StarFarmBack/uploads/uploadGoods/${goods.goods_no}/${goods.goods_img.split(',')[0]}`)" alt="상품 이미지" class="hot-img">
              </div>
              <div class="data-container">
              <p class="slider-name">{{ goods.goods_nm }}</p>
              <p class="slider-startprice">시작가 : {{ formatPrice(goods.goods_start_price) }}</p>
              <p class="slider-nowprice">입찰가 : {{ formatPrice(goods_succ_bid[i]) }}</p>
              <p class="slider-nowprice1" font-color:red v-if="goods.goods_timer">{{ defaultGoodsTimer[i] }}</p>
              </div>
            </div>
          </div>
        </div>
          <div class="hot-Data" v-else>
            <h1>상품이 없습니다.</h1>
          </div>
        </div>
      </div>
      <!-- 상품 카드 css 시작 -->
      <div class="goodslist_div" v-if="goodsList.length>0">
          <div class="item_container" v-for="(goods, i) in goodsList" :key="i" @click="gotoAuction(goods.goods_no)">
            <img class="goods_img"  :src="goods.goods_img ? require(`../../../StarFarmBack/uploads/uploadGoods/${goods.goods_no}/${goods.goods_img.split(',')[0]}`):require(`../assets/2-1.png`)" alt="상품 이미지">
            <div class="goodsname">
              <h2>{{ goods.goods_nm }}</h2>
              <p>{{ goods.goods_content }}</p>
            </div>
            <div class="card-stats">
              <div class="stat">
                <div class="type">시작가</div>
                <div class="value"><p class="price">{{ formatPrice(goods.goods_start_price) }}</p></div>
              </div>
              <div class="stat border">
                <div class="type">입찰가</div>
                <div class="value"><p class="sprice">{{ formatPrice(goods_succ_bid[i]) }}</p></div>
              </div>
              <div class="stat">
                <div class="type">경매 시간</div>
                <div class="value"><p class="time" v-if="goods.goods_timer">{{ goodsTimer[i] }}</p></div>
            </div>
            </div>
          </div>
      </div>
      <!-- 상품 카드 css 끝 -->
      <div class="goodslist_div" v-else>
        <h1>상품이 없습니다.</h1>
      </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'MainPage',
  data() {
    return {
      eventImageList: ['1-1.jpg','1-2.jpg','1-3.jpg','1-4.jpg'],
      mainEventGoods: [],
      mainDefaultGoods: [],
      currentIndex: 0,
      goodsList: [],
      goods_succ_bid: [],
      intervalId: null, // 자동 슬라이드를 위한 인터벌 ID
      main_goods_succ_bid: [],

      eventGoodsTimer: [],
      defaultGoodsTimer: [],
      goodsTimer: [],
      timer: null,
    }
  },
  created() {
    this.getGoods();
    this.getPopularProducts()
    this.startAutoSlide(); // 페이지가 생성될 때 자동 슬라이드 시작
    this.allGoodsTimer()
  },
  unmounted() {
    this.stopAutoSlide(); // 페이지가 파괴될 때 자동 슬라이드 정지
    this.stopAutoTimer(); // 페이지가 파괴될 때 타이머 정지
  },
  methods: {
    async getGoods(){
      await axios.get('http://localhost:3000/goods/maingoods')
        .then((res) => {
          this.goodsList = res.data;
          this.goodsTimer = new Array(this.goodsList.length);
        })
        .catch((err) => {
          console.log(err);
        })
        for(let i=0; i<this.goodsList.length; i++){
            await axios.get(`http://localhost:3000/goods/goodsSuccBid/${this.goodsList[i].goods_no}`)
            .then((res) => {
              if(res.data[0].succ_bid==null){
                this.goods_succ_bid.push('입찰 없음');
              } else {
                this.goods_succ_bid.push(res.data[0].succ_bid);
              }
            })
            .catch((err) => {
              console.log(err);
            })
            
          }
    },
    //인기상품가져오기
    async getPopularProducts() {
      this.mainEventGoods = []
      try{
        //백엔드에 대한 인기상품을 가져온다.
        const response = await axios.get(`http://localhost:3000/goods/PopularProducts`)
        this.mainEventGoods = response.data
        this.eventGoodsTimer = new Array(this.mainEventGoods.length);
      }catch(err){
        console.log(err);
      }
      // 인기상품 낙찰가 가져오기
      this.main_goods_succ_bid = []
      try{
        for(let i=0; i<this.mainEventGoods.length; i++){
          await axios.get(`http://localhost:3000/goods/goodsSuccBid/${this.mainEventGoods[i].goods_no}`)
          .then((res) => {
            if(res.data[0].succ_bid==null){
              this.main_goods_succ_bid.push('입찰 없음');
            } else {
              this.main_goods_succ_bid.push(res.data[0].succ_bid);
            }
          })
          .catch((err) => {
            console.log(err);
          })
        }
      } catch(err){
        console.log(err)
      }
      if(this.mainEventGoods.length==0){
        // 일반 메인 상품 가져오기
        this.mainDefaultGoods=[]
        try{
          const response_default = await axios.get(`http://localhost:3000/goods/DefaultProducts`)
          this.mainDefaultGoods = response_default.data
          this.defaultGoodsTimer = new Array(this.mainDefaultGoods.length)
        } catch(err){
          console.log(err)
        }
      }
    },
    gotoAuction(goods_no) {
      this.$router.push(`/product/${goods_no}`);
    },
    formatPrice(price) {
      if(price=='입찰 없음'){
        return price
      }
      if (price !== undefined && price !== null) {
          const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return `${formattedPrice} 원`;
      }
      return "";
    },
    moveToSlide(index) {
      const slides = this.$el.querySelectorAll('.slide');
      const slideWidth = slides[0].clientWidth;
      this.$el.querySelector('.slide-wrapper').style.transform = `translateX(-${index * slideWidth}px)`;
      this.currentIndex = index;
    },
    startAutoSlide() {
      var nextIndex = 0;
      this.intervalId = setInterval(() => {
        if(this.mainEventGoods.length>0){
          nextIndex = (this.currentIndex + 1) % this.mainEventGoods.length;
        } else if (this.mainDefaultGoods.length>0){
          nextIndex = (this.currentIndex + 1) % this.mainDefaultGoods.length;
        } else {
          nextIndex = (this.currentIndex + 1) % this.eventImageList.length;
        }
        this.moveToSlide(nextIndex);
      }, 4000); // 4초마다 슬라이드 이동
    },
    stopAutoSlide() {
      clearInterval(this.intervalId);
    },
    stopAutoTimer() {
      clearInterval(this.timer);
    },
    updateTimer(endTime) {
      // 날짜를 초로 바꾸어 저장 후 계산
      let countDownDate = new Date(endTime).getTime();
      // 현재 시간을 초로 바꾸어 저장
      let currentTime = new Date().getTime();
      const distance = countDownDate - currentTime;
      // 만약 종료시간이 지났다면 타이머를 종료하고 경매가 종료되었다는 메시지를 표시
      if (distance < 0) {
        return '경매가 종료되었습니다.';
      }
      // 남은 시간 계산
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // 표시할 남은 시간 문자열 생성 포맷은 무조건 해당 포맷 하나만 '00일 남음' '00시간 남음' '00분 00초 남음' 으로만 표기
      const daysStr = days > 0 ? `${days}일 남음` : '';
      const hoursStr = hours > 0 ? `${hours}시간 남음` : '';
      const minutesStr = minutes > 0 ? `${minutes}분` : '';  
      const secondsStr = seconds >= 0 ? `${seconds}초 남음` : '';
      // 만약 00일 남음이라면
      if (daysStr === '') {
        // 00시간 남음이라면
        if (hoursStr === '') {
          // 00분 남음이라면
          if (secondsStr === '') {
            // 경매가 종료되었다는 메시지를 표시
            return '경매가 종료되었습니다.';
          }
          // 00시간 남음이 아니라면 00분 00초 남음을 표시
          return minutesStr + ' ' + secondsStr;
        }
        // 00일 남음이 아니라면 00시간 남음을 표시
        return hoursStr;
      }
      // 00일 남음을 표시
      return daysStr;
    },
    allGoodsTimer(){
      this.timer = setInterval(()=>{
        if(this.goodsList.length>0){
          for(let i=0; i<this.goodsList.length; i++){
            if(this.goodsTimer[i]!='경매가 종료되었습니다.')
              this.goodsTimer[i] = this.updateTimer(this.goodsList[i].goods_timer);
          }
        }
        if(this.mainEventGoods.length>0){
          for(let y=0; y<this.mainEventGoods.length; y++){
            if(this.eventGoodsTimer[y]!='경매가 종료되었습니다.')
              this.eventGoodsTimer[y] = this.updateTimer(this.mainEventGoods[y].goods_timer);
          }
        }
        if(this.mainDefaultGoods.length>0){
          for(let z=0; z<this.mainDefaultGoods.length; z++){
            if(this.defaultGoodsTimer[z]!='경매가 종료되었습니다.')
              this.defaultGoodsTimer[z] = this.updateTimer(this.mainDefaultGoods[z].goods_timer);
          }
        }
      }, 1000);
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },

}
</script>
<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  margin: 0 auto;
}
.container {
  width: 95%;
  height: 1500px;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  flex-direction: column;
  margin-top: 30px;
}

.container::-webkit-scrollbar {
  display: none;
}

/* 카드 css 시작 */
.goodslist_div {
  width: 90%;
  height: 955px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  margin-top: 45px;
}
.item_container {
  display: grid;
  grid-template-columns: 240px;
  grid-template-rows: 150px 160px 80px;
  grid-template-areas: "image" "text" "stats";
  height: 40%;

  border-radius: 18px;
  background: white;
  box-shadow: 5px 5px 15px rgba(0,0,0,0.9);
  font-family: roboto;
  text-align: center;

  transition: 0.5s ease;
  cursor: pointer;
  margin:30px;
}
.goods_img {
  grid-area: image;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  grid-area: image;
  width: 100%;
  height: 100%;
}
.goodsname {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  grid-area: text;
  margin: 25px;
}
.goodsname .date {
  color: rgb(255, 7, 110);
  font-size: 13px;
}
.goodsname p {
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
  color: grey;
  font-size:15px;
  font-weight: 300;
  margin-top: 20px;

}
.goodsname h2 {
  margin-top:0px;
  font-size:28px;
}
.card-stats {
  grid-area: stats;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;

  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background: #68ce68;
}
.card-stats .stat {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  color: white;
  padding:10px;
  width: 80px;
  font-size: 13px;
  border-right: 2px solid rgba(46, 190, 0, 0.3);
}
.stat:last-child {
  border: none;
}
.item_container > p {
  margin-left: 3px;
}
.item_container:hover {
  transform: scale(1.15);
  box-shadow: 5px 5px 15px rgba(0,0,0,0.6);
}

/* 카드 css 끝 */

.goods{
   justify-content: center;
    align-items:center;
    text-align: center;
}


/* 슬라이드 */
.slide-imges_container {
  width : 80%;
  height : 500px;
  display: flex;
  justify-content: center;
  margin: 0 auto; /* 브라우저에서 가운데 정렬하기 위해 auto설정 */
  text-align: center; /* inline-block화 된 div들을 텍스트 마냥 center로 정렬*/
}
.slider-container {
    width: 75%;
    height: 500px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    box-sizing: border-box;
  }

  .slider-info-container {
    width: 50%;
    height: 500px;
    margin-left: 50px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .slider {
    width: 100%;
    overflow: hidden;
    position: relative;
    /*margin-bottom: 20px;*/
  }
  .slide-wrapper {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
  .slide {
    flex: 0 0 100%;
  }
.slide img {
  width: 400px; /* 이미지가 부모 요소를 넘어가지 않도록 최대 너비 설정 */
  height: 400px; /* 이미지가 부모 요소를 넘어가지 않도록 최대 높이 설정 */
  display: block; /* 이미지 간격을 없애기 위해 inline 속성 제거 */
  margin: auto; /* 가운데 정렬을 위한 마진 설정 */
  margin-bottom: 15px;
}

.dot-navigation {
  text-align: center;
}

.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgb(13, 109, 0); /* 도트 색상 */
  margin-right: 10px;
  cursor: pointer;
}
.hot-Data {
  
    align-items: center;
    margin-bottom: 10px;
  }

  .hot-container {
    display: flex;
    width:200x;
    align-items: center;
  }

  .image-container {
    margin-right: 10px; /* Adjust the margin as needed */
  }

  .hot-img {
    width: 180px; /* Adjust the width as needed */
    height: 130px;
  }

  .data-container {
    flex-grow: 1;
    font-size: 20px;
  }
  .slider-name{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    border:1px solid black;
    margin-bottom: 8px;
  }
  
  .slider-nowprice{
    text-align: start;
  }
  
  .slider-nowprice1{
    text-align: start;
    color:red; 
  }
  .slider-startprice{
    text-align:start;
  }
  .time,
  .price,
  .sprice {
    font-weight: 800;
  }
  #selectImg{
  background-color: #766800;
}
</style>