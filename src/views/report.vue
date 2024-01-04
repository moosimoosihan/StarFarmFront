<template>
    <div class="container">
    <div class="report_wrapper">
        <h1>회원 신고</h1>
    <div class="report_user">
    <div class="report_user_box">
        <p>신고 할 유저 :</p>
        <input type="text" class="report_nick" v-model="reportUser.user_nick" disabled>
    </div>
    <div class="report_title_box">
        <select class="report_category" v-model="reportCategory">
        <option value="상품신고" selected>상품신고</option>
        <option value="판매자신고">판매자 신고</option>
        <option value="구매자신고">구매자 신고</option>
        </select>
        <textarea placeholder="글 제목" class="report_title" v-model="reportTitle"></textarea>
    </div>
    <div class="report_file_box">
                    <input type="file" class="report_upload_file" @change="uploadFile($event.target.files)" >
                    <img v-if="reportFileSrc!=''" :src="reportFileSrc" alt="미리보기" />
    <div class="report_file_name">파일 제목</div>
    </div>
    </div>
        <textarea class="report_content" v-model="reportContent"></textarea>
        <button class="report_submit_btn" @click="reportSubmit()">신고하기</button>
        <button class="report_submit_btn" @click="gotoBack()">취소</button>
    </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            loginUser: {},
            reportUser: {},
            reportUserNo: '',
            reportCategory: '상품신고',
            reportTitle: '',
            reportContent: '',
            reportFile: '',
            reportFileSrc: '',
        }
    },
    created() {
        this.getReportUser()
        this.getUser()
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        async getReportUser() {
            try{
                const goods_no = this.$route.params.id
                const response = await axios.get(`http://localhost:3000/goods/getUserNo/${goods_no}`)
                this.reportUserNo = response.data[0].user_no
                try{
                    const response1 = await axios.get(`http://localhost:3000/mypage/mypage/${this.reportUserNo}`)
                    this.reportUser = response1.data[0]
                } catch (error) {
                    console.log(error)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getUser() {
            const user_no = this.user.user_no
            try{
                const response = await axios.get(`http://localhost:3000/mypage/mypage/${user_no}`)
                this.loginUser = response.data[0]
            } catch (error) {
                console.log(error)
            }
        },
        async reportSubmit() {
            if(this.reportTitle == ''){
                this.$swal("제목을 입력해주세요")
                return
            }
            if(this.reportContent == ''){
                this.$swal("내용을 입력해주세요")
                return
            }

            try{
                await axios.post(`http://localhost:3000/auth/report`, {
                    report_title: this.reportTitle,
                    report_category: this.reportCategory,
                    report_content: this.reportContent,
                    report_user_no: this.reportUserNo,
                    user_no: this.loginUser.user_no,
                    report_img: this.reportFile
                })
                .then((res) => {
                    if (res.data.message == 'success'){
                        this.$swal("신고 완료")
                        this.$router.push(`/product/${this.$route.params.id}`)
                    }
                    else {
                        this.$swal("DB 에러");
                    }
                })
            } catch (error) {
                console.log(error)
            }
        },
        async uploadFile(file) {
            let name = "";
            if (file) {
                name = file[0].name;
            }
            else {
                return;     // 파일 미선택 시 반환
            }

            const formData = new FormData();
            
            formData.append('img', file[0]);

            this.reportFileSrc = URL.createObjectURL(file[0]);

            for (let key of formData.keys()) {
                console.log(key, ":", formData.get(key));
            }
            try {
                axios({
                    url: `http://localhost:3000/auth/upload_img`,
                    method: 'POST',
                    headers: {'Content-Type': 'multipart/form-data'},
                    data: formData
                })
                    .then ((res) => {
                        if (res.data.message != 'success'){
                            this.$swal("DB 에러");
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    })
                this.reportFile = name;
                console.log(this.reportFile)
                return true;
            } catch(err){
                console.log(err);
                return false;
            }
        },
        gotoBack() {
            this.$router.push(`/product/${this.$route.params.id}`)
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
}

/* ------------------------------------------------------------- */

.report_wrapper {
    width: 60%;
    height: 800px;
    margin:0 auto;
}
h1 {
    font-size: 30px;
    font-weight: 200;
    margin-bottom: 30px;
}
.report_user_box {
    width:100%;
    height: 80px;
}
.report_user p {
    margin-top: 10px;
    font-size: 20px;
    float: left;
}
.report_nick {
    width: 100px;
    height: 50px;
    float: left;
    margin-left: 40px;
    border: none;
}
.report_title_box {
    width:100%;
    height: 50px;
}
.report_category {
    width: 80px;
    height: 30px;
    text-align: center;
    float: left;
}
.report_title {
    float:left;
    margin-left: 20px;
    width: 70%;
    resize: none;
    border: none;
    border-bottom: 1px solid black;
}
.report_file_box {
    width: 100%;
    height: 50px;
}
.report_upload_file {
    width: 100px;
    height: 40px;
    float: right;
}
.report_file_name {
    width: 100px;
    height: 40px;
    float: right;
    padding-top: 10px;
}
.report_content {
    width: 100%;
    height: 400px;
    resize: none;
    margin: 30px 0;
}
.report_submit_btn {
    width: 100px;
    height: 50px;
    float: right;
    border: none;
    background:none;
    background-color: aqua;
    margin-left: 20px;
    border-radius: 10px;
}
</style>