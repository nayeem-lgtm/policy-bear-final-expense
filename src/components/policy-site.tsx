// ============= Full file contents =============

import { Link } from '@tanstack/react-router'
import { Mail, Clock, Phone, ClipboardCheck, HeartHandshake, FileCheck2 } from 'lucide-react'
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
  return <div className="trust-badges"><p className="trust-badges-label">What you can count on</p><ul className="trust-badges-grid" aria-label="Final expense reassurance">{TRUST_MARKS.map(({ icon: Icon, title, detail }) => <li className="trust-badge" key={title}><span className="trust-badge-seal" aria-hidden="true"><Icon /></span><span className="trust-badge-copy"><strong>{title}</strong><span>{detail}</span></span></li>)}</ul></div>
}

export function PolicyFooter() {
  return <footer className="pb-footer"><div className="pb-footer-inner">
    <div className="pb-footer-grid">
      <div className="pb-footer-brand">
        <Link to="/" aria-label="PolicyBear home"><span className="pb-footer-logo" role="img" aria-label="PolicyBear" style={{ WebkitMaskImage: `url(${logo.url})`, maskImage: `url(${logo.url})` }} /></Link>
        <p>Making final expense life insurance simple, affordable and accessible for every family.</p>
      </div>
      <nav className="pb-footer-col" aria-label="Resources">
        <h2>Resources</h2>
        <Link to="/disclaimers">Disclosures</Link>
        <Link to="/licensing">Licensing</Link>
        <Link to="/privacy-policy">Privacy policy</Link>
      </nav>
      <nav className="pb-footer-col" aria-label="Quick links">
        <h2>Quick links</h2>
        <Link to="/">Get a quote</Link>
        <Link to="/contact">Contact us</Link>
        <Link to="/terms-conditions">Terms</Link>
      </nav>
      <div className="pb-footer-col">
        <h2>Contact</h2>
        <a href="mailto:info@policybear.com"><Mail aria-hidden="true" />info@policybear.com</a>
        <a href="tel:+18447652327"><Phone aria-hidden="true" />(844) POL-BEAR</a>
        <span><Clock aria-hidden="true" />Mon–Fri: 8AM–8PM EST</span>
      </div>
      <div className="pb-footer-seals-wrap" aria-label="Accreditation and security">
        <ul className="pb-footer-seals">
        <li><span className="seal seal-bbb" role="img" aria-label="BBB Accredited Business"><span className="seal-bbb-mark"><svg viewBox="0 0 24 32" aria-hidden="true"><path d="M12 1c3 3 4 5 1 8-2 2-3 4-1 6-4-1-6-4-4-8 1-2 3-3 4-6Zm-6 17h12l-2 3H8Zm1 5h10l-1.5 3h-7Z" fill="currentColor"/></svg><b>BBB</b></span><span className="seal-bbb-text">ACCREDITED<br />BUSINESS</span></span></li>
        <li><span className="seal seal-hitrust" role="img" aria-label="HITRUST i1 Certified"><span className="seal-hitrust-i1">i1</span><span className="seal-hitrust-text"><b>HITRUST</b><small>CERTIFIED</small></span></span></li>
        <li><span className="seal seal-geotrust" role="img" aria-label="GeoTrust Secured, powered by DigiCert"><span className="seal-geo-pill"><span className="seal-geo-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span className="seal-geo-text">GeoTrust<b>SECURED</b></span></span><small>powered by <b>digicert</b></small></span></li>
      </ul>
      </div>
    </div>
    <div className="pb-footer-bottom">
      <p>© {new Date().getFullYear()} PolicyBear. All rights reserved. Licensed life insurance agency.</p>
      <nav aria-label="Legal">
        <Link to="/privacy-policy">Privacy policy</Link>
        <Link to="/terms-conditions">Terms of service</Link>
        <Link to="/disclaimers">Disclaimer</Link>
      </nav>
    </div>
    <p className="pb-footer-fine">PolicyBear is a licensed life insurance agency. We are not affiliated with or endorsed by the U.S. Government or any government agency. This website provides general information about final expense life insurance and is not intended as specific insurance advice. Prices shown are illustrations only—no application or payment is submitted.</p>
  </div></footer>
}

export function LegalPage({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return <div className="policy-page"><PolicyHeader /><main className="legal-page"><Link to="/" className="legal-back">← Back to final expense coverage</Link><span className="section-eyebrow">PolicyBear · Final expense</span><h1>{title}</h1><p className="legal-intro">{intro}</p><div className="legal-content">{children}</div></main><PolicyFooter /></div>
}
