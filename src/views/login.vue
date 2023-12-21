<template>
            <main id="main-holder">
          <h1 id="login-header">로고</h1>
          <div id="login-error-msg-holder">
            <p id="login-error-msg">잘못된 아이디 <span id="error-msg-second-line">비밀번호 입니다.</span></p>
          </div>
          <form id="login-form">
            <input type="text" name="username" id="username-field" class="login-form-field" placeholder="ID(이메일)">
            <input type="password" name="password" id="password-field" class="login-form-field" placeholder="PW">
            <input type="submit" value="Login" id="login-form-submit">
            <input type="submit" value="카카오" id="kakao-form-submit" @click="kakaoLogin">
            <input type="submit" value="네이버" id="naver-form-submit" @click="naverlogin">
            <input type="submit" value="회원가입" id="join-form-submit" @click="gotoSignUp()"><br>
            <input type="submit" value="아이디찾기" id="findid-form-submit">
            <input type="submit" value="비밀번호찾기" id="findpw-form-submit">
          </form>
          </main>
</template>
<script>
  export default {
    name: 'login',
    methods: {
      gotoSignUp() {
        this.$router.push('/login/signup')
      },
      mounted() {
        console.log(this.naverLogin.user);
        this.naverLogin = new window.naver.LoginWithNaverId({
            clientId: "rjOA5xnnAw_fpgrQhrPY",
            callbackUrl: "DTZs9Sc_PhmpMYxpkUfD",
            isPopup: false,
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
                // this.user_id = email

                axios({
                    url: "http://localhost:3000/auth/kakaoLoginProcess",
                    method: "POST",
                    data: {
                        user_id: email,
                        user_nick: nickname
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
                            window.location.href = "http://localhost:8080";
                        })


                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
    },
};
</script>
<style scoped>
/*로그인
*/
html {
    height: 100%;
  }
  body {
    width:100%;
    position:absolute;
    height: 50%;
    font-family: Arial, Helvetica, sans-serif;
    display: grid;
    justify-items: center;
    align-items: center;
  }
  #main-holder {
    width: 50%;
    height: 20%;
    display: grid;
    justify-items: center;
    align-items: center;
    background-color: white;
    border-radius: 7px;
  
  }
  #login-error-msg-holder {
    width: 100%;
    height: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
  }
  
  #login-error-msg {
    width: 23%;
    text-align: center;
    margin: 0;
    padding: 5px;
    font-size: 12px;
    font-weight: bold;
    color: #8a0000;
    border: 1px solid #8a0000;
    background-color: #e58f8f;
    opacity: 0;
  }
  
  #error-msg-second-line {
    display: block;
  }
  
  #login-form {
    align-self: flex-start;
    
    justify-items: center;
    align-items: center;
  }
  
  .login-form-field::placeholder {
    color: #3a3a3a;
  }
  
  .login-form-field {
  
    width: 100%;
    border: none;
    border-bottom: 1px solid #3a3a3a;
    margin-bottom: 10px;
    border-radius: 3px;
    outline: none;
    padding: 0px 0px 10px 10px;
  }
  
  #login-form-submit {
    width: 100%;
    padding: 7px;
    border: none;
    border-radius: 30px;
    color: white;
    font-weight: bold;
    background-color: #1b0b6a;
    cursor: pointer;
    outline: none;
    margin-bottom: 10px;
  }
  
  #kakao-form-submit {
    width: 100%;
    padding: 7px;
    border: none;
    border-radius: 30px;
    color: rgb(160, 121, 3);
    font-weight: bold;
    background-color: #ffff00;
    cursor: pointer;
    outline: none;
    margin-bottom: 10px;
  }
  
  #naver-form-submit {
    width: 100%;
    padding: 7px;
    border: none;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    background-color: #6aee6e;
    cursor: pointer;
    outline: none;
    margin-bottom: 10px;
  }
  
  #join-form-submit {
    width: 100%;
    padding: 7px;
    border: none;
    border-radius: 20px;
    color: white;
    font-weight: bold;
    background-color: #1b0b6a;
    cursor: pointer;
    outline: none;
  }
  
  #findid-form-submit {
    width: 24%;
    padding: 7px;
    border: none;
    background: none;
    color: rgb(136, 136, 136);
    cursor: pointer;
    outline: none;
  }
  
  #findpw-form-submit {
    width: 24%;
    padding: 7px;
    border: none;
    border-radius: 30px;
    background: none;
    color: rgb(136, 136, 136);
    cursor: pointer;
    outline: none;
  }
  
  /*헤더*/
</style>