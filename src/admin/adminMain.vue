<template>
    <div class="container">
        <div>
            <!-- 총 유저 수, 총 상품 수 -->
            <ul class="axis_y">
                <li>총 유저 수 : {{ totalUserCount }}</li>
                <li>총 상품 수 : {{ totalProductCount }}</li>
            </ul>
        </div>
        <div>
            <!-- 카테고리별 판매 수, 총 판매 금액, 평균 판매 금액 -->
            <!-- <ul class="axis_y">
                <li>카테고리별 판매 수</li>
                <li>총 판매 금액</li>
                <li>평균 판매 금액</li>
            </ul>
            <ul class="axis_x"> -->
                <!-- item 을 차트에서 표현해야하는 개수만큼 나열한다. -->
                <!-- <li class="item">
                    <div class="text_box">
                    <strong class="day">의류</strong>
                    <span class="time">상의</span>
                    </div>
                    <button type="button" class="graph">
                    <span class="time data1" style="height:80%;"><span class="blind">data 타입 1</span></span>
                    </button>
                </li> 
            </ul> -->
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: 'adminMain',
    data() {
        return {
            totalUserCount: 0,
            totalProductCount: 0,
        }
    },
    created() {
        this.getTotalCount()
    },
    methods: {
        async getTotalCount() {
            try{
                const res = await axios.get('http://localhost:3000/auth/admin/totalcount')
                this.totalUserCount = res.data.totalUsercount
                this.totalProductCount = res.data.totalGoodsCount
            } catch(err) {
                console.log(err)
            }
        }
    }
}
</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}
.vertical_chart_box .axis_y {
    display: -webkit-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    width: 20px;
    height: 100%;
    font-size: 12px;
    color: #4a4a4a;
}

</style>