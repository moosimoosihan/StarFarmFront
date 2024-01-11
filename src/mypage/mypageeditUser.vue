<template>
    <main>

        <div class="container">
            <h2>내 정보 수정</h2>
            <div class="form">
                <label class="te">닉네임</label>
                <div class="in">
                    <input type="text" class="form-control" placeholder="닉네임" v-model="loginUser.user_nick" />

                <div class="profile-upload-content upload-img">
                <div class="profile-img">
                    <img v-if="loginUser.user_img" id="img-preview" :width="200" :src="require(`../../../StarFarmBack/uploads/userImg/${loginUser.user_no}/${loginUser.user_img}`)" >
                    <img v-else-if="profile_img_src != ''" id="img-preview" :width="200" :src="profile_img_src"
                            alt="프로필 사진 미리보기" />
                    <img v-else id="img-preview" :width="200" :src="require(`../assets/profile.png`)"
                            alt="프로필 사진 미리보기" />
                </div>
                    <input id="profile-img" type="file" placeholder="이미지" @change="uploadFile($event.target.files)">
                </div>
                </div>
            </div>

            <div class="form">
                <label class="te">이메일</label>
                <div class="in">
                    <input type="email" class="form-control" placeholder="이메일" v-model="loginUser.user_email" />

                </div>
            </div>

            <div class="form">
                <label class="te">휴대전화번호</label>
                <div class="in">
                    <input type="tel" class="form-control" placeholder="휴대전화번호" maxlength="11" @input="validatePhoneNumber" v-model="loginUser.user_mobile" />
                    <button class="btn" @click="mobile_check()">중복확인</button>
                   
                </div>
            </div>

            <div class="form">
                <label class="te">우편번호</label>
                <div class="in">
                    <input type="text" class="form-control" v-model="loginUser.user_adr1" />
                    <button class="btn" type="button" v-on:click="zipload">우편번호 찾기</button>
                </div>
            </div>

            <div class="form3">
                <input type="text" class="in2" placeholder="상세주소" v-model="loginUser.user_adr2" />
            </div>

            
            <div class="form4">
                <button type="submit" class="pass" @click="goToPass">비밀번호 수정</button>
                <button type="submit" class="btn2" @click="onSubmitForm">수정하기</button>
            </div>
        </div>
    </main>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'mypageeditUser',
    data() {
        return {
            loginUser: {},
            profile_img_src : ''
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    created() {
        this.getUser()
    },
    mounted() {
        
    },
    methods: {
        onSubmitForm() {
            if (this.loginUser.user_nick === "" || this.loginUser.user_email === "" || this.loginUser.user_mobile === "" || this.loginUser.user_phone === "" || this.loginUser.user_zipcode === "" || this.loginUser.user_adr1 === "" || this.loginUser.user_adr2 === "") {
                this.$swal("모든 항목을 입력해주세요");
            } else {
                axios({
                    url:'http://localhost:3000/mypage/mypageupdate',
                    method: "POST",
                        data:{
                            user_nick: this.loginUser.user_nick,
                            user_email: this.loginUser.user_email,
                            user_mobile: this.loginUser.user_mobile,
                            user_zipcode: this.loginUser.user_zipcode,
                            user_adr1: this.loginUser.user_adr1,
                            user_adr2: this.loginUser.user_adr2,

                            user_no: this.user.user_no,
                            user_img:this.loginUser.user_img
                        }
                    })
                    .then((res) => {
                        if (res.data.message === 'mypage_update') {
                            this.$swal("수정을 완료했습니다.");
                            this.$router.push({ path: '/mypage' });
                        } else if (res.data.message == 'already_exist_phone') {
                            this.$swal("이미 존재하는 전화번호입니다.")
                        } else {
                            this.$swal("수정에 실패했습니다.");
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$swal("수정에 실패했습니다.");
                    });
            }
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
                    this.loginUser.user_zipcode = data.zonecode;
                    this.loginUser.user_adr1 = addr;
                    this.loginUser.user_adr2 = extraAddr;
                    this.loginUser.zipinput = true;
                }
            }).open();
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
                this.profile_img_src = ''
                formData.append('img', file[0]);

                this.profile_img_src = URL.createObjectURL(file[0]);

                for (let key of formData.keys()) {
                    console.log(key, ":", formData.get(key));
                }
                try {
                    axios({
                        url: `http://localhost:3000/mypage/upload_img`,
                        method: 'POST',
                        headers: {'Content-Type': 'multipart/form-data'},
                        data: formData
                    })
                        .then ((res) => {
                            if (res.data.message == 'success'){
                                this.loginUser.user_img = name;
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

        validatePhoneNumber() {
            this.loginUser.user_mobile = this.loginUser.user_mobile.replace(/\D/g, ''); // 숫자 이외의 문자 제거
        },
        mobile_check() {
                if(this.user_mobile == "") {
                    this.$swal("전화번호를 입력하세요.");
                    return false;
                }
                axios({
                    url: "http://localhost:3000/auth/mobile_check2",
                    method: "POST",
                    data: {
                        user_mobile: this.loginUser.user_mobile,
                        user_no: this.user.user_no,
                    },
                })
                    .then(res => {
                        console.log(res.data.message);
                        if (res.data.message == 'already_exist_phone') {
                            this.$swal("이미 존재하는 전화번호입니다.")
                        }
                        else if (res.data.message == 'DB_error') {
                            this.$swal("DB 에러 발생")
                        }
                        else {
                            this.$swal("사용 가능한 전화번호입니다.")
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    
                })
            },
        goToPass() {
            this.$router.push({ path: '/mypage/pass' });
        },
        async getUser() {    
            try {
                const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
                this.loginUser = response.data[0];
                this.profile_img_src = this.loginUser.user_img
            } catch (error) {
                console.error(error);
            }
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

ul,
li {
    list-style: none;
}

a {
    text-decoration: none;
}

@font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

.container {
    margin: 50px 230px;
    font-family: GmarketSansMedium;
}

h2 {
    margin: 20px 0 70px 0;
}

/* form */
.form {
    margin-bottom: 20px;
    display: flex;
    width: 100%;
}

.form .te {
    width: 140px;
    vertical-align: middle;
    padding: 10px 0;
    margin-right: 20px;
}

.form .in {
    margin-bottom: 30px;
    display: flex;
    height: 30px;
}

.form input {
    display: flex;
    align-items: center;
    width: 300px;
    height: 50px;
    font-size: 1rem;
    font-family: GmarketSansMedium;
    padding-left: 20px;
    color: rgb(137, 137, 137);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
}


.form .btn {
    /* display: flex; */
    height: 50px;
    width:120px;
    position: relative;
    padding: 8px 10px;
    font-size: 14px;
    font-family: GmarketSansMedium;
    color: rgb(123, 123, 123);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
    cursor: pointer;
    margin-left: 5px;
}

.form3 {
    display: grid;
    align-items: center;
    position: relative;
    height: auto;
    margin: 0px 0px 10px 0px;
    padding: 0 0 0px 156px;
    /* border: 1px solid red; */
}

.form3 .in2 {
    display: block;
    align-items: center;
    width: 427px;
    height: 50px;
    font-size: 1rem;
    padding-left: 20px;
    font-family: GmarketSansMedium;
    color: rgb(137, 137, 137);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
    margin-left: 3px;
}

.form3 input:nth-last-child(2) {
    margin-bottom: 10px;
    padding-left: 20px;
}

.pass {
    height: 40px;
    width:120px;
    position: relative;
    padding: 8px 10px;
    font-size: 14px;
    color: rgb(255, 255, 255);
    font-family: GmarketSansMedium;
    border: none;
    background-color: rgb(1, 96, 15);
    border-radius: 10px;
    cursor: pointer;
    margin-top: 50px;
    margin-left: 300px;
    text-align: center;
}

input:focus {
    outline: 2px solid rgb(255, 236, 253);
}


.form button:hover {
    color: rgb(255, 255, 255);
    border: 2px solid rgb(0, 104, 28);
    background-color: rgb(6, 118, 0);
    border-radius: 10px;
    cursor: pointer;
}

.btn2 {
    height: 42px;
    width:120px;
    font-size: 14px;
    color: rgb(123, 123, 123);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
    cursor: pointer;
    float: right;
    margin-right: 590px;
    margin-top: 50px;
}
.profile-img {
  width: 200px;
  height: 200px;
  text-align: center;
  border-radius: 70%;
  border: 2px solid black;
  overflow: hidden;
  margin-left: 300px;
  margin-bottom: 20px;
}

#profile-img {
    margin-left: 280px;
    border:none;
}
</style>