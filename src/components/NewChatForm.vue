<template>
  <form>
    <textarea
      placeholder="Type a message and hit enter to send..."
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
    ></textarea>
  </form>
</template>

<script setup>


import {ref} from 'vue'
import {useStoreAuth} from '@/stores/storeAuth'
import {useStoreMessages} from '@/stores/storeMessage'
import { db, timestamp, auth } from '@/firebase/config'

// auth
const storeAuth = useStoreAuth();
const storeMessage = useStoreMessages();

const message = ref('')

const handleSubmit = async () => {
	const chat = {
		name:storeAuth.user.displayName,
		message: message.value,
		createAt: Date.parse(new Date())
	}
	storeMessage.addMessage(chat)
	message.value = ''
}

</script>

<style scoped>
  form {
    margin: 10px;
  }
  textarea {
    width: 100%;
    max-width: 100%;
    margin-bottom: 6px;
    padding: 10px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    font-family: inherit;
    outline: none;
  }
</style>