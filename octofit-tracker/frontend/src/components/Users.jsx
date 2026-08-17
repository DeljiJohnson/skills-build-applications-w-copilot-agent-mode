import { useState, useEffect } from 'react'

function Users({ apiUrl }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!apiUrl) return

    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${apiUrl}/api/users`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Handle both paginated responses and direct array
        const userList = Array.isArray(data) ? data : (data.data || [])
        setUsers(userList)
        setError(null)
      } catch (err) {
        console.error('Failed to fetch users:', err)
        setError(err.message)
        setUsers([])
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [apiUrl])

  return (
    <div className="container">
      <h2>Users</h2>
      <p>Endpoint: <code>{apiUrl}/api/users</code></p>

      {loading && <p className="loading">Loading users...</p>}
      
      {error && (
        <div className="error">
          <p>Error: {error}</p>
          <p>Make sure the backend is running at {apiUrl}</p>
        </div>
      )}

      {!loading && users.length === 0 && !error && (
        <p className="empty">No users found. Add some data to see them here.</p>
      )}

      {!loading && users.length > 0 && (
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id}>
                  <td>{user._id?.substring(0, 8) || user.id}</td>
                  <td>{user.name || 'N/A'}</td>
                  <td>{user.email || 'N/A'}</td>
                  <td>{user.username || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Users
