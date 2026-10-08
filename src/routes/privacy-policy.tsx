import { createFileRoute } from '@tanstack/react-router'
import { LegalDocumentPage } from '@/components/legal-document-page'

export const Route = createFileRoute('/privacy-policy')({
  head: () => ({ meta: [
    { title: "Privacy Policy \u2014 PolicyBear" },
    { name: 'description', content: "How Policy Bear collects, uses and protects information, and your privacy choices and rights." },
    { property: 'og:title', content: "Privacy Policy \u2014 PolicyBear" },
    { property: 'og:description', content: "How Policy Bear collects, uses and protects information, and your privacy choices and rights." },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://policy-bear-quote-quest.lovable.app/privacy-policy' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ], links: [{ rel: 'canonical', href: 'https://policy-bear-quote-quest.lovable.app/privacy-policy' }] }),
  component: () => <LegalDocumentPage documentKey="privacy" />,
})
