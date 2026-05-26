export const metadata = { title: 'Privacy Policy | O3 Energy' }

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 px-4 bg-bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-display prose-headings:text-brand-primary prose-p:text-text-2 bg-white p-12 rounded-3xl border border-border shadow-sm">
        <h1 className="text-4xl font-display font-semibold text-brand-primary mb-8 border-b border-border pb-6">Privacy Policy</h1>
        <p className="font-medium text-text-1">Last updated: {new Date().toLocaleDateString()}</p>
        <p>This is a placeholder for the full privacy policy. O3 Energy is committed to protecting your personal data.</p>
        <h2>Information We Collect</h2>
        <p>We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, fill out a form, and in connection with other activities, services, features or resources we make available on our Site.</p>
        <h2>How We Protect Your Information</h2>
        <p>We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.</p>
      </div>
    </div>
  )
}
