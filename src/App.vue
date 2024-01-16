<template>
  <div class="root_container">
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
.root_container {
  width: 100%;
  min-width: 1280px;
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