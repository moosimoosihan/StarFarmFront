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
    name: 'app',
    components: {
      mypageSideBar, Header, Footer
    }
  }
  </script>
  
  <style scoped>
.mypage_container{
    padding-left: 10%;
    margin: auto;
    width: 90%;
    height: 1000px;
    overflow-y: scroll;
  }
  .mypage_content {
    padding-top: 130px;
  }
  .nev.nevbar{
    padding: 0;
  }
Footer {
  width: 100%;
  height: auto;
  position : relative;
  transform : translateY(-1%);
}
  </style>