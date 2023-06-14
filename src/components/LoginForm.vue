<template>
<form @submit.prevent='handleSubmit'>
	<input type="email" required placeholder="email" v-model="credentials.email">
	<input type="password" required placeholder="password" v-model="credentials.password">
	<div class="error">{{ storeAuth.error }}</div>
	<button>Login</button>
</form>
</template>

<script setup>
import {useStoreAuth} from '@/stores/storeAuth'
import {ref,reactive} from 'vue'

// auth
const storeAuth = useStoreAuth();

// credentials

const credentials = reactive({
	email:'',
	password: '',
})

// emit

const emit = defineEmits(['login'])

const handleSubmit = () => {
	if(!credentials.email || !credentials.password){
		alert("Email and password are both required")
	}
	storeAuth.loginUser(credentials)
	if(!storeAuth.error){
		emit('login')
	}

}

</script>