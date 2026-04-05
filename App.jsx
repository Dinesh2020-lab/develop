import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProgressBar from '../components/ProgressBar'
import { useAuth } from '../context/AuthContext'

const SECTIONS = [
  {
    title: 'React Fundamentals — Zero to Industry Level',
    content: (<>
      <h3>What is React?</h3>
      <p>React is a JavaScript library for building user interfaces. It uses a <strong>component-based</strong> architecture and a <strong>Virtual DOM</strong> to efficiently update only what changed. Created by Facebook (Meta) in 2013, used by Netflix, Airbnb, Uber, Instagram.</p>

      <h3>Why React?</h3>
      <ul>
        <li>Component-based — build small reusable pieces, compose into large UIs</li>
        <li>Virtual DOM — React diffs and updates only changed parts (fast)</li>
        <li>Declarative — describe WHAT the UI should look like, React handles HOW</li>
        <li>Unidirectional data flow — easier to debug, predictable state</li>
        <li>Massive ecosystem — React Router, Redux, React Query, Next.js</li>
      </ul>

      <h3>React vs Vanilla JS</h3>
      <pre>{`// Vanilla JS — imperative (HOW to do it)
const btn = document.getElementById('btn');
btn.addEventListener('click', () => {
  const count = parseInt(document.getElementById('count').textContent);
  document.getElementById('count').textContent = count + 1;
});

// React — declarative (WHAT it should look like)
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`}</pre>

      <h3>Setup — Create a React App</h3>
      <pre>{`# Modern way (Vite — fast)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev

# Project structure
my-app/
├── public/          ← static files
├── src/
│   ├── components/  ← reusable components
│   ├── pages/       ← page components
│   ├── hooks/       ← custom hooks
│   ├── context/     ← global state
│   ├── App.jsx      ← root component
│   └── main.jsx     ← entry point
├── index.html
└── package.json`}</pre>

      <h3>JSX — JavaScript + HTML</h3>
      <pre>{`// JSX compiles to React.createElement calls
const element = <h1 className="title">Hello</h1>;
// becomes:
const element = React.createElement('h1', { className: 'title' }, 'Hello');

// JSX Rules:
// 1. className instead of class
// 2. htmlFor instead of for (labels)
// 3. Self-close empty tags: <img /> <br /> <input />
// 4. Only ONE root element — use <> </> Fragment
// 5. JavaScript inside { curly braces }
// 6. camelCase for event handlers: onClick, onChange, onSubmit

function Card({ title, count, isActive }) {
  return (
    <>
      <h2 className={isActive ? 'active' : ''}>{title}</h2>
      <p>Count: {count}</p>
      <p>Double: {count * 2}</p>
      {count > 0 && <span>Positive!</span>}
      {isActive ? <span>Active</span> : <span>Inactive</span>}
    </>
  );
}`}</pre>

      <h3>Components — Every Pattern</h3>
      <pre>{`// Function component (standard)
function Button({ label, onClick, disabled = false, variant = 'primary' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
    >
      {label}
    </button>
  );
}

// Usage
<Button label="Save" onClick={handleSave} variant="primary" />
<Button label="Delete" onClick={handleDelete} variant="danger" disabled />

// Children prop (composition)
function Card({ title, children, footer }) {
  return (
    <div className="card">
      <div className="card__header">{title}</div>
      <div className="card__body">{children}</div>
      {footer && <div className="card__footer">{footer}</div>}
    </div>
  );
}

// Usage
<Card title="User Profile" footer={<button>Edit</button>}>
  <p>Name: Alice</p>
  <p>Email: alice@example.com</p>
</Card>

// Default export (one per file)
export default Button;

// Named export (multiple per file)
export { Button, IconButton, LinkButton };`}</pre>

      <h3>Props — Passing Data Down</h3>
      <pre>{`// Parent passes, child receives — one-way data flow
function UserCard({ name, age, email, role = 'user', onClick, children }) {
  return (
    <div onClick={onClick}>
      <h2>{name}</h2>
      <p>Age: {age} | Role: {role}</p>
      <a href={\`mailto:\${email}\`}>{email}</a>
      {children}
    </div>
  );
}

// Spread props (use carefully)
const userProps = { name: 'Alice', age: 25, email: 'alice@example.com' };
<UserCard {...userProps} role="admin" />

// PropTypes (runtime type checking)
import PropTypes from 'prop-types';
UserCard.propTypes = {
  name:     PropTypes.string.isRequired,
  age:      PropTypes.number.isRequired,
  email:    PropTypes.string,
  role:     PropTypes.oneOf(['user', 'admin', 'moderator']),
  onClick:  PropTypes.func,
  children: PropTypes.node,
};`}</pre>

      <h3>Rendering Lists & Conditionals</h3>
      <pre>{`const users = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob',   active: false },
  { id: 3, name: 'Carol', active: true },
];

function UserList({ filter }) {
  const filtered = users.filter(u => filter === 'all' || u.active);

  if (filtered.length === 0) {
    return <p className="empty">No users found.</p>;
  }

  return (
    <ul>
      {filtered.map(user => (
        // key MUST be stable, unique, from data (not index)
        <li key={user.id} className={user.active ? 'active' : ''}>
          {user.name}
          {user.active && <span>✓ Active</span>}
        </li>
      ))}
    </ul>
  );
}

// Conditional rendering patterns
{isLoggedIn && <Dashboard />}                    // AND
{isLoggedIn ? <Dashboard /> : <Login />}         // ternary
{error && <ErrorMessage message={error} />}      // show on error
{!loading && data && <DataTable rows={data} />}  // multiple conditions`}</pre>

      <h3>Event Handling</h3>
      <pre>{`function Form() {
  function handleSubmit(e) {
    e.preventDefault();           // prevent page reload
    console.log('Submitted!');
  }

  function handleChange(e) {
    console.log(e.target.value);  // read input value
    console.log(e.target.name);   // read input name
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} name="email" />
      <button onClick={() => console.log('clicked')}>Submit</button>
    </form>
  );
}

// Passing data to handlers
function TodoList({ todos }) {
  function handleDelete(id) {
    console.log('Delete todo:', id);
  }

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}`}</pre>
    </>),
  },

  {
    title: 'Hooks — Complete Reference',
    content: (<>
      <h3>What are Hooks?</h3>
      <p>Hooks are functions that let you "hook into" React features (state, lifecycle, context) from function components. Rules: only call at the top level (not inside loops/conditions), only call from React functions.</p>

      <h3>useState — State Management</h3>
      <pre>{`import { useState } from 'react';

// Basic
const [count, setCount] = useState(0);
setCount(count + 1);           // simple update
setCount(prev => prev + 1);    // functional update (safe with async)

// Lazy initial state (expensive calculation runs once)
const [data, setData] = useState(() => JSON.parse(localStorage.getItem('data') || '[]'));

// Object state
const [user, setUser] = useState({ name: '', email: '', age: 0 });
setUser(prev => ({ ...prev, name: 'Alice' })); // merge — don't lose other fields!

// Array state
const [items, setItems] = useState([]);
setItems(prev => [...prev, newItem]);              // add
setItems(prev => prev.filter(i => i.id !== id));   // remove
setItems(prev => prev.map(i => i.id === id ? {...i, done: true} : i)); // update

// Boolean toggle
const [isOpen, setIsOpen] = useState(false);
setIsOpen(prev => !prev);  // toggle`}</pre>

      <h3>useEffect — Side Effects</h3>
      <pre>{`import { useEffect } from 'react';

// 1. No dependency array — runs after EVERY render
useEffect(() => {
  console.log('Rendered with count:', count);
});

// 2. Empty array [] — runs ONCE on mount
useEffect(() => {
  console.log('Component mounted');
  return () => console.log('Component unmounted');  // cleanup
}, []);

// 3. Dependency array — runs when dependencies change
useEffect(() => {
  document.title = \`\${count} notifications\`;
}, [count]);  // only re-runs if count changes

// 4. Fetching data
useEffect(() => {
  let cancelled = false;  // prevent state update on unmounted component

  async function loadUser() {
    try {
      const res  = await fetch(\`/api/users/\${userId}\`);
      const data = await res.json();
      if (!cancelled) setUser(data);
    } catch (err) {
      if (!cancelled) setError(err.message);
    }
  }

  loadUser();
  return () => { cancelled = true; };  // cleanup
}, [userId]);

// 5. Event listeners
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// 6. Timers
useEffect(() => {
  const id = setInterval(() => setTime(new Date()), 1000);
  return () => clearInterval(id);
}, []);`}</pre>

      <h3>useRef — DOM & Mutable Values</h3>
      <pre>{`import { useRef, useEffect } from 'react';

// DOM reference
function AutoFocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();     // access DOM node
  }, []);

  return <input ref={inputRef} placeholder="Auto-focused" />;
}

// Mutable value without re-render
function StopWatch() {
  const [time, setTime]     = useState(0);
  const intervalRef         = useRef(null);
  const previousTimeRef     = useRef(0);

  function start() {
    intervalRef.current = setInterval(() => setTime(t => t + 1), 1000);
  }
  function stop() {
    clearInterval(intervalRef.current);
    previousTimeRef.current = time;
  }

  return (
    <div>
      <p>{time}s (previously: {previousTimeRef.current}s)</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}

// Forward ref (expose DOM to parent)
const Input = React.forwardRef(({ label, ...props }, ref) => (
  <div>
    <label>{label}</label>
    <input ref={ref} {...props} />
  </div>
));`}</pre>

      <h3>useContext — Global State</h3>
      <pre>{`import { createContext, useContext, useState } from 'react';

// 1. Create context
const ThemeContext = createContext({ theme: 'light', toggle: () => {} });

// 2. Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook (best practice)
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}

// 4. Use anywhere in tree
function Navbar() {
  const { theme, toggle } = useTheme();
  return (
    <nav style={{ background: theme === 'dark' ? '#111' : '#fff' }}>
      <button onClick={toggle}>Toggle Theme</button>
    </nav>
  );
}

// 5. Wrap app
function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <Main />
    </ThemeProvider>
  );
}`}</pre>

      <h3>useReducer — Complex State</h3>
      <pre>{`import { useReducer } from 'react';

// Define actions
const ACTIONS = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET:     'RESET',
  SET:       'SET',
};

// Reducer function (pure — no side effects)
function counterReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT: return { ...state, count: state.count + 1 };
    case ACTIONS.DECREMENT: return { ...state, count: state.count - 1 };
    case ACTIONS.RESET:     return { count: 0 };
    case ACTIONS.SET:       return { count: action.payload };
    default: throw new Error(\`Unknown action: \${action.type}\`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: ACTIONS.INCREMENT })}>+1</button>
      <button onClick={() => dispatch({ type: ACTIONS.DECREMENT })}>-1</button>
      <button onClick={() => dispatch({ type: ACTIONS.SET, payload: 10 })}>Set 10</button>
      <button onClick={() => dispatch({ type: ACTIONS.RESET })}>Reset</button>
    </div>
  );
}`}</pre>

      <h3>useMemo & useCallback — Performance</h3>
      <pre>{`import { useMemo, useCallback, memo } from 'react';

// useMemo — memoize expensive calculation
function ProductList({ products, filter, sortBy }) {
  const processedProducts = useMemo(() => {
    console.log('Filtering and sorting...');  // expensive
    return products
      .filter(p => p.category === filter)
      .sort((a, b) => a[sortBy] > b[sortBy] ? 1 : -1);
  }, [products, filter, sortBy]);  // only recalculates when these change

  return <ul>{processedProducts.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}

// useCallback — stable function reference
function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText]   = useState('');

  // Without useCallback: new function created on EVERY render
  // With useCallback: same reference if count hasn't changed
  const handleCountChange = useCallback((newCount) => {
    setCount(newCount);
    console.log('Count changed:', newCount);
  }, []);  // empty deps = created once

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <ExpensiveChild onCountChange={handleCountChange} />
    </>
  );
}

// memo — skip re-render if props unchanged
const ExpensiveChild = memo(function ExpensiveChild({ onCountChange }) {
  console.log('ExpensiveChild rendered');  // only when props change
  return <button onClick={() => onCountChange(42)}>Set 42</button>;
});`}</pre>

      <h3>Custom Hooks — Reusable Logic</h3>
      <pre>{`// useLocalStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });

  function setStoredValue(val) {
    const toStore = val instanceof Function ? val(value) : val;
    setValue(toStore);
    localStorage.setItem(key, JSON.stringify(toStore));
  }

  return [value, setStoredValue];
}

// useFetch
function useFetch(url) {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// useDebounce
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// useOnClickOutside
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    function listener(e) {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler(e);
    }
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

// useWindowSize
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return size;
}

// Usage
function SearchBox() {
  const [query, setQuery] = useLocalStorage('search', '');
  const debouncedQuery    = useDebounce(query, 500);
  const { data, loading } = useFetch(\`/api/search?q=\${debouncedQuery}\`);
  const { width }         = useWindowSize();

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {loading ? <p>Searching...</p> : data?.map(r => <p key={r.id}>{r.title}</p>)}
      <p>Window width: {width}px</p>
    </div>
  );
}`}</pre>
    </>),
  },

  {
    title: 'Advanced React — Patterns & Industry Practices',
    content: (<>
      <h3>React Router v6</h3>
      <pre>{`npm install react-router-dom

// main.jsx
import { BrowserRouter } from 'react-router-dom';
<BrowserRouter><App /></BrowserRouter>

// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/"        element={<Home />} />
      <Route path="/about"   element={<About />} />
      <Route path="/users"   element={<Users />}>
        <Route index          element={<UsersList />} />      // /users
        <Route path=":userId" element={<UserDetail />} />    // /users/42
      </Route>
      <Route path="/login"   element={<Login />} />
      <Route path="*"        element={<Navigate to="/" />} />  // 404
    </Routes>
  );
}

// Navigation
import { Link, NavLink, useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom';

<Link to="/about">About</Link>
<NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>

function UserDetail() {
  const { userId }   = useParams();         // /users/:userId
  const [params]     = useSearchParams();   // ?tab=posts
  const navigate     = useNavigate();
  const location     = useLocation();

  return (
    <div>
      <p>User ID: {userId}</p>
      <p>Tab: {params.get('tab')}</p>
      <button onClick={() => navigate(-1)}>Back</button>
      <button onClick={() => navigate('/dashboard', { state: { from: location } })}>
        Dashboard
      </button>
    </div>
  );
}

// Protected route pattern
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />`}</pre>

      <h3>State Management — Zustand</h3>
      <pre>{`npm install zustand

// store.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // State
      user:    null,
      cart:    [],
      theme:   'dark',

      // Actions
      setUser:  (user)    => set({ user }),
      logout:   ()        => set({ user: null, cart: [] }),
      addToCart:(item)    => set(state => ({ cart: [...state.cart, item] })),
      removeFromCart: (id) => set(state => ({ cart: state.cart.filter(i => i.id !== id) })),
      toggleTheme: ()     => set(state => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

      // Computed (derived)
      get cartTotal() { return get().cart.reduce((sum, item) => sum + item.price, 0); },
    }),
    { name: 'app-store' }  // persists to localStorage
  )
);

// Usage — no Provider needed!
function Cart() {
  const cart       = useStore(state => state.cart);         // subscribe
  const cartTotal  = useStore(state => state.cartTotal);
  const removeItem = useStore(state => state.removeFromCart);

  return (
    <div>
      {cart.map(item => (
        <div key={item.id}>
          {item.name} — ₹{item.price}
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <p>Total: ₹{cartTotal}</p>
    </div>
  );
}`}</pre>

      <h3>Data Fetching — React Query (TanStack)</h3>
      <pre>{`npm install @tanstack/react-query

// main.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
<QueryClientProvider client={queryClient}><App /></QueryClientProvider>

// Fetching
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function Users() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey:  ['users'],           // cache key
    queryFn:   () => fetch('/api/users').then(r => r.json()),
    staleTime: 5 * 60 * 1000,      // data fresh for 5 minutes
    retry:     3,                   // retry on failure
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError)   return <p>Error: {error.message}</p>;

  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// Mutations (create/update/delete)
function AddUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser) => fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' },
    }).then(r => r.json()),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }); // refetch users
    },
  });

  return (
    <button onClick={() => mutation.mutate({ name: 'Alice', email: 'alice@example.com' })}>
      {mutation.isPending ? 'Adding...' : 'Add User'}
    </button>
  );
}`}</pre>

      <h3>Forms — React Hook Form</h3>
      <pre>{`npm install react-hook-form zod @hookform/resolvers

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Validation schema
const schema = z.object({
  name:     z.string().min(2, 'Name too short').max(50),
  email:    z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters')
             .regex(/[A-Z]/, 'Need uppercase')
             .regex(/[0-9]/, 'Need number'),
  age:      z.number().min(18, 'Must be 18+').max(120),
});

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit(data) {
    await createUser(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      {errors.name && <p className="error">{errors.name.message}</p>}

      <input {...register('email')} type="email" placeholder="Email" />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <input {...register('password')} type="password" placeholder="Password" />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Register'}
      </button>
    </form>
  );
}`}</pre>

      <h3>Performance Patterns</h3>
      <pre>{`// 1. Code splitting — lazy load routes
import { lazy, Suspense } from 'react';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile    = lazy(() => import('./pages/Profile'));

<Suspense fallback={<div>Loading...</div>}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile"   element={<Profile />} />
  </Routes>
</Suspense>

// 2. Virtualization — render only visible items (long lists)
npm install @tanstack/react-virtual

// 3. Image optimization
<img src={src} loading="lazy" decoding="async" alt={alt} />

// 4. Avoid unnecessary re-renders
// - Use memo() for expensive child components
// - Use useCallback for handler props
// - Use useMemo for expensive computations
// - Keep state as local as possible
// - Split context into smaller contexts

// 5. Profiling
// React DevTools → Profiler tab
// Highlight re-renders, find bottlenecks`}</pre>

      <h3>Error Boundaries</h3>
      <pre>{`// Class component (required for error boundaries)
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Error caught:', error, info.componentStack);
    // logErrorToService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <Dashboard />
</ErrorBoundary>`}</pre>

      <h3>Next.js — Production React</h3>
      <pre>{`# Create Next.js app
npx create-next-app@latest my-app
cd my-app && npm run dev

# File-based routing (App Router)
app/
  page.jsx          → /
  about/page.jsx    → /about
  users/
    page.jsx        → /users
    [id]/page.jsx   → /users/42
  layout.jsx        → shared layout
  loading.jsx       → loading UI
  error.jsx         → error UI
  not-found.jsx     → 404

// Server Component (default — no 'use client')
async function UsersPage() {
  const users = await fetch('https://api.example.com/users').then(r => r.json());
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// Client Component (interactive)
'use client';
import { useState } from 'react';
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c+1)}>{count}</button>;
}

// API Routes (app/api/users/route.js)
export async function GET() {
  const users = await db.users.findAll();
  return Response.json(users);
}
export async function POST(request) {
  const body = await request.json();
  const user = await db.users.create(body);
  return Response.json(user, { status: 201 });
}`}</pre>

      <h3>Testing React Components</h3>
      <pre>{`npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

// Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('renders with label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const mockClick = vi.fn();
    render(<Button label="Click" onClick={mockClick} />);
    fireEvent.click(screen.getByText('Click'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button label="Save" onClick={() => {}} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});`}</pre>

      <h3>Industry Best Practices</h3>
      <pre>{`// File structure (feature-based, scales well)
src/
  features/
    auth/
      components/   LoginForm, RegisterForm
      hooks/        useAuth, useLogin
      api/          authApi.js
      index.js      (public API)
    users/
      components/   UserCard, UserList
      hooks/        useUsers
      api/          usersApi.js
  shared/
    components/     Button, Input, Modal
    hooks/          useDebounce, useLocalStorage
    utils/          formatDate, formatCurrency
  app/
    App.jsx
    Router.jsx
    store.js

// Naming conventions
PascalCase  → Components (Button.jsx, UserCard.jsx)
camelCase   → hooks, utils, variables (useAuth, formatDate)
kebab-case  → CSS classes (btn-primary, user-card)
UPPER_CASE  → Constants (API_URL, MAX_RETRIES)

// Key principles
✓ Keep components small and focused (< 200 lines)
✓ Lift state up when multiple components need it
✓ Colocate state as close to where it's used as possible
✓ Separate business logic from UI (custom hooks)
✓ Type with TypeScript for large projects
✓ Write tests for critical business logic
✓ Use React DevTools profiler to find bottlenecks
✓ Accessibility: use semantic HTML, ARIA, keyboard nav`}</pre>
    </>),
  },
]

