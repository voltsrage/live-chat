<template>
  <div id="nav">
  </div>
  <RouterView />
</template>

<script setup>

/* Imports */
import {useStoreAuth} from '@/stores/storeAuth'
import { onMounted,onBeforeMount } from 'vue';

// auth
const storeAuth = useStoreAuth();

onBeforeMount(() => {
	storeAuth.init()
})
</script>