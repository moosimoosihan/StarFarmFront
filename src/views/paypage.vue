<template>
    <div>
        <button @click="paytest()">결제버튼</button>
    </div>
</template>
<script>
import { Bootpay } from '@bootpay/client-js'
export default {
    methods: {
        async paytest() {
            const response = await Bootpay.requestPayment({
            "application_id": "657fe1f7e57a7e001b5a00b2",
            "price": 1000,
            "order_name": "테스트결제",
            "order_id": "TEST_ORDER_ID",
            "pg": "다날",
            "method": "카드",
            "tax_free": 0,
            "user": {
                "id": "회원아이디",
                "username": "회원이름",
                "phone": "01000000000",
                "email": "test@test.com"
            },
            "items": [
                {
                "id": "item_id",
                "name": "테스트아이템",
                "qty": 1,
                "price": 1000
                }
            ],
            "extra": {
                "open_type": "iframe",
                "card_quota": "0,2,3",
                "escrow": false
            }
            })

            console.log(response)
        }
    }
}
</script>