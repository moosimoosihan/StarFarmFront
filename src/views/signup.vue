<template>
  <div class="container">
    <div class="title">
      <h1 style="font-size: 21px;">회원가입</h1>
    </div>
      <div id="box1">
        <div class="id">
          <input id="id" type="text" v-model="user_id" placeholder="id를 입력해 주세요.">
          <button>중복확인</button>
        </div>
        <div class="nickName">
          <input id="nickName" type="text" v-model="user_nick" placeholder="닉네임을 입력해 주세요.">
        </div>
        <div class="email">
          <input id="email" type="text"  v-model="user_email" placeholder="이메일을 입력해 주세요.">
        </div>
        <div class="password">
          <input id="password" type="password"  v-model="user_pw" placeholder="비밀번호를 입력해 주세요.">
        </div>
        <div class="passwordCheck">
          <input id="passwordCheck" type="password"  v-model="user_pw_ck" placeholder="비밀번호를 다시 입력해 주세요.">
        </div>
        <div class="phone">
          <input id="phone" type="text" placeholder="-를 뺀 전화번호를 입력해 주세요." v-model="user_mobile" maxlength="11" @input="validatePhoneNumber()"> 
        </div>
        <div class="address">
          <span v-show="zipinput" class="addinput1">{{ user_zipcode }}</span>
          <span v-show="zipinput" class="addinput2">{{ user_adr1 }}</span>
          <button id="addressButton" v-on:click="zipload()">주소찾기</button>
          <div>
            <input id="addressDetail" type="text" placeholder="상세주소를 입력해 주세요." v-model="user_adr2"> 
          </div>
        </div>
      </div>
      
      <div id="box2">
        <div class="profile-upload-content upload-img">
          <div class="img-preview">
            <img id="img-preview" src="" style="display: none" width="250" alt="미리보기" />
            <input id="img-url" type="hidden" name="url" />
          </div>
        </div>
        <div class="profile-img">
          <input id="profile-img" type="text" placeholder="이미지" v-model="user_img"><br><br>
          <button class="imgButton">사진등록</button>
        </div>
      </div>

      <div id="box3">
        <div class="signUp">
          <button class="cancelButton" @click="gotoLogin()">취소하기</button>
          <input type="submit" class="signUpButton" @click="onSubmitForm()" value="가입하기">
        </div>
      </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data () {
    return{
      user_id: '',
      user_nick: '',
      user_email: '',
      user_pw: '',
      user_img: '',
      user_mobile: '',
      user_zipcode: '',
      user_adr1: '',
      user_adr2: '',

      user_pw_ck: '',
      zipinput: false,
    }
  },
  methods: {
    onSubmitForm() {
            if (!this.validationCheck()) {
                return;
            }
            console.log(this.user_id, this.user_email, this.user_nick, this.user_pw, this.user_mobile, this.user_zipcode, this.user_adr1, this.user_adr2);
            axios({
                url: "http://localhost:3000/auth/join_process/",
                method: "POST",
                data: {
                    user_id: this.user_id,
                    user_email: this.user_email,
                    user_nick: this.user_nick,
                    user_pw: this.user_pw,
                    // user_img: this.user_img,
                    // user_social_tp: 0,
                    // user_accesstoken: '',
                    // user_tp: 0,
                    user_mobile: this.user_mobile,
                    user_zipcode: this.user_zipcode,
                    user_adr1: this.user_adr1,
                    user_adr2: this.user_adr2,
                },
            })
                .then(res => {
                    if (res.data.message == 'already_exist_id') {
                        this.$swal("이미 존재하는 아이디입니다.")
                    }
                    else if (res.data.message == 'DB_error') {
                        this.$swal("DB 에러 발생")
                    }
                    else {
                        this.$swal({
                            position: 'top',
                            icon: 'success',
                            title: '회원가입이 완료되었습니다!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        this.$router.push({ path: '/login' }); // 로그인 화면으로 이동
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        zipload() {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var addr = ''; // 주소 변수
                    var extraAddr = '';
                    //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        addr = data.roadAddress;
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                    }
                    // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                    if (data.userSelectedType === 'R') {
                        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            // addr += ' ';
                            extraAddr += data.bname;
                        }
                        // 건물명이 있고, 공동주택일 경우 추가한다.
                        if (data.buildingName !== '' && data.apartment === 'Y') {
                            // addr += ' ';
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                    }
                    this.user_zipcode = data.zonecode;
                    this.user_adr1 = addr;
                    this.user_adr2 = extraAddr;
                    this.zipinput = true;
                }
            }).open();
        },
        validationCheck() {
            if (this.user_id == "") {
                this.$swal("아이디를 입력하세요.");
                return false;
            }

            if (this.user_nick == "") {
                this.$swal("닉네임을 입력하세요.");
                return false;
            }

            if (this.user_email == "") {
                this.$swal("이메일 주소를 입력하세요.");
                return false;
            }

            if (this.user_pw == "") {
                this.$swal("비밀번호를 입력하세요.");
                return false;
            }

            if (this.user_pw_ck !== this.user_pw) {
                this.$swal("비밀번호가 일치하지 않습니다.");
                return false;
            }

            if (this.user_mobile == "") {
                this.$swal('전화번호를 정확히 입력해주세요.');
                return false;
            }

            if (!this.zipinput) {
                this.$swal("우편번호를 입력하세요.");
                return false;
            }
            return true;
        },
        validatePhoneNumber() {
            this.user_mobile = this.user_mobile.replace(/\D/g, ''); // 숫자 이외의 문자 제거
        },
        gotoLogin() {
          this.$router.back();
        }
  }
}
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.container {
    width: 800px;
    height: 700px;
    border: 1px solid black;
    margin: 6% auto;
    border-radius: 30px;
}

div {
    padding-top: 20px;
    
}


.title {
    text-align: center;
    font-weight: 700;
    margin-top: 10px;
}

.signUpButton {
    width:300px;
    cursor:pointer;
}
#addressButton {
    margin-left: 20px;
}
.addinput1 {
  margin-left: 13px;
  border: none;
  background: none;
  padding: 10px;
  font-weight: 700;
  transition: .2s;
  width: 75%;
}
.addinput2:first {
  border: none;
  background: none;
  padding: 10px;
  font-weight: 700;
  transition: .2s;
  width: 75%;
}
.cancelButton {
    width:300px;
    cursor:pointer;
}

button{
    cursor: pointer;
    height: 40px;
    width: 70px;
    margin-left:10px;
}
.signUp button {
    margin-left: 80px;
}

input {
    margin-left: 20px;
    width:300px;
    border: 2px solid black;
    border-radius: 7px;
    line-height: 35px;
    font-size: 12px;
    padding-left: 10px;
}

#addressDetail {
    margin-left: 20px;
    width: 430px;
    border: 2px solid black;
    border-radius: 3px;
    line-height: 35px;
    font-size: 12px;
    padding-left: 10px;
    padding-right: 10px;
}

#box1 {
    width: 400px;
    height: 500px;
    float: left;
}


#box2 {
  width: 300px;
  height: 400px;
  float: right;
}
#box3 {
  width: 1000px;
  height: 50px;
  float: left;
}

#profile-img {
        width: 200px;
        height: 200px; 
        border-radius: 70%;
        overflow: hidden;
        text-align: center;
        margin-top: 30px;
        margin-right: 200px;
    }

    .imgButton {
        margin-left: 84px;
        margin-top: 10px;
    }
</style>