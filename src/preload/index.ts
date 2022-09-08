import { contextBridge, ipcRenderer } from 'electron'
import type { IpcRenderer } from 'electron'

interface IElectronAPI {
  umlPreviewBase64: (data: string) => Promise<string>
  onVEventUmlUpdate: (callback: any) => any
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
})

contextBridge.exposeInMainWorld(
  'ipcRenderer',
  {
    invoke: ipcRenderer.invoke.bind(ipcRenderer),
    on: ipcRenderer.on.bind(ipcRenderer),
    removeAllListeners: ipcRenderer.removeAllListeners.bind(ipcRenderer),
  },
)
