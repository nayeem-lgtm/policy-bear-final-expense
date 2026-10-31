import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import { ArrowRight, Check, Phone, ShieldCheck, ClipboardList, CircleDollarSign, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PolicyWizard } from '@/components/policy-wizard'
import family from '@/assets/grandparents-family-moment.jpg'
import { PolicyHeader, PolicyFooter } from '@/components/policy-site'

export const Route = createFileRoute('/')({
  component: Index,
  head: () => ({ meta: [
    { title: 'Final expense coverage — PolicyBear' },
    { name: 'description', content: 'Explore final expense coverage for funeral, burial, cremation and other final bills with PolicyBear, one simple question at a time.' },
    { property: 'og:title', content: 'Final expense coverage — PolicyBear' },
    { property: 'og:description', content: 'Explore final expense insurance for funeral costs and final bills through a simple, supportive illustrative experience.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:url', content: 'https://policy-bear-quote-quest.lovable.app/' },
  ], links: [{ rel: 'canonical', href: 'https://policy-bear-quote-quest.lovable.app/' }] }),
})
const faqs = [
  ['What is final expense insurance?', 'Final expense insurance is life insurance intended to help your loved ones with funeral, burial, cremation and other final bills. Your named beneficiary receives benefits under the policy and decides how to use them.'],
  ['Is this the same as a prepaid funeral plan?', 'No. A prepaid funeral plan is an arrangement for funeral goods or services. Final expense insurance pays benefits to your named beneficiary under the policy, rather than reserving a specific funeral service.'],
  ['Will I need a medical exam?', 'The final expense plans illustrated here do not require a medical exam. Some plans still ask health questions. Eligibility depends on the insurer, plan and state.'],
  ['Does the full benefit start right away?', 'Not always. Some final expense plans limit benefits for death from natural causes during an initial waiting period. Check the actual policy for when full benefits begin and any exclusions.'],
  ['Will my price go up as I get older?', 'Some final expense whole life plans have guaranteed level premiums. Confirm that guarantee in the policy, and keep required payments up to date to maintain coverage.'],
]

function Index() {
  const [step, setStep] = useState(0)
  const changeStep = useCallback((value: number) => setStep(value), [])
  return <div className="policy-page">
    <PolicyHeader />
    <main id="main-content">
      {step === 0 && <section className="hero-banner"><img className="hero-photo" src={family} width={1536} height={1024} alt="An older couple sharing a quiet moment at home as their granddaughter shows them her drawing" fetchPriority="high" /><div className="hero-scrim" /><div className="hero-banner-copy"><h1>Protect your family from <span>final expenses.</span></h1><p>Coverage from $5,000 to $55,000 for funeral costs, cremation and final bills.</p></div></section>}
      <section className={step === 0 ? 'quote-stage' : 'funnel-section'}>
        <div className={step === 0 ? 'quote-stage-inner' : 'funnel-inner'}>
          <PolicyWizard onStepChange={changeStep} />
          {step === 0 && <p className="hero-tagline">An <strong>AI-powered, 24/7</strong> insurance platform delivering <span className="tagline-glow">instant decisions</span> and <span className="tagline-glow">life-changing coverage</span></p>}
        </div>
      </section>
      {step === 0 && <>
        <section className="how-section" id="how-it-works"><div className="section-heading"><h2>Explore your final expense options</h2><p>Start with a few details, then review the coverage and price.</p></div><ol className="how-grid"><li><div className="how-icon"><ClipboardList /><span>1</span></div><h3>Tell us about yourself</h3><p>Your age, location and coverage amount help shape your final expense illustration.</p></li><li><div className="how-icon"><CircleDollarSign /><span>2</span></div><h3>Review your price</h3><p>See a sample monthly premium and adjust the coverage to suit your budget.</p></li><li><div className="how-icon"><ShieldCheck /><span>3</span></div><h3>Review policy details</h3><p>Explore beneficiary choices, health questions and the sample application.</p></li></ol></section>
        <section className="faq-section" id="questions"><div className="faq-inner"><div className="faq-heading"><h2>Final expense<br /> questions, answered.</h2><p>Want to talk through your options?</p><a className="faq-call" href="tel:+18447652327" aria-label="Call PolicyBear at (844) 765-2327"><Phone size={20} /> (844) POL-BEAR</a></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={23} /></summary><p>{answer}</p></details>)}</div></div></section>
        <section className="closing-section"><h2>Find a starting point for your final expense coverage.</h2><Button asChild variant="action" size="touch"><a href="#get-covered">Check my options <ArrowRight size={21} /></a></Button></section>
      </>}
    </main>
    <PolicyFooter />
  </div>
}
