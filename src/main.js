import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

// 레이아웃
import defaultLayout from './layouts/defaultLayout.vue'
import adminLayout from './layouts/adminLayout.vue'
import mypageLayout from './layouts/mypageLayout.vue'
import emptyLayout from './layouts/emptyLayout.vue'

// 메인 페이지
import MainPage from './views/MainPage.vue'
import login from './views/login.vue'
import signup from './views/signup.vue'
import product from './views/auction.vue'
import payment from './views/payment.vue'
import review from './views/review.vue'
import storeUpload from './views/store_upload.vue'
import userpage from './views/userpage.vue'

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
        path: '/payment',
        name: 'payment',
        component: payment
      },
      {
        path: '/review',
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
        }
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
app.mount('#app')