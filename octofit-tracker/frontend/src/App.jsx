import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Users from './components/Users'
import Activities from './components/Activities'
import Teams from './components/Teams'
import Leaderboard from './components/Leaderboard'
import Workouts from './components/Workouts'

function App() {
  const [apiUrl, setApiUrl] = useState('')

  useEffect(() => {
    // Build API URL from environment or fallback to localhost
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME
    const url = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev`
      : 'http://localhost:8000'
    setApiUrl(url)
  }, [])

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            🐙 OctoFit Tracker
          </Link>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/users" className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/activities" className="nav-link">
                Activities
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/teams" className="nav-link">
                Teams
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/leaderboard" className="nav-link">
                Leaderboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/workouts" className="nav-link">
                Workouts
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <section className="home">
                <h1>Welcome to OctoFit Tracker</h1>
                <p>
                  API Base URL: <code>{apiUrl || 'Loading...'}</code>
                </p>
                <p>Select a section from the navigation to get started.</p>
              </section>
            }
          />
          <Route path="/users" element={<Users apiUrl={apiUrl} />} />
          <Route path="/activities" element={<Activities apiUrl={apiUrl} />} />
          <Route path="/teams" element={<Teams apiUrl={apiUrl} />} />
          <Route path="/leaderboard" element={<Leaderboard apiUrl={apiUrl} />} />
          <Route path="/workouts" element={<Workouts apiUrl={apiUrl} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
