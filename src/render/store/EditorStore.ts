// 编辑器状态管理

import { defineStore } from 'pinia'
import { toRaw } from 'vue'

export interface EditorPublicMethods {
  getValue(): string
}
export default defineStore('editor', {
  state: () => {
    return {
      editor: null, // 当前编辑器实例
      editorValue: '', // 当前编辑器的内容
      curFilePath: '', // 当前打开的文本路径
    }
  },
  actions: {
    /**
     * 获取编辑器内容
     * @returns 当前编辑器的内容
     */
    getValue(): string {
      return this.editor ? toRaw(this.editor).getValue() : ''
    },
    /**
     * 清空所有数据
     */
    clearAll(): void {
      toRaw(this.editor)?.setValue('')
      this.editorValue = ''
    },
    /**
     * 设置编辑器value
     * @param data 需要设置的值
     */
    setValue(data: string, filePath?: string): void {
      toRaw(this.editor)?.setValue(data)
      this.editorValue = data
      this.curFilePath = filePath
    },
    /**
     * 设置新的路径
     * @param path 新的路径
     */
    setCurFilePath(path: string): void {
      this.curFilePath = path
    },
    /**
     * 数据初始化
     */
    init(editor) {
      this.editor = editor
      this.editorValue = editor.getValue()
    },
    /**
     * 刷新编辑器和store的状态
     */
    flush() {
      this.editorValue = toRaw(this.editor)?.getValue()
    },
  },
})
