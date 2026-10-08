import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Phone, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import logo from '@/assets/policybear-logo.asset.json'

export function PolicyHeader() {
  return <header className="site-header"><div className="header-inner"><Link to="/" aria-label="PolicyBear home" className="brand-link"><img src={logo.url} width="238" height="47" alt="PolicyBear" /></Link><Button asChild variant="action" className="header-call"><a href="tel:+18447652327"><span className="phone-circle"><Phone size={21} /></span><span><span className="call-caption">Call now</span><strong>(844) 765-2327</strong></span></a></Button></div></header>
}

export function PolicyFooter() {
  return <footer className="legal-footer"><div className="legal-footer-inner">
    <div className="legal-footer-top">
      <div className="footer-brand"><Link to="/" aria-label="PolicyBear home"><img src={logo.url} width="200" height="40" alt="PolicyBear" loading="lazy" /></Link><p>A little planning for final expenses.<br />A little peace of mind for your family.</p></div>
      <nav className="footer-link-group" aria-label="Legal information"><h2>Legal & privacy</h2><a href="https://policybear.com/terms-conditions" target="_blank" rel="noreferrer">Terms & conditions <ArrowUpRight /></a><a href="https://policybear.com/privacy-policy" target="_blank" rel="noreferrer">Privacy policy <ArrowUpRight /></a><Link to="/disclaimers">Final expense disclosures</Link><Link to="/licensing">Licensing & consumer resources</Link></nav>
      <div className="footer-support"><h2>Talk it through</h2><a href="tel:+18447652327"><Phone /> (844) 765-2327</a><p>PolicyBear’s main phone line.<br />Ask about final expense availability.</p></div>
    </div>
    <div className="footer-disclosure"><ShieldCheck aria-hidden="true" /><div><h2>Important final expense information</h2><p>Final expense insurance is life insurance intended to help with funeral, burial, cremation and other final bills. It is not a prepaid funeral plan. Benefits are paid to the named beneficiary according to the policy; they are not restricted to funeral costs.</p><p>Availability, eligibility, premiums and benefits depend on the insurer, your state and the policy. Some plans have limited benefits during an initial waiting period. Premiums must be paid to keep coverage in force. Review the actual policy for exclusions, limitations and benefit schedules.</p></div></div>
    <div className="footer-demo-notice"><strong>Illustrative experience only.</strong> Prices, approvals, signatures and policy numbers on this site are demonstrations, not insurance offers or issued coverage. No application or payment is submitted. Do not enter real Social Security, bank or card details.</div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} PolicyBear. All rights reserved.</p><p>Not affiliated with any government agency.</p></div>
  </div></footer>
}

export function LegalPage({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return <div className="policy-page"><PolicyHeader /><main className="legal-page"><Link to="/" className="legal-back">← Back to final expense coverage</Link><span className="section-eyebrow">PolicyBear · Final expense</span><h1>{title}</h1><p className="legal-intro">{intro}</p><div className="legal-content">{children}</div></main><PolicyFooter /></div>
}