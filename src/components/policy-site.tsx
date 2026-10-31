// ============= Full file contents =============

import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Mail, Phone, Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import logo from '@/assets/policybear-logo.asset.json'
import bearMascot from '@/assets/bear-head.png'


export function PolicyHeader() {
  const [agents, setAgents] = useState(3)
  useEffect(() => {
    const id = setInterval(() => setAgents(2 + Math.floor(Math.random() * 7)), 4500)
    return () => clearInterval(id)
  }, [])
  return <header className="site-header"><a className="skip-link" href="#main-content">Skip to content</a><div className="header-inner"><Link to="/" hash="step-zip" aria-label="PolicyBear home" className="brand-link"><img src={logo.url} width="238" height="47" alt="PolicyBear" /></Link><span className="header-call-wrap"><Button asChild variant="action" className="header-call"><a href="tel:+18447652327"><span className="header-call-copy"><span className="call-caption">Talk with PolicyBear</span><strong>(844) 765-2327</strong><span className="agents-available"><span className="agent-dot" />{agents} agents available</span></span><span className="header-call-bear"><img src={bearMascot} width={533} height={566} alt="" /></span></a></Button></span></div></header>
}


export function PolicyFooter() {
  return <footer className="pb-footer"><div className="pb-footer-inner">
    <div className="pb-footer-grid">
      <div className="pb-footer-brand">
        <Link to="/" hash="step-zip" aria-label="PolicyBear home"><img src={logo.url} width="238" height="47" alt="PolicyBear" className="pb-footer-logo" /></Link>
        <p>Final expense coverage.<br />For funeral costs and final bills.</p>
        <ul className="pb-footer-social" aria-label="PolicyBear on social media">
          <li><a className="social-facebook" href="https://www.facebook.com/policybearofficial/" target="_blank" rel="noopener noreferrer" aria-label="PolicyBear on Facebook"><Facebook aria-hidden="true" /></a></li>
          <li><a className="social-instagram" href="https://www.instagram.com/policybear/" target="_blank" rel="noopener noreferrer" aria-label="PolicyBear on Instagram"><Instagram aria-hidden="true" /></a></li>
          <li><a className="social-x" href="https://x.com/policybearllc" target="_blank" rel="noopener noreferrer" aria-label="PolicyBear on X"><Twitter aria-hidden="true" /></a></li>
          <li><a className="social-linkedin" href="https://www.linkedin.com/company/policy-bear" target="_blank" rel="noopener noreferrer" aria-label="PolicyBear on LinkedIn"><Linkedin aria-hidden="true" /></a></li>
          <li><a className="social-youtube" href="https://www.youtube.com/@policybearofficial" target="_blank" rel="noopener noreferrer" aria-label="PolicyBear on YouTube"><Youtube aria-hidden="true" /></a></li>
        </ul>
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
        <a href="mailto:info@policybear.com"><Mail aria-hidden="true" />info@policybear.com</a>
        <a href="tel:+18447652327"><Phone aria-hidden="true" />(844) 765-2327</a>
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
  </div></footer>
}

export function LegalPage({ title, intro, date, children }: { title: string; intro: string; date?: string; children: React.ReactNode }) {
  return <div className="policy-page"><PolicyHeader /><main id="main-content" className="legal-page"><Link to="/" hash="step-zip" className="legal-back">← Back to final expense coverage</Link><span className="section-eyebrow">PolicyBear · Final expense</span><h1>{title}</h1>{date && <p className="legal-date">{date}</p>}<p className="legal-intro">{intro}</p><div className="legal-content">{children}</div></main><PolicyFooter /></div>
}
