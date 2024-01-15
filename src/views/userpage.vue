<template>
    <div class="container">
        <div id="userpage_wrapper">
            <div id="userpage_profile">
                <div id="userpage_profile_box">
                    <div id="userpage_profile_img">
                        <img :src="userInfo.user_img ? require(`../../../StarFarmBack/uploads/userImg/${userInfo.user_no}/${userInfo.user_img}`) : require(`../assets/profile.png`)">
                    </div>
                </div>
                <div id="userpage_friendly">
                    <div id="user_nick">닉네임 : {{  userInfo.user_nick  }}</div>
                    <span>친밀도</span>
                    <progress id="progress" :value="userFr" max="100" ></progress>
                </div>
              <div v-if="user.user_no != userNo">
                <button class="button1" @click="gotoChatRoom(userNo), createChatRoom()">1대1 채팅</button>
                <button class="button2" id="userpage_report" @click="reportBtn()">신고</button>
              </div>
            </div>
            <div class="wrap">
                <div class="button_tab">
                    <button
                        v-for="(tab, index) in tabList"
                        :key="index"
                        @click.prevent="currentTab = index"
                        :class="{'active' : currentTab === index}">
                        {{ tab.name }}
                    </button>
            </div>
            <ul class="product-tab-content" v-if="currentTab === 0">
                <div class="goodslist_div" v-if="userProductList.length>0">
              
                        <div class="item_container" v-for="(goods, i) in userProductList" :key="i" @click="gotoAuction(goods.goods_no)">
                            <img class="goods_img" :src="require(`../../../StarFarmBack/uploads/uploadGoods/${goods.goods_no}/${goods.goods_img.split(',')[0]}`)" alt="상품 이미지">
                            <p class="goodsname">{{ goods.goods_nm }}</p>
                            <p class="price">시작가 : {{ goods.goods_start_price }}</p>
                            <p class="sprice">입찰가 : {{ goods_succ_bid[i] }}</p>
                            <p class="time" v-if="goods.goods_timer">{{ goodsTimer[i] }}</p>
                        </div>
                </div>
            </ul>
            <ul class="review-tab-content" v-if="currentTab === 1">
                <li v-for="(item, index) in userReviewList" :key="index">
                        <div id="userpage_review_list">
                            <div id="userpage_review_user">
                            <h1>{{userReviewList[index].goods_nm}}</h1>
                            <p>{{ userReviewList[index].user_nick }}</p>
                            </div>
                            <img :src="require(`../../../StarFarmBack/uploads/uploadGoods/${userReviewList[index].goods_no}/${userReviewList[index].goods_img.split(',')[0]}`)" id="userpage_product_review_img">
                            <div id="userpage_review_content"><p>{{ userReviewList[index].review_con }}</p></div>
                            <p id="userpage_review_date">{{ formatDateTime(userReviewList[index].review_create_dt) }}</p>
                    </div>
                </li>
            </ul>
            </div>
            <div id="tab-1" class="tab-content current"></div>
            <div id="tab-2" class="tab-content"></div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

    export default {
    name: "Tab",
    data() {
        return {
        currentTab: 0,
        tabList: [
            { name: "판매 리스트" },
            { name: "판매자 리뷰" },
        ],
        userInfo: [],
        userReviewList: [],
        userProductList: [],
        userFr: 0,
        goods_succ_bid: [],
        goodsTimer: [],
        timer: null,
        userNo: this.$route.params.id
        };
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    created() {
        this.getUserInfo();
        this.getReviewList();
        this.getProductList();
        this.allGoodsTimer()
    },
    methods: {
        async getUserInfo() {
            try {
                const user_no = this.$route.params.id;
                const response = await axios.get(`http://localhost:3000/mypage/mypage/${user_no}`);
                this.userInfo = response.data[0];
                this.userFr = parseInt(this.userInfo.user_fr);
            } catch (error) {
                console.error(error);
            }
        },
        async getProductList() {
            try {
                const user_no = this.$route.params.id;
                const response = await axios.get(`http://localhost:3000/mypage/get_user_product/${user_no}`);
                this.userProductList = response.data;
                this.goodsTimer = new Array(this.userProductList.length)
            } catch (error) {
                console.error(error);
            }
            for(let i=0; i<this.userProductList.length; i++){
            await axios.get(`http://localhost:3000/goods/goodsSuccBid/${this.userProductList[i].goods_no}`)
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
        async getReviewList() {
            try {
                const user_no = this.$route.params.id;
                const response = await axios.get(`http://localhost:3000/mypage/get_user_review/${user_no}`);
                this.userReviewList = response.data;
            } catch (error) {
                console.error(error);
            }
        },
        gotoAuction(goods_no) {
            this.$router.push(`/product/${goods_no}`);
        },
        reportBtn() {
          this.$swal.fire({
            title: '신고하기',
            text: '신고하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '신고하기',
            cancelButtonText: '취소',
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push(`/report/${this.$route.params.id}`);
            }
          });
        },
        async createChatRoom() {
          try {
            if (this.user.user_no == this.userNo) {
              return this.$swal('본인과의 채팅은 불가능합니다.');
            } else {
              await axios({
                url: `http://localhost:3000/chat/createChatRoom/${this.userNo}`,
                method: "POST",
                data: {
                  buyer: this.user.user_no,
                  seller: this.userNo,
                }
              })
            }
          } catch (error) {
            console.error(error);
          }
        },
        gotoChatRoom(index) {
          let popupWindow = window.open(`/chatroom/${index}`, '_blank', 'width=700', 'height=560', 'left=100', 'top=50', 'scrollbars=no', 'resizable=no', 'toolbars=no', 'menubar=no');
          popupWindow.resizeTo(700, 560)
          popupWindow.onresize = (_=>{
              popupWindow.resizeTo(700, 560)
          })
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
        if(this.userProductList.length>0){
          for(let i=0; i<this.userProductList.length; i++){
            if(this.goodsTimer[i]!='경매가 종료되었습니다.')
              this.goodsTimer[i] = this.updateTimer(this.userProductList[i].goods_timer);
          }
        }
      }, 1000);
    },
  stopAutoTimer() {
    clearInterval(this.timer);
  },
  formatDateTime(dateTime) {
        const date = new Date(dateTime);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        const formattedDateTime = date.toLocaleDateString("ko-KR", options);
        return formattedDateTime;
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  destroyed(){
    this.stopAutoTimer()
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
    height: 1260px;
}
/* ------------------------------------------------------------- */

/* 유저 페이지 상단 */
#progress::-webkit-progress-bar {
    background:#f5f5f5;
    border-radius:10px;
    width: 200px;
    height: 25px;
    margin-top: 11px;
}
#progress::-webkit-progress-value {
    border-radius:10px;
    background: #ff43ec;
    background: linear-gradient(to right, #fff3ff, #ffbeff);

}
#userpage_wrapper {
    width: 60%;
    height: 800px;
    margin: 0 auto;
}
#userpage_profile {
    width: 100%;
    height: 200px;
    border: 1px solid rgb(227, 208, 208);
}

