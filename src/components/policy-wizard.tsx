import { useEffect, useMemo, useRef, useState } from 'react'
import { AlertCircle, ArrowLeft, ArrowRight, Check, ChevronDown, ClipboardCheck, Eye, EyeOff, Heart, Landmark, LockKeyhole, MapPin, Minus, PenLine, Phone, Plus, RotateCcw, ShieldCheck, Sparkles, User, Users } from 'lucide-react'
import * as Radio from '@radix-ui/react-radio-group'
import * as Checkbox from '@radix-ui/react-checkbox'
import { z } from 'zod'
import { Link, useRouterState } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { calculatePrice, chapterFor, determineOutcome, formatSSN, healthQuestions, journeySteps, quoteSteps, sanitizedAnswers, US_STATES, type JourneyStep, type Outcome } from '@/lib/final-expense-demo'

type Answers = {
  zip: string; city: string; state: string; who: string; month: string; day: string; year: string
  gender: string; tobacco: string; feet: string; inches: string; weight: string; coverage: string
  firstName: string; middleName: string; lastName: string; email: string; phone: string
  street: string; apt: string; country: string; birthState: string; citizen: string; resident: string
  owner: string; ssn: string; beneficiaryType: string; beneficiaryFirst: string; beneficiaryLast: string
  relationship: string; beneficiaryPhone: string; otherInsurance: string; replacing: string
  paymentMethod: string; accountName: string; accountType: string; routing: string; account: string
  accountConfirm: string; card: string; expiry: string; paymentZip: string; draftDate: string
  signature: string; callbackTime: string; coverageType: string; health: string[]
}
type StringAnswerKey = Exclude<keyof Answers, 'health'>
type AddressSuggestion = { street: string; city: string; state: string; zip: string }
const blank: Answers = { zip: '', city: '', state: '', who: '', month: '', day: '', year: '', gender: '', tobacco: '', feet: '', inches: '', weight: '', coverage: '15000', firstName: '', middleName: '', lastName: '', email: '', phone: '', street: '', apt: '', country: 'United States', birthState: '', citizen: '', resident: '', owner: '', ssn: '', beneficiaryType: 'A person', beneficiaryFirst: '', beneficiaryLast: '', relationship: '', beneficiaryPhone: '', otherInsurance: '', replacing: '', paymentMethod: 'Bank account', accountName: '', accountType: 'Checking', routing: '', account: '', accountConfirm: '', card: '', expiry: '', paymentZip: '', draftDate: '1st of the month', signature: '', callbackTime: '', coverageType: '', health: Array(8).fill('') }
const labels = ['Quote', 'About you', 'Health', 'Payment', 'Sign']
const phone = '[FE_PHONE]'
const demoAddresses: AddressSuggestion[] = [
  { street: '123 Main Street', city: 'Orlando', state: 'FL', zip: '32801' },
  { street: '125 Main Street', city: 'Dallas', state: 'TX', zip: '75201' },
  { street: '129 Main Street', city: 'Columbus', state: 'OH', zip: '43215' },
  { street: '456 Oak Avenue', city: 'Phoenix', state: 'AZ', zip: '85004' },
  { street: '460 Oak Avenue', city: 'Tampa', state: 'FL', zip: '33602' },
  { street: '789 Pine Road', city: 'Charlotte', state: 'NC', zip: '28202' },
  { street: '812 Cedar Lane', city: 'Nashville', state: 'TN', zip: '37201' },
  { street: '925 Maple Drive', city: 'Atlanta', state: 'GA', zip: '30303' },
]

