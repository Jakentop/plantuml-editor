<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import specturm_line from '../../assets/spectrum-line.png'
const props = defineProps(['data'])
const source = ref('')
const loading = ref(true)
onMounted(async () => {
  renderImage(props.data)
})
watch(() => props.data, async (newdata) => {
  renderImage(newdata)
})
async function renderImage(data) {
  loading.value = true
  if (data)
    source.value = await window.electronAPI.umlPreviewBase64(data)
  else
    source.value = specturm_line
  loading.value = false
}
</script>

<template>
  <n-spin :show="loading">
    <div class="flex justify-center  ">
      <div>
        <img class="w-auto h-auto max-h-full max-w-full " :src="source">
      </div>
    </div>
    <template #description>
      刷新中……
    </template>
  </n-spin>
</template>
