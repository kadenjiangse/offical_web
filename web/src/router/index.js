import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Product from '../views/Product.vue'
import NProgress from 'nprogress'
import New from '../views/New.vue'
import 'nprogress/nprogress.css'
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/news',
    name: 'news',
    component: News
  },

  {
    path: '/product',
    component: Product
  },
  {
    path: '/new/:id',
    component: New
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
}
)
router.afterEach((to, from, next) => {
  NProgress.done()
})

export default router