export default function ReactModule() {
  const { progress, updateProgress } = useAuth()
  const [open, setOpen] = useState(null)
  const sections = progress.reactSections || [false, false, false]
  const pct = progress.react || 0

  return (
    <>
      <Navbar />
      <div className="module-page">
        <p className="breadcrumb"><Link to="/dashboard">Dashboard</Link> › React.js</p>
        <h1 className="module-title">⚛️ React.js</h1>
        <p className="module-desc">Build modern, interactive UIs — from fundamentals to production-ready industry patterns.</p>
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <ProgressBar value={pct} color="var(--purple)" />
        </div>
        <div className="section-list">
          {SECTIONS.map((s, i) => {
            const done = sections[i]; const isOpen = open === i
            return (
              <div className="section-item" key={i}>
                <div className="section-header" onClick={() => setOpen(isOpen ? null : i)}>
                  <div className="section-title-row">
                    <div className="section-num" style={{ background: done ? 'var(--purple)' : 'var(--bg3)', color: done ? '#fff' : 'var(--muted)' }}>{done ? '✓' : i + 1}</div>
                    <span className="section-title">{s.title}</span>
                  </div>
                  <span style={{ color: 'var(--muted)' }}>{isOpen ? '▲' : '▼'}</span>
                </div>
                {isOpen && (
                  <div className="section-body">
                    {s.content}
                    {!done ? (
                      <button className="btn complete-btn" style={{ background: 'var(--purple-bg)', color: '#cec0f6', border: '1px solid var(--purple)' }} onClick={() => updateProgress('react', i)}>✓ Mark as Complete</button>
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
