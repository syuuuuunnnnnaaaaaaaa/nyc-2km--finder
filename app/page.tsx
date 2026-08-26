import { SiteHeader } from '@/components/site-header'
import { SpotFinder } from '@/components/spot-finder'

export default function Page() {
  return (
    <main className="min-h-dvh bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        <SpotFinder />
      </div>
      <footer className="border-t border-border">
        <div className="mx-auto max-w-3xl px-5 py-8">
          <p className="font-display text-xs uppercase tracking-widest text-muted-foreground">
            Mock data · New York City · Walking distances are estimates
          </p>
        </div>
      </footer>
    </main>
  )
}
