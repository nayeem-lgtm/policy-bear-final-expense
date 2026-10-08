import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Phone, ShieldCheck } from 'lucide-react'
import { PolicyHeader, PolicyFooter } from '@/components/policy-site'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/contact')({
  head: () => ({ meta: [
    { title: 'Contact PolicyBear — Final expense questions' },
    { name: 'description', content: 'Contact PolicyBear by phone for questions about final expense coverage and availability.' },
    { property: 'og:title', content: 'Contact PolicyBear — Final expense questions' },
    { property: 'og:description', content: 'Talk to PolicyBear about final expense coverage and availability.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://policy-bear-quote-quest.lovable.app/contact' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ], links: [{ rel: 'canonical', href: 'https://policy-bear-quote-quest.lovable.app/contact' }] }),
  component: ContactPage,
})

function ContactPage() {
  return <div className="policy-page"><PolicyHeader />
    <main className="contact-page">
      <Link to="/" className="legal-back">← Back to final expense coverage</Link>
      <span className="section-eyebrow">We’re here for your questions</span>
      <h1>Contact PolicyBear</h1>
      <p className="contact-intro">A conversation can make planning for final expenses feel a little easier.</p>
      <div className="contact-layout">
        <section className="contact-phone-section" aria-labelledby="contact-call-title">
          <span className="contact-symbol"><Phone aria-hidden="true" /></span>
          <h2 id="contact-call-title">Let’s talk</h2>
          <p>Call PolicyBear’s main line and ask about final expense coverage and availability.</p>
          <a className="contact-number" href="tel:+18447652327">(844) 765-2327</a>
          <Button asChild variant="action" size="touch"><a href="tel:+18447652327"><Phone size={20} /> Call PolicyBear</a></Button>
        </section>
        <section className="contact-details-section" aria-labelledby="contact-questions-title">
          <h2 id="contact-questions-title">Questions about final expense?</h2>
          <ul><li>Coverage for funeral costs and final bills</li><li>Eligibility and availability in your state</li><li>Benefits, waiting periods and policy details</li></ul>
          <Link className="contact-resource" to="/disclaimers"><ShieldCheck size={20} /> Read coverage disclosures <ArrowRight size={18} /></Link>
          <p className="contact-safety">Please do not share Social Security, bank or card details on this illustrative website.</p>
        </section>
      </div>
    </main><PolicyFooter />
  </div>
}