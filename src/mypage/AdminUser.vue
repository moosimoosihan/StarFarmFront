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
                    <th>닉네임(이메일)</th>
                    <th>계정상태</th>
                    <th>신고당한횟수</th>
                    <th>가입일시</th>
                    <th>보기</th>
                  </tr>
                </thead>
                <tbody>
          <tr v-for="(report, index) in reports" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ nickname.Email }}</td>
              <td>{{ item.userState }}</td>
              <td>{{ item.reportNum}}</td>
              <td>{{ item.date }}</td>
              <td>{{ item.look }}</td>
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
        export default{
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
