import { SiteHeader } from '@/components/site-header'
import { SpotFinder } from '@/components/spot-finder'

export default function Page() {
  return (
    <main className="min-h-dvh bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-5 py-8 md:py-12">
        <SpotFinder />
      </div>
      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-6 text-xs text-muted-foreground">
          <p className="font-display font-medium uppercase tracking-wider">
            NY Route · Urban Velocity Design System
          </p>
          <p className="text-[11px]">
            New York City · Walking distances are estimates
          </p>
        </div>
      </footer>
    </main>
  )
}
