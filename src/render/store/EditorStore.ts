// 编辑器状态管理

import { defineStore } from 'pinia'
import { toRaw } from 'vue'

export interface EditorPublicMethods {
  getValue(): string
}
export default defineStore('editor', {
  state: () => {
    return {
      editor: null,
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
    },
    /**
     * 数据初始化
     */
    init(editor: any) {
      this.editor = editor
    },
  },
})
