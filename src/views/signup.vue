<template>
  <div class="container">
    <div class="logo">
        <img src="../assets/logo.png" @click="gotoMain()">
    </div>

      <div id="box1">
        <div class="id">
          <span class="s">아이디</span>
          <input id="id" type="text" v-model="user_id" placeholder="id를 입력해 주세요." @input="id_check()">
          <p class="alert_font" v-if="id_check_bool==1" style="color:red;">중복된 아이디입니다.</p>
          <p class="alert_font" v-else-if="id_check_bool==2" style="color:red;">DB 에러 발생</p>
          <p class="alert_font" v-else-if="id_check_bool==3">사용 가능한 아이디입니다.</p>
          <p class="alert_font" v-else >&nbsp;</p>
        </div>
        <div class="nickName">
          <span class="s">닉네임</span>
          <input id="nickName" type="text" v-model="user_nick" placeholder="닉네임을 입력해 주세요.">
          <p class="alert_font">&nbsp;</p>
        </div>
        <div class="email">
          <span class="s">이메일</span>
          <input id="email" type="text"  v-model="user_email" placeholder="이메일을 입력해 주세요." @input="email_check()">
          <p class="alert_font" v-if="email_check_bool==1" style="color:red;">사용할 수 없는 이메일입니다.</p>
          <p class="alert_font" v-else-if="email_check_bool==2">사용 가능한 이메일입니다.</p>
          <p class="alert_font" v-else >&nbsp;</p>
        </div>
        <div class="password">
          <span class="s">비밀번호</span>
          <input id="password" type="password"  v-model="user_pw" placeholder="비밀번호를 입력해 주세요.">
          <p class="alert_font">&nbsp;</p>
        </div>
        <div class="passwordCheck">
          <span class="s">비밀번호 확인</span>
          <input id="passwordCheck" type="password"  v-model="user_pw_ck" placeholder="비밀번호를 다시 입력해 주세요.">
          <p class="alert_font" v-if="user_pw_ck!==user_pw" style="color:red;">비밀번호가 일치하지 않습니다.</p>
          <p class="alert_font" v-else >&nbsp;</p>
        </div>
        <div class="phone">
          <span class="s">전화번호</span>
          <input id="phone" type="text" placeholder="-를 뺀 전화번호를 입력해 주세요." v-model="user_mobile" maxlength="11" @input="validatePhoneNumber(), mobile_check()">
          <p class="alert_font" v-if="phone_check_bool==1" style="color:red;">사용할 수 없는 전화번호입니다.</p>
          <p class="alert_font" v-else-if="phone_check_bool==2" style="color:red;">DB 에러 발생</p>
          <p class="alert_font" v-else-if="phone_check_bool==3">사용 가능한 전화번호입니다.</p>
          <p class="alert_font" v-else >&nbsp;</p>
        </div>
        <div class="address">
          <span class="s">주소</span>
          <button id="addressButton" v-on:click="zipload()">주소찾기</button>
          <input v-model="user_adr1" class="addinput2" placeholder="주소"/>
          <input v-model="user_zipcode" class="addinput1" placeholder="우편번호"/>
          <div class="addressDetail">
            <input id="addressDetail" type="text" placeholder="상세주소를 입력해 주세요." v-model="user_adr2"> 
          </div>
        </div>
      </div>
      
      <div id="box2">
        <p class="s">프로필 사진</p>
        <div class="profile-upload-content upload-img">
          <div class="profile-img">
            <img v-if="user_img_src!=''" id="img-preview" :src="user_img_src" alt="미리보기" />
            <img v-else id="img-preview_default" src="../assets/profile.png" alt="미리보기" />
          </div>
          <input id="profile-img" type="file" placeholder="이미지" @change="uploadFile($event.target.files)">
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

      user_img_src: '',

      // 실시간 확인 데이터
      id_check_bool: 0,
      email_check_bool: 0,
      phone_check_bool: 0,
    }
  },
  methods: {
    onSubmitForm() {
            if (!this.validationCheck()) {
                return;
            }
            console.log(this.user_id, this.user_email, this.user_nick, this.user_pw, this.user_mobile, this.user_zipcode, this.user_adr1, this.user_adr2, this.user_img);            
            axios({
                url: "http://localhost:3000/auth/join_process",
                method: "POST",
                data: {
                    user_id: this.user_id,
                    user_email: this.user_email,
                    user_nick: this.user_nick,
                    user_pw: this.user_pw,
                    // user_social_tp: 0,
                    // user_accesstoken: '',
                    // user_tp: 0,
                    user_mobile: this.user_mobile,
                    user_zipcode: this.user_zipcode,
                    user_adr1: this.user_adr1,
                    user_adr2: this.user_adr2,

                    user_img: this.user_img,
                },
            })
                .then(res => {
                    if (res.data.message == 'already_exist_id') {
                        this.$swal("이미 존재하는 아이디입니다.")
                    }
                    else if (res.data.message == 'DB_error') {
                        this.$swal("DB 에러 발생")
                    }
                    if (res.data.message == 'already_exist_phone') {
                        this.$swal("이미 존재하는 전화번호입니다.")
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
                }
            }).open();
        },
        gotoMain() {
          this.$router.push('/')
        },
        validationCheck() {
            if (this.user_id == "") {
                this.$swal("아이디를 입력하세요.");
                return false;
            }
            // 아이디가 한글인 경우 제외
            if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(this.user_id)) {
                this.$swal("아이디에는 한글을 사용할 수 없습니다.");
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

            if (this.user_adr1=="" && this.user_adr2=="" && this.user_zipcode=="") {
                this.$swal("주소를 입력하세요.");
                return false;
            }
            return true;
        },
        validatePhoneNumber() {
            this.user_mobile = this.user_mobile.replace(/\D/g, ''); // 숫자 이외의 문자 제거
        },
        gotoLogin() {
          this.$router.back();
        },
        async uploadFile(file) {
                let name = "";
                if (file) {
                    name = file[0].name;
                }
                else {
                    return;     // 파일 미선택 시 반환
                }

                const formData = new FormData();
                
                formData.append('img', file[0]);

                this.user_img_src = URL.createObjectURL(file[0]);

                for (let key of formData.keys()) {
                    console.log(key, ":", formData.get(key));
                }
                try {
                    axios({
                        url: `http://localhost:3000/auth/upload_img`,
                        method: 'POST',
                        headers: {'Content-Type': 'multipart/form-data'},
                        data: formData
                    })
                        .then ((res) => {
                            if (res.data.message == 'success'){
                                this.user_img = name;
                            }
                            else {
                                this.$swal("DB 에러");
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        })
                    return true;

                } catch(err){
                    console.log(err);
                    return false;
                }
            },
            deleteImage(id,name){
                this.$swal.fire({
                    title:'정말 삭제하시겠습니까?',
                    showCancelButton: true,
                    confirmButtonText: `삭제`,
                    cancelButtonText: `취소`
                }).then(async (result) => {
                    if(result.isConfirmed){
                      await axios({
                            url:'/auth/imageDelete',
                            method:'POST',
                            data:{
                                id:id,
                                name:name
                            }
                        })
                        this.$swal.fire('삭제되었습니다.','','success')
                    }
                })
            },
            id_check() {
                if(this.user_id == "") {
                    this.id_check_bool = 0;
                    return;
                }
                // 아이디에 특수문자, 공백, 한글 입력 불가
                this.user_id = this.user_id.replace(/[^a-z0-9]/gi,'');
                axios({
                    url: "http://localhost:3000/auth/id_check",
                    method: "POST",
                    data: {
                        user_id: this.user_id,
                    },
                })
                    .then(res => {
                        console.log(res.data.message);
                        if (res.data.message == 'already_exist_id') {
                            this.id_check_bool = 1;
                            return;
                        }
                        else if (res.data.message == 'DB_error') {
                            this.id_check_bool = 2;
                            return;
                        }
                        else {
                            this.id_check_bool = 3;
                            return;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    
                })
            },
            email_check() {
                if(this.user_email == "") {
                    this.email_check_bool = 0;
                    return;
                }
                // 이메일에  @와 .을 제외한 특수문자, 공백, 한글 입력 불가
                this.user_email = this.user_email.replace(/[^a-z0-9@.]/gi,'');
                // 이메일이 영어@영어.영어 가 아닌 경우
                if(!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(this.user_email)) {
                    this.email_check_bool = 1;
                    return;
                }
                this.email_check_bool = 2;
            },
            mobile_check() {
                if(this.user_mobile == "") {
                    this.phone_check_bool = 0;
                    return;
                }
                axios({
                    url: "http://localhost:3000/auth/mobile_check",
                    method: "POST",
                    data: {
                        user_mobile: this.user_mobile,
                    },
                })
                    .then(res => {
                        console.log(res.data.message);
                        if (res.data.message == 'already_exist_phone') {
                            this.phone_check_bool = 1;
                            return;
                        }
                        else if (res.data.message == 'DB_error') {
                            this.phone_check_bool = 2;
                            return;
                        }
                        else {
                            this.phone_check_bool = 3;
                            return;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    
                })
            },
  }
}
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.logo {
  margin-left: 300px;
}  
.logo img {
    width: 200px;
    height: 85px;
}
.container {
    width: 800px;
    height: 800px;
    margin: 6% auto;
    border-radius: 30px;
    border: 2px solid rgb(221, 221, 221);
}
div {
    padding-top: 20px;
}
#img-preview{
    width: 200px;
    height: 200px;
}
#img-preview_default{
    width: 200px;
    height: 200px;
    margin-top: -20px;
}
.signUp {
    width: 700px;
}
.signUpButton {
    width:300px;
    cursor:pointer;
}
#addressButton {
    color: rgb(123, 123, 123);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
    cursor: pointer;
    float: right;
}
.cancelButton {
    width:300px;
    cursor:pointer;
    color: rgb(123, 123, 123);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
}
#box1 .address .addressDetail input {
    float:right;
    width: 300px;
    line-height: 35px;
    font-size: 12px;
    color: rgb(137, 137, 137);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
    margin-left: 30px;
    margin-top:10px;
}
#box1 .address .addinput1 {
    float:right;
    margin-left: 10px;
    width: 60px;
    line-height: 35px;
    font-size: 12px;
    color: rgb(137, 137, 137);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
}
#box1 .address .addinput2 {
    float:right;
    margin-left: 10px;
    width: 150px;
    line-height: 35px;
    font-size: 12px;
    color: rgb(137, 137, 137);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
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