export function PolicyWizard({ onStepChange }: { onStepChange: (step: number) => void }) {
  const routeHash = useRouterState({ select: (state) => state.location.hash })
  const [screen, setScreen] = useState<JourneyStep>('zip')
  const [answers, setAnswers] = useState<Answers>(blank)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)
  const [resume, setResume] = useState(false)
  const [demo, setDemo] = useState(false)
  const [forced, setForced] = useState<Outcome | ''>('')
  const [annual, setAnnual] = useState(false)
  const [otherAmount, setOtherAmount] = useState(false)
  const [showSSN, setShowSSN] = useState(false)
  const [consent, setConsent] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [documents, setDocuments] = useState(false)
  const [signed, setSigned] = useState(false)
  const [signatureMode, setSignatureMode] = useState<'type' | 'draw'>('type')
  const [signatureStyle, setSignatureStyle] = useState(0)
  const [hasDrawing, setHasDrawing] = useState(false)
  const [authorized, setAuthorized] = useState(false)
  const [code, setCode] = useState('')
  const [loadingLine, setLoadingLine] = useState(0)
  const [policyNumber, setPolicyNumber] = useState('')
  const [addressMenuOpen, setAddressMenuOpen] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const screenIndex = journeySteps.indexOf(screen)
  const quoteIndex = quoteSteps.findIndex((step) => step === screen)
  const age = useMemo(() => {
    const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(answers.month)
    if (!answers.year || !answers.day || monthIndex < 0) return Number.NaN
    const birthday = new Date(Number(answers.year), monthIndex, Number(answers.day))
    if (birthday.getFullYear() !== Number(answers.year) || birthday.getMonth() !== monthIndex || birthday.getDate() !== Number(answers.day)) return Number.NaN
    const today = new Date()
    return today.getFullYear() - birthday.getFullYear() - (today < new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate()) ? 1 : 0)
  }, [answers.day, answers.month, answers.year])
  const coverage = Number(answers.coverage) || 15000
  const naturalOutcome = determineOutcome(answers.health)
  const outcome = forced || naturalOutcome
  const coverageType = screen === 'gi-offer' || answers.coverageType === 'Guaranteed Issue' ? 'guaranteed' : outcome === 'graded' ? 'graded' : 'immediate'
  const monthly = calculatePrice(age || 68, answers.gender || 'Female', coverage, answers.tobacco, coverageType)
  const shownPrice = annual ? monthly * 12 * .95 : monthly
  const addressSuggestions = useMemo(() => {
    const raw = answers.street.trim()
    const query = raw.toLowerCase()
    if (query.length < 2) return []
    const titled = raw.replace(/\s+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    const hasSuffix = /\b(st|street|ave|avenue|rd|road|dr|drive|ln|lane|blvd|ct|court|way|pl|place)\.?$/i.test(raw)
    const local = { city: answers.city, state: answers.state, zip: answers.zip }
    const generated: AddressSuggestion[] = hasSuffix
      ? [{ street: titled, ...local }]
      : ['Street', 'Avenue', 'Road', 'Drive'].map((suffix) => ({ street: `${titled} ${suffix}`, ...local }))
    const matches = demoAddresses.filter((address) => `${address.street} ${address.city} ${address.state} ${address.zip}`.toLowerCase().includes(query))
    return [...generated, ...matches].slice(0, 5)
  }, [answers.street, answers.city, answers.state, answers.zip])

  useEffect(() => {
    let savedStep: JourneyStep | undefined
    try {
      const saved = JSON.parse(localStorage.getItem('policybear-demo') || 'null')
      if (saved?.answers && Date.now() - saved.at < 7 * 86400000) {
        const restored = { ...blank, ...(saved.answers as Partial<Answers>), ssn: '', routing: '', account: '', accountConfirm: '', card: '', expiry: '', paymentZip: '', health: [...blank.health, ...(Array.isArray(saved.answers.health) ? saved.answers.health : [])].slice(0, 8) }
        setAnswers(restored)
        localStorage.setItem('policybear-demo', JSON.stringify({ answers: sanitizedAnswers(restored), screen: saved.screen, at: Date.now() }))
        if (journeySteps.includes(saved.screen)) savedStep = saved.screen
        setResume(true)
      }
    } catch { /* Browsing privacy settings should not block the demo. */ }
    const fromHash = location.hash.replace('#step-', '') as JourneyStep
    if (journeySteps.includes(fromHash)) setScreen(fromHash)
    else if (savedStep) setScreen(savedStep)
    setReady(true)
    const hashChange = () => { const next = location.hash.replace('#step-', '') as JourneyStep; if (journeySteps.includes(next)) setScreen(next) }
    window.addEventListener('hashchange', hashChange)
    return () => window.removeEventListener('hashchange', hashChange)
  }, [])

  useEffect(() => {
    const next = routeHash.replace(/^#?step-/, '') as JourneyStep
    if (!journeySteps.includes(next)) return
    setScreen(next)
    setError('')
    setResume(false)
    if (next === 'zip') window.scrollTo({ top: 0, behavior: 'instant' })
  }, [routeHash])

  useEffect(() => {
    if (!ready) return
    try { localStorage.setItem('policybear-demo', JSON.stringify({ answers: sanitizedAnswers(answers), screen, at: Date.now() })) } catch { /* Continue without persistence. */ }
    onStepChange(screen === 'zip' ? 0 : 1)
  }, [answers, onStepChange, ready, screen])

  useEffect(() => {
    if (!ready) return
    heading.current?.focus({ preventScroll: true })
    if (screen === 'zip' || !window.matchMedia('(max-width: 800px)').matches) return
    let second = 0
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        document.getElementById('get-covered')?.scrollIntoView({ block: 'start', behavior: 'instant' })
      })
    })
    return () => { cancelAnimationFrame(first); if (second) cancelAnimationFrame(second) }
  }, [ready, screen])

  useEffect(() => {
    if (!['loading', 'underwriting', 'submitting'].includes(screen)) return
    setLoadingLine(0)
    const first = window.setTimeout(() => setLoadingLine(1), 650)
    const second = window.setTimeout(() => setLoadingLine(2), 1300)
    const finish = window.setTimeout(() => {
      if (screen === 'loading') go('price')
      if (screen === 'underwriting') go('decision')
      if (screen === 'submitting') { setPolicyNumber(`PB-FE-${Math.floor(100000 + Math.random() * 900000)}`); go('issued') }
    }, screen === 'underwriting' ? 2800 : 2200)
    return () => { clearTimeout(first); clearTimeout(second); clearTimeout(finish) }
  }, [screen])

  const update = (key: StringAnswerKey, value: string) => { setAnswers((current) => ({ ...current, [key]: value })); setError('') }
  const go = (next: JourneyStep) => { setError(''); setResume(false); location.hash = `step-${next}`; setScreen(next) }
  const advance = (next: JourneyStep) => window.setTimeout(() => go(next), 300)
  const back = () => { const previous = journeySteps[Math.max(0, screenIndex - 1)]; if (previous) go(previous) }
  const choose = (key: StringAnswerKey, value: string, next?: JourneyStep) => { update(key, value); if (next) advance(next) }
  const chooseAddress = (address: AddressSuggestion) => {
    setAnswers((current) => ({ ...current, street: address.street, city: address.city || current.city, state: address.state || current.state, zip: address.zip || current.zip }))
    setAddressMenuOpen(false)
    setError('')
  }
  const healthChoice = (index: number, value: string) => {
    setAnswers((current) => ({ ...current, health: current.health.map((answer, i) => i === index ? value : answer) }))
    advance(index === 7 ? 'health-review' : (`h${index + 2}` as JourneyStep))
  }
  const validDOB = age >= 50 && age <= 85 && Boolean(answers.day && answers.month && answers.year)
  const field = (key: StringAnswerKey, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => {
    const numeric = ['zip', 'weight', 'routing', 'account', 'accountConfirm', 'card', 'paymentZip'].includes(key)
    const telephone = ['phone', 'beneficiaryPhone'].includes(key)
    const autofill: Partial<Record<StringAnswerKey, string>> = { firstName: 'given-name', middleName: 'additional-name', lastName: 'family-name', email: 'email', phone: 'tel', zip: 'postal-code', signature: 'name' }
    return <label className="field-label">{label}<input className="text-field" name={key} inputMode={numeric ? 'numeric' : telephone ? 'tel' : undefined} autoComplete={autofill[key] || 'off'} enterKeyHint="next" value={answers[key]} onChange={(event) => update(key, event.target.value)} maxLength={100} {...props} /></label>
  }
  const select = (key: StringAnswerKey, label: string, options: string[], disabled = false) => <label className="field-label">{label}<select value={answers[key]} disabled={disabled} onChange={(event) => update(key, event.target.value)}><option value="">{label}</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label>
  const cards = (key: StringAnswerKey, options: string[], next?: JourneyStep) => <Radio.Root aria-label={key} value={answers[key]} onValueChange={(value) => choose(key, value, next)} className="answer-list">{options.map((option) => <Radio.Item className="answer-card" key={option} value={option}><span className="answer-copy"><strong>{option}</strong></span><span className="radio-circle"><Radio.Indicator><Check /></Radio.Indicator></span></Radio.Item>)}</Radio.Root>
  const submitNext = (next: JourneyStep, valid = true, message = 'Please complete the required fields.') => (event: React.FormEvent) => { event.preventDefault(); if (!valid) { setError(message); return } go(next) }
  const continueTo = (next: JourneyStep, label = 'Continue') => <Button type="button" variant="quiet" className="continue-optional" onClick={() => go(next)}>{label} <ArrowRight /></Button>
  const trust = null

  const shell = (title: string, helper: string, content: React.ReactNode, options?: { back?: boolean; compact?: boolean }) => <>
    {options?.back !== false && screen !== 'zip' && !['loading', 'underwriting', 'submitting'].includes(screen) && <Button variant="quiet" className="back-button" onClick={back}><ArrowLeft /> Back</Button>}
    <div className={`wizard-content ${options?.compact ? 'compact-content' : ''}`} key={screen}>
      <h2 id="wizard-title" ref={heading} tabIndex={-1}>{title}</h2>
      {helper && <p className="question-helper">{helper}</p>}
      {content}
      {error && <div className="form-error" role="alert"><AlertCircle /> {error}</div>}
    </div>
  </>

  function renderScreen() {
    if (screen === 'zip') return shell("Let's start with your ZIP code", 'Prices and plans depend on where you live.', <form onSubmit={submitNext('who', /^\d{5}$/.test(answers.zip))}>{field('zip', 'ZIP code', { inputMode: 'numeric', placeholder: 'Enter your 5-digit ZIP', maxLength: 5, onChange: (event) => update('zip', event.target.value.replace(/\D/g, '').slice(0, 5)) })}{/^\d{5}$/.test(answers.zip) && <p className="valid-note"><Check /> ZIP code ready</p>}<Button variant="action" size="touch" className="continue-button">Check my options <ArrowRight /></Button>{trust}</form>, { back: false })
    if (screen === 'who') return shell('Who is this final expense coverage for?', '', <><Radio.Root aria-label="Who coverage protects" value={answers.who} onValueChange={(value) => { update('who', value); if (value === 'Me') advance('contact') }} className="answer-list">{['Me', 'My spouse or partner', 'My mom or dad', 'Someone else'].map((option) => <Radio.Item className="answer-card" key={option} value={option}><span className="answer-copy"><strong>{option}</strong></span><span className="radio-circle"><Radio.Indicator><Check /></Radio.Indicator></span></Radio.Item>)}</Radio.Root>{answers.who === 'Me' && continueTo('contact')}{answers.who && answers.who !== 'Me' && <div className="help-panel"><p>Great that you’re helping! The person being covered needs to answer and sign. Are they with you now?</p><Button variant="action" size="touch" onClick={() => go('contact')}>Yes, they’ll answer <ArrowRight /></Button><Button variant="quiet" onClick={() => go('callback')}>No, call me later</Button></div>}</>)
    if (screen === 'dob') return shell("What's your date of birth?", 'Your age is the biggest factor in your price.', <form onSubmit={submitNext('gender', validDOB, 'Please enter a valid date for someone age 50 to 85.')}><div className="date-fields">{select('month', 'Month', Array.from({ length: 12 }, (_, i) => new Date(2026, i).toLocaleString('en', { month: 'short' })))}{select('day', 'Day', Array.from({ length: 31 }, (_, i) => String(i + 1)))}{select('year', 'Year', Array.from({ length: 36 }, (_, i) => String(new Date().getFullYear() - 50 - i)))}</div>{answers.year && <p className="valid-note">You’re {age}</p>}<Button variant="action" size="touch" className="continue-button">Continue <ArrowRight /></Button>{trust}</form>)
    if (screen === 'gender') return shell('Are you male or female?', 'Final expense insurers price coverage differently for men and women.', <>{cards('gender', ['Male', 'Female'], 'tobacco')}{answers.gender && continueTo('tobacco')}</>)
    if (screen === 'tobacco') return shell('Have you used tobacco or nicotine in the last 12 months?', 'Includes cigarettes, cigars, vaping, chewing tobacco, nicotine gum or patches.', <>{cards('tobacco', ['No', 'Yes'], 'size')}<p className="valid-note"><ShieldCheck /> Smokers can still get covered.</p>{answers.tobacco && continueTo('size')}</>)
    if (screen === 'size') return shell("What's your height and weight?", 'It helps us show a more accurate price.', <form onSubmit={submitNext('coverage', Boolean(answers.feet && answers.inches && z.coerce.number().min(80).max(500).safeParse(answers.weight).success))}><div className="height-fields">{select('feet', 'Feet', ['4', '5', '6', '7'])}{select('inches', 'Inches', Array.from({ length: 12 }, (_, i) => String(i)))}</div>{field('weight', 'Weight (lbs)', { inputMode: 'numeric', maxLength: 3 })}<Button variant="action" size="touch" className="continue-button">Continue <ArrowRight /></Button>{trust}</form>)
    if (screen === 'coverage') return shell('How much coverage would you like?', 'Consider funeral, burial or cremation costs and any other final bills.', <form onSubmit={submitNext('opt-in')}><Radio.Root value={answers.coverage} onValueChange={(value) => update('coverage', value)} className="answer-grid">{['10000', '15000', '20000', '25000'].map((value) => <Radio.Item className="answer-card" value={value} key={value}><span><strong>${Number(value).toLocaleString()}</strong></span><span className="radio-circle"><Radio.Indicator><Check /></Radio.Indicator></span></Radio.Item>)}</Radio.Root><Button variant="quiet" className="other-amount" type="button" onClick={() => setOtherAmount(!otherAmount)}>{otherAmount ? 'Choose a suggested amount' : 'Choose a different amount'}</Button>{otherAmount && <div className="coverage-control"><strong>${coverage.toLocaleString()}</strong><div><Button type="button" variant="quiet" aria-label="Decrease coverage" onClick={() => update('coverage', String(Math.max(COVERAGE_MIN, coverage - 1000)))}><Minus /></Button><input type="range" min="5000" max="55000" step="1000" value={coverage} onChange={(event) => update('coverage', event.target.value)} /><Button type="button" variant="quiet" aria-label="Increase coverage" onClick={() => update('coverage', String(Math.min(55000, coverage + 1000)))}><Plus /></Button></div></div>}<Button variant="action" size="touch" className="continue-button">Continue <ArrowRight /></Button>{trust}</form>)
    if (screen === 'contact') return shell('Let’s get to know you', '', <form onSubmit={submitNext('dob', Boolean(answers.firstName.trim() && answers.lastName.trim() && z.string().email().safeParse(answers.email).success && answers.phone.replace(/\D/g, '').length >= 10))}><div className="two-fields">{field('firstName', 'First name', { autoComplete: 'given-name' })}{field('lastName', 'Last name', { autoComplete: 'family-name' })}</div>{field('email', 'Email', { type: 'email', autoComplete: 'email' })}{field('phone', 'Mobile phone', { type: 'tel', placeholder: '(555) 555-5555', autoComplete: 'tel' })}<Button variant="action" size="touch" className="continue-button">Continue <ArrowRight /></Button></form>)
    if (screen === 'opt-in') return shell('Your final expense price is next', '', <form onSubmit={submitNext('loading', consent)}><div className="readonly-summary">Contact number <strong>{answers.phone || 'Not provided'}</strong><Button type="button" variant="quiet" onClick={() => go('contact')}>Edit</Button></div><ContactConsent checked={consent} onChange={setConsent} /><Button variant="action" size="touch" className="continue-button">See my price <ArrowRight /></Button><p className="valid-note"><LockKeyhole /> Demo only. No contact request is sent.</p></form>)
    if (screen === 'loading') return <LoadingState icon={<ShieldCheck />} title="Illustrating your final expense rate" lines={[`Checking plans in ${answers.state || 'your state'}`, 'Calculating your rate', 'Preparing your final expense illustration']} active={loadingLine} />
    if (screen === 'price') return shell(`Good news, ${answers.firstName || 'friend'}! Here’s your final expense illustration.`, '', <><PriceCard price={shownPrice} coverage={coverage} annual={annual} setAnnual={setAnnual} /><div className="coverage-control"><label htmlFor="price-coverage">Adjust your coverage</label><input id="price-coverage" type="range" min="5000" max="55000" step="1000" value={coverage} onChange={(event) => update('coverage', event.target.value)} /></div><div className="next-list"><strong>What happens next</strong><span>1. Answer a few health questions</span><span>2. Get an instant decision</span><span>3. Choose a beneficiary, payment and sign online</span></div><Button variant="action" size="touch" className="continue-button" onClick={() => go('personal')}>Apply now <ArrowRight /></Button><Button variant="quiet" className="wide-button" onClick={() => { update('coverageType', 'Guaranteed Issue'); go('gi-offer') }}>Prefer no health questions?</Button><a className="question-call" href={`tel:${phone}`}>Rather talk it through? Call {phone}</a><p className="fine-print">Illustrative final expense price only, not an insurance offer. [REPLACE_WITH_REAL_RATES]</p></>)
    if (screen === 'personal') return shell("Let's confirm a few details", '', <form onSubmit={submitNext('address', Boolean(answers.firstName && answers.lastName && answers.email && answers.phone))}><div className="two-fields">{field('firstName', 'First name')}{field('middleName', 'Middle name (optional)')}</div>{field('lastName', 'Last name')}<div className="readonly-summary">Date of birth <strong>{answers.month}/{answers.day}/{answers.year}</strong></div>{field('email', 'Email', { type: 'email' })}{field('phone', 'Phone', { type: 'tel' })}<NextButton /></form>)
    if (screen === 'address') return shell("What's your home address?", 'Start typing, then choose an address to fill in the rest.', <form onSubmit={submitNext('identity', Boolean(answers.street && answers.city && answers.state && /^\d{5}$/.test(answers.zip)))}><div className="address-lookup"><label className="field-label" htmlFor="street-address">Street address</label><div className="address-input-wrap"><MapPin aria-hidden="true" /><input id="street-address" className="text-field" value={answers.street} autoComplete="street-address" role="combobox" aria-autocomplete="list" aria-expanded={addressMenuOpen && addressSuggestions.length > 0} aria-controls="address-suggestions" placeholder="Start typing your street address" onFocus={() => setAddressMenuOpen(true)} onChange={(event) => { update('street', event.target.value); setAddressMenuOpen(true) }} onKeyDown={(event) => { if (event.key === 'Escape') setAddressMenuOpen(false) }} /></div>{addressMenuOpen && addressSuggestions.length > 0 && <div className="address-suggestions" id="address-suggestions" role="listbox" aria-label="Suggested addresses">{addressSuggestions.map((address) => <Button key={`${address.street}-${address.zip}`} type="button" variant="quiet" role="option" onMouseDown={(event) => event.preventDefault()} onClick={() => chooseAddress(address)}><MapPin aria-hidden="true" /><span><strong>{address.street}</strong><small>{[address.city, [address.state, address.zip].filter(Boolean).join(' ')].filter(Boolean).join(', ') || 'Tap to use this street'}</small></span></Button>)}</div>}</div>{field('apt', 'Apt (optional)', { autoComplete: 'address-line2' })}<div className="two-fields">{field('city', 'City', { autoComplete: 'address-level2' })}{field('state', 'State', { autoComplete: 'address-level1' })}</div>{field('zip', 'ZIP code', { inputMode: 'numeric', autoComplete: 'postal-code', maxLength: 5, onChange: (event) => update('zip', event.target.value.replace(/\D/g, '').slice(0, 5)) })}<NextButton /></form>)
    if (screen === 'identity') return shell('A few identity details', 'A final expense insurer may request identity details. Use sample information only in this demonstration.', <form onSubmit={submitNext('health-intro', Boolean(answers.country && answers.citizen && answers.owner && answers.ssn.length >= 4))}>{select('country', 'Country of birth', ['United States', 'Canada', 'Other'])}{answers.country === 'United States' && select('birthState', 'State of birth', US_STATES)}<p className="field-prompt">Are you a U.S. citizen?</p>{cards('citizen', ['Yes — U.S. citizen', 'No'])}{answers.citizen === 'No' && cards('resident', ['Yes — resident over 2 years', 'No — neither'])}<label className="field-label">Social Security number<div className="secure-field"><input value={answers.ssn} type={showSSN ? 'text' : 'password'} inputMode="numeric" maxLength={11} placeholder="123-45-6789" autoComplete="off" onChange={(event) => update('ssn', formatSSN(event.target.value))} /><Button type="button" variant="quiet" aria-label={showSSN ? 'Hide number' : 'Show number'} onClick={() => setShowSSN(!showSSN)}>{showSSN ? <EyeOff /> : <Eye />}</Button></div></label><p className="valid-note"><LockKeyhole /> Use sample numbers only. This field is not saved.</p><p className="field-prompt">Will you be the policy owner and the person paying?</p>{cards('owner', ['Yes', 'No'])}{(answers.resident === 'No — neither' || answers.owner === 'No') ? <Button type="button" variant="action" size="touch" className="wide-button" onClick={() => go('ineligible')}>See how an agent can help</Button> : <NextButton />}</form>)
    if (screen === 'health-intro') return shell('A few questions about your health', 'Eight yes-or-no questions help illustrate which final expense coverage may be available.', <Button variant="action" size="touch" className="continue-button" onClick={() => go('h1')}>Let’s begin <ArrowRight /></Button>)
    if (/^h[1-8]$/.test(screen)) { const index = Number(screen.slice(1)) - 1; const item = healthQuestions[index] ?? { topic: 'Your health', question: 'Health question', explain: '' }; return shell(item.question, '', <><div className="health-progress"><div className="progress-track"><div className="progress-fill" style={{ width: `${((index + 1) / 8) * 100}%` }} /></div><span>{index + 1} of 8</span></div><Radio.Root aria-label={`Health question ${index + 1}`} value={answers.health[index] || ''} onValueChange={(value) => healthChoice(index, value)} className="health-choices"><Radio.Item className="answer-card" value="No"><span className="answer-copy"><strong>No</strong></span><span className="radio-circle"><Radio.Indicator><Check /></Radio.Indicator></span></Radio.Item><Radio.Item className="answer-card" value="Yes"><span className="answer-copy"><strong>Yes</strong></span><span className="radio-circle"><Radio.Indicator><Check /></Radio.Indicator></span></Radio.Item></Radio.Root>{answers.health[index] && continueTo(index === 7 ? 'health-review' : `h${index + 2}` as JourneyStep)}</>) }
    if (screen === 'health-review') return shell('Review your health answers', 'Please make sure each answer is true and complete.', <>{healthQuestions.map((item, index) => <div className="review-row" key={item.topic}><span><small>Question {index + 1} · {item.topic}</small>{item.question}</span><strong>{answers.health[index] || '—'}</strong><Button variant="quiet" onClick={() => go(`h${index + 1}` as JourneyStep)}>Edit</Button></div>)}<CheckRow checked={confirmed} onChange={setConfirmed}>My answers are true and complete to the best of my knowledge.</CheckRow><Button variant="action" size="touch" className="continue-button" disabled={!confirmed} onClick={() => go('underwriting')}>Get my decision <ArrowRight /></Button></>)
    if (screen === 'underwriting') return <LoadingState icon={<ShieldCheck />} title="Reviewing your application" lines={['Reviewing your answers', 'Checking eligibility', 'Preparing your decision']} active={loadingLine} />
    if (screen === 'decision') return <Decision outcome={outcome} firstName={answers.firstName} coverage={coverage} price={monthly} onContinue={() => go(outcome === 'declined' ? 'gi-offer' : 'beneficiary')} onCallback={() => go('callback')} />
    if (screen === 'gi-offer') return shell('Guaranteed-issue final expense coverage', 'No health questions. Ages 50–85.', <><Radio.Root value={answers.coverage} onValueChange={(value) => update('coverage', value)} className="answer-grid">{['5000', '10000', '15000', '20000', '25000'].map((value) => <Radio.Item className="answer-card" value={value} key={value}><strong>${Number(value).toLocaleString()}</strong><span className="radio-circle"><Radio.Indicator><Check /></Radio.Indicator></span></Radio.Item>)}</Radio.Root><PriceCard price={calculatePrice(age || 68, answers.gender || 'Female', Math.min(coverage, 25000), answers.tobacco, 'guaranteed')} coverage={Math.min(coverage, 25000)} annual={annual} setAnnual={setAnnual} /><div className="info-panel">If death occurs from natural causes in the first 2 years, your beneficiary receives the premiums paid plus interest. Accidental loss is covered in full from day one. After 2 years, the full benefit is paid. [CARRIER_TO_CONFIRM]</div><Button variant="action" size="touch" className="continue-button" onClick={() => { update('coverageType', 'Guaranteed Issue'); go('beneficiary') }}>Continue <ArrowRight /></Button></>)
    if (screen === 'beneficiary') return shell('Who should receive your final expense benefit?', 'This person can use the benefit for funeral costs and other final bills. Policy terms govern beneficiary changes.', <form onSubmit={submitNext('insurance', answers.beneficiaryType !== 'A person' || Boolean(answers.beneficiaryFirst && answers.beneficiaryLast))}>{cards('beneficiaryType', ['A person', 'My estate', 'All my children, equally', 'A trust', 'A charity or organisation'])}{answers.beneficiaryType === 'A person' && <><div className="two-fields">{field('beneficiaryFirst', 'First name')}{field('beneficiaryLast', 'Last name')}</div>{select('relationship', 'Relationship', ['Spouse', 'Husband', 'Wife', 'Son', 'Daughter', 'Grandson', 'Granddaughter', 'Brother', 'Sister', 'Mother', 'Father', 'Nephew', 'Niece', 'Friend', 'Domestic Partner', 'Other'])}{field('beneficiaryPhone', 'Phone (optional)', { type: 'tel' })}</>}<Button type="button" variant="quiet" className="wide-button">+ Add a backup beneficiary</Button><NextButton /></form>)
    if (screen === 'insurance') return shell('Do you have any other life insurance or annuities, or a pending application?', '', <>{cards('otherInsurance', ['No', 'Yes'])}{answers.otherInsurance === 'Yes' && <div className="info-panel"><p>Will this policy replace or be paid for by cancelling any of them?</p>{cards('replacing', ['No', 'Yes'])}{answers.replacing === 'Yes' && <p>We’ll include a replacement notice in your documents. [STATE_REPLACEMENT_FORMS]</p>}</div>}<Button variant="action" size="touch" className="continue-button" disabled={!answers.otherInsurance || (answers.otherInsurance === 'Yes' && !answers.replacing)} onClick={() => go('payment')}>Continue <ArrowRight /></Button></>)
    if (screen === 'payment') return shell(`How would you like to pay your $${monthly.toFixed(2)} monthly premium?`, '', <form onSubmit={submitNext('draft', authorized && (answers.paymentMethod === 'Bank account' ? Boolean(answers.routing.length === 9 && answers.account && answers.account === answers.accountConfirm) : Boolean(answers.card && answers.expiry)))}>{cards('paymentMethod', ['Bank account', 'Debit or credit card'])}{answers.paymentMethod === 'Bank account' ? <>{field('accountName', 'Account holder name')}{select('accountType', 'Account type', ['Checking', 'Savings'])}{field('routing', 'Routing number', { inputMode: 'numeric', maxLength: 9 })}{answers.routing.length === 9 && <p className="valid-note"><Landmark /> First National Bank</p>}{field('account', 'Account number', { type: 'password', inputMode: 'numeric' })}{field('accountConfirm', 'Confirm account number', { type: 'password', inputMode: 'numeric' })}</> : <>{field('accountName', 'Name on card')}{field('card', 'Card number', { inputMode: 'numeric' })}<div className="two-fields">{field('expiry', 'Expiry')}{field('paymentZip', 'ZIP')}</div><p className="placeholder-note">[IF_CARRIER_ALLOWS]</p></>}<CheckRow checked={authorized} onChange={setAuthorized}>I authorize the insurance company to draft my premium from this account.</CheckRow><p className="valid-note"><LockKeyhole /> Use sample payment details only. No payment is submitted.</p><NextButton /></form>)
    if (screen === 'draft') return shell('When would you like your payment taken each month?', '', <>{cards('draftDate', ['1st of the month', '3rd of the month (Social Security day)', '2nd Wednesday', '3rd Wednesday', '4th Wednesday', 'Pick a date'])}<div className="summary-card"><span>First payment</span><strong>{answers.draftDate}</strong></div><Button variant="action" size="touch" className="continue-button" onClick={() => go('review')}>Continue <ArrowRight /></Button></>)
    if (screen === 'review') { const reviewRows: Array<[string, string, JourneyStep]> = [['About you', `${answers.firstName} ${answers.lastName}`, 'personal'], ['Address', `${answers.street}, ${answers.city}`, 'address'], ['Health answers', `${answers.health.filter((value) => value === 'Yes').length} yes answers`, 'health-review'], ['Coverage & price', `$${coverage.toLocaleString()} · $${monthly.toFixed(2)}/month`, 'price'], ['Beneficiary', answers.beneficiaryType === 'A person' ? `${answers.beneficiaryFirst} ${answers.beneficiaryLast}` : answers.beneficiaryType, 'beneficiary'], ['Other insurance', answers.otherInsurance, 'insurance'], ['Payment', `${answers.paymentMethod} •••• ${answers.account.slice(-4) || answers.card.slice(-4)}`, 'payment'], ['Draft date', answers.draftDate, 'draft']]; return shell('Review your application', 'Check the details below before you sign.', <>{reviewRows.map(([label, value, target]) => <div className="review-row" key={label}><span><small>{label}</small>{value || 'Not provided'}</span><Button type="button" variant="quiet" onClick={() => go(target)}>Edit</Button></div>)}<Button variant="action" size="touch" className="continue-button" onClick={() => go('disclosures')}>Looks good — continue to sign <ArrowRight /></Button></>) }
    if (screen === 'disclosures') return shell('Please review your documents', '', <>{['Application', 'Authorization to release health information', 'Bank draft authorization', '[STATE_NOTICES]'].map((document) => <details className="document-row" key={document}><summary>{document}<ChevronDown /></summary><p>Prototype document text for review. Final carrier document will replace this placeholder.</p><Button variant="quiet">Download PDF (mock)</Button></details>)}<CheckRow checked={documents} onChange={setDocuments}>I have read and agree to the documents above.</CheckRow><Button variant="action" size="touch" className="continue-button" disabled={!documents} onClick={() => go('signature')}>Continue <ArrowRight /></Button></>)
    if (screen === 'signature') return shell('Sign your application', 'Choose how you would like to sign.', <><div className="signature-mode" role="group" aria-label="Signature method"><Button type="button" variant={signatureMode === 'type' ? 'action' : 'quiet'} onClick={() => setSignatureMode('type')}>Type signature</Button><Button type="button" variant={signatureMode === 'draw' ? 'action' : 'quiet'} onClick={() => setSignatureMode('draw')}><PenLine /> Draw signature</Button></div>{signatureMode === 'type' ? <>{field('signature', 'Full legal name')}<p className="field-prompt">Choose a signature style</p><div className="signature-styles" role="radiogroup" aria-label="Signature style">{['Classic', 'Smooth', 'Simple'].map((label, index) => <Button type="button" variant="quiet" role="radio" aria-checked={signatureStyle === index} className={signatureStyle === index ? 'selected' : ''} onClick={() => setSignatureStyle(index)} key={label}><span className={`signature-sample signature-style-${index}`}>{answers.signature || 'Your name'}</span><small>{label}</small></Button>)}</div><div className={`signature-preview signature-style-${signatureStyle}`}>{answers.signature || 'Your signature'}</div></> : <DrawSignature onChange={setHasDrawing} />}<p className="valid-note">Dated {new Date().toLocaleDateString()}</p><CheckRow checked={signed} onChange={setSigned}>I agree to sign electronically and that this is my legal signature.</CheckRow><Button variant="action" size="touch" className="continue-button" disabled={!signed || (signatureMode === 'type' ? answers.signature.trim().length < 3 : !hasDrawing)} onClick={() => go('verify')}>Continue <ArrowRight /></Button></>)
    if (screen === 'verify') return shell('Verify it’s you', `We sent a 6-digit code to ${answers.phone ? `(***) ***-${answers.phone.replace(/\D/g, '').slice(-4)}` : '(•••) •••-1234'} (mock).`, <><label className="field-label">Verification code<input className="text-field code-field" value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} inputMode="numeric" maxLength={6} autoComplete="one-time-code" /></label><p className="question-call">Any 6 digits work in this prototype.</p><Button variant="quiet" className="wide-button">Send by email instead</Button><Button variant="action" size="touch" className="continue-button" disabled={code.length !== 6} onClick={() => go('submitting')}>Sign and submit <ArrowRight /></Button></>)
    if (screen === 'submitting') return <LoadingState icon={<Sparkles />} title="Submitting your application…" lines={['Reviewing your signature', 'Issuing your policy…', 'All done!']} active={loadingLine} />
    if (screen === 'issued') return shell(`Final expense demo complete, ${answers.firstName || 'friend'}.`, '', <><div className="success-symbol"><Check /></div><div className="policy-card"><span>Policy number <strong>{policyNumber || 'PB-FE-000000'}</strong></span><span>Coverage <strong>${coverage.toLocaleString()}</strong></span><span>Monthly premium <strong>${monthly.toFixed(2)}</strong></span><span>First draft <strong>{answers.draftDate}</strong></span><span>Beneficiary <strong>{answers.beneficiaryFirst || answers.beneficiaryType}</strong></span><span>Coverage type <strong>{answers.coverageType || (outcome === 'graded' ? 'Graded' : 'Immediate')}</strong></span></div><div className="next-list"><strong>What happens next</strong><span>In a real final expense application, policy documents would be sent to {answers.email || 'your email'}.</span><span>Save our number {phone}.</span><span>Tell your beneficiary where to find your policy.</span></div><Button variant="action" size="touch" className="wide-button" onClick={() => window.print()}>Print this page</Button></>, { back: false })
    if (screen === 'callback') return shell('Request a call back', 'Discuss final expense options with an agent. This demo does not send a callback request.', <form onSubmit={submitNext('zip', Boolean(answers.firstName && answers.phone && consent))}>{field('firstName', 'Name')}{field('phone', 'Phone', { type: 'tel' })}{cards('callbackTime', ['Morning', 'Afternoon', 'Evening'])}<ContactConsent checked={consent} onChange={setConsent} /><Button variant="action" size="touch" className="wide-button">Request my call</Button></form>)
    return shell('An agent can help set this up for you', 'You still have options. Talk with a licensed agent for personal help.', <><Button asChild variant="action" size="touch" className="wide-button"><a href={`tel:${phone}`}><Phone /> Call {phone}</a></Button><Button variant="quiet" className="wide-button" onClick={() => go('callback')}>Request a call back</Button></>)
  }

  const chapter = chapterFor(screen)
  return <section className={`wizard ${screen !== 'zip' ? 'wizard-standalone' : ''}`} id="get-covered" aria-label="Final expense journey">
    {resume && <div className="resume-banner"><p>Welcome back, {answers.firstName || 'friend'}! Pick up where you left off?</p><div><Button variant="quiet" onClick={() => setResume(false)}>Continue</Button><Button variant="quiet" onClick={() => { setAnswers(blank); localStorage.removeItem('policybear-demo'); go('zip') }}>Start over</Button></div></div>}
    <div className="chapter-progress" aria-label="Application progress">{labels.map((label, index) => <span className={index === chapter ? 'current' : index < chapter ? 'complete' : ''} key={label}>{index < chapter && <Check />}{label}</span>)}</div>
    {quoteIndex >= 0 && <div className="progress-track"><div className="progress-fill" style={{ width: `${((quoteIndex + 1) / quoteSteps.length) * 100}%` }} /></div>}
    {screenIndex >= journeySteps.indexOf('personal') && screenIndex <= journeySteps.indexOf('issued') && <div className="mini-summary">Coverage ${coverage.toLocaleString()} · ${monthly.toFixed(2)}/mo <a href={`tel:${phone}`}>Need help? {phone}</a></div>}
    {renderScreen()}
    <div className="demo-wrap"><Button variant="quiet" className="demo-pill" aria-expanded={demo} onClick={() => setDemo(!demo)}>Demo</Button>{demo && <div className="demo-toolbar"><strong>Jump to a screen</strong><select aria-label="Demo screen" value={screen} onChange={(event) => go(event.target.value as JourneyStep)}>{journeySteps.map((item) => <option value={item} key={item}>{item.replaceAll('-', ' ')}</option>)}</select><strong>Force decision</strong><div>{(['approved', 'graded', 'declined'] as Outcome[]).map((item) => <Button variant={forced === item ? 'action' : 'quiet'} key={item} onClick={() => setForced(item)}>{item}</Button>)}</div></div>}</div>
  </section>
}

