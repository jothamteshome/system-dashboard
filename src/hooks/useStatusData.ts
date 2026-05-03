import { useState, useEffect, useCallback } from 'react'
import type { StatusResponse } from '../interfaces/StatusResponse'
import { fetchStatus } from '../services/statusApi'

const REFRESH_INTERVAL_MS = 60_000

interface UseStatusDataResult {
  data: StatusResponse | null
  loading: boolean
  error: string | null
  lastChecked: Date | null
  refresh: () => void
}

export function useStatusData(): UseStatusDataResult {
  const [data, setData] = useState<StatusResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const load = useCallback(async () => {
    try {
      const result = await fetchStatus()
      setData(result)
      setLastChecked(new Date())
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
    const interval = setInterval(() => void load(), REFRESH_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [load])

  return { data, loading, error, lastChecked, refresh: load }
}
