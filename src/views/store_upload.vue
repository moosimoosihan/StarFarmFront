<template>
    <div class="container">
    <div id="store_upload_wrapper">
    <form>
     <div class="mb-3 row">
        <label class="col-md-3 col-form-label">상품 이미지(0/5)</label>
        <div class="col-md-9">
            <div class="row">
                <div class="col-lg-3 col-md-4 col-sm-2" :key="i" v-for="(m,i) in productImage.filter(c=>c.type==1)">
                    <div class="position-relative">
                        <img :src="`/download/${productId}/${m.path}`" class="img-fluid" />
                        <div class="position-absolute top-0 end-0" style="cursor: pointer;" @click="deleteImage(m.id,m.path)">X</div>
                    </div>
                </div>
            </div>
            <input type="file" class="form-control" accept="image/png,image/jpeg" @change="uploadFile($event.target.files, 1)">
            <div class="alert alert-secondary" role="alert">
                <ul>
                    <li>이미지 사이즈 : 350 * 350</li>
                    <li>파일 사이즈 : 1M 이하</li>
                    <li>파일 확장자 : png, jpg만 가능</li>
                </ul>
            </div>
        </div>
    </div>
    <div id="store_product_name">
      <p>상품명</p>
      <input type="text" placeholder="상품명을 입력해주세요." style="width: 100%;">
   </div>
   <div id="store_product_category1">
     <p>카테고리1</p>
     <select style="width: 100%;">
     <option>의류</option>
     <option>뷰티</option>
     <option>생활/가전</option>
     <option>취미</option>
     <option>기타</option>
     </select>
   </div>
   <div id="store_product_category2">
       <p>카테고리2</p>
       <select style="width: 100%;">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    </select>
   </div>
   <div id="store_price_trade">
   <div>
    시작가
    <input type="text" placeholder="경매 시작가를 입력해주세요." style="width: 100%;">
  </div>
  <div>
    거래유형
    <select style="width: 100%;">
      <option>택배거래</option>
      <option>직거래</option>
    </select>
   </div>
   </div>
   <div id="store_timer_deliv">
   <div>
    마감 시간
    <select style="width: 100%;">
      <option>1일</option>
      <option>2일</option>
      <option>3일</option>
      <option>4일</option>
    </select>
    </div>
    <div>
    택배 비용
    <input type="text" placeholder="택배 비용" style="width: 100%;">
    </div>
    </div>
    <div id="store_product_content">
    <p>설명</p>
    <textarea style="width: 100%; height: 400px;" placeholder="상품 설명을 입력해주세요. (최소 10글자)"></textarea>
   </div>
   <div id="store_submit">
    <input type="button" value="취소" class="cancel-btn">
    <input type="submit" value="상품 등록" class="submit-btn">
   </div>
    </form>
   </div>
   </div>
</template>
<script>
import axios from 'axios'
    export default {
        data() {
            return {
                productId: 0,
                productImage: [],
                store_product_name: '',
                store_product_category1: '',
                store_product_category2: '',
                store_price_trade: '',
                store_timer_deliv: '',
                store_product_content: ''
            }
        },
        computed: {
            user () {
                return this.$store.state.user
            }
        },
        created () {
            this.productId = this.$route.query.product_id
            this.getProductImage()
        },
        methods: {
            async getProductImage () {
                const response = await axios.get(`http://localhost:3000/goods/imageList/${this.productId}`);
                    this.productImage = response.data[0];
            },
            async uploadFile(files, type){
                let name = ''
                let data = null
                if(files){
                    name = files[0].name
                    data = await this.$base64(files[0])
                }
                const { error } = await this.$api(`/upload/${this.productId}/${type}/${name}`, { data })
                if(error){
                    return this.$swal('파일 업로드에 실패하였습니다. 다시 시도하세요.')
                }

                this.$swal('이미지가 업로드 되었습니다.')

                setTimeout(() => {
                    this.getProductImage()
                }, 1000)
            },
            deleteImage(id,name){
                this.$swal.fire({
                    title:'정말 삭제하시겠습니까?',
                    showCancelButton: true,
                    confirmButtonText: `삭제`,
                    cancelButtonText: `취소`
                }).then(async (result) => {
                    if(result.isConfirmed){
                        await axios.get(`http://localhost:3000/goods/imageDelete/${this.id}`);
                        this.getProductImage()
                        this.$swal.fire('삭제되었습니다.','','success')
                    }
                })
            },
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
    height: 800px;
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
    margin-left: 20px;
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
#store_product_name {
    width: 100%;
    height: 120px;
    line-height: 120px;
    white-space: nowrap;
}
#store_product_name input {
    width: 40%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid black;
}
#store_product_category1 {
    width: 100%;
    height: 80px;
    line-height: 80px;
}
#store_product_category2 {
    width: 100%;
    height: 80px;
    line-height: 80px;
}
#store_price_trade {
    width: 100%;
    height: 80px;
    line-height: 80px;
}
#store_price_trade input {
    width: 200px;
    height: 40px;
    border: 1px solid black;
    border-radius: 5px;
}
#store_price_trade div {
    float: left;
}
#store_price_trade div:last-child {
    width: 330px;
    height: 50px;
    float: right;
}
#store_timer_deliv {
    width: 100%;
    height: 80px;
    line-height: 80px;
}
#store_timer_deliv div {
    float: left;
}
#store_timer_deliv div:last-child {
    width: 330px;
    height: 50px;
    float: right;
}
#store_timer_deliv input {
    width: 150px;
    height: 40px;
    border: 1px solid black;
    border-radius: 5px;
}
#store_product_content p {
    margin-bottom: 10px;
}
#store_product_content textarea {
    width: 100%;
    height: 300px;
    resize: none;
    text-align: center;
    font-size: large;
    border-radius: 5px;
    padding-top: 50px;
}
#store_submit {
    float: right;
    margin: 10px 0;
}
#store_submit input {
    margin-left: 20px;
    padding: 10px 20px;
    background: none;
    border: none;
    background-color: aqua;
    border-radius: 5px;
}
</style>