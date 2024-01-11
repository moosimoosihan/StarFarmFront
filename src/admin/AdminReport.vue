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
              <th>신고날짜</th>
              <th>상세보기</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(report, index) in reports" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ report.REPORT_TITLE }}</td>
              <td>{{ reported_userNames[index] }}</td>
              <td>{{ report_userNames[index] }}</td>
              <td>{{ report.REPORT_DATE }}</td>
              <td><button class="view-button" @click="viewReport(report.REPORT_NO)">보기</button></td>
            </tr>
            <tr v-if="reports.length === 0">
              <td colspan="6">신고된 내역이 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
   </div>
 </template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      reports: [],
      reported_userNames: [],
      report_userNames: [],
    }
  },
  mounted() {
    this.getReport();
  },
  methods: {
    viewReport(report_no) {
      let popupWindow = window.open(`http://localhost:8080/reportDetail/${report_no}`, '_blank', 'width=800', 'height=620', 'left=100', 'top=50', 'scrollbars=no', 'resizable=no', 'toolbars=no', 'menubar=no');
        popupWindow.resizeTo(800, 620)
        popupWindow.onresize = (_=>{
          popupWindow.resizeTo(800, 620)
        })
    },
    async getReport(){
      try{
        const res = await axios.get('http://localhost:3000/auth/admin/reportlistInfo');
        this.reports = res.data;
      } catch(err) {
        console.log(err);
      }
      this.getReportedUserNames()
      this.getReportUserNames()
    },
    async getReportedUserNames(){
      try{
        for(let i=0; i<this.reports.length; i++){
          const res = await axios.get(`http://localhost:3000/mypage/mypage/${this.reports[i].USER_NO}`);
          this.reported_userNames.push(res.data[0].user_nick);
        }
      } catch(err) {
        console.log(err);
      }
    },
    async getReportUserNames(){
      try{
        for(let i=0; i<this.reports.length; i++){
          const res = await axios.get(`http://localhost:3000/mypage/mypage/${this.reports[i].REPORT_USER_NO}`);
          this.report_userNames.push(res.data[0].user_nick);
        }
      } catch(err) {
        console.log(err);
      }
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