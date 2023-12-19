import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

// 레이아웃
import defaultLayout from './layouts/defaultLayout.vue'
// import adminLayout from './layouts/adminLayout.vue'
// import mypageLayout from './layouts/mypageLayout.vue'

// 메인 페이지

// 마이 페이지

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
}]

// window.Kakao.init('카카오 앱 키');

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App)
app.use(router)
app.mount('#app')