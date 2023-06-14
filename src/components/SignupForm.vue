<template>
<form @submit.prevent='handleSubmit'>
	<input type="text" required placeholder="display name" v-model="credentials.displayName">
	<input type="email" required placeholder="email" v-model="credentials.email">
	<input type="password" required placeholder="password" v-model="credentials.password">
	<div class="error">{{ storeAuth.error }}</div>
	<button>Sign up</button>
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
	displayName: ''
})

// emit

const emit = defineEmits(['signup'])

const handleSubmit = () => {
	if(!credentials.email || !credentials.password){
		alert("Email and password are both required")
	}
	storeAuth.registerUser(credentials)

	if(!storeAuth.error){
		emit('signup')
	}
}

</script>