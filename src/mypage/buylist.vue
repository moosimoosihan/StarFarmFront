<template>
    <main class="mt-3">
        <div class="container">
            <div class="myinfo">
                <div class="buylist_title">
                    <span>입찰 상품 이력</span>
                </div>
                <div class="goods">
                    <div class="table-responsive">
                        <table class="table" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>입찰번호</th>
                                    <th>상품이미지</th>
                                    <th>상품명</th>
                                    <th>금액</th>
                                    <th>상품상태</th>
                                    <th>일시</th>
                                    <th>삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr id="biding">
                                    <td>1</td>
                                    <td>
                                        <img src="" alt="상품 이미지">
                                    </td>
                                    <td>
                                        <p>상품명입니다</p>
                                    </td>
                                    <td>
                                        <span>등록가:1,000원</span><br>
                                        <span>입찰가:2,000원</span><br>
                                        <span>낙찰가:2,500원</span><br>
                                    </td>
                                    <td>
                                        <p>입찰 중</p>
                                    </td>
                                    <td>
                                        <p>2023-12-12 10:35</p>
                                    </td>
                                    <td>
                                        <div class="trash_icon">
                                            <i class="fas fa-solid fa-trash"></i>
                                        </div>
                                    </td>
                                </tr>
                                <tr id="ing">
                                    <td>2</td>
                                    <td>
                                        <img src="" alt="상품 이미지">
                                    </td>
                                    <td>
                                        <p>상품명입니다</p>
                                    </td>
                                    <td>
                                        <span>등록가:1,000원</span><br>
                                        <span>입찰가:2,000원</span><br>
                                        <span>낙찰가:2,500원</span><br>
                                    </td>
                                    <td>
                                        <p>거래 중</p>
                                    </td>
                                    <td>
                                        <p>2023-12-12 10:35</p>
                                    </td>
                                    <td>
                                        <div class="trash_icon">
                                            <i class="fas fa-solid fa-trash"></i>
                                        </div>
                                    </td>
                                </tr>
                                <tr id="complete">
                                    <td>3</td>
                                    <td>
                                        <img src="" alt="상품 이미지">
                                    </td>
                                    <td>
                                        <p>상품명입니다</p>
                                    </td>
                                    <td>
                                        <span>등록가:1,000원</span><br>
                                        <span>입찰가:2,000원</span><br>
                                        <span>낙찰가:2,500원</span><br>
                                    </td>
                                    <td>
                                        <p>거래완료</p>
                                    </td>
                                    <td>
                                        <p>2023-12-12 10:35</p>
                                    </td>
                                    <td>
                                        <div class="trash_icon">
                                            <i class="fas fa-solid fa-trash"></i>
                                        </div>
                                    </td>
                                </tr>
                                <tr id="cancel">
                                    <td>4</td>
                                    <td>
                                        <img src="" alt="상품 이미지">
                                    </td>
                                    <td>
                                        <p>상품명입니다</p>
                                    </td>
                                    <td>
                                        <span>등록가:1,000원</span><br>
                                        <span>입찰가:2,000원</span><br>
                                        <span>낙찰가:2,500원</span><br>
                                    </td>
                                    <td>
                                        <p>거래취소</p>
                                    </td>
                                    <td>
                                        <p>2023-12-12 10:35</p>
                                    </td>
                                    <td>
                                        <div class="trash_icon">
                                            <i class="fas fa-solid fa-trash"></i>
                                        </div>
                                    </td>
                                </tr>
                                <tr id="biding">
                                    <td>1</td>
                                    <td>
                                        <img src="" alt="상품 이미지">
                                    </td>
                                    <td>
                                        <p>상품명입니다</p>
                                    </td>
                                    <td>
                                        <span>등록가:1,000원</span><br>
                                        <span>입찰가:2,000원</span><br>
                                        <span>낙찰가:2,500원</span><br>
                                    </td>
                                    <td>
                                        <p>입찰 중</p>
                                    </td>
                                    <td>
                                        <p>2023-12-12 10:35</p>
                                    </td>
                                    <td>
                                        <div class="trash_icon">
                                            <i class="fas fa-solid fa-trash"></i>
                                        </div>
                                    </td>
                                </tr>
                                <tr id="ing">
                                    <td>2</td>
                                    <td>
                                        <img src="" alt="상품 이미지">
                                    </td>
                                    <td>
                                        <p>상품명입니다</p>
                                    </td>
                                    <td>
                                        <span>등록가:1,000원</span><br>
                                        <span>입찰가:2,000원</span><br>
                                        <span>낙찰가:2,500원</span><br>
                                    </td>
                                    <td>
                                        <p>거래 중</p>
                                    </td>
                                    <td>
                                        <p>2023-12-12 10:35</p>
                                    </td>
                                    <td>
                                        <div class="trash_icon">
                                            <i class="fas fa-solid fa-trash"></i>
                                        </div>
                                    </td>
                                </tr>
                                <tr id="complete">
                                    <td>3</td>
                                    <td>
                                        <img src="" alt="상품 이미지">
                                    </td>
                                    <td>
                                        <p>상품명입니다</p>
                                    </td>
                                    <td>
                                        <span>등록가:1,000원</span><br>
                                        <span>입찰가:2,000원</span><br>
                                        <span>낙찰가:2,500원</span><br>
                                    </td>
                                    <td>
                                        <p>거래완료</p>
                                    </td>
                                    <td>
                                        <p>2023-12-12 10:35</p>
                                    </td>
                                    <td>
                                        <div class="trash_icon">
                                            <i class="fas fa-solid fa-trash"></i>
                                        </div>
                                    </td>
                                </tr>
                                <tr id="cancel">
                                    <td>4</td>
                                    <td>
                                        <img src="" alt="상품 이미지">
                                    </td>
                                    <td>
                                        <p>상품명입니다</p>
                                    </td>
                                    <td>
                                        <span>등록가:1,000원</span><br>
                                        <span>입찰가:2,000원</span><br>
                                        <span>낙찰가:2,500원</span><br>
                                    </td>
                                    <td>
                                        <p>거래취소</p>
                                    </td>
                                    <td>
                                        <p>2023-12-12 10:35</p>
                                    </td>
                                    <td>
                                        <div class="trash_icon">
                                            <i class="fas fa-solid fa-trash"></i>
                                        </div>
                                    </td>
                                </tr>
                                <tr id="biding">
                                    <td>1</td>
                                    <td>
                                        <img src="" alt="상품 이미지">
                                    </td>
                                    <td>
                                        <p>상품명입니다</p>
                                    </td>
                                    <td>
                                        <span>등록가:1,000원</span><br>
                                        <span>입찰가:2,000원</span><br>
                                        <span>낙찰가:2,500원</span><br>
                                    </td>
                                    <td>
                                        <p>입찰 중</p>
                                    </td>
                                    <td>
                                        <p>2023-12-12 10:35</p>
                                    </td>
                                    <td>
                                        <div class="trash_icon">
                                            <i class="fas fa-solid fa-trash"></i>
                                        </div>
                                    </td>
                                </tr>
                                <tr id="ing">
                                    <td>2</td>
                                    <td>
                                        <img src="" alt="상품 이미지">
                                    </td>
                                    <td>
                                        <p>상품명입니다</p>
                                    </td>
                                    <td>
                                        <span>등록가:1,000원</span><br>
                                        <span>입찰가:2,000원</span><br>
                                        <span>낙찰가:2,500원</span><br>
                                    </td>
                                    <td>
                                        <p>거래 중</p>
                                    </td>
                                    <td>
                                        <p>2023-12-12 10:35</p>
                                    </td>
                                    <td>
                                        <div class="trash_icon">
                                            <i class="fas fa-solid fa-trash"></i>
                                        </div>
                                    </td>
                                </tr>
                                <tr id="complete">
                                    <td>3</td>
                                    <td>
                                        <img src="" alt="상품 이미지">
                                    </td>
                                    <td>
                                        <p>상품명입니다</p>
                                    </td>
                                    <td>
                                        <span>등록가:1,000원</span><br>
                                        <span>입찰가:2,000원</span><br>
                                        <span>낙찰가:2,500원</span><br>
                                    </td>
                                    <td>
                                        <p>거래완료</p>
                                    </td>
                                    <td>
                                        <p>2023-12-12 10:35</p>
                                    </td>
                                    <td>
                                        <div class="trash_icon">
                                            <i class="fas fa-solid fa-trash"></i>
                                        </div>
                                    </td>
                                </tr>
                                <tr id="cancel">
                                    <td>4</td>
                                    <td>
                                        <img src="" alt="상품 이미지">
                                    </td>
                                    <td>
                                        <p>상품명입니다</p>
                                    </td>
                                    <td>
                                        <span>등록가:1,000원</span><br>
                                        <span>입찰가:2,000원</span><br>
                                        <span>낙찰가:2,500원</span><br>
                                    </td>
                                    <td>
                                        <p>거래취소</p>
                                    </td>
                                    <td>
                                        <p>2023-12-12 10:35</p>
                                    </td>
                                    <td>
                                        <div class="trash_icon">
                                            <i class="fas fa-solid fa-trash"></i>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
    export default {
        name: "buylist",
        data() {
            return {
                buylist: [],
            }
        },
        methods: {
            // getBuylist() {
            //     this.$axios.get('/buylist')
            //         .then((res) => {
            //             this.buylist = res.data;
            //         })
            //         .catch((err) => {
            //             console.log(err);
            //         })
            // }
        },
        mounted() {
            // this.getBuylist();
        }
    }
</script>
<style scoped>
* {
    margin: 0;
    padding: 0;
    border-spacing: 0px;
}

ul,
li {
    list-style: none;
}

a {
    text-decoration: none;
}
.container {
    margin: 40px 30px;
}
.myinfo{
    margin-top: 30px;
}

h2 {
    margin: 20px 0;
}

.goods .table {
    max-width: 1200px;
    text-align: center;
    background-color: #f9f9f9;
    border-radius: 10px;
}

.goods .table th {
    text-align: center;
    padding: 20px 0;
}

.goods p {
    width: 120px;
    font-size: 1rem;
    display: inline-block;
    vertical-align: middle;
    padding: 2px;
    padding-top: 10px;
    margin: 20px 30px 16px 0px;
    /* border: 1px solid red; */
}

.goods .detail {
    display: flex;
}
.trash_icon {
    font-size: 20px;
    
}
th, td {
    border: 1px solid #444444;
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

</style>