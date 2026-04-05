import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProgressBar from '../components/ProgressBar'
import { useAuth } from '../context/AuthContext'

const PROFILE_LABELS = {
  student: '🎓 Student', professional: '💼 Professional',
  freelancer: '🚀 Freelancer', hobbyist: '🎨 Hobbyist',
}

const MODULES = [
  { to: '/module/frontend', color: 'orange', icon: '🌐', title: 'Frontend Dev',    sub: 'HTML · CSS · JavaScript',    track: 'frontend', sections: 'frontendSections' },
  { to: '/module/backend',  color: 'yellow', icon: '⚙️',  title: 'Backend Dev',     sub: 'Node.js · APIs · Databases', track: 'backend',  sections: 'backendSections' },
  { to: '/module/react',    color: 'purple', icon: '⚛️',  title: 'React.js',         sub: 'Components · Hooks · State', track: 'react',    sections: 'reactSections' },
  { to: '/module/git',      color: 'green',  icon: '🌿',  title: 'Git & GitHub',     sub: 'Version control · CI/CD',    track: 'git',      sections: 'gitSections' },
  { to: '/module/python',   color: 'blue',   icon: '🐍',  title: 'Python Basics',    sub: 'Syntax · OOP · Libraries',   track: 'python',   sections: 'pythonSections' },
]

const COLOR_MAP = {
  orange: { bg: 'var(--orange-bg)', border: 'var(--orange)', title: '#f5c4b3', sub: 'var(--orange)', progress: 'var(--orange)' },
  yellow: { bg: 'var(--yellow-bg)', border: 'var(--yellow)', title: '#fac775', sub: 'var(--yellow)', progress: 'var(--yellow)' },
  purple: { bg: 'var(--purple-bg)', border: 'var(--purple)', title: '#cec0f6', sub: 'var(--purple)', progress: 'var(--purple)' },
  green:  { bg: '#085041',          border: 'var(--accent)', title: '#9fe1cb', sub: 'var(--accent)', progress: 'var(--accent)' },
  blue:   { bg: '#0a1f3a',          border: '#4a9eff',       title: '#a8d4ff', sub: '#4a9eff',       progress: '#4a9eff' },
}

export default function DashboardPage() {
  const { user, progress, getEditorStatus } = useAuth()
  const editorStatus = getEditorStatus()

  const totalSections = Object.keys(progress).filter(k => k.endsWith('Sections'))
    .reduce((sum, k) => sum + progress[k].length, 0)
  const doneSections = Object.keys(progress).filter(k => k.endsWith('Sections'))
    .reduce((sum, k) => sum + progress[k].filter(Boolean).length, 0)
  const totalPct = totalSections ? Math.round(doneSections / totalSections * 100) : 0

  return (
    <>
      <Navbar />
      <div className="page-wrap">
        <div className="dashboard-header">
          <h1>Welcome back, {user.username} 👋</h1>
          <p>{PROFILE_LABELS[user.profileType]} &nbsp;·&nbsp; {user.email}</p>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-chip"><strong>{totalPct}%</strong>Overall progress</div>
          <div className="stat-chip"><strong>{doneSections}/{totalSections}</strong>Sections done</div>
          <div className="stat-chip"><strong>{MODULES.length}</strong>Learning tracks</div>
          <div className="stat-chip">
            <strong style={{ color: editorStatus === 'pro' ? 'var(--accent)' : editorStatus === 'trial' ? '#cec0f6' : 'var(--muted)' }}>
              {editorStatus === 'pro' ? 'PRO ✅' : editorStatus === 'trial' ? 'TRIAL ⏱' : editorStatus === 'expired' ? 'LOCKED 🔒' : 'FREE 🎁'}
            </strong>
            Editor status
          </div>
        </div>

        {/* Overall bar */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '.6rem' }}>Overall Progress</div>
          <ProgressBar value={totalPct} color="var(--accent)" />
        </div>

        {/* Learning modules */}
        <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>📚 Learning Tracks</h2>
        <div className="module-grid" style={{ marginBottom: '2rem' }}>
          {MODULES.map(m => {
            const c = COLOR_MAP[m.color]
            const pct = progress[m.track] || 0
            return (
              <Link key={m.to} to={m.to} className="module-card"
                style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                <div className="mc-icon">{m.icon}</div>
                <div className="mc-title" style={{ color: c.title }}>{m.title}</div>
                <div className="mc-sub"  style={{ color: c.sub }}>{m.sub}</div>
                <ProgressBar value={pct} color={c.progress} />
              </Link>
            )
          })}
        </div>

        {/* Tools row */}
        <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>🛠 Tools & Community</h2>
        <div className="module-grid">
          {/* Editor card */}
          <Link to="/editor" className="module-card" style={{ background: '#085041', border: '1px solid var(--accent)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="mc-icon">✏️</div>
              {editorStatus === 'pro'     && <span style={{ background: 'var(--accent)', color: '#fff', fontSize: '.7rem', fontWeight: 700, padding: '.2rem .5rem', borderRadius: '99px' }}>PRO</span>}
              {editorStatus === 'trial'   && <span style={{ background: 'var(--purple-bg)', color: '#cec0f6', fontSize: '.7rem', fontWeight: 700, padding: '.2rem .5rem', borderRadius: '99px', border: '1px solid var(--purple)' }}>TRIAL</span>}
              {(editorStatus === 'expired' || editorStatus === 'none') && <span style={{ background: 'var(--bg3)', color: 'var(--muted)', fontSize: '.7rem', fontWeight: 700, padding: '.2rem .5rem', borderRadius: '99px', border: '1px solid var(--border)' }}>₹49/mo</span>}
            </div>
            <div className="mc-title" style={{ color: '#9fe1cb' }}>Live Code Editor</div>
            <div className="mc-sub" style={{ color: 'var(--accent)' }}>HTML · CSS · JS · Save Projects</div>
            <div style={{ marginTop: '.6rem', fontSize: '.78rem', color: 'var(--accent)', opacity: .8 }}>
              {editorStatus === 'pro' ? '✅ Full access' : editorStatus === 'trial' ? '⏱ Trial active' : editorStatus === 'expired' ? '🔒 Upgrade for ₹49/mo' : '🎁 Start free 24hr trial'}
            </div>
          </Link>

          {/* Community card */}
          <Link to="/community" className="module-card" style={{ background: '#1a1030', border: '1px solid var(--purple)' }}>
            <div className="mc-icon">💬</div>
            <div className="mc-title" style={{ color: '#cec0f6' }}>Community</div>
            <div className="mc-sub" style={{ color: 'var(--purple)' }}>Ask questions · Help others</div>
            <div style={{ marginTop: '.6rem', fontSize: '.78rem', color: 'var(--purple)', opacity: .8 }}>
              Discuss, share and grow together
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}
