type IconProps = { className?: string }

function SkatesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 16V8a2 2 0 0 1 2-2h2l3 4h2a2 2 0 0 1 2 2v4" />
      <path d="M4 16h13.5a3 3 0 0 0 2.4-1.2l1.1-1.5" />
    </svg>
  )
}

function StickIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 3 7.5 17.5" />
      <path d="M7.5 17.5h4.5" />
    </svg>
  )
}

function HelmetIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 14a8 8 0 0 1 16 0v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3Z" />
      <path d="M8 14v4M12 13v5M16 14v4" />
    </svg>
  )
}

function GlovesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 21v-7a4 4 0 0 1 4-4h1V6a2 2 0 0 1 4 0v4h1a4 4 0 0 1 4 4v7z" />
    </svg>
  )
}

function ProtectionIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
    </svg>
  )
}

function BagIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  )
}

function GoalieIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 20V6h16v14" />
      <path d="M4 10h16M4 14h16M4 18h16M8 6v14M12 6v14M16 6v14" />
    </svg>
  )
}

function KidsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="6" r="3" />
      <path d="M7 21v-5a5 5 0 0 1 10 0v5" />
    </svg>
  )
}

const ICONS: Record<string, (props: IconProps) => JSX.Element> = {
  skates: SkatesIcon,
  stick: StickIcon,
  helmet: HelmetIcon,
  gloves: GlovesIcon,
  protection: ProtectionIcon,
  bag: BagIcon,
  goalie: GoalieIcon,
  kids: KidsIcon,
}

export default function CategoryIcon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? ProtectionIcon
  return <Icon className={className} />
}
