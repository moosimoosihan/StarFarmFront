<template>
    <div class="container">
        <div class="chatroom_container">
            <div class="chatroom_title">
                <span>{{ anothorUser.user_nick }}님과의 대화</span>
                <button class="chatroom_exit" @click="exitChat()">나가기</button>
            </div>
            <div class="chats_container" id="scroll">
                <div v-for="(chat, i) in chatList" :key="i">
                    <div v-if="chat.CHAT_USER===user.user_no" class="chat_me">
                        <div class="chat_container">
                            <p class="chat_name">{{ loginUser.user_nick }}</p>
                            <div class="chat_content_container">
                                <p class="chat_content">{{ chat.CHAT_CONTENT }}</p>
                                <span class="chat_time">{{ formatDateTime(chat.CHAT_DATE) }}</span>
                            </div>
                        </div>
                        <img :width="70" style="border-radius: 10px;"
                            :src="loginUser.user_img ? require(`../../../StarFarmBack/uploads/userImg/${loginUser.user_no}/${loginUser.user_img}`) : require('../assets/profile.png')"
                            alt="프로필 이미지" />
                    </div>
                    <div v-else class="chat_you">
                        <img :width="70" style="border-radius: 10px;"
                            :src="anothorUser.user_img ? require(`../../../StarFarmBack/uploads/userImg/${anothorUser.user_no}/${anothorUser.user_img}`) : require('../assets/profile.png')"
                            alt="프로필 이미지" />
                        <div class="chat_container">
                            <p class="chat_name">{{ anothorUser.user_nick }}</p>
                            <div class="chat_content_container">
                                <p class="chat_content">{{ chat.CHAT_CONTENT }}</p>
                                <span class="chat_time">{{ formatDateTime(chat.CHAT_DATE) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat_input_container">
                <input class="chat_input" type="text" placeholder="메세지를 입력하세요." v-model="content">
                <button class="chat_send" @click="send()">전송</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";

    export default {
      name: 'chat',
      data() {
        return {
            loginUser: {},
            anothorUser: {},
            chatList: [],
            chatroom: {},
            content: '',
        }
      },
      computed: {
        user() {
          return this.$store.state.user;
        }
      },
      mounted() {
        this.getChatRoom()
        this.getChat()
        this.getUser()
        this.getAnothorUser()
      },
      beforeUpdate() {
        this.getChat()
      },
      methods: {
        async getChatRoom() {
          try {
            const me_no = this.user.user_no;
            const another_user_no = this.$route.params.id;
            let user_no = '';
            if(me_no > another_user_no) {
                user_no = `${another_user_no}/${me_no}`;
            } else {
                user_no = `${me_no}/${another_user_no}`;
            }

            const response = await axios.get(`http://localhost:3000/chat/getChatRoom/${user_no}`);
            this.chatroom = response.data[0];
          } catch (error) {
            console.error(error);
          }
        },
        async getUser() {
          try {
            const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
            this.loginUser = response.data[0];
          } catch(error) {
            console.error(error);
          }
        },
        async getAnothorUser() {
            try {
                const another_no = this.$route.params.id;
                const response = await axios.get(`http://localhost:3000/mypage/mypage/${another_no}`);
                this.anothorUser = response.data[0];
            } catch (error) {
                console.error(error);
            }
        },
        async getChat() {
          try {
            const chatroom_no = this.chatroom.CHATROOM_NO;
            const response = await axios.get(`http://localhost:3000/chat/getChat/${chatroom_no}`);
            this.chatList = response.data;
          } catch (error) {
            console.error(error);
          }
        },
        async send() {
            try {
                const chatroom_no = this.chatroom.CHATROOM_NO;
                const chat_content = this.content;
                const user_no = this.user.user_no;

                const response = await axios.post(`http://localhost:3000/chat/send`, {
                    chatroom_no,
                    chat_content,
                    user_no
                });
                if(response.data.message === 'success') {
                    this.content = '';
                    await this.getChat();
                    const scroll = document.getElementById('scroll');
                    scroll.scrollTop = scroll.scrollHeight;
                } else {
                    console.log('전송 실패');
                }
            } catch (error) {
                console.error(error);
            }
        },
        formatDateTime(dateTime) {
            const date = new Date(dateTime);
            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            };
            const formattedDateTime = date.toLocaleDateString("ko-KR", options);
            return formattedDateTime;
        },
        exitChat() {
            window.close();
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
    overflow-y: scroll;
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