import { ElectronAPI } from '@electron-toolkit/preload'

export interface CustomAPI {
  getStructure: () => Promise<Array<{ name: string; weeks: Array<{ name: string; days: string[] }> }>>
  getDayContent: (phase: string, week: string, day: string) => Promise<{ note: string; labFiles: { name: string; content: string }[] }>
  saveNote: (phase: string, week: string, day: string, content: string) => Promise<boolean>
  saveLabFile: (phase: string, week: string, day: string, filename: string, content: string) => Promise<boolean>
  deleteLabFile: (phase: string, week: string, day: string, filename: string) => Promise<boolean>
  createWeek: (phase: string, weekName: string) => Promise<boolean>
  createDay: (phase: string, week: string, day: string) => Promise<boolean>
  gitPush: () => Promise<{ success: boolean; error?: string }>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPI
  }
}

