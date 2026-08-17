import { useState, useEffect } from 'react'

function Workouts({ apiUrl }) {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!apiUrl) return

    const fetchWorkouts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${apiUrl}/api/workouts`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Handle both paginated responses and direct array
        const workoutList = Array.isArray(data) ? data : (data.data || [])
        setWorkouts(workoutList)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch workouts:', err)
        setError(err.message)
        setWorkouts([])
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [apiUrl])

  return (
    <div className="container">
      <h2>Workouts</h2>
      <p>Endpoint: <code>{apiUrl}/api/workouts</code></p>

      {loading && <p className="loading">Loading workouts...</p>}
      
      {error && (
        <div className="error">
          <p>Error: {error}</p>
          <p>Make sure the backend is running at {apiUrl}</p>
        </div>
      )}

      {!loading && workouts.length === 0 && !error && (
        <p className="empty">No workouts found. Add some data to see them here.</p>
      )}

      {!loading && workouts.length > 0 && (
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Difficulty</th>
                <th>Duration (mins)</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id || workout.id}>
                  <td>{workout._id?.substring(0, 8) || workout.id}</td>
                  <td>{workout.workoutType || workout.type || 'N/A'}</td>
                  <td>{workout.difficulty || 'N/A'}</td>
                  <td>{workout.duration || 'N/A'}</td>
                  <td>{workout.description || workout.name || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Workouts
