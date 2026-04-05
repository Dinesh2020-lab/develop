import nodemailer from 'nodemailer'

// Create transporter (reused across requests)
let transporter = null

function getTransporter() {
  if (transporter) return transporter

  transporter = nodemailer.createTransport({
    host:   process.env.EMAIL_HOST,
    port:   Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  return transporter
}

// Verify connection on startup
export async function verifyEmailConfig() {
  try {
    await getTransporter().verify()
    console.log('✅ Email service ready')
  } catch (err) {
    console.warn('⚠️  Email service not configured:', err.message)
    console.warn('   Set EMAIL_USER and EMAIL_PASS in .env to enable real emails')
  }
}

// ── Send OTP email ──────────────────────────────────────────────
export async function sendOtpEmail(to, username, otp) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
           background: #0e0e0e; color: #e8e6dc; margin: 0; padding: 0; }
    .wrap { max-width: 520px; margin: 40px auto; padding: 0 20px; }
    .card { background: #161616; border: 1px solid #2a2a2a;
            border-radius: 12px; padding: 40px; }
    .logo { font-size: 1.5rem; font-weight: 800; color: #1D9E75;
            margin-bottom: 24px; }
    h1   { font-size: 1.3rem; margin: 0 0 8px; }
    p    { color: #888780; line-height: 1.6; margin: 0 0 24px; }
    .otp { background: #1a2e26; border: 2px solid #1D9E75;
           border-radius: 10px; text-align: center;
           padding: 24px; margin: 24px 0; }
    .otp-code { font-size: 2.5rem; font-weight: 800; letter-spacing: 8px;
                color: #1D9E75; font-family: monospace; }
    .otp-note { color: #888780; font-size: 0.85rem; margin-top: 8px; }
    .footer  { color: #555; font-size: 0.8rem; margin-top: 32px;
               border-top: 1px solid #2a2a2a; padding-top: 20px; }
    .warning { color: #f09a7b; font-size: 0.82rem; margin-top: 12px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="logo">&lt;/&gt; DevLearn</div>
      <h1>Verify your email, ${username}!</h1>
      <p>Use the code below to complete your sign in. It expires in <strong>10 minutes</strong>.</p>

      <div class="otp">
        <div class="otp-code">${otp}</div>
        <div class="otp-note">Enter this code on the DevLearn OTP page</div>
      </div>

      <p>If you didn't request this code, you can safely ignore this email.</p>

      <div class="warning">⚠️ Never share this code with anyone. DevLearn will never ask for your OTP.</div>

      <div class="footer">
        © ${new Date().getFullYear()} DevLearn — Learn to Code<br/>
        This is an automated message, please do not reply.
      </div>
    </div>
  </div>
</body>
</html>`

  await getTransporter().sendMail({
    from:    process.env.EMAIL_FROM || `"DevLearn" <${process.env.EMAIL_USER}>`,
    to,
    subject: `${otp} is your DevLearn verification code`,
    html,
    text: `Your DevLearn verification code is: ${otp}\n\nExpires in 10 minutes.\n\nIf you didn't request this, ignore this email.`,
  })
}

// ── Send welcome email ──────────────────────────────────────────
export async function sendWelcomeEmail(to, username) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, sans-serif; background:#0e0e0e; color:#e8e6dc; margin:0; padding:0; }
    .wrap { max-width:520px; margin:40px auto; padding:0 20px; }
    .card { background:#161616; border:1px solid #2a2a2a; border-radius:12px; padding:40px; }
    .logo { font-size:1.5rem; font-weight:800; color:#1D9E75; margin-bottom:24px; }
    h1   { margin:0 0 16px; }
    p    { color:#888780; line-height:1.6; }
    .modules { display:grid; gap:10px; margin:24px 0; }
    .module  { background:#1a2e26; border:1px solid #1D9E75; border-radius:8px; padding:14px 16px; }
    .module-title { font-weight:700; color:#9fe1cb; }
    .module-sub   { color:#888780; font-size:0.82rem; margin-top:2px; }
    .btn { display:inline-block; background:#1D9E75; color:#fff; text-decoration:none;
           border-radius:8px; padding:12px 24px; font-weight:700; margin-top:16px; }
    .footer { color:#555; font-size:0.8rem; margin-top:32px; border-top:1px solid #2a2a2a; padding-top:20px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="logo">&lt;/&gt; DevLearn</div>
      <h1>Welcome aboard, ${username}! 🎉</h1>
      <p>Your account is verified and ready. Here's what you can learn:</p>

      <div class="modules">
        <div class="module">
          <div class="module-title">🌐 Frontend Development</div>
          <div class="module-sub">HTML · CSS · JavaScript — Complete</div>
        </div>
        <div class="module">
          <div class="module-title">⚙️ Backend Development</div>
          <div class="module-sub">Node.js · Express · MongoDB · SQL</div>
        </div>
        <div class="module">
          <div class="module-title">⚛️ React.js</div>
          <div class="module-sub">Components · Hooks · Router · Best Practices</div>
        </div>
        <div class="module">
          <div class="module-title">🌿 Git & GitHub</div>
          <div class="module-sub">Version Control · CI/CD · Collaboration</div>
        </div>
        <div class="module">
          <div class="module-title">🐍 Python</div>
          <div class="module-sub">Basics · OOP · Flask · pandas</div>
        </div>
        <div class="module">
          <div class="module-title">✏️ Live Code Editor</div>
          <div class="module-sub">HTML/CSS/JS playground with live preview</div>
        </div>
      </div>

      <div class="footer">
        © ${new Date().getFullYear()} DevLearn — Happy Learning!
      </div>
    </div>
  </div>
</body>
</html>`

  await getTransporter().sendMail({
    from:    process.env.EMAIL_FROM || `"DevLearn" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Welcome to DevLearn, ${username}! 🚀`,
    html,
  })
}

// ── Send payment confirmation ────────────────────────────────────
export async function sendPaymentConfirmationEmail(to, username, paymentId) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family:-apple-system,sans-serif; background:#0e0e0e; color:#e8e6dc; margin:0; padding:0; }
    .wrap { max-width:520px; margin:40px auto; padding:0 20px; }
    .card { background:#161616; border:1px solid #2a2a2a; border-radius:12px; padding:40px; }
    .logo { font-size:1.5rem; font-weight:800; color:#1D9E75; margin-bottom:24px; }
    .badge { background:#1a2e26; border:2px solid #1D9E75; border-radius:10px;
             text-align:center; padding:24px; margin:24px 0; }
    .badge-icon { font-size:2.5rem; }
    .badge-title { color:#1D9E75; font-weight:800; font-size:1.2rem; margin-top:8px; }
    p { color:#888780; line-height:1.6; }
    .detail { display:flex; justify-content:space-between; padding:8px 0;
              border-bottom:1px solid #2a2a2a; font-size:0.88rem; }
    .footer { color:#555; font-size:0.8rem; margin-top:32px; border-top:1px solid #2a2a2a; padding-top:20px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div class="logo">&lt;/&gt; DevLearn</div>
      <h1>Payment Confirmed! 🎉</h1>

      <div class="badge">
        <div class="badge-icon">✅</div>
        <div class="badge-title">DevLearn Pro Activated</div>
      </div>

      <p>Hey ${username}, your payment was successful. The Live Code Editor is now unlocked!</p>

      <div class="detail"><span style="color:#888">Plan</span><strong>Pro — ₹49/month</strong></div>
      <div class="detail"><span style="color:#888">Payment ID</span><code style="color:#9fe1cb;font-size:0.8rem">${paymentId}</code></div>
      <div class="detail"><span style="color:#888">Date</span><span>${new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</span></div>

      <p style="margin-top:20px">You now have unlimited access to the Live Code Editor with real-time HTML/CSS/JS preview, save projects, console output, and download features.</p>

      <div class="footer">
        © ${new Date().getFullYear()} DevLearn · Keep this email as your payment receipt.
      </div>
    </div>
  </div>
</body>
</html>`

  await getTransporter().sendMail({
    from:    process.env.EMAIL_FROM || `"DevLearn" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Payment Confirmed — DevLearn Pro Activated ✅`,
    html,
  })
}
