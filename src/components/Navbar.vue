
<template>
  <nav v-if='Object.keys(storeAuth.user).length > 0'>
    <div>
      <p>Hey there {{storeAuth.user.displayName }}</p>
      <p class="email">Currently logged in as {{ storeAuth.user.email }}</p>
    </div>
		<button @click='handleClick'>
			Logout
		</button>
  </nav>
</template>

<script setup>
import {useStoreAuth} from '@/stores/storeAuth'
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

// auth
const storeAuth = useStoreAuth();

const handleClick = () => {
	storeAuth.logoutUser()
}

</script>

<style>
  nav {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav p {
    margin: 2px auto;
    font-size: 16px;
    color: #444;
  }
  nav p.email {
    font-size: 14px;
    color: #999;
  }
</style>