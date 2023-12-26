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
                            <th>상대</th>
                            <th>내용</th>
                            <th>나가기</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(chatroom, i) in chatroomList" :key="i" @click="gotoChatRoom(chatroom.CHATROOM_NO)">
                            <td>{{ chatroom.CHATROOM_NO }}</td>
                            <td>
                                <!-- <img :width="70" style="border-radius: 10px;"
                                    :src="chatroom.items[0].CHATROOM_IMG ? require(`../../../StarFarmBack/uploads/uploadGoods/${chatroom.CHATROOM_IMG}`) : '../assets/profile.png'"
                                    alt="프로필 이미지" /> -->
                                <img :width="70" style="border-radius: 10px;"
                                    :src="'../assets/profile.png'"
                                    alt="프로필 이미지" />
                            </td>
                            <td>
                                {{ chatroom.items[0].USER_ID }}
                            </td>
                            <td>
                                {{ getComment(chatroom.items[0].CHATROOM_NO) }}
                            </td>
                            <td>
                                <div @click="outChatRoom(chatroom.CHATROOM_NO)">
                                    <i class="fas fa-solid fa-right-from-bracket"></i>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'mychat',
        data() {
            return {
                loginUser: {},
                roomList: [],
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            chatroomList() {
                const chatroom = []
                const chatroomNos = []

                for(const room of this.roomList) {
                    if(!chatroomNos.includes(room.CHATROOM_NO)) {
                        chatroomNos.push({
                            CHATROOM_NO: room.CHATROOM_NO,
                            items: [room],
                        })
                        chatroom.push(room.CHATROOM_NO)
                    } else {
                        const index = chatroomNos.indexOf((o) => o.CHATROOM_NO === room.CHATROOM_NO)
                        chatroomNos[index].items.push(room)
                    }
                }
                return chatroom
            }
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
                    const response = await axios.get(`http://localhost:3000/mypage/chatroomlist/${this.user.user_no}`);
                    this.roomList = response.data;
                } catch (error) {
                    console.error(error);
                }
            },
            async getComment(index) {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/chatroomcomment/${index}`);
                    this.roomList = response.data;
                } catch (error) {
                    console.error(error);
                }
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
}
.myinfo{
    margin-top: 30px;
}

.likegoods .table {
    max-width: 1200px;
    text-align: center;
    background-color: #f9f9f9;
    border-radius: 10px;
}

.likegoods .table th {
    text-align: center;
    padding: 20px 0;
}

.likegoods p {
    width: 120px;
    font-size: 1rem;
    display: inline-block;
    vertical-align: middle;
    padding: 2px;
    padding-top: 10px;
    margin: 20px 30px 16px 0px;
    /* border: 1px solid red; */
}

.likegoods .detail {
    display: flex;
}

th, td {
    border: 1px solid #444444;
}
</style>