import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-display font-bold text-3xl text-white tracking-tight">
                O3<span className="text-brand-orange">Energy</span>
              </span>
            </Link>
            <p className="text-white/60 mb-6 leading-relaxed">
              Commercial and utility-scale solar EPC since 2011. Four offices across the US and the Pacific Islands.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">Company</h4>
            <ul className="space-y-4 text-white/70">
              <li>
                <Link href="/about" className="hover:text-brand-orange transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="hover:text-brand-orange transition-colors">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-brand-orange transition-colors">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="/awards" className="hover:text-brand-orange transition-colors">
                  Awards
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-brand-orange transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-orange transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">Services</h4>
            <ul className="space-y-4 text-white/70">
              <li>
                <Link href="/services/project-development" className="hover:text-brand-orange transition-colors">
                  Project Development
                </Link>
              </li>
              <li>
                <Link href="/services/epc" className="hover:text-brand-orange transition-colors">
                  EPC
                </Link>
              </li>
              <li>
                <Link href="/services/installation-maintenance" className="hover:text-brand-orange transition-colors">
                  Installation &amp; Maintenance
                </Link>
              </li>
              <li>
                <Link href="/services/financing" className="hover:text-brand-orange transition-colors">
                  Financing
                </Link>
              </li>
              <li>
                <Link href="/services/asset-management" className="hover:text-brand-orange transition-colors">
                  Asset Management
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-brand-orange transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-brand-orange transition-colors">
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-white">Get in touch</h4>
            <ul className="space-y-4 text-white/70">
              <li>
                <a href="tel:8889992902" className="hover:text-brand-orange transition-colors">
                  (888) 999-2902
                </a>
              </li>
              <li>
                <a href="mailto:info@o3energy.com" className="hover:text-brand-orange transition-colors">
                  info@o3energy.com
                </a>
              </li>
              <li className="text-white/60 text-sm leading-snug">
                325 N St Paul Street, Suite 4550
                <br />
                Dallas, TX 75201
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-orange transition-colors">
                  Contact form
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-sm">
          <p>&copy; {new Date().getFullYear()} O3 Energy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
