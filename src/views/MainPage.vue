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
        <div class="slider-info-container">
          <p class="slider-name">슬라이더에 떠있는 상품 이름</p>
          <p class="slider-startprice">슬라이더에 떠있는 상품 시작가</p>
          <p class="slider-nowprice">슬라이더에 떠있는 상품 입찰가</p>
        </div>
      </div>
        <div class="goodslist_div">
            <div class="item_container" v-for="(goods, i) in goodsList" :key="i" @click="gotoAuction(goods.goods_no)">
              <img class="goods_img" :src="require(`../../../StarFarmBack/uploads/uploadGoods/${goods.goods_no}/${goods.goods_img.split(',')[0]}`)" alt="상품 이미지">
              <p class="goodsname">{{ goods.goods_nm }}</p>
              <p class="price">시작가 : {{ goods.goods_start_price }}</p>
              <p class="sprice">입찰가 : {{ goods_succ_bid[i] }}</p>
            </div>
        </div>
      </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      eventImageList: ['1-1.jpg','1-2.jpg','1-3.jpg','1-4.jpg'],
      currentIndex: 0,
      goodsList: [],
      goods_succ_bid: [],
    }
  },
  created() {
    this.getGoods();
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
    gotoAuction(goods_no) {
      this.$router.push(`/product/${goods_no}`);
    },
    moveToSlide(index) {
      const slides = this.$el.querySelectorAll('.slide');
      const slideWidth = slides[0].clientWidth;
      this.$el.querySelector('.slide-wrapper').style.transform = `translateX(-${index * slideWidth}px)`;
      this.currentIndex = index;
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
}
.container {
  width: 100%;
  height: 1500px;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  margin-top: 30px;
}


.goodslist_div {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: auto;
}
.item_container {
  width: 250px;
  height: 450px;
  margin : 20px 40px;
  background-color: rgb(135, 135, 162);
  text-align: center;
}

.goods_img {
  width: 250px;
  height: 250px;
}

.item_container p {
  margin-top:10px;
}

/* 슬라이드 */
.slide-imges_container {
  width : 1200px;
  height : 500px;
  display: flex;
  margin: 0 auto; /* 브라우저에서 가운데 정렬하기 위해 auto설정 */
  text-align: center; /* inline-block화 된 div들을 텍스트 마냥 center로 정렬*/
}


.slider-container {
    width: 50%;
    height: 500px;
    overflow: hidden;
    width: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    box-sizing: border-box;

  }

  .slider-info-container {
    width: 50%;
    height: 500px;
    margin-left: 120px;
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
  margin-top: 10px;
}

.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: black; /* 도트 색상 */
  margin: 0 5px;
  cursor: pointer;
}
</style>
