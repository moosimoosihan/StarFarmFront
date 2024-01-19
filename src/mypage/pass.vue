<template>
    <main class="form">
        <div class="login-form">
            <div class="logo">
                <img src="../assets/logo.png"></div>

                <div class="one">
                    <input
                        type="password"
                        class="form-control"
                        placeholder="기존 비밀번호"
                        v-model="user_pw"/>
                    <label for="floatingPassword"></label>
                </div>

                <div class="two">
                    <input
                        type="password"
                        class="form-control"
                        placeholder="새 비밀번호"
                        v-model="user_npw"/>
                    <label for="fa floatingPassword"></label>
                </div>

                <div class="three">
                    <input
                        type="password"
                        class="form-control"
                        placeholder="비밀번호 확인"
                        v-model="user_pw_ck"/>
                    <label for="fa floatingPassword"></label>
                <div>
                    <button type="button" class="btn" @click="onSubmitForm">비밀번호 변경</button>
                </div>
            </div>
            <p v-if="user_npw.length<6 && user_npw.length>0" class="error">비밀번호는 6자리 이상입니다.</p>
            <p v-else-if="user_npw!=user_pw_ck" class="error">비밀번호가 다릅니다.</p>
        </div>
    </main>
    </template>
    <script> //230709
    import axios from 'axios';

    export default {
        name: 'pass',
        data() {
            return {
                user_pw: '',          
                user_npw: '',       
                user_pw_ck: '',    
                user_no: ''       
            };
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        methods: {
            // 비밀번호 변경
            onSubmitForm() {
                if (this.user_pw === "" || this.user_npw === "" || this.user_pw_ck === "") {
                    this.$swal("모든 항목을 입력해주세요");
                    return
                }
                if (this.user_npw !== this.user_pw_ck) {
                    this.$swal("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
                    return
                }
                if(this.user_npw.length < 6){
                    this.$swal("비밀번호는 6자리 이상입니다.");
                    return
                }
                axios.post('http://localhost:3000/mypage/pass_process', {
                    user_no: this.user_no,
                    user_pw: this.user_pw,
                    user_npw: this.user_npw,
                    user_pw_ck: this.user_pw_ck
                })
                .then((res) => {
                    if (res.data.message === 'pass_update') {
                        this.$swal("수정이 완료되었습니다");
                        this.$router.push({ path: '/mypage' });
                    } else if (res.data.message === 'pw_ck') {
                        this.$swal("비밀번호가 틀립니다.");
                    } else {
                        this.$swal("알 수 없는 오류가 발생했습니다.");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.$swal("수정에 실패했습니다.");
                });
            },
        }
    };
</script>


<style scoped>
.logo img {
    width: auto;
    height: auto;
    max-width: 300px;
    display: block;
    margin: auto;
    position: relative;
    top: 40px;
}

.login-form {
    width: 400px;
    height: 500px;
    margin: 8% auto;
    border-radius: 30px;
}

.login-form .form-control {
    height: 48px;
    width: 240px;
    font-size: 16px;
    display: inline;
    margin-left: 20%;
    margin-bottom: 10px;
    border: solid 1.5px rgb(230, 230, 230);
    text-align: center;
    border-radius: 8px;
    position: relative;
    top: 90px;
}

input:focus {
    outline: 2px solid #007411;
}

.login-form .one input, .login-form .two input, .login-form .three input{
    position: relative;
    display: flex;
    float: left;
}

.form-control input{
    position: relative;
    left: 0;
    top: 0;
    resize: none;
}

.one .eyes {
    display: inline-block;
    position: relative;
    height: 40px;
    top: 90px;
    width: 30px;
    padding: 10px 8px 0px 8px;
    font-size: 20px;
    cursor: pointer;
    color: #a1a1a1;
    /* border: solid 1px rgb(225, 44, 44); */
}
.two .eyes {
    display: inline-block;
    position: relative;
    height: 40px;
    top: 100px;
    width: 30px;
    padding: 10px 8px 0px 8px;
    font-size: 20px;
    cursor: pointer;
    color: #a1a1a1;
    /* border: solid 1px rgb(225, 156, 44); */
}
.three .eyes {
    display: inline-block;
    position: relative;
    height: 40px;
    top: 110px;
    width: 30px;
    padding: 10px 8px 0px 8px;
    font-size: 20px;
    cursor: pointer;
    color: #a1a1a1;
    /* border: solid 1px rgb(107, 225, 44); */
}

.login-form .btn {
    height: 48px;
    color: white;
    width: 242px;
    font-size: 16px;
    display: inline;
    margin-left: 20%;
    margin-bottom: 40px;
    border: solid 2px rgb(0, 101, 13);
    border-radius: 8px;
    background-color: rgb(0, 104, 26);
    position: relative;
    top: 110px;
}

.login-form .btn:hover {
    cursor: pointer;
}
.error {
    color: red;
    font-size: 12px;
    text-align: center;
}
</style>