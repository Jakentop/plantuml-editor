import { join } from 'path'
import { BrowserWindow, Menu, MenuItem, app } from 'electron'
import { mainEvent } from './event'

const isDev = !app.isPackaged

export async function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, '../preload/index.js'),
      devTools: isDev,
    },
    autoHideMenuBar: !isDev,
  })

  win.maximize()

  const URL = isDev
    ? process.env.DS_RENDERER_URL
    : `file://${join(app.getAppPath(), 'dist/render/index.html')}`

  win.loadURL(URL)
  if (isDev)
    win.webContents.openDevTools()

  initMenu(win)

  // 拦截渲染器的键盘输入事件
  win.webContents.on('before-input-event', (_event, input) => {
    if (input.type === 'keyUp' && input.control && input.key.toLowerCase() === 'enter') {
      _event.preventDefault()
      win.webContents.send('vevent:uml:update')
    }
  })

  win.on('closed', () => {
    win.destroy()
  })

  return win
}

export async function restoreOrCreateWindow() {
  let window = BrowserWindow.getAllWindows().find(w => !w.isDestroyed())

  if (window === undefined)
    window = await createWindow()

  if (window.isMinimized())
    window.restore()

  window.focus()
}

/**
 * 初始化界面
 * @param window windows对象
 * @returns 返回menu对象
 */
function initMenu(window: BrowserWindow): Menu {
  const menu = new Menu()
  menu.append(new MenuItem({
    label: '操作',
    submenu: [
      {
        label: '打开',
        click: () => mainEvent.commonFileOpen(window),
        accelerator: process.platform === 'darwin' ? 'Cmd+o' : 'Ctrl+o',
      },
      {
        label: '保存',
        click: () => mainEvent.commonFileSavePre(window),
        accelerator: process.platform === 'darwin' ? 'Cmd+s' : 'Ctrl+s',
      },
      {
        label: '查询',
        click: () => window.webContents.send('vevent:uml:update'),
        accelerator: process.platform === 'darwin' ? 'Cmd+Enter' : 'Ctrl+Enter',
      },
    ],
  }))
  Menu.setApplicationMenu(menu)
  return menu
}
