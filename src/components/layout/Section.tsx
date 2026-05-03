import type { ReactNode } from 'react'

interface SectionProps {
  title: string
  children: ReactNode
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">{title}</h2>
      {children}
    </section>
  )
}
