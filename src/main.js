import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

// 레이아웃
import defaultLayout from './layouts/defaultLayout.vue'
// import adminLayout from './layouts/adminLayout.vue'
import mypageLayout from './layouts/mypageLayout.vue'

// 메인 페이지

// 마이 페이지
import buylist from './mypage/buylist.vue'
import salesList from './mypage/salelist.vue'
import likeList from './mypage/likelist.vue'
import userEdit from './mypage/mypageeditUser.vue'
import myReview from './mypage/myreview.vue'
import myChat from './mypage/mychat.vue'
import myPage from './mypage/mypage.vue'

// 관리자 페이지

import MainPage from './views/MainPage.vue'

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
    }
  ]

// window.Kakao.init('카카오 앱 키');

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App)
app.use(router)
app.mount('#app')