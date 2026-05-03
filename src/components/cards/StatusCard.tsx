import type { ReactNode } from 'react'

interface StatusCardProps {
  banner: ReactNode
  children: ReactNode
}

export default function StatusCard({ banner, children }: StatusCardProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-gray-700 bg-gray-900 dark:bg-gray-900 shadow-md">
      {banner}
      <div className="p-4">{children}</div>
    </div>
  )
}
