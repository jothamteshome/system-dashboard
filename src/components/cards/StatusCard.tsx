import type { ReactNode } from 'react'

interface StatusCardProps {
  banner: ReactNode
  children: ReactNode
}

export default function StatusCard({ banner, children }: StatusCardProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg relative min-w-[260px]">
      {/* Themed background fills the entire card */}
      {banner}
      {/* Scrim: light in light mode, dark in dark mode */}
      <div className="absolute inset-0 bg-white/80 dark:bg-black/55" />
      {/* Card content sits above both */}
      <div className="relative z-10 p-4 min-h-[140px]">{children}</div>
    </div>
  )
}
