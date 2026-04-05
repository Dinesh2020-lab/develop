/* ─── Reset & Base ─────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:        #0e0e0e;
  --bg2:       #161616;
  --bg3:       #1e1e1e;
  --border:    #2a2a2a;
  --text:      #e8e6dc;
  --muted:     #888780;
  --accent:    #1D9E75;
  --accent2:   #9ecfbe;
  --purple:    #7F77DD;
  --purple-bg: #3c3489;
  --orange:    #f09a7b;
  --orange-bg: #712b13;
  --yellow:    #ef9f27;
  --yellow-bg: #634808;

  --radius:    10px;
  --radius-sm: 6px;
  font-size: 15px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: var(--text);
  background: var(--bg);
}

body { min-height: 100vh; }

/* ─── Utility ───────────────────────────────────────────── */
.card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: .5rem;
  padding: .65rem 1.4rem;
  border-radius: var(--radius-sm);
  border: none;
  font-size: .9rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity .15s, transform .1s;
}
.btn:active { transform: scale(.97); }
.btn:disabled { opacity: .45; cursor: not-allowed; }

.btn-primary   { background: var(--accent);  color: #fff; }
.btn-secondary { background: var(--bg3); border: 1px solid var(--border); color: var(--text); }
.btn-purple    { background: var(--purple-bg); color: #cec0f6; border: 1px solid var(--purple); }
.btn-orange    { background: var(--orange-bg); color: #f5c4b3; border: 1px solid var(--orange); }
.btn-yellow    { background: var(--yellow-bg); color: #fac775; border: 1px solid var(--yellow); }
.btn:not(:disabled):hover { opacity: .85; }

.input {
  width: 100%;
  padding: .65rem .9rem;
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-size: .95rem;
  outline: none;
  transition: border-color .15s;
}
.input:focus { border-color: var(--accent); }
.input::placeholder { color: var(--muted); }

label { display: block; font-size: .85rem; color: var(--muted); margin-bottom: .4rem; }

/* ─── Auth pages ─────────────────────────────────────────── */
.auth-wrap {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: radial-gradient(ellipse at top, #1a1030 0%, var(--bg) 55%);
}
.auth-box {
  width: 100%;
  max-width: 420px;
}
.auth-logo { display: flex; align-items: center; gap: .6rem; margin-bottom: 2rem; }
.auth-logo svg { flex-shrink: 0; }
.auth-logo span { font-size: 1.4rem; font-weight: 700; color: var(--accent); }
.auth-title { font-size: 1.5rem; font-weight: 700; margin-bottom: .4rem; }
.auth-sub   { color: var(--muted); font-size: .9rem; margin-bottom: 1.8rem; }
.form-group { margin-bottom: 1.2rem; }
.form-footer { margin-top: 1.6rem; font-size: .85rem; color: var(--muted); text-align: center; }
.form-footer a { color: var(--accent); text-decoration: none; cursor: pointer; }
.error-msg { color: #f08080; font-size: .85rem; margin-top: .4rem; }
.success-msg { color: var(--accent); font-size: .85rem; margin-top: .4rem; }

/* OTP input row */
.otp-row { display: flex; gap: .6rem; justify-content: center; margin: 1.5rem 0; }
.otp-digit {
  width: 48px; height: 56px;
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  outline: none;
  transition: border-color .15s;
}
.otp-digit:focus { border-color: var(--purple); }
.demo-otp-banner {
  background: #1a1030;
  border: 1px solid var(--purple);
  border-radius: var(--radius-sm);
  padding: .75rem 1rem;
  font-size: .82rem;
  color: var(--accent2);
  text-align: center;
  margin-bottom: 1.2rem;
}
.demo-otp-banner strong { color: #cec0f6; letter-spacing: .15rem; }

/* ─── Profile Setup ─────────────────────────────────────── */
.profile-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .8rem;
  margin: 1.5rem 0;
}
.profile-card {
  padding: 1.1rem;
  border-radius: var(--radius-sm);
  border: 2px solid var(--border);
  background: var(--bg3);
  cursor: pointer;
  transition: border-color .15s, background .15s;
  text-align: center;
}
.profile-card:hover { border-color: var(--accent); }
.profile-card.selected { border-color: var(--accent); background: #0f2920; }
.profile-card .icon { font-size: 2rem; margin-bottom: .4rem; }
.profile-card .label { font-weight: 600; font-size: .95rem; }
.profile-card .desc  { font-size: .78rem; color: var(--muted); margin-top: .2rem; }

/* ─── Navbar ─────────────────────────────────────────────── */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  height: 56px;
  background: var(--bg2);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}
.nav-brand { display: flex; align-items: center; gap: .5rem; font-weight: 700; font-size: 1.1rem; color: var(--accent); text-decoration: none; }
.nav-right  { display: flex; align-items: center; gap: 1rem; }
.nav-avatar {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: var(--purple-bg);
  border: 2px solid var(--purple);
  display: flex; align-items: center; justify-content: center;
  font-weight: 700; font-size: .85rem; color: #cec0f6;
  cursor: default;
}
.nav-logout { background: none; border: none; color: var(--muted); cursor: pointer; font-size: .85rem; }
.nav-logout:hover { color: var(--text); }

/* ─── Dashboard ─────────────────────────────────────────── */
.page-wrap { max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem; }
.dashboard-header { margin-bottom: 2rem; }
.dashboard-header h1 { font-size: 1.6rem; font-weight: 700; }
.dashboard-header p  { color: var(--muted); margin-top: .3rem; }
.stats-row { display: flex; gap: 1rem; margin-bottom: 2.5rem; flex-wrap: wrap; }
.stat-chip {
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: .7rem 1.2rem;
  font-size: .85rem;
  color: var(--muted);
  flex: 1; min-width: 140px;
}
.stat-chip strong { display: block; font-size: 1.3rem; color: var(--text); margin-bottom: .1rem; }
.module-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }
.module-card {
  border-radius: var(--radius);
  padding: 1.4rem;
  cursor: pointer;
  transition: transform .15s, box-shadow .15s;
  text-decoration: none;
  display: block;
}
.module-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.4); }
.module-card.purple { background: var(--purple-bg); border: 1px solid var(--purple); }
.module-card.orange { background: var(--orange-bg); border: 1px solid var(--orange); }
.module-card.yellow { background: var(--yellow-bg); border: 1px solid var(--yellow); }
.module-card.green  { background: #085041;            border: 1px solid var(--accent); }
.module-card .mc-icon { font-size: 2rem; margin-bottom: .8rem; }
.module-card .mc-title { font-weight: 700; font-size: 1rem; margin-bottom: .3rem; }
.module-card .mc-sub   { font-size: .82rem; opacity: .7; }

/* ─── Progress Bar ─────────────────────────────────────── */
.progress-wrap { margin-top: .8rem; }
.progress-label { display: flex; justify-content: space-between; font-size: .8rem; color: var(--muted); margin-bottom: .3rem; }
.progress-track {
  height: 6px;
  border-radius: 99px;
  background: rgba(255,255,255,.1);
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  border-radius: 99px;
  background: currentColor;
  transition: width .4s ease;
}

/* ─── Module / Lesson Page ─────────────────────────────── */
.module-page { max-width: 820px; margin: 0 auto; padding: 2rem 1.5rem; }
.breadcrumb { font-size: .82rem; color: var(--muted); margin-bottom: 1.2rem; }
.breadcrumb a { color: var(--accent); text-decoration: none; }
.module-title { font-size: 1.5rem; font-weight: 700; margin-bottom: .3rem; }
.module-desc  { color: var(--muted); margin-bottom: 2rem; }

.section-list { display: flex; flex-direction: column; gap: 1rem; }
.section-item {
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--bg2);
  overflow: hidden;
}
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  cursor: pointer;
  user-select: none;
}
.section-header:hover { background: var(--bg3); }
.section-title-row { display: flex; align-items: center; gap: .75rem; }
.section-num {
  width: 28px; height: 28px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: .8rem; font-weight: 700;
  flex-shrink: 0;
}
.section-title { font-weight: 600; }
.section-check { font-size: 1.1rem; }
.section-body {
  padding: 0 1.2rem 1.2rem;
  font-size: .9rem;
  line-height: 1.8;
  color: #ccc;
  border-top: 1px solid var(--border);
}
.section-body h3 { color: var(--text); margin: 1rem 0 .4rem; font-size: 1rem; }
.section-body p  { margin-bottom: .8rem; }
.section-body ul { margin-left: 1.2rem; margin-bottom: .8rem; }
.section-body li { margin-bottom: .3rem; }
.section-body code {
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: .15rem .4rem;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: .85rem;
  color: var(--accent2);
}
.section-body pre {
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 1rem;
  overflow-x: auto;
  margin: .8rem 0;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: .85rem;
  color: var(--accent2);
  line-height: 1.6;
}
.complete-btn { margin-top: 1rem; }

/* ─── Editor ─────────────────────────────────────────────── */
.editor-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: calc(100vh - 56px);
}
.editor-pane {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border);
  overflow: hidden;
}
.editor-tabs {
  display: flex;
  background: var(--bg2);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.editor-tab {
  padding: .55rem 1.1rem;
  font-size: .85rem;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  color: var(--muted);
  transition: color .15s, border-color .15s;
  user-select: none;
}
.editor-tab.active { color: var(--accent); border-bottom-color: var(--accent); }
.editor-tab:hover:not(.active) { color: var(--text); }
.editor-code-wrap { flex: 1; position: relative; overflow: hidden; }
.editor-lines {
  position: absolute;
  top: 0; left: 0; bottom: 0;
  width: 42px;
  background: var(--bg2);
  border-right: 1px solid var(--border);
  overflow: hidden;
  padding: .8rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: .5rem;
  color: var(--muted);
  font-size: .8rem;
  font-family: 'Fira Code', 'Consolas', monospace;
  line-height: 1.5rem;
  pointer-events: none;
  user-select: none;
}
.editor-textarea {
  position: absolute;
  top: 0; left: 42px; right: 0; bottom: 0;
  background: var(--bg);
  color: var(--text);
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: .85rem;
  line-height: 1.5rem;
  border: none;
  outline: none;
  resize: none;
  padding: .8rem;
  tab-size: 2;
  white-space: pre;
  overflow: auto;
  scrollbar-width: thin;
}
.preview-pane { display: flex; flex-direction: column; }
.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .55rem 1rem;
  background: var(--bg2);
  border-bottom: 1px solid var(--border);
  font-size: .82rem;
  color: var(--muted);
  flex-shrink: 0;
}
.preview-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); display: inline-block; margin-right: .4rem; animation: pulse 2s infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
.preview-iframe { flex: 1; border: none; background: #fff; }

/* ─── Responsive ─────────────────────────────────────────── */
@media (max-width: 640px) {
  .editor-layout { grid-template-columns: 1fr; grid-template-rows: 1fr 1fr; height: auto; }
  .editor-pane { height: 50vh; }
  .preview-pane { height: 50vh; border-top: 1px solid var(--border); }
  .profile-grid { grid-template-columns: 1fr 1fr; }
}

/* ─── Scrollbar ─────────────────────────────────────────── */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 99px; }

