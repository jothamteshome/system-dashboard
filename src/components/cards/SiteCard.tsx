import type { ReactNode } from 'react'
import StatusCard from './StatusCard'
import type { SiteStatus } from '../../interfaces/StatusResponse'

interface SiteCardProps {
  name: string
  displayName: string
  banner: ReactNode
  site: SiteStatus
}

function StatusBadge({ online }: { online: boolean }) {
  return (
    <span
      className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${
        online
          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
          : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
      }`}
    >
      {online ? 'Online' : 'Offline'}
    </span>
  )
}

export default function SiteCard({ displayName, banner, site }: SiteCardProps) {
  return (
    <StatusCard banner={banner}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">{displayName}</h3>
        <StatusBadge online={site.online} />
      </div>
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 truncate block transition-colors"
      >
        {site.url.replace('https://', '')}
      </a>
    </StatusCard>
  )
}
