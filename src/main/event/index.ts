/* eslint-disable no-console */
import { ipcMain } from 'electron'
import axios from 'axios'

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
}
