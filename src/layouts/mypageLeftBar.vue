<template>
    <div class="content">
        <div class="mypage-bar">
            <router-link class="m" to="/mypage/">
                <i class="fa fa-user"></i>
                <p>마이페이지</p>
            </router-link>
            <router-link class="m" to="/mypage/buylist">
                <i class="fa fa-shopping-cart"></i>
                <p>입찰 상품 이력</p>
            </router-link>
            <router-link class="m" to="/mypage/salelist">
                <i class="fas fa-solid fa-money-bill"></i>
                <p>판매 상품 관리</p>
            </router-link>
            <router-link class="m" to="/mypage/likelist">
                <i class="fas fa-solid fa-star"></i>
                <p>관심 상품 목록</p>
            </router-link>
            <router-link class="m" to="/mypage/mypageeditUser">
                <i class="fas fa-solid fa-user"></i>
                <p>나의 정보 수정</p>
            </router-link>
            <router-link class="m" to="/mypage/myreview">
                <i class="fas fa-solid fa-pen"></i>
                <p>내가 쓴 리뷰</p>
            </router-link>
            <router-link class="m" to="/mypage/mychat">
                <i class="fas fa-solid fa-comments"></i>
                <p>나의 채팅방</p>
            </router-link>
        </div>
    </div>
</template>
  
<script>
import Header from './header.vue'
import Footer from './footer.vue'
  
    export default {
    name: 'app',
    components: {
      Header, Footer
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
  height: 58%;
  width: 100px;
  position: fixed; 
  /* z-index: 2; /* Stay on top */
  top: 150px; /* Stay at the top */
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
  background-color: rgb(255, 221, 147);
}

/* icon */
.mypage-bar .m, .icon-bar p{
  color: #ed9837;
}

.mypage-bar p {
  margin: auto;
  font-size: 14px;
  padding-top: 4px;
}

.mypage-bar .m:hover{
  background-color: #fff6ca;
}

.active {
  background-color: #5eaf13;
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