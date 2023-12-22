<template>
    <div class="container">
        <div class="mypage_topbar_container">
            <div class="profile_lapper">
                <!-- 프로필 사진, 닉네임 -->
                <div class="profile_box">
                    <div class="profile_img_box">
                        <div class="profile-icon">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <img id="photo-preview" :src="photoPreview" alt="프로필 사진 미리보기" style="display: none;">
                    </div>
                    <span class="profile_nick">닉네임</span>
                </div>
            </div>

            <div class="friendly_lapper">
                <!-- 친밀도 -->
                <div class="friendly_box">
                    <span class="friendly_text">친밀도</span>
                    <div class="friendly_img_box">
                        <progress value="50" max="100"></progress>
                        <span class="friendly_score">50점</span>
                    </div>
                </div>
            </div>
            
            <div class="logout_lapper">
                <!-- 로그아웃 버튼 -->
                <div class="logout_box">
                    <button class="logout_btn">로그아웃</button>
                </div>
            </div>
        </div>
        <div class="myinfo">
            <p>내 정보</p>
            <p>닉네임 : 닉네임이당</p>
            <p>휴대전화번호 : 010-0000-0000</p>
            <p>주소 : 서울시 강남구</p>
            <p>상세주소 : 123-456</p>
        </div>
    </div>
</template>
<script>
    export default {
        name : 'mypage',
        data() {
            return {
                photoPreview: '#'
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
.friendly_lapper {
    float :left;
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
</style>
