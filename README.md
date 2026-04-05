import User from '../models/User.js'
import { signToken, generateOtp } from '../utils/jwt.js'
import { sendOtpEmail, sendWelcomeEmail } from '../config/email.js'

// ── Step 1: Initiate login (send OTP) ──────────────────────────
export async function initiateLogin(req, res, next) {
  try {
    const { username, email } = req.body

    if (!username?.trim() || !email?.trim()) {
      return res.status(400).json({ error: 'Username and email are required' })
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }
    if (username.trim().length < 2) {
      return res.status(400).json({ error: 'Username must be at least 2 characters' })
    }

    // Find or create user
    let user = await User.findOne({ email: email.toLowerCase().trim() })
    const isNewUser = !user

    if (!user) {
      // Check if this will be the first user (auto-admin)
      const userCount = await User.countDocuments()
      user = await User.create({
        username: username.trim(),
        email:    email.toLowerCase().trim(),
        isAdmin:  userCount === 0,
      })
    } else {
      // Update username if changed
      if (user.username !== username.trim()) {
        user.username = username.trim()
      }
    }

    // Generate OTP
    const otp       = generateOtp()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    user.otp = { code: otp, expiresAt, attempts: 0 }
    await user.save()

    // Send email
    try {
      await sendOtpEmail(user.email, user.username, otp)
      console.log(`📧 OTP sent to ${user.email}`)
    } catch (emailErr) {
      console.error('Email send failed:', emailErr.message)
      // In dev mode, log OTP to console so you can still test
      if (process.env.NODE_ENV === 'development') {
        console.log(`\n🔑 DEV MODE OTP for ${email}: ${otp}\n`)
      }
    }

    res.json({
      message:   'OTP sent to your email',
      email:     user.email,
      isNewUser,
      // In development, include OTP in response for easy testing
      ...(process.env.NODE_ENV === 'development' && { devOtp: otp }),
    })
  } catch (err) {
    next(err)
  }
}

// ── Step 2: Verify OTP ──────────────────────────────────────────
export async function verifyOtp(req, res, next) {
  try {
    const { email, otp } = req.body

    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' })
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+otp')

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Check OTP exists
    if (!user.otp?.code) {
      return res.status(400).json({ error: 'No OTP requested. Please request a new one.' })
    }

    // Check expiry
    if (new Date() > new Date(user.otp.expiresAt)) {
      user.otp = undefined
      await user.save()
      return res.status(400).json({ error: 'OTP expired. Please request a new one.' })
    }

    // Check attempts (max 5)
    if (user.otp.attempts >= 5) {
      user.otp = undefined
      await user.save()
      return res.status(400).json({ error: 'Too many failed attempts. Please request a new OTP.' })
    }

    // Verify OTP
    if (user.otp.code !== String(otp).trim()) {
      user.otp.attempts += 1
      await user.save()
      const remaining = 5 - user.otp.attempts
      return res.status(400).json({
        error: `Incorrect OTP. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`,
      })
    }

    // OTP correct — clear it
    const isNewUser = !user.isVerified
    user.otp        = undefined
    user.isVerified = true
    user.lastLogin  = new Date()
    await user.save()

    // Send welcome email to new users
    if (isNewUser) {
      sendWelcomeEmail(user.email, user.username).catch(console.error)
    }

    const token = signToken({ id: user._id, email: user.email, isAdmin: user.isAdmin })

    res.json({
      message: 'Login successful',
      token,
      user: user.toSafeObject(),
    })
  } catch (err) {
    next(err)
  }
}

// ── Get current user ────────────────────────────────────────────
export async function getMe(req, res) {
  res.json({ user: req.user.toSafeObject() })
}

// ── Complete profile setup ──────────────────────────────────────
export async function completeProfile(req, res, next) {
  try {
    const { profileType } = req.body
    const allowed = ['student', 'professional', 'freelancer', 'hobbyist']
    if (!allowed.includes(profileType)) {
      return res.status(400).json({ error: 'Invalid profile type' })
    }

    req.user.profileType  = profileType
    req.user.profileSetup = true
    await req.user.save()

    res.json({ message: 'Profile setup complete', user: req.user.toSafeObject() })
  } catch (err) {
    next(err)
  }
}

// ── Update profile ──────────────────────────────────────────────
export async function updateProfile(req, res, next) {
  try {
    const { username, bio, avatarColor } = req.body
    if (username !== undefined) {
      if (username.trim().length < 2) {
        return res.status(400).json({ error: 'Username too short' })
      }
      req.user.username = username.trim()
    }
    if (bio !== undefined) req.user.bio = bio.trim().slice(0, 300)
    if (avatarColor !== undefined) req.user.avatarColor = avatarColor

    await req.user.save()
    res.json({ message: 'Profile updated', user: req.user.toSafeObject() })
  } catch (err) {
    next(err)
  }
}
