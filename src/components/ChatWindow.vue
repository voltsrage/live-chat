<template>
  <div class="chat-window">
    <div v-if="storeMessage.messages" class="messages" ref='messagesRef'>
      <div v-for="doc in storeMessage.messages" :key="doc.id" class="single">
        <span class="created-at">{{ useTimeAgo (new Date(parseInt(doc.createAt))).value }}</span>
        <span class="name">{{ doc.name }}</span>
        <span class="message">{{ doc.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStoreMessages} from '@/stores/storeMessage'
import {onMounted, onUpdated, ref} from 'vue'
import {useNow, useDateFormat, useTimeAgo } from '@vueuse/core'

const storeMessage = useStoreMessages();


onMounted( () => {
	storeMessage.getMessages()
})

const messagesRef = ref(null)

onUpdated(() => {
	messagesRef.value.scrollTop = messagesRef.value.scrollHeight
})
</script>

<style scoped>
  .chat-window {
    background: #fafafa;
    padding: 30px 20px;
  }
  .single {
    margin: 18px 0;
  }
  .created-at {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 4px;
  }
  .name {
    font-weight: bold;
    margin-right: 6px;
  }
  .messages {
    max-height: 400px;
    overflow: auto;
  }
</style>