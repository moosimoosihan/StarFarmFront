<template>
    <div class="container" id="scroll" v-if="maxPage!=0">
        <div v-if="$route.params.cate!='cate'" class="search_title">
            <p style="font-size: 30px; color: green ;">{{keyword}} </p><p style="font-size: 20px; margin-top: 10px;"> 의 검색 결과</p>
        </div>
        <div v-else class="search_title">
            <p>카테고리 : {{category}} > {{ categoryDetailstr }}</p>
        </div>
        <div class="sort">
            <a class="a">입찰가낮은순</a><a class="a">|</a>
            <a class="a">시작가낮은순</a><a class="a">|</a>
            <a class="a">최신등록순</a><a class="a">|</a>
            <a class="a">정확도순</a>
        </div>
        <div class="search_goods">
            <div class="item_container" v-for="(goods,i) in goodsList" :key="i" @click="gotoProduct(goods.goods_no)">
                <img class="goods_img"
                    :src="goods.goods_img ? require(`../../../StarFarmBack/uploads/uploadGoods/${goods.goods_no}/${goods.goods_img.split(',')[0]}`) : require(`../assets/2-1.png`)"
                    alt="상품 이미지"/>
                <div class="search_goodsdetails">
                    <p class="goodsname">{{ goods.goods_nm }}</p>
                    <p class="price">시작가 : {{ goods.goods_start_price }}</p>
                    <p class="price">입찰가 : {{ goods_succ_bid[i] }}</p>
                    <p class="sprice">{{ nickList[i] }}</p>
                    <p class="time" font-color:red v-if="goods.goods_timer">{{ goodsTimer[i] }}</p>
                </div>
            </div>
        </div>
        <div class="page">
            <button v-if="page>1" class="page_btn" @click="prev()">이전</button>
            <button v-for="(num,i) in maxPage" :key="i" class="pageNum" @click="getGoodsList((num-1)*10)">{{num}}</button>
            <button v-if="page<maxPage" class="page_btn" @click="next()">다음</button>
        </div>
    </div>
    <div v-else class="empty_container">
        <div v-if="$route.params.cate!='cate'" class="search_title">
            <p>검색어 : {{keyword}}</p>
        </div>
        <div v-else class="search_title">
            <p>카테고리 : {{category}} > {{ categoryDetailstr }}</p>
        </div>
        <p>검색 결과가 없습니다.</p>
    </div>
