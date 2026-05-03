import type { StatusResponse, ContainersError, ContainersSuccess } from '../interfaces/StatusResponse'
import Section from '../components/layout/Section'
import MinecraftCard from '../components/cards/MinecraftCard'
import SiteCard from '../components/cards/SiteCard'
import ContainerCard from '../components/cards/ContainerCard'
import PixelBanner from '../components/banners/PixelBanner'
import CinemaBanner from '../components/banners/CinemaBanner'

interface StatusPageProps {
  data: StatusResponse | null
  loading: boolean
  error: string | null
}

function isContainersError(c: ContainersError | ContainersSuccess): c is ContainersError {
  return 'error' in c
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  )
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
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <p className="text-red-600 dark:text-red-400 text-sm">Failed to load status data: {error}</p>
      </div>
    )
  }

  if (loading || !data) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-10">
        <Section title="Minecraft Servers">
          <CardGrid>{Array.from({ length: 1 }).map((_, i) => <SkeletonCard key={i} />)}</CardGrid>
        </Section>
        <Section title="Sites">
          <CardGrid>{Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}</CardGrid>
        </Section>
        <Section title="Docker Containers">
          <CardGrid>{Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}</CardGrid>
        </Section>
      </main>
    )
  }

  const containersHaveError = isContainersError(data.containers)

  return (
    <main className="max-w-6xl mx-auto px-6 py-8 space-y-10">
      {/* Minecraft */}
      <Section title="Minecraft Servers">
        <CardGrid>
          {Object.entries(data.minecraft).map(([hostname, server]) => (
            <MinecraftCard key={hostname} hostname={hostname} server={server} />
          ))}
        </CardGrid>
      </Section>

      {/* Sites */}
      <Section title="Sites">
        <CardGrid>
          <SiteCard
            name="snake-game"
            banner={<PixelBanner />}
            site={data.sites['snake-game']}
          />
          <SiteCard
            name="pixel-sorter"
            banner={<PixelBanner />}
            site={data.sites['pixel-sorter']}
          />
          <SiteCard
            name="watch-together"
            banner={<CinemaBanner />}
            site={data.sites['watch-together']}
          />
        </CardGrid>
      </Section>

      {/* Docker Containers */}
      <Section title="Docker Containers">
        {containersHaveError ? (
          <div className="rounded-xl border border-red-800 bg-red-950 px-4 py-3 text-sm text-red-300">
            Could not fetch container stats: {(data.containers as ContainersError).error}
          </div>
        ) : (
          <CardGrid>
            {Object.entries(data.containers as ContainersSuccess).map(([name, stats]) => (
              <ContainerCard key={name} name={name} stats={stats} />
            ))}
          </CardGrid>
        )}
      </Section>
    </main>
  )
}
