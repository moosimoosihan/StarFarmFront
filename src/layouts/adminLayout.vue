<template>
    <div>
        <div class="container" v-if="admin">
            <div class="menu-container">
                <div class="management-box ">
                    <router-link to="/">
                        <h3>메인으로</h3>
                    </router-link>
                </div>
                <div class="management-box ">
                    <router-link to="/admin/">
                        <h3>회원관리</h3>
                    </router-link>
                </div>
                <div class="management-box ">
                    <router-link to="/admin/deal">
                        <h3>거래관리</h3>
                    </router-link>
                </div>
                <div class="management-box ">
                    <router-link to="/admin/report">
                        <h3>신고관리</h3>
                    </router-link>
                </div>
            </div>
            <div>
                <router-view></router-view>
            </div>
        </div>
        <div v-else>
            <h1>접근 권한이 없습니다.</h1>
            <button @click="gotoHome">홈으로</button>
        </div>
    </div>
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
        gotoHome() {
            this.$router.push('/');
        }
    },
}
</script>
<style scoped>
.container {
    display: flex;
    background-color: #ffffff;
    height: 100vh;
}
.menu-container {
    display: flex;
    flex-direction: column;
    width: 400px;
    padding: 20px;
    border: 1px solid #000000; /* 검은선 */
}
.management-box {
    width: 100px;
    background-color: #f57575;
    padding: 3px;
    margin-bottom: 90px;
    border-radius: 5px;
    box-shadow: 0 0 2px rgba(50, 255, 118, 0.1);
    text-align: center; 
}
</style>
