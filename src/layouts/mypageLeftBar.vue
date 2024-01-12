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
                        <img :width="100" style="border-radius: 10px;"
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
          </div>
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
            </router-link>
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
        loginUser: {}
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
      this.getUser();
    },
    methods: {
      async getUser() {
        try {
          const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
          this.loginUser = response.data[0];
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
  position:absolute; /* Stay in place */
  /* z-index: 2; /* Stay on top */
  top: 80px; /* Stay at the top */
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
  margin-top: 35px;
}

.m {
  border-right: 1px solid #b3b3b3;
}

.myinfo {
  width: 250px;
  height: 300px;
  margin-bottom: 20px; 
  display: table-cell;
  vertical-align: middle;
  position: relative;
  align-items: center;
  text-align: center;
  border: solid 1px #b3b3b3;
  border-radius: 30px;
}

.profile_nick {
  font-size: 24px;
}

.friendly_text {
  margin-top: 10px;
}
.innerbar {
  max-width: 150px;
  height: 10px;
  text-align: right;
  height: 8px; /* same as #progressBar height if we want text middle aligned */
  width: 30%;
  border-radius: 3px;
  background: linear-gradient(#55ff63, #5ed168);
}

.progressBar {
  max-width: 150px;
  margin: 10px auto;
  margin-top: 5px;
  height: 5px;
  border-radius: 3px;
  background: linear-gradient(#6fa6d66c, #7db1df54);
}

/* icon */
.mypage-bar .m, .icon-bar p{
  color: #000000;
}

.mypage-bar p {
  font-size: 18px;
  padding-top: 10px;
}

.mypage-bar .m:hover{
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
  height: 14.28%;
  padding-top: 10px;
  transition: all 0.3s ease;
  text-decoration: none;
}



  </style>