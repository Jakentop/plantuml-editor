import { app } from 'electron'
import { createWindow } from './main.window'
import { initEvent } from './event'

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

async function electronAppInit() {
  const isDev = !app.isPackaged
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
      app.exit()
  })

  if (isDev) {
    if (process.platform === 'win32') {
      process.on('message', (data) => {
        if (data === 'graceful-exit')
          app.exit()
      })
    }
    else {
      process.on('SIGTERM', () => {
        app.exit()
      })
    }
  }
}

async function bootstrap() {
  try {
    await electronAppInit()
    app.whenReady().then(() => {
      createWindow()
      initEvent()
    })
  }
  catch (error) {
    console.error(error)
    app.quit()
  }
}

bootstrap()
