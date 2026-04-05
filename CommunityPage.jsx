import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProgressBar from '../components/ProgressBar'
import { useAuth } from '../context/AuthContext'

const SECTIONS = [
  {
    title: 'Git Fundamentals — Zero to Industry Level',
    content: (<>
      <h3>What is Git?</h3>
      <p>Git is a <strong>distributed version control system</strong> that tracks every change to your code. It lets you go back to any version, work in parallel via branches, collaborate with teams, and understand the full history of a project. Created by Linus Torvalds in 2005 (same person who created Linux).</p>

      <h3>Why Git?</h3>
      <ul>
        <li>Full history of every change — who did what, when, and why</li>
        <li>Branching — work on features without breaking main code</li>
        <li>Collaboration — multiple developers on the same codebase</li>
        <li>Backup — your code exists on multiple machines</li>
        <li>Industry standard — every company uses Git</li>
      </ul>

      <h3>Install & Configure</h3>
      <pre>{`# Download from git-scm.com

# Check version
git --version

# Configure identity (REQUIRED — one time setup)
git config --global user.name  "Your Name"
git config --global user.email "you@example.com"

# Default branch name
git config --global init.defaultBranch main

# Default editor
git config --global core.editor "code --wait"  # VS Code
git config --global core.editor "nano"          # nano

# View all config
git config --list
git config user.name     # check specific setting`}</pre>

      <h3>Core Concepts</h3>
      <pre>{`Working Directory  — files you're editing right now
Staging Area       — files ready to be committed (git add)
Repository         — committed history (.git folder)
Remote             — copy of repo on GitHub/GitLab/Bitbucket

Flow:
  Edit file → git add → git commit → git push
  Working    Staging   Repository  Remote`}</pre>

      <h3>Starting a Repository</h3>
      <pre>{`# New project
mkdir my-project && cd my-project
git init                    # creates .git folder

# From GitHub
git clone https://github.com/user/repo.git
git clone https://github.com/user/repo.git my-folder  # custom folder name
git clone --depth 1 https://github.com/user/repo.git  # shallow clone (faster)`}</pre>

      <h3>The Daily Git Workflow</h3>
      <pre>{`# 1. Check what's changed
git status                  # overview
git diff                    # exact changes in working dir
git diff --staged           # exact changes in staging area

# 2. Stage files
git add filename.js         # stage one file
git add src/                # stage a folder
git add *.js                # stage all .js files
git add .                   # stage ALL changes (use carefully)
git add -p                  # interactively stage chunks

# 3. Commit
git commit -m "feat: add login page"
git commit -m "fix: button not responding on mobile"
git commit --amend          # modify last commit message

# 4. View history
git log                     # full log
git log --oneline           # compact (one line per commit)
git log --oneline --graph   # visual branch tree
git log --author="Alice"    # filter by author
git log --since="2 weeks"   # filter by date
git show abc1234            # see a specific commit
git show HEAD               # see the last commit`}</pre>

      <h3>Undoing Changes</h3>
      <pre>{`# Working directory
git restore filename.js          # undo unsaved changes to file
git restore .                    # undo all unsaved changes
git clean -fd                    # delete untracked files/folders

# Staging area
git restore --staged filename.js # unstage a file (keep changes)
git reset HEAD filename.js       # older syntax (same effect)

# Committed changes
git revert abc1234               # create NEW commit that undoes abc1234 (safe)
git reset HEAD~1                 # undo last commit, keep changes staged
git reset --soft HEAD~1          # undo last commit, keep changes in working dir
git reset --hard HEAD~1          # undo last commit, DISCARD all changes (dangerous!)

# Recover a deleted file
git checkout HEAD -- filename.js

# Stash — save changes temporarily
git stash                        # save current work
git stash push -m "work in progress on login"
git stash list                   # see all stashes
git stash pop                    # restore most recent stash (removes it)
git stash apply stash@{1}        # apply specific stash (keeps it)
git stash drop stash@{0}         # delete a stash
git stash clear                  # delete all stashes`}</pre>

      <h3>.gitignore — What Not to Track</h3>
      <pre>{`# Create .gitignore in root of project
# Each line = a pattern to ignore

# Dependencies
node_modules/
vendor/

# Build output
dist/
build/
.next/
out/

# Environment files (NEVER commit secrets!)
.env
.env.local
.env.production
*.pem

# Editor files
.vscode/settings.json
.idea/
*.swp
*.swo

# OS files
.DS_Store     # macOS
Thumbs.db     # Windows

# Logs
*.log
npm-debug.log*

# Coverage
coverage/
.nyc_output/

# Tip: gitignore.io generates templates for any project type`}</pre>

      <h3>Viewing & Comparing</h3>
      <pre>{`git log --oneline --all --graph    # full visual history

# Compare commits
git diff HEAD~3 HEAD               # last 3 commits
git diff main feature/login        # two branches
git diff abc123 def456             # two specific commits

# Search
git log --grep="login"             # commits with "login" in message
git log -S "function handleClick"  # commits that added/removed this code
git blame filename.js              # who changed each line, when
git bisect start                   # binary search for bug (advanced)`}</pre>
    </>),
  },

  {
    title: 'Branching, Merging & Collaboration',
    content: (<>
      <h3>Branches — Working in Parallel</h3>
      <p>Branches let you work on features, bug fixes, or experiments without affecting the main codebase. Think of them as parallel universes for your code.</p>
      <pre>{`# View branches
git branch                    # local branches (* = current)
git branch -a                 # all (including remote)
git branch -v                 # with last commit message

# Create & switch
git checkout -b feature/user-auth     # create + switch (classic)
git switch -c feature/user-auth       # modern syntax (same)
git switch main                       # switch to existing branch
git checkout main                     # classic syntax

# Rename & delete
git branch -m old-name new-name       # rename
git branch -d feature/done            # safe delete (must be merged)
git branch -D feature/abandoned       # force delete (unmerged)`}</pre>

      <h3>Merging</h3>
      <pre>{`# Always switch to the RECEIVING branch first, then merge
git switch main
git merge feature/user-auth           # merge feature into main

# Merge types:
# Fast-forward: no new commits on main → just moves pointer forward
# 3-way merge:  main has new commits → creates a merge commit

# Prevent fast-forward (always create merge commit)
git merge feature/login --no-ff -m "Merge login feature"

# Abort a merge (if conflicts are too complex)
git merge --abort

# Check if branch is merged
git branch --merged    # branches already merged into current
git branch --no-merged # branches NOT yet merged`}</pre>

      <h3>Merge Conflicts — Step by Step</h3>
      <pre>{`# Conflicts happen when two branches changed the same lines

# You'll see markers in the file:
<<<<<<< HEAD           ← your version (current branch)
  const color = "blue";
=======                ← separator
  const color = "green";
>>>>>>> feature/colors ← incoming version

# How to resolve:
# 1. Open the conflicted file in your editor
# 2. Decide what the code should look like
# 3. Remove ALL conflict markers (<<<, ===, >>>)
# 4. Stage the resolved file
git add filename.js
# 5. Complete the merge
git commit

# VS Code has a built-in merge editor (Accept Current / Incoming / Both)
# GitLens extension makes conflicts much easier to manage`}</pre>

      <h3>Rebasing — Cleaner History</h3>
      <pre>{`# Rebase = replay your commits on top of another branch
git switch feature/login
git rebase main              # replay feature commits on top of main

# Interactive rebase — rewrite history
git rebase -i HEAD~3         # edit last 3 commits

# In the editor you'll see:
pick abc123 Add login form
pick def456 Fix typo
pick ghi789 Add validation

# Change 'pick' to:
# reword  — change commit message
# squash  — combine with previous commit
# fixup   — combine but discard this message
# drop    — delete commit entirely

# GOLDEN RULE: Never rebase shared/public branches!
# Rebase rewrites history — safe only on your local branch`}</pre>

      <h3>Remote Repositories</h3>
      <pre>{`# View remotes
git remote -v                           # list all remotes

# Add remote
git remote add origin https://github.com/user/repo.git
git remote add upstream https://github.com/original/repo.git  # for forks

# Push
git push -u origin main                 # first push (sets upstream)
git push                                # subsequent pushes
git push origin feature/login          # push a branch
git push --force-with-lease            # safe force push (rebase workflow)
git push origin --delete old-branch    # delete remote branch
git push --tags                         # push all tags

# Pull
git pull                                # fetch + merge
git pull --rebase                       # fetch + rebase (cleaner)
git pull origin main                    # pull specific branch

# Fetch (download without merging)
git fetch origin                        # fetch all branches
git fetch --all                         # fetch all remotes
git diff main origin/main              # compare with remote`}</pre>

      <h3>Tags — Marking Releases</h3>
      <pre>{`# Lightweight tag
git tag v1.0.0

# Annotated tag (recommended — includes message)
git tag -a v1.0.0 -m "First stable release"
git tag -a v1.2.0 abc1234 -m "Tag old commit"  # tag past commit

# View tags
git tag                   # list all
git tag -l "v1.*"         # filter
git show v1.0.0           # see tag details

# Push tags
git push origin v1.0.0    # single tag
git push origin --tags    # all tags

# Delete tag
git tag -d v1.0.0         # local
git push origin --delete v1.0.0  # remote`}</pre>

      <h3>GitHub — Pull Requests & Collaboration</h3>
      <pre>{`# Standard team workflow:

# 1. Pull latest main
git pull origin main

# 2. Create feature branch
git switch -c feature/payment-gateway

# 3. Code + commit often
git add -p                    # stage selectively
git commit -m "feat: add Razorpay integration"
git commit -m "feat: add payment success/fail handlers"

# 4. Keep branch up to date with main
git fetch origin
git rebase origin/main        # or: git merge origin/main

# 5. Push branch
git push -u origin feature/payment-gateway

# 6. Open Pull Request on GitHub
#    - Write clear description
#    - Link to issue (#42)
#    - Request reviewers
#    - Add labels, milestone

# 7. Address review feedback
git commit -m "fix: address PR review comments"
git push

# 8. Merge PR on GitHub (Squash and Merge recommended for clean history)

# 9. Delete branch + pull main
git switch main && git pull
git branch -d feature/payment-gateway`}</pre>

      <h3>Good Commit Messages</h3>
      <pre>{`# Conventional Commits format (industry standard)
type(scope): short description

# Types:
feat     — new feature
fix      — bug fix
docs     — documentation only
style    — formatting (no logic change)
refactor — code restructure (no feature/fix)
perf     — performance improvement
test     — adding/fixing tests
chore    — build, config, dependencies
ci       — CI/CD changes
revert   — revert a previous commit

# Examples:
git commit -m "feat: add OTP email verification"
git commit -m "fix: login button unresponsive on iOS"
git commit -m "docs: update API documentation"
git commit -m "refactor(auth): extract token logic to useAuth hook"
git commit -m "chore: upgrade react to v19"

# Multi-line commit (for complex changes)
git commit
# In editor:
feat(payment): integrate Razorpay payment gateway

- Add Razorpay checkout component
- Handle payment success/failure callbacks
- Store payment ID in user profile
- Add retry logic for failed payments

Closes #142`}</pre>
    </>),
  },

  {
    title: 'GitHub Advanced — CI/CD & Industry Practices',
    content: (<>
      <h3>GitHub Actions — CI/CD Automation</h3>
      <p>GitHub Actions lets you automate workflows — run tests, build, deploy whenever you push code. Workflows live in <code>.github/workflows/</code>.</p>
      <pre>{`# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    name: Test
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18, 20]  # test on multiple versions

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build`}</pre>

      <pre>{`# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'npm' }
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}`}</pre>

      <h3>GitHub Secrets & Environment Variables</h3>
      <pre>{`# Store secrets in GitHub:
# Repo → Settings → Secrets and variables → Actions → New secret

# Use in workflow:
env:
  DATABASE_URL: \${{ secrets.DATABASE_URL }}
  API_KEY: \${{ secrets.API_KEY }}

steps:
  - run: npm run deploy
    env:
      DEPLOY_TOKEN: \${{ secrets.DEPLOY_TOKEN }}`}</pre>

      <h3>Branch Protection Rules</h3>
      <pre>{`# Protect main branch on GitHub:
# Repo → Settings → Branches → Add rule → main

Recommended settings:
✓ Require pull request before merging
✓ Require at least 1 approving review
✓ Dismiss stale approvals when new commits are pushed
✓ Require status checks to pass (CI must be green)
✓ Require branches to be up to date before merging
✓ Do not allow bypassing above settings`}</pre>

      <h3>Git Aliases — Work Faster</h3>
      <pre>{`# Add to ~/.gitconfig or run as commands:
git config --global alias.st    "status"
git config --global alias.co    "checkout"
git config --global alias.br    "branch"
git config --global alias.sw    "switch"
git config --global alias.lg    "log --oneline --graph --decorate --all"
git config --global alias.last  "log -1 HEAD"
git config --global alias.undo  "reset HEAD~1 --mixed"
git config --global alias.unstage "restore --staged"

# Now you can type:
git st      # instead of git status
git lg      # beautiful one-line graph log
git undo    # undo last commit
git sw main # switch to main`}</pre>

      <h3>Advanced Git Commands</h3>
      <pre>{`# Cherry pick — apply specific commit to another branch
git cherry-pick abc1234             # apply one commit
git cherry-pick abc1234..def5678    # range of commits

# Reflog — recover "lost" commits
git reflog                          # every action ever taken
git reset --hard HEAD@{3}          # go back to 3 actions ago

# Submodules — repo inside a repo
git submodule add https://github.com/user/lib.git libs/mylib
git submodule update --init --recursive

# Worktree — multiple branches checked out simultaneously
git worktree add ../hotfix hotfix/critical-bug
# Work in ../hotfix, commit there, then remove
git worktree remove ../hotfix

# Archive — export repo as zip (no .git)
git archive --format=zip HEAD > project.zip

# Maintenance
git gc           # garbage collection (cleanup)
git fsck         # verify integrity
git count-objects -vH  # repo size stats`}</pre>

      <h3>Git Flow — Branching Strategy</h3>
      <pre>{`# Git Flow — structured workflow for releases

Branches:
  main      — production code only (tagged releases)
  develop   — integration branch for features
  feature/* — new features (branch from develop)
  release/* — release preparation (branch from develop)
  hotfix/*  — urgent production fixes (branch from main)

Workflow:
# New feature
git switch -c feature/user-auth develop
# ... work ...
git switch develop
git merge --no-ff feature/user-auth
git branch -d feature/user-auth

# Release
git switch -c release/1.2.0 develop
# fix bugs only
git switch main
git merge --no-ff release/1.2.0
git tag -a v1.2.0 -m "Version 1.2.0"
git switch develop
git merge --no-ff release/1.2.0

# Hotfix
git switch -c hotfix/critical-login-bug main
# fix bug
git switch main
git merge --no-ff hotfix/critical-login-bug
git tag -a v1.2.1
git switch develop
git merge --no-ff hotfix/critical-login-bug`}</pre>

      <h3>Trunk-Based Development (Modern Alternative)</h3>
      <pre>{`# Simpler, faster CI/CD approach used by Google, Facebook

Rules:
1. One main branch (trunk/main) — always deployable
2. Short-lived feature branches (< 2 days)
3. Push small commits frequently
4. Feature flags instead of long-lived branches
5. CI runs on every commit

Benefits:
✓ Less merge conflicts
✓ Faster feedback loop
✓ Continuous deployment friendly
✓ Simpler to understand`}</pre>

      <h3>Monorepo with Git</h3>
      <pre>{`# Monorepo = multiple projects in one Git repo
# Used by Google, Meta, Microsoft, Airbnb

my-company/
  packages/
    frontend/   ← React app
    backend/    ← Node.js API
    mobile/     ← React Native app
    shared/     ← shared utilities/types
  package.json  ← root workspace config

# npm workspaces
{
  "workspaces": ["packages/*"]
}

# Tools for monorepos:
Turborepo  — build system (by Vercel)
Nx         — full monorepo framework
Lerna      — package publishing
PNPM       — efficient package manager for monorepos`}</pre>

      <h3>GitHub Features — Full Reference</h3>
      <pre>{`Issues        — bug reports, feature requests
Pull Requests — code review, merge changes
Discussions   — Q&A, announcements
Projects      — kanban board, roadmap
Wiki          — documentation
Releases      — tagged versions with release notes
Pages         — free static site hosting (github.io)
Codespaces    — cloud development environment
Actions       — CI/CD automation
Packages      — npm/Docker registry
Security      — Dependabot, CodeQL scanning

# Useful GitHub shortcuts
t  — file search
b  — blame view
.  — open in VS Code web editor
w  — branch switcher
l  — line reference`}</pre>

      <h3>Industry Git Practices</h3>
      <pre>{`✓ Commit often, push daily — small, focused commits
✓ Write meaningful commit messages (Conventional Commits)
✓ Never commit secrets — use .env + .gitignore
✓ Review your diff before committing (git diff --staged)
✓ Pull before you push — avoid conflicts
✓ Use branches for EVERYTHING (even small changes)
✓ Delete merged branches — keep repo clean
✓ Code review every PR — at least 1 reviewer
✓ Squash commits before merging to main
✓ Tag every release with semantic versioning
✓ Protect your main branch
✓ Run CI on every PR — tests must pass before merge`}</pre>
    </>),
  },
]

