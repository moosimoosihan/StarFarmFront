<template>
    <div class="container">
        <div class="mypageContainer">
            <p class="p1">내가 찜한 상품</p>
            <p class="more" @click="gotoLike()">+more</p> 
        </div>
        <div class="goodslist_div" v-if="likeList.length>0">
          <div class="item_container" v-for="(goods, i) in likeList" :key="i" @click="gotoAuction(goods.GOODS_NO)">
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
                <div class="value"><p class=time v-if="like_goods_timer[i]">{{ like_goods_timer[i] }}</p></div>
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
                <div class="value"><p class=time v-if="order_goods_timer[i]">{{ order_goods_timer[i] }}</p></div>
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
                <div class="value"><p class=time v-if="sale_goods_timer[i]">{{ sale_goods_timer[i] }}</p></div>
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
                sale_goods_succ_bid: [],

                like_goods_timer: [],
                order_goods_timer: [],
                sale_goods_timer: [],
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
            this.allGoodsTimer();
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
            stopAutoTimer() {
              clearInterval(this.timer);
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
          updateTimer(endTime) {
            // 날짜를 초로 바꾸어 저장 후 계산
            let countDownDate = new Date(endTime).getTime();
            // 현재 시간을 초로 바꾸어 저장
            let currentTime = new Date().getTime();
            const distance = countDownDate - currentTime;
            // 만약 종료시간이 지났다면 타이머를 종료하고 경매가 종료되었다는 메시지를 표시
            if (distance < 0) {
              return '경매 종료';
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
                  return '경매 종료';
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
              if(this.likeList.length>0){
                for(let i=0; i<this.likeList.length; i++){
                  if(this.like_goods_timer[i]!='경매 종료')
                    this.like_goods_timer[i] = this.updateTimer(this.likeList[i].goods_timer);
                }
              }
              if(this.orderList.length>0){
                for(let y=0; y<this.orderList.length; y++){
                  if(this.order_goods_timer[y]!='경매 종료')
                    this.order_goods_timer[y] = this.updateTimer(this.orderList[y].goods_timer);
                }
              }
              if(this.saleList.length>0){
                for(let z=0; z<this.saleList.length; z++){
                  if(this.sale_goods_timer[z]!='경매 종료')
                    this.sale_goods_timer[z] = this.updateTimer(this.saleList[z].GOODS_TIMER);
                }
              }
            }, 1000);
          }
        },
        unmounted() {
          this.stopAutoTimer(); // 페이지가 파괴될 때 타이머 정지
        },
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
    height: 1900px;
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
