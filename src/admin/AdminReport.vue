<template>
  <div>
    <div class="report-section">
      <div id="scroll">
        <h2>신고 관리</h2>
        <table class="report-table">
          <thead>
            <tr>
              <th>No</th>
              <th>신고제목</th>
              <th>신고자</th>
              <th>피신고자</th>
              <th>진행사항</th>
              <th>신고날짜</th>
              <th>보기</th>
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
              <td><button class="view-button" @click="viewReport(index)">보기</button></td>
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
            },
                methods: {
                  viewReport: function (index) {
                    // 각 신고에 대한 상세 정보 보기 로직을 추가할 수 있습니다.
                    console.log('View report:', this.reports[index]);
               
                

                }
            }
        }
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