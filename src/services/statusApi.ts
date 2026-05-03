import type { StatusResponse } from '../interfaces/StatusResponse'

const API_URL = import.meta.env.VITE_APP_STATUS_API_URL as string

export async function fetchStatus(): Promise<StatusResponse> {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error(`Status API returned ${response.status}`)
  }
  const data: unknown = await response.json()
  return data as StatusResponse
}