#userpage_profile a {
    display: block;
    width: 50px;
    height: 30px;
    background-color: red;
    float: right;
    margin: 10px 10px;
    line-height: 30px;
    padding-left: 10px;
    border-radius: 10px;
    text-decoration: none;
}
#userpage_profile a:first-child {
    width: 100px;
    height: 50px;
}
#userpage_profile_box {
    width: 200px;
    height: 100%;
    float: left;
}
#userpage_profile_box span {
    margin-left: 35%;
    margin-top: 10px;
    float: left;
}
#userpage_profile_img {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 25px;
}
#userpage_profile_img img {
    width: 150px;
    height: 100%;
    object-fit: cover;
}
#userpage_friendly {
    width: 400px;
    height: 100%;
    float: left;
    margin-left: 20px;
}
#userpage_friendly span {
    float: left;
    line-height: 50px;
}
#user_nick {
    margin-top: 60px;
    font-size: 25px;
}
#userpage_friendly progress {
    float: left;
    margin-left: 20px;
    background-color: white;
}
#userpage_friendly a {
    display: block;
    width: 100px;
    height: 40px;
    background-color:aliceblue;
    line-height: 40px;
    padding-left: 10px;
    border-radius: 10px;
    float: left;
    margin-top: 80px;
    text-decoration: none;
}
#userpage_tab {
    width: 100%;
    height: 100px;
    margin-top: 19px;
}
.tab-link {
    width: 50%;
    height: 70px;
    background-color: rgb(201, 34, 129);
    float: left;
    list-style: none;
    line-height: 70px;
}
#userpage_tab li:first-child {
    background-color: pink;
}
.tab-link a {
    display: block;
    padding-left: 40%;
    text-decoration: none;
    color: black;
}

.button1 {
    height: 42px;
    width:120px;
    font-size: 14px;
    color: rgb(123, 123, 123);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
    cursor: pointer;
    margin-top: 70px;
    float: right;
    margin-right: 30px;
}
.button2 {
    height: 42px;
    width:120px;
    font-size: 14px;
    color: rgb(123, 123, 123);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
    cursor: pointer;
    margin-top: 70px;
    float: right;
    margin-right: 10px;
}
/* 유저 페이지 상단 끝 */

/* 판매자 리뷰 */
.button_tab {
    width:100%;
    height:100px;
}

.button_tab button {
    width: 50%;
    height: 100%;
    border:none;
    font-size: 15px;
    font-family: GmarketSansMedium;
}
.active {
    background-color: rgb(25, 90, 13);
    color: white;
    font-size: 15px;
    font-family: GmarketSansMedium;
}
#userpage_review_list {
    width: 100%;
    height: 150px;
    border: 2px solid rgb(221, 221, 221);
    margin: 30px auto;
    border-radius: 20px;
    overflow:hidden;
}
#userpage_review_user {
    width: 153px;
    height: 60%;
    padding-left: 22px;
    padding-top: 35px;
    float: left;
}
#userpage_review_list div h1 {
    font-size: 20px;
}
#userpage_review_list div p {
    font-size: 17px;
    margin-top: 25px;
}
#userpage_product_review_img {
    width: 200px;
    height: 100%;
    background-color: rgb(198, 247, 222);
    float: left;
}
#userpage_review_content {
    width: 300px;
    height: 100%;
    margin-left: 25px;
    float: left;
}
#userpage_review_img {
    width: 70px;
    height: 70px;
    margin-top: 30px;
    margin-left: 40px;
}
#userpage_review_date {
    float: right;
    margin-right: 46px;
    margin-top: 60px;
}
/* 판매자 리뷰 끝 */

/* 판매자 상품 리스트 */
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

.time {
  position: relative;
  left: 5px;
  top: 30px;
  color : red;
}

.goods_img {
  width: 200px;
  height: 200px;
}

.goodslist_div {
    width: 100%;
    height: 800px;
    background-color: rgb(255, 255, 255);
    border: 2px solid rgb(221, 221, 221);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: auto;

}
.goodslist_div li {
    list-style: none;
    margin-top: 25px;
}
.review-tab-content li {
    margin-bottom: 30px;
    list-style: none;
}

/* 판매자 상품 리스트 끝 */
</style>