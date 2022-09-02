import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  umlPreviewBase64: async (text: string) => await ipcRenderer.invoke('uml:preview:base64', text),
})

contextBridge.exposeInMainWorld(
  'ipcRenderer',
  {
    invoke: ipcRenderer.invoke.bind(ipcRenderer),
    on: ipcRenderer.on.bind(ipcRenderer),
    removeAllListeners: ipcRenderer.removeAllListeners.bind(ipcRenderer),
  },
)
