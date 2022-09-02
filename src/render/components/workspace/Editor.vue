<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { editor } from 'monaco-editor'
const el = ref()
let edit = null
onMounted(() => {
  edit = editor.create(el.value, { automaticLayout: true })
})

function getValue() {
  return edit.getValue()
}
defineExpose({ getValue })
</script>

<template>
  <div ref="el" />
</template>
