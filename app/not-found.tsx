import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-cream flex flex-col items-center justify-center text-center px-4 py-24">
      <div className="bg-white p-12 rounded-3xl border border-border shadow-xl max-w-lg w-full flex flex-col items-center">
        <div className="w-24 h-24 bg-brand-primary/5 rounded-full flex items-center justify-center mb-8">
          <AlertCircle className="h-12 w-12 text-brand-orange" />
        </div>
        <h1 className="text-8xl font-display font-bold text-brand-primary mb-2">404</h1>
        <h2 className="text-2xl font-display font-semibold text-brand-primary mb-4">Page Not Found</h2>
        <p className="text-lg text-text-2 mb-10 text-balance">
          We couldn't find the page you were looking for. It may have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button asChild size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full">
            <Link href="/">Return Home</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
