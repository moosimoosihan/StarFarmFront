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
                        <tr v-for="(chatroom, i) in roomList" :key="i">
                            <td>{{ chatroom.CHATROOM_NO }}</td>
                            <td @click="gotoChatRoom(chatroom.CHATROOM_USER1 === user.user_no? chatroom.CHATROOM_USER2:chatroom.CHATROOM_USER1)">
                                <img :width="70" style="border-radius: 70px;"
                                    :src="user.user_no!='' ? userImgList[i] ? require(`../../../StarFarmBack/uploads/userImg/${chatroom.CHATROOM_USER1 === user.user_no? chatroom.CHATROOM_USER2:chatroom.CHATROOM_USER1}/${userImgList[i]}`) : require(`../assets/profile.png`):require(`../assets/profile.png`)"
                                    alt="프로필 이미지" />
                            </td>
                            <td>
                                {{ userNickList[i] }}
                            </td>
                            <td>
                                {{ commentList[i] }}
                            </td>
                            <td @click="outChatRoom(chatroom.CHATROOM_NO)">
                                <i class="fa-solid fa-right-from-bracket"></i><!-- 임시 -->
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
                let popupWindow = window.open(`/chatroom/${index}`, '_blank', 'left=100', 'top=50', 'scrollbars=no', 'resizable=no', 'toolbars=no', 'menubar=no');
                popupWindow.resizeTo(800, 650)
                popupWindow.onresize = (_=>{
                    popupWindow.resizeTo(800, 650)
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
                this.commentList = [];
                this.userImgList = [];
                for(var i = 0; i < this.roomList.length; i++) {
                    if(this.roomList[i].CHATROOM_USER1===this.user.user_no && this.roomList[i].CHATROOM_OUT1 === 1){
                        console.log(`${this.roomList[i].CHATROOM_NO}번 채팅방 나감`)
                        this.roomList.splice(i, 1);
                    } else if(this.roomList[i].CHATROOM_USER2===this.user.user_no && this.roomList[i].CHATROOM_OUT2 === 1) {
                        console.log(`${this.roomList[i].CHATROOM_NO}번 채팅방 나감`)
                        this.roomList.splice(i, 1);
                    } else {
                        await this.getComment(this.roomList[i].CHATROOM_NO)
                        await this.getChatUser(this.roomList[i].CHATROOM_USER1 === this.user.user_no? this.roomList[i].CHATROOM_USER2:this.roomList[i].CHATROOM_USER1)
                    }
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
            outChatRoom(room_no) {
                // 채팅방에서 나가시겠습니까? 확인 후 삭제
                this.$swal.fire({
                    title: '채팅방 나가기',
                    text: '채팅방을 나가시겠습니까?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: '나가기',
                    cancelButtonText: '취소',
                }).then((result) => {
                    if (result.isConfirmed) {
                        try{
                            axios({
                                url:"http://localhost:3000/chat/outChatRoom",
                                method: "POST",
                                data: {
                                    room_no: room_no,
                                    user_no: this.user.user_no,
                                }
                            })
                                .then((res)=>{
                                    if(res.data.message === 'success') {
                                    this.$swal('채팅방에서 나갔습니다.');
                                    this.getRoomList();
                                }
                            })
                        } catch(error) {
                            console.error(error);
                        }
                    }
                });
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

table {
  border-collapse: collapse;
  width: 500px;
  margin-top: 20px;
  background-color: white;
}

thead{
  box-shadow: 4px 4px 10px rgba(0,0,0,0.1);
}

/* 테이블 행 */
td {
  padding: 1px;
  text-align: left;
  border-bottom: 1px solid #008d07f1;
  text-align: center;
  height: 40px;
}

th {
  padding: 8px;
  text-align: left;
  text-align: center;
  border-top: 2px solid #008807;
  border-bottom: 2px solid #008807;
  color: #189200;
}

/* 테이블 올렸을 때 */
tbody tr:hover {
  background-color: #e0ffae;
  opacity: 0.9;
  cursor: pointer;
}

/* 테이블 비율 */
th:nth-child(1),
td:nth-child(1) {
  width: 20%;
}

th:nth-child(2),
td:nth-child(2) {
  width: 20%;
}

th:nth-child(3),
td:nth-child(3) {
  width: 20%;
}
th:nth-child(4),
td:nth-child(4) {
  width: 20%;
}
th:nth-child(5),
td:nth-child(5) {
  width: 20%;
}

th, td {
  border-left: none;
  border-right: none;
  color: #008807;
}

tr {
    height: 80px;
}

.title {
    font-size: 24px;
}
</style>