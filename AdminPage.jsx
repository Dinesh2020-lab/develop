import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProgressBar from '../components/ProgressBar'
import { useAuth } from '../context/AuthContext'

const SECTIONS = [
  {
    title: 'Node.js — Zero to Industry Level',
    content: (<>
      <h3>What is Node.js?</h3>
      <p>Node.js is a JavaScript runtime built on Chrome's V8 engine. It lets you run JavaScript <strong>outside the browser</strong> — on servers, in CLI tools, build tools, and microservices. Uses a <strong>non-blocking, event-driven I/O model</strong> that handles thousands of simultaneous connections efficiently.</p>

      <h3>Why Node.js?</h3>
      <ul>
        <li>Same language (JavaScript) on frontend AND backend</li>
        <li>Non-blocking I/O — handles thousands of concurrent requests without waiting</li>
        <li>npm ecosystem — 2 million+ packages available</li>
        <li>Fast — V8 JIT compilation, async architecture</li>
        <li>Used by Netflix, LinkedIn, Uber, PayPal, NASA</li>
      </ul>

      <h3>Install & First Script</h3>
      <pre>{`# Download from nodejs.org (LTS recommended)
node --version    # v20.x.x
npm --version     # 10.x.x

# Run a script
node hello.js
node -e "console.log('Hello!')"  # one-liner

# REPL (interactive shell)
node
> 2 + 2
4
> .exit`}</pre>

      <h3>npm — Complete Guide</h3>
      <pre>{`# Initialize project
npm init -y              # create package.json with defaults
npm init                 # interactive setup

# Install packages
npm install express               # production dependency
npm install --save-dev nodemon    # dev dependency (not in production)
npm install -g typescript         # global CLI tool
npm ci                            # clean install from package-lock.json (CI/CD)

# Update & remove
npm update                        # update all to latest minor
npm outdated                      # see what needs updating
npm uninstall axios               # remove package
npm audit                         # check for vulnerabilities
npm audit fix                     # auto-fix vulnerabilities

# Run scripts
npm run dev
npm run build
npm test
npm start

# Useful info
npm list                          # list installed packages
npm list --depth=0                # top-level only
npm info express                  # package details
npm search authentication         # search packages`}</pre>

      <h3>package.json — Full Reference</h3>
      <pre>{`{
  "name": "devlearn-api",
  "version": "1.0.0",
  "description": "DevLearn backend API",
  "main": "src/index.js",
  "type": "module",             // "module" for ESM, "commonjs" for CJS
  "scripts": {
    "start":    "node src/index.js",
    "dev":      "nodemon src/index.js",
    "build":    "tsc",
    "test":     "jest --coverage",
    "lint":     "eslint src/",
    "format":   "prettier --write src/"
  },
  "dependencies": {
    "express":   "^4.18.2",
    "mongoose":  "^8.0.0",
    "dotenv":    "^16.3.1",
    "bcryptjs":  "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors":      "^2.8.5",
    "helmet":    "^7.1.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "jest":    "^29.7.0",
    "@types/node": "^20.0.0"
  },
  "engines": { "node": ">=18.0.0" }
}`}</pre>

      <h3>Built-in Modules</h3>
      <pre>{`// fs — File System
import { readFile, writeFile, readdir, mkdir } from 'fs/promises';

const data = await readFile('config.json', 'utf8');
const config = JSON.parse(data);

await writeFile('output.txt', 'Hello!', 'utf8');
await mkdir('./uploads', { recursive: true });
const files = await readdir('./src');

// path — cross-platform paths
import path from 'path';
path.join('/users', 'alice', 'docs')    // '/users/alice/docs'
path.resolve('./src', 'index.js')       // absolute path
path.basename('/src/app.js')            // 'app.js'
path.dirname('/src/app.js')             // '/src'
path.extname('photo.jpg')               // '.jpg'

// url — parse URLs
import { URL } from 'url';
const u = new URL('https://site.com/path?name=alice&age=25');
u.hostname              // 'site.com'
u.pathname              // '/path'
u.searchParams.get('name') // 'alice'

// crypto — security
import crypto from 'crypto';
crypto.randomBytes(16).toString('hex')  // random token
crypto.randomUUID()                     // UUID v4
crypto.createHash('sha256')
      .update('password')
      .digest('hex')                    // hash

// os — system info
import os from 'os';
os.platform()     // 'linux' | 'darwin' | 'win32'
os.cpus().length  // number of CPU cores
os.totalmem()     // total RAM in bytes
os.homedir()      // '/home/username'`}</pre>

      <h3>Environment Variables</h3>
      <pre>{`# .env file (NEVER commit to git!)
PORT=3000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/devlearn
JWT_SECRET=your_super_secret_key_min_32_chars
JWT_EXPIRES_IN=7d
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx
EMAIL_USER=hello@devlearn.com
EMAIL_PASS=app_password

# .gitignore — add these!
.env
.env.local
.env.production`}</pre>
      <pre>{`// config.js — centralized config validation
import 'dotenv/config';  // or: require('dotenv').config()

const required = ['DATABASE_URL', 'JWT_SECRET'];
for (const key of required) {
  if (!process.env[key]) {
    throw new Error(\`Missing required env var: \${key}\`);
  }
}

export const config = {
  port:     parseInt(process.env.PORT || '3000'),
  nodeEnv:  process.env.NODE_ENV || 'development',
  isDev:    process.env.NODE_ENV === 'development',
  dbUrl:    process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: process.env.JWT_EXPIRES_IN || '7d',
};`}</pre>

      <h3>Error Handling & Process</h3>
      <pre>{`// Global error handlers — add to index.js
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  await server.close();
  await mongoose.connection.close();
  process.exit(0);
});`}</pre>
    </>),
  },

  {
    title: 'Express.js & REST APIs — Complete Guide',
    content: (<>
      <h3>What is Express?</h3>
      <p>Express is a minimal, fast, unopinionated web framework for Node.js. It simplifies building REST APIs and web apps. Over 20 million weekly npm downloads — the most popular Node.js framework.</p>

      <h3>Complete Express Server Setup</h3>
      <pre>{`npm install express dotenv cors helmet morgan express-rate-limit`}</pre>
      <pre>{`// src/index.js
import express from 'express';
import cors    from 'cors';
import helmet  from 'helmet';
import morgan  from 'morgan';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';

import usersRouter from './routes/users.js';
import authRouter  from './routes/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectDB } from './db/connection.js';

const app = express();

// ── Security middleware ──────────────────────────────
app.use(helmet());               // security headers
app.use(cors({
  origin:      process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// ── Rate limiting ────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max:      100,               // limit each IP to 100 requests
  message: 'Too many requests, please try again later.',
});
app.use('/api/', limiter);

// ── Request parsing ──────────────────────────────────
app.use(express.json({ limit: '10kb' }));     // JSON body
app.use(express.urlencoded({ extended: true })); // Form data
app.use(morgan('dev'));                        // request logging

// ── Routes ───────────────────────────────────────────
app.use('/api/auth',  authRouter);
app.use('/api/users', usersRouter);

app.get('/health', (req, res) => res.json({ status: 'ok', env: process.env.NODE_ENV }));

// ── 404 handler ──────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: \`Route \${req.method} \${req.path} not found\` });
});

// ── Global error handler ─────────────────────────────
app.use(errorHandler);

// ── Start server ─────────────────────────────────────
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(\`🚀 Server running on port \${PORT}\`));
});`}</pre>

      <h3>Routing — Complete Reference</h3>
      <pre>{`// routes/users.js
import express from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createUserSchema } from '../schemas/user.schema.js';
import * as usersController from '../controllers/users.controller.js';

const router = express.Router();

// GET /api/users — list with pagination, filtering, sorting
router.get('/', requireAuth, usersController.getAll);

// GET /api/users/:id — get one
router.get('/:id', requireAuth, usersController.getOne);

// POST /api/users — create
router.post('/', requireAuth, requireRole('admin'), validate(createUserSchema), usersController.create);

// PATCH /api/users/:id — partial update
router.patch('/:id', requireAuth, usersController.update);

// DELETE /api/users/:id — delete
router.delete('/:id', requireAuth, requireRole('admin'), usersController.remove);

export default router;`}</pre>

      <h3>Controllers Pattern</h3>
      <pre>{`// controllers/users.controller.js
import User from '../models/User.js';
import { AppError } from '../utils/AppError.js';

export async function getAll(req, res, next) {
  try {
    const { page = 1, limit = 10, sort = '-createdAt', role, search } = req.query;

    const filter = {};
    if (role)   filter.role = role;
    if (search) filter.$text = { $search: search };

    const [users, total] = await Promise.all([
      User.find(filter)
          .select('-password')
          .sort(sort)
          .limit(Number(limit))
          .skip((Number(page) - 1) * Number(limit)),
      User.countDocuments(filter),
    ]);

    res.json({
      users,
      pagination: {
        page: Number(page), limit: Number(limit), total,
        pages: Math.ceil(total / Number(limit)),
        hasNext: Number(page) * Number(limit) < total,
      },
    });
  } catch (err) { next(err); }
}

export async function getOne(req, res, next) {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return next(new AppError('User not found', 404));
    res.json(user);
  } catch (err) { next(err); }
}`}</pre>

      <h3>Middleware — Deep Dive</h3>
      <pre>{`// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AppError } from '../utils/AppError.js';

export async function requireAuth(req, res, next) {
  try {
    // 1. Get token from header or cookie
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : req.cookies?.jwt;

    if (!token) return next(new AppError('Not authenticated', 401));

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Check user still exists
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return next(new AppError('User no longer exists', 401));

    // 4. Attach user to request
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') return next(new AppError('Invalid token', 401));
    if (err.name === 'TokenExpiredError') return next(new AppError('Token expired', 401));
    next(err);
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission', 403));
    }
    next();
  };
}

// middleware/errorHandler.js
export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message    = err.isOperational ? err.message : 'Internal Server Error';

  if (process.env.NODE_ENV === 'development') {
    console.error('ERROR:', err);
    return res.status(statusCode).json({ error: message, stack: err.stack });
  }

  res.status(statusCode).json({ error: message });
}`}</pre>

      <h3>Input Validation with Zod</h3>
      <pre>{`npm install zod

// schemas/user.schema.js
import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(50).trim(),
    email: z.string().email().toLowerCase(),
    password: z.string()
      .min(8, 'Min 8 characters')
      .regex(/[A-Z]/, 'Need uppercase letter')
      .regex(/[0-9]/, 'Need number')
      .regex(/[^A-Za-z0-9]/, 'Need special character'),
    role: z.enum(['user', 'admin']).default('user'),
    age: z.number().int().min(13).max(120).optional(),
  }),
});

// middleware/validate.js
export function validate(schema) {
  return (req, res, next) => {
    try {
      schema.parse({ body: req.body, params: req.params, query: req.query });
      next();
    } catch (err) {
      const errors = err.errors.map(e => ({ field: e.path.join('.'), message: e.message }));
      res.status(422).json({ errors });
    }
  };
}`}</pre>

      <h3>JWT Authentication — Full Flow</h3>
      <pre>{`// routes/auth.js
import bcrypt from 'bcryptjs';
import jwt    from 'jsonwebtoken';
import User   from '../models/User.js';

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

function sendToken(user, statusCode, res) {
  const token = signToken(user._id);
  res
    .cookie('jwt', token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge:   7 * 24 * 60 * 60 * 1000,  // 7 days
    })
    .status(statusCode)
    .json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
}

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return next(new AppError('Email already registered', 409));
    const user = await User.create({ name, email, password });
    sendToken(user, 201, res);
  } catch (err) { next(err); }
});

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return next(new AppError('Email and password required', 400));
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError('Invalid email or password', 401));
    }
    sendToken(user, 200, res);
  } catch (err) { next(err); }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('jwt').json({ message: 'Logged out successfully' });
});`}</pre>

      <h3>HTTP Status Codes — Full Reference</h3>
      <pre>{`2xx — Success
  200 OK                  — GET, PUT, PATCH success
  201 Created             — POST success (return new resource)
  204 No Content          — DELETE success (no body)
  206 Partial Content     — file download with range

3xx — Redirection
  301 Moved Permanently   — old URL redirects to new
  302 Found               — temporary redirect
  304 Not Modified        — cached content is still valid

4xx — Client Errors (user's fault)
  400 Bad Request         — invalid request body/params
  401 Unauthorized        — not logged in
  403 Forbidden           — logged in but no permission
  404 Not Found           — resource doesn't exist
  405 Method Not Allowed  — wrong HTTP method
  409 Conflict            — duplicate (email exists)
  410 Gone                — resource permanently deleted
  422 Unprocessable       — validation errors
  429 Too Many Requests   — rate limit exceeded

5xx — Server Errors (our fault)
  500 Internal Server Error — unhandled exception
  502 Bad Gateway           — upstream server error
  503 Service Unavailable   — server overloaded/down
  504 Gateway Timeout       — upstream timeout`}</pre>
    </>),
  },

  {
    title: 'Databases, Deployment & Industry Practices',
    content: (<>
      <h3>MongoDB + Mongoose — Complete Guide</h3>
      <pre>{`npm install mongoose
# Or use MongoDB Atlas (free cloud): mongodb.com/atlas`}</pre>
      <pre>{`// db/connection.js
import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('✅ MongoDB connected');

    mongoose.connection.on('error', err => console.error('DB error:', err));
    mongoose.connection.on('disconnected', () => console.warn('DB disconnected'));
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

// models/User.js
import mongoose from 'mongoose';
import bcrypt   from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String, required: [true, 'Name required'],
    trim: true, minlength: 2, maxlength: 50,
  },
  email: {
    type: String, required: true, unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
  },
  password: {
    type: String, required: true, minlength: 8, select: false,
  },
  role:    { type: String, enum: ['user','admin'], default: 'user' },
  active:  { type: Boolean, default: true },
  avatar:  String,
  bio:     { type: String, maxlength: 500 },
  joinedAt:{ type: Date, default: Date.now },
}, { timestamps: true });

// Index for performance
userSchema.index({ email: 1 });
userSchema.index({ name: 'text', bio: 'text' }); // text search

// Pre-save hook: hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method
userSchema.methods.isPasswordCorrect = async function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Static method
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};

const User = mongoose.model('User', userSchema);
export default User;`}</pre>

      <h3>Advanced MongoDB Queries</h3>
      <pre>{`// CRUD
await User.create({ name, email, password });
await User.insertMany([user1, user2, user3]);

const all   = await User.find({ active: true });
const one   = await User.findById(id);
const one   = await User.findOne({ email });

// Query operators
User.find({ age: { $gt: 18, $lte: 65 } })
User.find({ role: { $in: ['admin', 'moderator'] } })
User.find({ tags: { $all: ['js', 'react'] } })
User.find({ name: /^alice/i })               // regex
User.find({ $text: { $search: 'developer' } }) // text search

// Sorting, limiting, pagination
User.find()
    .sort({ createdAt: -1 })     // newest first
    .limit(10)
    .skip((page - 1) * 10)
    .select('name email avatar -_id')  // include/exclude fields
    .populate('posts', 'title createdAt')  // join

// Update
await User.findByIdAndUpdate(id, { name: 'Bob' }, { new: true, runValidators: true });
await User.updateMany({ active: false }, { $set: { role: 'inactive' } });
await User.findByIdAndUpdate(id, { $push: { tags: 'react' } });  // add to array
await User.findByIdAndUpdate(id, { $pull: { tags: 'php' } });    // remove from array
await User.findByIdAndUpdate(id, { $inc: { loginCount: 1 } });   // increment

// Delete
await User.findByIdAndDelete(id);
await User.deleteMany({ active: false });

// Aggregation pipeline
const stats = await User.aggregate([
  { $match: { active: true } },
  { $group: { _id: '$role', count: { $sum: 1 }, avgAge: { $avg: '$age' } } },
  { $sort: { count: -1 } },
]);`}</pre>

      <h3>Redis — Caching & Sessions</h3>
      <pre>{`npm install ioredis

// cache/redis.js
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

// Cache-aside pattern
export async function getOrCache(key, ttl, fetchFn) {
  try {
    const cached = await redis.get(key);
    if (cached) return JSON.parse(cached);

    const data = await fetchFn();
    await redis.setex(key, ttl, JSON.stringify(data));
    return data;
  } catch {
    return fetchFn(); // fallback to DB on Redis failure
  }
}

// Usage
const users = await getOrCache('users:all', 300, () => User.find());

// Invalidate
await redis.del('users:all');
await redis.del(\`user:\${id}\`);

// Rate limiting
export async function checkRateLimit(ip, limit = 100, window = 60) {
  const key   = \`rate:\${ip}\`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, window);
  return count <= limit;
}

// Session storage
await redis.setex(\`session:\${sessionId}\`, 3600, JSON.stringify(sessionData));
const session = JSON.parse(await redis.get(\`session:\${sessionId}\`));`}</pre>

      <h3>File Uploads with Multer + Cloudinary</h3>
      <pre>{`npm install multer cloudinary multer-storage-cloudinary

// config/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key:    process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// middleware/upload.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:         'devlearn/avatars',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 400, height: 400, crop: 'fill' }],
    public_id: (req, file) => \`\${req.user.id}-\${Date.now()\`,
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new AppError('Only images allowed', 400), false);
    }
    cb(null, true);
  },
});

// Route
router.patch('/me/avatar', requireAuth, upload.single('avatar'), async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: req.file.path },
      { new: true }
    );
    res.json({ avatar: user.avatar });
  } catch (err) { next(err); }
});`}</pre>

      <h3>Email with Nodemailer</h3>
      <pre>{`npm install nodemailer

// utils/email.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

export async function sendEmail({ to, subject, html }) {
  await transporter.sendMail({
    from: \`"DevLearn" <\${process.env.EMAIL_USER}>\`,
    to, subject, html,
  });
}

export async function sendOTP(email, otp) {
  await sendEmail({
    to:      email,
    subject: 'Your DevLearn OTP',
    html: \`
      <h1>Your verification code</h1>
      <p style="font-size:2rem;font-weight:bold;letter-spacing:0.5rem">\${otp}</p>
      <p>This code expires in 10 minutes.</p>
    \`,
  });
}

export async function sendWelcome(user) {
  await sendEmail({
    to:      user.email,
    subject: 'Welcome to DevLearn! 🚀',
    html: \`<h1>Welcome, \${user.name}!</h1><p>Start learning today.</p>\`,
  });
}`}</pre>

      <h3>Testing with Jest</h3>
      <pre>{`npm install --save-dev jest supertest @jest/globals

// tests/auth.test.js
import request from 'supertest';
import app     from '../src/app.js';
import User    from '../src/models/User.js';

beforeEach(async () => {
  await User.deleteMany({});
});

describe('POST /api/auth/register', () => {
  it('registers a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Alice', email: 'alice@test.com', password: 'Secret123!' });

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe('alice@test.com');
    expect(res.body.user.password).toBeUndefined(); // never expose password!
  });

  it('returns 409 for duplicate email', async () => {
    await User.create({ name:'Alice', email:'alice@test.com', password:'Secret123!' });

    const res = await request(app)
      .post('/api/auth/register')
      .send({ name:'Alice', email:'alice@test.com', password:'Secret123!' });

    expect(res.status).toBe(409);
  });
});`}</pre>

      <h3>Deployment — Production Checklist</h3>
      <pre>{`// Environment
NODE_ENV=production        ← MUST set this
DATABASE_URL               ← use connection string with credentials
JWT_SECRET                 ← min 32 random characters
CORS origin                ← set to your actual frontend URL

// Security checklist
✓ helmet() — security headers
✓ cors()   — restrict to your domain only
✓ Rate limiting on all routes
✓ Input validation on all inputs
✓ bcrypt passwords (min 12 rounds in production)
✓ JWT in httpOnly cookies (not localStorage)
✓ HTTPS only — get SSL cert (Let's Encrypt is free)
✓ No sensitive data in logs
✓ .env never committed to git

// Deploy to Render.com (free tier)
1. Push code to GitHub
2. render.com → New → Web Service
3. Connect GitHub repo
4. Build Command: npm install
5. Start Command: node src/index.js
6. Add environment variables
7. Deploy!

// Or Railway.app (even simpler)
npm install -g railway
railway login
railway init
railway up

// Docker (production standard)
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY src ./src
EXPOSE 3000
USER node
CMD ["node", "src/index.js"]`}</pre>

      <h3>API Documentation with Swagger</h3>
      <pre>{`npm install swagger-jsdoc swagger-ui-express

// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
const spec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'DevLearn API', version: '1.0.0' },
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer' }
      }
    }
  },
  apis: ['./src/routes/*.js'],
});

// In route file:
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - name: page
 *         in: query
 *         schema: { type: integer, default: 1 }
 *     responses:
 *       200:
 *         description: List of users
 */`}</pre>
    </>),
  },
]

