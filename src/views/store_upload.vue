<template>
    <div class="container">
        <div v-if="!isUploading || !isDelete" class="isLoadingScreen"></div>
        <div class="left">
            <div id="store_upload_wrapper">
                <div class="mb-3 row">
                    <label class="col-md-3 col-form-label">상품 이미지</label>
                    <div class="col-md-9">
                        <input type="file" class="form-control" accept="image/png,image/jpeg" @change="multiUploadFile($event.target.files)" multiple>
                        <div class="imgContainer">
                            <img v-if="goods_img_src[0]!=''" :src="goods_img_src[0]" />
                            <button v-if="goods_img_src[0]!=''" @click="deleteImage(0)">X</button>
                            <img v-if="goods_img_src[1]!=''" :src="goods_img_src[1]" />
                            <button v-if="goods_img_src[1]!=''" @click="deleteImage(1)">X</button>
                            <img v-if="goods_img_src[2]!=''" :src="goods_img_src[2]" />
                            <button v-if="goods_img_src[2]!=''" @click="deleteImage(2)">X</button>
                            <img v-if="goods_img_src[3]!=''" :src="goods_img_src[3]" />
                            <button v-if="goods_img_src[3]!=''" @click="deleteImage(3)">X</button>
                            <img v-if="goods_img_src[4]!=''" :src="goods_img_src[4]" />
                            <button v-if="goods_img_src[4]!=''" @click="deleteImage(4)">X</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="store_product_name">
                <p>상품명</p>
                <input v-model="product_name" type="text" placeholder="상품명을 입력해주세요." required>
            </div>
            <div id="store_product_category1">
                <p>카테고리</p>
                <select v-model="product_category1" required @change="cate2Change()">
                    <option value="의류">의류</option>
                    <option value="뷰티">뷰티</option>
                    <option value="생활가전">생활/가전</option>
                    <option value="취미">취미</option>
                    <option value="기타">기타</option>
                </select>
            </div>
            <div id="store_product_category2">
                <p>세부 카테고리</p>
                <select v-if="product_category1==='의류'" v-model="product_category2" required>
                    <option value="1" selected>상의</option>
                    <option value="2">하의</option>
                    <option value="3">신발</option>
                    <option value="4">외투</option>
                    <option value="5">가방</option>
                </select>
                <select v-if="product_category1==='뷰티'" v-model="product_category2" required>
                    <option value="1" selected>악세사리</option>
                    <option value="2">화장품</option>
                    <option value="3">향수</option>
                </select>
                <select v-if="product_category1==='생활가전'" v-model="product_category2" required>
                    <option value="1" selected>주방용품</option>
                    <option value="2">가전제품</option>
                    <option value="3">생필품</option>
                </select>
                <select v-if="product_category1==='취미'" v-model="product_category2" required>
                    <option value="1" selected>스포츠</option>
                    <option value="2">게임</option>
                    <option value="3">음악</option>
                    <option value="4">미술</option>
                </select>
                <select v-if="product_category1==='기타'" v-model="product_category2" required>
                    <option value="1" selected>기타</option>
                </select>
            </div>
            <div id="store_price_trade">
                <div>
                    <p>시작가</p>
                    <input type="text" placeholder="경매 시작가를 입력해주세요. (최소 1,000원)" v-model="price_trade" required @input="validateNumber('price_trade')">
                </div>
            </div>
            <div id="store_trade">
                <div>
                    <p>거래유형</p>
                    <select v-model="goods_trade">
                        <option value="택배거래" selected>택배거래</option>
                        <option value="직거래">직거래</option>
                    </select>
                </div>
            </div>
            <div id="store_timer_deliv">
                <div>
                    <p class="wi100">마감 시간</p>
                    <input type="datetime-local" required v-model="goods_timer">
                </div>
                <div v-if="goods_trade==='택배거래'">
                    <p>택배 비용</p>
                    <input type="text" placeholder="0" value="0" v-model="goods_deliv_price" @input="validateNumber('goods_deliv_price')">
                </div>
                <div v-else>
                    <input type="text" placeholder="0" value="0" disabled>
                </div>
            </div>
        </div>
        <div class="right">
            <div id="store_product_content">
                <p>설명</p>
                <textarea style="height: 600px;" placeholder="상품 설명을 입력해주세요.(10자 이상)" v-model="product_content"></textarea>
            </div>
        
            <div id="store_submit">
                <input type="button" value="취소" class="cancel-btn" @click="gotoBack()">
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
                //상품정보
                productImage: [],
                product_name: '',
                product_category1: '의류',
                product_category2: 1,
                price_trade: 1000,
                goods_trade: '택배거래',
                goods_timer: '',
                product_content: '',
                goods_deliv_price: '',
                bid_time: '',

                // 이미지 파일명만 저장할 변수 
                goods_img: ['','','','',''],

                // 이미지를 보여줄 변수
                goods_img_src: ['','','','',''],

                // 이미지가 아직 업로드 중인지 확인할 변수
                isUploading: true,
                isDelete: true
            }
        },
        computed: {
            user () {
                return this.$store.state.user
            }
        },
        created () {
            //유저상태확인
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
            //상품등록상세
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
                // 테스트를 할때는 주석처리
                /*if(this.product_content.length<10){
                    return this.$swal('상품 설명은 최소 10글자 이상 입력해주세요.')
                }
                if(this.price_trade<1000){
                    return this.$swal('경매 시작가는 1000원 이상 입력해주세요.')
                }
                // 100원 이하 단위로 입력할 수 없도록
                if(this.price_trade%100!==0){
                    return this.$swal('경매 시작가는 100원 단위로 입력해주세요.')
                }
                if(moment(this.goods_timer).isBefore(moment().add(1, 'days'))){
                    return this.$swal('하루 이상의 시간을 입력해주세요.')
                }
                if(moment(this.goods_timer).isAfter(moment().add(1, 'months'))){
                    return this.$swal('한 달 이상의 시간은 입력할 수 없습니다.')
                }*/
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
                if(this.goods_img==['','','','','']){
                    return this.$swal('상품 이미지를 등록해주세요.')
                }
                if(!this.isUploading || !this.isDelete){
                    return this.$swal('이미지 작업 중입니다.')
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
                                // 바로 넘어가지 않고 3초 후에 넘어가게 하기 위해 setTimeout 사용
                                this.isUploading = false;
                                setTimeout(() => {
                                    this.isUploading = true;
                                    this.$router.push("mypage/salelist")
                                }, 2500)

                            })
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
            //상품등록조건
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
            //사진업로드
            async multiUploadFile(files) {
                if (files.length <= 0 || !this.isUploading || !this.isDelete) {
                    this.$swal("파일이 없거나 현재 파일을 업로드 중입니다.")
                    return; // 파일 미선택 시 반환
                }
                this.isUploading = false;
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
                for(var i=0;i<this.goods_img.length;i++){
                    if(this.goods_img[i]!=''){
                        try{
                            await axios({
                                url:'http://localhost:3000/goods/delete_img',
                                method:'POST',
                                data:{
                                    pastname: this.goods_img[i]
                                }
                            })
                        } catch(err){
                            console.log(err);
                        }
                    }
                }
                try{
                    this.goods_img = ['','','','',''];
                    for(var i=0;i<formData.length;i++){
                        try{
                            var res = await axios({
                                url: `http://localhost:3000/goods/upload_img`,
                                method: 'POST',
                                headers: {'Content-Type': 'multipart/form-data'},
                                data: formData[i]
                            })
                            if (res.data.message != 'success'){
                                this.$swal("DB 에러");
                            }
                        } catch(e) {
                            console.log(e);
                        }
                        this.goods_img[i] = files[i].name
                        console.log(this.goods_img[i])
                    }
                    this.isUploading = true;
                    return this.isUploading;
                } catch(err){
                    console.log(err);
                    this.isUploading = false;
                    return isUploading;
                }
            },
            //사진삭제하기
            async deleteImage(index){
                this.$swal.fire({
                    title:'정말 삭제하시겠습니까?',
                    showCancelButton: true,
                    confirmButtonText: `삭제`,
                    cancelButtonText: `취소`
                }).then(async (result) => {
                    if(result.isConfirmed){
                        if(!this.isUploading || !this.isDelete){
                            return this.$swal('이미지 작업 중입니다.')
                        }
                        this.isDelete = false
                        const img = this.goods_img[index]
                        this.goods_img_src[index] = ''
                        this.goods_img[index] = ''
                        await axios({
                            url:'http://localhost:3000/goods/delete_img',
                            method:'POST',
                            data:{
                                pastname: img
                            }
                        })
                        this.isDelete = true
                    }
                })
            },
            //카테고리등록
            cate2Change() {
                switch(this.product_category1){
                    case '의류':
                    case '뷰티':
                    case '생활가전':
                    case '취미':
                    case '기타':
                        this.product_category2 = 1
                        break
                }
            },
            gotoBack() {
                this.$router.go(-1)
            }
        },
        beforeDestroy() {
            for(var i=0;i<this.goods_img.length;i++){
                if(this.goods_img[i]!=''){
                    const img = this.goods_img[i]
                    axios({
                        url:'http://localhost:3000/goods/delete_img',
                        method:'POST',
                        data:{
                            pastname: img
                        }
                    })   
                }  
            }
        }
    }
