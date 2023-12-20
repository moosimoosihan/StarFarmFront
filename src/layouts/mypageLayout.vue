<template>
    <div>
        <Header />
        <div class="container">
            <div >
                <div class="mypage_main_container">
                    <MypageTopBar />
                    <nav class="mypage_leftnavbar_lapper">
                        <ul class="left_navbar">
                            <router-link to="/mypage/buylist">
                                <li><a href="#">입찰 상품 이력</a></li>
                            </router-link>
                            <router-link to="/mypage/salelist">
                                <li><a href="#">판매 상품 관리</a></li>
                            </router-link>
                            <router-link to="/mypage/likelist">
                                <li><a href="#">관심 상품 목록</a></li>
                            </router-link>
                            <router-link to="/mypage/mypageeditUser">
                                <li><a href="#">나의 정보 수정</a></li>
                            </router-link>
                            <router-link to="/mypage/myreview">
                                <li><a href="#">내가 쓴 리뷰</a></li>
                            </router-link>
                            <router-link to="/mypage/mychat">
                                <li><a href="#">나의 채팅방</a></li>
                            </router-link>
                        </ul>
                    </nav>
                    <div class="mypage_content_lapper">
                        <div class="mypage_content">
                            <router-view></router-view>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <Footer />
    </div>
  </template>
  
  <script>
  import MypageTopBar from './mypageTopBar.vue'
  import Header from './header.vue'
  import Footer from './footer.vue'
  
    export default {
    name: 'app',
    components: {
        MypageTopBar, Header, Footer
    }
  }
  </script>
  
  <style scoped>
    .container {
        width: 100%;
        height: 100%;
    }
    body {
    overflow-y: scroll;
    -ms-overflow-style: none;
    /* 인터넷 익스플로러 */
    scrollbar-width: none;
    /* 파이어폭스 */
  }
  
  body::-webkit-scrollbar {
    display: none;
    /* 크롬, 사파리, 오페라, 엣지 */
  }

    /* -------------------- */

  .left_navbar li {
    list-style: none;
    margin-top: 30px;
    margin-right: 10px;
    margin-left: 10px;
    border: 1px solid black;
    border-radius: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: center;
}
.left_navbar li:first-child {
    margin-top: 0px;
}
.left_navbar li a {
    text-decoration:none;
    color: black;
}

.mypage_leftnavbar_lapper {
    width: 20%;
    height: 100%;
    padding: 0%;
    border-right: 2px solid black;
    padding-top: 30px;
    padding-bottom: 30px;
    border: 1px solid black;
    float: left;
}

.mypage_content_lapper {
    width: 80%;
    height: 500px;
    float: left;
    text-align: center;
    background-color: gray;
    border: 1px solid black;
}
.mypage_content {
    width: 100%;
    height: 100%;
    vertical-align: middle;
}
.mypage_main_container {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    background-color: white;
}
Footer {
    width: 100%;
    height: auto;
    position : relative;
    transform : translateY(-1%);
}

  </style>