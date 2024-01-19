<template>
    <div class="container" id="scroll" v-if="maxPage!=0">
        <div v-if="$route.params.cate!='cate'" class="search_title">
            <h3 style="margin-left:50px; margin-top: 10px;">{{keyword}} 의 검색 결과</h3>
        </div>
        <div v-else class="search_title">
            <h3>카테고리 : {{category}} > {{ categoryDetailstr }}</h3>
        </div>
        <div class="sort">
            <select class="a" v-model="sort" @change="getGoodsList(page,sort)">
                <option value="ASC" selected>마감시간 오름순</option>
                <option value="DESC">마감시간 내림순</option>
            </select>
        </div>
        <div class="goodslist_div" v-if="goodsList.length>0">
            <div class="item_container" v-for="(goods, i) in goodsList" :key="i" @click="gotoProduct(goods.goods_no)">
                <img class="goods_img"  :src="goods.goods_img ? require(`../../../StarFarmBack/uploads/uploadGoods/${goods.goods_no}/${goods.goods_img.split(',')[0]}`):require(`../assets/2-1.png`)" alt="상품 이미지">
                <div class="goodsname">
                <h2>{{ goods.goods_nm }}</h2>
                <p>{{ goods.goods_content }}</p>
                </div>
                <div class="card-stats">
                <div class="stat">
                    <div class="type">시작가</div>
                    <div class="value"><p class="price">{{ formatPrice(goods.goods_start_price) }}</p></div>
                </div>
                <div class="stat border">
                    <div class="type">입찰가</div>
                    <div class="value"><p class="sprice">{{ formatPrice(goods_succ_bid[i]) }}</p></div>
                </div>
                <div class="stat">
                    <div class="type">경매 시간</div>
                    <div class="value"><p class="time" v-if="goods.goods_timer">{{ goodsTimer[i] }}</p></div>
                </div>
                </div>
            </div>
        </div>
        <div class="page_container">
            <button v-if="page>0" class="pageNum" @click="prev()">이전</button>
            <button v-for="num in getPageNumbers()" :key="num" :id="num==page? 'select':''" class="pageNum" @click="getGoodsList(num,sort)">{{num+1}}</button>
            <button v-if="page<maxPage-1" class="pageNum" @click="next()">다음</button>
        </div>
    </div>
    <div v-else class="empty_container">
        <div v-if="$route.params.cate!='cate'" class="search_title">
            <p>검색어 : {{keyword}}</p>
        </div>
        <div v-else class="search_title">
            <p>카테고리 : {{category}} > {{ categoryDetailstr }}</p>
        </div>
        <h1 style="margin: 20px;">검색 결과가 없습니다.</h1>
    </div>
</template>
<script>
import axios from 'axios';
    export default {
        name : 'search_goodslist',
        data() {
            return {
                //상품정보
                keyword : '',
                goodsList : [],
                goods_succ_bid: [],
                nickList: [],
                page:0,
                maxPage: 0,

                category: '',
                categoryDetail: 0,
                categoryDetailstr: '',

                goodsTimer: [],
                timer: null,

                sort: 'ASC',
            }
        },
        beforeDestroy() {
            this.stopAutoTimer(); // 페이지가 파괴될 때 타이머 정지
        },
        //카테고리별 분류
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
            this.getGoodsList(this.page, this.sort);
        },
        created() {
            this.allGoodsTimer();
        },
        methods: {
            //페이징
            getPageNumbers() {
                const groupSize = 5; // 페이지 그룹 크기
                const groupIndex = Math.floor(this.page / groupSize); // 현재 페이지 그룹 인덱스
                const start = groupIndex * groupSize; // 현재 페이지 그룹의 시작 페이지 번호
                const end = Math.min(start + groupSize, this.maxPage); // 현재 페이지 그룹의 마지막 페이지 번호
                return Array.from({length: end - start}, (v, i) => start + i); // 페이지 번호 배열 생성
            },
            async getGoodsList(nimNum, sort) {
                this.goodsList = [];
                if(this.$route.params.cate=='cate'){
                    try{
                        if(this,this.categoryDetail==0){
                            const response = await axios.get(`http://localhost:3000/goods/category_search/${this.category}/${nimNum}/${sort}`)
                            this.goodsList = response.data;
                        } else {
                            const response = await axios.get(`http://localhost:3000/goods/category_detail_search/${this.category}/${this.categoryDetail}/${nimNum}/${sort}`)
                            this.goodsList = response.data;
                        }
                    } catch(err) {
                        console.log(err);
                    }
                } else {
                    try{
                        const response = await axios.get(`http://localhost:3000/goods/goodsSearch/${this.keyword}/${nimNum}/${sort}`)
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
                this.page = nimNum;
                this.getMaxPage();
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
                this.page += 5;
                if(this.page>=this.maxPage){
                    this.page = this.maxPage-1;
                }
                this.getGoodsList(this.page, this.sort);
            },
            next() {
                this.page += 5;
                if(this.page>=this.maxPage){
                    this.page = this.maxPage-1;
                }
                this.getGoodsList(this.page, this.sort);
            },
            stopAutoTimer() {
                clearInterval(this.timer);
            },
            formatPrice(price) {
                if(price=='입찰 없음'){
                    return price
                }
                if (price !== undefined && price !== null) {
                    const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    return `${formattedPrice} 원`;
                }
                return "";
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
    width: 100%;
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
    height: 900px;
}
/* -------------------- */

.goodslist_div {
  width: 100%;
  height: 955px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: left;
  margin-top: 20px;
}
.item_container {
  display: grid;
  grid-template-columns: 240px;
  grid-template-rows: 150px 160px 80px;
  grid-template-areas: "image" "text" "stats";
  height: 40%;

  border-radius: 18px;
  background: white;
  box-shadow: 5px 5px 15px rgba(0,0,0,0.9);
  font-family: roboto;
  text-align: center;

  transition: 0.5s ease;
  cursor: pointer;
  margin:30px;
}
.goods_img {
  grid-area: image;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  grid-area: image;
  width: 100%;
  height: 100%;
}
.goodsname {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  grid-area: text;
  margin: 25px;
}
.goodsname .date {
  color: rgb(255, 7, 110);
  font-size: 13px;
}
.goodsname p {
 text-overflow: ellipsis;
 overflow: hidden;
 white-space: nowrap;
  color: grey;
  font-size:15px;
  font-weight: 300;
  margin-top: 20px;

}
.goodsname h2 {
  margin-top:0px;
  font-size:28px;
}
.card-stats {
  grid-area: stats;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;

  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background: #68ce68;
}
.card-stats .stat {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  color: white;
  padding:10px;
  width: 80px;
  font-size: 13px;
  border-right: 2px solid rgba(46, 190, 0, 0.3);
}
.stat:last-child {
  border: none;
}
.item_container > p {
  margin-left: 3px;
}
.item_container:hover {
  transform: scale(1.15);
  box-shadow: 5px 5px 15px rgba(0,0,0,0.6);
}

.search_title {
    margin-top: 10px;
    margin-left: 10px;
    display: flex;
}

.a {
    width: 150px;
    height: 30px;
    float: right;
    margin-left: 10px;
    margin-right: 50px;
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
.time,
.price,
.sprice {
  font-weight: 800;
}
#select {
    font-weight: bold;
    font-size: 15px;
}
</style>