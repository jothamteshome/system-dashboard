import { useTheme } from '../../contexts/ThemeContext'

interface HeroHeaderProps {
  lastChecked: Date | null
  refresh: () => void
  loading: boolean
}

function timeAgo(date: Date): string {
  const s = Math.floor((Date.now() - date.getTime()) / 1000)
  if (s < 5) return 'just now'
  if (s < 60) return `${s}s ago`
  return `${Math.floor(s / 60)}m ago`
}

function SunIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="5" />
      <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

function RefreshIcon({ spinning }: { spinning: boolean }) {
  return (
    <svg
      className={`w-5 h-5 ${spinning ? 'animate-spin' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  )
}

export default function HeroHeader({ lastChecked, refresh, loading }: HeroHeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="w-full bg-white dark:bg-ash-950 border-b border-gray-200 dark:border-ash-800 px-6 py-8">
      <div className="max-w-8xl mx-auto flex items-end justify-between">
        <div>
          <p className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
            personal infrastructure
          </p>
          <h1 className="text-3xl font-bold font-mono text-gray-900 dark:text-white tracking-tight">
            whymighta<span className="text-indigo-500 dark:text-indigo-400">.net</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {lastChecked
              ? `checked ${timeAgo(lastChecked)} · refreshes every 60s`
              : 'loading…'}
          </p>
        </div>

        <div className="flex items-center gap-2 pb-1">
          <button
            onClick={refresh}
            disabled={loading}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-ash-800 transition-colors disabled:opacity-50"
            aria-label="Refresh status"
          >
            <RefreshIcon spinning={loading} />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-ash-800 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </div>
  )
}
