import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import { ArrowRight, Check, Heart, HeartHandshake, LockKeyhole, Phone, ShieldCheck, ClipboardList, CircleDollarSign, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PolicyWizard } from '@/components/policy-wizard'
import family from '@/assets/family.jpg'
import logo from '@/assets/policybear-logo.asset.json'

export const Route = createFileRoute('/')({
  component: Index,
  head: () => ({ meta: [
    { title: 'Final expense life insurance — PolicyBear' },
    { name: 'description', content: 'Protect your family from final expenses with lifelong coverage. Explore your options with PolicyBear, one simple question at a time.' },
    { property: 'og:title', content: 'Final expense life insurance — PolicyBear' },
    { property: 'og:description', content: 'Lifelong coverage. No medical exam. A simple, supportive way to explore final expense insurance.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:url', content: '/' },
  ], links: [{ rel: 'canonical', href: '/' }] }),
})
const faqs = [
  ['What is final expense insurance?', 'Final expense insurance is life insurance designed to help your loved ones pay for funeral costs and other final bills. Your beneficiary receives the benefit and can decide how to use it.'],
  ['Will I need a medical exam?', 'No medical exam is required for the plans described here. You may need to answer health questions during your application. Eligibility and availability depend on the plan.'],
  ['Will my price go up as I get older?', 'Whole life plans are designed to keep your rate the same as you age. Your coverage stays in place as long as required payments are made. An agent can explain the details of your plan.'],
]
function Index() {
  const [step, setStep] = useState(0)
  const changeStep = useCallback((value: number) => setStep(value), [])
  return <div className="policy-page">
    <header className="site-header"><div className="header-inner"><a href="/" aria-label="PolicyBear home" className="brand-link"><img src={logo.url} width="238" height="47" alt="PolicyBear" /></a><Button asChild variant="action" className="header-call"><a href="tel:+18447652327"><span className="phone-circle"><Phone size={21} /></span><span><span className="call-caption">Call now</span><strong>(844) 765-2327</strong></span></a></Button></div></header>
    <main>
      <section className={step === 0 ? 'landing-hero' : 'funnel-section'}>
        {step === 0 && <><img className="hero-photo" src={family} width={1536} height={1024} alt="Grandparents sharing a happy afternoon with their grandchildren" fetchPriority="high" /><div className="hero-scrim" /></>}
        <div className={step === 0 ? 'hero-inner' : 'funnel-inner'}>
          {step === 0 && <div className="hero-copy"><div className="eyebrow"><ShieldCheck size={19} /> A little planning. A lot of peace of mind.</div><h1>Protect your family<br className="desktop-break" /> from <span>final expenses.</span></h1><p className="hero-description">Lifelong coverage from $5,000 to $40,000.<br className="desktop-break" /> No medical exam. See your price in about 2 minutes.</p><ul className="hero-benefits"><li><span><Check /></span>Your rate is locked for life</li><li><span><Check /></span>Coverage never expires</li><li><span><Check /></span>Apply online — no agent visit needed</li></ul><div className="hero-family-note"><Heart size={20} /><span>For the people who mean everything.</span></div></div>}
          <PolicyWizard onStepChange={changeStep} />
        </div>
        {step === 0 && <div className="photo-caption"><Heart size={17} /> More time for what matters.</div>}
      </section>
      {step === 0 && <>
        <section className="assurance-band" aria-label="Coverage benefits"><div><span><ShieldCheck /><strong>Coverage for a lifetime</strong></span><span><HeartHandshake /><strong>Real people. Real support.</strong></span><span><LockKeyhole /><strong>Your information stays private</strong></span></div></section>
        <section className="how-section" id="how-it-works"><div className="section-heading"><span className="section-eyebrow">Simple from the very first step</span><h2>A little easier. A little more peace of mind.</h2><p>Finding protection for your family shouldn't be complicated.</p></div><ol className="how-grid"><li><div className="how-icon"><ClipboardList /><span>1</span></div><h3>Answer a few questions</h3><p>A few simple details help us find coverage that fits your life.</p></li><li><div className="how-icon"><CircleDollarSign /><span>2</span></div><h3>See your price</h3><p>Explore a clear illustrative price before you apply.</p></li><li><div className="how-icon"><ShieldCheck /><span>3</span></div><h3>Apply online</h3><p>Complete the browser-only demo at your own pace.</p></li></ol></section>
        <section className="faq-section"><div className="faq-inner"><div className="faq-heading"><span className="section-eyebrow">Clear answers. No surprises.</span><h2>A few things you<br /> might be wondering.</h2><p>Have another question? We're here for you.</p><a className="faq-call" href="tel:+18447652327"><Phone size={20} /> (844) 765-2327</a></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={23} /></summary><p>{answer}</p></details>)}</div></div></section>
        <section className="closing-section"><HeartHandshake size={34} /><h2>Protect what matters. Start with one simple step.</h2><Button asChild variant="action" size="touch"><a href="#get-covered">Check my options <ArrowRight size={21} /></a></Button><p>No medical exam. No obligation.</p></section>
      </>}
    </main>
    <footer className="site-footer"><div className="footer-top"><a href="/" aria-label="PolicyBear home"><img src={logo.url} width="180" height="36" alt="PolicyBear" loading="lazy" /></a><nav aria-label="Legal"><a href="https://policybear.com/privacy-policy" target="_blank" rel="noreferrer">Privacy policy</a><a href="https://policybear.com/terms-conditions" target="_blank" rel="noreferrer">Terms & conditions</a></nav></div><p>© {new Date().getFullYear()} PolicyBear. All rights reserved. Not affiliated with any government agency.</p><p>Coverage, eligibility and rates vary by state and insurance company. Benefits are subject to policy terms and conditions. PolicyBear’s main phone line is shown; final expense availability must be confirmed with an agent.</p></footer>
  </div>
}
