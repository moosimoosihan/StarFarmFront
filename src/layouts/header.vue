<template>
    <div class="header_wrapper">
      <div class="navbar_top">
            <div @click="gotoMain()" class="navbar_logo">
                <img class="logo_img" src="../assets/logo.png" alt="로고">
            </div>
            
            <div class="navbar_icons"> 
              <div v-if="user.user_id==''">
                <button @click="gotoLogin()" class="login_btn"><img src="../assets/Login.png" height="50px" width="120px" ></button>
              </div>
              <div v-else>
                <ul class="mymenu">
                  <li>
                    <a1>
                      <div v-if="alram>0" class="alarm">{{ alram }}</div>
                      <img style="border-radius: 70px; border: solid 2px #0d4608;" class="myPage"
                      :src="loginUser.user_img ? require(`../../../StarFarmBack/uploads/userImg/${loginUser.user_no}/${loginUser.user_img}`) : require(`../assets/profile.png`)"
                      alt="프로필 이미지"/></a1>
                        <ul class="mypageMenu">
                        <li @click="gotoMypage()">마이페이지</li>
                        <li @click="gotoUpload()">상품등록</li>
                        <li @click="gotoMyChat()">1:1채팅</li>
                        <li v-if="loginUser.user_tp===1" @click="gotoAdmin()">관리페이지</li>
                        <li @click="logout()">로그아웃</li>
                      </ul>  
                  </li>
                </ul>
              </div>
            </div>

            <div class="navbar_search">
                <input type="text" v-model="searchKeyword">
                <div class="search_btncontainer">
                  <a @click="gotoSearch()"><button class="search_btn">
                    <i class="fas fa-search"></i>
                  </button></a>
              </div>
            </div>
        </div>
      
      <div>
            <ul class="menu">
              <li class="hvr-rectangle-out">
                <a class="cate" @click="gotoCate('의류',0)">의류</a>
                <ul class="submenu">
                  <li><a @click="gotoCate('의류',1)">상의</a></li>
                  <li><a @click="gotoCate('의류',2)">하의</a></li>
                  <li><a @click="gotoCate('의류',3)">신발</a></li>
                  <li><a @click="gotoCate('의류',4)">외투</a></li>
                  <li><a @click="gotoCate('의류',5)">가방</a></li>
                </ul>
              </li>
              <li class="hvr-rectangle-out">
                <a class="cate" @click="gotoCate('뷰티',0)">뷰티</a>
                <ul class="submenu">
                  <li><a @click="gotoCate('뷰티',1)">악세사리</a></li>
                  <li><a @click="gotoCate('뷰티',2)">화장품</a></li>
                  <li><a @click="gotoCate('뷰티',3)">향수</a></li>
                  <li><a href="#">&nbsp;</a></li>
                  <li><a href="#">&nbsp;</a></li>
                </ul>
              </li>
              <li class="hvr-rectangle-out">
                <a class="cate" @click="gotoCate('생활가전',0)">생활/가전</a>
                <ul class="submenu">
                  <li><a @click="gotoCate('생활가전',1)">주방용품</a></li>
                  <li><a @click="gotoCate('생활가전',2)">가전제품</a></li>
                  <li><a @click="gotoCate('생활가전',3)">자동차용품</a></li>
                  <li><a @click="gotoCate('생활가전',4)">생필품</a></li>
                  <li><a href="#">&nbsp;</a></li>
                </ul>
              </li>
              <li class="hvr-rectangle-out">
                <a class="cate" @click="gotoCate('취미',0)">취미</a>
                <ul class="submenu">
                  <li><a @click="gotoCate('취미',1)">스포츠</a></li>
                  <li><a @click="gotoCate('취미',2)">게임</a></li>
                  <li><a @click="gotoCate('취미',3)">음악</a></li>
                  <li><a @click="gotoCate('취미',4)">미술</a></li>
                  <li><a href="#">&nbsp;</a></li>
                </ul>
              </li>
              <li class="hvr-rectangle-out">
                <a class="cate" @click="gotoCate('기타',0)">기타</a>
                <ul class="submenu">
                  <li><a href="#">&nbsp;</a></li>
                  <li><a href="#">&nbsp;</a></li>
                  <li><a href="#">&nbsp;</a></li>
                  <li><a href="#">&nbsp;</a></li>
                  <li><a href="#">&nbsp;</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'header',
    data() {
      return {
        loginUser: {},
        searchKeyword: '',
        url: '',
        alram: 0,
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    created() {
      this.getUser();
    },
    methods: {
        // 로그인한 유저 정보 가져오기
        async getUser() {
          if(this.user.user_no!=''){
            try {
                const response = await axios.get(`http://localhost:3000/mypage/mypage/${this.user.user_no}`);
                this.loginUser = response.data[0];
            } catch (error) {
                console.error(error);
            }
            if(this.loginUser.user_ban===1){
              this.$swal({
                position: 'top',
                icon: 'warning',
                title: '정지된 계정입니다.',
                showConfirmButton: false,
                timer: 1000
              }).then(() => {
                if(this.loginUser.user_social_tp==1){
                  window.Kakao.Auth.logout()
                }
                this.$store.commit("user", {
                  user_no: '',
                  user_id: '',
                })
                window.location.href="http://localhost:8080";
              })
            }
            await this.getAlarm()
          }
        },
        // 메인으로 이동
        gotoMain () {
          this.$router.push('/')
        },
        // 로그인으로 이동
        gotoLogin () {
          this.$router.push('/login')
        },
        // 상품등록으로 이동
        gotoUpload () {
          this.$router.push('/store_upload')
        },
        // 채팅으로 이동
        gotoMyChat() {
          this.$router.push('/mypage/mychat')
        },
        // 마이페이지로 이동
        gotoMypage() {
          this.$router.push('/mypage')
        },
        // 관리자페이지로 이동
        gotoAdmin() {
          this.$router.push('/admin')
        },
        // 로그아웃
        logout() {
          if(this.loginUser.length!=0){
            if(this.loginUser.user_social_tp==1){
              window.Kakao.Auth.logout()
            }
          }
          this.$swal({
            position: 'top',
            icon: 'success',
            title: '로그아웃 성공!',
            showConfirmButton: false,
            timer: 1000
          }).then(() => {
            window.location.href="http://localhost:8080";
            this.$store.commit("user", {
              user_no: '',
              user_id: '',
            })
          })
        },
        // 검색으로 이동
        gotoSearch() {
          if(this.searchKeyword==''){
            this.$swal({
              position: 'top',
              icon: 'warning',
              title: '검색어를 입력해주세요.',
              showConfirmButton: false,
              timer: 1000
            })
            return
          }
          window.location.href=`http://localhost:8080/search_goodslist/all/${this.searchKeyword}/0`
        },
        gotoCate(cate, cate2) {
          window.location.href=`http://localhost:8080/search_goodslist/cate/${cate}/${cate2}`
        },
        // 알람 가져오기
        async getAlarm() {
          try {
            const response = await axios.get(`http://localhost:3000/auth/check_alram/${this.user.user_no}`);
            this.alram = response.data[0].count;
          } catch (error) {
            console.error(error);
          }
        },
    },
}
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
  min-width: 1280px;
  height: 110px;
  background: #ffffff;
  box-shadow: 0 4px 5px -4px rgb(219, 219, 219);
}

