import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import { ArrowRight, Check, Heart, HeartHandshake, Phone, ShieldCheck, ClipboardList, CircleDollarSign, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PolicyWizard } from '@/components/policy-wizard'
import family from '@/assets/family.jpg'
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
    <main>
      <section className={step === 0 ? 'landing-hero' : 'funnel-section'}>
        {step === 0 && <><img className="hero-photo" src={family} width={1536} height={1024} alt="Grandparents sharing a happy afternoon with their grandchildren" fetchPriority="high" /><div className="hero-scrim" /></>}
        <div className={step === 0 ? 'hero-inner' : 'funnel-inner'}>
          {step === 0 && <div className="hero-copy"><div className="eyebrow"><ShieldCheck size={19} /> A little planning. A lot of peace of mind.</div><h1>Protect your family<br className="desktop-break" /> from <span>final expenses.</span></h1><p className="hero-description">Final expense coverage from $5,000 to $40,000.<br className="desktop-break" /> For funeral costs, cremation and final bills.</p><ul className="hero-benefits"><li><span><Check /></span>Explore coverage that fits your budget</li><li><span><Check /></span>Choose who receives the benefit</li><li><span><Check /></span>No medical exam for illustrated plans</li></ul><div className="hero-family-note"><Heart size={20} /><span>For the people who mean everything.</span></div></div>}
          <PolicyWizard onStepChange={changeStep} />
        </div>
        {step === 0 && <div className="photo-caption"><Heart size={17} /> More time for what matters.</div>}
      </section>
      {step === 0 && <>
        <section className="how-section" id="how-it-works"><div className="section-heading"><span className="section-eyebrow">Simple from the very first step</span><h2>A little easier. A little more peace of mind.</h2><p>Explore final expense coverage for the costs your family may face.</p></div><ol className="how-grid"><li><div className="how-icon"><ClipboardList /><span>1</span></div><h3>Answer a few questions</h3><p>A few details help illustrate final expense options for your age and budget.</p></li><li><div className="how-icon"><CircleDollarSign /><span>2</span></div><h3>See your price</h3><p>Compare a sample final expense premium and coverage amount.</p></li><li><div className="how-icon"><ShieldCheck /><span>3</span></div><h3>Apply online</h3><p>Review beneficiary choices and sample final expense policy details.</p></li></ol></section>
        <section className="faq-section"><div className="faq-inner"><div className="faq-heading"><span className="section-eyebrow">Clear answers. No surprises.</span><h2>A few things you<br /> might be wondering.</h2><p>Have another question? We're here for you.</p><a className="faq-call" href="tel:+18447652327"><Phone size={20} /> (844) 765-2327</a></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={23} /></summary><p>{answer}</p></details>)}</div></div></section>
        <section className="closing-section"><HeartHandshake size={34} /><h2>Plan for final expenses. Start with one simple step.</h2><Button asChild variant="action" size="touch"><a href="#get-covered">Check my options <ArrowRight size={21} /></a></Button><p>No medical exam. No obligation.</p></section>
      </>}
    </main>
    <PolicyFooter />
  </div>
}
