import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

// ─────────────────────────────────────────────────────────────
// REPLACE this with your Razorpay TEST key from:
// razorpay.com → Dashboard → Settings → API Keys → Test Mode
// It looks like: rzp_test_XXXXXXXXXXXXXXXX
// ─────────────────────────────────────────────────────────────
const RAZORPAY_KEY_ID = 'rzp_test_YourKeyHere'

const AMOUNT_PAISE = 4900  // ₹49 = 4900 paise (Razorpay uses paise)

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) { resolve(true); return }
    const script = document.createElement('script')
    script.id  = 'razorpay-script'
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload  = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

// Format ms → "HH:MM:SS"
function formatTime(ms) {
  if (ms <= 0) return '00:00:00'
  const totalSec = Math.floor(ms / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  return [h, m, s].map(n => String(n).padStart(2, '0')).join(':')
}

// ── Trial Banner (shown inside editor while trial is active) ──
export function TrialBanner() {
  const { getTrialRemaining } = useAuth()
  const [remaining, setRemaining] = useState(getTrialRemaining())

  useEffect(() => {
    const t = setInterval(() => setRemaining(getTrialRemaining()), 1000)
    return () => clearInterval(t)
  }, [getTrialRemaining])

  return (
    <div style={{
      background: 'linear-gradient(90deg, #1a1030, #083528)',
      borderBottom: '1px solid var(--purple)',
      padding: '.45rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '.8rem',
      flexShrink: 0,
    }}>
      <span style={{ color: '#cec0f6' }}>
        🎁 Free trial active
      </span>
      <span style={{ color: 'var(--accent2)', fontFamily: 'monospace', fontWeight: 700, fontSize: '.9rem' }}>
        {formatTime(remaining)}
      </span>
      <span style={{ color: 'var(--muted)' }}>
        remaining — upgrade to keep access
      </span>
    </div>
  )
}

// ── Main Paywall Screen ────────────────────────────────────────
export default function Paywall() {
  const { user, activatePro } = useAuth()
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [error, setError]       = useState('')

  async function handlePayment() {
    setLoading(true)
    setError('')

    const loaded = await loadRazorpayScript()
    if (!loaded) {
      setError('Could not load Razorpay. Check your internet connection.')
      setLoading(false)
      return
    }

    const options = {
      key:          RAZORPAY_KEY_ID,
      amount:       AMOUNT_PAISE,
      currency:     'INR',
      name:         'DevLearn',
      description:  'Pro Plan — Live Code Editor',
      image:        '/favicon.svg',
      prefill: {
        name:  user?.username || '',
        email: user?.email    || '',
      },
      theme: { color: '#1D9E75' },
      modal: {
        ondismiss: () => setLoading(false),
      },
      handler: function (response) {
        // In production: verify response.razorpay_payment_id on your backend
        // For test mode: any successful payment comes here
        console.log('Payment ID:', response.razorpay_payment_id)
        activatePro()
        setSuccess(true)
        setLoading(false)
      },
    }

    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', (response) => {
      setError(`Payment failed: ${response.error.description}`)
      setLoading(false)
    })
    rzp.open()
  }

  if (success) {
    return (
      <div style={overlayStyle}>
        <div style={boxStyle}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ color: 'var(--accent)', marginBottom: '.5rem' }}>You're now Pro!</h2>
          <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
            The Live Code Editor is unlocked forever. Happy coding!
          </p>
          <button className="btn btn-primary" style={{ width: '100%' }}
            onClick={() => window.location.reload()}>
            Open Editor →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={overlayStyle}>
      <div style={boxStyle}>

        {/* Icon */}
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔒</div>

        {/* Heading */}
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '.4rem' }}>
          Your free trial has ended
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '.9rem', marginBottom: '1.8rem' }}>
          Upgrade to <strong style={{ color: 'var(--accent)' }}>DevLearn Pro</strong> to keep using the Live Code Editor.
        </p>

        {/* Price card */}
        <div style={{
          background: 'linear-gradient(135deg, #083528, #0f2920)',
          border: '1px solid var(--accent)',
          borderRadius: '12px',
          padding: '1.4rem',
          marginBottom: '1.5rem',
          textAlign: 'center',
        }}>
          <div style={{ color: 'var(--muted)', fontSize: '.8rem', marginBottom: '.3rem' }}>
            PRO PLAN
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>
            ₹49
          </div>
          <div style={{ color: 'var(--muted)', fontSize: '.82rem', marginTop: '.3rem' }}>
            per month
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            {[
              '✅ Live HTML / CSS / JS Editor',
              '✅ Real-time iframe preview',
              '✅ All frontend & backend tutorials',
              '✅ Progress tracking',
              '✅ Unlimited access',
            ].map(f => (
              <div key={f} style={{ fontSize: '.85rem', color: 'var(--accent2)', textAlign: 'left' }}>
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: '#f08080', fontSize: '.85rem', marginBottom: '1rem' }}>
            ⚠ {error}
          </p>
        )}

        {/* Pay button */}
        <button
          className="btn btn-primary"
          style={{ width: '100%', fontSize: '1rem', padding: '.8rem', marginBottom: '.75rem' }}
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? '⏳ Opening payment…' : '💳 Pay ₹49 / month'}
        </button>

        {/* Test mode notice */}
        <div style={{
          background: '#1a1030',
          border: '1px solid var(--purple)',
          borderRadius: '6px',
          padding: '.65rem .9rem',
          fontSize: '.78rem',
          color: '#cec0f6',
          textAlign: 'center',
        }}>
          🧪 <strong>Test mode</strong> — use card <code style={{ color: 'var(--accent2)' }}>4111 1111 1111 1111</code>, any future date, any CVV
        </div>

        <p style={{ color: 'var(--muted)', fontSize: '.75rem', textAlign: 'center', marginTop: '.8rem' }}>
          Secured by Razorpay · UPI · Cards · Net Banking · Wallets
        </p>
      </div>
    </div>
  )
}

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.85)',
  backdropFilter: 'blur(6px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999,
  padding: '1rem',
}

const boxStyle = {
  background: 'var(--bg2)',
  border: '1px solid var(--border)',
  borderRadius: '16px',
  padding: '2rem',
  width: '100%',
  maxWidth: '420px',
  textAlign: 'center',
}
