<template>
    <div class="container">
        <div class="mypage_topbar_container">
            <div class="profile_lapper">
                <!-- 프로필 사진, 닉네임 -->
                <div class="profile_box">
                    <div class="profile_img_box">
                        <!-- <div class="profile-icon">
                            <i class="fas fa-user-circle"></i>
                        </div> -->
                        <img :width="150" style="border-radius: 10px;"
                            :src="loginUser.user_img ? require(`../../../StarFarmBack/uploads/userImg/${loginUser.user_no}/${loginUser.user_img}`) : require(`../assets/profile.png`)"
                            alt="프로필 사진 미리보기" />
                    </div>
                    <span class="profile_nick">{{ loginUser.user_nick }}</span>
                </div>
            </div>

            <div class="friendly_lapper">
                <!-- 친밀도 -->
                <div class="friendly_box">
                    <span class="friendly_text">친밀도</span>
                    <div class="friendly_img_box">
                        <div class="progressBar">
                            <div id="bar" class="innerbar"></div>
                        </div>
                        <span class="friendly_score">{{ loginUser.user_fr }}점</span>
                    </div>
                </div>
            </div>
            
            <div class="logout_lapper">
                <!-- 로그아웃 버튼 -->
                <div class="logout_box">
                    <button class="logout_btn" @click="logout()"><img src="../assets/logout.png" height="40px" width="100px" ></button>
                </div>
            </div>
        </div>
        <div class="myinfo">
            <div>
                <h2>내 정보</h2>
            </div>
            <div class="my">
                <div class="detail">
                    <p>ID : {{ loginUser.user_id }}</p>
                    <p>휴대전화번호 : {{ loginUser.user_mobile }}</p>
                    <p>주소</p>
                    <p>{{ loginUser.user_zipcode }}</p>
                    <p>{{ loginUser.user_adr1 }}</p>
                    <p>{{ loginUser.user_adr2 }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
    export default {
        name : 'mypage',
        data() {
            return {
                loginUser: {},
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        },
        created() {
            this.getUser()
        },
        methods: {
            async getUser() {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
                    this.loginUser = response.data[0];
                    console.log(this.loginUser);
                } catch (error) {
                    console.error(error);
                }
            },
            logout() {
                if(this.loginUser.user_social_tp==1){
                    window.Kakao.API.request({
                        url: '/v1/user/unlink',
                        success: function (response) {
                            console.log(response);
                        },
                        fail: function (error) {
                            console.log(error);
                        },
                    })
                }
                this.$store.commit("user", {})
                this.$swal({
                    position: 'top',
                    icon: 'success',
                    title: '로그아웃 성공!',
                    showConfirmButton: false,
                    timer: 1000
                    }).then(() => {
                        window.location.href="http://localhost:8080";
                    })
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
    width: 80%;
    height: 100%;
}

/* -------------------- */

#photo-preview {
    width: 150px;
    height: 150px; 
    border-radius: 70%;
    overflow: hidden;

}
.profile_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.profile_nick {
    text-align: center;
}
.profile_box {
    width: 150px;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.friendly_box {
    width: 250px;
    height: 200px;
    display: flex;
    flex-direction: column;
    margin-left: 50px;
}
.profile_lapper {
    margin-left: 20px;
    float: left;
}
.friendly_text {
    margin-top: 50px;
}
.mypage_topbar_container {
    width: 80%;
    height: 200px;
    margin: 0 auto;
    border: 2px solid black;
}
.logout_lapper {
    margin-top: 10px;
    margin-right: 10px;
    float: right;
}

.logout_btn {
    background-color: transparent;
    border: 0;
}

.friendly_lapper {
    float :left;
    margin-left: 10px;
}
.friendly_score {
    margin-left: 10px;
}
.profile-icon {
    font-size: 130px;
}
.myinfo {
    margin-left: 20px;
}
.progressBar {
  max-width: 330px;
  width: 90%;
  margin: 10px auto;
  margin-top: 20px;
  height: 8px;

  border-radius: 3px;
  background: linear-gradient(#6fa6d66c, #7db1df54);
}

.innerbar {
  max-width: 330px;
  height: 100%;
  text-align: right;
  height: 8px; /* same as #progressBar height if we want text middle aligned */
  width: 30%;
  border-radius: 3px;
  background: linear-gradient(#5be6ba, #5ed1ad);
}



</style>
