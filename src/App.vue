<template>
  <div>
    <router-view />
  </div>
</template>


<script>

export default {
  name: 'App',

}
</script>
<style>
* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}
* :not(.fas, .fa){
  font-family: 'GangwonEdu_OTFBoldA', sans-serif !important;
}



body {
  overflow-y: scroll;
  -ms-overflow-style: none;
  /* 인터넷 익스플로러 */
  scrollbar-width: none;
  /* 파이어폭스 */
}

@font-face {
    font-family: 'GangwonEdu_OTFBoldA';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/GangwonEdu_OTFBoldA.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
</style>