import { ipcMain, app } from 'electron'
import { join } from 'path'
import * as fs from 'fs'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

const getRepoRoot = () => {
  // Assuming the electron app is in /editor directory, the repo root is one level up.
  // app.getAppPath() points to /editor in dev, and /editor/resources/app.asar in prod.
  // However, we want to read the source code outside.
  return join(app.getAppPath(), '..')
}

export function setupIpcHandlers() {
  ipcMain.handle('get-structure', async () => {
    const rootDir = getRepoRoot()
    const phases: Array<{ name: string; weeks: Array<{ name: string; days: string[] }> }> = []

    try {
      if (!fs.existsSync(rootDir)) return []

      const rootItems = fs.readdirSync(rootDir)
      const phaseDirs = rootItems.filter((i) => i.match(/^\d{2}-/) && fs.statSync(join(rootDir, i)).isDirectory())

      for (const p of phaseDirs) {
        const phasePath = join(rootDir, p)
        const weeks: Array<{ name: string; days: string[] }> = []
        const weekItems = fs.readdirSync(phasePath).filter((i) => i.startsWith('week-') && fs.statSync(join(phasePath, i)).isDirectory())

        for (const w of weekItems) {
          const weekPath = join(phasePath, w)
          const days = new Set<string>()

          const notesPath = join(weekPath, 'notes')
          if (fs.existsSync(notesPath)) {
            fs.readdirSync(notesPath).forEach((d) => d.startsWith('day-') && days.add(d))
          }

          const labPath = join(weekPath, 'lab')
          if (fs.existsSync(labPath)) {
            fs.readdirSync(labPath).forEach((d) => d.startsWith('day-') && days.add(d))
          }

          weeks.push({
            name: w,
            days: Array.from(days).sort((a, b) => parseInt(a.replace('day-', '')) - parseInt(b.replace('day-', ''))),
          })
        }
        phases.push({ name: p, weeks })
      }
    } catch (error) {
      console.error('Error reading structure:', error)
    }

    return phases
  })

  ipcMain.handle('get-day-content', async (_, phase: string, week: string, day: string) => {
    const rootDir = getRepoRoot()
    const result = {
      note: '',
      labFiles: [] as { name: string; content: string }[]
    }

    try {
      const dayNotesPath = join(rootDir, phase, week, 'notes', day)
      if (fs.existsSync(dayNotesPath)) {
        const files = fs.readdirSync(dayNotesPath)
        const noteFile = files.find(f => f.endsWith('.mdx') || f.endsWith('.md'))
        if (noteFile) {
          result.note = fs.readFileSync(join(dayNotesPath, noteFile), 'utf-8')
        }
      }

      const dayLabPath = join(rootDir, phase, week, 'lab', day)
      if (fs.existsSync(dayLabPath)) {
        // Read folders like '1', '2' or files directly
        const items = fs.readdirSync(dayLabPath)
        for (const item of items) {
          const itemPath = join(dayLabPath, item)
          if (fs.statSync(itemPath).isDirectory()) {
            const files = fs.readdirSync(itemPath)
            for (const f of files) {
              const fPath = join(itemPath, f)
              if (fs.statSync(fPath).isFile()) {
                result.labFiles.push({
                  name: `${item}/${f}`,
                  content: fs.readFileSync(fPath, 'utf-8')
                })
              }
            }
          } else {
            result.labFiles.push({
              name: item,
              content: fs.readFileSync(itemPath, 'utf-8')
            })
          }
        }
      }
    } catch (e) {
      console.error('Error reading day content:', e)
    }

    return result
  })

  ipcMain.handle('save-note', async (_, phase: string, week: string, day: string, content: string) => {
    const rootDir = getRepoRoot()
    try {
      const dayNotesPath = join(rootDir, phase, week, 'notes', day)
      if (!fs.existsSync(dayNotesPath)) {
        fs.mkdirSync(dayNotesPath, { recursive: true })
      }
      fs.writeFileSync(join(dayNotesPath, 'note-tr.mdx'), content, 'utf-8')
      return true
    } catch (e) {
      console.error('Error saving note:', e)
      return false
    }
  })

  ipcMain.handle('save-lab-file', async (_, phase: string, week: string, day: string, filename: string, content: string) => {
    const rootDir = getRepoRoot()
    try {
      const filePath = join(rootDir, phase, week, 'lab', day, filename)
      const dirPath = join(filePath, '..')
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
      }
      fs.writeFileSync(filePath, content, 'utf-8')
      return true
    } catch (e) {
      console.error('Error saving lab file:', e)
      return false
    }
  })

  ipcMain.handle('delete-lab-file', async (_, phase: string, week: string, day: string, filename: string) => {
    const rootDir = getRepoRoot()
    try {
      const filePath = join(rootDir, phase, week, 'lab', day, filename)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
      return true
    } catch (e) {
      console.error('Error deleting lab file:', e)
      return false
    }
  })

  ipcMain.handle('create-week', async (_, phase: string, weekName: string) => {
    const rootDir = getRepoRoot()
    try {
      const weekPath = join(rootDir, phase, weekName)
      if (!fs.existsSync(weekPath)) {
        fs.mkdirSync(weekPath, { recursive: true })
        // Create initial notes & lab folders so it's a valid week
        fs.mkdirSync(join(weekPath, 'notes', 'day-1'), { recursive: true })
        fs.mkdirSync(join(weekPath, 'lab', 'day-1'), { recursive: true })
      }
      return true
    } catch (e) {
      console.error('Error creating week:', e)
      return false
    }
  })

  ipcMain.handle('create-day', async (_, phase: string, week: string, day: string) => {
    const rootDir = getRepoRoot()
    try {
      const dayNotesPath = join(rootDir, phase, week, 'notes', day)
      const dayLabPath = join(rootDir, phase, week, 'lab', day)
      if (!fs.existsSync(dayNotesPath)) {
        fs.mkdirSync(dayNotesPath, { recursive: true })
      }
      if (!fs.existsSync(dayLabPath)) {
        fs.mkdirSync(dayLabPath, { recursive: true })
      }
      return true
    } catch (e) {
      console.error('Error creating day:', e)
      return false
    }
  })

  ipcMain.handle('git-push', async () => {
    const rootDir = getRepoRoot()
    try {
      // 1. Git add
      await execAsync('git add .', { cwd: rootDir })
      
      // 2. Git commit
      const now = new Date()
      // Use toLocaleString or standard manual formatting to avoid weird chars
      const timestamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      
      try {
        await execAsync(`git commit -m "[Auto] CMS Update: ${timestamp}"`, { cwd: rootDir })
      } catch (err: any) {
        // If there's nothing to commit, git commit throws an error. We can catch it and proceed or stop.
        if (err.stdout && err.stdout.includes('nothing to commit')) {
          console.log('Nothing to commit, but trying to push anyway.')
        } else {
          throw err
        }
      }

      // 3. Git push
      await execAsync('git push origin main', { cwd: rootDir })

      return { success: true }
    } catch (e: any) {
      console.error('Git push error:', e)
      return { success: false, error: e.message || 'Bilinmeyen hata' }
    }
  })
}