</template>
<script>
import axios from 'axios';
    export default {
        name : 'search_goodslist',
        data() {
            return {
                keyword : '',
                goodsList : [],
                goods_succ_bid: [],
                nickList: [],
                page:1,
                maxPage: 0,

                category: '',
                categoryDetail: 0,
                categoryDetailstr: '',

                goodsTimer: [],
                timer: null,
            }
        },
        beforeDestroy() {
            this.stopAutoTimer(); // 페이지가 파괴될 때 타이머 정지
        },
        mounted() {
            if(this.$route.params.cate=='cate'){
                this.category = this.$route.params.keyword;
                this.categoryDetail = this.$route.params.page;
                if(this.category=='의류'){
                    if(this.categoryDetail==0){
                        this.categoryDetailstr = '의류';
                    } else if(this.categoryDetail==1){
                        this.categoryDetailstr = '상의';
                    } else if(this.categoryDetail==2){
                        this.categoryDetailstr = '하의';
                    } else if(this.categoryDetail==3){
                        this.categoryDetailstr = '신발';
                    } else if(this.categoryDetail==4){
                        this.categoryDetailstr = '외투';
                    } else {
                        this.categoryDetailstr = '가방';
                    }
                } else if (this.category=='뷰티'){
                    if(this.categoryDetail==0){
                        this.categoryDetailstr = '뷰티';
                    } else if(this.categoryDetail==1){
                        this.categoryDetailstr = '악세사리';
                    } else if(this.categoryDetail==2){
                        this.categoryDetailstr = '화장품';
                    } else {
                        this.categoryDetailstr = '향수';
                    }
                } else if (this.category=='생활가전'){
                    if(this.categoryDetail==0){
                        this.categoryDetailstr = '생활/가전';
                    } else if(this.categoryDetail==1){
                        this.categoryDetailstr = '주방용품';
                    } else if(this.categoryDetail==2){
                        this.categoryDetailstr = '가전제품';
                    } else {
                        this.categoryDetailstr = '생필품';
                    }
                } else if (this.category=='취미'){
                    if(this.categoryDetail==0){
                        this.categoryDetailstr = '취미';
                    } else if(this.categoryDetail==1){
                        this.categoryDetailstr = '스포츠';
                    } else if(this.categoryDetail==2){
                        this.categoryDetailstr = '게임';
                    } else if(this.categoryDetail==3){
                        this.categoryDetailstr = '음악';
                    } else {
                        this.categoryDetailstr = '미술';
                    }
                } else if (this.category=='기타'){
                    this.categoryDetailstr = '기타';
                }
                
            } else {
                this.keyword = this.$route.params.keyword;
                this.page = this.$route.params.page;
            }
            this.getGoodsList(0);
            this.getMaxPage();
        },
        created() {
            this.allGoodsTimer();
        },
        methods: {
            async getGoodsList(nimNum) {
                if(this.$route.params.cate=='cate'){
                    try{
                        if(this,this.categoryDetail==0){
                            const response = await axios.get(`http://localhost:3000/goods/category_search/${this.category}/${nimNum}`)
                            this.goodsList = response.data;
                        } else {
                            const response = await axios.get(`http://localhost:3000/goods/category_detail_search/${this.category}/${this.categoryDetail}/${nimNum}`)
                            this.goodsList = response.data;
                        }
                    } catch(err) {
                        console.log(err);
                    }
                } else {
                    try{
                        const response = await axios.get(`http://localhost:3000/goods/goodsSearch/${this.keyword}/${nimNum}`)
                        this.goodsList = response.data;
                    } catch(err) {
                        console.log(err);
                    }
                }
                this.goods_succ_bid = [];
                for(let i=0; i<this.goodsList.length; i++){
                    await axios.get(`http://localhost:3000/goods/goodsSuccBid/${this.goodsList[i].goods_no}`)
                    .then((res) => {
                        if(res.data[0].succ_bid==null){
                            this.goods_succ_bid.push('입찰 없음');
                        } else {
                            this.goods_succ_bid.push(res.data[0].succ_bid);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                }
                this.nickList = [];
                for(let y=0; y<this.goodsList.length; y++){
                    await axios.get(`http://localhost:3000/mypage/mypage/${this.goodsList[y].user_no}`)
                    .then((res) => {
                        this.nickList.push(res.data[0].user_nick);
                    })
                }
                this.page = Math.ceil(nimNum/10)+1;
            },
            async getMaxPage() {
                if(this.$route.params.cate=='cate'){
                    try{
                        if(this,this.categoryDetail==0){
                            const response = await axios.get(`http://localhost:3000/goods/category_search_max/${this.category}`)
                            this.maxPage = Math.ceil(response.data[0].max_page/10);
                        } else {
                            const response = await axios.get(`http://localhost:3000/goods/category_detail_search_max/${this.category}/${this.categoryDetail}`)
                            this.maxPage = Math.ceil(response.data[0].max_page/10);
                        }
                    } catch(err) {
                        console.log(err);
                    }
                } else {
                    try{
                        const response = await axios.get(`http://localhost:3000/goods/goodsSearchMax/${this.keyword}`)
                        this.maxPage = Math.ceil(response.data[0].max_page/10);
                    } catch(err) {
                        console.log(err);
                    }
                }
            },
            gotoProduct(index) {
                this.$router.push(`/product/${index}`);
            },
            prev() {
                this.page--;
                this.getGoodsList((this.page-1)*10);
            },
            next() {
                this.page++;
                this.getGoodsList((this.page-1)*10);
            },
            stopAutoTimer() {
                clearInterval(this.timer);
            },
            updateTimer(endTime) {
                // 날짜를 초로 바꾸어 저장 후 계산
                let countDownDate = new Date(endTime).getTime();
                // 현재 시간을 초로 바꾸어 저장
                let currentTime = new Date().getTime();
                const distance = countDownDate - currentTime;
                // 만약 종료시간이 지났다면 타이머를 종료하고 경매가 종료되었다는 메시지를 표시
                if (distance < 0) {
                    return '경매가 종료되었습니다.';
                }
                // 남은 시간 계산
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                // 표시할 남은 시간 문자열 생성 포맷은 무조건 해당 포맷 하나만 '00일 남음' '00시간 남음' '00분 00초 남음' 으로만 표기
                const daysStr = days > 0 ? `${days}일 남음` : '';
                const hoursStr = hours > 0 ? `${hours}시간 남음` : '';
                const minutesStr = minutes > 0 ? `${minutes}분` : '';  
                const secondsStr = seconds >= 0 ? `${seconds}초 남음` : '';
                // 만약 00일 남음이라면
                if (daysStr === '') {
                    // 00시간 남음이라면
                    if (hoursStr === '') {
                    // 00분 남음이라면
                    if (secondsStr === '') {
                        // 경매가 종료되었다는 메시지를 표시
                        return '경매가 종료되었습니다.';
                    }
                    // 00시간 남음이 아니라면 00분 00초 남음을 표시
                    return minutesStr + ' ' + secondsStr;
                    }
                    // 00일 남음이 아니라면 00시간 남음을 표시
                    return hoursStr;
                }
                // 00일 남음을 표시
                return daysStr;
                },
                allGoodsTimer(){
                this.timer = setInterval(()=>{
                    if(this.goodsList.length>0){
                        for(let i=0; i<this.goodsList.length; i++){
                            if(this.goodsTimer[i]!='경매가 종료되었습니다.')
                            this.goodsTimer[i] = this.updateTimer(this.goodsList[i].goods_timer);
                        }
                    }
                }, 1000);
            }
        }
    }
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.container {
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: auto;
    overflow-y: scroll;
}

.container::-webkit-scrollbar {
  display: none;
}

.empty_container {
    width: 100%;
    height: 500px;
}
/* -------------------- */

.search_goods {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
    margin-top: 45px;
}
.item_container {
    width: 190px;
    height: 340px;
    background-color: rgb(255, 255, 255);
    border-style: solid;
    border-width: 2px;
    border-radius: 25px;
    border-color: rgb(219, 219, 219);
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 15px;
    margin-right: 15px;
    overflow: hidden;
    box-shadow: 5px 5px 5px gray;
}
.item_container > p {
  margin-left: 3px;
}

.goodsname {
  font-size: 20px;
  position: relative;
  top: 15px;
  left: 5px;
}

.price {
  position: relative;
  left: 5px;
  top: 20px;
}

.sprice {
  position: relative;
  left: 5px;
  top: 25px;
}

.time {
  position: relative;
  left: 5px;
  top: 30px;
  color : red;
}

.goods_img {
  width: 200px;
  height: 200px;
}

.search_title {
    margin-top: 10px;
    margin-left: 10px;
    display: flex;
}

.page {
    text-align: center;
    margin-top: 15px;
}

.page_btn {
    text-align: center;
    border: #ffffff;
    background-color: #ffffff;
}

.pageNum {
    text-align: center;
    border: #ffffff;
    background-color: #ffffff;
    font-size: 20px;
}

.a {
    float: right;
    margin-left: 10px;
    margin-right: 10px;
}

</style>