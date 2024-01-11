<template>
    <div class="container">
      <div class="slide-imges_container">
        <div class="slider-container">
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
          <div v-if="mainEventGoods.length>0">
            <h1>인기 상품</h1>
            <div v-for="(goods,i) in mainEventGoods" :key="i" @click="gotoAuction(goods.goods_no)">
              <img :src="require(`../../../StarFarmBack/uploads/uploadGoods/${goods.goods_no}/${goods.goods_img.split(',')[0]}`)" alt="상품 이미지" width="70">
              <p class="slider-name">{{ goods.goods_nm }}</p>
              <p class="slider-startprice">시작가 : {{ goods.goods_start_price }}</p>
              <p class="slider-nowprice">입찰가 : {{ main_goods_succ_bid[i] }}</p>
            </div>
          </div>
          <div v-else-if="mainDefaultGoods.length>0">
            <h1>최신 상품</h1>
            <div v-for="(goods,i) in mainDefaultGoods" :key="i" @click="gotoAuction(goods.goods_no)">
              <img :src="require(`../../../StarFarmBack/uploads/uploadGoods/${goods.goods_no}/${goods.goods_img.split(',')[0]}`)" alt="상품 이미지" width="70">
              <p class="slider-name">{{ goods.goods_nm }}</p>
              <p class="slider-startprice">시작가 : {{ goods.goods_start_price }}</p>
              <p class="slider-nowprice">입찰가 : {{ goods_succ_bid[i] }}</p>
            </div>
          </div>
          <div v-else>
            <h1>상품이 없습니다.</h1>
          </div>
        </div>
      </div>
      <div class="goodslist_div" v-if="goodsList.length>0">
          <div class="item_container" v-for="(goods, i) in goodsList" :key="i" @click="gotoAuction(goods.goods_no)">
            <img class="goods_img" :src="require(`../../../StarFarmBack/uploads/uploadGoods/${goods.goods_no}/${goods.goods_img.split(',')[0]}`)" alt="상품 이미지">
            <p class="goodsname">{{ goods.goods_nm }}</p>
            <p class="price">시작가 : {{ goods.goods_start_price }}</p>
            <p class="sprice">입찰가 : {{ goods_succ_bid[i] }}</p>
          </div>
      </div>
      <div v-else>
        <h1>상품이 없습니다.</h1>
      </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
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
    }
  },
  created() {
    this.getGoods();
    this.getPopularProducts()
    this.startAutoSlide(); // 페이지가 생성될 때 자동 슬라이드 시작
  },
  beforeDestroy() {
    this.stopAutoSlide(); // 페이지가 파괴될 때 자동 슬라이드 정지
  },
  methods: {
    async getGoods(){
      await axios.get('http://localhost:3000/goods/maingoods')
        .then((res) => {
          console.log(res.data);
          this.goodsList = res.data;
        })
        .catch((err) => {
          console.log(err);
        })
        console.log(this.goodsList.length);
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
        } catch(err){
          console.log(err)
        }
      }
    },
    gotoAuction(goods_no) {
      this.$router.push(`/product/${goods_no}`);
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
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  }
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
  width: 80%;
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

.goodslist_div {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 45px;
}
.item_container {
  width: 200px;
  height: 350px;
  background-color: rgb(255, 255, 255);
  border-style: solid;
  border-width: 2px;
  border-radius: 25px;
  border-color: rgb(219, 219, 219);
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 15px;
  margin-right: 15px;
  overflow: hidden;
  box-shadow: 5px 5px 5px gray;
}

.item_container > p {
  margin-left: 3px;
}

.goodsname {
  font-size: 20px;
  position: relative;
  top: 15px;
  left: 5px;
}

.price {
  position: relative;
  left: 5px;
  top: 20px;
}

.sprice {
  position: relative;
  left: 5px;
  top: 25px;
}

.goods_img {
  width: 197.5px;
  height: 240px;
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
    width: 70%;
    height: 500px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    box-sizing: border-box;
  }

  .slider-info-container {
    width: 30%;
    height: 500px;
    margin-left: 50px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
.slide img {
  max-width: 100%; /* 이미지가 부모 요소를 넘어가지 않도록 최대 너비 설정 */
  max-height: 100%; /* 이미지가 부모 요소를 넘어가지 않도록 최대 높이 설정 */
  display: block; /* 이미지 간격을 없애기 위해 inline 속성 제거 */
  margin: auto; /* 가운데 정렬을 위한 마진 설정 */
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
</style>