.navbar_top {
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  --bs-navbar-padding-x: 0;
}

/* ------------------------------------------------------ logo */
.logo_img {
  width: 200px;
  height: 85px;
  float: left;
  padding: 0 0 0 16px;
  margin-top: 25px;
  margin-left: 35px;
}

/* ------------------------------------------------------ search */
.navbar_search {
  display: flex;
  width: 20%;
  max-width: 100%;
  outline: rgb(194, 194, 194) solid 3px;
  background-color: rgb(255, 255, 255);
  float : right;
  margin-right: 55px;
  margin-top: 50px;
  border-radius: 20px;
  box-shadow: 4px 4px 10px rgba(0,0,0,0.1);
}

input[type='text'] {
  width: 100%;
  font-size: 1rem;
  outline: none;
  background-color: rgb(255, 255, 255);
  border: none;
  margin-right: 8px;
  margin-left: 20px;
  border-radius: 30px;

}

input[type='text']:focus {
  caret-color: rgb(0, 0, 0);
}

input::placeholder {
  color:  rgb(239, 255, 237);
}

.search_btn {
  border: 0;
  height: 38px;
  width: 50px;
  position: relative;
  background: none;
  cursor: pointer;
}

/* --------------------------------- icomyPagen */
.navbar_icons {
  width: 100%;
  justify-content: space-between;
  align-items:center;
}