.signUp input {
    color: rgb(123, 123, 123);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
    cursor: pointer;
}
.signUp input:hover {
    color: rgb(0, 0, 0);
    border: 2px solid rgb(253, 217, 249);
    background-color: rgb(255, 236, 253);
    border-radius: 10px;
    cursor: pointer;
}

#box1 input {
    margin-left: 10px;
    width:300px;
    line-height: 35px;
    font-size: 12px;
    padding-left: 10px;

    float: right;
    color: rgb(137, 137, 137);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
}

#box3 input {
    margin-left: 10px;
    width:300px;
    line-height: 35px;
    font-size: 12px;
    padding-left: 10px;
    
    float: right;
    color: rgb(137, 137, 137);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
}

#addressDetail {
    margin-left: 10px;
    width: 430px;
    color: rgb(137, 137, 137);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 3px;
    line-height: 35px;
    font-size: 12px;
    padding-left: 10px;
    padding-right: 10px;
    float: right;
}

#box1 {
    width: 400px;
    height: 500px;
    float: left;
}


#box2 {
  margin-top: 50px;
  width: 300px;
  height: 400px;
  float: right;
}
#box3 {
  margin-top: 50px;
  width: 1000px;
  height: 50px;
  float: left;
}

.profile-img {
  width: 200px;
  height: 200px;
  text-align: center;
  border-radius: 70%;
  overflow: hidden;
  border: 2px solid rgb(221, 221, 221);
}
.alert_font{
    font-size: 10px;
    margin-left: 180px;
}
input:focus {
    /* border: 2px solid #ffc905; */
    outline: 2px solid rgb(255, 236, 253);
}
.s {
    margin-left: 20px;
    font-size: 12px;
    font-weight: bold;
}
</style>