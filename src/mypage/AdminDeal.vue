<template>
<div id="app">
     <link href="AdminReport.css" rel="stylesheet">
        <div class="report-section">
            <div class="menu-container">
            <div class="management-box ">
              <h3>회원관리</h3>
              <!-- 추가할 회원관리 내용 -->
            </div>
            <div class="management-box ">
              <h3>거래관리</h3>
              <!-- 추가할 거래관리 내용 -->
            </div>
            <div class="management-box ">
              <h3>신고관리</h3>
              <!-- 추가할 신고관리 내용 -->
            </div>
          </div>
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
                    <tr v-for="(report, index) in reports" :key="index">
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
        export default{
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
