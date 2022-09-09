<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue'
import { editor } from 'monaco-editor'
import EditorStore from '@render/store/EditorStore'
import type { IFileInfo } from '@main/utils'
const editorStore = EditorStore()
const el = ref()
let edit = null

onMounted(() => {
  edit = editor.create(el.value, { automaticLayout: true, scrollBeyondLastLine: false })
  editorStore.init(edit)
})

function getValue() {
  return editorStore.getValue()
}

function setValue(file: IFileInfo) {
  editorStore.setValue(file.data, file.filePath)
}

function getCurFilePath() {
  if (editorStore.curFilePath)
    return editorStore.curFilePath
}

function setCurFilePath(path: string) {
  editorStore.setCurFilePath(path)
}

function clearAll() {
  editorStore.clearAll()
}
defineExpose({ getValue, clearAll, setValue, getCurFilePath, setCurFilePath })
</script>

<template>
  <div ref="el" />
</template>
