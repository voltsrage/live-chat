import { createRouter, createWebHistory } from 'vue-router'
import { useStoreAuth } from '@/stores/storeAuth'
import Welcome from '../views/Welcome.vue'
import Chatroom from '../views/Chatroom.vue'

const routes = [{
    path: '/',
    name: 'Welcome',
    component: Welcome
}, {
    path: '/chatroom',
    name: 'Chatroom',
    component: Chatroom
}]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async(to, from) => {
    const storeAuth = useStoreAuth();

    if (!storeAuth.user.id && to.name !== 'Welcome') {
        return { name: 'Welcome' }
    }

    if (storeAuth.user.id && to.name === 'Welcome') {
        console.log(to.name)
        console.log(from.name)
        return false // user cannot leave the page they are on
    }


})

export default router