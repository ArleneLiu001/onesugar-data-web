import {
  createRouter,
  createWebHistory
} from 'vue-router'

export const routes = [{
  path: '/',
  name: 'HomePages',
  component: () => import('@/views/Home.vue'),
  meta: {
    title: '首页'
  },
},
{
  path: '/detail',
  name: 'detail',
  component: () => import('@/views/Detail.vue'),
  meta: {
    title: '详情'
  },
},
{
  path: '/error',
  name: 'Error',
  component: () => import('@/components/error.vue'),
  meta: {
    title: '错误'
  }
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  if (!router.hasRoute(to.name)) {
    router.push('/error')
  }
  document.title = to.meta.title
  window.scrollTo(0, 0)
})

router.onError((handel) => {
  console.log('error-router', handel)
})

export default router