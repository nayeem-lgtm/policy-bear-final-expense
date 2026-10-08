import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Phone, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import logo from '@/assets/policybear-logo.asset.json'

export function PolicyHeader() {
  return <header className="site-header"><div className="header-inner"><Link to="/" aria-label="PolicyBear home" className="brand-link"><img src={logo.url} width="238" height="47" alt="PolicyBear" /></Link><Button asChild variant="action" className="header-call"><a href="tel:+18447652327"><span className="phone-circle"><Phone size={21} /></span><span><span className="call-caption">Call now</span><strong>(844) 765-2327</strong></span></a></Button></div></header>
}

export function PolicyFooter() {
  return <footer className="legal-footer"><div className="legal-footer-inner">
    <div className="footer-leads">
      <div className="footer-brand">
        <Link to="/" aria-label="PolicyBear home"><img src={logo.url} width="158" height="32" alt="PolicyBear" loading="lazy" /></Link>
        <p>A little planning for final expenses.<br />A little peace of mind for your family.</p>
        <a className="footer-phone" href="tel:+18447652327"><Phone /> (844) 765-2327</a>
        <p className="footer-phone-note">PolicyBear’s main phone line. Ask about final expense availability.</p>
      </div>
      <nav className="footer-link-group" aria-label="Legal information">
        <h2>Legal &amp; privacy</h2>
        <div className="footer-link-list">
          <a href="https://policybear.com/terms-conditions" target="_blank" rel="noreferrer">Terms &amp; conditions <ArrowUpRight /></a>
          <a href="https://policybear.com/privacy-policy" target="_blank" rel="noreferrer">Privacy policy <ArrowUpRight /></a>
          <Link to="/disclaimers">Final expense disclosures</Link>
          <Link to="/licensing">Licensing &amp; consumer resources</Link>
        </div>
      </nav>
    </div>
    <div className="footer-disclosure">
      <h2 className="footer-disclosure-title"><ShieldCheck aria-hidden="true" /> Important final expense information</h2>
      <div className="footer-disclosure-body">
        <p>Final expense insurance is life insurance that helps with funeral, burial, cremation and other final bills. It is not a prepaid funeral plan; benefits are paid to the named beneficiary.</p>
        <p>Availability, eligibility, premiums and benefits depend on the insurer, your state and the policy. Some plans have limited benefits during an initial waiting period, and premiums must be paid to keep coverage in force.</p>
        <p className="footer-fine"><strong>Illustrative experience only.</strong> Prices, approvals, signatures and policy numbers are demonstrations, not insurance offers or issued coverage. No application or payment is submitted; do not enter real Social Security, bank or card details. Existing PolicyBear policies describe ACA services; final expense updates are pending owner approval.</p>
      </div>
    </div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} PolicyBear. All rights reserved.</p><p>Not affiliated with any government agency.</p></div>
  </div></footer>
}

export function LegalPage({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return <div className="policy-page"><PolicyHeader /><main className="legal-page"><Link to="/" className="legal-back">← Back to final expense coverage</Link><span className="section-eyebrow">PolicyBear · Final expense</span><h1>{title}</h1><p className="legal-intro">{intro}</p><div className="legal-content">{children}</div></main><PolicyFooter /></div>
}
