<template>
     <div class="wrapper">
        <div class="title"><h1 style="font-size: 21px;">회원가입</h1>
        </div>
        <div id="box1">
        <div class="id">
          <input id="id"  type="text" placeholder="id를 입력해 주세요.">
          <button>중복확인</button>
          <div id="idError" class="error"></div>
      </div>
      <div class="id">
        <input id="id"  type="text" placeholder="id를 입력해 주세요.">
        <div id="idError" class="error"></div>
    </div>
        <div class="password">
            <input id="password" type="password" placeholder="비밀번호를 입력해 주세요.">
            <div id="passwordError" class="error"></div>
        </div>
        <div class="passwordCheck">
            <input id="passwordCheck" type="password" placeholder="비밀번호를 다시 입력해 주세요.">
            <div id="passwordCheckError" class="error"></div>
        </div>
        <div class="nickName">
          <input id="nickName" type="text" placeholder="닉네임을 입력해 주세요.">
          <div id="nickNameError" class="error"></div>
      </div>
        <div class="email">
          <input id="email" type="text" placeholder="이메일을 입력해 주세요.">
          <button>중복확인</button>
          <div id="emailError" class="error"></div>
      </div>
        <div class="phone">
          <input id="phone" type="text" placeholder="전화번호를 입력해 주세요." maxlength="11"> 
          <button>인증</button>
          <div id="phoneError" class="error"></div>
        </div>
        <div class="address">
          <input id="address" type="text" placeholder="주소를 입력해 주세요."> 
          <button id="signUpButton" disabled onclick="signUpCheck()">주소찾기</button>
          <div id="addressError" class="error"></div>
        </div>  
        <div class="addressDetail">
          <input id="addressDetail" type="text" placeholder="상세주소를 입력해 주세요."> 
          <div id="addressDetailError" class="error"></div>
        </div>
        <div class="profile-upload-content upload-img">
          <div class="img-preview">
            <img
              id="img-preview"
              src=""
              style="display: none"
              width="250"
              alt="미리보기"
            />
            <input id="img-url" type="hidden" name="url" />
          </div>
        </div>
      </div>

        <div id="box2">
        <div class="profile-img">
          <input id="profile-img" type="text" placeholder="이미지"> 
          <br>
          <br>
          <button class="imgButton">사진등록</button>

        </div>
        </div>
        </div>
        <div id="box3">
        <div class="signUp">
          <button class="cancelButton" >취소하기</button>
          <button class="signUpButton">가입하기</button>
        </div>
        </div>
</template>
<script>

</script>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.container {
    width: 100%;
    height: 100%;
}
html {
    width: 100%;
    justify-content: center;
    padding-top: 50px;
    padding-bottom: 20px;
}
body {
    width: 850px;
    height: 800px;
    border: 1px solid black;
    margin-left: 20px;
}

div {
    padding-top: 3px;

}

.title {
    text-align: center;
    font-weight: 700;

}

.signUpButton {
    width:300px;
    cursor:pointer;

}

.cancelButton {
    width:300px;
    cursor:pointer;

}

button{
    cursor: pointer;
    height: 40px;
    width: 70px;
}

.error{
    font-size: 1px;
    height: 20px;
    color:red;
    font-weight: 700;
}
.signUp button {
    margin-left: 80px;
    margin-top: 40px;
}

input {
    margin-left: 20px;
    width:300px;
    border: 2px solid black;
    border-radius: 3px;
    line-height: 35px;
    font-size: 12px;
    padding-left: 10px;
    padding-right: 10px;
}

#addressDetail {
    margin-left: 20px;
    width: 300px;
    border: 2px solid black;
    border-radius: 3px;
    line-height: 35px;
    font-size: 12px;
    padding-left: 10px;
    padding-right: 10px;
}

#box1 {
    width: 400px;
    height: 600px;
    float: left;
}


#box2 {
width: 400px;
height: 600px;
float: right;
}

#profile-img {
        width: 200px;
        height: 200px; 
        border-radius: 70%;
        overflow: hidden;
        text-align: center;
        margin-top: 80px;
        margin-left: 80px;
    }

    .imgButton {
        margin-left: 140px;
        margin-top: 10px;
    }
</style>