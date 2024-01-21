<template>
    <main class="mt-3">
        <div class="container">
            <div class="myinfo">
                <div class="salelist_title">
                    <span class="title">판매 상품 관리</span>
                    <select class="form-select" aria-label="Default select example" v-model="sort" @change="getSaleList(sort,page)">
                        <option value="none" selected>전체</option>
                        <option value="0">경매 중</option>
                        <option value="1">거래 중</option>
                        <option value="2">거래 완료</option>
                        <option value="3">유찰</option>
                    </select>
                </div>
                <div class="salelist">
                    <table class="table" style="width:100%;">
                        <thead>
                            <tr>
                                <th>판매번호</th>
                                <th>상품 이미지</th>
                                <th>상품명</th>
                                <th>금액</th>
                                <th>판매 상태</th>
                                <th>판매 기간</th>
                                <th>기타</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(goodslist,i) in saleList" :key="i">
                                <td>
                                    <p>{{ goodslist.GOODS_NO }}</p>
                                </td>
                                <td>
                                    <div v-if="alram[i]>0" class="alarm">{{ alram[i] }}</div>
                                    <img :width="70" :height="70" style="border-radius: 10px;"
                                        :src="goodslist.GOODS_IMG ? require(`../../../StarFarmBack/uploads/uploadGoods/${goodslist.GOODS_NO}/${goodslist.GOODS_IMG.split(',')[0]}`) : require(`../assets/2-1.png`)"
                                        alt="상품 이미지" @click="gotoProduct(goodslist.GOODS_NO)" />

                                </td>
                                <td>
                                    <p>{{ goodslist.GOODS_NM }}</p>
                                </td>
                                <td>
                                    <span>낙찰가:{{ formatPrice(succ_bidList[i]) }}</span><br>
                                </td>
                                <td>
                                    <p>{{ getOrderStatusText(goodslist.GOODS_STATE) }}</p>
                                </td>
                                <td>
                                    <p>{{ formatDateTime(goodslist.GOODS_TIMER) }}</p>
                                </td>
                                <td>
                                    <!-- 판매완료 -->
                                    <div v-if="goodslist.GOODS_STATE===2 && review_count[i]===0">
                                        <span @click="writeReview(goodslist.GOODS_NO)">후기 작성</span>
                                        <!-- <div class="trash_icon" @click="deleteItem(goodslist.GOODS_NO)">
                                            <i class="fas fa-solid fa-trash"></i>
                                        </div> -->
                                    </div>
                                </td>
                            </tr>
                            <tr v-if="saleList.length === 0">
                                <td colspan="7">판매 상품이 없습니다.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="page_container">
                    <button v-if="page>0" class="pageNum" @click="prev()">이전</button>
                    <button v-for="num in getPageNumbers()" :key="num" class="pageNum" :id="num==page? 'select':''" @click="getSaleList(sort,num)">{{num+1}}</button>
                    <button v-if="page<(pageCount-1)" class="pageNum" @click="next()">다음</button>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import axios from 'axios';

    export default {
        name: 'salelist',
        data () {
            return {
                // 판매 상품 관리
                saleList: [],
                succ_bidList: [],
                review_count: [],

                // 페이지
                page: 0,
                pageCount: 0,

                // 정렬
                sort: 'none',

                // 알람
                alram: [],
            }
        },
        created() {
            this.getSaleList(this.sort, this.page);
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
        },
        methods: {
            // 페이지 리밋 5페이지
            getPageNumbers() {
                const groupSize = 5; // 페이지 그룹 크기
                const groupIndex = Math.floor(this.page / groupSize); // 현재 페이지 그룹 인덱스
                const start = groupIndex * groupSize; // 현재 페이지 그룹의 시작 페이지 번호
                const end = Math.min(start + groupSize, this.pageCount); // 현재 페이지 그룹의 마지막 페이지 번호
                return Array.from({length: end - start}, (v, i) => start + i); // 페이지 번호 배열 생성
            },
            // 판매 총 상품 갯수 가져와 페이지 수 계산
            async getSalePage() {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/salelistCount/${this.user.user_no}/${this.sort}`);
                    this.pageCount = Math.ceil(response.data[0].count / 10);
                } catch (error) {
                    console.error(error);
                }
            },
            // 판매 상품 리스트 가져오기
            async getSaleList(sort, page) {
                try {
                    const response = await axios.get(`http://localhost:3000/mypage/salelist/${this.user.user_no}/${sort}/${page}`);
                    this.saleList = response.data;
                } catch (error) {
                    console.error(error);
                }
                this.succ_bidList = []
                this.review_count = []
                this.alram = []
                for(let i=0; i<this.saleList.length; i++){
                    let val = await this.getSuccBid(this.saleList[i].GOODS_NO)
                    if(val === undefined || val === null){
                        val = '입찰없음';
                    }
                    this.succ_bidList.push(val)

                    let val2 = await this.getReviewCount(this.saleList[i].GOODS_NO)
                    this.review_count.push(val2)

                    await this.getAlram(this.saleList[i].GOODS_NO)
                }
                await this.getSalePage()
            },
            // 리뷰 갯수 가져오기
            async getReviewCount(goods_no) {
                try {
                    const response = await axios.get(`http://localhost:3000/goods/getReviewCount/${goods_no}/${this.user.user_no}`);
                    return response.data[0].count;
                } catch (error) {
                    console.error(error);
                }
            },
            // 리뷰 작성
            writeReview(goods_no) {
                this.$router.push(`/review/${goods_no}/sale`);
            },
            // 상품 상태 텍스트
            getOrderStatusText(status) {
                switch (status) {
                    case 0:
                        return "경매 중";
                    case 1:
                        return "거래 중";
                    case 2:
                        return "거래 완료";
                    case 3:
                        return "유찰";
                    case 4:
                        return "삭제";
                    default:
                        return "";
                }
            },
            // 상품 상세페이지로 이동
            gotoProduct(index) {
                this.$router.push(`/product/${index}`);
            },
            // 날짜 포맷
            formatDateTime(dateTime) {
                const date = new Date(dateTime);
                const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                };
                const formattedDateTime = date.toLocaleDateString("ko-KR", options);
                return formattedDateTime;
            },
            // 낙찰가 가져오기
            async getSuccBid(goods_no) {
                try {
                    const response = await axios.get(`http://localhost:3000/goods/goodsSuccBid/${goods_no}`);
                    return response.data[0].succ_bid;
                } catch (error) {
                    console.error(error);
                }
            },
            // 가격 포맷
            formatPrice(price) {
                if(price === '입찰없음'){
                    return price
                }
                if (price !== undefined && price !== null) {
                    const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    return `${formattedPrice} 원`;
                }
                return "";
            },
            // 상품 삭제
            async deleteItem(goods_no) {
                if (confirm("정말 삭제하시겠습니까?")) {
                    await axios.post(`http://localhost:3000/goods/delete_goods/${goods_no}`)
                    this.$swal({
                        title: "삭제 완료",
                        text: "상품이 삭제되었습니다.",
                        icon: "success",
                        button: "확인",
                    });
                }
                this.getSaleList(this.sort, this.page);
            },
            // 이전 페이지
            prev() {
                this.page -= 1;
                this.getSaleList(this.sort,this.page);
            },
            // 다음 페이지
            next(){
                this.page += 1;
                this.getSaleList(this.sort,this.page)
            },
            // 알람 가져오기
            async getAlram(goods_no) {
              try {
                const response = await axios.get(`http://localhost:3000/auth/auction_check_alram/${this.user.user_no}/${goods_no}`);
                this.alram.push(response.data[0].count)
              } catch (error) {
                console.error(error);
              }
            },
        }
    }
