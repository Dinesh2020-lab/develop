import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleLogout() { logout(); navigate('/') }

  const initials = user?.username ? user.username.slice(0, 2).toUpperCase() : '??'
  const avatarColor = user?.avatarColor || '#1D9E75'

  const navLinks = [
    { to: '/dashboard', label: '🏠 Dashboard' },
    { to: '/community', label: '💬 Community' },
    { to: '/editor',    label: '✏️ Editor' },
  ]

  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <Link to="/dashboard" className="nav-brand">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#1D9E75"/>
            <text x="16" y="22" textAnchor="middle" fontSize="14" fontFamily="monospace" fill="white">&lt;/&gt;</text>
          </svg>
          DevLearn
        </Link>

        {/* Desktop nav links */}
        <div className="nav-links-desktop">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to}
              style={{
                fontSize: '.85rem',
                color: location.pathname === l.to ? 'var(--accent)' : 'var(--muted)',
                textDecoration: 'none',
                transition: 'color .15s',
              }}
            >{l.label}</Link>
          ))}
          {user?.isAdmin && (
            <Link to="/admin" style={{
              fontSize: '.85rem',
              color: location.pathname === '/admin' ? '#ef9f27' : 'var(--muted)',
              textDecoration: 'none',
            }}>⚙️ Admin</Link>
          )}
        </div>
      </div>

      <div className="nav-right">
        <div style={{ position: 'relative' }}>
          <div
            className="nav-avatar"
            style={{ background: avatarColor + '33', borderColor: avatarColor, cursor: 'pointer' }}
            onClick={() => setMenuOpen(o => !o)}
            title={user?.email}
          >
            {initials}
          </div>

          {menuOpen && (
            <div style={{
              position: 'absolute', top: '42px', right: 0,
              background: 'var(--bg2)', border: '1px solid var(--border)',
              borderRadius: '10px', minWidth: '180px', zIndex: 200,
              boxShadow: '0 8px 24px rgba(0,0,0,.4)', overflow: 'hidden',
            }} onClick={() => setMenuOpen(false)}>
              <div style={{ padding: '.8rem 1rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 600, fontSize: '.9rem' }}>{user?.username}</div>
                <div style={{ color: 'var(--muted)', fontSize: '.75rem' }}>{user?.email}</div>
                {user?.isAdmin && <div style={{ color: '#ef9f27', fontSize: '.72rem', marginTop: '.2rem' }}>⚙️ Admin</div>}
              </div>
              <Link to="/profile-settings" style={{ display: 'block', padding: '.65rem 1rem', color: 'var(--text)', textDecoration: 'none', fontSize: '.85rem' }}>
                👤 Edit Profile
              </Link>
              {user?.isAdmin && (
                <Link to="/admin" style={{ display: 'block', padding: '.65rem 1rem', color: '#ef9f27', textDecoration: 'none', fontSize: '.85rem' }}>
                  ⚙️ Admin Panel
                </Link>
              )}
              <button
                onClick={handleLogout}
                style={{ width: '100%', textAlign: 'left', padding: '.65rem 1rem', background: 'none', border: 'none', color: '#f08080', cursor: 'pointer', fontSize: '.85rem', borderTop: '1px solid var(--border)' }}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
