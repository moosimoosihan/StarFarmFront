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
              <th>판매자</th>
              <th>낙찰자</th>
              <th>보기</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.productName }}</td>
              <td>{{ item.bidPrice }}</td>
              <td>{{ item.salesStatus }}</td>
              <td>{{ item.deadline }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.seller }}</td>
              <td>{{ item.winner }}</td>
              <td><button class="view-button" @click="deleteItem(index)">삭제</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
            data() {
            return {
             items: [
          {
          productName: '코트',
          bidPrice: '2000\\',
          salesStatus: '거래중',
          deadline: '2023-01-01',
          category: '의류>외투',
          seller: '코트',
          winner: '',
          }, 
          {
          productName: '금',
          bidPrice: '2000\\',
          salesStatus: '거래중',
          deadline: '2023-01-01',
          category: '의류>외투',
          seller: '빵빵',
          winner: '',
          },    
              
          {
          productName: '총',
          bidPrice: '2000\\',
          salesStatus: '거래중',
          deadline: '2023-01-01',
          category: '의류>외투',
          seller: '통통',
          winner: '꿀꿀이',
          },    
              
          {
          productName: '가위',
          bidPrice: '2000\\',
          salesStatus: '거래중',
          deadline: '2023-01-01',
          category: '의류>외투',
          seller: '빵상',
          winner: '',
          },    
              
          {
          productName: '바위',
          bidPrice: '2000\\',
          salesStatus: '거래중',
          deadline: '2023-01-01',
          category: '의류>외투',
          seller: '오킹',
          winner: '',
          },    
             ],
            };
           },
    methods: {
    deleteItem(index) {
      // 상품 삭제 로직을 구현해야합니다.
      console.log('상품 삭제:', this.items[index]);
    },
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
    width:1000px;
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
