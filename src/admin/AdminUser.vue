<template>
  <div>
    <div class="report-section">
      <div id="scroll">
        
        <div class="id_search">
          <h2>회원 관리</h2>
          <span>검색할 ID : </span>
          <input type="text" placeholder="아이디를 입력하세요" v-model="search_id" />
          <button @click="searchID(sort)">검색</button>
          <select v-model="sort" @change="search_id!='' ? searchID(sort) : fetchUserData(sort)">
            <option value="DESC">최신순</option>
            <option value="ASC">오래된순</option>
          </select>
        </div>
        <table class="rwd-table">
          <thead>
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>닉네임</th>
              <th>이메일</th>
              <th>계정상태</th>
              <th>신고당한횟수</th>
              <th>가입일시</th>
              <th>보기</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(us, index) in userList" :key="index">
              <td>{{ us.USER_NO }}</td>
              <td>{{ us.USER_ID }}</td>
              <td>{{ us.USER_NICK }}</td>
              <td>{{ us.USER_EMAIL }}</td>
              <td>{{ us.USER_BAN === 0 ? '정상' : '정지' }}</td>
              <td>{{ reportUserCount[index] }}</td>
              <td>{{ formatDateTime(us.USER_CREATE_DT) }}</td>
              <td>
              <button class="view-button" @click="userStateChange(index, us.USER_NO)">
                  {{ us.USER_BAN === 0 ? '정지' : '해제' }}
              </button>
              </td>
             </tr>
             <tr v-if="userList.length === 0">
               <td colspan="8">회원이 없습니다.</td>
              </tr>
          </tbody>
        </table>
      </div>
      <div class="page_container">
        <button v-if="page>0" class="pageNum" @click="prev()">이전</button>
        <button v-for="(num, i) in pageCount" :key="i" class="pageNum" @click="getAddPage(i)">{{i+1}}</button>
        <button v-if="page<(pageCount-1)" class="pageNum" @click="next()">다음</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loginUser: {},
      reportUser: {},
      reportUserCount: [],
      userList: [], // 추가: 데이터를 저장할 배열

      search_id: '',
      sort: 'DESC',
    };
  },
  created() {
    this.getUser();
    this.fetchUserData(this.sort); // 추가: 데이터를 불러오는 메서드 호출
    // this.reportNum();
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async fetchUserData(sort) {
      await axios
        .get(`http://localhost:3000/auth/admin/userlist/none/${sort}`)
        .then((response) => {
          this.userList = response.data;
        })
        .catch((error) => {
          console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
        });
        for(let i = 0; i < this.userList.length; i++){
          const response = await axios.get(`http://localhost:3000/auth/report_count/${this.userList[i].USER_NO}`);
          if(response.data[0] === undefined || response.data[0] === null){
            this.reportUserCount.push(0);
          } else {
            this.reportUserCount.push(response.data[0].count);
          }
        } 
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
    async getUserPage(num) {
      try {
        const response = await axios.get(`http://localhost:3000/goods/allGoodsPage/${num}`);
        this.productListPage = response.data;
        this.page = num;
        console.log(this.page)
      } catch (error) {
        console.log(error);
      }
      this.pageCount = Math.ceil(this.productList.length/10);
    },
    async userStateChange(index,no) {
      try {
        const response = await axios({
          url:`http://localhost:3000/auth/admin/ban`,
          method: 'put',
          data: {
            user_no: no,
            user_ban: this.userList[index].USER_BAN === 0 ? 1 : 0,
          },
        });
        this.fetchUserData();
      } catch (error) {
        console.log(error);
      }
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
    async searchID(sort){
      try {
        const response = await axios.get(`http://localhost:3000/auth/admin/userlist/${this.search_id}/${sort}`);
        this.userList = response.data;
      } catch (error) {
        console.log(error);
      }
      this.reportUserCount = [];
      for(let i = 0; i < this.userList.length; i++){
          const response = await axios.get(`http://localhost:3000/auth/report_count/${this.userList[i].USER_NO}`);
          if(response.data[0] === undefined || response.data[0] === null){
            this.reportUserCount.push(0);
          } else {
            this.reportUserCount.push(response.data[0].count);
          }
      }
    }
  },
};
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

.id_search {
  margin-left: 600px;
  margin-bottom: 20px;
  height: 50px;
}
</style>