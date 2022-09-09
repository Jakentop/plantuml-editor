import * as fs from 'fs/promises'
import { dialog } from 'electron'

/**
 * 文件读取返回的类型，包括路径和数据
 */
export interface IFileInfo {
  filePath?: string
  data: string
}
/**
 * 文件操作工具类
 */
export const fileUtils = {
  /**
   * 打开文件，并读取文件的text
   * @returns 读取到的text文件
   */
  readFile: async (): Promise<IFileInfo> => {
    const { canceled, filePaths } = await dialog.showOpenDialog({})
    let filePath = ''
    if (!canceled)
      filePath = filePaths[0]
    const data = await fs.readFile(filePath)
    return { filePath, data: data.toString() }
  },
  /**
   * 全量保存编辑器中的text文件
   * @param data 需要保存的文本文件
   * @param curPath 如果存在则指定了保存路径
   * @return 保存的filePath
   */
  saveFile: async (data: string, curPath?: string): Promise<string> => {
    if (curPath) {
      await fs.writeFile(curPath, data)
      return curPath
    }
    else {
      const { canceled, filePath } = await dialog.showSaveDialog({})
      if (!canceled)
        await fs.writeFile(filePath, data)
      return filePath
    }
  },
}

