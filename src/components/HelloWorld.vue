<template>
  <div class="hello">
    <!-- <button @click="paytest()">결제버튼</button> -->
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
// import { Bootpay } from '@bootpay/client-js'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
  // methods: {
  //       async paytest() {
  //           const response = await Bootpay.requestPayment({
  //           "application_id": "657fe1f7e57a7e001b5a00b2",
  //           "price": 1000,
  //           "order_name": "테스트결제",
  //           "order_id": "TEST_ORDER_ID",
  //           "pg": "다날",
  //           "method": "카드",
  //           "tax_free": 0,
  //           "user": {
  //               "id": "회원아이디",
  //               "username": "회원이름",
  //               "phone": "01000000000",
  //               "email": "test@test.com"
  //           },
  //           "items": [
  //               {
  //               "id": "item_id",
  //               "name": "테스트아이템",
  //               "qty": 1,
  //               "price": 1000
  //               }
  //           ],
  //           "extra": {
  //               "open_type": "iframe",
  //               "card_quota": "0,2,3",
  //               "escrow": false
  //           }
  //           })

  //           console.log(response)
  //       }
  //   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
