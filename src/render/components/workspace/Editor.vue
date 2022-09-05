<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue'
import { editor } from 'monaco-editor'
import EditorStore from '@render/store/EditorStore';
const editorStore = EditorStore()
const el = ref()
let edit = null
onMounted(() => {
  edit = editor.create(el.value, { automaticLayout: false, scrollBeyondLastLine: false })
  editorStore.init(edit)
})

function getValue() {
  return editorStore.getValue()
}

function clearAll() {
  editorStore.clearAll()
}
defineExpose({ getValue, clearAll })
</script>

<template>
  <div ref="el" />
</template>
