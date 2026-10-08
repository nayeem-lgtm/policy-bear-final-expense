import { createFileRoute } from '@tanstack/react-router'
import { LegalDocumentPage } from '@/components/legal-document-page'

export const Route = createFileRoute('/disclaimer')({
  head: () => ({ meta: [
    { title: "Disclaimer \u2014 PolicyBear" },
    { name: 'description', content: "Important limitations on Policy Bear website information, estimates and insurance services." },
    { property: 'og:title', content: "Disclaimer \u2014 PolicyBear" },
    { property: 'og:description', content: "Important limitations on Policy Bear website information, estimates and insurance services." },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://policy-bear-quote-quest.lovable.app/disclaimer' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ], links: [{ rel: 'canonical', href: 'https://policy-bear-quote-quest.lovable.app/disclaimer' }] }),
  component: () => <LegalDocumentPage documentKey="disclaimer" />,
})