</script>
<style scoped>

.container {
    width: 80%;
    display: flex;
    margin: auto;
    border: 2px solid rgb(221, 221, 221);
    flex-direction: row;
    justify-content: center;
}
/* ------------------------------------------------------------- */

p {
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

#store_upload_wrapper,
#store_product_name,
#store_product_category1,
#store_product_category2,
#store_price_trade,
#store_trade,
#store_timer_deliv {
    width: 80%;
    margin-left: 15%;
    height: auto;
}
#store_product_content {
    width: 80%;
    height: 100%;
    margin-left:15%;
    margin-bottom: 30px;
}

#store_product_name input,
#store_product_category1 select,
#store_product_category2 select,
#store_price_trade input,
#store_trade select,
#store_timer_deliv input, select {
    align-items: center;
    width: 100%;
    height: 40px;
    border: 2px solid rgb(221, 221, 221);
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    color: rgb(137, 137, 137);
    border-radius: 10px;
    padding-left: 15px;
}

#store_timer_deliv div {
    flex: 1;
    margin-bottom: 20px;
}

#store_product_content textarea {
    width: 100%;
    resize: none;
    text-align: center;
    font-size: large;
    border-radius: 5px;
    padding-top: 50px;
    border: 2px solid rgb(221, 221, 221);
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    color: rgb(137, 137, 137);
    border-radius: 10px;
}

 #store_submit {
    clear: both; /* Clear floats to ensure proper positioning */
    text-align: right; /* Align buttons to the right */
    margin-right:15%;
  }
  .btn{
    padding: 10px 20px;
    color: rgb(123, 123, 123);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
    cursor: pointer;
    margin-left:10px;
  }
  #store_submit button:hover {
    color: rgb(0, 0, 0);
    border: 2px solid rgb(224, 253, 217);
    background-color: rgb(224, 253, 217);
    border-radius: 10px;
    cursor: pointer;
}
 #store_submit input {
    padding: 10px 20px;
    background-color: rgb(255, 255, 255);
    color: rgb(123, 123, 123);
    border: 2px solid rgb(221, 221, 221);
    border-radius: 10px;
    cursor: pointer;
  }
  .imgContainer {
    height: 80px;
    display: flex;
    flex-wrap: wrap;
  }
  .imgContainer img {
    width: 80px;
    height: 80px;
    margin-right: 10px;
    margin-bottom: 10px;
    border: 2px solid rgb(221, 221, 221);
  }
  .imgContainer button {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: rgb(255, 0, 0);
    border: 2px solid rgb(123, 123, 123);
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    margin-left: -10px;
    margin-top: -10px;
  }
  .left {
    width:50%;
    height: 100%;
    margin-top: 30px;
  }
  .right {
    width:50%;
    height: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  input:focus {
    /* border: 2px solid #ffc905; */
    outline: 2px solid rgb(255, 236, 253);
    }
    .wi100 {
        width: 100%;
    }
    .isLoadingScreen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('../assets/logo.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100px;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
    }
</style>