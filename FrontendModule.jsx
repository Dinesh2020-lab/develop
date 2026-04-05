import { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function ls(key, fb) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fb } catch { return fb }
}
function lsSet(key, val) { try { localStorage.setItem(key, JSON.stringify(val)) } catch {} }
function lsDel(key)      { try { localStorage.removeItem(key) } catch {} }

async function api(path, options = {}) {
  const token = ls('devlearn_token', null)
  const res = await fetch(`${API}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw Object.assign(new Error(data.error || 'Request failed'), { status: res.status, data })
  return data
}

export function AuthProvider({ children }) {
  const [token, setToken]   = useState(() => ls('devlearn_token', null))
  const [user, setUser]     = useState(() => ls('devlearn_user', null))
  const [progress, setProgress] = useState(() => ls('devlearn_progress', {
    frontend: 0, backend: 0, react: 0, git: 0, python: 0,
    frontendSections: [false,false,false],
    backendSections:  [false,false,false],
    reactSections:    [false,false,false],
    gitSections:      [false,false,false],
    pythonSections:   [false,false,false],
  }))
  const [editorAccess, setEditorAccess] = useState(() => ls('devlearn_editor_access', { trialStarted: null, isPro: false }))
  const [savedProjects, setSavedProjects] = useState(() => ls('devlearn_projects', []))
  const [posts, setPosts] = useState(() => ls('devlearn_posts', []))
  const [pendingEmail, setPendingEmail] = useState('')
  const [devOtp, setDevOtp] = useState('')

  // ── Auth ─────────────────────────────────────────────────────
  const initiateLogin = useCallback(async (username, email) => {
    const data = await api('/auth/initiate', {
      method: 'POST',
      body: JSON.stringify({ username, email }),
    })
    setPendingEmail(email)
    if (data.devOtp) setDevOtp(data.devOtp)
    return data
  }, [])

  const verifyOtp = useCallback(async (otp) => {
    const data = await api('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email: pendingEmail, otp }),
    })
    setToken(data.token)
    lsSet('devlearn_token', data.token)
    setUser(data.user)
    lsSet('devlearn_user', data.user)
    if (data.user.progress) {
      setProgress(data.user.progress)
      lsSet('devlearn_progress', data.user.progress)
    }
    if (data.user.editorAccess) {
      setEditorAccess(data.user.editorAccess)
      lsSet('devlearn_editor_access', data.user.editorAccess)
    }
    return data
  }, [pendingEmail])

  const completeProfile = useCallback(async (profileType) => {
    const data = await api('/auth/complete-profile', {
      method: 'POST',
      body: JSON.stringify({ profileType }),
    })
    setUser(data.user)
    lsSet('devlearn_user', data.user)
    return data
  }, [])

  const updateProfile = useCallback(async (changes) => {
    const data = await api('/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(changes),
    })
    setUser(data.user)
    lsSet('devlearn_user', data.user)
    return data
  }, [])

  const logout = useCallback(() => {
    setToken(null); setUser(null)
    lsDel('devlearn_token'); lsDel('devlearn_user')
    lsDel('devlearn_progress'); lsDel('devlearn_editor_access')
  }, [])

  const refreshUser = useCallback(async () => {
    try {
      const data = await api('/auth/me')
      setUser(data.user)
      lsSet('devlearn_user', data.user)
      if (data.user.progress) {
        setProgress(data.user.progress)
        lsSet('devlearn_progress', data.user.progress)
      }
      if (data.user.editorAccess) {
        setEditorAccess(data.user.editorAccess)
        lsSet('devlearn_editor_access', data.user.editorAccess)
      }
    } catch {}
  }, [])

  // ── Progress ────────────────────────────────────────────────
  const updateProgress = useCallback(async (track, sectionIndex) => {
    try {
      const data = await api('/progress', {
        method: 'PATCH',
        body: JSON.stringify({ track, sectionIndex }),
      })
      setProgress(data.progress)
      lsSet('devlearn_progress', data.progress)
    } catch {
      // Fallback: update locally if backend fails
      setProgress(prev => {
        const key = `${track}Sections`
        const sections = [...(prev[key] || [])]
        sections[sectionIndex] = true
        const pct = Math.round(sections.filter(Boolean).length / sections.length * 100)
        const updated = { ...prev, [key]: sections, [track]: pct }
        lsSet('devlearn_progress', updated)
        return updated
      })
    }
  }, [])

  // ── Editor access ─────────────────────────────────────────────
  const startTrial = useCallback(async () => {
    try {
      const data = await api('/editor/start-trial', { method: 'POST' })
      setEditorAccess(data.editorAccess)
      lsSet('devlearn_editor_access', data.editorAccess)
    } catch {
      const updated = { trialStarted: Date.now(), isPro: false }
      setEditorAccess(updated)
      lsSet('devlearn_editor_access', updated)
    }
  }, [])

  const activatePro = useCallback(async (paymentData) => {
    const data = await api('/editor/activate-pro', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    })
    setEditorAccess(data.editorAccess)
    lsSet('devlearn_editor_access', data.editorAccess)
    return data
  }, [])

  const getEditorStatus = useCallback(() => {
    if (editorAccess.isPro) return 'pro'
    if (!editorAccess.trialStarted) return 'none'
    const elapsed = Date.now() - new Date(editorAccess.trialStarted).getTime()
    return elapsed < 24 * 60 * 60 * 1000 ? 'trial' : 'expired'
  }, [editorAccess])

  const getTrialRemaining = useCallback(() => {
    if (!editorAccess.trialStarted) return 0
    return Math.max(0, 24 * 60 * 60 * 1000 - (Date.now() - new Date(editorAccess.trialStarted).getTime()))
  }, [editorAccess])

  // ── Saved projects (local only) ───────────────────────────────
  const saveProject = useCallback((project) => {
    setSavedProjects(prev => {
      const existing = prev.findIndex(p => p.id === project.id)
      const updated = existing >= 0
        ? prev.map(p => p.id === project.id ? project : p)
        : [project, ...prev]
      lsSet('devlearn_projects', updated)
      return updated
    })
  }, [])

  const deleteProject = useCallback((id) => {
    setSavedProjects(prev => {
      const updated = prev.filter(p => p.id !== id)
      lsSet('devlearn_projects', updated)
      return updated
    })
  }, [])

  // ── Community ────────────────────────────────────────────────
  const fetchPosts = useCallback(async (params = {}) => {
    try {
      const qs = new URLSearchParams(params).toString()
      const data = await api(`/posts${qs ? '?' + qs : ''}`)
      setPosts(data.posts)
      lsSet('devlearn_posts', data.posts)
      return data
    } catch { return { posts } }
  }, [])

  const addPost = useCallback(async (post) => {
    const data = await api('/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    })
    setPosts(prev => { const updated = [data.post, ...prev]; lsSet('devlearn_posts', updated); return updated })
    return data.post
  }, [])

  const addReply = useCallback(async (postId, reply) => {
    const data = await api(`/posts/${postId}/reply`, {
      method: 'POST',
      body: JSON.stringify(reply),
    })
    setPosts(prev => {
      const updated = prev.map(p => p.id === postId || p._id === postId
        ? { ...p, replies: [...(p.replies || []), data.reply] } : p)
      lsSet('devlearn_posts', updated)
      return updated
    })
  }, [])

  const likePost = useCallback(async (postId) => {
    await api(`/posts/${postId}/like`, { method: 'POST' })
    setPosts(prev => {
      const updated = prev.map(p => (p.id === postId || p._id === postId)
        ? { ...p, likes: p.likes + 1 } : p)
      lsSet('devlearn_posts', updated)
      return updated
    })
  }, [])

  const deletePost = useCallback(async (postId) => {
    await api(`/posts/${postId}`, { method: 'DELETE' })
    setPosts(prev => {
      const updated = prev.filter(p => p.id !== postId && p._id !== postId)
      lsSet('devlearn_posts', updated)
      return updated
    })
  }, [])

  return (
    <AuthContext.Provider value={{
      user, token, pendingEmail, devOtp,
      initiateLogin, verifyOtp, completeProfile, updateProfile, logout, refreshUser,
      progress, updateProgress,
      editorAccess, startTrial, activatePro, getEditorStatus, getTrialRemaining,
      savedProjects, saveProject, deleteProject,
      posts, fetchPosts, addPost, addReply, likePost, deletePost,
      api,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }
