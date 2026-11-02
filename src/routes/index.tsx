import bearGuide from '@/assets/bear-guide-full.png'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import { ArrowRight, Check, Stethoscope, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PolicyWizard } from '@/components/policy-wizard'
import family from '@/assets/grandparents-family-moment.jpg'
import { PolicyHeader, PolicyFooter, SlimFooter } from '@/components/policy-site'

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
function Index() {
  const [step, setStep] = useState(0)
  const changeStep = useCallback((value: number) => setStep(value), [])
  return <div className="policy-page">
    <PolicyHeader />
    <main id="main-content">
      {step === 0 && <section className="hero-banner"><img className="hero-photo" src={family} width={1536} height={1024} alt="An older couple sharing a quiet moment at home as their granddaughter shows them her drawing" fetchPriority="high" /><div className="hero-scrim" /><div className="hero-banner-copy"><h1>Protect your family from <span>final expenses.</span></h1><p>Coverage from $5,000 to $50,000 for funeral costs, cremation and final bills.</p></div></section>}
      <section className={step === 0 ? 'quote-stage' : 'funnel-section'}>
        <div className={step === 0 ? 'quote-stage-inner' : 'funnel-inner'}>
          <div className="quote-form-holder">
            <PolicyWizard onStepChange={changeStep} />
          </div>
          {step === 0 && <p className="hero-tagline">An <span className="tagline-accent">AI-powered,</span> <span className="tagline-accent">24/7</span> insurance platform delivering <span className="tagline-mark">instant decisions</span><br className="tagline-break" /> and <span className="tagline-mark">life‑changing coverage</span>.</p>}
        </div>
      </section>
      {step === 0 && <>
        <section className="coverage-promises" aria-label="Final expense coverage benefits">
          <div className="coverage-promises-inner">
            <div className="promise-bear"><img src={bearGuide} width={595} height={959} alt="Mr Bear, the PolicyBear mascot" /></div>
            <ul className="promise-list">
              <li className="promise-row"><Stethoscope className="promise-icon" aria-hidden="true" /><h2>No medical exam <span>required.</span></h2><span className="promise-check" aria-hidden="true"><Check /></span></li>
              <li className="promise-row"><Zap className="promise-icon" aria-hidden="true" /><h2>Instant <span>approval.</span></h2><span className="promise-check" aria-hidden="true"><Check /></span></li>
            </ul>
          </div>
        </section>
        <section className="closing-section"><h2>Find a starting point for your final expense coverage.</h2><Button asChild variant="action" size="touch"><a href="#get-covered">Check my options <ArrowRight size={21} /></a></Button></section>
      </>}
    </main>
    {step === 0 ? <PolicyFooter /> : <SlimFooter />}
  </div>
}
