<template>
    <div class="container">
        <div class="review_wrapper">
            <h1>{{ $route.params.sale==='sale' ? '구매자에게' : '판매자에게' }} 리뷰 작성</h1>
            <div class="review_product_name">
                <img :src="review_info.goods_img ? require(`../../../StarFarmBack/uploads/uploadGoods/${review_info.goods_no}/${review_info.goods_img.split(',')[0]}`):require(`../assets/2-1.png`)" class="review_product_img">
                <h2>{{ review_info.goods_nm }}</h2>
                <div class="review_user">
                <img class="review_user_img" :src="review_info.user_img ? require(`../../../StarFarmBack/uploads/userImg/${review_info.user_no}/${review_info.user_img}`):require(`../assets/profile.png`)">
                <span class="review_user_nick">{{ review_info.user_nick }}</span>
                </div>
            </div>
            <p>리뷰 평가</p>
            <div class="review_rating">
                <button :class=" { clicked_good:isClicked_good }"><img src="../assets/smile.png" @click="score_click_good"></button>
                <button :class=" { clicked_normal:isClicked_normal }"><img src="../assets/normal.png" @click="score_click_normal"></button>
                <button :class=" { clicked_bad:isClicked_bad}"><img src="../assets/bad.png" @click="score_click_bad"></button>
            </div>
                <textarea v-model="review_con"></textarea>
                <button @click="review_add">확인</button>
                <button value="취소" >취소</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return {
            review_con: '',
            review_score: 2,
            review_info: [],
            isClicked_good: false,
            isClicked_bad: false,
            isClicked_normal: true,
        }
    },
    computed: {
        user () {
            return this.$store.state.user
        }
    },
    created() {
        this.getGoodsInfo();
    },
    methods: {
            async review_add() {
                if(this.review_con===''){
                    return this.$swal('리뷰 내용을 입력해주세요.')
                }
                try {
                    const goods_no = this.$route.params.id;
                    axios({
                        url: `http://localhost:3000/goods/write_review/${goods_no}`,
                        method: "POST", 
                        data: {
                            review_con: this.review_con,
                            review_score: this.review_score,
                            writer_user: this.user.user_no,
                            review_goods: this.review_info.goods_no,
                            sell_user_no: this.review_info.user_no
                        },
                    })
                    .then((res) => {
                        if(res.data.message=='review_complete'){
                            this.$swal({
                                position: 'top',
                                icon: 'success',
                                title: '리뷰 등록 성공!',
                                showConfirmButton: false,
                                timer: 1000
                            })
                            .then(() => {
                                this.$router.push('/mypage/myreview');
                            })
                        // } else if (res.data.message == 'already_exist_goods'){
                        //     this.$swal("이미 등록된 제품입니다.");
                        }
                        else if (res.data.message == '리뷰 등록 실패'){
                            this.$swal("리뷰 등록 실패");
                        }
                        else {
                            console.log(res.data.message);
                            this.$swal("리뷰 등록 실패");
                        }
                    })
                    .catch(() => {
                        this.$swal("오류 발생")
                    })
                } catch(err){
                    console.log(err);
                }
            },
            score_click_good() {
                this.review_score = 0;
                if(!this.isClicked_good){
                    this.isClicked_good = true;
                }
                this.isClicked_bad = false;
                this.isClicked_normal = false;
            },
            score_click_bad() {
                this.review_score = 1;
                if(!this.isClicked_bad){
                    this.isClicked_bad = true;
                }
                this.isClicked_good = false;
                this.isClicked_normal = false;
            },
            score_click_normal() {
                this.review_score = 2;
                if(!this.isClicked_normal){
                    this.isClicked_normal = true;
                }
                this.isClicked_good = false;
                this.isClicked_bad = false;
            },
            async getGoodsInfo() {
                if(this.$route.params.sale==='sale'){
                    // 판매자의 경우 구매자에게 리뷰를 작성
                    try {
                        const goods_no = this.$route.params.id;
                        const response = await axios.get(`http://localhost:3000/goods/sale_write_review_info/${goods_no}`);
                        this.review_info = response.data[0];
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    try {
                        const goods_no = this.$route.params.id;
                        const response = await axios.get(`http://localhost:3000/goods/write_review_info/${goods_no}`);
                        this.review_info = response.data[0];
                    } catch (error) {
                        console.error(error);
                    }
                }
                
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

.review_wrapper {
    width: 60%;
    height: 1050px;
    margin: 0 auto;
}
.review_wrapper h1 {
    font-size: 40px;
    font-weight: 100;
    margin-bottom: 20px;
}
.review_product_name {
    width: 100%;
    height: 200px;
    border: 1px solid black;
    border-radius: 20px;
}
.review_product_img {
    width: 200px;
    height:100%;
    background-color: bisque;
    float: left;
}
.review_product_name h2 {
    font-size: 25px;
    font-weight: 400;
    margin-left: 30px;
    float: left;
}
.review_product_name span {
    font-size: 15px;
    margin-left: 20px;
}
.review_user {
    width: 130px;
    height: 100%;
    float: right;
    margin: 20px 20px 0 0;
}
.review_user_img {
    height: 70%;
    width: 140px;
    border-radius: 100%;
    background-color: blue;
}

.review_wrapper p {
    margin-top: 20px;
    font-size: 25px;
    font-weight: 200;
    text-align: center;
}
.review_rating {
    width: 40%;
    height: 100px;
    margin: 10px auto;
}
.review_rating button {
    width: 25%;
    margin-left: 12%;
    border: none;
    border-radius: 100%;
}
.review_rating button img {
    width: 100%;
    height: 100%;
}
.review_rating button:first-child {
    float:left;
    margin-left: 0;
}
.review_rating button:last-child {
    float: right;
    margin-left: 0;
}
textarea {
    width: 100%;
    height: 300px;
    box-sizing: border-box;
    border: solid black 1px;
    border-radius: 5px;
    resize: none;
    margin-top: 50px;
}
button {
    width: 100px;
    height: 50px;
    float: right;
    border: none;
    background:none;
    background-color: aqua;
    margin-left: 20px;
    border-radius: 10px;
}
.clicked_good {
    background-color: yellow;
}
.clicked_bad {
    background-color: yellow;
}
.clicked_normal {
    background-color: yellow;
}
</style>