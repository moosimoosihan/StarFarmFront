<template>
    <div class="container" id="scroll">
        <div>
            <div class="chat_title">
                <span>나의 채팅방</span>
            </div>
            <div class="chatroom_container">
                <img class="chat_profile_img" src="" alt="프로필 이미지">
                <div class="chatroomdetails_container">
                    <span>유저 이름</span><br>
                    <span>싸게 주세요!(내용)</span><br>
                </div>
                <div>
                    <img class="exit_button_img" src="" alt="나가기 버튼">
                </div>
            </div>
            <div class="chatroom_container">
                <img class="chat_profile_img" src="" alt="프로필 이미지">
                <div class="chatroomdetails_container">
                    <span>유저 이름</span><br>
                    <span>싸게 주세요!(내용)</span><br>
                </div>
                <div>
                    <img class="exit_button_img" src="" alt="나가기 버튼">
                </div>
            </div>
            <div class="chatroom_container">
                <img class="chat_profile_img" src="" alt="프로필 이미지">
                <div class="chatroomdetails_container">
                    <span>유저 이름</span><br>
                    <span>싸게 주세요!(내용)</span><br>
                </div>
                <div>
                    <img class="exit_button_img" src="" alt="나가기 버튼">
                </div>
            </div>
            <div class="chatroom_container">
                <img class="chat_profile_img" src="" alt="프로필 이미지">
                <div class="chatroomdetails_container">
                    <span>유저 이름</span><br>
                    <span>싸게 주세요!(내용)</span><br>
                </div>
                <div>
                    <img class="exit_button_img" src="" alt="나가기 버튼">
                </div>
            </div>
            <div class="chatroom_container">
                <img class="chat_profile_img" src="" alt="프로필 이미지">
                <div class="chatroomdetails_container">
                    <span>유저 이름</span><br>
                    <span>싸게 주세요!(내용)</span><br>
                </div>
                <div>
                    <img class="exit_button_img" src="" alt="나가기 버튼">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'mychat'
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
#scroll {
    overflow: scroll;
}
/* -------------------- */

.chat_title {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 20px;
}

.chatroom_container {
    width: 800px;
    height: 100px;
    margin-top: 20px;
    margin-left: 10%;
    background-color: #f5f5f5;
}

.chat_profile_img {
    width: 90px;
    height: 90px;
    float: left;
    margin-top: 5px;
    margin-left: 20px;
    background-color: red;
}

.chatroomdetails_container {
    width: 500px;
    height: 80%;
    float: left;
    margin-top: 20px;
    margin-left: 20px;
}
.exit_button_img {
    width: 90px;
    height: 90px;
    float: left;
    margin-top: 5px;
    margin-left: 20px;
    background-color: red;
}
</style>