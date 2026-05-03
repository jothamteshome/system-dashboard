export interface MinecraftPlayers {
  online: number
  max: number
  sample: string[]
}

export interface MinecraftServerOnline {
  online: true
  players: MinecraftPlayers
  version: string
  motd: string
  latency: number
}

export interface MinecraftServerOffline {
  online: false
  error: string
}

export type MinecraftServer = MinecraftServerOnline | MinecraftServerOffline

export interface SiteStatus {
  url: string
  online: boolean
  status_code?: number
  error?: string
}

export interface WatchTogetherSiteStatus {
  frontend: SiteStatus
  backend: SiteStatus
}

export interface Sites {
  'snake-game': SiteStatus
  'pixel-sorter': SiteStatus
  'watch-together': WatchTogetherSiteStatus
}

export interface ContainerStats {
  cpu_percent: string
  memory_usage: string
  memory_limit: string | null
  memory_percent: string
  net_in: string
  net_out: string | null
  block_read: string
  block_write: string | null
  started_at?: string
  restart_count?: number
}

export interface ContainersSuccess {
  [name: string]: ContainerStats
}

export interface ContainersError {
  error: string
}

export type Containers = ContainersSuccess | ContainersError

export interface StatusResponse {
  minecraft: Record<string, MinecraftServer>
  sites: Sites
  containers: Containers
  checked_at: number
}
