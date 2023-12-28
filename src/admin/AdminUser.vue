<template>
  <div>
    <div class="report-section">
      <div id="scroll">
        <h2>회원 관리</h2>
        <table class="report-table">
          <thead>
            <tr>
              <th>No</th>
              <th>닉네임(이메일)</th>
              <th>계정상태</th>
              <th>신고당한횟수</th>
              <th>가입일시</th>
              <th>보기</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{item.nicknameEmail}}</td>
              <td>{{ item.userState }}</td>
              <td>{{ item.reportNum}}</td>
              <td>{{ item.date }}</td>
            
              <td><button class="view-button" @click="handleButtonClick(index, item.userState)">{{ item.userState === '정지' ? '해제' : '정지' }}
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
         export default {
            data() {
            return {
             items: [
          {
         nicknameEmail:'코트',
         userState:'정지',
         reportNum:102,
         date: '2023-01-01',
          },
          {
          nicknameEmail:'초콜릿',
          userState:'활성',
          reportNum:0,
          date:'2023-01-01',
          },
          {
          nicknameEmail:'감자',
          userState:'활성',
          reportNum:0,
          date:'2023-01-01',
          }, 
           {
          nicknameEmail:'춘식이',
          userState:'활성',
          reportNum:0,
          date:'2023-01-01',
          }, 
           {
          nicknameEmail:'라이언',
          userState:'활성',
          reportNum:0,
          date:'2023-01-01',
          }, 
             ],
            };
           },
    methods: {
    handleButtonClick(index, userState) {
      // 정지/해제 버튼 클릭 시 처리 로직
      console.log(`Handle button click for item at index ${index}, userState: ${userState}`);
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