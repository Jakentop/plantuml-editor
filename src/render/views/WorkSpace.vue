<!-- eslint-disable no-console -->
<script setup lang="ts">
import type { IFileInfo } from '@main/utils'
import Editor from '@render/components/workspace/Editor.vue'
import Preview from '@render/components/workspace/Preview.vue'
import type { IpcRendererEvent } from 'electron'
import { ref } from 'vue'

const value = ref('')
const editor = ref()

function update(event?) {
  console.info(event && null)
  console.info(editor.value.getValue())
  value.value = editor.value.getValue()
}

function clearAll() {
  value.value = ''
  editor.value.clearAll()
}

// 注册Ipc给的事件
window.electronAPI.onVEventUmlUpdate(() => {
  update()
})

// 注册打开文件的事件回调
window.electronAPI.onVEventRegister('common:openFile', (_event: IpcRendererEvent, file: IFileInfo) => {
  editor.value.setValue(file)
  update()
})
// 注册保存文件预处理回调
window.electronAPI.onVEventRegister('common:fileSave:pre', async () => {
  const data = editor.value.getValue()
  if (data) {
    const newPath = await window.electronAPI.commonFileSave(data, editor.value.getCurFilePath())
    if (newPath !== editor.value.getCurFilePath())
      editor.value.setCurFilePath(newPath)
  }
})
</script>

<template>
  <n-layout position="absolute" style="height:100%">
    <n-layout-header style="height:6%">
      <div class="grid grid-cols-12 grid-rows-1 h-full">
        <div class="col-span-2 p-1">
          <img class="w-auto h-auto max-h-full max-w-full " src="../assets/HelloElectron.jpg">
        </div>
        <div class="col-span-4" />
        <div class="col-span-6">
          <div class="space-x-2">
            <div class="inline-block">
              操作：
            </div>
            <n-button type="primary" @click="update">
              查询
            </n-button>
            <n-button type="warning" @click="clearAll">
              清空
            </n-button>
            <div class="inline-block text-gray-500">
              （Ctrl+Enter查询 Ctrl+Backspace删除）
            </div>
          </div>
        </div>
      </div>
    </n-layout-header>
    <n-layout-content style="height:94%">
      <div class="absolute w-full h-full grid grid-cols-2">
        <!-- 编辑器 -->
        <Editor ref="editor" class="h-full" />
        <!-- 预览界面 -->
        <Preview :data="value" />
      </div>
    </n-layout-content>
  </n-layout>
</template>