function ContactConsent({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return <div className="contact-consent">
    <CheckRow checked={checked} onChange={onChange}>
      <span className="consent-paragraph">By checking this box, I agree that PolicyBear and its licensed agents may call or text me about final expense insurance at the number above, including with automated technology or prerecorded messages, even if I’m on a Do Not Call list.</span>
      <span className="consent-paragraph">Consent isn’t required to buy. Message and data rates may apply. Reply STOP to opt out.</span>
      <span className="consent-paragraph">I agree to the <Link to="/terms-conditions" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</Link> and acknowledge the <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>.</span>
    </CheckRow>
    <p className="consent-resources"><Link to="/disclaimers" target="_blank" rel="noopener noreferrer">Final expense disclosures <ArrowRight aria-hidden="true" /></Link><span>Legal links open in a new tab so you won’t lose your place.</span></p>
  </div>
}
function NextButton() { return <Button variant="action" size="touch" className="continue-button">Continue <ArrowRight /></Button> }
function CheckRow({ checked, onChange, children }: { checked: boolean; onChange: (value: boolean) => void; children: React.ReactNode }) { return <label className="check-row"><Checkbox.Root checked={checked} onCheckedChange={(value) => onChange(value === true)}><Checkbox.Indicator><Check /></Checkbox.Indicator></Checkbox.Root><span>{children}</span></label> }
function DrawSignature({ onChange }: { onChange: (drawn: boolean) => void }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)

  const point = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    return { x: (event.clientX - bounds.left) * event.currentTarget.width / bounds.width, y: (event.clientY - bounds.top) * event.currentTarget.height / bounds.height }
  }
  const start = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const context = event.currentTarget.getContext('2d')
    if (!context) return
    const position = point(event)
    event.currentTarget.setPointerCapture(event.pointerId)
    context.beginPath()
    context.moveTo(position.x, position.y)
    drawing.current = true
  }
  const move = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return
    const context = event.currentTarget.getContext('2d')
    if (!context) return
    const position = point(event)
    context.lineWidth = 3
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.strokeStyle = getComputedStyle(event.currentTarget).getPropertyValue('--brand-deep').trim()
    context.lineTo(position.x, position.y)
    context.stroke()
    onChange(true)
  }
  const stop = () => { drawing.current = false }
  const clear = () => {
    const element = canvas.current
    const context = element?.getContext('2d')
    if (element && context) context.clearRect(0, 0, element.width, element.height)
    onChange(false)
  }

  return <div className="draw-signature"><div className="draw-heading"><span>Draw your signature below</span><Button type="button" variant="quiet" onClick={clear}><RotateCcw /> Clear</Button></div><canvas ref={canvas} width="470" height="180" aria-label="Draw your signature" onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onPointerLeave={stop} /><p>Use your finger, mouse, or trackpad.</p></div>
}
function LoadingState({ icon, title, lines, active }: { icon: React.ReactNode; title: string; lines: string[]; active: number }) { return <div className="loading-state" role="status"><div className="loading-symbol">{icon}</div><h2>{title}</h2><p>This usually takes a few seconds.</p><div>{lines.map((line, index) => <span className={index <= active ? 'done' : ''} key={line}><Check /> {line}</span>)}</div></div> }
function PriceCard({ price, coverage, annual, setAnnual }: { price: number; coverage: number; annual: boolean; setAnnual: (value: boolean) => void }) { return <div className="price-card"><div className="payment-toggle"><Button variant={!annual ? 'action' : 'quiet'} onClick={() => setAnnual(false)}>Monthly</Button><Button variant={annual ? 'action' : 'quiet'} onClick={() => setAnnual(true)}>Yearly</Button></div><p><strong>${price.toFixed(2)}</strong> /{annual ? 'year' : 'month'}</p><span>for <b>${coverage.toLocaleString()}</b> of final expense coverage</span>{annual && <small>Save 5% paying yearly</small>}<ul><li><Check /> Level-premium plan illustration</li><li><Check /> No medical exam</li><li><Check /> Lifetime coverage if premiums are paid</li></ul></div> }
function Decision({ outcome, firstName, coverage, price, onContinue, onCallback }: { outcome: Outcome; firstName: string; coverage: number; price: number; onContinue: () => void; onCallback: () => void }) {
  if (outcome === 'declined') return <div className="wizard-content"><div className="decision-symbol warm"><Heart /></div><h2>This demo shows a decline for this final expense plan — other options may be available.</h2><div className="option-card"><strong>Guaranteed-issue final expense</strong><p>No health questions. You can’t be turned down for health reasons.</p><Button variant="action" size="touch" onClick={onContinue}>See guaranteed coverage <ArrowRight /></Button></div><div className="option-card"><strong>Talk to a licensed agent</strong><p>An agent can discuss other final expense options with you.</p><Button variant="quiet" onClick={onCallback}>Request a call back</Button></div></div>
  const graded = outcome === 'graded'
  return <div className="wizard-content"><div className="decision-symbol"><Check /></div><h2>{graded ? `Good news, ${firstName || 'friend'} — this demo shows graded final expense coverage.` : `Congratulations, ${firstName || 'friend'}! This demo shows a final expense approval.`}</h2>{graded && <div className="info-panel">For the first 2 years, the full benefit is paid for accidental loss; for other causes, a partial benefit applies. From year 3, your family receives the full ${coverage.toLocaleString()}. [CARRIER_TO_CONFIRM]</div>}<div className="summary-card"><span>{graded ? 'Graded coverage' : 'Immediate full coverage'}</span><strong>${coverage.toLocaleString()} · ${price.toFixed(2)}/month</strong><small>{graded ? 'Benefit schedule shown above' : 'Full benefit from day one [CARRIER_TO_CONFIRM]'}</small></div><Button variant="action" size="touch" className="wide-button" onClick={onContinue}>{graded ? 'Accept and continue' : 'Continue to set up your policy'} <ArrowRight /></Button></div>
}