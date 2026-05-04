import HeroHeader from './components/layout/HeroHeader'
import StatusPage from './pages/StatusPage'
import { useStatusData } from './hooks/useStatusData'

function App() {
  const { data, loading, error, lastChecked, refresh } = useStatusData()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-ash-900 text-gray-900 dark:text-gray-100">
      <HeroHeader lastChecked={lastChecked} refresh={refresh} loading={loading} />
      <StatusPage data={data} loading={loading} error={error} />
    </div>
  )
}

export default App
