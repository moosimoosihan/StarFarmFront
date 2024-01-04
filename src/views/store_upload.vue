<template>
    <div class="container">
    <div id="store_upload_wrapper">
        <div class="mb-3 row">
            <label class="col-md-3 col-form-label">상품 이미지</label>
            <div class="col-md-9">
                <input type="file" class="form-control" accept="image/png,image/jpeg" @change="multiUploadFile($event.target.files)" multiple>
                <div class="imgContainer">
                    <img v-if="goods_img_src[0]!=''" :src="goods_img_src[0]" />
                    <img v-if="goods_img_src[1]!=''" :src="goods_img_src[1]" />
                    <img v-if="goods_img_src[2]!=''" :src="goods_img_src[2]" />
                    <img v-if="goods_img_src[3]!=''" :src="goods_img_src[3]" />
                    <img v-if="goods_img_src[4]!=''" :src="goods_img_src[4]" />
                </div>
                <div class="alert alert-secondary" role="alert">
                    <ul>
                        <li>이미지 사이즈 : 700*700</li>
                        <li>파일 사이즈 : 1M 이하</li>
                        <li>파일 확장자 : png, jpg만 가능</li>
                    </ul>
                </div>
            </div>
        </div>
    <div id="store_product_name">
      <p>상품명</p>
      <input v-model="product_name" type="text" placeholder="상품명을 입력해주세요." style="width: 100%;" required>
   </div>
   <div id="store_product_category1">
     <p>카테고리</p>
     <select style="width: 100%;" v-model="product_category1" required @change="cate2Change()">
        <option value="의류">의류</option>
        <option value="뷰티">뷰티</option>
        <option value="생활/가전">생활/가전</option>
        <option value="취미">취미</option>
        <option value="기타">기타</option>
     </select>
   </div>
   <div id="store_product_category2">
        <p>세부 카테고리</p>
        <select v-if="product_category1==='의류'" style="width: 100%;" v-model="product_category2" required>
            <option value="1" selected>상의</option>
            <option value="2">하의</option>
            <option value="3">신발</option>
            <option value="4">외투</option>
            <option value="5">가방</option>
        </select>
        <select v-if="product_category1==='뷰티'" style="width: 100%;" v-model="product_category2" required>
            <option value="1" selected>악세사리</option>
            <option value="2">화장품</option>
            <option value="3">향수</option>
        </select>
        <select v-if="product_category1==='생활/가전'" style="width: 100%;" v-model="product_category2" required>
            <option value="1" selected>주방용품</option>
            <option value="2">가전제품</option>
            <option value="3">생필품</option>
        </select>
        <select v-if="product_category1==='취미'" style="width: 100%;" v-model="product_category2" required>
            <option value="1" selected>스포츠</option>
            <option value="2">게임</option>
            <option value="3">음악</option>
            <option value="4">미술</option>
        </select>
        <select v-if="product_category1==='기타'" style="width: 100%;" v-model="product_category2" required>
            <option value="1" selected>기타</option>
        </select>
    </div>
    <div id="store_price_trade">
        <div>
            시작가
            <input type="text" placeholder="경매 시작가를 입력해주세요." style="width: 100%;" v-model="price_trade" required @input="validateNumber('price_trade')">
        </div>
        <div>
            거래유형
            <select style="width: 100%;" v-model="goods_trade">
                <option value="택배거래" selected>택배거래</option>
                <option value="직거래">직거래</option>
            </select>
        </div>
    </div>
        <div id="store_timer_deliv">
            <div>
                마감 시간
                <input type="datetime-local" required v-model="goods_timer">
            </div>
            <div v-if="goods_trade==='택배거래'">
                택배 비용
                <input type="text" placeholder="0" value="0" style="width: 100%;" v-model="goods_deliv_price" @input="validateNumber('goods_deliv_price')">
            </div>
            <div v-else>
                <input type="text" style="width: 100%;" placeholder="0" value="0" disabled>
             </div>
            </div>
            <div id="store_product_content">
            <p>설명</p>
            <textarea style="width: 100%; height: 400px;" placeholder="상품 설명을 입력해주세요. (최소 10글자)" v-model="product_content"></textarea>
        </div>
        <div id="store_submit">
            <input type="button" value="취소" class="cancel-btn">
            <button class="btn" @click="product_add()">상품 등록</button>
        </div>
    </div>
   </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'

    export default {
        data() {
            return {
                productId: 0,
                productImage: [],
                product_name: '',
                product_category1: '의류',
                product_category2: 1,
                price_trade: 0,
                goods_trade: '택배거래',
                goods_timer: '',
                product_content: '',
                goods_deliv_price: 0,
                bid_time: '',

                // 이미지 파일명만 저장할 변수 
                goods_img: ['','','','',''],

                // 이미지를 보여줄 변수
                goods_img_src: ['','','','','']
            }
        },
        computed: {
            user () {
                return this.$store.state.user
            }
        },
        created () {
            if(!this.user.user_no){
                this.$swal({
                    title: '로그인이 필요합니다.',
                    text: '로그인 페이지로 이동합니다.',
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonText: '확인',
                    cancelButtonText: '취소',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$router.push('/login')
                    }
                })
            }
        },
        methods: {
            async product_add() {
                if(this.product_name===''){
                    return this.$swal('상품명을 입력해주세요.')
                }
                if(this.product_category1===''){
                    return this.$swal('카테고리를 선택해주세요.')
                }
                if(this.product_category2===''){
                    return this.$swal('세부 카테고리를 선택해주세요.')
                }
                if(this.product_content===''){
                    return this.$swal('상품 설명을 입력해주세요.')
                }
                if(this.price_trade==='' && this.price_trade<0){
                    return this.$swal('경매 시작가를 입력해주세요.')
                }
                if(this.goods_trade===''){
                    return this.$swal('거래 유형을 선택해주세요.')
                }
                if(this.goods_timer===''){
                    return this.$swal('마감 시간을 입력해주세요.')
                }
                if(moment(this.goods_timer).isBefore(moment().format())){
                    return this.$swal('현재 시간보다 이전 시간은 입력할 수 없습니다.')
                }
                if(this.goods_trade==='택배거래'){
                    if(this.goods_deliv_price==='' && this.goods_deliv_price<0){
                        return this.$swal('택배 비용을 입력해주세요.')
                    }
                } else {
                    this.goods_deliv_price = 0
                }
                if(this.goods_img.length===0){
                    return this.$swal('상품 이미지를 등록해주세요.')
                }
                switch(this.goods_trade){
                    case '택배거래':
                        this.goods_trade = 0
                        break
                    case '직거래':
                        this.goods_trade = 1
                        break
                }
                try {
                    axios({
                    url: "http://localhost:3000/goods/add_goods",
                    method: "POST", 
                    data: { 
                        goods_category: this.product_category1,
                        goods_category_detail: this.product_category2,
                        goods_nm: this.product_name,
                        goods_content: this.product_content,
                        goods_start_price: this.price_trade,
                        goods_trade: this.goods_trade,
                        goods_deliv_price: this.goods_deliv_price,
                        goods_timer: this.goods_timer,
                        user_no: this.user.user_no,

                        goods_img: this.goods_img
                    },
                })
                    .then((res) => {
                        if(res.data.message=='add_complete'){
                            this.$swal({
                                position: 'top',
                                icon: 'success',
                                title: '제품 등록 성공!',
                                showConfirmButton: false,
                                timer: 1000
                            })
                            .then(() => {
                                this.$router.push("mypage/salelist")
                            })
                        // } else if (res.data.message == 'already_exist_goods'){
                        //     this.$swal("이미 등록된 제품입니다.");
                        }
                        else if (res.data.message == '파일 변경 실패'){
                            this.$swal("파일 변경 실패");
                        }
                        else {
                            console.log(res.data.message);
                            this.$swal("제품 등록 실패");
                        }
                })
                    .catch(() => {
                        this.$swal("오류 발생")
                    })
                } catch(err){
                    console.log(err);
                }
            },
            validateNumber(val) {
                switch(val){
                    case 'price_trade':
                        this.price_trade = this.price_trade.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
                        break
                    case 'goods_deliv_price':
                        this.goods_deliv_price = this.goods_deliv_price.replace(/[^0-9]/g, ''); // 숫자 이외의 문자 제거
                        break
                }
            },
            async multiUploadFile(files) {
                let name = [];
                if (files.length > 0) {
                    for(var i=0;i<files.length;i++){
                        name.push(files[i].name);
                    }
                }
                else {
                    return; // 파일 미선택 시 반환
                }
                const formData = [];
                this.goods_img_src = ['','','','',''];
                for(var i=0;i<files.length;i++){
                    formData[i] = new FormData();
                    formData[i].append('img', files[i]);
                    this.goods_img_src[i] = URL.createObjectURL(files[i]);
                    for (let key of formData[i].keys()) {
                        console.log(key, ":", formData[i].get(key));
                    }
                }
                try {
                    this.goods_img = ['','','','',''];
                    for(var i=0;i<formData.length;i++){
                        axios({
                            url: `http://localhost:3000/goods/upload_img`,
                            method: 'POST',
                            headers: {'Content-Type': 'multipart/form-data'},
                            data: formData[i]
                        })
                            .then ((res) => {
                                if (res.data.message == 'success'){
                                    this.goods_img[i] = name;
                                }
                                else {
                                    this.$swal("DB 에러");
                                }
                            })
                        .catch(e => {
                            console.log(e);
                        })
                    }
                    return true;
                } catch(err){
                    console.log(err);
                    return false;
                }
            },
            deleteImage(id,name){
                this.$swal.fire({
                    title:'정말 삭제하시겠습니까?',
                    showCancelButton: true,
                    confirmButtonText: `삭제`,
                    cancelButtonText: `취소`
                }).then(async (result) => {
                    if(result.isConfirmed){
                        await axios({
                            url:'/goods/imageDelete',
                            method:'POST',
                            data:{
                                id:id,
                                name:name
                            }
                        })
                        this.$swal.fire('삭제되었습니다.','','success')
                    }
                })
            },
            cate2Change() {
                switch(this.product_category1){
                    case '의류':
                    case '뷰티':
                    case '생활/가전':
                    case '취미':
                    case '기타':
                        this.product_category2 = 1
                        break
                }
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
}
/* ------------------------------------------------------------- */

p {
    float: left;
    width: 150px;
    height: 30px;
}
select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    color: #444;
    padding: 0.8em 2em;
    border-radius: 5px;
}
#store_upload_wrapper {
    width: 60%;
    height: 60%;
    margin: 0 auto;
}
#store_product_img {
    width: 100%;
    height: 230px;
    line-height: 200px;
    border-bottom: 1px solid black;
    overflow: hidden;
    padding-bottom: 30px;
}
#store_product_img div {
    width: 170px;
    height: 200px;
    background-color: black;
    float: left;
    margin-left: 0px;
}
#store_product_img button {
    width: 20px;
    height: 20px;
    position: relative;
    top: -92px;
    right: -150px;
    background: none;
    border-radius: 100%;
    background-color: red;
}
#store_product_name,
#store_product_category1,
#store_product_category2,
#store_price_trade,
#store_timer_deliv {
    width: 100%;
    height: auto;
}

#store_product_name input,
#store_price_trade input,
#store_timer_deliv input {
    width: 100%;
    height: 40px;
    border: 1px solid black;
    border-radius: 5px;
}

#store_price_trade div:last-child,
#store_timer_deliv div:last-child {
    flex: 1;
    margin-left: 10px;
}

#store_timer_deliv div {
    flex: 1;
    margin-bottom: 20px;
}

#store_product_content textarea {
    width: 90%;
    height: 90%;
    resize: none;
    text-align: center;
    font-size: large;
    border-radius: 5px;
    padding-top: 50px;
}

 #store_submit {
    clear: both; /* Clear floats to ensure proper positioning */
    text-align: right; /* Align buttons to the right */
    margin-top: 20px; /* Add some top margin for spacing */
  }

 #store_submit input {
    padding: 10px 20px;
    background: none;
    border: none;
    background-color: black;
    color: white; /* Ensure text is visible */
    border-radius: 5px;
  }
  .imgContainer {
    display: flex;
    flex-wrap: wrap;
  }
  .imgContainer img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
</style>