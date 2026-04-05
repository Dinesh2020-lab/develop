import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

import {
  initiateLogin, verifyOtp, getMe,
  completeProfile, updateProfile,
} from '../controllers/auth.controller.js'

import {
  startTrial, getEditorStatus, activatePro,
} from '../controllers/editor.controller.js'

import {
  getProgress, updateSection, resetProgress,
} from '../controllers/progress.controller.js'

import {
  getPosts, createPost, deletePost, likePost, addReply,
} from '../controllers/community.controller.js'

import {
  getStats, getAllUsers, getAllPosts, deleteUserById,
} from '../controllers/admin.controller.js'

const router = Router()

// ── Rate limiters ──────────────────────────────────────────────
const otpLimiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minute
  max: 3,
  message: { error: 'Too many OTP requests. Please wait 1 minute.' },
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 20,
  message: { error: 'Too many requests. Please try again later.' },
})

// ─────────────────────────────────────────────────────────────────
// AUTH ROUTES
// ─────────────────────────────────────────────────────────────────
router.post('/auth/initiate',        otpLimiter,  initiateLogin)
router.post('/auth/verify-otp',      authLimiter, verifyOtp)
router.get ('/auth/me',              requireAuth, getMe)
router.post('/auth/complete-profile',requireAuth, completeProfile)
router.patch('/auth/profile',        requireAuth, updateProfile)

// ─────────────────────────────────────────────────────────────────
// EDITOR ROUTES
// ─────────────────────────────────────────────────────────────────
router.post('/editor/start-trial',   requireAuth, startTrial)
router.get ('/editor/status',        requireAuth, getEditorStatus)
router.post('/editor/activate-pro',  requireAuth, activatePro)

// ─────────────────────────────────────────────────────────────────
// PROGRESS ROUTES
// ─────────────────────────────────────────────────────────────────
router.get  ('/progress',            requireAuth, getProgress)
router.patch('/progress',            requireAuth, updateSection)
router.delete('/progress',           requireAuth, resetProgress)

// ─────────────────────────────────────────────────────────────────
// COMMUNITY ROUTES
// ─────────────────────────────────────────────────────────────────
router.get   ('/posts',              requireAuth, getPosts)
router.post  ('/posts',              requireAuth, createPost)
router.delete('/posts/:id',          requireAuth, deletePost)
router.post  ('/posts/:id/like',     requireAuth, likePost)
router.post  ('/posts/:id/reply',    requireAuth, addReply)

// ─────────────────────────────────────────────────────────────────
// ADMIN ROUTES
// ─────────────────────────────────────────────────────────────────
router.get   ('/admin/stats',        requireAuth, requireAdmin, getStats)
router.get   ('/admin/users',        requireAuth, requireAdmin, getAllUsers)
router.get   ('/admin/posts',        requireAuth, requireAdmin, getAllPosts)
router.delete('/admin/users/:id',    requireAuth, requireAdmin, deleteUserById)

// ─────────────────────────────────────────────────────────────────
// HEALTH CHECK
// ─────────────────────────────────────────────────────────────────
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    env:    process.env.NODE_ENV,
    time:   new Date().toISOString(),
  })
})

export default router
