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
body {
  overflow-y: scroll;
  -ms-overflow-style: none;
  /* 인터넷 익스플로러 */
  scrollbar-width: none;
  /* 파이어폭스 */
}
.HamFont {
  font-family: 'SF_HambakSnow', sans-serif !important;
}
@font-face {
    font-family: 'SF_HambakSnow';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2106@1.1/SF_HambakSnow.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
</style>