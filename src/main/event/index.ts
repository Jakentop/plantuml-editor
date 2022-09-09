/* eslint-disable no-console */
import { BrowserWindow, ipcMain } from 'electron'
import axios from 'axios'
import { fileUtils } from '@main/utils'

export const mainEvent = {
  /**
   * 从主进程打开文件
   * @param window 窗口对象
   */
  commonFileOpen: async (window: BrowserWindow): Promise<void> => {
    const file = await fileUtils.readFile()
    window.webContents.send('common:openFile', file)
  },
  /**
   * 从主进程发送保存通知
   */
  commonFileSavePre: async (window: BrowserWindow): Promise<void> => {
    window.webContents.send('common:fileSave:pre')
  },
}

/**
 * 初始化渲染器待注册的事件
 */
export const initEvent = () => {
  /**
   * 将plantuml转换到base64
   */
  ipcMain.handle('uml:preview:base64', async (_event, text: string) => {
    // console.info(`run preview base64:${text}`)
    const code = (await axios.request({
      url: 'http://localhost:8080/plantuml/uml/',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: `text=${encodeURI(text)}`,
    })).data
    // console.info(code)
    return (await axios.get(`http://localhost:8080/plantuml/base64/${code}`)).data
  })
  /**
   * 获取保存事件（渲染器发出）并存储
   */
  ipcMain.handle('common:fileSave', async (_event, data: string, filePath?: string) => {
    console.log(data, filePath)
    return await fileUtils.saveFile(data, filePath)
  })
}