/* ─── Navbar desktop links ─────────────────────────────────── */
.nav-links-desktop { display: flex; align-items: center; gap: 1.2rem; }
@media (max-width: 600px) { .nav-links-desktop { display: none; } }

/* ─── Community ─────────────────────────────────────────────── */
.community-wrap { max-width: 860px; margin: 0 auto; padding: 2rem 1.5rem; }
.post-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.2rem 1.4rem;
  margin-bottom: 1rem;
  transition: border-color .15s;
}
.post-card:hover { border-color: #3a3a3a; }
.post-meta { display: flex; align-items: center; gap: .6rem; margin-bottom: .6rem; }
.post-avatar {
  width: 30px; height: 30px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: .75rem; font-weight: 700; flex-shrink: 0;
}
.post-category {
  font-size: .72rem; padding: .15rem .5rem; border-radius: 99px;
  background: var(--bg3); border: 1px solid var(--border); color: var(--muted);
}
.reply-box {
  background: var(--bg3);
  border-radius: var(--radius-sm);
  padding: 1rem;
  margin-top: .8rem;
}

/* ─── Admin ──────────────────────────────────────────────────── */
.admin-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
.admin-stat {
  background: var(--bg2); border: 1px solid var(--border);
  border-radius: var(--radius); padding: 1.2rem;
}
.admin-stat .num { font-size: 2rem; font-weight: 800; margin-bottom: .2rem; }
.admin-stat .lbl { font-size: .82rem; color: var(--muted); }
.admin-table { width: 100%; border-collapse: collapse; font-size: .85rem; }
.admin-table th { text-align: left; padding: .6rem .8rem; color: var(--muted); border-bottom: 1px solid var(--border); font-weight: 600; }
.admin-table td { padding: .6rem .8rem; border-bottom: 1px solid var(--border); }
.admin-table tr:hover td { background: var(--bg3); }

/* ─── User Profile ─────────────────────────────────────────── */
.avatar-picker { display: flex; gap: .5rem; flex-wrap: wrap; margin-top: .5rem; }
.avatar-swatch {
  width: 32px; height: 32px; border-radius: 50%; cursor: pointer;
  border: 2px solid transparent; transition: transform .15s, border-color .15s;
}
.avatar-swatch:hover { transform: scale(1.15); }
.avatar-swatch.selected { border-color: white; transform: scale(1.15); }

/* ─── Console panel ─────────────────────────────────────────── */
.console-panel {
  height: 120px;
  background: #0a0a0a;
  border-top: 1px solid var(--border);
  overflow-y: auto;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: .78rem;
  padding: .5rem .75rem;
  flex-shrink: 0;
}
.console-line { padding: .1rem 0; border-bottom: 1px solid #1a1a1a; }
.console-line.log   { color: #ccc; }
.console-line.error { color: #f08080; }
.console-line.warn  { color: #fac775; }

/* ─── Projects drawer ────────────────────────────────────────── */
.projects-drawer {
  position: absolute; top: 0; left: 0; bottom: 0;
  width: 260px;
  background: var(--bg2);
  border-right: 1px solid var(--border);
  z-index: 50;
  display: flex; flex-direction: column;
  box-shadow: 4px 0 16px rgba(0,0,0,.4);
}
.project-item {
  padding: .65rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
  font-size: .85rem;
}
.project-item:hover { background: var(--bg3); }
.project-item.active { background: #0f2920; color: var(--accent); }
