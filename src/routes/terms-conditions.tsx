import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/policy-site'

const URL = 'https://policy-bear-quote-quest.lovable.app/terms-conditions'

export const Route = createFileRoute('/terms-conditions')({
  head: () => ({ meta: [
    { title: 'Terms of service — PolicyBear' },
    { name: 'description', content: 'The terms that govern your use of the PolicyBear website and life insurance services.' },
    { property: 'og:title', content: 'Terms of service — PolicyBear' },
    { property: 'og:description', content: 'Read the terms for using PolicyBear, an independent licensed life insurance agency.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: URL },
    { name: 'twitter:card', content: 'summary_large_image' },
  ], links: [{ rel: 'canonical', href: URL }] }),
  component: Terms,
})

function Terms() {
  return <LegalPage title="Terms of service" intro="Effective date: Sept. 24, 2025. By accessing or using our website and services, you confirm that you have read, understood and agreed to be bound by these Terms. If you do not agree with any part of them, please do not use our services.">
    <section><h2>1. Who we are</h2><p>PolicyBear is a licensed life insurance agency that helps people explore and apply for life insurance, including final expense coverage. We work to make life insurance less confusing and more accessible.</p><p>We are a privately owned, independent agency. We are not affiliated with or endorsed by the U.S. government or any government agency.</p></section>
    <section><h2>2. Eligibility to use our services</h2><p>To use our website or apply for coverage through us, you must be at least 18 years old (or the legal age in your state), be a resident of the United States, and use the site only for personal, lawful and non-commercial purposes.</p></section>
    <section><h2>3. What you can or can’t do on our website</h2><p><strong>You may</strong> browse our content to learn about life insurance, submit your information to get personalized quotes, speak with licensed agents, and use our tools and calculators for educational purposes.</p><p><strong>You may not</strong> use our site for unlawful, fraudulent or misleading purposes; reverse engineer, scrape or attempt to extract source code; impersonate others or submit false information; or disrupt our systems or violate security features.</p></section>
    <section><h2>4. Accuracy of information</h2><p>We aim to keep all information on this site accurate and up to date. However, insurance rules and regulations change, we do not guarantee the completeness, accuracy or availability of all information at all times, and plan details and pricing can change. Final pricing and eligibility are determined by the insurance carrier.</p></section>
    <section><h2>5. No professional advice</h2><p>All content on our site is provided for informational and educational purposes only and does not constitute legal, financial or medical advice. Consult a licensed professional for personalized guidance before making decisions about your life insurance coverage.</p></section>
    <section><h2>6. Third-party services &amp; links</h2><p>Our site may link to third-party websites or services, such as life insurance carriers and affiliate tools and calculators. We are not responsible for the privacy practices, content or policies of these third parties.</p></section>
    <section><h2>7. Intellectual property</h2><p>All content on the PolicyBear website — including logos, branding and design elements; text, images, icons and graphics; and tools, calculators and downloads — is owned or licensed by us and protected by copyright and trademark laws. You may not copy, reproduce or republish our content without written permission.</p></section>
    <section><h2>8. Communication &amp; consent</h2><p>By using our services, you consent to our licensed agents contacting you about your life insurance needs as our representatives, including by phone call, email or text message (standard SMS/data rates may apply).</p></section>
    <section><h2>9. Disclaimer of warranties</h2><p>We provide our services “as is” and “as available,” with no warranties or guarantees of any kind, express or implied — including that our website will be uninterrupted or error-free, that every plan we present will be available in your area, or that everything on our site will always work to meet your expectations.</p></section>
    <section><h2>10. Limitation of liability</h2><p>To the fullest extent permitted by law, PolicyBear shall not be liable for any direct or indirect damages arising from your use of the site; errors, delays, outages or data loss; loss of eligibility or coverage due to inaccurate information provided by users; or decisions made by insurance carriers. We try our best to help you, but some things are out of our control.</p></section>
    <section><h2>11. Indemnification</h2><p>By using our services, you agree to indemnify and hold harmless PolicyBear and our team from any claims, damages or issues arising from your use or misuse of our site, your violation of these Terms, or your violation of any applicable law.</p></section>
    <section><h2>12. Updates to these terms</h2><p>We may update these Terms from time to time. A revised version with a new effective date will be posted, continued use of the site means you accept the updated Terms, and if changes are significant we will do our best to let you know.</p></section>
    <section><h2>13. Governing law</h2><p>These Terms follow U.S. law, no matter where you use our site from.</p></section>
    <section><h2>14. Contact us</h2><p><strong>PolicyBear – Legal Team</strong><br /><a href="tel:+18447652327">(844) POL-BEAR</a> · <a href="mailto:help@policybear.com">help@policybear.com</a><br />222 S. Rainbow Boulevard STE 216, Las Vegas, NV 89145<br />Mon–Fri: 8AM–8PM EST</p></section>
  </LegalPage>
}
