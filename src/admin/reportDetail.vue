<template>
    <div class="container">
        <div class="title">
            <p>신고 제목 :[{{ report.REPORT_CATEGORY }}] {{ report.REPORT_TITLE }}</p>
        </div>
        <div class="report_img" v-if="report.REPORT_IMG">
            <img :src="require(`../../../StarFarmBack/uploads/reportImg/${report.REPORT_NO}/${report.REPORT_IMG}`)" alt="신고 이미지">
        </div>
        <div v-else>
            <p>신고 이미지가 없습니다.</p>
        </div>
        <div>
            <p @click="gotoProfile(report.USER_NO)">신고자 : {{ user_id }}</p>
            <p @click="gotoProfile(report.REPORT_USER_NO)">신고 대상 : {{ reportUser_id }}</p>
            <p>신고 날짜 : {{ formatDateTime(report.REPORT_DATE) }}</p>
        </div>
        <div class="report_content">
            <p>신고 내용</p>
            <textarea name="report_content" id="report_content" cols="30" rows="10" v-model="report.REPORT_CONTENT" readonly></textarea>
        </div>
        <div class="btn_container">
            <button class="btn" @click="closeWindow">닫기</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data () {
        return {
            report: {},
            user_id: '',
            reportUser_id: '',
        }
    },
    mounted() {
        this.getReport();
    },
    methods: {
        async getReport() {
            try{
                const report_no = this.$route.params.id;
                const res = await axios.get(`http://localhost:3000/auth/admin/reportInfo/${report_no}`);
                this.report = res.data[0];
            } catch(err) {
                console.log(err);
            }
            // 신고자의 아이디를 가져오기
            try{
                const user_no = this.report.USER_NO;
                const res = await axios.get(`http://localhost:3000/mypage/mypage/${user_no}`);
                this.user_id = res.data[0].user_id;
            } catch(err) {
                console.log(err);
            }
            //신고 대상의 아이디를 가져오기
            try{
                const user_no = this.report.REPORT_USER_NO;
                const res = await axios.get(`http://localhost:3000/mypage/mypage/${user_no}`);
                this.reportUser_id = res.data[0].user_id;
            } catch(err) {
                console.log(err);
            }
        },
        closeWindow() {
            window.close();
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
        gotoProfile(user_no) {
            window.open(`/userpage/${user_no}`);
        }
    }
}

</script>
<style scoped>
.report_img{
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;

}
.container {
    width: 100%;
    height: 100%;
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
    padding: 10px;
}
p {
    width: 100%;
    height: 30px;
}
.title{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
}
.btn{
    padding: 10px 20px;
    color: rgb(123, 123, 123);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
    cursor: pointer;
    margin-left:10px;
  }
button:hover {
    color: rgb(0, 0, 0);
    border: 2px solid rgb(253, 217, 249);
    background-color: rgb(255, 236, 253);
    border-radius: 10px;
    cursor: pointer;
}
.report_content textarea {
    width: 100%;
    resize: none;
    font-size: large;
    border-radius: 5px;
    padding-top: 5px;
    padding-left: 5px;
    border: 2px solid rgb(221, 221, 221);
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    color: rgb(137, 137, 137);
    border-radius: 10px;
}

</style>