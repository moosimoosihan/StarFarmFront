<template>
  <div class="report-section">
    <h2>신고 관리</h2>
    <div id="scroll">
    <table class="report-table">
      <thead>
        <tr>
          <th>No</th>
          <th>신고제목</th>
          <th>신고자</th>
          <th>피신고자</th>
          <th>진행사항</th>
          <th>신고날짜</th>
          <th>상세 보기</th> <!-- 버튼을 열로 추가 -->
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
            <td><button class="view-button" @click="viewReport(index)"> 보기</button></td> <!-- 버튼 추가 -->
          </tr>
      </tbody>
    </table>
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
      ]
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


.report-table {
  width: 96%;
  border-collapse: collapse;
  margin-top: 1px;
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