<template>
    <div class="container">
        <div class="myinfo">
            <div class="chat_title">
                <span>나의 채팅방</span>
            </div>
            <div class="chats">
                <table class="table" style="width:100%;">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>프로필 이미지</th>
                            <th>닉네임</th>
                            <th>최근 대화 내용</th>
                            <th>나가기</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(chatroom, i) in roomList" :key="i" @click="gotoChatRoom(chatroom.CHATROOM_USER1 === user.user_no? chatroom.CHATROOM_USER2:chatroom.CHATROOM_USER1)">
                            <td>{{ chatroom.CHATROOM_NO }}</td>
                            <td>
                                <img :width="70" style="border-radius: 10px;"
                                    :src="userImgList[i] ? require(`../../../StarFarmBack/uploads/userImg/${chatroom.CHATROOM_USER1 === user.user_no? chatroom.CHATROOM_USER2:chatroom.CHATROOM_USER1}/${userImgList[i]}`) : require(`../assets/profile.png`)"
                                    alt="프로필 이미지" />
                            </td>
                            <td>
                                {{ userNickList[i] }}
                            </td>
                            <td>
                                {{ commentList[i] }}
                            </td>
                            <td>
                                <div @click="outChatRoom(chatroom.CHATROOM_NO)">
                                    <i class="fas fa-solid fa-comments"></i><!-- 임시 -->
                                </div>
                            </td>
                        </tr>
                        <tr v-if="roomList.length === 0">
                            <td colspan="5">채팅방이 없습니다.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

    export default {
        name: 'mychat',
        data() {
            return {
                loginUser: {},
                roomList: [],
                commentList: [],
                userImgList: [],
                userNickList: [],
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
        },
        created() {
            this.getUser();
            this.getRoomList();
        },
        methods: {
            gotoChatRoom(index) {
                let popupWindow = window.open(`/chatroom/${index}`, '_blank', 'width=800', 'height=620', 'left=100', 'top=50', 'scrollbars=no', 'resizable=no', 'toolbars=no', 'menubar=no');
                popupWindow.resizeTo(800, 620)
                popupWindow.onresize = (_=>{
                    popupWindow.resizeTo(800, 620)
                })
            },
            async getUser() {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
                    this.loginUser = response.data[0];
                } catch (error) {
                    console.error(error);
                }
            },
            async getRoomList() {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/getChatRoom/${this.user.user_no}`);
                    this.roomList = response.data;
                } catch (error) {
                    console.error(error);
                }
                for(var i = 0; i < this.roomList.length; i++) {
                    this.getComment(this.roomList[i].CHATROOM_NO)
                    this.getChatUser(this.roomList[i].CHATROOM_USER1 === this.user.user_no? this.roomList[i].CHATROOM_USER2:this.roomList[i].CHATROOM_USER1)
                }
            },
            async getComment(room_no) {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/chatroomcomment/${room_no}`);
                    this.commentList.push(response.data[0].CHAT_CONTENT);
                } catch (error) {
                    console.error(error);
                }
            },
            async getChatUser(user_no){
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/mypage/${user_no}`);
                    this.userImgList.push(response.data[0].user_img);
                    this.userNickList.push(response.data[0].user_nick);
                } catch (error) {
                    console.error(error);
                }
            },
            async outChatRoom(room_no) {
                try{
                    const response = await axios({
                        url:`http://localhost:3000/chat/outChatRoom`,
                        method: 'POST',
                        data: {
                            room_no: room_no,
                            user_no: this.user.user_no,
                        }
                    });
                    if(response.data === 'success') {
                        this.$swal('채팅방에서 나갔습니다.');
                        this.getRoomList();
                    }
                } catch(error) {
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
    border-spacing: 0px;
}
.container {
    margin: 40px 30px;
}
.myinfo{
    margin-top: 30px;
}

.chats .table {
    max-width: 1200px;
    text-align: center;
    background-color: #f9f9f9;
    border-radius: 10px;
}

.chats .table th {
    text-align: center;
    padding: 20px 0;
}

.chats p {
    width: 120px;
    font-size: 1rem;
    display: inline-block;
    vertical-align: middle;
    padding: 2px;
    padding-top: 10px;
    margin: 20px 30px 16px 0px;
    /* border: 1px solid red; */
}

.chats .detail {
    display: flex;
}

th, td {
    border: 1px solid #444444;
}
</style>