export default function BackendModule() {
  const { progress, updateProgress } = useAuth()
  const [open, setOpen] = useState(null)
  const sections = progress.backendSections || [false, false, false]
  const pct = progress.backend || 0

  return (
    <>
      <Navbar />
      <div className="module-page">
        <p className="breadcrumb"><Link to="/dashboard">Dashboard</Link> › Backend Development</p>
        <h1 className="module-title">⚙️ Backend Development</h1>
        <p className="module-desc">Build production-ready APIs with Node.js, Express, MongoDB, Redis, and deployment — from zero to industry level.</p>
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <ProgressBar value={pct} color="var(--yellow)" />
        </div>
        <div className="section-list">
          {SECTIONS.map((s, i) => {
            const done = sections[i]; const isOpen = open === i
            return (
              <div className="section-item" key={i}>
                <div className="section-header" onClick={() => setOpen(isOpen ? null : i)}>
                  <div className="section-title-row">
                    <div className="section-num" style={{ background: done ? 'var(--yellow)' : 'var(--bg3)', color: done ? '#000' : 'var(--muted)' }}>{done ? '✓' : i + 1}</div>
                    <span className="section-title">{s.title}</span>
                  </div>
                  <span style={{ color: 'var(--muted)' }}>{isOpen ? '▲' : '▼'}</span>
                </div>
                {isOpen && (
                  <div className="section-body">
                    {s.content}
                    {!done ? (
                      <button className="btn complete-btn" style={{ background: 'var(--yellow-bg)', color: '#fac775', border: '1px solid var(--yellow)' }} onClick={() => updateProgress('backend', i)}>✓ Mark as Complete</button>
                    ) : <p className="success-msg" style={{ marginTop: '1rem' }}>✓ Section completed!</p>}
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div style={{ marginTop: '1.5rem' }}><Link to="/dashboard" className="btn btn-secondary">← Back</Link></div>
      </div>
    </>
  )
}
