export const metadata = { title: 'Terms of Service | O3 Energy' }

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 px-4 bg-bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-display prose-headings:text-brand-primary prose-p:text-text-2 bg-white p-12 rounded-3xl border border-border shadow-sm">
        <h1 className="text-4xl font-display font-semibold text-brand-primary mb-8 border-b border-border pb-6">Terms of Service</h1>
        <p className="font-medium text-text-1">Last updated: {new Date().toLocaleDateString()}</p>
        <p>This is a placeholder for the full terms of service.</p>
        <h2>Acceptance of Terms</h2>
        <p>By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
        <h2>Use License</h2>
        <p>Permission is granted to temporarily download one copy of the materials (information or software) on O3 Energy's website for personal, non-commercial transitory viewing only.</p>
      </div>
    </div>
  )
}
