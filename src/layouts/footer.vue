<template>
    <div class="form">
        <div class="f_add">
            <p>&copy; 2023</p>
            <p>회사소개 별걸다팜| 개인정보처리방침 | 이용약관 | 사업자정보<br>
            대표자 | UNECODE | 사업자등록번호 123-02-1234<br>주소 서울 종로구 종로 78 미려빌딩 이젠 아카데미 컴퓨터 학원<br>
            팩스 | 02-383-1234 | 이메일 abc@naver.com</p>
        </div>
    </div>
</template>

<script>
export default ({
    name: 'footer'
})
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    margin-top: 15px;
}
.form{
    margin: 0;
    padding: 0;
    left: 0;   
    bottom: 0;
    list-style: none;
    text-decoration: none;
    /* border: solid 1px red; */
}
    .f_add{
        position: relative;
        height: auto;
        width: 100%;
        left: 0;       
        bottom: 0; 
        padding: 10px;
        background: #f2f2f2;
    }

    p{
        margin-left: 20px;
        line-height: 24px;
        font-size: 12px;
        color: rgb(173, 173, 173);
    }
</style>