import { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Paywall, { TrialBanner } from '../components/Paywall'
import { useAuth } from '../context/AuthContext'

const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My Project</title>
</head>
<body>
  <div class="card">
    <h1>Hello, DevLearn! 🚀</h1>
    <p>Edit HTML, CSS, and JS — see live changes instantly.</p>
    <button onclick="handleClick()">Click me!</button>
    <p id="output"></p>
  </div>
</body>
</html>`

const DEFAULT_CSS = `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: -apple-system, sans-serif;
  background: #0f172a;
  color: #e2e8f0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 2rem 2.5rem;
  max-width: 480px;
  width: 100%;
  text-align: center;
}
h1 { font-size: 1.8rem; margin-bottom: 0.75rem; color: #38bdf8; }
p  { color: #94a3b8; line-height: 1.6; margin-bottom: 1.2rem; }
button {
  background: #0ea5e9; color: white; border: none;
  padding: 0.6rem 1.4rem; border-radius: 6px;
  font-size: 0.95rem; font-weight: 600; cursor: pointer;
  transition: background 0.15s;
}
button:hover { background: #0284c7; }
#output { margin-top: 1rem; color: #4ade80; font-weight: 600; min-height: 1.6rem; }`

const DEFAULT_JS = `let count = 0;

function handleClick() {
  count++;
  const output = document.getElementById('output');
  output.textContent = \`Clicked \${count} time\${count === 1 ? '' : 's'}!\`;
  console.log('Button clicked! Count:', count);
}

console.log('DevLearn Editor ready! 🎉');`

const TABS = ['HTML', 'CSS', 'JS']

function buildSrcDoc(html, css, js) {
  const styleTag  = `<style>\n${css}\n</style>`
  const scriptTag = `<script>\n// Override console.log to send to parent\n(function() {\n  const _log = console.log, _err = console.error, _warn = console.warn;\n  function send(type, args) {\n    window.parent.postMessage({ type: 'console', level: type, msg: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');\n  }\n  console.log   = (...a) => { _log(...a);  send('log',  a); };\n  console.error = (...a) => { _err(...a);  send('error',a); };\n  console.warn  = (...a) => { _warn(...a); send('warn', a); };\n  window.onerror = (msg) => { send('error', [msg]); };\n})();\n${js}\n<\/script>`
  let doc = html
  if (/<\/head>/i.test(doc)) doc = doc.replace(/<\/head>/i, `${styleTag}\n</head>`)
  else doc = styleTag + '\n' + doc
  if (/<\/body>/i.test(doc)) doc = doc.replace(/<\/body>/i, `${scriptTag}\n</body>`)
  else doc = doc + '\n' + scriptTag
  return doc
}

function lineNumbers(code) {
  return Array.from({ length: (code.match(/\n/g) || []).length + 1 }, (_, i) => i + 1)
}

export default function EditorPage() {
  const { getEditorStatus, startTrial, savedProjects, saveProject, deleteProject } = useAuth()

  const [status, setStatus] = useState(() => getEditorStatus())
  useEffect(() => {
    if (status === 'none') { startTrial(); setStatus('trial') }
  }, [])
  useEffect(() => {
    const t = setInterval(() => setStatus(getEditorStatus()), 1000)
    return () => clearInterval(t)
  }, [getEditorStatus])

  // Editor state
  const [activeTab, setActiveTab]       = useState('HTML')
  const [html, setHtml]                 = useState(DEFAULT_HTML)
  const [css, setCss]                   = useState(DEFAULT_CSS)
  const [js, setJs]                     = useState(DEFAULT_JS)
  const [srcDoc, setSrcDoc]             = useState('')
  const [fontSize, setFontSize]         = useState(14)
  const [showProjects, setShowProjects] = useState(false)
  const [showConsole, setShowConsole]   = useState(false)
  const [consoleLogs, setConsoleLogs]   = useState([])
  const [projectName, setProjectName]   = useState('Untitled Project')
  const [currentProjectId, setCurrentProjectId] = useState(null)
  const [saveMsg, setSaveMsg]           = useState('')
  const textareaRef = useRef(null)
  const linesRef    = useRef(null)

  // Listen for console messages from iframe
  useEffect(() => {
    function handler(e) {
      if (e.data?.type === 'console') {
        setConsoleLogs(prev => [...prev.slice(-99), { level: e.data.level, msg: e.data.msg, id: Date.now() }])
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  // Debounced preview
  useEffect(() => {
    const t = setTimeout(() => setSrcDoc(buildSrcDoc(html, css, js)), 200)
    return () => clearTimeout(t)
  }, [html, css, js])

  function syncScroll() {
    if (linesRef.current && textareaRef.current)
      linesRef.current.scrollTop = textareaRef.current.scrollTop
  }

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const ta = e.target, start = ta.selectionStart, end = ta.selectionEnd
      const newVal = ta.value.slice(0, start) + '  ' + ta.value.slice(end)
      if (activeTab === 'HTML') setHtml(newVal)
      else if (activeTab === 'CSS') setCss(newVal)
      else setJs(newVal)
      requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + 2 })
    }
  }, [activeTab])

  const currentCode = activeTab === 'HTML' ? html : activeTab === 'CSS' ? css : js
  const setCurrentCode = (v) => { if (activeTab==='HTML') setHtml(v); else if (activeTab==='CSS') setCss(v); else setJs(v) }

  function handleSave() {
    const project = { id: currentProjectId || Date.now(), name: projectName, html, css, js, updatedAt: Date.now() }
    if (!currentProjectId) setCurrentProjectId(project.id)
    saveProject(project)
    setSaveMsg('Saved ✓'); setTimeout(() => setSaveMsg(''), 2000)
  }

  function handleLoad(p) {
    setHtml(p.html); setCss(p.css); setJs(p.js)
    setProjectName(p.name); setCurrentProjectId(p.id)
    setShowProjects(false)
  }

  function handleNew() {
    setHtml(DEFAULT_HTML); setCss(DEFAULT_CSS); setJs(DEFAULT_JS)
    setProjectName('Untitled Project'); setCurrentProjectId(null)
    setShowProjects(false)
  }

  function handleDownload() {
    const content = buildSrcDoc(html, css, js)
    const blob = new Blob([content], { type: 'text/html' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = (projectName || 'project') + '.html'
    a.click()
  }

  const lines = lineNumbers(currentCode)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      {(status === 'expired') && <Paywall />}
      {status === 'trial' && <TrialBanner />}

      {/* Toolbar */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 .8rem', height:'44px', background:'var(--bg2)', borderBottom:'1px solid var(--border)', flexShrink:0, gap:'.5rem', flexWrap:'wrap' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'.6rem' }}>
          <Link to="/dashboard" style={{ color:'var(--muted)', fontSize:'.8rem', textDecoration:'none' }}>← Dashboard</Link>
          <span style={{ color:'var(--border)' }}>|</span>
          <input value={projectName} onChange={e => setProjectName(e.target.value)}
            style={{ background:'none', border:'none', color:'var(--text)', fontSize:'.85rem', fontWeight:600, outline:'none', width:160 }} />
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:'.5rem' }}>
          {saveMsg && <span style={{ color:'var(--accent)', fontSize:'.78rem' }}>{saveMsg}</span>}

          {/* Font size */}
          <div style={{ display:'flex', alignItems:'center', gap:'.3rem', fontSize:'.78rem', color:'var(--muted)' }}>
            <button onClick={() => setFontSize(f => Math.max(10,f-1))} style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', padding:'0 .2rem' }}>A-</button>
            <span>{fontSize}px</span>
            <button onClick={() => setFontSize(f => Math.min(22,f+1))} style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', padding:'0 .2rem' }}>A+</button>
          </div>

          <button className="btn btn-secondary" style={{ padding:'.28rem .7rem', fontSize:'.78rem' }} onClick={() => setShowConsole(c => !c)}>
            {showConsole ? '⌨ Hide Console' : '⌨ Console'}
            {consoleLogs.filter(l=>l.level==='error').length > 0 && <span style={{ background:'#f08080', color:'#fff', borderRadius:'99px', padding:'0 .4rem', marginLeft:'.3rem', fontSize:'.7rem' }}>{consoleLogs.filter(l=>l.level==='error').length}</span>}
          </button>
          <button className="btn btn-secondary" style={{ padding:'.28rem .7rem', fontSize:'.78rem' }} onClick={() => setShowProjects(p => !p)}>📁 Projects</button>
          <button className="btn btn-secondary" style={{ padding:'.28rem .7rem', fontSize:'.78rem' }} onClick={handleDownload}>⬇ Download</button>
          <button className="btn btn-primary"   style={{ padding:'.28rem .7rem', fontSize:'.78rem' }} onClick={handleSave}>💾 Save</button>
        </div>
      </div>

      {/* Main split */}
      <div style={{ display:'flex', flex:1, minHeight:0, position:'relative' }}>

        {/* Projects drawer */}
        {showProjects && (
          <div className="projects-drawer">
            <div style={{ padding:'.8rem 1rem', borderBottom:'1px solid var(--border)', fontWeight:600, fontSize:'.88rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              📁 Projects
              <button onClick={() => setShowProjects(false)} style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer' }}>✕</button>
            </div>
            <button className="btn btn-primary" style={{ margin:'.75rem', padding:'.45rem', fontSize:'.82rem' }} onClick={handleNew}>+ New Project</button>
            <div style={{ flex:1, overflowY:'auto' }}>
              {savedProjects.length === 0 && <p style={{ padding:'1rem', color:'var(--muted)', fontSize:'.82rem' }}>No saved projects yet.</p>}
              {savedProjects.map(p => (
                <div key={p.id} className={`project-item ${p.id === currentProjectId ? 'active' : ''}`}>
                  <span onClick={() => handleLoad(p)} style={{ flex:1 }}>{p.name}</span>
                  <button onClick={() => { deleteProject(p.id); if(p.id === currentProjectId) handleNew() }}
                    style={{ background:'none', border:'none', color:'#f08080', cursor:'pointer', fontSize:'.75rem', padding:'.1rem' }}>✕</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Left: Code */}
        <div style={{ display:'flex', flexDirection:'column', flex:1, borderRight:'1px solid var(--border)', minWidth:0, marginLeft: showProjects ? 260 : 0, transition:'margin .2s' }}>
          {/* Tabs */}
          <div className="editor-tabs">
            {TABS.map(tab => (
              <div key={tab} className={`editor-tab ${activeTab===tab?'active':''}`} onClick={() => setActiveTab(tab)}>
                {tab==='HTML'?'🌐 ':tab==='CSS'?'🎨 ':'⚡ '}{tab}
              </div>
            ))}
          </div>

          {/* Code area */}
          <div className="editor-code-wrap" style={{ flex:1 }}>
            <div className="editor-lines" ref={linesRef} style={{ fontSize: fontSize - 2 }}>
              {lines.map(n => <span key={n} style={{ display:'block', lineHeight:`${fontSize*1.5}px` }}>{n}</span>)}
            </div>
            <textarea
              ref={textareaRef}
              className="editor-textarea"
              style={{ fontSize, lineHeight:`${fontSize*1.5}px` }}
              value={currentCode}
              onChange={e => setCurrentCode(e.target.value)}
              onKeyDown={handleKeyDown}
              onScroll={syncScroll}
              spellCheck={false} autoCapitalize="off" autoCorrect="off" autoComplete="off"
            />
          </div>

          {/* Console */}
          {showConsole && (
            <div className="console-panel">
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'.3rem', color:'var(--muted)', fontSize:'.72rem' }}>
                <span>Console</span>
                <button onClick={() => setConsoleLogs([])} style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', fontSize:'.72rem' }}>Clear</button>
              </div>
              {consoleLogs.length === 0 && <div style={{ color:'var(--muted)', fontSize:'.78rem' }}>No output yet. Try console.log() in JS!</div>}
              {consoleLogs.map(l => (
                <div key={l.id} className={`console-line ${l.level}`}>
                  <span style={{ opacity:.5, marginRight:'.5rem' }}>{l.level === 'error' ? '✕' : l.level === 'warn' ? '⚠' : '›'}</span>
                  {l.msg}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Preview */}
        <div style={{ display:'flex', flexDirection:'column', flex:1, minWidth:0 }}>
          <div className="preview-header">
            <span><span className="preview-dot" />Live Preview</span>
            <span style={{ fontSize:'.72rem' }}>Updates every keystroke</span>
          </div>
          <iframe className="preview-iframe" title="preview" sandbox="allow-scripts" srcDoc={srcDoc} />
        </div>
      </div>
    </div>
  )
}
