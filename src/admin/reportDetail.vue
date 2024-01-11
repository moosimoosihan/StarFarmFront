<template>
    <div class="container">
        <div class="title">
            <p>신고 제목 :[{{ report.REPORT_CATEGORY }}] {{ report.REPORT_TITLE }}</p>
        </div>
        <div class="report_img" v-if="report.REPORT_IMG">
            <img :src="require(`../../../StarFarmBack/uploads/reportImg/${report.REPORT_NO}/${report.REPORT_IMG}`)" alt="신고 이미지">
        </div>
        <div class="report_content">
            <p>신고 내용</p>
            <textarea name="report_content" id="report_content" cols="30" rows="10" v-model="report.REPORT_CONTENT" readonly></textarea>
        </div>
        <div>
            <button class="close-button" @click="closeWindow">닫기</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data () {
        return {
            report: {},
        }
    },
    mounted() {
        this.getReport();
    },
    methods: {
        async getReport() {
            try{
                const report_no = this.$route.params.id;
                const res = await axios.get(`http://localhost:3000/auth/admin/reportInfo/${report_no}`);
                this.report = res.data[0];
            } catch(err) {
                console.log(err);
            }
        },
        closeWindow() {
            window.close();
        }
    }
}

</script>
<style scoped>

</style>