# OctoFit Tracker Frontend - React 19 with Vite

## Configuration for Codespaces and Localhost

This React 19 frontend is configured to work seamlessly in both GitHub Codespaces and local development environments.

### Environment Setup

#### For GitHub Codespaces

The frontend automatically detects the Codespace name and constructs the API URL:

```
https://${CODESPACE_NAME}-8000.app.github.dev
```

The `CODESPACE_NAME` environment variable is injected by GitHub at runtime and becomes available as `import.meta.env.VITE_CODESPACE_NAME`.

#### For Local Development

When running locally:
- Create a `.env.local` file in the `frontend/` directory
- Leave `VITE_CODESPACE_NAME` unset or blank
- The app will automatically fallback to `http://localhost:8000`

#### Example `.env.local`

```env
# GitHub Codespaces (optional - set if testing manual configuration)
# VITE_CODESPACE_NAME=my-codespace-xyz

# For local development, simply leave the above commented or empty
# The app will use http://localhost:8000
```

### Vite Environment Variables

All environment variables must be prefixed with `VITE_` to be exposed to client-side JavaScript.

Access them in React:
```javascript
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
```

### Architecture

#### Main Entry Point (`src/main.jsx`)
- Wraps the app with `BrowserRouter` from react-router-dom
- Enables client-side routing

#### App Component (`src/App.jsx`)
- Constructs API URL based on environment (Codespaces or localhost)
- Provides navigation sidebar with links to all sections
- Renders routes for each section
- Home page displays current API URL for debugging

#### Components

All components follow the same pattern:

1. **Accept `apiUrl` prop** from App
2. **Fetch data on mount** from `/api/{resource}` endpoint
3. **Handle response formats**:
   - Direct array: `[{}, {}]`
   - Paginated: `{ data: [{}, {}], count: 2 }`
4. **Display results** in formatted tables
5. **Handle errors** gracefully with fallback UI

Components created:
- **Users** (`src/components/Users.jsx`) - Lists users
- **Activities** (`src/components/Activities.jsx`) - Lists activities
- **Teams** (`src/components/Teams.jsx`) - Lists teams
- **Leaderboard** (`src/components/Leaderboard.jsx`) - Shows rankings
- **Workouts** (`src/components/Workouts.jsx`) - Lists available workouts

### API Endpoints

All endpoints are under `/api/`:

- `GET /api/users` - Fetch all users
- `GET /api/activities` - Fetch all activities
- `GET /api/teams` - Fetch all teams
- `GET /api/leaderboard` - Fetch leaderboard entries
- `GET /api/workouts` - Fetch available workouts

### Development

#### Install Dependencies
```bash
cd octofit-tracker/frontend
npm install
```

#### Start Development Server
```bash
npm run dev
```

The frontend will be available at:
- **Codespaces**: `https://${CODESPACE_NAME}-5173.app.github.dev`
- **Localhost**: `http://localhost:5173`

#### Build for Production
```bash
npm run build
```

Output goes to `dist/` directory.

### Styling

Uses Bootstrap for styling (configured in Vite config). Add Bootstrap classes to components as needed.

### Fallback Behavior

If `VITE_CODESPACE_NAME` is undefined:
- Frontend uses `http://localhost:8000`
- Works for local development
- Backend must be running on port 8000

### Debugging

1. Check the **Home page** - it displays the current API URL
2. Open **Browser DevTools** - check Console for fetch errors
3. Verify backend is running: `curl http://localhost:8000/api/health`
4. Check environment variables: In browser console, run:
   ```javascript
   console.log(import.meta.env)
   ```

### Error Handling

Components display:
- **Loading state** while fetching
- **Error message** if fetch fails, with API URL for debugging
- **Empty state** if no data is returned
- **Fallback UI** if data format is unexpected

### Response Format Compatibility

Components handle both response formats:

**Format 1: Direct Array**
```json
[
  { "_id": "...", "name": "John" },
  { "_id": "...", "name": "Jane" }
]
```

**Format 2: Paginated Object**
```json
{
  "data": [
    { "_id": "...", "name": "John" },
    { "_id": "...", "name": "Jane" }
  ],
  "count": 2
}
```

### Deployment

For Codespaces deployment:
1. Ensure port 5173 is forwarded (public)
2. Navigate to the Codespace URL with port 5173
3. Frontend automatically finds backend via `CODESPACE_NAME`

For production deployment:
1. Build: `npm run build`
2. Serve the `dist/` directory
3. Set environment variables as needed for your platform
