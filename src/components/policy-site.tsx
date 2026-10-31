// ============= Full file contents =============

import { Link } from '@tanstack/react-router'
import { Mail, Clock, Phone, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import logo from '@/assets/policybear-logo.asset.json'


export function PolicyHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  return <header className="site-header"><a className="skip-link" href="#main-content">Skip to content</a><div className="header-inner"><Link to="/" hash="step-zip" onClick={closeMenu} aria-label="PolicyBear home" className="brand-link"><img src={logo.url} width="238" height="47" alt="PolicyBear" /></Link><nav id="site-navigation" className={`site-navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation"><Link to="/" hash="step-zip" onClick={closeMenu}>Final expense</Link><Link to="/licensing" onClick={closeMenu}>Licensing</Link><Link to="/contact" onClick={closeMenu}>Contact us</Link></nav><Button asChild variant="action" className="header-call"><a href="tel:+18447652327"><span className="phone-circle"><Phone size={21} /></span><span><span className="call-caption">Talk with PolicyBear</span><strong>(844) 765-2327</strong></span></a></Button><Button variant="quiet" size="icon" className="navigation-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button></div></header>
}


export function PolicyFooter() {
  return <footer className="pb-footer"><div className="pb-footer-inner">
    <div className="pb-footer-grid">
      <div className="pb-footer-brand">
        <Link to="/" hash="step-zip" aria-label="PolicyBear home"><span className="pb-footer-logo" role="img" aria-label="PolicyBear" style={{ WebkitMaskImage: `url(${logo.url})`, maskImage: `url(${logo.url})` }} /></Link>
        <p>Final expense coverage.<br />For funeral costs and final bills.</p>
        <Link to="/licensing" className="pb-footer-license">Licensed life insurance agency</Link>
      </div>
      <nav className="pb-footer-col" aria-label="Final expense resources">
        <h2>Final expense</h2>
        <Link to="/" hash="step-zip">Get a quote</Link>
        <Link to="/disclaimers">Final expense disclosure</Link>
        <Link to="/licensing">Licensing</Link>
      </nav>
      <nav className="pb-footer-col" aria-label="Policies and legal">
        <h2>Policies & legal</h2>
        <Link to="/privacy-policy">Privacy policy</Link>
        <Link to="/terms-conditions">Terms & conditions</Link>
        <Link to="/disclaimer">Disclaimer</Link>
      </nav>
      <div className="pb-footer-col">
        <h2>Talk with us</h2>
        <Link to="/contact">Contact PolicyBear</Link>
        <a href="mailto:info@policybear.com"><Mail aria-hidden="true" />info@policybear.com</a>
        <a href="tel:+18447652327"><Phone aria-hidden="true" />(844) 765-2327</a>
        <span><Clock aria-hidden="true" />Mon–Fri, 8am–8pm Eastern</span>
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
      <p>© {new Date().getFullYear()} PolicyBear. All rights reserved.</p>
      <nav aria-label="Legal">
        <Link to="/" hash="step-zip" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>Back to quote ↑</Link>
      </nav>
    </div>
    <p className="pb-footer-fine">PolicyBear is a licensed life insurance agency. We are not affiliated with or endorsed by the U.S. Government or any government agency. This website provides general information about final expense life insurance and is not intended as specific insurance advice. Prices shown are illustrations only—no application or payment is submitted.</p>
  </div></footer>
}

export function LegalPage({ title, intro, date, children }: { title: string; intro: string; date?: string; children: React.ReactNode }) {
  return <div className="policy-page"><PolicyHeader /><main id="main-content" className="legal-page"><Link to="/" hash="step-zip" className="legal-back">← Back to final expense coverage</Link><span className="section-eyebrow">PolicyBear · Final expense</span><h1>{title}</h1>{date && <p className="legal-date">{date}</p>}<p className="legal-intro">{intro}</p><div className="legal-content">{children}</div></main><PolicyFooter /></div>
}
