<template>
  <div>
    <div class="report-section">
      <div id="scroll">
        <div class="report_search">
          <h2>신고 관리</h2>
          <span>검색할 신고제목 : </span>
          <input type="text" placeholder="신고제목을 입력하세요" v-model="search_report" />
          <button @click="searchReport(sort)">검색</button>
          <select v-model="sort" @change="search_report!='' ? searchReport(sort) : getReport(sort)">
            <option value="DESC">최신순</option>
            <option value="ASC">오래된순</option>
          </select>
        </div>
        <table class="rwd-table">
          <thead>
            <tr>
              <th>신고번호</th>
              <th>신고제목</th>
              <th>신고자</th>
              <th>피신고자</th>
              <th>신고날짜</th>
              <th>상세보기</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(report, index) in reports" :key="index">
              <td>{{ report.REPORT_NO }}</td>
              <td>{{ report.REPORT_TITLE }}</td>
              <td>{{ reported_userNames[index] }}</td>
              <td>{{ report_userNames[index] }}</td>
              <td>{{ formatDateTime(report.REPORT_DATE) }}</td>
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

      sort: 'DESC',
      search_report: '',
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
        const res = await axios.get(`http://localhost:3000/auth/admin/reportlistInfo/none/${this.sort}`);
        this.reports = res.data;
      } catch(err) {
        console.log(err);
      }
      await this.getReportedUserNames()
      await this.getReportUserNames()
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
    },
    async searchReport(sort) {
      try{
        const res = await axios.get(`http://localhost:3000/auth/admin/reportlistInfo/${this.search_report}/${sort}`);
        this.reports = res.data;
      } catch(err) {
        console.log(err);
      }
      await this.getReportedUserNames()
      await this.getReportUserNames()
    },
    formatDateTime(dateTime) {
        const date = new Date(dateTime);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        const formattedDateTime = date.toLocaleDateString("ko-KR", options);
        return formattedDateTime;
    },
  }
}
</script>
<style scoped>
body {
  margin: 0;
  padding: 0;
}

@import 'https://fonts.googleapis.com/css?family=Open+Sans:600,700';

* {font-family: 'Open Sans', sans-serif;}

.rwd-table {
  margin: auto;
  min-width: 1100px;
  max-width: 100%;
  border-collapse: collapse;
  margin-left: 22%;
}

.rwd-table tr:first-child {
  border-top: none;
  background: #428bca;
  color: #fff;
}

.rwd-table tr {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: #f5f9fc;
}

.rwd-table tr:nth-child(odd):not(:first-child) {
  background-color: #ebf3f9;
}

.rwd-table th {
  display: none;
}

.rwd-table td {
  display: block;
}

.rwd-table td:first-child {
  margin-top: .5em;
}

.rwd-table td:last-child {
  margin-bottom: .5em;
}

.rwd-table td:before {
  content: attr(data-th) ": ";
  font-weight: bold;
  width: 120px;
  display: inline-block;
  color: #000;
}

.rwd-table th,
.rwd-table td {
  text-align: left;
}

.rwd-table {
  color: #333;
  border-radius: .4em;
  overflow: hidden;
}

.rwd-table tr {
  border-color: #bfbfbf;
}

.rwd-table th,
.rwd-table td {
  padding: .5em 1em;
}
@media screen and (max-width: 601px) {
  .rwd-table tr:nth-child(2) {
    border-top: none;
  }
}
@media screen and (min-width: 600px) {
  .rwd-table tr:hover:not(:first-child) {
    background-color: #d8e7f3;
  }
  .rwd-table td:before {
    display: none;
  }
  .rwd-table th,
  .rwd-table td {
    display: table-cell;
    padding: .25em .5em;
  }
  .rwd-table th:first-child,
  .rwd-table td:first-child {
    padding-left: 0;
  }
  .rwd-table th:last-child,
  .rwd-table td:last-child {
    padding-right: 0;
  }
  .rwd-table th,
  .rwd-table td {
    padding: 1em !important;
  }
}


/* THE END OF THE IMPORTANT STUFF */

/* Basic Styling */
body {
  margin: 0;
  padding: 0;
  background: -webkit-linear-gradient(to left, #4B79A1 , #283E51);
  background: linear-gradient(to left, #4B79A1 , #283E51);
}
h1 {
  text-align: center;
  font-size: 2.4em;
  color: #f2f2f2;
}
.container {
  display: block;
  text-align: center;
}
h3 {
  display: inline-block;
  position: relative;
  text-align: center;
  font-size: 1.5em;
  color: #cecece;
}
h3:before {
  content: "\25C0";
  position: absolute;
  left: -50px;
  -webkit-animation: leftRight 2s linear infinite;
  animation: leftRight 2s linear infinite;
}
h3:after {
  content: "\25b6";
  position: absolute;
  right: -50px;
  -webkit-animation: leftRight 2s linear infinite reverse;
  animation: leftRight 2s linear infinite reverse;
}
h2 {
  margin-left: 30px;
}
@-webkit-keyframes leftRight {
  0%    { -webkit-transform: translateX(0)}
  25%   { -webkit-transform: translateX(-10px)}
  75%   { -webkit-transform: translateX(10px)}
  100%  { -webkit-transform: translateX(0)}
}
@keyframes leftRight {
  0%    { transform: translateX(0)}
  25%   { transform: translateX(-10px)}
  75%   { transform: translateX(10px)}
  100%  { transform: translateX(0)}
}

.report_search {
  margin-left: 600px;
  margin-bottom: 20px;
  height: 50px;
}
</style>