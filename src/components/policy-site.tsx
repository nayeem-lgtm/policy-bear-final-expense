// ============= Full file contents =============

import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Phone, ClipboardCheck, HeartHandshake, FileCheck2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import logo from '@/assets/policybear-logo.asset.json'

const TRUST_MARKS = [
  { icon: ClipboardCheck, title: 'No medical exam', detail: 'For illustrated final expense plans' },
  { icon: HeartHandshake, title: 'No obligation', detail: 'Explore at your own pace' },
  { icon: FileCheck2, title: 'Clear disclosures', detail: 'Review details before deciding' },
]

export function PolicyHeader() {
  return <header className="site-header"><div className="header-inner"><Link to="/" aria-label="PolicyBear home" className="brand-link"><img src={logo.url} width="238" height="47" alt="PolicyBear" /></Link><Button asChild variant="action" className="header-call"><a href="tel:+18447652327"><span className="phone-circle"><Phone size={21} /></span><span><span className="call-caption">Call now</span><strong>(844) 765-2327</strong></span></a></Button></div></header>
}

export function PolicyTrustMarks({ compact = false }: { compact?: boolean }) {
  return <ul className={`policy-trust-marks${compact ? ' policy-trust-compact' : ''}`} aria-label="Final expense reassurance">{TRUST_MARKS.map(({ icon: Icon, title, detail }) => <li key={title}><span className="trust-mark-icon" aria-hidden="true"><Icon /></span><span className="trust-mark-copy"><strong>{title}</strong>{!compact && <span>{detail}</span>}</span></li>)}</ul>
}

export function PolicyTrustBadges() {
  return <div className="footer-trust"><p className="footer-trust-label">What you can count on</p><ul className="footer-trust-badges" aria-label="Final expense reassurance">{TRUST_MARKS.map(({ icon: Icon, title, detail }) => <li className="trust-badge" key={title}><span className="trust-badge-seal" aria-hidden="true"><Icon /></span><span className="trust-badge-copy"><strong>{title}</strong><span>{detail}</span></span></li>)}</ul></div>
}

export function PolicyFooter() {
  return <footer className="legal-footer"><div className="legal-footer-inner">
    <div className="footer-leads">
      <div className="footer-brand">
        <Link to="/" aria-label="PolicyBear home"><img src={logo.url} width="158" height="32" alt="PolicyBear" loading="lazy" /></Link>
        <p>Final expense. Family peace of mind.</p>
      </div>
      <nav className="footer-link-group" aria-label="Legal information">
        <h2>Legal &amp; privacy</h2>
        <div className="footer-link-list">
          <a href="https://policybear.com/terms-conditions" target="_blank" rel="noreferrer">Terms &amp; conditions <ArrowUpRight /></a>
          <a href="https://policybear.com/privacy-policy" target="_blank" rel="noreferrer">Privacy policy <ArrowUpRight /></a>
        </div>
      </nav>
      <nav className="footer-link-group" aria-label="Support and resources">
        <h2>Help &amp; resources</h2>
        <div className="footer-link-list">
          <Link to="/contact">Contact us</Link>
          <Link to="/disclaimers">Final expense disclosures</Link>
          <Link to="/licensing">Licensing &amp; resources</Link>
        </div>
      </nav>
    </div>
    <PolicyTrustBadges />
    <p className="footer-demo-note">Illustration only—not an insurance offer. No application or payment is submitted. <Link to="/disclaimers">Read full disclosures →</Link></p>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} PolicyBear. All rights reserved.</p><p>Not affiliated with any government agency.</p></div>
  </div></footer>
}

export function LegalPage({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return <div className="policy-page"><PolicyHeader /><main className="legal-page"><Link to="/" className="legal-back">← Back to final expense coverage</Link><span className="section-eyebrow">PolicyBear · Final expense</span><h1>{title}</h1><p className="legal-intro">{intro}</p><div className="legal-content">{children}</div></main><PolicyFooter /></div>
}
