<template>
    <div class="content">
      <div class="container">
        <div class="mypage_topbar_container">
          <div class="mypage-bar">
            <div class="myinfo">
            <div class="profile_lapper">
                <!-- 프로필 사진, 닉네임 -->
                <div class="profile_box">
                    <div class="profile_img_box">
                        <!-- <div class="profile-icon">
                            <i class="fas fa-user-circle"></i>
                        </div> -->
                        <img :width="100" style="border-radius: 70px; border: solid 3px #0d4608;" @click="profileImgClick()"
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
                      <progress id="progress" :value="loginUser.user_fr" max="100" ></progress><br>
                      <span class="friendly_score">{{ loginUser.user_fr }}점</span>
                        <p>ID : {{ loginUser.user_id }}</p>
                    </div>
                </div>
            </div>
          </div>
          <div class="m_container">
            <router-link class="m" to="/mypage/">
                <p><i class="fa fa-user"></i>  마이페이지</p>
            </router-link>
            <router-link class="m" to="/mypage/buylist">
                <p><i class="fa fa-shopping-cart"></i> 입찰 상품 이력</p>
            </router-link>
            <router-link class="m" to="/mypage/orderlist">
                <p><i class="fa fa-shopping-cart"></i> 구매 상품 이력</p>
            </router-link>
            <router-link class="m" to="/mypage/salelist">
                <p><i class="fas fa-solid fa-money-bill"></i> 판매 상품 관리</p>
                <div v-if="auction_alram>0" class="alarm">{{ auction_alram }}</div>
            </router-link>
            <router-link class="m" to="/mypage/likelist">
                <p><i class="fas fa-solid fa-star"></i> 관심 상품 목록</p>
            </router-link>
            <router-link class="m" to="/mypage/mypageeditUser">
                <p><i class="fas fa-solid fa-user"></i> 나의 정보 수정</p>
            </router-link>
            <router-link class="m" to="/mypage/myreview">
                <p><i class="fas fa-solid fa-pen"></i> 내가 쓴 리뷰</p>
            </router-link>
            <router-link class="m" to="/mypage/mychat">
                <p><i class="fas fa-solid fa-comments"></i> 나의 채팅방</p>
                <div v-if="chat_alram>0" class="alarm">{{ chat_alram }}</div>
            </router-link>
          </div>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script>
import Header from './header.vue'
import Footer from './footer.vue'
import axios from 'axios'
  
    export default {
    name: 'app',
    data() {
      return {
        loginUser: {},

        auction_alram : 0,
        chat_alram : 0
      }
    },
    components: {
      Header, Footer
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    created() {
      this.getUser()
      this.getAlarm()
    },
    methods: {
      // 로그인한 유저 정보 가져오기
      async getUser() {
        try {
          const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
          this.loginUser = response.data[0];
        } catch (error) {
          console.error(error);
        }
      },
      // 프로필 사진 클릭시 유저페이지로 이동
      profileImgClick() {
        this.$router.push(`/userpage/${this.user.user_no}`);
      },
      // 경매 알림과 채팅 알림을 불러오기
      async getAlarm() {
        try {
          const response = await axios.get(`http://localhost:3000/mypage/getAuctionAlram/${this.user.user_no}`);
          const response2 = await axios.get(`http://localhost:3000/mypage/getChatAlram/${this.user.user_no}`);
          this.auction_alram = response.data[0].count;
          this.chat_alram = response2.data[0].count;
        } catch (error) {
          console.error(error);
        }
      }
    }

  }
</script>
  
<style scoped>

.mypage-bar {
    overflow-y: scroll;
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
}
.mypage-bar::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
}

.mypage-bar {
  height: 100%;
  width: 250px;
  position: fixed; /* Stay in place */
  /* z-index: 2; /* Stay on top */
  top: 80px; /* Stay at the top */
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
  margin-top: 35px;
  z-index: 1;
  background-color: white;
  border-right: 1px solid #b3b3b3;
}

.m_container {
  height: 430px;
  overflow-y: scroll ;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
}

.m_container::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
}

.m {
  margin-top: 10px;
  color: black;
}
.myinfo {
  width: 400px;
  height: 250px;
  margin-bottom: 20px; 
  display: table-cell;
  vertical-align: middle;
  position: relative;
  align-items: center;
  text-align: center;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: #81f881;
}

.profile_nick {
  font-size: 24px;
}

.friendly_text {
  margin-top: 10px;
}

/* icon */

.m:hover{
  background-color: #a1ff6a;
}

.active {
  background-color: #4dd418;
} 
Footer {
    width: 100%;
    height: auto;
    position : relative;
    transform : translateY(-1%);
  }
  .content{
    margin: auto;
  }
.mypage-bar a {
  display: block;
  text-align: center;
  height: 10%;
  padding-top: 10px;
  transition: all 0.3s ease;
  text-decoration: none;
}

#progress::-webkit-progress-bar {
    background:#f5f5f5;
    border-radius:10px;
    width: 100%;
    height: 15px;
}
#progress::-webkit-progress-value {
    border-radius:10px;
    background: #ff43ec;
    background: linear-gradient(to right, #fff3ff, #ffbeff);
}
.friendly_img_box progress {
    background-color: white;
    height: 15px;
    border-radius:10px;
}
.profile_img_box :hover {
  transform: scale(1.15);
}
.alarm{
  float: right;
  margin-right: 40px;
  margin-top: -18px;
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  color: white;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  font-weight: 700;
}
  </style>