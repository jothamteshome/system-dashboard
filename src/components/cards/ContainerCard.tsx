import StatusCard from './StatusCard'
import DockerBanner from '../banners/DockerBanner'
import type { ContainerStats } from '../../interfaces/StatusResponse'

interface ContainerCardProps {
  name: string
  stats: ContainerStats
}

function Bar({ percent }: { percent: number }) {
  const clamped = Math.min(100, Math.max(0, percent))
  const color =
    clamped > 80 ? 'bg-red-500' : clamped > 60 ? 'bg-yellow-500' : 'bg-green-500'
  return (
    <div className="h-1.5 w-full bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${clamped}%` }} />
    </div>
  )
}

function uptime(startedAt: string): string {
  const ms = Date.now() - new Date(startedAt).getTime()
  const s = Math.floor(ms / 1000)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ${m % 60}m`
  return `${Math.floor(h / 24)}d ${h % 24}h`
}

function stoppedBadge(status: string | undefined) {
  if (!status) {
    return { label: 'Unknown', className: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300' }
  }
  if (/exited \(0\)/i.test(status)) {
    return { label: 'Stopped', className: 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400' }
  }
  if (/exited/i.test(status)) {
    return { label: 'Crashed', className: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' }
  }
  return { label: 'Unknown', className: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300' }
}

export default function ContainerCard({ name, stats }: ContainerCardProps) {
  if (stats.online === false) {
    const badge = stoppedBadge(stats.status)
    return (
      <StatusCard banner={<DockerBanner />}>
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-sm font-mono text-gray-700 dark:text-gray-300 truncate">{name}</h3>
          <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${badge.className}`}>
            {badge.label}
          </span>
        </div>
        {stats.status && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{stats.status}</p>
        )}
      </StatusCard>
    )
  }

  const cpuNum = parseFloat(stats.cpu_percent)
  const memNum = parseFloat(stats.memory_percent)

  return (
    <StatusCard banner={<DockerBanner />}>
      <h3 className="text-sm font-mono text-gray-700 dark:text-gray-300 mb-3 truncate">{name}</h3>

      <div className="space-y-2 text-sm">
        <div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>CPU</span>
            <span>{stats.cpu_percent}%</span>
          </div>
          <Bar percent={cpuNum} />
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Memory</span>
            <span>{stats.memory_usage}{stats.memory_limit ? ` / ${stats.memory_limit}` : ''}</span>
          </div>
          <Bar percent={memNum} />
        </div>

        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 pt-1 border-t border-gray-300 dark:border-gray-700">
          <span>Net I/O</span>
          <span>{stats.net_in ?? '—'} / {stats.net_out ?? '—'}</span>
        </div>

        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Block I/O</span>
          <span>{stats.block_read ?? '—'} / {stats.block_write ?? '—'}</span>
        </div>

        {stats.started_at && (
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Uptime</span>
            <span>{uptime(stats.started_at)}</span>
          </div>
        )}

        {stats.restart_count !== undefined && stats.restart_count > 0 && (
          <div className="flex justify-between text-xs text-yellow-400">
            <span>Restarts</span>
            <span>{stats.restart_count}</span>
          </div>
        )}
      </div>
    </StatusCard>
  )
}
