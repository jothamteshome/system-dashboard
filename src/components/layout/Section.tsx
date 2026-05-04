import { useState, type ReactNode } from 'react'

interface SectionProps {
  title: string
  storageKey: string
  children: ReactNode
  grid?: boolean
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${open ? '' : '-rotate-90'}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export default function Section({ title, storageKey, children, grid = true }: SectionProps) {
  const [open, setOpen] = useState<boolean>(() => {
    const stored = localStorage.getItem(`section-${storageKey}`)
    return stored === null ? true : stored === 'true'
  })

  const toggle = () => {
    setOpen(o => {
      const next = !o
      localStorage.setItem(`section-${storageKey}`, String(next))
      return next
    })
  }

  return (
    <section className="mb-10">
      <button
        onClick={toggle}
        className="flex items-center gap-2 mb-4 group w-full text-left"
      >
        <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
          {title}
        </h2>
        <ChevronIcon open={open} />
      </button>
      {open && (
        grid
          ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
          : <>{children}</>
      )}
    </section>
  )
}
