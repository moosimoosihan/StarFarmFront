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
        mounted() {

            if (this.user.user_no === '') {
                this.$swal('로그인해주세요');
                this.$router.push({ path: '/login' });
            } else {
                this.user_no = this.user.user_no; 


                axios
                    .get(`http://localhost:3000/mypage/getUserData/${this.user.user_no}`)
                    .then((res) => {
                        if (res.data.length > 0) {
                            this.cat = res.data[0];
                            console.log(this.cat)
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        methods: {
            onSubmitForm() {
                if (this.user_pw === "" || this.user_npw === "" || this.user_pw_ck === "") {
                    this.$swal("모든 항목을 입력해주세요");
                } else if (this.user_npw !== this.user_pw_ck) {
                    this.$swal("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
                } else {
                    axios
                        .post('http://localhost:3000/mypage/pass_process', {
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
                    }
                },
            // 키 아이콘
            oneyes(field) {   
                const passwordInput = document.querySelector(`.${field} input`);
                let isMouseDown = false;

                eyeIcon.addEventListener('mousedown', () => {
                    passwordInput.type = 'text';
                    isMouseDown = true;
                });

                document.addEventListener('mouseup', () => {
                    passwordInput.type = 'password';
                    isMouseDown = false;
                });

                passwordInput.addEventListener('blur', () => {
                    passwordInput.type = 'password';
                    isMouseDown = false;
                });

                passwordInput.addEventListener('focus', () => {
                    if (isMouseDown) {
                        passwordInput.type = 'text';
                    }
                });
            }
        }
    };
</script>


<style scoped>
@font-face {
    font-family: 'GmarketSansMedium';
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff") format('woff');
    font-weight: normal;
    font-style: normal;
}

* {
    padding: 0;
    margin: 0;
}

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
    font-family: 'GmarketSansMedium';
}

input:focus {
    outline: 2px solid #ffc905;
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
    width: 242px;
    font-size: 16px;
    display: inline;
    margin-left: 20%;
    margin-bottom: 40px;
    border: solid 2px rgb(255, 204, 122);
    border-radius: 8px;
    background-color: rgb(255, 210, 107);
    position: relative;
    top: 110px;
    font-family: 'GmarketSansMedium';
}

.login-form .btn:hover {
    cursor: pointer;
}
</style>