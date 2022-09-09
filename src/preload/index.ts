import { contextBridge, ipcRenderer } from 'electron'
import type { IpcRenderer, IpcRendererEvent } from 'electron'

interface IElectronAPI {
  umlPreviewBase64: (data: string) => Promise<string>
  onVEventUmlUpdate: (callback: (event: IpcRendererEvent, ...args: any[]) => void) => any
  onVEventRegister: (eventName: string, callback: (event: IpcRendererEvent, ...args: any[]) => void) => IpcRenderer
  commonFileSave: (data: string, filePath?: string) => Promise<string>
}

declare global {
  interface Window {
    ipcRenderer: IpcRenderer
    electronAPI: IElectronAPI
  }
}

contextBridge.exposeInMainWorld('electronAPI', <IElectronAPI>{
  umlPreviewBase64: async (text: string) => await ipcRenderer.invoke('uml:preview:base64', text),
  onVEventUmlUpdate: callback => ipcRenderer.on('vevent:uml:update', callback),
  /**
   * 通用事件注册，监听主进程发来的消息
   * @param eventName 事件名称
   * @param callback 回调方法
   */
  onVEventRegister: (eventName: string, callback: (event: IpcRendererEvent, ...args: any[]) => void): IpcRenderer => ipcRenderer.on(eventName, callback),
  /**
   * 渲染器通知主进程保存文件
   * @param data editor中的数据
   * @param filePath （可选）需要保存的路径，没有则触发选择路径
   */
  commonFileSave: async (data: string, filePath?: string) => await ipcRenderer.invoke('common:fileSave', data, filePath),

})

contextBridge.exposeInMainWorld(
  'ipcRenderer',
  {
    invoke: ipcRenderer.invoke.bind(ipcRenderer),
    on: ipcRenderer.on.bind(ipcRenderer),
    removeAllListeners: ipcRenderer.removeAllListeners.bind(ipcRenderer),
  },
)
