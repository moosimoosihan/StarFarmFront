<template>
  <div>
    <div class="report-section">
      <div id="scroll">
        <h2>회원 관리</h2>
        <table class="report-table">
          <thead>
            <tr>
              <th>No</th>
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
      loginUser: {},
      reportUser: {},
      reportUserCount: [],
      userList: [], // 추가: 데이터를 저장할 배열
    };
  },
  created() {
    this.getUser();
    this.fetchUserData(); // 추가: 데이터를 불러오는 메서드 호출
    // this.reportNum();
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async fetchUserData() {
      await axios
        .get('http://localhost:3000/auth/admin/userlist/none')
        .then((response) => {
          this.userList = response.data;
        })
        .catch((error) => {
          console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
        });
        console.log(this.userList);
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
  width: 1700px;
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
  margin-top: 40px;
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