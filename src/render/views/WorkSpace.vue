<script setup lang="ts">
import Editor from '@render/components/workspace/Editor.vue'
import Preview from '@render/components/workspace/Preview.vue'
import { ref } from 'vue'

const value = ref('')
const editor = ref()

function update() {
  console.log(editor.value.getValue())
  value.value = editor.value.getValue()
}
</script>

<template>
  <div @click="update">123</div>
  <div class="absolute w-full h-full grid grid-cols-2" @keydown.ctrl.enter="update">
    <!-- 编辑器 -->
    <Editor ref="editor" />
    <!-- 预览界面 -->
    <Preview :data="value" />
  </div>
</template>
