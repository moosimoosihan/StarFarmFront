<template>
  <div>
    <div class="report-section">
      <div id="scroll">
        <div class="title_search">
          <h2>상품 관리</h2>
          <span>검색할 상품명 : </span>
          <input type="text" placeholder="상품명을 입력하세요" v-model="search_title" />
          <button @click="searchGoods(sort, page)">검색</button>
          <select v-model="sort" @change="search_report!='' ? searchGoods(sort, page) : getAddPage(sort,page)">
            <option value="DESC">최신순</option>
            <option value="ASC">오래된순</option>
          </select>
        </div>
        <table class="rwd-table">
          <thead>
            <tr>
              <th>No</th>
              <th>상품명</th>
              <th>입찰가</th>
              <th>판매현황</th>
              <th>마감일시</th>
              <th>카테고리</th>
              <th>판매자번호</th>
              <th>낙찰가</th>
              <th>보기</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in productListPage" :key="index">
              <td>{{ product.GOODS_NO }}</td>
              <td>{{ product.GOODS_NM }}</td>
              <td>{{ product.GOODS_START_PRICE }}</td>
              <td>{{ product.GOODS_STATE }}</td>
              <td>{{ formatDateTime(product.GOODS_TIMER)}}</td>
              <td>{{ product.GOODS_CATEGORY }}</td>
              <td>{{ product.USER_NO }}</td>
              <td>{{ product.GOODS_SUCC_PRICE }}</td>
              <td>
                <button v-if="!product.DELETE_TIME" class="view-button" @click="deleteItem(product.GOODS_NO)">
                  삭제                        
                </button>
                <button v-else class="view-button" @click="restoreGoods(product.GOODS_NO)">
                  보기
                </button>
              </td>
            </tr>
            <tr v-if="productListPage.length === 0">
              <td colspan="9">상품이 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="page_container">
        <button v-if="page>0" class="pageNum" @click="prev()">이전</button>
        <button v-for="num in getPageNumbers()" :key="num" :id="num==page? 'select':''" class="pageNum" @click="search_title!=''? searchGoods(sort,num) : getAddPage(sort,num)">{{num+1}}</button>
        <button v-if="page<(pageCount-1)" class="pageNum" @click="next()">다음</button>
      </div>
    </div>
  </div>
</template>

