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
                            <p class="chat_name">나</p>
                            <div class="chat_content_container">
                                <span class="chat_time">{{ formatDateTime(chat.CHAT_DATE) }}</span>
                                <textarea class="chat_content" :rows="chat.CHAT_CONTENT.length/15" readonly v-model="chat.CHAT_CONTENT"></textarea>
                            </div>
                        </div>
                    </div>
                    <div v-else class="chat_you">
                        <div class="chat_container1">
                            <img style="border-radius:10px" width="50" height="50"
                            :src="anothorUser.user_img ? require(`../../../StarFarmBack/uploads/userImg/${anothorUser.user_no}/${anothorUser.user_img}`) : require('../assets/profile.png')"
                            alt="프로필 이미지" />
                            <p class="chat_name1">{{ anothorUser.user_nick }}</p>
                            <div class="chat_content_container1">
                                <textarea class="chat_content1" :rows="chat.CHAT_CONTENT.length/15" readonly v-model="chat.CHAT_CONTENT"></textarea>
                                <span class="chat_time1">{{ formatDateTime(chat.CHAT_DATE) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat_input_container">
                <input class="chat_input" type="text" placeholder="메세지를 입력하세요." v-model="content" @keyup.enter="send" />
                <button class="chat_send" @click="send">전송</button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import io from 'socket.io-client'

    export default {
      name: 'chat',
      data() {
        return {
            loginUser: {},
            anothorUser: {},
            chatList: [],
            chatroom: {},
            content: '',
            connected: false,
            socket: io('http://localhost:3001')
        }
      },
      created() {
        this.socket.on('chat', async (data) => {
            if(data.chatroom_no === this.chatroom.CHATROOM_NO) {
                console.log('채팅방 번호 일치');
                await this.getChat();
                this.scroll();
            }
        })
      },
      computed: {
        user() {
          return this.$store.state.user;
        },
      },
      beforeMount() {
        this.getChatRoom()
      },
      mounted() {
        this.scroll()
      },
      methods: {
        scroll() {
            setTimeout(() => {
                const scroll = document.getElementById('scroll');
                scroll.scrollTop = scroll.scrollHeight;
            }, 100);
        },
        async getChatRoom() {
            this.socket.on('connect', () => {
                this.connected = true;
                console.log('채팅방 연결됨');
            })
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
          await this.getChat()
          await this.getUser()
          await this.getAnothorUser()
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
          this.scroll()
        },
        async send() {
            if(this.content==''){
                this.$swal('메시지를 입력하세요.')
                return;
            }
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
                    this.socket.timeout(5000).emit('chat', {
                        chatroom_no: this.chatroom.CHATROOM_NO,
                        chat_content: this.content,
                        user_no: this.user.user_no
                    })
                    this.content = '';
                    await this.getChat();
                } else {
                    console.log('전송 실패');
                }
            } catch (error) {
                console.error(error);
            }
        },
        formatDateTime(dateTime) {
            const date = new Date(dateTime);
            const now = new Date();
            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            // 현재시간을 기점으로 보낸지 몇 초 안됬다면 '0초 전' 이런식으로 표시
            if(now.getTime() - date.getTime() < 60000) return `방금 전`;
            // 보낸지 1분 안됬다면 '0분 전' 이런식으로 표시
            if(now.getTime() - date.getTime() < 3600000) return `${Math.floor((now.getTime() - date.getTime()) / 60000)}분 전`;
            // 보낸지 1시간 안됬다면 '0시간 전' 이런식으로 표시
            if(now.getTime() - date.getTime() < 86400000) return `${Math.floor((now.getTime() - date.getTime()) / 3600000)}시간 전`;
            // 보낸지 1일 안됬다면 '0일 전' 이런식으로 표시
            if(now.getTime() - date.getTime() < 2592000000) return `${Math.floor((now.getTime() - date.getTime()) / 86400000)}일 전`;
            // 보낸지 1달 안됬다면 날짜로 표시

            const formattedDateTime = date.toLocaleDateString("ko-KR", options);
            return formattedDateTime;
        },
        exitChat() {
            window.close();
        },
      },
      destroyed() {
        this.socket.off('chat')
        this.socket.on('disconnect', () => {
            this.connected = false;
            console.log('채팅방 연결 끊김');
        })
      },
    }
