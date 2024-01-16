<template>
    <div class="container">
        <div class="mypageContainer">
            <p class="p1">내가 찜한 상품</p>
            <p class="more" @click="gotoLike()">+more</p> 
        </div> 
<!--        <div class="goodslist_div" v-if="likeList.length>0">-->
<!--            <div class="item_container" v-for="(goods, i) in likeList" :key="i" @click="gotoAuction(goods.GOODS_NO)">-->
<!--              <img class="goods_img" :src="require(`../../../StarFarmBack/uploads/uploadGoods/${goods.GOODS_NO}/${goods.goods_img.split(',')[0]}`)" alt="상품 이미지">-->
<!--              <p class="goodsname">{{ goods.goods_nm }}</p>-->
<!--              <p class="price">시작가 : {{ goods.goods_start_price }}</p>-->
<!--              <p class="sprice">입찰가 : {{ like_goods_succ_bid[i] }}</p>-->
<!--            </div>-->
<!--        </div>-->
        <div class="goodslist_div" v-if="likeList.length>0">
          <div class="item_container" v-for="(goods, i) in likeList" :key="i" @click="gotoAuction(goods.goods_no)">
            <img class="goods_img"  :src="require(`../../../StarFarmBack/uploads/uploadGoods/${goods.GOODS_NO}/${goods.goods_img.split(',')[0]}`)" alt="상품 이미지">
            <div class="goodsname">
              <h2>{{ goods.goods_nm }}</h2>
              <p>{{ goods.goods_content }}</p>
            </div>
            <div class="card-stats">
              <div class="stat">
                <div class="value"><p class="price">{{ goods.goods_start_price }}</p></div>
                <div class="type">시작가</div>
              </div>
              <div class="stat border">
                <div class="value"><p class="sprice">{{ like_goods_succ_bid[i] }}</p></div>
                <div class="type">입찰가</div>
              </div>
              <div class="stat">
                <!--                <div class="value"><p class="time" v-if="goods.GOODS_TIMER">{{ goodsTimer[i] }}</p></div>-->
                <div class="type">경매 시간</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="goodslist_div">
            <p>찜한 상품이 없습니다.</p>
        </div>
        <div class="mypageContainer">
            <p class="p1">나의 입찰 상품</p>
            <p class="more" @click="gotoBuylist()">+more</p>
        </div>
<!--        <div class="goodslist_div" v-if="orderList.length>0">-->
<!--            <div class="item_container" v-for="(goods, i) in orderList" :key="i" @click="gotoAuction(goods.goods_no)">-->
<!--              <img class="goods_img" :src="require(`../../../StarFarmBack/uploads/uploadGoods/${goods.goods_no}/${goods.goods_img.split(',')[0]}`)" alt="상품 이미지">-->
<!--              <p class="goodsname">{{ goods.goods_nm }}</p>-->
<!--              <p class="price">시작가 : {{ goods.goods_start_price }}</p>-->
<!--              <p class="sprice">입찰가 : {{ order_goods_succ_bid[i] }}</p>-->
<!--            </div>-->
<!--        </div>-->
        <div class="goodslist_div" v-if="orderList.length>0">
          <div class="item_container" v-for="(goods, i) in orderList" :key="i" @click="gotoAuction(goods.goods_no)">
            <img class="goods_img"  :src="require(`../../../StarFarmBack/uploads/uploadGoods/${goods.goods_no}/${goods.goods_img.split(',')[0]}`)" alt="상품 이미지">
            <div class="goodsname">
              <h2>{{ goods.goods_nm }}</h2>
              <p>{{ goods.goods_content }}</p>
            </div>
            <div class="card-stats">
              <div class="stat">
                <div class="value"><p class="price">{{ goods.goods_start_price }}</p></div>
                <div class="type">시작가</div>
              </div>
              <div class="stat border">
                <div class="value"><p class="sprice">{{ order_goods_succ_bid[i] }}</p></div>
                <div class="type">입찰가</div>
              </div>
              <div class="stat">
                <!--                <div class="value"><p class="time" v-if="goods.GOODS_TIMER">{{ goodsTimer[i] }}</p></div>-->
                <div class="type">경매 시간</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="goodslist_div">
            <p>입찰한 상품이 없습니다.</p>
        </div>
        <div class="mypageContainer">
            <p class="p1">나의 판매 상품</p>
            <p class="more" @click="gotoSalelist()">+more</p>
        </div>
        <div class="goodslist_div" v-if="saleList.length>0">
          <div class="item_container" v-for="(goods, i) in saleList" :key="i" @click="gotoAuction(goods.GOODS_NO)">
            <img class="goods_img"  :src="require(`../../../StarFarmBack/uploads/uploadGoods/${goods.GOODS_NO}/${goods.GOODS_IMG.split(',')[0]}`)" alt="상품 이미지">
            <div class="goodsname">
              <h2>{{ goods.GOODS_NM }}</h2>
              <p>{{ goods.GOODS_CONTENT }}</p>
            </div>
            <div class="card-stats">
              <div class="stat">
                <div class="value"><p class="price">{{ goods.GOODS_START_PRICE }}</p></div>
                <div class="type">시작가</div>
              </div>
              <div class="stat border">
                <div class="value"><p class="sprice">{{ sale_goods_succ_bid[i] }}</p></div>
                <div class="type">입찰가</div>
              </div>
              <div class="stat">
