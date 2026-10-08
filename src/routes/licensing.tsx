import { createFileRoute } from '@tanstack/react-router'
import { LegalDocumentPage } from '@/components/legal-document-page'

export const Route = createFileRoute('/licensing')({
  head: () => ({ meta: [
    { title: "Licensing & Resources \u2014 PolicyBear" },
    { name: 'description', content: "Policy Bear agency licensing, represented insurers and independent consumer resources." },
    { property: 'og:title', content: "Licensing & Resources \u2014 PolicyBear" },
    { property: 'og:description', content: "Policy Bear agency licensing, represented insurers and independent consumer resources." },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://policy-bear-quote-quest.lovable.app/licensing' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ], links: [{ rel: 'canonical', href: 'https://policy-bear-quote-quest.lovable.app/licensing' }] }),
  component: () => <LegalDocumentPage documentKey="licensing" />,
})
