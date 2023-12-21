<!-- TODO : 카테고리 네비 및 로그인 검색 버튼 -->
<template>
    <div class="header_wrapper">
      <div class="navbar_top">
            <div @click="gotoMain()" class="navbar_logo">
                <img class="logo_img" src="" alt="로고">
            </div>
            
            <div class="navbar_icons">
                <!-- 미 로그인 시 -->
                <button @click="gotoLogin()" class="login_btn">로그인</button>
                <!-- 로그인 시 -->
                <!-- <button class="chat_btn">1:1채팅</button>
                <img class="myPage" src="" alt="프로필 사진"> -->
            </div>

            <div class="navbar_search">
                <input type="text">
                <div class="search_btncontainer">
                  <button class="search_btn">
                    <i class="fas fa-search"></i>
                  </button>
              </div>
            </div>
        </div>
      
      <div>
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
                  <li><a href="#"></a>&nbsp;</li>
                  <li><a href="#"></a>&nbsp;</li>
                  <li><a href="#"></a>&nbsp;</li>
                  <li><a href="#"></a>&nbsp;</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
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
<style scoped>
.title {
  cursor: pointer;
}

* {
  margin: 0;
  padding: 0;
}

ul,
li {
  list-style: none;
}

a {
  text-decoration: none;
}

.header_wrapper {
  font-size: 15px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  background: #ffffff;
  box-shadow: 0 4px 5px -4px rgb(219, 219, 219);
}

.navbar_top {
  height: 90px;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  --bs-navbar-padding-x: 0;
}

/* ------------------------------------------------------ logo */
.logo_img {
  width: 100px;
  height: 50px;
  float: left;
  padding: 0 0 0 16px;
  background-color: red;
  margin-top: 20px;
  margin-left: 20px;
}

/* ------------------------------------------------------ search */
.navbar_search {
  display: flex;
  width: 40%;
  max-width: 100%;
  outline: rgb(237, 237, 237) solid 2px;
  background-color: rgb(251, 251, 251);
  float : right;
  margin-right: 20px;
  margin-top: 20px;
}

input[type='text'] {
  width: 100%;
  font-size: 1rem;
  outline: none;
  background-color: rgb(251, 251, 251);
  border: none;
  margin-right: 8px;
}

input[type='text']:focus {
  caret-color: rgb(0, 0, 0);
}

input::placeholder {
  color: #aaa;
}

.search_btn {
  border: 0;
  height: 38px;
  width: 50px;
  position: relative;
  background: none;
  cursor: pointer;
}

/* --------------------------------- icon */
.navbar_icons {
  width: 100%;
  justify-content: space-between;
  align-items:center;
}

.myPage {
  width: 80px;
  height: 40px;
  float: right;
  margin-top: 20px;
  margin-right: 20px;
}

.chat_btn {
  width: 80px;
  height: 40px;
  float: right;
  margin-top: 20px;
  margin-right: 20px;
}

.login_btn {
  width: 80px;
  height: 40px;
  float: right;
  margin-top: 20px;
  margin-right: 20px;
}

/* --------------------------------------------------------------------------------------------------------------- */


@media screen and (max-width: 768px) {

  * {
    padding: 0;
    margin: 0;
  }

  /* --------- logo */

  .header_wrapper {
    min-height: 150px;
  }

  .navbar_top {
    display: flex;
    justify-content: space-between;
    padding: 0;
    --bs-navbar-padding-x: 0;
  }

  .navbar_logo {
    scale: 70%;
    position: relative;
  }

  .navbar_search {
    display: none;
  }

  .navbar_icons {
    scale: 70%;
  }
}

/* -------- */
li {
    list-style:none
}

a {
    text-decoration:none;font-size:14px
}

.menu {
    width: 100%;
    overflow: hidden;
    margin: auto;
    justify-content:space-between;
    margin-left: 10%;
  }
  .menu > li {
    width: 13.333%;
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
  
  .menu:hover {
    height: 250px; /*서브메뉴 li한개의 높이 50*5*/
    transition-duration: 1s;
  }
  .search_btncontainer {
    scale: 150%;
  }
</style>