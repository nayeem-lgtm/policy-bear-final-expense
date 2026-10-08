import { createFileRoute } from '@tanstack/react-router'
import { LegalDocumentPage } from '@/components/legal-document-page'

export const Route = createFileRoute('/terms-conditions')({
  head: () => ({ meta: [
    { title: "Terms of Service \u2014 PolicyBear" },
    { name: 'description', content: "Terms for using Policy Bear\u2019s website, quote tools and life insurance services." },
    { property: 'og:title', content: "Terms of Service \u2014 PolicyBear" },
    { property: 'og:description', content: "Terms for using Policy Bear\u2019s website, quote tools and life insurance services." },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://policy-bear-quote-quest.lovable.app/terms-conditions' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ], links: [{ rel: 'canonical', href: 'https://policy-bear-quote-quest.lovable.app/terms-conditions' }] }),
  component: () => <LegalDocumentPage documentKey="terms" />,
})
