import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/policy-site'

export const Route = createFileRoute('/licensing')({
  head: () => ({ meta: [
    { title: 'Licensing & consumer resources — PolicyBear' },
    { name: 'description', content: 'How to verify an insurance agent or insurer and the agency information to confirm before buying final expense coverage.' },
    { property: 'og:title', content: 'Licensing & consumer resources — PolicyBear' },
    { property: 'og:description', content: 'Verify licensing and find your state insurance department before purchasing final expense coverage.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://policy-bear-quote-quest.lovable.app/licensing' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ], links: [{ rel: 'canonical', href: 'https://policy-bear-quote-quest.lovable.app/licensing' }] }),
  component: Licensing,
})

function Licensing() {
  return <LegalPage title="Licensing & consumer resources" intro="Know who is helping you and who will provide your final expense coverage.">
    <section><h2>Verify before you buy</h2><p>Insurance agents and agencies must meet the licensing requirements that apply where they do business. Ask for the agency’s legal name, the agent’s name and license number, and the insurer that would issue your policy. Check that information with your state insurance department before purchasing coverage.</p></section>
    <section><h2>Agency information to be confirmed</h2><p>This illustrative website does not establish an agency’s or agent’s licensing status. The following owner-supplied information is still needed before real insurance applications can be accepted:</p><dl className="license-details"><div><dt>Agency legal name</dt><dd>[AGENCY_LEGAL_NAME]</dd></div><div><dt>Applicable license numbers</dt><dd>[LICENSE_#]</dd></div><div><dt>States where coverage is unavailable</dt><dd>[EXCLUDED_STATES]</dd></div></dl><p>Business contact details, any required state-specific disclosures, and the issuing insurer and policy form must also be confirmed. A national producer number, by itself, is not proof of an active state license.</p></section>
    <section><h2>Your state insurance department</h2><p>State insurance departments can help you check licensing, understand policy-review rights and find the correct process for a complaint.</p><a className="legal-resource-link" href="https://content.naic.org/state-insurance-departments" target="_blank" rel="noreferrer">Find your state insurance department ↗</a></section>
    <section><h2>Questions about a final expense policy</h2><p>Ask who issues the coverage, when full benefits begin, whether premiums are guaranteed to remain level, what exclusions apply and how beneficiaries make a claim. The insurer’s policy documents—not a website illustration—set the terms of your coverage.</p></section>
  </LegalPage>
}