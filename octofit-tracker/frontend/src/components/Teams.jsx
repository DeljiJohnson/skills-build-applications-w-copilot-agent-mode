import { useState, useEffect } from 'react'

function Teams({ apiUrl }) {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!apiUrl) return

    const fetchTeams = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${apiUrl}/api/teams`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Handle both paginated responses and direct array
        const teamList = Array.isArray(data) ? data : (data.data || [])
        setTeams(teamList)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch teams:', err)
        setError(err.message)
        setTeams([])
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [apiUrl])

  return (
    <div className="container">
      <h2>Teams</h2>
      <p>Endpoint: <code>{apiUrl}/api/teams</code></p>

      {loading && <p className="loading">Loading teams...</p>}
      
      {error && (
        <div className="error">
          <p>Error: {error}</p>
          <p>Make sure the backend is running at {apiUrl}</p>
        </div>
      )}

      {!loading && teams.length === 0 && !error && (
        <p className="empty">No teams found. Add some data to see them here.</p>
      )}

      {!loading && teams.length > 0 && (
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id || team.id}>
                  <td>{team._id?.substring(0, 8) || team.id}</td>
                  <td>{team.name || 'N/A'}</td>
                  <td>{team.description || 'N/A'}</td>
                  <td>
                    {Array.isArray(team.members) 
                      ? team.members.length 
                      : (team.memberCount || 'N/A')}
                  </td>
                  <td>
                    {team.createdAt 
                      ? new Date(team.createdAt).toLocaleDateString() 
                      : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Teams
