<template>
<div class="container">
	<Navbar/>
	<ChatWindow></ChatWindow>
	<NewChatForm></NewChatForm>
</div>
</template>

<script setup>

import Navbar from '@/components/Navbar.vue'
import NewChatForm from '@/components/NewChatForm.vue'
import ChatWindow from '@/components/ChatWindow.vue'


import {useStoreAuth} from '@/stores/storeAuth'

import {useStoreMessages} from '@/stores/storeMessage'

const storeMessage = useStoreMessages();


// auth
const storeAuth = useStoreAuth();

const user = storeAuth.user

</script>
