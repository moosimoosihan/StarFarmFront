<template>
    <div class="container">
        <div class="chatroom_container">
            <div class="chatroom_title">
                <span>ㅇㅇㅇ님과의 대화</span>
                <button class="chatroom_exit">나가기</button>
            </div>
            <div class="chats_container" id="scroll">
                <div v-for="(chat, i) in chatList" :key="i">
                    <div v-if="chat.items[0].CHAT_USER===user.USER_ID" class="chat_me">
                        <div class="chat_container">
                            <p class="chat_name">{{ chat.items[0].CHAT_NICK }}</p>
                            <div class="chat_content_container">
                                <p class="chat_content">{{ chat.items[0].CHAT_CONTENT }}</p>
                                <span class="chat_time">{{ chat.items[0].CHAT_DATE }}</span>
                            </div>
                        </div>
                        <!-- <img :width="70" style="border-radius: 10px;"
                            :src="chat.items[0].CHAT_IMG ? require(`../../../StarFarmBack/uploads/uploadGoods/${chatroom.CHATROOM_IMG}`) : '../assets/profile.png'"
                            alt="프로필 이미지" /> -->
                        <img :width="70" style="border-radius: 10px;"
                            :src="'../assets/profile.png'"
                            alt="프로필 이미지" />
                    </div>
                    <div v-else class="chat_you">
                        <!-- <img :width="70" style="border-radius: 10px;"
                            :src="chat.items[0].CHAT_IMG ? require(`../../../StarFarmBack/uploads/uploadGoods/${chatroom.CHATROOM_IMG}`) : '../assets/profile.png'"
                            alt="프로필 이미지" /> -->
                        <img :width="70" style="border-radius: 10px;"
                            :src="'../assets/profile.png'"
                            alt="프로필 이미지" />
                        <div class="chat_container">
                            <p class="chat_name">{{ chat.items[0].CHAT_NICK }}</p>
                            <div class="chat_content_container">
                                <p class="chat_content">{{ chat.items[0].CHAT_CONTENT }}</p>
                                <span class="chat_time">{{ chat.items[0].CHAT_DATE }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <hr id="left"><span class="hr_text"> 어제 </span><hr id="right">
                </div>
                <div class="chat_you">
                    <img class="chat_profile_img" src="" alt="프로필 사진">
                    <div class="chat_container">
                        <p class="chat_name">ㅇㅇㅇ</p>
                        <div class="chat_content_container">
                            <p class="chat_content">안녕하세요! 2트</p>
                            <span class="chat_time">16:30</span>
                        </div>
                    </div>
                </div>
                <div class="chat_me">
                    <div class="chat_container">
                        <p class="chat_name">ㅁㅁㅁ</p>
                        <div class="chat_content_container">
                            <p class="chat_content">싸게주세요!</p>
                            <span class="chat_time">16:31</span>
                        </div>
                    </div>
                    <img class="chat_profile_img" src="" alt="프로필 사진">
                </div>
                <div class="chat_me">
                    <div class="chat_container">
                        <p class="chat_name">ㅁㅁㅁ</p>
                        <div class="chat_content_container">
                            <p class="chat_content">제발요!</p>
                            <span class="chat_time">16:33</span>
                        </div>
                    </div>
                    <img class="chat_profile_img" src="" alt="프로필 사진">
                </div>
            </div>
            <div class="chat_input_container">
                <input class="chat_input" type="text" placeholder="메세지를 입력하세요.">
                <button class="chat_send">전송</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name : 'chat',
        data () {
            return {
                
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
    width: 100%;
    height: 100%;
    overflow-block: hidden;
}

#scroll {
    overflow-y: scroll;
}

/*------------*/

.chatroom_container {
    width: 800px;
    height: 560px;
    background-color: grey;
}
.chatroom_title {
    text-align: center;
}
.chatroom_title button {
    float: right;
    margin-right: 30px;
    margin-top: 2px;
    position: apsolute;
}

.chatroom_title span {
    font-size: 20px;
    margin-top: 20px;
}

.chats_container {
    width: 750px;
    height: 450px;
    background-color: rgb(183, 179, 179);
    margin-left: 25px;
}

.chat_profile_img {
    width: 100px;
    height: 100px;
    background-color: blue;
    margin-left: 10px;
    margin-top: 10px;
    float: left;
}

.chat_container {
    width: 330px;
    height: 130px;
    margin-top: 10px;
    margin-left: 10px;
    float: left;
    padding-top: 10px;
}
.chat_content_container{
    width: 310px;
    height: 100px;
    margin-left: 10px;
}

.chat_you {
    float: left;
}
.chat_me {
    float: right;
    margin-right: 10px;
    text-align: end;
}

#left {
    width: 40%;
    margin-left: 40px;
    border: solid 1px grey;
    float: left;
    margin-top: 10px;
}

#right {
    width: 40%;
    margin-right: 40px;
    border: solid 1px grey;
    float: right;
    margin-top: 10px;
}
.hr_text {
    width: 30px;
    text-align: center;
    float: left;
    margin-left: 20px;
}

input {
    width: 700px;
    height: 40px;
    margin-left: 20px;
    margin-top: 10px;
}
button {
    width: 50px;
    height: 40px;
    margin-left: 10px;
    margin-top: 10px;
}
</style>