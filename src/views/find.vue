<template>
    <main class="form">
        <div class="tabListArea">
            <ul class="tabList">
                <li role="tab" id="tab1" @click="handleTabClick('idbtn')" :class="{ active: isTabActive('idbtn') }">
                    <button type="button" class="idbtn">아이디 찾기</button>
                </li>
                <hr>
                <li role="tab" id="tab2" @click="handleTabClick('pwbtn')" :class="{ active: isTabActive('pwbtn') }">
                    <button type="button" class="pwbtn">비밀번호 찾기</button>
                </li>
            </ul>
        </div>
        <div class="formContainer">
            <div class="idform" v-show="isTabActive('idbtn')">
                <div class="one">
                    <input type="email" class="form-control" placeholder="가입했던 이메일" v-model="user_email" />
                    <label for="floatingPassword"></label>
                    <button type="button" class="sendbtn" @click="findID()">아이디 찾기</button>
                </div>

                <div v-if="response_id_check" class="response">
                    <p class="idp">아이디는 {{ search_user_id }}입니다. </p>
                </div>

                <div>
                    <button type="button" class="btn" @click="goToLogin">로그인</button>
                </div>
            </div>

            <div class="pwform" v-show="isTabActive('pwbtn')">
                <div class="two">
                    <input type="test" class="form-control" placeholder="아이디" v-model="user_id" />
                    <label for="floatingPassword"></label>
                </div>

                <div class="three">
                    <input type="email" class="form-control" placeholder="가입했던 이메일" v-model="user_email" />
                    <label for="fa floatingPassword"></label>
                    <button type="button" class="sendbtn" @click="findPW()">비밀번호 찾기</button>
                </div>

                <div v-if="response_pw_check" class="response">
                    <p>임시 비밀번호는 {{ user_pw }} 입니다.</p><br>
                        <p>로그인 후 꼭 변경해주세요.</p>
                </div>

                <div>
                    <button type="button" class="btn" @click="goToLogin">로그인</button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            activeTab: 'idbtn',     // 초기에 보여질 탭 버튼
            user_email: '',
            user_id: '',            // password 변경 용 입력한 아이디
            user_pw: '',
            search_user_id: '',     // id 찾기로 받은 아이디
            response_id_check: false,
            response_pw_check: false,
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    methods: {//로그인페이지
        goToLogin() {
            this.$router.push({ path: '/login' });
        },
        handleTabClick(tab) {
            this.activeTab = tab; // 클릭한 탭 버튼으로 activeTab 값을 업데이트
        },
        isTabActive(tab) {
            return this.activeTab === tab; // 현재 활성화된 탭인지 확인하는 메서드
        },
        mounted() {  // 선택된 탭 버튼의 텍스트 색상 변경
            const selectedTab = document.querySelector(`${this.activeTab} button`);
            if (selectedTab) {
                selectedTab.style.color = '#cc8c00';
            }
        },
        findID() {
            if (this.user_email === '') {
                this.$swal('이메일을 입력해주세요');
            } else if (!this.isValidEmail(this.user_email)) {
                this.$swal('유효한 이메일을 입력해주세요');
            } else {
                axios.post('http://localhost:3000/auth/findId',
                    { user_email: this.user_email }
                ).then((res) => {
                    if (res.data.message === 'user_email') {
                        this.search_user_id = res.data.user_id;
                        this.response_id_check = true;
                    } else {
                        this.$swal('알 수 없는 오류가 발생했습니다.');
                    }
                })
                    .catch((error) => {
                        console.log(error);
                        this.$swal('해당 이메일이 없습니다.');
                        // 이메일 전송 실패 시 처리할 작업 수행
                    });
            }
        },
        //비밀번호 찾기
        findPW() {
            if (this.user_id === '' || this.user_email === '') {
                this.$swal('아이디와 이메일을 입력해주세요');
            } else if (!this.isValidEmail(this.user_email)) {
                this.$swal('유효한 이메일을 입력해주세요');
            } else {
                axios
                    .post('http://localhost:3000/auth/find_pass', {
                        user_id: this.user_id,
                        user_email: this.user_email
                    })
                    .then((res) => {
                        this.user_pw = res.data.message;
                        this.response_pw_check = true;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.$swal('정보 확인에 실패했습니다.');
                    });
            }
        },
        isValidEmail(email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        }
    }
}
</script>
<style scoped="scoped">
* {
    margin: 0;
    padding: 0;
}

