<template>
    <div>
        <Header />
        <div class="mypage_container">
          <mypage-side-bar></mypage-side-bar>
          <div class="mypage_content">
            <router-view></router-view>
          </div>
        </div>
        <Footer />
    </div>
</template>
  
<script>
import Header from './header.vue'
import Footer from './footer.vue'
import mypageSideBar from './mypageLeftBar.vue'
  
    export default {
    name: 'mypageLayout',
    components: {
      mypageSideBar, Header, Footer
    }
  }
  </script>
  
  <style scoped>
.mypage_container{
    padding-left: 15%;
    margin: auto;
    width: 90%;
    max-height: 1900px;
    min-height: 900px;
    width: 100%;
    min-width: 1280px;
  }

.mypage_container::-webkit-scrollbar {
    display: none; 
}
  .mypage_content {
    padding-top: 100px;
  }

  Footer {
    width: 100%;
    height: auto;
    position : relative;
    transform : translateY(-1%);
  }
  mypage-side-bar {
    width: 250px;
    height: 100%;
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
  }
  </style>