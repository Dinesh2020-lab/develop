import { verifyToken } from '../utils/jwt.js'
import User from '../models/User.js'

export async function requireAuth(req, res, next) {
  try {
    const auth = req.headers.authorization
    if (!auth?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const token   = auth.split(' ')[1]
    const decoded = verifyToken(token)

    const user = await User.findById(decoded.id)
    if (!user) return res.status(401).json({ error: 'User no longer exists' })

    req.user = user
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired — please log in again' })
    }
    res.status(401).json({ error: 'Invalid token' })
  }
}

export function requireAdmin(req, res, next) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' })
  }
  next()
}
