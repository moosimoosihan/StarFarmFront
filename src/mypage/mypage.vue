<template>
    <div>
        <div class="mypageContainer">
            <p class="p1">내가 찜한 상품</p>
            <p class="more" @click="gotoLike()">+more</p> 
        </div> 
        <div class="goodslist_div">
            <div class="item_container" v-for="(goods, i) in likeList" :key="i" @click="gotoAuction(goods.GOODS_NO)">
              <img class="goods_img" :src="require(`../../../StarFarmBack/uploads/uploadGoods/${goods.GOODS_NO}/${goods.goods_img.split(',')[0]}`)" alt="상품 이미지">
              <p class="goodsname">{{ goods.goods_nm }}</p>
              <p class="price">시작가 : {{ goods.goods_start_price }}</p>
              <p class="sprice">입찰가 : {{ goods_succ_bid[i] }}</p>
            </div>
        </div>
        <div class="mypageContainer">
            <p class="p1">나의 입찰 상품</p>
            <p class="more" @click="gotoBuylist()">+more</p>
        </div>
        <div class="goodslist_div">
            <div class="item_container" v-for="(goods, i) in orderList" :key="i" @click="gotoAuction(goods.goods_no)">
              <img class="goods_img" :src="require(`../../../StarFarmBack/uploads/uploadGoods/${goods.goods_no}/${goods.goods_img.split(',')[0]}`)" alt="상품 이미지">
              <p class="goodsname">{{ goods.goods_nm }}</p>
              <p class="price">시작가 : {{ goods.goods_start_price }}</p>
              <p class="sprice">입찰가 : {{ goods_succ_bid[i] }}</p>
            </div>
        </div>
        <div class="mypageContainer">
            <p class="p1">나의 판매 상품</p>
            <p class="more" @click="gotoSalelist()">+more</p>
        </div>
        <div class="goodslist_div">
            <div class="item_container" v-for="(goods, i) in saleList" :key="i" @click="gotoAuction(goods.GOODS_NO)">
              <img class="goods_img" :src="require(`../../../StarFarmBack/uploads/uploadGoods/${goods.GOODS_NO}/${goods.GOODS_IMG.split(',')[0]}`)" alt="상품 이미지">
              <p class="goodsname">{{ goods.GOODS_NM }}</p>
              <p class="price">시작가 : {{ goods.GOODS_START_PRICE }}</p>
              <p class="sprice">입찰가 : {{ goods_succ_bid[i] }}</p>
            </div>
        </div>
        
    </div>
</template>
<script>
import axios from 'axios';

    export default {
        name : 'mypage',
        data() {
            return {
                loginUser: {},
                goodsList: [],
                likeList: [],
                orderList: [],
                saleList: [],
                goods_succ_bid: [],
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        created() {
            this.getUser();
            this.getGoods();
            this.getLikelist();
            this.getOrderlist();
            this.getSalelist();
        },
        methods: {
            async getUser() {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
                    this.loginUser = response.data[0];
                } catch (error) {
                    console.error(error);
                }
            },
            async getGoods(){
                await axios.get('http://localhost:3000/goods/maingoods')
                    .then((res) => {
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
            },
          async getOrderlist() {
              const user_no = this.user.user_no;

              try {
                const response = await axios.get(`http://localhost:3000/mypage/orderlist_preview/${user_no}`);
                this.orderList = response.data;
              } catch (error) {
                console.error(error);
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
  width: 85%;
  height: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
  margin-top: 15px;
  overflow: hidden;
}
.item_container {
  width: 200px;
  height: 300px;
  background-color: rgb(255, 255, 255);
  border-style: solid;
  border-width: 2px;
  border-radius: 25px;
  border-color: rgb(219, 219, 219);
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 15px;
  margin-right: 25px;
  overflow: hidden;
  box-shadow: 5px 5px 5px gray;
}

.goods_img {
  width: 200px;
  height: 200px;
}

.item_container p {
  margin-top: 7px;
  margin-left: 15px;
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

</style>
