<template>
    <div class="container">
        <div class="mypage_topbar_container">
            <div class="profile_lapper">
                <!-- 프로필 사진, 닉네임 -->
                <div class="profile_box">
                    <div class="profile_img_box">
                        <img class="profile_img" src="" alt="프로플 사진">
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
                        <span>50점</span>
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
    </div>
</template>
<script>
    export default {
        name : 'mypageTopBar'
    }
</script>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.container {
    width: 100%;
    height: 100%;
}
.mypage-bar {
overflow-y: scroll;
-ms-overflow-style: none; /* 인터넷 익스플로러 */
scrollbar-width: none; /* 파이어폭스 */
}
.mypage-bar::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
}

/* -------------------- */


.profile_img_box {
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
    -ms-overflow-style: none; /* 인터넷 익스플로러 */
    scrollbar-width: none; /* 파이어폭스 */
    width: 100%;
    height: 100%;
    margin: 0 auto;
    border: 2px solid black;
}
.mypage_topbar_container::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
}
.logout_lapper {
    margin-top: 10px;
    margin-right: 10px;
    float: right;
}
.friendly_lapper {
    float :left;
}
</style>