<!--                <div class="value"><p class="time" v-if="goods.GOODS_TIMER">{{ goodsTimer[i] }}</p></div>-->
                <div class="type">경매 시간</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="goodslist_div">
            <p>판매한 상품이 없습니다.</p>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

    export default {
        name : 'mypage',
        data() {
            return {
                likeList: [],
                orderList: [],
                saleList: [],
                
                like_goods_succ_bid: [],
                order_goods_succ_bid: [],
                sale_goods_succ_bid: []
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        created() {
            this.getLikelist();
            this.getOrderlist();
            this.getSalelist();
        },
        methods: {
            gotoAuction(goods_no) {
                    this.$router.push(`/product/${goods_no}`);
            },
            gotoLike() {
                    this.$router.push(`/mypage/likelist`);
            },
            gotoBuylist() {
                    this.$router.push(`/mypage/buylist`);
            },
            gotoSalelist() {
                    this.$router.push(`/mypage/Salelist`);
            },
            async getLikelist() {
              const user_no = this.user.user_no;
              try {
                const response = await axios.get(`http://localhost:3000/mypage/likelist_preview/${user_no}`);
                this.likeList = response.data;
              } catch (error) {
                console.error(error);
              }
              for(let i=0; i<this.likeList.length; i++){
                try {
                  const response = await axios.get(`http://localhost:3000/goods/goodsSuccBid/${this.likeList[i].GOODS_NO}`);
                  if(response.data[0].succ_bid==null){
                    this.like_goods_succ_bid.push('입찰없음');
                  } else {
                    this.like_goods_succ_bid.push(response.data[0].succ_bid);
                  }
                } catch (error) {
                  console.error(error);
                }
              }
            },
          async getOrderlist() {
              const user_no = this.user.user_no;
              try {
                const response = await axios.get(`http://localhost:3000/mypage/orderlist_preview/${user_no}`);
                this.orderList = response.data;
              } catch (error) {
                console.error(error);
              }
                for(let i=0; i<this.orderList.length; i++){
                    try {
                    const response = await axios.get(`http://localhost:3000/goods/goodsSuccBid/${this.orderList[i].goods_no}`);
                    if(response.data[0].succ_bid==null){
                        this.order_goods_succ_bid.push('입찰없음');
                    } else {
                        this.order_goods_succ_bid.push(response.data[0].succ_bid);
                    }
                    } catch (error) {
                    console.error(error);
                    }
                }
          },
          async getSalelist() {
              const user_no = this.user.user_no;
              try {
                const response = await axios.get(`http://localhost:3000/mypage/salelist_preview/${user_no}`);
                this.saleList = response.data;
              } catch (error) {
                console.error(error);
              }
                for(let i=0; i<this.saleList.length; i++){
                    try {
                    const response = await axios.get(`http://localhost:3000/goods/goodsSuccBid/${this.saleList[i].GOODS_NO}`);
                    if(response.data[0].succ_bid==null){
                        this.sale_goods_succ_bid.push('입찰없음');
                    } else {
                        this.sale_goods_succ_bid.push(response.data[0].succ_bid);
                    }
                    } catch (error) {
                    console.error(error);
                    }
                }
          },



            logout() {
                if(this.loginUser.user_social_tp==1){
                    window.Kakao.Auth.logout()
                }
                this.$store.commit("user", {})
                this.$swal({
                    position: 'top',
                    icon: 'success',
                    title: '로그아웃 성공!',
                    showConfirmButton: false,
                    timer: 1000
                    }).then(() => {
                        window.location.href="http://localhost:8080";
                    })
            }
        }
    }
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
    margin-top: 35px;
    overflow: scroll;
}

.container::-webkit-scrollbar {
  display: none;
}

/* -------------------- */

#photo-preview {
    width: 150px;
    height: 150px; 
    border-radius: 70%;
    overflow: hidden;

}

