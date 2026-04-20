import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Info from './views/Info.vue'
import Account from './views/Account.vue'
import History from './views/History.vue'
import Auth from './views/Auth.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/info', component: Info },
    { path: '/about', component: About },
    { path: '/account', component: Account },
    { path: '/history', component: History },
    { path: '/auth', component: Auth },
  ],
})

export default router
