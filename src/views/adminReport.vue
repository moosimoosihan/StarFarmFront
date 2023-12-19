<template>
  <div class="report-section">
    <h2>신고 관리</h2>
    <div id="scroll">
      <div class="management-box pink-box">
        <h3>회원관리</h3>
        <!-- 회원관리 테이블 내용 -->
        <table class="report-table">
          <thead>
            <tr>
              <th>No</th>
              <th>신고제목</th>
              <th>신고자</th>
              <th>피신고자</th>
              <th>진행사항</th>
              <th>신고날짜</th>
              <th>상세 보기</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(report, index) in reports" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ report.title }}</td>
              <td>{{ report.reporter }}</td>
              <td>{{ report.reported }}</td>
              <td>{{ report.status }}</td>
              <td>{{ report.date }}</td>
              <td><button class="view-button" @click="viewReport(index)"> 보기</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="management-box pink-box">
        <h3>거래관리</h3>
        <!-- 거래관리 테이블 내용 -->
        <!-- ... -->
      </div>

      <div class="management-box pink-box">
        <h3>신고관리</h3>
        <!-- 신고관리 테이블 내용 -->
        <!-- ... -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reports: [
        {
          title: '(구매자신고) 마음에 안듬',
          reporter: 'B씨',
          reported: 'A씨',
          status: '처리중',
          date: '2023-01-01'
        }
        // 다른 신고 정보를 추가할 수 있습니다.
      ]
    };
  },
  methods: {
    viewReport(index) {
      // 각 신고에 대한 상세 정보 보기 로직을 추가할 수 있습니다.
      console.log('View report:', this.reports[index]);
    }
  }
};
</script>

<style scoped>
#scroll {
  overflow-y: scroll;
}

.report-section {
  padding: 1px;
}

.management-box {
  width: 100%;
  margin-bottom: 20px;
}

.pink-box {
  background-color: #ff99cc; /* 핑크색 배경 */
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.report-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.report-table th,
.report-table td {
  border: 1px solid #000000;
  padding: 8px;
  text-align: center;
}

.view-button {
  cursor: pointer;
}
</style>