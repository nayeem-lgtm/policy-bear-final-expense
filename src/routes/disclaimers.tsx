import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/policy-site'

export const Route = createFileRoute('/disclaimers')({
  head: () => ({ meta: [
    { title: 'Final expense disclosures — PolicyBear' },
    { name: 'description', content: 'Understand final expense benefits, waiting periods, policy limitations and the illustrative PolicyBear experience.' },
    { property: 'og:title', content: 'Final expense disclosures — PolicyBear' },
    { property: 'og:description', content: 'Important information about final expense coverage and illustrative prices and decisions.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Disclaimers,
})

function Disclaimers() {
  return <LegalPage title="Final expense disclosures" intro="Clear information before you make a decision for your family.">
    <section><h2>What final expense coverage is</h2><p>Final expense insurance is a form of life insurance intended to help loved ones with funeral, burial, cremation and other final bills. It is not a prepaid funeral arrangement, savings account or government benefit. The named beneficiary receives benefits under the policy and decides how to use them.</p></section>
    <section><h2>Prices and eligibility</h2><p>Actual premiums, coverage amounts and eligibility vary by insurer, age, health, tobacco use, state and other underwriting factors. A price illustration is not a binding offer. No-medical-exam coverage may still require health questions and underwriting; it does not mean automatic approval.</p></section>
    <section><h2>Waiting periods and limited benefits</h2><p>Some graded-benefit or guaranteed-issue final expense policies limit benefits for death from natural causes during an initial period. The length of that period, any return of premiums or interest, and accidental-death provisions depend on the actual policy. Do not assume every plan pays the full benefit immediately.</p></section>
    <section><h2>Keeping a policy in force</h2><p>Premiums must be paid as required by the policy. Exclusions, contestability provisions, lapse rules and other limitations may affect benefits. Any promise of level premiums or lifetime coverage must be confirmed in the insurer’s policy documents.</p></section>
    <section><h2>Existing coverage and your right to review</h2><p>Before replacing an existing policy, compare costs, benefits and any new waiting or contestability periods. Do not cancel existing coverage until you understand the replacement and it is in force. Ask the insurer about your state’s policy-review or “free-look” period, cancellation rights and required replacement notices.</p></section>
    <section><h2>This website is an illustration</h2><p>The quote and application journey uses sample prices and simulated decisions. It does not submit an insurance application, process a payment, send a verification message or issue a policy. An approval or confirmation screen does not create coverage. Use sample information only, especially for Social Security and payment fields.</p><p>Carrier documents, disclosures, contact consent and state-specific notices shown as placeholders must be replaced and reviewed before this experience can be used for real applications.</p></section>
    <section><h2>Consumer information</h2><p>Read the <a href="https://content.naic.org/consumer/life-insurance" target="_blank" rel="noreferrer">NAIC’s life insurance consumer information</a> and contact your state insurance department for questions about final expense insurance and your rights.</p></section>
  </LegalPage>
}