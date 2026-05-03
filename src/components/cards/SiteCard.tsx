import type { ReactNode } from 'react'
import StatusCard from './StatusCard'
import type { SiteStatus, WatchTogetherSiteStatus } from '../../interfaces/StatusResponse'

interface SiteCardProps {
  name: string
  banner: ReactNode
  site: SiteStatus | WatchTogetherSiteStatus
}

function StatusBadge({ online }: { online: boolean }) {
  return (
    <span
      className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${
        online ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
      }`}
    >
      {online ? 'Online' : 'Offline'}
    </span>
  )
}

function SimpleSiteRow({ label, status }: { label: string; status: SiteStatus }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-200 truncate">{label}</p>
        <a
          href={status.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-gray-300 truncate block"
        >
          {status.url}
        </a>
      </div>
      <StatusBadge online={status.online} />
    </div>
  )
}

function isComposite(site: SiteStatus | WatchTogetherSiteStatus): site is WatchTogetherSiteStatus {
  return 'frontend' in site && 'backend' in site
}

export default function SiteCard({ name, banner, site }: SiteCardProps) {
  return (
    <StatusCard banner={banner}>
      <h3 className="text-sm font-semibold text-gray-300 mb-3">{name}</h3>

      {isComposite(site) ? (
        <div className="space-y-3">
          <SimpleSiteRow label="Frontend" status={site.frontend} />
          <div className="border-t border-gray-700" />
          <SimpleSiteRow label="Backend" status={site.backend} />
        </div>
      ) : (
        <SimpleSiteRow label={name} status={site} />
      )}
    </StatusCard>
  )
}
