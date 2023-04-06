// Preload (Isolated World)
import { contextBridge, ipcRenderer } from 'electron'

export const API = {
  selectFolder: () =>
    ipcRenderer.invoke('open-dialog-file').then((result) => {
      if (result) {
        const spanPath = document.getElementById('path')
        const inputButton = document.getElementById('input-button')
        spanPath.innerText = result[0] ? result[0] : 'Nenhuma pasta escolhida'
        inputButton.hidden = true
      }
    }),
  execute: (path: string) => {
    ipcRenderer.invoke('execute', path).then((result) => {
      if (!result) {
        ipcRenderer.send('error', path)
      }
    })
  },
}

contextBridge.exposeInMainWorld('api', API)
