import Header from './components/layout/Header'
import StatusPage from './pages/StatusPage'
import { useStatusData } from './hooks/useStatusData'

function App() {
  const { data, loading, error, lastChecked } = useStatusData()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Header lastChecked={lastChecked} />
      <StatusPage data={data} loading={loading} error={error} />
    </div>
  )
}

export default App
