import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import store from './store'
import mixins from './mixins'

// 레이아웃
import defaultLayout from './layouts/defaultLayout.vue'
import adminLayout from './layouts/adminLayout.vue'
import mypageLayout from './layouts/mypageLayout.vue'
import emptyLayout from './layouts/emptyLayout.vue'

// 메인 페이지
import MainPage from './views/MainPage.vue'
import login from './views/login.vue'
import signup from './views/signup.vue'
import FindPage from './views/find.vue'
import product from './views/auction.vue'
import payment from './views/payment.vue'
import report from './views/report.vue'
import review from './views/review.vue'
import storeUpload from './views/store_upload.vue'
import userpage from './views/userpage.vue'
import paymentdetail from './views/paymentDetail.vue'
import searchgoodslist from './views/search_goodslist.vue'

// 마이 페이지
import buylist from './mypage/buylist.vue'
import salesList from './mypage/salelist.vue'
import likeList from './mypage/likelist.vue'
import userEdit from './mypage/mypageeditUser.vue'
import myReview from './mypage/myreview.vue'
import myChat from './mypage/mychat.vue'
import myPage from './mypage/mypage.vue'

// 관리자 페이지
import adminDeal from './admin/AdminDeal.vue'
import adminReport from './admin/AdminReport.vue'
import adminUser from './admin/AdminUser.vue'

// 채팅 페이지
import chatroom from './views/chatroom.vue'

const routes = [
  {
    path: '/',
    name: 'defaultLayout',
    component: defaultLayout,
    children: [
      {
        path: '/',
        name: 'MainPage',
        component: MainPage
      },
      {
        path: '/product/:id',
        name: 'product',
        component: product
      },
      {
        path: '/payment/:id',
        name: 'payment',
        component: payment
      },
      {
        path: '/report/:id',
        name: 'report',
        component: report
      },
      {
        path: '/review/:id',
        name: 'review',
        component: review
      },
      {
        path: '/store_upload',
        name: 'store_upload',
        component: storeUpload
      },
      {
        path: '/userpage/:id',
        name: 'userpage',
        component: userpage
      },
      {
        path: '/paymentdetail/:id',
        name: 'paymentdetail',
        component: paymentdetail
      },
      {
        path: '/search_goodslist',
        name: 'search_goodslist',
        component: searchgoodslist
      }
    ]
  },
  {
      path: '/mypage/',
      name: 'mypageLayout',
      component: mypageLayout,
      children: [
        {
          path: '',
          component: myPage,
        },
        {
          path: 'buylist',
          component: buylist,
        },
        {
          path: 'salelist',
          component: salesList,
        },
        {
          path: 'likelist',
          component: likeList,
        },
        {
          path: 'mypageeditUser',
          component: userEdit,
        },
        {
          path: 'myreview',
          component: myReview,
        },
        {
          path: 'mychat',
          component: myChat,
        }
      ]
    },
    {
      path:'/login/',
      name: 'emptyLayout',
      component: emptyLayout,
      children: [
        {
          path: '',
          component: login,
        },
        {
          path: 'signup',
          component: signup,
        },
        {
          path: '/chatroom/:id',
          name: 'chatroom',
          component: chatroom
        },
        {
          path: 'find',
          component: FindPage,
        },
      ]
    },
    {
      path:'/admin/',
      name: 'adminLayout',
      component: adminLayout,
      children: [
        {
          path: '',
          component: adminUser,
        },
        {
          path: 'report',
          component: adminReport,
        },
        {
          path: 'deal',
          component: adminDeal,
        }
      ]
    }
  ]

window.Kakao.init('cbecce5f9f0a0deb9e593b0f1ca564f0');

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App)
app.use(router)
app.use(store)
app.use(VueSweetalert2)
app.mixin(mixins)
app.mount('#app')