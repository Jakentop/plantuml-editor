<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
const props = defineProps(['data'])
const source = ref('')
onMounted(async () => {
  source.value = await window.electronAPI.umlPreviewBase64(props.data)
})
watch(() => props.data, async (newdata) => {
  source.value = await window.electronAPI.umlPreviewBase64(newdata)
})
</script>

<template>
  <div><img :src="source"></div>
</template>
