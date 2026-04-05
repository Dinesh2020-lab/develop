import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PROFILES = [
  { id: 'student',      icon: '🎓', label: 'Student',      desc: 'Learning as part of education' },
  { id: 'professional', icon: '💼', label: 'Professional',  desc: 'Upskilling for career growth' },
  { id: 'freelancer',   icon: '🚀', label: 'Freelancer',    desc: 'Building skills to land clients' },
  { id: 'hobbyist',     icon: '🎨', label: 'Hobbyist',      desc: 'Coding for fun and creativity' },
]

export default function ProfileSetupPage() {
  const { user, completeProfile } = useAuth()
  const navigate = useNavigate()
  const [selected, setSelected] = useState('')

  if (!user) { navigate('/'); return null }

  function handleContinue() {
    if (!selected) return
    completeProfile(selected)
    navigate('/dashboard')
  }

  return (
    <div className="auth-wrap" style={{ background: 'radial-gradient(ellipse at top, #083528 0%, var(--bg) 55%)' }}>
      <div className="auth-box" style={{ maxWidth: 480 }}>
        <div className="auth-logo">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#1D9E75"/>
            <text x="16" y="22" textAnchor="middle" fontSize="14" fontFamily="monospace" fill="white">&lt;/&gt;</text>
          </svg>
          <span>DevLearn</span>
        </div>

        <div className="card">
          <h1 className="auth-title">Hey {user.username}! 👋</h1>
          <p className="auth-sub">Tell us about yourself so we can personalize your experience.</p>

          <div className="profile-grid">
            {PROFILES.map(p => (
              <div
                key={p.id}
                className={`profile-card ${selected === p.id ? 'selected' : ''}`}
                onClick={() => setSelected(p.id)}
              >
                <div className="icon">{p.icon}</div>
                <div className="label">{p.label}</div>
                <div className="desc">{p.desc}</div>
              </div>
            ))}
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={!selected}
            onClick={handleContinue}
          >
            Start Learning →
          </button>
        </div>
      </div>
    </div>
  )
}