<script>  // delete_goods_2 로 상품삭제 goods_add: 상품GOODS 정보 다가져옴
  import axios from 'axios';

  export default {
    data() {
      return {
        productListPage:[],
        productList: [],
        
        page: 0,
        pageCount: 0,

        sort: 'DESC',
        search_title: '',
      };
    },
    created() {
      this.getAddPage(this.sort, this.page);
    },
    computed:{
      user(){
        return this.$store.state.user;     //스토어에서 받아서뿌림
      },
    },
    methods: {
      getPageNumbers() {      
          const groupSize = 5; // 페이지 그룹 크기
          const groupIndex = Math.floor(this.page / groupSize); // 현재 페이지 그룹 인덱스
          const start = groupIndex * groupSize; // 현재 페이지 그룹의 시작 페이지 번호
          const end = Math.min(start + groupSize, this.pageCount); // 현재 페이지 그룹의 마지막 페이지 번호
          return Array.from({length: end - start}, (v, i) => start + i); // 페이지 번호 배열 생성
      },
    async deleteItem(no) {    //관리자 상품 삭제하는 삭제버튼누르면
     try {
        await axios({
          url: `http://localhost:3000/goods/delete_goods/${no}`, 
          method: 'post',
        });
      } catch (error) {
        console.log('상품 삭제 에러:', error);
      }
      await this.getAddPage(this.sort, this.page)
    },
    async getAddPage(sort, num) {
        try {
          const response = await axios.get(`http://localhost:3000/goods/allGoodsPage/none/${sort}/${num}`);
          this.productListPage = response.data;
          this.page = num;
          console.log(this.page)
        } catch (error) {
          console.log(error);
        }
    },
    async searchGoods(sort, num) {     
      if(this.search_title==''){
        return this.$swal({
          title: '검색어를 입력해주세요',
          icon: 'warning',
          confirmButtonText: '확인',
        });
      }
      try{
        const response = await axios.get(`http://localhost:3000/goods/allGoodsPage/${this.search_title}/${sort}/${num}`);
        this.productListPage = response.data;
        this.page = num;
      } catch(e) {
        console.log(e);
      }
      this.getAdd()
    },
      async getAdd() {
        if(this.search_title!=''){
          try {
            const response = await axios.get(`http://localhost:3000/goods/allgoods/${this.search_title}`);
            this.productList = response.data[0].count;
            this.pageCount = Math.ceil(this.productList/10);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const response = await axios.get(`http://localhost:3000/goods/allgoods/none`);
            this.productList = response.data[0].count;
            this.pageCount = Math.ceil(this.productList/10);
          } catch (error) {
            console.log(error);
          }
        }
      },
    async restoreGoods(no) {                  //보기버튼 누르면 다시 복구
      try {
        const response = await axios.post(`http://localhost:3000/goods/restoreGoods/${no}`)
        if(response.data.message=='restore_complete'){
          console.log("복구 성공")
        }
      } catch (error) {
        console.log(error);
      }
      await this.getAddPage(this.sort, this.page)
    },
    gotoPage(index) {
      this.$router.push(`/admin/deal/${index}`);  
    },
    prev() {
      this.page += 5;
      if(this.page>=this.pageCount){
        this.page = this.pageCount-1;
      }
      if(this.search_title!=''){
        this.searchGoods(this.sort,this.page)
      }
      else{
        this.getAddPage(this.sort,this.page);
      }
    },
    next(){
      this.page += 5;
      if(this.page>=this.pageCount){
        this.page = this.pageCount-1;
      }
      if(this.search_title!=''){
        this.searchGoods(this.sort,this.page)
      }
      else{
        this.getAddPage(this.sort,this.page);
      }
    },
    formatDateTime(dateTime) {   //시간이 컴퓨터시간으로 나오게
        const date = new Date(dateTime);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
        };
        const formattedDateTime = date.toLocaleDateString("ko-KR", options);
        return formattedDateTime;
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

@import 'https://fonts.googleapis.com/css?family=Open+Sans:600,700';

* {font-family: 'Open Sans', sans-serif;}

.rwd-table {
  margin: auto;
  min-width: 1100px;
  max-width: 100%;
  border-collapse: collapse;
  margin-left: 22%;
}

.rwd-table tr:first-child {
  border-top: none;
  background: #428bca;
  color: #fff;
}

.rwd-table tr {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: #f5f9fc;
}

.rwd-table tr:nth-child(odd):not(:first-child) {
  background-color: #ebf3f9;
}

.rwd-table th {
  display: none;
}

.rwd-table td {
  display: block;
}

.rwd-table td:first-child {
  margin-top: .5em;
}

.rwd-table td:last-child {
  margin-bottom: .5em;
}

.rwd-table td:before {
  content: attr(data-th) ": ";
  font-weight: bold;
  width: 120px;
  display: inline-block;
  color: #000;
}

.rwd-table th,
.rwd-table td {
  text-align: left;
}

.rwd-table {
  color: #333;
  border-radius: .4em;
  overflow: hidden;
}

.rwd-table tr {
  border-color: #bfbfbf;
}

.rwd-table th,
.rwd-table td {
  padding: .5em 1em;
}
@media screen and (max-width: 601px) {
  .rwd-table tr:nth-child(2) {
    border-top: none;
  }
}
@media screen and (min-width: 600px) {
  .rwd-table tr:hover:not(:first-child) {
    background-color: #d8e7f3;
  }
  .rwd-table td:before {
    display: none;
  }
  .rwd-table th,
  .rwd-table td {
    display: table-cell;
    padding: .25em .5em;
  }
  .rwd-table th:first-child,
  .rwd-table td:first-child {
    padding-left: 0;
  }
  .rwd-table th:last-child,
  .rwd-table td:last-child {
    padding-right: 0;
  }
  .rwd-table th,
  .rwd-table td {
    padding: 1em !important;
  }
}


/* THE END OF THE IMPORTANT STUFF */

/* Basic Styling */
body {
  margin: 0;
  padding: 0;
  background: -webkit-linear-gradient(to left, #4B79A1 , #283E51);
  background: linear-gradient(to left, #4B79A1 , #283E51);
}
h1 {
  text-align: center;
  font-size: 2.4em;
  color: #f2f2f2;
}
.container {
  display: block;
  text-align: center;
}
h3 {
  display: inline-block;
  position: relative;
  text-align: center;
  font-size: 1.5em;
  color: #cecece;
}
h3:before {
  content: "\25C0";
  position: absolute;
  left: -50px;
  -webkit-animation: leftRight 2s linear infinite;
  animation: leftRight 2s linear infinite;
}
h3:after {
  content: "\25b6";
  position: absolute;
  right: -50px;
  -webkit-animation: leftRight 2s linear infinite reverse;
  animation: leftRight 2s linear infinite reverse;
}
h2 {
  margin-left: 30px;
}
@-webkit-keyframes leftRight {
  0%    { -webkit-transform: translateX(0)}
  25%   { -webkit-transform: translateX(-10px)}
  75%   { -webkit-transform: translateX(10px)}
  100%  { -webkit-transform: translateX(0)}
}
@keyframes leftRight {
  0%    { transform: translateX(0)}
  25%   { transform: translateX(-10px)}
  75%   { transform: translateX(10px)}
  100%  { transform: translateX(0)}
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
.page_conatainer button:hover {
  background: #E4DBD6;
}
.page-item a {
  color:#666;
  text-decoration: none;
}
.page_conatainer button.active {
  background-color : #E7AA8D;
  color:#fff;
}
.title_search {
  margin-left: 600px;
  margin-bottom: 20px;
  height: 50px;
}
#select {
    font-weight: bold;
    font-size: 15px;
}
</style>