li,
ul {
    list-style: none;
}

a {
    text-decoration: none;
}

@font-face {
    font-family: 'GmarketSansMedium';
    font-family: 'GmarketSansBold';
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff") format('woff');
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff") format('woff');
    font-weight: normal;
    font-style: normal;
}

.form [type="button"],
.form input {
    font-family: GmarketSansMedium;
}

.form {
    /* 전체 폼 스타일 */
    display: grid;
    width: 400px;
    height: 500px;
    margin: 6% auto;
    border: solid 2px rgb(237, 237, 237);
    /* background-color: #fcf9db; */
    /* background: linear-gradient(180deg, rgb(253, 238, 204), rgb(253, 245, 221));*/
    background-color: rgb(26, 26, 226);
    box-shadow: 0 1px 30px 2px rgb(238, 238, 238);
    border-radius: 30px;
}

.tabListArea {
    height: 60px;
}

.form .tabListArea .tabList {
    /* 탭 리스트 스타일 */
    display: flex;
}

.form .tabListArea .tabList li {
    width: 200px;
    height: 60px;
}

.form .tabListArea .tabList .idbtn,
.form .tabListArea .tabList .pwbtn {
    padding: 18px 0;
    width: 100%;
    font-size: 1rem;
    color: #fefefe;
    margin: 0 auto;
    border: none;
    background: none;
}

.form .tabListArea .tabList .idbtn:hover,
.form .tabListArea .tabList .pwbtn:hover {
    color: #0f00b4;
}

.form .tabListArea #tab1 {
    border-radius: 30px 0 0 0;
}

.form .tabListArea #tab2 {
    border-radius: 0 30px 0 0;
}

hr {
    height: 60px;
    border: 1px solid rgb(239, 219, 170);
}

.tabList li.active {
    /* 활성화된 탭 아이템 스타일 */
    color: #505cff;
    background-color: #2b84ff;
}

.formContainer {
    /* 폼 컨테이너 스타일 */
    position: relative;
    display: grid;
    height: 360px;
    top: -40px;
}

.idform {
    /* 아이디 찾기 폼 스타일 */
    width: 400px;
    height: 440px;
    margin: 0;
    padding: 0;
    border-radius: 0 0 30px 30px;
}

.pwform {
    /* 비밀번호 찾기 폼 스타일 */
    width: 400px;
    height: 440px;
    margin: 0;
    padding: 0;
    border-radius: 0 0 30px 30px;
}

.formContainer input {
    height: 48px;
    width: 220px;
    font-size: 16px;
    border: solid 2px rgb(237, 237, 237);
    border-radius: 8px;
    padding-left: 18px;
    margin: 60px 10px 0 30px;
}

.three input {
    margin-top: 10px;
}

.formContainer input::placeholder {
    color: #aaa;
}

.sendbtn {
    padding: 14px 8px;
    border-radius: 8px;
    color: #888;
    background-color: #f2f2f2;
    border: 2px solid rgb(221, 221, 221);
}

.sendbtn:hover {
    cursor: pointer;
    background-color: #e6e6e6;
}

p{
    font: bold;
    font-size: 1.2rem;
    text-align: center;
    padding-top: 30px;
    color: #0095ff;
}

.formContainer .idform .response .idp{
    font: bold;
    font-size: 1.2rem;
    text-align: center;
    padding-top: 30px;
    color: #0051ff;
}

p:nth-last-child(1){
    font: bold;
    font-size: 1.4rem;
    text-align: center;
    padding-top: 0px;
    margin: 0;
    color: #cc3d00;
    /* border: 1px solid red; */
}
.btn {
    height: 48px;
    width: 242px;
    position: absolute;
    display: inline;
    bottom: 0;
    left: 20%;
    font-size: 16px;
    border-radius: 8px;
    color: #fefefe;
    border: solid 2px rgb(255, 255, 255);
    background-color: rgb(71, 114, 255);
}

.btn:hover {
    cursor: pointer;
}

input:focus {
    outline: 2px solid #ffc905;
}</style>