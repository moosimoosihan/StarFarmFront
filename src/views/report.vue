<template>
    <div class="container">
        <div v-if="!isUploading || !isDelete" class="isLoadingScreen"></div>
        <div class="report_wrapper">
            <div class="title">
                <h1>회원 신고</h1>
            </div>
            <div class="report_user">
                <div class="report_user_box">
                    <p>신고 할 유저 :</p>
                    <input type="text" class="report_nick" v-model="reportUser.user_nick" disabled>
                </div>
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
                <span class="report_file_name">파일 업로드</span>
                <input type="file" class="report_upload_file" accept="image/png,image/jpeg" @change="uploadFile($event.target.files)" >
                
                <div class="img_view_container">
                    <img class="img_loader" v-if="reportFileSrc!=''" :src="reportFileSrc" alt="미리보기" type="img">
                    <span v-else>미리보기</span>
                    <button v-if="reportFileSrc!=''" @click="deleteImage()">X</button>
                </div>
            </div>
            <textarea class="report_content" v-model="reportContent"></textarea>
            <div class="btn_container">
                <button class="report_submit_btn" @click="reportSubmit()">신고하기</button>
            </div>
            <button class="report_cancel_btn" @click="gotoBack()">취소</button>
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
            
            // 이미지가 아직 업로드 중인지 확인할 변수
            isUploading: true,
            isDelete: true
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
            this.reportUserNo = this.$route.params.id;
            try{
                const response1 = await axios.get(`http://localhost:3000/mypage/mypage/${this.reportUserNo}`)
                this.reportUser = response1.data[0]
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
            if(!this.isUploading || !this.isDelete){
                return this.$swal('이미지 작업 중입니다.')
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
                        this.$router.push(`/userpage/${this.$route.params.id}`)
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
            if (file.length>0) {
                name = file[0].name;
            }
            else {
                return;
            }
            if (!this.isUploading || !this.isDelete) {
                this.$swal("이미지 작업 중입니다")
                return;
            }
            this.isUploading = false;

            const formData = new FormData();
            
            formData.append('img', file[0]);

            this.reportFileSrc = URL.createObjectURL(file[0]);

            for (let key of formData.keys()) {
                console.log(key, ":", formData.get(key));
            }
            try{
                await axios({
                    url: `http://localhost:3000/auth/delete_img`,
                    method: 'POST',
                    data: {
                        pastname: this.reportFile
                    }
                })
            } catch(err){
                console.log(err);
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
                this.isUploading = true;
                return this.isUploading;
            } catch(err){
                console.log(err);
                this.isUploading = false;
                return isUploading;
            }
        },
        gotoBack() {
            this.$router.push(`/product/${this.$route.params.id}`)
        },
        deleteImage(){
                this.$swal.fire({
                    title:'정말 삭제하시겠습니까?',
                    showCancelButton: true,
                    confirmButtonText: `삭제`,
                    cancelButtonText: `취소`
                }).then(async (result) => {
                    if(result.isConfirmed){
                        if(!this.isUploading || !this.isDelete){
                            return this.$swal('이미지 작업 중입니다.')
                        }
                        this.isDelete = false
                        const img = this.reportFile
                        this.reportFileSrc = ''
                        this.reportFile = ''
                        await axios({
                            url:'http://localhost:3000/goods/delete_img',
                            method:'POST',
                            data:{
                                pastname: img
                            }
                        })
                        this.isDelete = true
                    }
                })
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
    width: 80%;
    display: flex;
    margin: auto;
    border: 2px solid rgb(221, 221, 221);
    flex-direction: row;
    justify-content: center;
}

/* ------------------------------------------------------------- */
.title {
    margin-top: 30px;
}
.report_wrapper {
    width: 80%;
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
    width: 80px;
    height: 30px;
    float: left;
    margin-left: 20px;
    border: 2px solid rgb(221, 221, 221);
    border-radius: 5px;
    margin-top: 7px;
    display: flex;
    color: rgb(137, 137, 137);
    border-radius: 10px;
    text-align: center;
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
    align-items: center;
    border: 2px solid rgb(221, 221, 221);
    border-radius: 5px;
    display: flex;
    color: rgb(137, 137, 137);
    border-radius: 10px;
}
.report_title {
    float:left;
    height: 30px;
    margin-left: 20px;
    width: 80%;
    resize: none;
    align-items: center;
    border: 2px solid rgb(221, 221, 221);
    display: flex;
    color: rgb(137, 137, 137);
    border-radius: 10px;
    padding-left: 10px;
    padding-top: 6px;

}
.report_file_box {
    width: 100%;
    height: 50px;
}
.report_upload_file {
    width: 120px;
    height: 40px;
    float: left;
}
.report_file_name {
    width: 100px;
    height: 40px;
    padding-top: 1px;
    float:left;
}
.report_content {
    width: 100%;
    height: 400px;
    resize: none;
    margin: 30px 0;
    border: 2px solid rgb(221, 221, 221);
    margin-bottom: 10px;
    display: flex;
    color: rgb(137, 137, 137);
    border-radius: 10px;
}
.report_cancel_btn{
    width: 100px;
    height: 50px;
    float: right;
    padding: 10px 20px;
    color: rgb(123, 123, 123);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
    cursor: pointer;
}
.report_submit_btn{
    width: 100px;
    height: 50px;
    float: right;
    padding: 10px 20px;
    color: rgb(123, 123, 123);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
    cursor: pointer;
    margin-left: 20px;
}
.btn_container button:hover {
    color: rgb(0, 0, 0);
    border: 2px solid rgb(253, 217, 249);
    background-color: rgb(255, 236, 253);
    border-radius: 10px;
    cursor: pointer;
}
.img_loader {
    width: 100px;
    height: 100px;
}
.img_view_container {
    width: 140px;
    height: 100px;
    float:left;
    margin-left: 20px;
    margin-bottom: 10px;
    margin-top: 2px;
}
.img_view_container button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: rgb(255, 0, 0);
    border: 2px solid rgb(123, 123, 123);
    background-color: rgb(255, 255, 255);
    float: right;
  }
  input:focus {
    /* border: 2px solid #ffc905; */
    outline: 2px solid rgb(255, 236, 253);
    }
.isLoadingScreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../assets/logo.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}
</style>