.profile_nick {
    text-align: center;
}
.profile_box {
    width: 150px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.friendly_box {
    width: 250px;
    height: 200px;
    display: flex;
    flex-direction: column;
    margin-left: 50px;
}
.profile_lapper {
    margin-left: 20px;
    float: left;
}
.friendly_text {
    margin-top: 50px;
}
.mypage_topbar_container {
    width: 100%;
    height: 200px;
    margin: 0 auto;
    border: 2px solid black;
}
.logout_lapper {
    margin-top: 10px;
    margin-right: 10px;
    float: right;
}

.logout_btn {
    background-color: transparent;
    border: 0;
}

.friendly_lapper {
    float :left;
    margin-left: 10px;
}
.friendly_score {
    margin-left: 10px;
}


.progressBar {
  max-width: 150px;
  margin: 10px auto;
  margin-top: 20px;
  height: 8px;
  border-radius: 3px;
  background: linear-gradient(#6fa6d66c, #7db1df54);
}

.innerbar {
  max-width: 150px;
  height: 20px;
  text-align: right;
  height: 8px; /* same as #progressBar height if we want text middle aligned */
  width: 30%;
  border-radius: 3px;
  background: linear-gradient(#5be6ba, #5ed1ad);
}

.p1 {
    font-size: 25px;
    margin-top: 50px;
}

.goodslist_div {
  width: 100%;
  height: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
  margin-top: 15px;
  overflow: hidden;
}

.goods_img {
  width: 200px;
  height: 200px;
}


.mypageContainer {
    justify-content: right;
    margin-left: 20px;
} 
.more {
    float: right;
    margin-right: 15px;
}
.more:hover {
  cursor: pointer;
  text-decoration: underline;
}

/* card css */
.goodslist_div {
  height: 450px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  margin: 45px 0 0 0;
}
.item_container {
  display: grid;
  grid-template-columns: 200px;
  grid-template-rows: 150px 100px 75px;
  grid-template-areas: "image" "text" "stats";
  height: 72%;

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
  grid-area: text;
  margin: 15px;
}
.goodsname .date {
  color: rgb(255, 7, 110);
  font-size: 13px;
}
.goodsname p {
  color: grey;
  font-size:10px;
  font-weight: 300;
  margin-top: 20px;
}
.goodsname h2 {
  margin-top:0px;
  font-size:20px;
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
  width: 68px;
  font-size: 11px;
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

</style>
