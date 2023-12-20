<!-- TODO : 카테고리 네비 및 로그인 검색 버튼 -->
<template>
    <div class="container">
            <div @click="gotoMain()" class="logo_container">
                <img class="logo_img" src="" alt="로고">
            </div>
            
            <div @click="gotoLogin()" class="login_container">
                <!-- 미 로그인 시 -->
                <button class="login_btn">로그인</button>
                <!-- 로그인 시 -->
                <button>1:1채팅</button>
                <img class="profile_img" src="" alt="프로필 사진">
            </div>

            <div class="search_container">
                <input type="text">
                <button class="search_btn">검색</button>
            </div>
        </div>
            <ul class="menu">
              <li>
                <a href="#">MENU1</a>
                <ul class="submenu">
                  <li><a href="#">submenu01</a></li>
                  <li><a href="#">submenu02</a></li>
                  <li><a href="#">submenu03</a></li>
                  <li><a href="#">submenu04</a></li>
                  <li><a href="#">submenu05</a></li>
                </ul>
              </li>
              <li>
                <a href="#">MENU2</a>
                <ul class="submenu">
                  <li><a href="#">submenu01</a></li>
                  <li><a href="#">submenu02</a></li>
                  <li><a href="#">submenu03</a></li>
                  <li><a href="#">submenu04</a></li>
                  <li><a href="#">submenu05</a></li>
                </ul>
              </li>
              <li>
                <a href="#">MENU3</a>
                <ul class="submenu">
                  <li><a href="#">submenu01</a></li>
                  <li><a href="#">submenu02</a></li>
                  <li><a href="#">submenu03</a></li>
                  <li><a href="#">submenu04</a></li>
                  <li><a href="#">submenu05</a></li>
                </ul>
              </li>
              <li>
                <a href="#">MENU4</a>
                <ul class="submenu">
                  <li><a href="#">submenu01</a></li>
                  <li><a href="#">submenu02</a></li>
                  <li><a href="#">submenu03</a></li>
                  <li><a href="#">submenu04</a></li>
                  <li><a href="#">submenu05</a></li>
                </ul>
              </li>
              <li>
                <a href="#">MENU5</a>
                <ul class="submenu">
                  <li><a href="#">submenu01</a></li>
                  <li><a href="#">submenu02</a></li>
                  <li><a href="#">submenu03</a></li>
                  <li><a href="#">submenu04</a></li>
                  <li><a href="#">submenu05</a></li>
                </ul>
              </li>
              <li>
                <a href="#">커뮤니티</a>
                <ul class="submenu">
                  <li><a href="#">신고하기</a></li>
                  <li><a href="#"></a></li>
                  <li><a href="#"></a>  </li>
                  <li><a href="#"></a>  </li>
                  <li><a href="#"></a>  </li>
                </ul>
              </li>
            </ul>
</template>
<script>
export default ({
    name: 'header',
    methods: {
        gotoMain () {
            window.location.href = `http://localhost:8080/`
        },
        gotoLogin () {
             window.location.href = `http://localhost:8080/`
        },

    }
})
</script>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.container {
    width: 100%;
    height: 200px;
    background-color: #94a9ff;
}
/*------------------------*/

.logo_container {
    float: left;
    width: 120px;
    height: 120px;
    background-color: red;
    margin-top: 40px;
    margin-left: 80px;
}
.login_container {
    float: right;
    margin-top: 70px;
    margin-right: 60px;
}
.search_container {
    float: right;
    margin-top: 70px;
    margin-right: 150px;
}

input {
    width: 350px;
    height: 40px;
}
.search_btn {
    width: 70px;
    height: 40px;
}
.login_btn {
    width: 80px;
    height: 40px;
}

li {
    list-style:none
}

a {
    text-decoration:none;font-size:14px
}

.menu {
    width: 80%;
    overflow: hidden;
    margin: auto;
    justify-content:space-between;
    margin-left: 10%;
  }
  .menu > li {
    width: 255px;
    float: left;
    text-align: center;
    line-height: 40px;
    background-color: #5778ff;
  }
  
  .menu a {
    color: #fff;
  }
  
  .submenu > li {
    line-height: 50px;
    background-color: #94a9ff;
  }
  
  .submenu {
    height: 0; /*ul의 높이를 안보이게 처리*/
   
  }

  .menu > li:hover {
    background-color: #94a9ff;
    transition-duration: 0.5s;
  }
  
  .menu > li:hover .submenu {
    height: 250px; /*서브메뉴 li한개의 높이 50*5*/
    transition-duration: 1s;
  }
</style>