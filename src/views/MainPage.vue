<template>
    <div class="container">
      <div class="slide-imges_container">
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
      const slides = this.$el.querySelectorAll('.slide-image');
      const slideWidth = slides[0].clientWidth;
      this.$el.querySelector('.slide-images').style.transform = `translateX(-${index * slideWidth}px)`;
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
.container {
  width: 100%;
  height: 1500px;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
}

.slide-imges_container {
  width : 100%;
  height : 500px;
  background-color: grey;
}

.goodslist_div {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 auto;
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
</style>