</script>
<style scoped>

* {
    margin: 0;
    padding: 0;
    border-spacing: 0px;
}

.container {
    margin: 40px 30px;
}
.myinfo{
    margin-top: 30px;
}

.salelist .table {
    max-width: 1200px;
    text-align: center;
    background-color: #f9f9f9;
    border-radius: 10px;
}

.salelist .table th {
    text-align: center;
    padding: 20px 0;
}

.salelist p {
    width: 120px;
    font-size: 1rem;
    display: inline-block;
    vertical-align: middle;
    padding: 2px;
    padding-top: 10px;
    margin: 20px 30px 16px 0px;
    /* border: 1px solid red; */
}

.salelist .detail {
    display: flex;
}
.trash_icon {
    font-size: 20px;
    
}

#complete {
    background-color: #00bfa5;
}
#biding {
    background-color: #ff6d00;
}
#cancel {
    background-color: #ff1744;
}
#ing {
    background-color: #ffea00;
}

table {
  border-collapse: collapse;
  width: 500px;
  margin-top: 20px;
  background-color: white;
}

thead{
  box-shadow: 4px 4px 10px rgba(0,0,0,0.1);
}

/* 테이블 행 */
td {
  padding: 1px;
  text-align: left;
  border-bottom: 1px solid #008d07f1;
  text-align: center;
  height: 40px;
}

th {
  padding: 8px;
  text-align: left;
  text-align: center;
  border-top: 2px solid #008807;
  border-bottom: 2px solid #008807;
  color: #189200;
}

/* 테이블 올렸을 때 */
tbody tr:hover {
  background-color: #e0ffae;
  opacity: 0.9;
  cursor: pointer;
}

/* 테이블 비율 */
th:nth-child(1),
td:nth-child(1) {
  width: 5%;
}

th:nth-child(2),
td:nth-child(2) {
  width: 10%;
}

th:nth-child(3),
td:nth-child(3) {
  width: 20%;
}
th:nth-child(4),
td:nth-child(4) {
  width: 35%;
}
th:nth-child(5),
td:nth-child(5) {
  width: 5%;
}
th:nth-child(6),
td:nth-child(6) {
  width: 15%;
}
th:nth-child(7),
td:nth-child(7) {
  width: 10%;
}

th, td {
  border-left: none;
  border-right: none;
  color: #008807;
}
td p {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    grid-area: text;
}

tr {
    height: 80px;
}
.title {
    font-size: 24px;
}
.form-select {
    width: 100px;
    height: 30px;
    margin-left: 20px;
}
.page_container {
  width: 400px;
  height: 100px;
  margin-left: 50%;
  margin-top: 20px;
}
.page_container button {
  min-width:32px;
  width: 50px;
  height: 40px;
  padding:2px 6px;
  text-align:center;
  margin:0 3px;
  border-radius: 6px;
  border:1px solid #eee;
  color:#666;
  cursor: pointer;
}
#select {
    font-weight: bold;
    font-size: 15px;
}
.alarm{
  margin-right: -10px;
  margin-left: -10px;
  float: right;
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