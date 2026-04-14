import { useState, useEffect } from 'react'
import { Folder, FileText, Code2, Plus, Save, Trash2, Database, CloudUpload, Loader2 } from 'lucide-react'

function App(): React.JSX.Element {
  const [structure, setStructure] = useState<any[]>([])
  const [selectedLocation, setSelectedLocation] = useState<{ phase: string; week: string; day: string } | null>(null)
  
  const [noteContent, setNoteContent] = useState('')
  const [labFiles, setLabFiles] = useState<{ name: string; content: string }[]>([])
  const [activeLabFile, setActiveLabFile] = useState<string | null>(null)

  const [savingNote, setSavingNote] = useState(false)
  const [savingLab, setSavingLab] = useState(false)
  const [gitPushing, setGitPushing] = useState(false)

  // Dialog States
  const [modalType, setModalType] = useState<null | 'NEW_WEEK' | 'NEW_DAY' | 'NEW_FILE' | 'DELETE_CONFIRM'>(null)
  const [modalData, setModalData] = useState<any>({})
  const [modalInput1, setModalInput1] = useState('')
  const [modalInput2, setModalInput2] = useState('')

  // Load structure on mount
  const loadStructure = async () => {
    try {
      const data = await window.api.getStructure()
      setStructure(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadStructure()
  }, [])

  // Load content when location changes
  useEffect(() => {
    if (!selectedLocation) return
    const { phase, week, day } = selectedLocation
    
    window.api.getDayContent(phase, week, day).then(res => {
      setNoteContent(res.note || '')
      setLabFiles(res.labFiles || [])
      setActiveLabFile(res.labFiles?.[0]?.name || null)
    })
  }, [selectedLocation])

  const handleSaveNote = async () => {
    if (!selectedLocation) return
    setSavingNote(true)
    const { phase, week, day } = selectedLocation
    await window.api.saveNote(phase, week, day, noteContent)
    setSavingNote(false)
  }

  const handleSaveLab = async () => {
    if (!selectedLocation || !activeLabFile) return
    setSavingLab(true)
    const { phase, week, day } = selectedLocation
    const currentLab = labFiles.find(f => f.name === activeLabFile)
    if (currentLab) {
      await window.api.saveLabFile(phase, week, day, activeLabFile, currentLab.content)
    }
    setSavingLab(false)
  }

  const addNewLabFile = () => {
    setModalType('NEW_FILE')
    setModalInput1('')
    setModalInput2('1')
  }

  const deleteLabFile = (name: string) => {
    setModalType('DELETE_CONFIRM')
    setModalData({ name })
  }

  const confirmDeleteFile = async () => {
    if (!selectedLocation || !modalData.name) return
    const { phase, week, day } = selectedLocation
    await window.api.deleteLabFile(phase, week, day, modalData.name)
    setLabFiles(prev => prev.filter(f => f.name !== modalData.name))
    if (activeLabFile === modalData.name) {
      setActiveLabFile(null)
    }
    closeModal()
  }

  const createNewFile = () => {
    const folderName = modalInput2.trim() || '1'
    const pureFileName = modalInput1.trim()
    if (!pureFileName) return
    const fullPath = `${folderName}/${pureFileName}`
    
    if (labFiles.some(f => f.name === fullPath)) return alert('Bu dosya var!')
    setLabFiles(prev => [...prev, { name: fullPath, content: '' }])
    setActiveLabFile(fullPath)
    closeModal()
  }

  const handleGitPush = async () => {
    setGitPushing(true)
    const result = await window.api.gitPush()
    setGitPushing(false)
    if (result.success) {
      alert("Değişiklikler başarıyla Github'a gönderildi!")
    } else {
      alert("Hata oluştu:\n" + result.error)
    }
  }

  const handleCreateWeek = async () => {
    if (!modalInput1.trim() || !modalInput2.trim()) return
    const formattedWeekName = `week-${modalInput1.trim().padStart(2, '0')}-${modalInput2.trim().replace(/\s+/g, '-').toLowerCase()}`
    await window.api.createWeek(modalData.phase, formattedWeekName)
    loadStructure()
    closeModal()
  }

  const handleCreateDay = async () => {
    if (!modalInput1.trim()) return
    const formattedDay = `day-${modalInput1.trim()}`
    await window.api.createDay(modalData.phase, modalData.week, formattedDay)
    loadStructure()
    closeModal()
  }

  const closeModal = () => {
    setModalType(null)
    setModalData({})
    setModalInput1('')
    setModalInput2('')
  }

  return (
    <div className="flex h-screen w-full bg-white text-gray-800 overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <div className="w-72 border-r bg-gray-50 flex flex-col h-full overflow-y-auto">
        <div className="p-4 border-b bg-red-600 text-white flex items-center gap-2 sticky top-0 shrink-0">
          <Database />
          <h1 className="font-bold text-lg">52W Editor</h1>
        </div>
        <div className="p-4 space-y-4">
          {structure.length === 0 && <p className="text-gray-500 text-sm">Klasörler taranıyor...</p>}
          {structure.map(phase => (
            <div key={phase.name} className="space-y-2">
              <div className="flex items-center justify-between group">
                <h2 className="font-bold text-gray-700 text-sm flex items-center gap-1">
                  <Folder size={14} /> {phase.name}
                </h2>
                <button 
                  onClick={() => { setModalType('NEW_WEEK'); setModalData({ phase: phase.name }) }}
                  className="opacity-0 group-hover:opacity-100 text-xs text-blue-600 hover:text-blue-800 transition"
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="pl-4 space-y-2">
                {phase.weeks.map(week => (
                  <div key={week.name} className="space-y-1">
                    <div className="flex items-center justify-between group">
                      <h3 className="font-medium text-xs text-gray-500 uppercase tracking-wider">{week.name}</h3>
                      <button 
                        onClick={() => { setModalType('NEW_DAY'); setModalData({ phase: phase.name, week: week.name }) }}
                        className="opacity-0 group-hover:opacity-100 text-xs text-green-600 hover:text-green-800 transition"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="pl-2 flex flex-col gap-1">
                      {week.days.map(day => {
                        const isSelected = selectedLocation?.phase === phase.name && 
                                           selectedLocation?.week === week.name && 
                                           selectedLocation?.day === day;
                        return (
                          <button
                            key={day}
                            onClick={() => setSelectedLocation({ phase: phase.name, week: week.name, day })}
                            className={`text-left px-2 py-1 text-sm rounded ${isSelected ? 'bg-red-100 text-red-700 font-medium' : 'text-gray-600 hover:bg-gray-200'}`}
                          >
                            {day}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* GIT PUSH BUTTON */}
        <div className="p-4 mt-auto border-t shrink-0">
          <button 
            onClick={handleGitPush}
            disabled={gitPushing}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-lg text-sm font-medium transition disabled:bg-gray-400"
          >
            {gitPushing ? <Loader2 size={16} className="animate-spin" /> : <CloudUpload size={16} />}
            {gitPushing ? 'Pushlanıyor...' : "Github'a Gönder"}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 flex-col h-full bg-white overflow-hidden">
        {!selectedLocation ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <Database size={48} className="mb-4 text-gray-300" />
            <p>Düzenlemek için sol taraftan bir gün seçin.</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* NOTE EDITOR - Top Half */}
            <div className="flex-1 flex flex-col border-b min-h-0">
              <div className="flex items-center justify-between p-3 border-b bg-gray-50 shrink-0">
                <div className="flex items-center gap-2 font-medium text-sm text-gray-700">
                  <FileText size={16} className="text-blue-500" />
                  Notes: <span className="text-gray-500">note-tr.mdx</span>
                </div>
                <button 
                  onClick={handleSaveNote}
                  disabled={savingNote}
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition"
                >
                  <Save size={14} /> {savingNote ? 'Kaydediliyor...' : 'Notu Kaydet'}
                </button>
              </div>
              <textarea
                className="flex-1 w-full bg-white p-4 resize-none outline-none font-mono text-sm text-gray-800"
                value={noteContent}
                onChange={e => setNoteContent(e.target.value)}
                placeholder="Markdown formatında notlarınızı buraya yazın..."
              ></textarea>
            </div>

            {/* LAB EDITOR - Bottom Half */}
            <div className="flex-1 flex flex-col bg-gray-900 text-red-50 min-h-0">
              <div className="flex items-center justify-between bg-gray-950 p-2 overflow-x-auto shrink-0 border-b border-gray-800">
                <div className="flex items-center gap-1">
                  {Array.from(new Set(labFiles.map(f => f.name.split('/')[0]))).sort((a,b) => parseInt(a) - parseInt(b)).map(group => (
                    <div key={group} className="flex items-center border-r border-gray-700 pr-2 mr-1">
                      <span className="text-gray-500 font-bold px-2 text-xs">Lab {group}:</span>
                      {labFiles.filter(f => f.name.startsWith(`${group}/`)).map(file => {
                        const pureFileName = file.name.substring(group.length + 1)
                        return (
                          <button
                            key={file.name}
                            onClick={() => setActiveLabFile(file.name)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-t-md transition ${activeLabFile === file.name ? 'bg-gray-800 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                          >
                            <Code2 size={14} />
                            {pureFileName}
                          </button>
                        )
                      })}
                    </div>
                  ))}
                  <button 
                    onClick={addNewLabFile}
                    className="flex items-center gap-1 ml-2 text-gray-400 hover:text-white px-2 py-1 text-xs transition"
                  >
                    <Plus size={14} /> Yeni Dosya
                  </button>
                </div>

                {activeLabFile && (
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => deleteLabFile(activeLabFile)}
                      className="text-gray-500 hover:text-red-400 p-1 rounded"
                      title="Dosyayı Sil"
                    >
                      <Trash2 size={14} />
                    </button>
                    <button 
                      onClick={handleSaveLab}
                      disabled={savingLab}
                      className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs font-medium transition"
                    >
                      <Save size={14} /> {savingLab ? 'Kaydediliyor...' : 'Kodu Kaydet'}
                    </button>
                  </div>
                )}
              </div>
              
              {activeLabFile ? (
                <textarea
                  className="flex-1 w-full p-4 resize-none outline-none font-mono text-sm bg-gray-900 text-blue-100"
                  value={labFiles.find(f => f.name === activeLabFile)?.content || ''}
                  onChange={e => {
                    const newVal = e.target.value
                    setLabFiles(prev => prev.map(f => f.name === activeLabFile ? { ...f, content: newVal } : f))
                  }}
                  placeholder="Kodları buraya yapıştırın..."
                  spellCheck={false}
                ></textarea>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-600 text-sm">
                  {labFiles.length === 0 ? 'Bu gün için lab dosyası yok. Yeni ekleyebilirsiniz.' : 'Düzenlemek için üstten bir dosya seçin.'}
                </div>
              )}
            </div>
            
          </div>
        )}
      </div>

      {/* MODALS */}
      {modalType && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 flex flex-col gap-4">
            
            {modalType === 'NEW_WEEK' && (
              <>
                <h3 className="font-bold text-lg border-b pb-2">Yeni Hafta Ekle</h3>
                <label className="text-sm">Hafta Numarası (ör: 04)</label>
                <input 
                  type="text" 
                  className="border p-2 rounded" 
                  value={modalInput1} 
                  onChange={e => setModalInput1(e.target.value)} 
                  autoFocus 
                  placeholder="04"
                />
                <label className="text-sm">Hafta Konusu (ör: js advanced)</label>
                <input 
                  type="text" 
                  className="border p-2 rounded" 
                  value={modalInput2} 
                  onChange={e => setModalInput2(e.target.value)} 
                  placeholder="js advanced"
                  onKeyDown={e => e.key === 'Enter' && handleCreateWeek()}
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded">İptal</button>
                  <button onClick={handleCreateWeek} className="px-4 py-2 bg-blue-600 text-white rounded">Oluştur</button>
                </div>
              </>
            )}

            {modalType === 'NEW_DAY' && (
              <>
                <h3 className="font-bold text-lg border-b pb-2">Yeni Gün Ekle</h3>
                <label className="text-sm">Gün Numarası (Sadece sayı, ör: 5)</label>
                <input 
                  type="text" 
                  className="border p-2 rounded" 
                  value={modalInput1} 
                  onChange={e => setModalInput1(e.target.value)} 
                  autoFocus 
                  placeholder="5"
                  onKeyDown={e => e.key === 'Enter' && handleCreateDay()}
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded">İptal</button>
                  <button onClick={handleCreateDay} className="px-4 py-2 bg-green-600 text-white rounded">Oluştur</button>
                </div>
              </>
            )}

            {modalType === 'NEW_FILE' && (
              <>
                <h3 className="font-bold text-lg border-b pb-2">Yeni Kod Dosyası</h3>
                
                <label className="text-sm">Hedef Klasör Numarası (Lab X)</label>
                <input 
                  type="text" 
                  className="border p-2 rounded" 
                  value={modalInput2} 
                  onChange={e => setModalInput2(e.target.value)} 
                  placeholder="1, 2, 3..."
                />

                <label className="text-sm">Dosya Adı</label>
                <input 
                  type="text" 
                  className="border p-2 rounded" 
                  value={modalInput1} 
                  onChange={e => setModalInput1(e.target.value)} 
                  autoFocus 
                  placeholder="app.js, utils.js..."
                  onKeyDown={e => e.key === 'Enter' && createNewFile()}
                />
                
                <div className="flex justify-end gap-2 mt-2">
                  <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded">İptal</button>
                  <button onClick={createNewFile} className="px-4 py-2 bg-blue-600 text-white rounded">Ekle</button>
                </div>
              </>
            )}

            {modalType === 'DELETE_CONFIRM' && (
              <>
                <h3 className="font-bold text-lg border-b pb-2 text-red-600">Silmeyi Onayla</h3>
                <p>Bu dosyayı silmek istediğinize emin misiniz?</p>
                <p className="font-mono bg-gray-100 p-2 text-sm">{modalData.name}</p>
                <div className="flex justify-end gap-2 mt-2">
                  <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded">İptal</button>
                  <button onClick={confirmDeleteFile} className="px-4 py-2 bg-red-600 text-white rounded">Sil</button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  )
}

export default App
