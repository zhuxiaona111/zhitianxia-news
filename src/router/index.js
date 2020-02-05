import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () => import ('@/views/layout')// 布局组件
const Home = () => import ('@/views/home')// 主页组件
const Question = () => import ('@/views/question')
const Videoes = () => import ('@/views/video')
const User = () => import ('@/views/user')
const Profile = () => import ('@/views/user/profile')
const Chat = () => import ('@/views/user/chat')
const Login = () => import ('@/views/login')
const Search = () => import ('@/views/search')
const Result = () => import ('@/views/search/result')
const Articles = () => import ('@/views/articles')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    children: [
      { path: '/',
        component: Home
      },
      { path: '/question',
        component: Question
      },
      { path: '/video',
        component: Videoes
      },
      { path: '/user',
        component: User
      }

    ]
  },
  {
    path: '/user/profile',
    component: Profile
  },
  {
    path: '/user/chat',
    component: Chat
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/search/result',
    component: Result
  },
  {
    path: '/articles',
    component: Articles
  }

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