.myPage {
  width: 55px;
  height: 55px;
  float: right;
  margin-top: 10px;
  margin-right: 10px;
}


.login_btn {
  float: right;
  margin-top: 15px;
  margin-right: 35px;
  margin-top: 40px;
  background-color: transparent;
  border: 0;
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
    min-width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0;
    --bs-navbar-padding-x: 0;
  }

  .navbar_logo {
    scale: 100%;
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
    width: 45%;
    position: absolute;
    overflow: hidden;
    justify-content:center;
    margin-left: 20%;
    margin-right: 5%;
  }
  .menu > li {
    width: 20%;
    float: left;
    text-align: center;
    line-height: 40px;
    background-color: #ffffff;
  }
  
  .menu a {
    color: #520119;
    user-select: none;
    -webkit-transition: all .25s ease;
    -moz-transition: all .25s ease;
    -ms-transition: all .25s ease;
    -o-transition: all .25s ease;
    transition: all .25s ease;
  }
  .menu a:hover {
    font-size: 24px;
  }
  
  .submenu > li {
    line-height: 50px;
    background-color: #ffffff;
  }
  
  .submenu {
    height: 0; /*ul의 높이를 안보이게 처리*/
  }
  .submenu a {
    user-select: none;
  }

  .menu > li:hover {
    transition-duration: 0.5s;
  }
  
  .menu:hover {
    height: 250px; /*서브메뉴 li한개의 높이 50*5*/
    transition-duration: 1s;
  }

  .mymenu {
    width:100px;
    overflow: hidden;
    margin-top: 30px;
    margin-bottom: 30px;
    float:right;
    
  }
  .mymenu > li {
    width:76px;
    float: left;
    text-align: center;
    line-height: 40px;
    background-color: #ffffff;
    cursor:pointer;
    font-size: 14px;
  }
  
  .mymenu a {
    color: #520119;
  }
  .mypageMenu > li {
    line-height: 50px;
    background-color: #ffffff;
  }
  
  .mypageMenu {
    height: 0; /*ul의 높이를 안보이게 처리*/
  }
  .mypageMenu li:hover {
    color:#520119;
    font-weight: 600;
  }

  .mymenu > li:hover {
    background-color: #c4c4c4;
    transition-duration: 0.5s;
  }
  
  .mymenu:hover {
    height: 300px; /*서브메뉴 li한개의 높이 50*5*/
    transition-duration: 1s;
  }
  .search_btncontainer {
    scale: 150%;
  }

  .cate {
    font-size: 20px;
    font-weight: 700;
  }


.hvr-rectangle-out {
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  background: #e1e1e1;
  -webkit-transition-property: color;
  transition-property: color;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
}
.hvr-rectangle-out:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #caffaa;
  -webkit-transform: scale(0);
  transform: scale(0);
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}
.hvr-rectangle-out:hover, .hvr-rectangle-out:focus, .hvr-rectangle-out:active {
  color: white;
}
.hvr-rectangle-out:hover:before, .hvr-rectangle-out:focus:before, .hvr-rectangle-out:active:before {
  -webkit-transform: scale(1);
  transform: scale(1);
}
.alarm{
  margin-top: 10px;
  margin-right: 30px;
  position: absolute;
  right: 0;
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
  color: white;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  font-weight: 700;
}
</style>
