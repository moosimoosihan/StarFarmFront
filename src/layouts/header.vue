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
                      <img style="border-radius: 10px;" class="myPage"
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

                <!-- <button @click="gotoUpload()" class="storeupload_btn"><img src="../assets/storeupload.png" height="50px" width="120px" ></button>
                <button class="chat_btn" @click="gotoMyChat()"><img src="../assets/chatting.png" height="50px" width="120px" ></button> -->
              </div>
            </div>

            <div class="navbar_search">
                <input type="text" v-model="searchKeyword" @change="changeUrl()" placeholder="검색어를 입력해주세요.">
                <div class="search_btncontainer">
                  <a v-bind:href="url!=''? url:'#'"><button class="search_btn">
                    <i class="fas fa-search"></i>
                  </button></a>
              </div>
            </div>
        </div>
      
      <div>
            <ul class="menu">
              <li>
                <a class="cate" href="/search_goodslist/cate/의류/0">의류</a>
                <ul class="submenu">
                  <li><a href="/search_goodslist/cate/의류/1">상의</a></li>
                  <li><a href="/search_goodslist/cate/의류/2">하의</a></li>
                  <li><a href="/search_goodslist/cate/의류/3">신발</a></li>
                  <li><a href="/search_goodslist/cate/의류/4">외투</a></li>
                  <li><a href="/search_goodslist/cate/의류/5">가방</a></li>
                </ul>
              </li>
              <li>
                <a class="cate" href="/search_goodslist/cate/뷰티/0">뷰티</a>
                <ul class="submenu">
                  <li><a href="/search_goodslist/cate/뷰티/1">악세사리</a></li>
                  <li><a href="/search_goodslist/cate/뷰티/2">화장품</a></li>
                  <li><a href="/search_goodslist/cate/뷰티/3">향수</a></li>
                  <li><a href="#">&nbsp;</a></li>
                  <li><a href="#">&nbsp;</a></li>
                </ul>
              </li>
              <li>
                <a class="cate" href="/search_goodslist/cate/생활가전/0">생활/가전</a>
                <ul class="submenu">
                  <li><a href="/search_goodslist/cate/생활가전/1">주방용품</a></li>
                  <li><a href="/search_goodslist/cate/생활가전/2">가전제품</a></li>
                  <li><a href="/search_goodslist/cate/생활가전/3">자동차용품</a></li>
                  <li><a href="/search_goodslist/cate/생활가전/4">생필품</a></li>
                  <li><a href="#">&nbsp;</a></li>
                </ul>
              </li>
              <li>
                <a class="cate" href="/search_goodslist/cate/취미/0">취미</a>
                <ul class="submenu">
                  <li><a href="/search_goodslist/cate/취미/1">스포츠</a></li>
                  <li><a href="/search_goodslist/cate/취미/2">게임</a></li>
                  <li><a href="/search_goodslist/cate/취미/3">음악</a></li>
                  <li><a href="/search_goodslist/cate/취미/4">미술</a></li>
                  <li><a href="#">&nbsp;</a></li>
                </ul>
              </li>
              <li>
                <a class="cate" href="/search_goodslist/cate/기타/0">기타</a>
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
          }
        },
        gotoMain () {
          this.$router.push('/')
        },
        gotoLogin () {
          this.$router.push('/login')
        },
        gotoUpload () {
          this.$router.push('/store_upload')
        },
        gotoMyChat() {
          this.$router.push('/mypage/mychat')
        },
        gotoMypage() {
          this.$router.push('/mypage')
        },
        gotoAdmin() {
          this.$router.push('/admin')
        },
        logout() {
          if(this.loginUser.user_social_tp==1){
                    window.Kakao.Auth.logout()
                }
                this.$store.commit("user", {
                  user_no: '',
                  user_id: '',
                })
                this.$swal({
                    position: 'top',
                    icon: 'success',
                    title: '로그아웃 성공!',
                    showConfirmButton: false,
                    timer: 1000
                    }).then(() => {
                        window.location.href="http://localhost:8080";
                    })
            },
          changeUrl() {
            this.url = `/search_goodslist/all/${this.searchKeyword}/1`
          }
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
  height: 200px;
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
  width: 230px;
  height: 100px;
  float: left;
  padding: 0 0 0 16px;
  margin-top: 30px;
  margin-left: 35px;
}

/* ------------------------------------------------------ search */
.navbar_search {
  display: flex;
  width: 20%;
  max-width: 100%;
  outline: rgb(0, 0, 0) solid 2px;
  background-color: rgb(230, 255, 219);
  float : right;
  margin-right: 55px;
  margin-top: 50px;
  border-radius: 30px;
}

input[type='text'] {
  width: 100%;
  font-size: 1rem;
  outline: none;
  background-color: rgb(230, 255, 219);
  border: none;
  margin-right: 8px;
  margin-left: 20px;
  border-radius: 30px;

}

input[type='text']:focus {
  caret-color: rgb(0, 0, 0);
}

input::placeholder {
  color:  rgb(255, 236, 253);
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
    width: 80%;
    position: fixed;
    overflow: hidden;
    justify-content:center;
    margin-top: 100px;
    margin-bottom: 30px;
    margin-left: 10%;
    margin-right: 10%;
  }
  .menu > li {
    width: 16%;
    float: left;
    text-align: center;
    line-height: 40px;
    background-color: #ffffff;
  }
  
  .menu a {
    color: #520119;
  }
  
  .submenu > li {
    line-height: 50px;
    background-color: #ffffff;
  }
  
  .submenu {
    height: 0; /*ul의 높이를 안보이게 처리*/
   
  }

  .menu > li:hover {
    background-color: #c4c4c4;
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
    width:70px;
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
</style>