export default function GitModule() {
  const { progress, updateProgress } = useAuth()
  const [open, setOpen] = useState(null)
  const sections = progress.gitSections || [false, false, false]
  const pct = progress.git || 0

  return (
    <>
      <Navbar />
      <div className="module-page">
        <p className="breadcrumb"><Link to="/dashboard">Dashboard</Link> › Git & GitHub</p>
        <h1 className="module-title">🌿 Git & GitHub</h1>
        <p className="module-desc">Master version control — from daily commands to CI/CD pipelines and team workflows.</p>
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <ProgressBar value={pct} color="var(--accent)" />
        </div>
        <div className="section-list">
          {SECTIONS.map((s, i) => {
            const done = sections[i]; const isOpen = open === i
            return (
              <div className="section-item" key={i}>
                <div className="section-header" onClick={() => setOpen(isOpen ? null : i)}>
                  <div className="section-title-row">
                    <div className="section-num" style={{ background: done ? 'var(--accent)' : 'var(--bg3)', color: done ? '#fff' : 'var(--muted)' }}>{done ? '✓' : i + 1}</div>
                    <span className="section-title">{s.title}</span>
                  </div>
                  <span style={{ color: 'var(--muted)' }}>{isOpen ? '▲' : '▼'}</span>
                </div>
                {isOpen && (
                  <div className="section-body">
                    {s.content}
                    {!done ? (
                      <button className="btn btn-primary complete-btn" onClick={() => updateProgress('git', i)}>✓ Mark as Complete</button>
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
