import type { StatusResponse, ContainersError, ContainersSuccess } from '../interfaces/StatusResponse'
import Section from '../components/layout/Section'
import MinecraftCard from '../components/cards/MinecraftCard'
import SiteCard from '../components/cards/SiteCard'
import ContainerCard from '../components/cards/ContainerCard'
import PixelBanner from '../components/banners/PixelBanner'
import CinemaBanner from '../components/banners/CinemaBanner'
import SnakeBanner from '../components/banners/SnakeBanner'

interface StatusPageProps {
  data: StatusResponse | null
  loading: boolean
  error: string | null
}

function isContainersError(c: ContainersError | ContainersSuccess): c is ContainersError {
  return 'error' in c
}

const SITE_DISPLAY_NAMES: Record<string, string> = {
  'snake-game':     'Snake Game',
  'pixel-sorter':   'Pixel Sorter',
  'watch-together': 'Watch Together',
}

const API_DISPLAY_NAMES: Record<string, string> = {
  'watch-together': 'Watch Together API',
}

function siteBanner(name: string) {
  if (name === 'snake-game') return <SnakeBanner />
  if (name === 'pixel-sorter') return <PixelBanner />
  return <CinemaBanner />
}

function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 shadow-md animate-pulse">
      <div className="h-14 bg-gray-200 dark:bg-gray-800" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  )
}

export default function StatusPage({ data, loading, error }: StatusPageProps) {

  if (error) {
    return (
      <div className="max-w-8xl mx-auto px-6 py-12 text-center">
        <p className="text-red-600 dark:text-red-400 text-sm">Failed to load status data: {error}</p>
      </div>
    )
  }

  if (loading || !data) {
    return (
      <main className="max-w-8xl mx-auto px-6 py-8">
        <Section title="APIs" storageKey="apis">
          {[<SkeletonCard key={0} />]}
        </Section>
        <Section title="Sites" storageKey="sites">
          {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
        </Section>
        <Section title="Minecraft" storageKey="minecraft">
          {[<SkeletonCard key={0} />]}
        </Section>
        <Section title="Infrastructure" storageKey="infrastructure">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </Section>
      </main>
    )
  }

  const containersHaveError = isContainersError(data.containers)

  return (
    <main className="max-w-8xl mx-auto px-6 py-8">
      {/* APIs */}
      <Section title="APIs" storageKey="apis">
        {Object.entries(data.apis).map(([name, site]) => (
          <SiteCard
            key={name}
            name={name}
            displayName={API_DISPLAY_NAMES[name] ?? name}
            banner={<CinemaBanner />}
            site={site}
          />
        ))}
      </Section>

      {/* Sites */}
      <Section title="Sites" storageKey="sites">
        {Object.entries(data.sites).map(([name, site]) => (
          <SiteCard
            key={name}
            name={name}
            displayName={SITE_DISPLAY_NAMES[name] ?? name}
            banner={siteBanner(name)}
            site={site}
          />
        ))}
      </Section>

      {/* Minecraft */}
      <Section title="Minecraft" storageKey="minecraft">
        {Object.entries(data.minecraft).map(([hostname, server]) => (
          <MinecraftCard key={hostname} hostname={hostname} server={server} />
        ))}
      </Section>

      {/* Infrastructure */}
      <Section title="Infrastructure" storageKey="infrastructure" grid={!containersHaveError}>
        {containersHaveError ? (
          <div className="rounded-xl border border-red-800 bg-red-950 px-4 py-3 text-sm text-red-300">
            Could not fetch container stats: {(data.containers as ContainersError).error}
          </div>
        ) : (
          Object.entries(data.containers as ContainersSuccess).map(([name, stats]) => (
            <ContainerCard key={name} name={name} stats={stats} />
          ))
        )}
      </Section>
    </main>
  )
}
