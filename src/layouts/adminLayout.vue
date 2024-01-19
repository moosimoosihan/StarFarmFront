<template>
  <main class="main, root_container" v-if="admin">
    <aside class="sidebar">
      <nav class="nav">
        <ul>
          <li><div class="management-box ">
            <router-link to="/">
              <h3>메인으로</h3>
            </router-link>
            </div>
          </li>
          <li><div class="management-box ">
            <router-link to="/admin/">
              <h3>회원관리</h3>
            </router-link>
            </div>
          </li>
          <li>
            <div class="management-box ">
            <router-link to="/admin/deal/0">
              <h3>거래관리</h3>
            </router-link>
            </div>
          </li>
          <li>
            <div class="management-box ">
              <router-link to="/admin/report">
                <h3>신고관리</h3>
              </router-link>
              </div>
          </li>
        </ul>
      </nav>
    </aside>
  </main>
    <router-view></router-view>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            loginUser: {},
            admin: false,
        }
    },
    computed: {
        user() {
            return this.$store.state.user
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
            if(this.loginUser.user_tp == 1) {
                this.admin = true;
            } else {
                this.admin = false;
            }
          } else {
            alert('로그인 후 이용해주세요.');
            this.$router.push('/');
          }
        },
        // 메인으로 이동
        gotoHome() {
            this.$router.push('/');
        }
    },
}
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
html {
  font-family: Arial;
  font-size: 16px;
  background: #5e42a6;
}

.root_container {
  width: 100%;
  min-width: 1280px;
}

.sidebar {
  position: fixed;
  width: 20%;
  height: 100vh;
  background: #312450;
  font-size: 0.65em;
}

.nav {
  position: relative;
  margin: 0 15%;
  text-align: right;
  top: 30%;
  transform: translateY(-50%);
  font-weight: bold;
}

.nav ul {
  list-style: none;
}
.nav ul li {
  position: relative;
  margin: 8.2em 0;
}
.nav ul li a {
  line-height: 5em;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.4em;
  color: rgba(255, 255, 255, 0.35);
  display: block;
  transition: all ease-out 300ms;
}
.nav ul li.active a {
  color: white;
}
.nav ul li:not(.active)::after {
  opacity: 0.2;
}
.nav ul li:not(.active):hover a {
  color: rgba(255, 255, 255, 0.75);
}
.nav ul li::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 0.2em;
  background: black;
  left: 0;
  bottom: 0;
  background-image: linear-gradient(to right, #5e42a6, #b74e91);
}
</style>
