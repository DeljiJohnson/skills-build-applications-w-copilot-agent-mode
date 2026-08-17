import { useState, useEffect } from 'react'

function Leaderboard({ apiUrl }) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!apiUrl) return

    const fetchLeaderboard = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${apiUrl}/api/leaderboard`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Handle both paginated responses and direct array
        const leaderboardList = Array.isArray(data) ? data : (data.data || [])
        setEntries(leaderboardList)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err)
        setError(err.message)
        setEntries([])
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [apiUrl])

  return (
    <div className="container">
      <h2>Leaderboard</h2>
      <p>Endpoint: <code>{apiUrl}/api/leaderboard</code></p>

      {loading && <p className="loading">Loading leaderboard...</p>}
      
      {error && (
        <div className="error">
          <p>Error: {error}</p>
          <p>Make sure the backend is running at {apiUrl}</p>
        </div>
      )}

      {!loading && entries.length === 0 && !error && (
        <p className="empty">No leaderboard entries found. Complete activities to appear on the leaderboard.</p>
      )}

      {!loading && entries.length > 0 && (
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
                <th>Activities</th>
                <th>Total Minutes</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={entry._id || entry.id}>
                  <td className="rank">{index + 1}</td>
                  <td>{entry.userId?.name || entry.userName || 'N/A'}</td>
                  <td className="score">{entry.score || entry.points || 0}</td>
                  <td>{entry.activityCount || entry.activitiesCount || 0}</td>
                  <td>{entry.totalMinutes || entry.duration || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Leaderboard
