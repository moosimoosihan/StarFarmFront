<!-- 일반 모든 화면에서 사용 -->
<template>
    <div>
      <Header />
      <div class="content">
        <router-view />
      </div>
      <Footer />
    </div>
  </template>
  
  
  <script>
  import Header from './header.vue'
  import Footer from './footer.vue'
  
  export default {
    components: {
      Header, Footer
    }
  }
  </script>
  
  <style>
  .content {
    padding-top: 150px;
    margin: auto;
    height: 100%;
    position: relative;
    min-height: 100%;
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
  
  Footer {
    width: 100%;
    height: auto;
    position : relative;
    transform : translateY(-1%);
  }
  </style>