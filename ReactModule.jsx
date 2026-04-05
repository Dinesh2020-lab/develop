import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

const COLORS = ['#1D9E75','#7F77DD','#f09a7b','#ef9f27','#4a9eff','#e45b8a','#a78bfa','#34d399']

export default function UserProfilePage() {
  const { user, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState(user?.username || '')
  const [bio, setBio]           = useState(user?.bio || '')
  const [color, setColor]       = useState(user?.avatarColor || '#1D9E75')
  const [saved, setSaved]       = useState(false)

  function handleSave() {
    if (!username.trim()) return
    updateProfile({ username: username.trim(), bio: bio.trim(), avatarColor: color })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const initials = username.slice(0,2).toUpperCase() || '??'

  return (
    <>
      <Navbar />
      <div className="page-wrap" style={{ maxWidth: 560 }}>
        <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '1.5rem', fontSize: '.82rem' }}>← Back</button>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem' }}>👤 Edit Profile</h1>

        <div className="card">
          {/* Avatar preview */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: color + '33', border: `3px solid ${color}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', fontWeight: 800, color,
            }}>
              {initials}
            </div>
          </div>

          {/* Avatar color */}
          <div className="form-group">
            <label>Avatar Color</label>
            <div className="avatar-picker">
              {COLORS.map(c => (
                <div key={c} className={`avatar-swatch ${color === c ? 'selected' : ''}`}
                  style={{ background: c }} onClick={() => setColor(c)} />
              ))}
            </div>
          </div>

          {/* Username */}
          <div className="form-group">
            <label>Username</label>
            <input className="input" value={username} onChange={e => setUsername(e.target.value)} placeholder="Your username" />
          </div>

          {/* Email (read only) */}
          <div className="form-group">
            <label>Email (cannot be changed)</label>
            <input className="input" value={user?.email || ''} disabled style={{ opacity: .5 }} />
          </div>

          {/* Bio */}
          <div className="form-group">
            <label>Bio</label>
            <textarea className="input" rows={3} value={bio} onChange={e => setBio(e.target.value)}
              placeholder="Tell others a little about yourself..." />
          </div>

          {/* Profile type */}
          <div className="form-group">
            <label>Profile Type</label>
            <input className="input" value={user?.profileType || ''} disabled style={{ opacity: .5, textTransform: 'capitalize' }} />
          </div>

          {/* Joined */}
          <div className="form-group">
            <label>Member since</label>
            <input className="input" value={user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown'} disabled style={{ opacity: .5 }} />
          </div>

          <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleSave}>
            {saved ? '✅ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </>
  )
}
