<template>
  <main id="main-holder">
    <h1 id="login-header" @click="gotoMain()">로고</h1>
    <input type="text" name="username" id="username-field" class="login-form-field" placeholder="ID" v-model="user_id">
    <input type="password" name="password" id="password-field" class="login-form-field" placeholder="PW" v-model="user_pw">
    <input type="submit" value="Login" id="login-form-submit" @click="localLogin()">
    <input type="submit" value="카카오" id="kakao-form-submit" @click="kakaoLogin()">
    <input type="submit" value="네이버" class="naver-form-submit" id="naverIdLogin" @click="naverlogin()">
    <input type="submit" value="회원가입" id="join-form-submit" @click="gotoSignUp()"><br>
    <input type="submit" value="아이디 / 비밀번호 찾기" id="find" @click="goToFind()">
  </main>
</template>
<script>
import axios from 'axios'

  export default {
    name: 'login',
    data() {
      return{
        user_id: '',
        naver_id: '',
        user_pw: '',
        naverLogin: [],
      }
    },
    methods: {
      gotoSignUp() {
        this.$router.push('/login/signup')
      },
      goToFind() {
            this.$router.push({ path: '/login/find' });
      },
      // 로컬 로그인
      localLogin() {
        if(this.user_id == '' || this.user_pw == '') {
          this.$swal("아이디와 비밀번호를 입력해주세요.")
          return
        }
        axios({
          url: "http://localhost:3000/auth/login_process",
          method: "POST",
          data: {
            user_id: this.user_id,
            user_pw: this.user_pw
          },
        })
          .then(res => {
            if (res.data.message == 'undefined_id') {
              this.$swal("존재하지 않는 아이디입니다.")
            } else if (res.data.message == 'incorrect_pw'){
              this.$swal("비밀번호가 일치하지 않습니다.")
            } else {
              this.$store.commit("user", { user_id: this.user_id, user_no: res.data.message })
              this.$swal({
                position: 'top',
                icon: 'success',
                title: '로그인 성공!',
                showConfirmButton: false,
                timer: 1000
                }).then(() => {
                  this.$router.push({ path : '/'});
                })
              }
            })
            .catch(err => {
              console.log(err);
            })
      },
      //카카오 로그인
      kakaoLogin() {
        window.Kakao.Auth.login({
            scope: "profile_nickname, account_email",
            success: this.getKakaoAccount,
        });
      },
      getKakaoAccount() {
        window.Kakao.API.request({
            url: "/v2/user/me",
            success: (res) => {
                const kakao_account = res.kakao_account;
                const email = kakao_account.email; //카카오 이메일
                const nickname = kakao_account.profile.nickname;

                console.log(kakao_account, email, nickname)

                axios({
                    url: "http://localhost:3000/auth/kakaoLoginProcess",
                    method: "POST",
                    data: {
                        user_id: email,
                        user_nick: nickname,
                        accesstoken: res.kakao_account,
                    },
                }).then(res => {
                    if (res.data.message == '저장완료') {
                        this.$swal({
                            position: 'top',
                            icon: 'success',
                            title: '회원가입 성공!',
                            showConfirmButton: false,
                            timer: 1000
                        })
                    }
                    else {
                        this.$store.commit("user", { user_id: email, user_no: res.data.message })
                        this.$swal({
                            position: 'top',
                            icon: 'success',
                            title: '로그인 성공!',
                            showConfirmButton: false,
                            timer: 1000
                        }).then(() => {
                            window.location.href = "http://localhost:8080";
                        })
                    }
                })
                    .catch(err => {
                        console.log(err);
                    })
            },
            fail: (error) => {
                // this.$router.push("/errorPage");
                console.log(error);
            },
        });
      },

        //네이버
        naverlogin() {
            console.log("로그인함수 실행됨")
            axios({
                url: "http://localhost:3000/auth/naverlogin",
                method: "POST",
                data: {
                    // naverlogin: this.naverLogin.accessToken.accessToken,
                    naverlogin: this.naverLogin.user,
                },
            })
                .then(res => {
                    if (res.data.message == '저장완료') {
                        this.$swal({
                            position: 'top',
                            icon: 'success',
                            title: '회원가입 성공!',
                            showConfirmButton: false,
                            timer: 1000
                        });
                    } else {
                        this.$store.commit("user", { user_id: this.naver_id, user_no: res.data.message })
                        this.$swal({
                            position: 'top',
                            icon: 'success',
                            title: '로그인 성공!',
                            showConfirmButton: false,
                            timer: 1000,
                        }).then(() => {
                            window.location.href = "http://localhost:8080/";
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        gotoMain() {
          this.$router.push('/')
        }
    },
    computed: {
        user() {
            return this.$store.state.user; // user 정보가 바뀔 때마다 자동으로 user() 갱신
        },
    },
    mounted() {
        console.log(this.naverLogin.user);
        this.naverLogin = new window.naver.LoginWithNaverId({
            clientId: "DTZs9Sc_PhmpMYxpkUfD",
            callbackUrl: "http://localhost:8080/",
            isPopup: false,
            loginButton: {
              color: "green", type: 1, height: 45
            },
        });
        this.$store.commit("naverLogin", this.naverLogin);

        this.naverLogin.init();

        this.naverLogin.getLoginStatus((status) => {
            if (status) {
                console.log(status);
                console.log(this.naverLogin.user.nickname);

                const email = this.naverLogin.user.email;
                const id = this.naverLogin.user.id;
                const nick = this.naverLogin.user.nickname;

                this.naver_id = id;
                console.log(email)
                console.log(nick)

            } else {
                console.log("callback처리 실패");
            }
        });
      },
};
</script>
<style scoped>
/*로그인
*/
html {
    height: 100%;
  }

#login-header{
  margin-left: 30%;
  width: 40%;
  text-align: center;
  margin-top: 50px;
}

#main-holder {
    display: grid;
    width: 400px;
    height: 450px;
    margin: 6% auto;
    border: solid 2px rgb(237, 237, 237);
    border-radius: 30px;
}

  .login-form-field {
    height: 30px;
    width: 350px;
    border: none;
    border-bottom: 1px solid #3a3a3a;
    margin-bottom: 10px;
    border-radius: 3px;
    outline: none;
    margin-left: 20px;
  }
  
  #login-form-submit {
    width: 350px;
    padding: 7px;
    border: none;
    border-radius: 30px;
    color: white;
    font-weight: bold;
    background-color: #1b0b6a;
    cursor: pointer;
    outline: none;
    margin-bottom: 20px;
    margin-left: 20px;
  }
  
  #kakao-form-submit {
    width:  350px;
    padding: 7px;
    border: none;
    border-radius: 30px;
    color: rgb(160, 121, 3);
    font-weight: bold;
    background-color: #ffff00;
    cursor: pointer;
    outline: none;
    margin-bottom: 20px;
    margin-left: 20px;
  }
  
  .naver-form-submit {
    width: 350px;
    padding: 7px;
    border: none;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    background-color: #6aee6e;
    cursor: pointer;
    outline: none;
    margin-bottom: 20px;
    margin-left: 20px;
  }
  
  #join-form-submit {
    width:  350px;
    padding: 7px;
    border: none;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    background-color: #1b0b6a;
    cursor: pointer;
    outline: none;
    margin-bottom: 7px;
    margin-left: 20px;
  }
  
  #find {
    width: 100%;
    text-align: center;
    border: none;
    background: none;
    color: rgb(136, 136, 136);
    cursor: pointer;
    outline: none;
  }
  #login-header {
    text-align: center;
    margin-bottom: 50px;
  }
  /*헤더*/
</style>