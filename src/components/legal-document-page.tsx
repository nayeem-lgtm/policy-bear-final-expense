import { Link } from '@tanstack/react-router'
import { LegalPage } from '@/components/policy-site'
import { legalDocuments, type LegalBlock } from '@/lib/legal-content'

function LegalBlockContent({ block }: { block: LegalBlock }) {
  switch (block.kind) {
    case 'paragraph': return <p>{block.text}</p>
    case 'subheading': return <h3>{block.text}</h3>
    case 'list': return <ul>{block.items.map(item => <li key={item}>{item}</li>)}</ul>
    case 'ordered': return <ol>{block.items.map(item => <li key={item}>{item}</li>)}</ol>
    case 'grid': return <ul className="legal-name-grid">{block.items.map(item => <li key={item}>{item}</li>)}</ul>
    case 'details': return <dl className="license-details">{block.rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    case 'table': return <div className="legal-table-scroll" role="region" aria-label="Coverage types and waiting periods" tabIndex={0}><table className="legal-coverage-table"><thead><tr>{block.headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{block.rows.map(row => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={index}>{cell}</th> : <td key={index}>{cell}</td>)}</tr>)}</tbody></table></div>
  }
}

export function LegalDocumentPage({ documentKey }: { documentKey: keyof typeof legalDocuments }) {
  const document = legalDocuments[documentKey]
  return <LegalPage title={document.title} intro={document.intro[0] ?? ''} date={document.date}>
    {document.intro.slice(1).map(paragraph => <p className="legal-opening" key={paragraph}>{paragraph}</p>)}
    <p className="legal-demo-notice"><strong>About this preview:</strong> This journey uses simulated prices and decisions. No application or payment is submitted, and an approval screen does not create coverage. The supplied legal text below describes Policy Bear’s services.</p>
    <div className="legal-document-layout">
      <nav className="legal-toc" aria-label="On this page"><h2>On this page</h2><ol>{document.sections.map((section, index) => <li key={section.title}><a href={`#legal-section-${index + 1}`}>{section.title}</a></li>)}</ol></nav>
      <article className="legal-document-body">{document.sections.map((section, index) => <section id={`legal-section-${index + 1}`} key={section.title}><h2>{section.title}</h2>{section.blocks.map((block, blockIndex) => <LegalBlockContent key={blockIndex} block={block} />)}</section>)}</article>
    </div>
    <nav className="legal-related" aria-label="Related legal documents"><h2>Related documents</h2><div><Link to="/privacy-policy">Privacy Policy</Link><Link to="/terms-conditions">Terms of Service</Link><Link to="/disclaimer">Disclaimer</Link><Link to="/licensing">Licensing &amp; Resources</Link><Link to="/disclaimers">Final Expense Insurance Disclosure</Link></div></nav>
  </LegalPage>
}