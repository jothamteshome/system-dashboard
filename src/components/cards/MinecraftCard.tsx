import StatusCard from './StatusCard'
import MinecraftBanner from '../banners/MinecraftBanner'
import type { MinecraftServer } from '../../interfaces/StatusResponse'

interface MinecraftCardProps {
  hostname: string
  server: MinecraftServer
}

const MAX_PLAYERS_SHOWN = 5

export default function MinecraftCard({ hostname, server }: MinecraftCardProps) {
  return (
    <StatusCard banner={<MinecraftBanner />}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-sm font-mono text-gray-700 dark:text-gray-300 truncate">{hostname}</h3>
        <span
          className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${
            server.online
              ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
              : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
          }`}
        >
          {server.online ? 'Online' : 'Offline'}
        </span>
      </div>

      {server.online ? (
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Players</span>
            <span className="text-gray-800 dark:text-gray-200 font-medium">
              {server.players.online} / {server.players.max}
            </span>
          </div>

          {server.players.sample.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {server.players.sample.slice(0, MAX_PLAYERS_SHOWN).map(name => (
                <span
                  key={name}
                  className="text-xs bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded"
                >
                  {name}
                </span>
              ))}
              {server.players.sample.length > MAX_PLAYERS_SHOWN && (
                <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded">
                  +{server.players.sample.length - MAX_PLAYERS_SHOWN} more
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Version</span>
            <span className="text-gray-800 dark:text-gray-200">{server.version}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Latency</span>
            <span className="text-gray-800 dark:text-gray-200">{server.latency} ms</span>
          </div>
        </div>
      ) : (
        <p className="text-sm text-red-600 dark:text-red-400 line-clamp-2">
          {/timed?\s*out/i.test(server.error)
            ? 'Server is off — starts automatically when someone joins'
            : server.error}
        </p>
      )}
    </StatusCard>
  )
}
