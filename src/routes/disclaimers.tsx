import { createFileRoute } from '@tanstack/react-router'
import { LegalDocumentPage } from '@/components/legal-document-page'

export const Route = createFileRoute('/disclaimers')({
  head: () => ({ meta: [
    { title: "Final Expense Insurance Disclosure \u2014 PolicyBear" },
    { name: 'description', content: "Understand final expense benefits, coverage types, waiting periods, premiums and policy limitations." },
    { property: 'og:title', content: "Final Expense Insurance Disclosure \u2014 PolicyBear" },
    { property: 'og:description', content: "Understand final expense benefits, coverage types, waiting periods, premiums and policy limitations." },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://policy-bear-quote-quest.lovable.app/disclaimers' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ], links: [{ rel: 'canonical', href: 'https://policy-bear-quote-quest.lovable.app/disclaimers' }] }),
  component: () => <LegalDocumentPage documentKey="disclosure" />,
})
