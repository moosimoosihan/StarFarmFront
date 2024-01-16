<!-- 일반 모든 화면에서 사용 -->
<template>
    <div class="root_container">
      <Header />
      <div class="default_content">
        <router-view />
      </div>
      <Footer />
    </div>
  </template>
  
  
  <script>
  import Header from './header.vue'
  import Footer from './footer.vue'
  
  export default {
    name: 'defaultLayout',
    components: {
      Header, Footer
    }
  }
  </script>
  <style scoped>
.root_container {
  width: 100%;
  min-width: 1280px;
}
  .default_content {
    padding-top: 120px;
    margin: auto;
    height: 100%;
    position: relative;
    min-height: 100%;
  }
  
  Footer {
    width: 100%;
    height: auto;
    position : relative;
    transform : translateY(-1%);
  }
  </style>