</script>
<style scoped>
.container {
    width:100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100dvh;
    background: rgb(255, 255, 255);
}

#scroll {
    overflow-y: scroll;
}

/*------------*/

.chatroom_container {
    background-color: rgb(255, 255, 255);
}
.chatroom_title {
    margin-left: 300px;
    height: 40px;
    margin-top: 13px;
}
.chatroom_exit {
    float: right;
    width: 60px;
    height: 43px;
    align-items: center;
    font-size: 1rem;
    font-family: GmarketSansMedium;
    color: rgb(137, 137, 137);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
    margin-right: 30px;
    margin-top: -8px;
}

.chatroom_title span {
    width: 100%;
    height: 100%;
    font-size: 25px;
}

.chats_container {
    width: 750px;
    height: 540px;
    background-color: rgb(255, 255, 255);
    margin-left: 25px;
    border: 0.5px solid black;
    overflow-y: scroll;
    margin-top: 2px;
}

.chat_input_container { 
    width: 800px;
}

.chat_container {
    width: 700px;
    min-height: 50px;
    height: 100%;
    position: relative;
    margin-top: 20px;
    margin-bottom: 20px;
}

.chat_container1 {
    width: 700px;
    height: 100%;
    min-height: 50px;
    display: flex;
    position: relative;
    margin-left: 13px;
    margin-top: 20px;
    margin-bottom: 20px;
}
.chat_content_container{
    float: right;
    display: flex;
    min-height: 50px;
}
.chat_content_container1 {
    max-width: 100%;
    margin-left: 60px;
    margin-top: 20px;
    min-height: 50px;
    display: flex;
    position: absolute;

}
.chat_content {
    display:block; 
    overflow:hidden; 
    border:none; 
    resize:none;
    pointer-events: none;
    background-color: rgb(203, 235, 147);
    border-radius: 8px;
    padding: 3px;
}
.chat_content1 {
    display:block; 
    overflow:hidden; 
    border:none; 
    resize:none;
    pointer-events: none;
    background-color: rgb(203, 235, 147);
    border-radius: 8px;
    padding: 5px;
}
.chat_you {
    /*display: flex;
    margin-top: 10px;
    margin-left: 10px;
    width: auto; */
    /* height: auto; */
    max-width: 700px;
    margin: 5px;
    font-size: 12px;
    display: inline-block;
    position: relative;
    justify-content: left;
    text-align: left;
}
.chat_me {
    /*float: right;
    margin-right: 20px;
    text-align: right;
    border: none;
    width: auto; */
    /* height: auto; */
    max-width: 700px;
    margin: 12px;
    padding: 7px 12px;
    font-size: 12px;
    display: inline-block;
    position: relative;
    justify-content: right;
    text-align: right;
}

.chat_input {
    width: 680px;
    height: 40px;
    margin-left: 25px;
    margin-top: 10px;
    padding-left: 10px;
    float: left;
}

.chat_send {
    width: 60px;
    height: 43px;
    margin-left: 10px;
    align-items: center;
    font-size: 1rem;
    font-family: GmarketSansMedium;
    color: rgb(137, 137, 137);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
    margin-top: 10px;
}

.chat_name {
    font-weight: bold;
}

.chat_name1 {
    margin-left: 2px;
    margin-right: 2px;
    font-weight: bold;
}

.chat_time1{
    margin-left: 10px;
    font-size: 12px;
    margin-top: 4px;
}

.chat_time{
   font-size: 12px;
   margin-right: 3px;
}
</style>