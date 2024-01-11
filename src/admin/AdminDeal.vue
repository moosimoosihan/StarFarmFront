<template>
  <div>
    <div class="report-section">
      <div id="scroll">
        <h2>거래 관리</h2>
        <table class="report-table">
          <thead>
            <tr>
              <th>No</th>
              <th>상품명</th>
              <th>입찰가</th>
              <th>판매현황</th>
              <th>마감일시</th>
              <th>카테고리</th>
              <th>판매자번호</th>
              <th>낙찰가</th>
              <th>보기</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in productList" :key="index">
              <td>{{ product.GOODS_NO }}</td>
              <td>{{ product.GOODS_NM }}</td>
              <td>{{ product.GOODS_START_PRICE }}</td>
              <td>{{ product.GOODS_STATE }}</td>
              <td>{{ product.GOODS_TIMER }}</td>
              <td>{{ product.GOODS_CATEGORY }}</td>
              <td>{{ product.USER_NO }}</td>
              <td>{{ product.GOODS_SUCC_PRICE }}</td>
              <td>
                <button v-if="!product.DELETE_TIME" class="view-button" @click="deleteItem(product.GOODS_NO)">
                  삭제
                </button>
                <button v-else class="view-button" @click="restoreGoods(product.GOODS_NO)">
                  보기
                </button>
              </td>
            </tr>
            <tr v-if="productList.length === 0">
              <td colspan="9">상품이 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>  // delete_goods_2 로 상품삭제 goods_add: 상품GOODS 정보 다가져옴
  import axios from 'axios';

  export default {
    data() {
      return {
        loginUser:{},
        productList:[],
      };
    },
    created() {
      this.getUser();
      this.getAdd();
    },
    computed:{
      user(){
        return this.$store.state.user;
      },
    },
    methods: {
    async deleteItem(no) {
     try {
        await axios({
          url: `http://localhost:3000/goods/delete_goods/${no}`, 
          method: 'post',
        });
      } catch (error) {
        console.log('상품 삭제 에러:', error);
      }
      await this.getAdd()
    },
    async getUser() {
      const user_no = this.user.user_no;
      try {
        const response = await axios.get(`http://localhost:3000/mypage/mypage/${user_no}`);
        this.loginUser = response.data[0];
      } catch (error) {
        console.log(error);
      }
    },
    async getAdd() {
      try {
        const response = await axios.get(`http://localhost:3000/goods/allGoods`);
        this.productList = response.data;
        console.log(this.productList);
      } catch (error) {
        console.log(error);
      }
    },
    async restoreGoods(no) {
      try {
        const response = await axios.post(`http://localhost:3000/goods/restoreGoods/${no}`)
        if(response.data.message=='restore_complete'){
          console.log("복구 성공")
        }
      } catch (error) {
        console.log(error);
      }
      await this.getAdd()
    }
  },
};
</script>

<style scoped>
body {
    margin: 0;
    padding: 0;
}

.report-section {
    display: flex;
    background-color: #ffffff;
    height: 100vh;
    width:1700px;
    border: 1px solid #000000;
}

#scroll {
    overflow-y: auto;
    padding: 20px;
    width: calc(100% - 290px);
}

.report-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.report-table th,
.report-table td {
    border: 1px solid #000000;
    padding: 10px;
    text-align: center;
}

.view-button {
    cursor: pointer;
}
</style>
