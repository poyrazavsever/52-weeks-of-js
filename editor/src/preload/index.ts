import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

import { ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  getStructure: () => ipcRenderer.invoke('get-structure'),
  getDayContent: (phase: string, week: string, day: string) => ipcRenderer.invoke('get-day-content', phase, week, day),
  saveNote: (phase: string, week: string, day: string, content: string) => ipcRenderer.invoke('save-note', phase, week, day, content),
  saveLabFile: (phase: string, week: string, day: string, filename: string, content: string) => ipcRenderer.invoke('save-lab-file', phase, week, day, filename, content),
  deleteLabFile: (phase: string, week: string, day: string, filename: string) => ipcRenderer.invoke('delete-lab-file', phase, week, day, filename),
  createWeek: (phase: string, weekName: string) => ipcRenderer.invoke('create-week', phase, weekName),
  createDay: (phase: string, week: string, day: string) => ipcRenderer.invoke('create-day', phase, week, day),
  gitPush: () => ipcRenderer.invoke('git-push'),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
