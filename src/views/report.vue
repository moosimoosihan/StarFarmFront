<template>
    <div class="container">
        <div class="report_wrapper">
            <h1>회원 신고</h1>
            <div class="report_user">
                <div class="report_user_box">
                    <p>신고 할 유저 :</p>
                    <input type="text" placeholder="닉네임(이메일)" class="report_nick">
                </div>
                <div class="report_title_box">
                    <select class="report_category">
                        <option>상품신고</option>
                        <option>판매자 신고</option>
                        <option>구매자 신고</option>
                    </select>
                    <textarea placeholder="글 제목" class="report_title"></textarea>
                </div>
                <div class="report_file_box">
                    <input type="button" value="파일 업로드" class="report_upload_file">
                    <div class="report_file_name">파일 제목</div>
                </div>
            </div>
            <form class="report_submit">
                <textarea class="report_content"></textarea>
                <input type="submit" value="신고하기" class="report_submit_btn">
                <input type="button" value="취소" class="report_submit_btn">
            </form>
        </div>
    </div>
</template>
<script>

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