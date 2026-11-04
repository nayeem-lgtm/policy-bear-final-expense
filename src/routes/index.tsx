// ============= Full file contents =============

import bearGuide from '@/assets/bear-guide-full.png'
import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useRef, useState } from 'react'
import { ChevronDown, PawPrint } from 'lucide-react'
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
  const bearObserver = useRef<IntersectionObserver | null>(null)
  const bearWaveTimer = useRef<number | null>(null)
  const attachBear = useCallback((node: HTMLDivElement | null) => {
    bearObserver.current?.disconnect()
    if (bearWaveTimer.current !== null) window.clearTimeout(bearWaveTimer.current)
    if (!node) return
    node.classList.add('is-armed')
    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible')
    } else {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.classList.add('is-visible')
          observer.disconnect()
        }
      }, { threshold: 0.2 })
      observer.observe(node)
      bearObserver.current = observer
    }
  }, [])
  return <div className="policy-page">
    <PolicyHeader />
    <main id="main-content" className={step === 0 ? undefined : 'funnel-mode'}>
      {step === 0 && <section className="hero-banner"><img className="hero-photo" src={family} width={1536} height={1024} alt="An older couple sharing a quiet moment at home as their granddaughter shows them her drawing" fetchPriority="high" /><div className="hero-scrim" /><div className="hero-banner-copy"><h1>Protect your family from <span>final expenses.</span></h1><p>Coverage from $5,000 to $50,000 for funeral costs, cremation and final bills.</p></div></section>}
      <section className={step === 0 ? 'quote-stage' : 'funnel-section'}>
        <div className={step === 0 ? 'quote-stage-inner' : 'funnel-inner'}>
          <div className="quote-form-holder">
            <PolicyWizard onStepChange={changeStep} />
          </div>
          {step === 0 && <p className="hero-tagline">An <span className="tagline-accent">AI-powered,</span> <span className="tagline-accent">24/7</span> insurance platform with <span className="tagline-mark">instant decisions</span><br className="tagline-break" /> and <span className="tagline-mark">no medical exam required</span>.</p>}
        </div>
      </section>
      {step === 0 && <>
        <section className="faq-section" id="questions" aria-label="Final expense questions and coverage promises">
          <div className="faq-inner">
            <header className="faq-head">
              <h2>Final expense questions, answered.</h2>
            </header>
            <div className="faq-bear-wrap" aria-hidden="true" ref={attachBear}><div className="faq-bear-stage"><div className="faq-bear-lean"><img className="faq-bear" src={bearGuide} width={595} height={959} alt="" /></div></div></div>
            <div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={23} /></summary><p>{answer}</p></details>)}</div>
            <div className="faq-cta">
              <h2>Find a starting point for your <span className="faq-cta-hl">final expense</span> coverage.</h2>
              <a className="faq-cta-btn" href="#get-covered"><span className="faq-cta-chip" aria-hidden="true"><PawPrint size={19} /></span><span className="faq-cta-label">Explore coverage</span></a>
            </div>
          </div>
        </section>
        <section className="fact-lab" aria-label="Fact check design concepts">
          <div className="fact-lab-inner">
            <h2 className="fact-lab-title">Fact check — four directions</h2>
            <div className="fact-lab-grid">
              <article className="fact-lab-cell"><span className="fact-lab-tag">A · Flip card</span>
                <div className="flab flab-flip"><div className="flab-spin"><div className="flab-face flab-front"><span className="flab-kicker">Myth</span><p>Applying for life insurance is a hassle</p></div><div className="flab-face flab-back"><span className="flab-kicker">Fact</span><p>Applying for life insurance is fast and easy</p></div></div></div>
              </article>
              <article className="fact-lab-cell"><span className="fact-lab-tag">B · Myth / fact chips</span>
                <div className="flab flab-chips"><p className="flab-row"><span className="flab-chip is-myth">Myth</span><s>Applying for life insurance is a hassle</s></p><p className="flab-row"><span className="flab-chip is-fact">Fact</span><strong>Applying for life insurance is fast and easy</strong></p></div>
              </article>
              <article className="fact-lab-cell"><span className="fact-lab-tag">C · Gold wipe reveal</span>
                <div className="flab flab-wipe"><p className="flab-myth-line">Applying for life insurance is a hassle</p><p className="flab-fact-line">Applying for life insurance is fast and easy</p><span className="flab-wipe-bar" aria-hidden="true" /></div>
              </article>
              <article className="fact-lab-cell"><span className="fact-lab-tag">D · Mr Bear holds the note</span>
                <div className="flab flab-note"><img className="flab-note-bear" src={bearGuide} width={595} height={959} alt="" aria-hidden="true" /><div className="flab-note-card"><span className="flab-kicker">Mr Bear says</span><p>Applying for life insurance is fast and easy</p><s className="flab-note-myth">Applying for life insurance is a hassle</s></div></div>
              </article>
            </div>
          </div>
        </section>
      </>}
    </main>
    {step === 0 ? <PolicyFooter /> : <SlimFooter />}
  </div>
}
