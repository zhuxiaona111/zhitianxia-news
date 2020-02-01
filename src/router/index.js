import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () => import ('@/views/layout')// 布局组件
const Home = () => import ('@/views/home')// 主页组件
const Question = () => import ('@/views/question')
const Video = () => import ('@/views/video')
const User = () => import ('@/views/user')
const Profile = () => import ('@/views/user/profile')
const Chat = () => import ('@/views/user/chat')
const Login = () => import ('@/views/login')
const Search = () => import ('@/views/search')
const Result = () => import ('@/views/search/result')
const Article = () => import ('@/views/article')
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
        component: Video
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
    path: '/article',
    component: Article
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
