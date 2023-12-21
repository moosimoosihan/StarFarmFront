<template>
    <div class="container">
        <div class="menu-container">
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
        <router-view></router-view>
    </div>
</template>

<script>

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
    width: 350px;
    padding: 20px;
    border: 1px solid #000000; /* 검은선 */
}
.management-box {
    background-color: #f57575;
    padding: 3px;
    margin-bottom: 90px;
    border-radius: 5px;
    box-shadow: 0 0 2px rgba(50, 255, 118, 0.1);
    text-align: center; 
}
</style>
