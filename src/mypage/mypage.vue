<template>
    <div class="container">
        <div class="mypage_topbar_container">
            <div class="profile_lapper">
                <!-- 프로필 사진, 닉네임 -->
                <div class="profile_box">
                    <div class="profile_img_box">
                        <!-- <div class="profile-icon">
                            <i class="fas fa-user-circle"></i>
                        </div> -->
                        <img :width="150" style="border-radius: 10px;"
                            :src="loginUser.user_img ? require(`../../../StarFarmBack/uploads/userImg/${loginUser.user_no}/${loginUser.user_img}`) : require(`../assets/profile.png`)"
                            alt="프로필 사진 미리보기" />
                    </div>
                    <span class="profile_nick">{{ loginUser.user_nick }}</span>
                </div>
            </div>

            <div class="friendly_lapper">
                <!-- 친밀도 -->
                <div class="friendly_box">
                    <span class="friendly_text">친밀도</span>
                    <div class="friendly_img_box">
                        <div class="progressBar">
                            <div id="bar" class="innerbar"></div>
                        </div>
                        <span class="friendly_score">{{ loginUser.user_fr }}점</span>
                        <p>ID : {{ loginUser.user_id }}</p>
                    </div>
                </div>
            </div>
            
            <div class="logout_lapper">
                <!-- 로그아웃 버튼 -->
                <div class="logout_box">
                    <button class="logout_btn" @click="logout()"><img src="../assets/Logout.png" height="40px" width="100px" ></button>
                </div>
            </div>
            
        </div>
        <div class="mypageContainer">
            <p class="p1">내가 찜한 상품</p>
            <p class="more" @click="gotoLike()">+more</p> 
        </div> 
        <div class="goodslist_div">
            <div class="item_container" v-for="(goods, i) in goodsList" :key="i" @click="gotoAuction(goods.goods_no)">
              <img class="goods_img" :src="require(`../../../StarFarmBack/uploads/uploadGoods/${goods.goods_no}/${goods.goods_img.split(',')[0]}`)" alt="상품 이미지">
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
            <div class="item_container" v-for="(goods, i) in goodsList" :key="i" @click="gotoAuction(goods.goods_no)">
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
        name : 'mypage',
        data() {
            return {
                loginUser: {},
                goodsList: [],
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
        },
        methods: {
            async getUser() {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
                    this.loginUser = response.data[0];
                    console.log(this.loginUser);
                } catch (error) {
                    console.error(error);
                }
            },
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
            gotoLike() {
                    this.$router.push(`/mypage/likelist`);
            },
            gotoBuylist() {
                    this.$router.push(`/mypage/buylist`);
            },
            gotoSalelist() {
                    this.$router.push(`/mypage/Salelist`);
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
  max-width: 330px;
  width: 90%;
  margin: 10px auto;
  margin-top: 20px;
  height: 8px;
  border-radius: 3px;
  background: linear-gradient(#6fa6d66c, #7db1df54);
}

.innerbar {
  max-width: 330px;
  height: 100%;
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
  width: 97%;
  height: 420px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: auto;
  overflow: hidden;
}
.item_container {
  width: 200px;
  height: 400px;
  margin-top: 15px;
  margin-right: 30px;
  background-color: rgb(135, 135, 162);
  text-align: center;
}

.goods_img {
  width: 200px;
  height: 250px;
}

.item_container p {
  margin-top:10px;
}

.mypageContainer{
    justify-content: right;
} 
.more {
    float: right;
    margin-right: 15px;
}

</style>
