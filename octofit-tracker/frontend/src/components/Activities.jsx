import { useState, useEffect } from 'react'

function Activities({ apiUrl }) {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!apiUrl) return

    const fetchActivities = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${apiUrl}/api/activities`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Handle both paginated responses and direct array
        const activityList = Array.isArray(data) ? data : (data.data || [])
        setActivities(activityList)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch activities:', err)
        setError(err.message)
        setActivities([])
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [apiUrl])

  return (
    <div className="container">
      <h2>Activities</h2>
      <p>Endpoint: <code>{apiUrl}/api/activities</code></p>

      {loading && <p className="loading">Loading activities...</p>}
      
      {error && (
        <div className="error">
          <p>Error: {error}</p>
          <p>Make sure the backend is running at {apiUrl}</p>
        </div>
      )}

      {!loading && activities.length === 0 && !error && (
        <p className="empty">No activities found. Add some data to see them here.</p>
      )}

      {!loading && activities.length > 0 && (
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Duration (mins)</th>
                <th>Date</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td>{activity._id?.substring(0, 8) || activity.id}</td>
                  <td>{activity.activityType || activity.type || 'N/A'}</td>
                  <td>{activity.duration || 'N/A'}</td>
                  <td>
                    {activity.date 
                      ? new Date(activity.date).toLocaleDateString() 
                      : 'N/A'}
                  </td>
                  <td>{activity.calories || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Activities
