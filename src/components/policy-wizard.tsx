import { useEffect, useMemo, useRef, useState } from 'react'
import { AlertCircle, ArrowLeft, ArrowRight, Check, ChevronDown, Clock, Cigarette, ClipboardCheck, Eye, EyeOff, Fingerprint, Heart, Landmark, LockKeyhole, MapPin, Mars, Minus, Moon, PenLine, Phone, Plus, RotateCcw, ShieldCheck, Sparkles, Sun, Sunrise, User, UserRound, Users, Venus, X } from 'lucide-react'
import * as Radio from '@radix-ui/react-radio-group'
import * as Checkbox from '@radix-ui/react-checkbox'
import { z } from 'zod'
import { Link, useRouterState } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import bearLogo from '@/assets/policybear-logo.asset.json'
import bearGuide from '@/assets/bear-guide-full.png'

const bearTips: Partial<Record<string, { myth: string; fact: string }>> = {
  gender: { myth: 'Life insurance is too expensive', fact: '50% of people overestimate the cost of life insurance' },
  dob: { myth: 'Applying for life insurance is a hassle', fact: 'Applying for life insurance is fast and easy' },
  coverage: { myth: 'The group life insurance I get at work is enough', fact: 'Group life insurance may not cover your family’s needs' },
  tobacco: { myth: 'I don’t have dependents so I don’t need life insurance', fact: 'Life insurance will pay off student loans or mortgages in the event of your death' },
}

import { COVERAGE_MAX, COVERAGE_MIN, LICENSED_STATES, calculatePrice, chapterFor, determineOutcome, formatSSN, healthQuestions, journeySteps, quoteSteps, sanitizedAnswers, US_STATES, type JourneyStep, type Outcome } from '@/lib/final-expense-demo'

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
const blank: Answers = { zip: '', city: '', state: '', who: '', month: '', day: '', year: '', gender: '', tobacco: '', feet: '', inches: '', weight: '', coverage: '15000', firstName: '', middleName: '', lastName: '', email: '', phone: '', street: '', apt: '', country: 'United States', birthState: '', citizen: '', resident: '', owner: '', ssn: '', beneficiaryType: 'A person', beneficiaryFirst: '', beneficiaryLast: '', relationship: '', beneficiaryPhone: '', otherInsurance: '', replacing: '', paymentMethod: 'Bank account', accountName: '', accountType: 'Checking', routing: '', account: '', accountConfirm: '', card: '', expiry: '', paymentZip: '', draftDate: '1st of the month', signature: '', callbackTime: '', coverageType: '', health: Array(8).fill('') }
const labels = ['About You', 'Pre-Qualification', 'Application', 'Finalize']
const phone = '[FE_PHONE]'
const coverageOptions = [
  { value: '10000', label: 'A dignified farewell', icon: <Heart /> },
  { value: '15000', label: 'Funeral & final bills', icon: <ShieldCheck />, popular: true },
  { value: '20000', label: 'Cushion for loved ones', icon: <Sparkles /> },
  { value: '25000', label: 'Fullest peace of mind', icon: <Sun /> },
]
const whoIcons: Record<string, React.ReactNode> = { Me: <User />, 'My spouse or partner': <Heart />, 'My mom or dad': <Users />, 'Someone else': <UserRound /> }
const whoDescriptions: Record<string, string> = { Me: 'Protection for my loved ones', 'My spouse or partner': 'Planning our future together', 'My mom or dad': 'Helping someone I love', 'Someone else': 'Supporting someone close' }
const beneficiaryIcons: Record<string, React.ReactNode> = { 'A person': <User />, 'My estate': <Landmark />, 'All my children, equally': <Users />, 'A trust': <ShieldCheck />, 'A charity or organisation': <Heart /> }
const callbackIcons: Record<string, React.ReactNode> = { Morning: <Sunrise />, Afternoon: <Sun />, Evening: <Moon /> }

export function PolicyWizard({ onStepChange }: { onStepChange: (step: number) => void }) {
  const routeHash = useRouterState({ select: (state) => state.location.hash })
  const [screen, setScreen] = useState<JourneyStep>('state')
  const [answers, setAnswers] = useState<Answers>(blank)
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)
  const [resume, setResume] = useState(false)
  const [demo, setDemo] = useState(false)
  const [forced, setForced] = useState<Outcome | ''>('')
  const [annual, setAnnual] = useState(false)
  const [otherAmount, setOtherAmount] = useState(false)
  const customTimer = useRef(0)
  const advanceTimer = useRef(0)
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

  useEffect(() => {
    let savedStep: JourneyStep | undefined
    try {
      const saved = JSON.parse(localStorage.getItem('policybear-demo') || 'null')
      if (saved?.answers && Date.now() - saved.at < 7 * 86400000) {
        const restored = { ...blank, ...(saved.answers as Partial<Answers>), ssn: '', routing: '', account: '', accountConfirm: '', card: '', expiry: '', paymentZip: '', health: [...blank.health, ...(Array.isArray(saved.answers.health) ? saved.answers.health : [])].slice(0, 8) }
        setAnswers(restored)
        localStorage.setItem('policybear-demo', JSON.stringify({ answers: sanitizedAnswers(restored), screen: saved.screen, at: Date.now() }))
        if (saved.screen === 'personal') savedStep = 'address'
        else if (journeySteps.includes(saved.screen)) savedStep = saved.screen
        setResume(true)
      }
    } catch { /* Browsing privacy settings should not block the demo. */ }
    const fromHash = location.hash.replace('#step-', '').replace(/^personal$/, 'address') as JourneyStep
    if (journeySteps.includes(fromHash)) setScreen(fromHash)
    else if (savedStep) setScreen(savedStep)
    setReady(true)
    const hashChange = () => { const next = location.hash.replace('#step-', '').replace(/^personal$/, 'address') as JourneyStep; if (journeySteps.includes(next)) setScreen(next) }
    window.addEventListener('hashchange', hashChange)
    return () => window.removeEventListener('hashchange', hashChange)
  }, [])

  useEffect(() => {
    const next = routeHash.replace(/^#?step-/, '').replace(/^personal$/, 'address') as JourneyStep
    if (!journeySteps.includes(next)) return
    setScreen(next)
    setError('')
    setResume(false)
    if (next === 'state') window.scrollTo({ top: 0, behavior: 'instant' })
  }, [routeHash])

  useEffect(() => {
    if (!ready) return
    try { localStorage.setItem('policybear-demo', JSON.stringify({ answers: sanitizedAnswers(answers), screen, at: Date.now() })) } catch { /* Continue without persistence. */ }
    onStepChange(screen === 'state' ? 0 : 1)
  }, [answers, onStepChange, ready, screen])

  useEffect(() => {
    if (!ready) return
    heading.current?.focus({ preventScroll: true })
    if (screen === 'state') return
    let second = 0
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
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
  const go = (next: JourneyStep) => { window.clearTimeout(advanceTimer.current); window.clearTimeout(customTimer.current); setError(''); setResume(false); location.hash = `step-${next}`; setScreen(next) }
  const advance = (next: JourneyStep) => { window.clearTimeout(advanceTimer.current); advanceTimer.current = window.setTimeout(() => go(next), 300) }
  useEffect(() => () => { window.clearTimeout(advanceTimer.current); window.clearTimeout(customTimer.current) }, [])
  const [furthest, setFurthest] = useState(0)
  useEffect(() => { setFurthest((value) => Math.max(value, journeySteps.indexOf(screen))) }, [screen])
  const revisiting = journeySteps.indexOf(screen) < furthest
  const nextLink = (next: JourneyStep, ready = true) => revisiting ? <button type="button" className="revisit-next" disabled={!ready} onClick={() => go(next)}>Next <ArrowRight /></button> : null
  const contactReady = Boolean(answers.firstName.trim() && answers.lastName.trim() && z.string().email().safeParse(answers.email).success && answers.phone.replace(/\D/g, '').length >= 10)
  const identityReady = Boolean(answers.country && (answers.country !== 'United States' || answers.birthState) && (answers.citizen === 'Yes — U.S. citizen' || (answers.citizen === 'No' && answers.resident === 'Yes — resident over 2 years')))
  const sizeReady = Boolean(answers.feet && answers.inches && z.coerce.number().min(80).max(500).safeParse(answers.weight).success)
  const ssnProtected = answers.ssn.replace(/\D/g, '').length === 9
  useEffect(() => {
    const next = screen === 'contact' && contactReady ? 'size' : screen === 'size' && sizeReady ? 'opt-in' : screen === 'opt-in' && consent ? 'address' : screen === 'identity' && identityReady ? 'ssn' : null
    if (!next || revisiting) return
    const timer = window.setTimeout(() => go(next), screen === 'contact' || screen === 'size' ? 1400 : 700)
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, contactReady, sizeReady, consent, revisiting, identityReady, answers.firstName, answers.lastName, answers.email, answers.phone, answers.weight])
  const back = () => { let i = screenIndex - 1; while (i > 0 && ['loading', 'underwriting', 'submitting'].includes(journeySteps[i] ?? '')) i -= 1; const previous = journeySteps[Math.max(0, i)]; if (previous) go(previous) }
  const choose = (key: StringAnswerKey, value: string, next?: JourneyStep) => { update(key, value); if (next) advance(next) }
  // Custom coverage advances on its own once the slider settles, so no Continue button is needed.
  const settleCustom = (value: string) => {
    update('coverage', value)
    window.clearTimeout(customTimer.current)
    customTimer.current = window.setTimeout(() => { customTimer.current = 0; advance('tobacco') }, 700)
  }
  const clearCustomTimer = () => { window.clearTimeout(customTimer.current); customTimer.current = 0 }
  const healthChoice = (index: number, value: string) => {
    setAnswers((current) => ({ ...current, health: current.health.map((answer, i) => i === index ? value : answer) }))
    advance(index === 7 ? 'health-review' : (`h${index + 2}` as JourneyStep))
  }
  const dobTouched = useRef(false)
  const validDOBNow = age >= 50 && age <= 85 && Boolean(answers.day && answers.month && answers.year)
  useEffect(() => {
    if (screen !== 'dob') { dobTouched.current = false; return }
    if (!dobTouched.current || !validDOBNow) return
    const timer = window.setTimeout(() => go('coverage'), 600)
    return () => clearTimeout(timer)
  }, [screen, validDOBNow, answers.day, answers.month, answers.year])
  const validDOB = age >= 50 && age <= 85 && Boolean(answers.day && answers.month && answers.year)
  const field = (key: StringAnswerKey, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => {
    const numeric = ['zip', 'weight', 'routing', 'account', 'accountConfirm', 'card', 'paymentZip'].includes(key)
    const telephone = ['phone', 'beneficiaryPhone'].includes(key)
    const autofill: Partial<Record<StringAnswerKey, string>> = { firstName: 'given-name', middleName: 'additional-name', lastName: 'family-name', email: 'email', phone: 'tel', zip: 'postal-code', signature: 'name' }
    return <label className="field-label">{label}<input className="text-field" name={key} inputMode={numeric ? 'numeric' : telephone ? 'tel' : undefined} autoComplete={autofill[key] || 'off'} enterKeyHint="next" value={answers[key]} onChange={(event) => update(key, event.target.value)} maxLength={100} {...props} /></label>
  }
  const select = (key: StringAnswerKey, label: string, options: string[], disabled = false) => <label className="field-label">{label}<select value={answers[key]} disabled={disabled} onChange={(event) => { if (screen === 'dob') dobTouched.current = true; update(key, event.target.value) }}><option value="">{label}</option>{options.map((option) => <option key={option}>{option}</option>)}</select></label>
  const cards = (key: StringAnswerKey, options: string[], next?: JourneyStep, icons?: Record<string, React.ReactNode>, layout: 'stack' | 'pair' = 'stack') => <Radio.Root aria-label={key} value={answers[key]} onValueChange={(value) => update(key, value)} className={`answer-list${layout === 'pair' ? ' answer-list-pair' : ''}`}>{options.map((option) => <Radio.Item className="answer-card" key={option} value={option} onClick={() => choose(key, option, next)}><span className="answer-copy">{icons?.[option] && <span className="answer-badge" aria-hidden="true">{icons[option]}</span>}<strong>{option}</strong></span><span className="radio-circle"><Radio.Indicator><Check /></Radio.Indicator></span></Radio.Item>)}</Radio.Root>
  const submitNext = (next: JourneyStep, valid = true, message = 'Please complete the required fields.') => (event: React.FormEvent) => { event.preventDefault(); if (!valid) { setError(message); return } go(next) }
  const continueTo = (next: JourneyStep, label = 'Continue') => <Button type="button" variant="quiet" className="continue-optional" onClick={() => go(next)}>{label} <ArrowRight /></Button>
  const trust = null

  const shell = (title: string, helper: string, content: React.ReactNode, options?: { back?: boolean; compact?: boolean; icon?: React.ReactNode }) => <>
    {options?.back !== false && screen !== 'state' && !['loading', 'underwriting', 'submitting'].includes(screen) && <button type="button" className="back-button back-orb" onClick={back} aria-label="Go back to the previous question"><span className="back-orb-icon"><ArrowLeft /></span><span className="back-orb-label">Back</span></button>}
    <div className={`wizard-content ${options?.compact ? 'compact-content' : ''}`} key={screen}>
      {options?.icon
        ? <div className="question-head"><span className="question-badge" aria-hidden="true">{options.icon}</span><div className="question-head-copy"><h2 id="wizard-title" ref={heading} tabIndex={-1}>{title}</h2>{helper && <p className="question-helper">{helper}</p>}</div></div>
        : <><h2 id="wizard-title" ref={heading} tabIndex={-1}>{title}</h2>{helper && <p className="question-helper">{helper}</p>}</>}
      {content}
      {error && <div className="form-error" role="alert"><AlertCircle /> {error}</div>}
    </div>
  </>

  function renderScreen() {
    if (screen === 'state') return shell('What state do you currently reside in?', 'Plans, prices and eligibility depend on where you live.', <form onSubmit={submitNext('gender', Boolean(answers.state), 'Please choose your state of residence.')}>
      <label className="field-label">State of residence
        <div className="state-select">
          <MapPin aria-hidden="true" />
          <select aria-label="State of residence" style={{ color: answers.state ? undefined : 'var(--muted-foreground)' }} value={answers.state} onChange={(event) => update('state', event.target.value)}>
            <option value="">Select your state</option>
            {LICENSED_STATES.map((item) => <option key={item.abbr} value={item.name}>{item.name} ({item.abbr})</option>)}
          </select>
          <ChevronDown aria-hidden="true" className="state-caret" />
        </div>
      </label>
      <Button variant="action" size="touch" className="continue-button">See my price in 60 seconds <ArrowRight /></Button>
    </form>, { back: false })
    if (screen === 'who') return shell('Who are we helping protect?', '', <><Radio.Root aria-label="Who coverage protects" value={answers.who} onValueChange={(value) => choose('who', value, 'contact')} className="recipient-choices">{['Me', 'My spouse or partner', 'My mom or dad', 'Someone else'].map((option) => <Radio.Item className="recipient-choice" key={option} value={option} onClick={() => { if (answers.who === option) advance('contact') }}><span className="recipient-icon" aria-hidden="true">{whoIcons[option]}</span><span className="recipient-copy"><strong>{option}</strong><small>{whoDescriptions[option]}</small></span><span className="recipient-status" aria-hidden="true"><ArrowRight className="recipient-arrow" /><Radio.Indicator className="recipient-check"><Check /></Radio.Indicator></span></Radio.Item>)}</Radio.Root>{nextLink('contact', Boolean(answers.who))}<p className="recipient-note"><Heart aria-hidden="true" /> For yourself or someone you love.</p></>, { icon: <Heart /> })
    if (screen === 'dob') return shell("What's your date of birth?", '', <form onSubmit={submitNext('coverage', validDOB, 'Please enter a valid date for someone age 50 to 85.')}><div className="date-fields">{select('month', 'Month', Array.from({ length: 12 }, (_, i) => new Date(2026, i).toLocaleString('en', { month: 'short' })))}{select('day', 'Day', Array.from({ length: 31 }, (_, i) => String(i + 1)))}{select('year', 'Year', Array.from({ length: 36 }, (_, i) => String(new Date().getFullYear() - 50 - i)))}</div>{answers.year && <p className="valid-note">You’re {age}</p>}{trust}</form>)
    if (screen === 'gender') return shell('Are you male or female?', '', <>{cards('gender', ['Male', 'Female'], 'dob', { Male: <Mars />, Female: <Venus /> }, 'pair')}</>, { icon: <UserRound /> })
    if (screen === 'tobacco') return shell('Have you used tobacco or nicotine in the last 12 months?', '', <><div className="tobacco-choices">{cards('tobacco', ['Yes', 'No'], 'loading', { Yes: <Cigarette />, No: <X /> }, 'pair')}</div><p className="valid-note"><ShieldCheck /> Smokers can still get covered.</p></>, { icon: <Cigarette /> })
    if (screen === 'size') return shell("What's your height and weight?", 'It helps us show a more accurate price.', <form onSubmit={submitNext('opt-in', Boolean(answers.feet && answers.inches && z.coerce.number().min(80).max(500).safeParse(answers.weight).success))}><div className="height-fields">{select('feet', 'Feet', ['4', '5', '6', '7'])}{select('inches', 'Inches', Array.from({ length: 12 }, (_, i) => String(i)))}</div>{field('weight', 'Weight (lbs)', { inputMode: 'numeric', maxLength: 3 })}{revisiting ? nextLink('opt-in', sizeReady) : <p className={`auto-next${sizeReady ? ' is-ready' : ''}`} aria-live="polite">{sizeReady ? <><Check /> Great — moving on…</> : 'We’ll move on as soon as this is filled in.'}</p>}{trust}</form>)
    if (screen === 'coverage') return shell('How much coverage would you like?', '', <form onSubmit={submitNext('tobacco')}><Radio.Root value={answers.coverage} onValueChange={(value) => update('coverage', value)} className="coverage-grid">{coverageOptions.map((option) => <Radio.Item className="coverage-card" value={option.value} key={option.value} onClick={() => { clearCustomTimer(); setOtherAmount(false); choose('coverage', option.value, 'tobacco') }}>{option.popular && <span className="coverage-tag">Most popular</span>}<span className="coverage-icon" aria-hidden="true">{option.icon}</span><span className="coverage-copy"><strong>${Number(option.value).toLocaleString()}</strong><small>{option.label}</small></span><span className="coverage-price">from ${calculatePrice(age || 68, answers.gender || 'Female', Number(option.value), '').toFixed(0)}/mo</span><span className="radio-circle"><Radio.Indicator><Check /></Radio.Indicator></span></Radio.Item>)}</Radio.Root><Button variant="quiet" className="other-amount" type="button" onClick={() => { clearCustomTimer(); setOtherAmount(!otherAmount) }}>{otherAmount ? 'Choose a suggested amount' : 'Choose a different amount'}</Button>{otherAmount && <div className="coverage-custom"><span className="coverage-custom-label">Your amount</span><strong>${coverage.toLocaleString()}</strong><div className="coverage-slider"><Button type="button" variant="quiet" aria-label="Decrease coverage" onClick={() => settleCustom(String(Math.max(COVERAGE_MIN, coverage - 1000)))}><Minus /></Button><input type="range" min="5000" max={COVERAGE_MAX} step="1000" value={coverage} onChange={(event) => settleCustom(event.target.value)} /><Button type="button" variant="quiet" aria-label="Increase coverage" onClick={() => settleCustom(String(Math.min(COVERAGE_MAX, coverage + 1000)))}><Plus /></Button></div><span className="coverage-custom-range">${COVERAGE_MIN.toLocaleString()} – ${COVERAGE_MAX.toLocaleString()} available</span></div>}{trust}</form>)
    if (screen === 'contact') return shell('Let’s get to know you', answers.who && answers.who !== 'Me' ? 'Please enter the details of the person being covered. They’ll need to answer and sign themselves.' : '', <form onSubmit={submitNext('size', Boolean(answers.firstName.trim() && answers.lastName.trim() && z.string().email().safeParse(answers.email).success && answers.phone.replace(/\D/g, '').length >= 10))}><div className="two-fields">{field('firstName', 'First name', { autoComplete: 'given-name' })}{field('lastName', 'Last name', { autoComplete: 'family-name' })}</div>{field('email', 'Email', { type: 'email', autoComplete: 'email' })}{field('phone', 'Mobile phone', { type: 'tel', placeholder: '(555) 555-5555', autoComplete: 'tel' })}{revisiting ? nextLink('size', contactReady) : <p className={`auto-next${contactReady ? ' is-ready' : ''}`} aria-live="polite">{contactReady ? <><Check /> Thanks — moving on…</> : 'We’ll move on as soon as these are filled in.'}</p>}{answers.who && answers.who !== 'Me' && <Button type="button" variant="quiet" className="wide-button" onClick={() => go('callback')}>They’re not here — arrange a call instead <Phone /></Button>}</form>)
    if (screen === 'opt-in') return shell('A helping hand, if you need it.', 'If you’re interrupted, a licensed agent could help you continue your final expense journey.', <form className="reconnect-form" onSubmit={submitNext('address')}><div className="reconnect-number"><span className="reconnect-phone" aria-hidden="true"><Phone /></span><div><small>Your contact number</small><strong>{answers.phone || 'Add your number'}</strong></div><Button type="button" variant="quiet" onClick={() => go('contact')} aria-label="Edit contact number"><PenLine /> Edit</Button></div><div className="reconnect-permission"><div className="reconnect-label"><ShieldCheck aria-hidden="true" /><strong>May our licensed agents call or text you?</strong></div><p className="permission-optional">Optional — you can continue either way.</p><ContactConsent checked={consent} onChange={setConsent} /></div>{revisiting ? nextLink('address') : <button type="button" className="skip-link" onClick={() => go('address')}>No thanks, skip this step <ArrowRight /></button>}<p className="reconnect-demo"><LockKeyhole /> Demo only — no calls or texts will be sent.</p></form>, { icon: <Phone /> })
    if (screen === 'loading') return <LoadingState icon={<ShieldCheck />} title="Illustrating your final expense rate" lines={[`Checking plans in ${answers.state || 'your state'}`, 'Calculating your rate', 'Preparing your final expense illustration']} active={loadingLine} duration={2200} />
    if (screen === 'price') return shell('Here’s your final expense illustration.', '', <><PriceCard price={shownPrice} coverage={coverage} annual={annual} setAnnual={setAnnual} /><div className="coverage-control"><label htmlFor="price-coverage">Adjust your coverage <strong>${coverage.toLocaleString()}</strong></label><input id="price-coverage" type="range" min="5000" max={COVERAGE_MAX} step="1000" value={coverage} onChange={(event) => update('coverage', event.target.value)} /><div className="coverage-range"><span>${COVERAGE_MIN.toLocaleString()}</span><span>${COVERAGE_MAX.toLocaleString()}</span></div></div><Button variant="action" size="touch" className="continue-button lockin-button" onClick={() => go('who')}><LockKeyhole /> Lock in my rate <ArrowRight /></Button><p className="valid-note"><ShieldCheck /> Free to look — no payment due today.</p></>)
    if (screen === 'address') return shell('Where do you call home?', '', <form className="home-address-form" onSubmit={submitNext('identity', Boolean(answers.street.trim() && answers.city.trim() && answers.state && /^\d{5}$/.test(answers.zip)), 'Please enter your street, city, state and five-digit ZIP code.')}>
      {field('street', 'Street address', { autoComplete: 'street-address', placeholder: '123 Main Street' })}
      <div className="address-pair">{field('apt', 'Apt / suite (optional)', { autoComplete: 'address-line2', placeholder: 'Apt, suite or unit' })}{field('city', 'City', { autoComplete: 'address-level2', placeholder: 'City' })}</div>
      <div className="address-location-row"><label className="field-label">State<select aria-label="State" autoComplete="address-level1" value={answers.state} onChange={(event) => update('state', event.target.value)}><option value="">Select state</option>{LICENSED_STATES.map((item) => <option key={item.abbr} value={item.name}>{item.name} ({item.abbr})</option>)}</select></label>{field('zip', 'ZIP code', { inputMode: 'numeric', autoComplete: 'postal-code', placeholder: '12345', maxLength: 5, onChange: (event) => update('zip', event.target.value.replace(/\D/g, '').slice(0, 5)) })}</div>
      <div className="next-row"><p className="reconnect-demo"><LockKeyhole /> Demo only — use sample address details.</p><button type="submit" className="revisit-next">Next <ArrowRight /></button></div>
    </form>, { icon: <MapPin /> })
    if (screen === 'identity') return shell('A few identity details', '', <form onSubmit={submitNext('ssn', identityReady)}>{select('country', 'Country of birth', ['United States', 'Canada', 'Other'])}{answers.country === 'United States' && select('birthState', 'State of birth', US_STATES)}<p className="field-prompt">Are you a U.S. citizen?</p>{cards('citizen', ['Yes — U.S. citizen', 'No'])}{answers.citizen === 'No' && cards('resident', ['Yes — resident over 2 years', 'No — neither'])}{answers.resident === 'No — neither' && answers.citizen === 'No' ? <Button type="button" variant="action" size="touch" className="wide-button" onClick={() => go('ineligible')}>See how an agent can help</Button> : nextLink('ssn', identityReady)}</form>)
    if (screen === 'ssn') return shell('Social Security & policy owner', '', <form className="ssn-form" onSubmit={submitNext('health-intro', Boolean(answers.owner && ssnProtected), 'Please enter a 9-digit Social Security number and answer the policy owner question.')}><label className="field-label">Social Security number<div className={`secure-field${ssnProtected ? ' is-protected' : ''}`}><span className="secure-lock" aria-hidden="true">{ssnProtected ? <Check /> : <LockKeyhole />}</span><input value={answers.ssn} type={showSSN ? 'text' : 'password'} inputMode="numeric" maxLength={11} placeholder="123-45-6789" autoComplete="off" onChange={(event) => update('ssn', formatSSN(event.target.value))} /><Button type="button" variant="quiet" aria-label={showSSN ? 'Hide number' : 'Show number'} onClick={() => setShowSSN(!showSSN)}>{showSSN ? <EyeOff /> : <Eye />}</Button></div></label><TrustBadges /><p className="ssn-demo-note"><LockKeyhole /> Demo only — use sample numbers. Nothing is saved.</p><p className="field-prompt">Will you be the policy owner and the person paying?</p>{cards('owner', ['Yes', 'No'])}{answers.owner === 'No' ? <Button type="button" variant="action" size="touch" className="wide-button" onClick={() => go('ineligible')}>See how an agent can help</Button> : <NextButton />}</form>, { icon: <LockKeyhole /> })
    if (screen === 'health-intro') return shell('A few questions about your health', 'Eight yes-or-no questions help illustrate which final expense coverage may be available.', <Button variant="action" size="touch" className="continue-button" onClick={() => go('h1')}>Let’s begin <ArrowRight /></Button>)
    if (/^h[1-8]$/.test(screen)) { const index = Number(screen.slice(1)) - 1; const item = healthQuestions[index] ?? { topic: 'Your health', question: 'Health question', explain: '' }; return shell(item.question, '', <><div className="health-progress"><div className="progress-track"><div className="progress-fill" style={{ width: `${((index + 1) / 8) * 100}%` }} /></div><span>{index + 1} of 8</span></div><Radio.Root aria-label={`Health question ${index + 1}`} value={answers.health[index] || ''} onValueChange={(value) => healthChoice(index, value)} className="health-choices"><Radio.Item className="answer-card" value="No"><span className="answer-copy"><strong>No</strong></span><span className="radio-circle"><Radio.Indicator><Check /></Radio.Indicator></span></Radio.Item><Radio.Item className="answer-card" value="Yes"><span className="answer-copy"><strong>Yes</strong></span><span className="radio-circle"><Radio.Indicator><Check /></Radio.Indicator></span></Radio.Item></Radio.Root>{answers.health[index] && continueTo(index === 7 ? 'health-review' : `h${index + 2}` as JourneyStep)}</>) }
    if (screen === 'health-review') return shell('Review your health answers', 'Please make sure each answer is true and complete.', <>{healthQuestions.map((item, index) => <div className="review-row" key={item.topic}><span><small>Question {index + 1} · {item.topic}</small>{item.question}</span><strong>{answers.health[index] || '—'}</strong><Button variant="quiet" onClick={() => go(`h${index + 1}` as JourneyStep)}>Edit</Button></div>)}<CheckRow checked={confirmed} onChange={setConfirmed}>My answers are true and complete to the best of my knowledge.</CheckRow><Button variant="action" size="touch" className="continue-button" disabled={!confirmed} onClick={() => go('underwriting')}>Get my decision <ArrowRight /></Button></>)
    if (screen === 'underwriting') return <LoadingState icon={<ShieldCheck />} title="Reviewing your application" lines={['Reviewing your answers', 'Checking eligibility', 'Preparing your decision']} active={loadingLine} duration={2800} />
    if (screen === 'decision') return <Decision outcome={outcome} firstName={answers.firstName} coverage={coverage} price={monthly} onContinue={() => go(outcome === 'declined' ? 'gi-offer' : 'beneficiary')} onCallback={() => go('callback')} />
    if (screen === 'gi-offer') return shell('Guaranteed-issue final expense coverage', 'No health questions. Ages 50–85.', <><Radio.Root value={answers.coverage} onValueChange={(value) => update('coverage', value)} className="answer-grid">{['5000', '10000', '15000', '20000', '25000'].map((value) => <Radio.Item className="answer-card" value={value} key={value}><strong>${Number(value).toLocaleString()}</strong><span className="radio-circle"><Radio.Indicator><Check /></Radio.Indicator></span></Radio.Item>)}</Radio.Root><PriceCard price={calculatePrice(age || 68, answers.gender || 'Female', Math.min(coverage, 25000), answers.tobacco, 'guaranteed')} coverage={Math.min(coverage, 25000)} annual={annual} setAnnual={setAnnual} /><div className="info-panel">If death occurs from natural causes in the first 2 years, your beneficiary receives the premiums paid plus interest. Accidental loss is covered in full from day one. After 2 years, the full benefit is paid. [CARRIER_TO_CONFIRM]</div><Button variant="action" size="touch" className="continue-button" onClick={() => { update('coverageType', 'Guaranteed Issue'); go('beneficiary') }}>Continue <ArrowRight /></Button></>)
    if (screen === 'beneficiary') return shell('Who should receive your final expense benefit?', 'This person can use the benefit for funeral costs and other final bills. Policy terms govern beneficiary changes.', <form onSubmit={submitNext('insurance', answers.beneficiaryType !== 'A person' || Boolean(answers.beneficiaryFirst && answers.beneficiaryLast))}>{cards('beneficiaryType', ['A person', 'My estate', 'All my children, equally', 'A trust', 'A charity or organisation'], undefined, beneficiaryIcons)}{answers.beneficiaryType === 'A person' && <><div className="two-fields">{field('beneficiaryFirst', 'First name')}{field('beneficiaryLast', 'Last name')}</div>{select('relationship', 'Relationship', ['Spouse', 'Husband', 'Wife', 'Son', 'Daughter', 'Grandson', 'Granddaughter', 'Brother', 'Sister', 'Mother', 'Father', 'Nephew', 'Niece', 'Friend', 'Domestic Partner', 'Other'])}{field('beneficiaryPhone', 'Phone (optional)', { type: 'tel' })}</>}<Button type="button" variant="quiet" className="wide-button">+ Add a backup beneficiary</Button><NextButton /></form>)
    if (screen === 'insurance') return shell('Do you have any other life insurance or annuities, or a pending application?', '', <>{cards('otherInsurance', ['No', 'Yes'])}{answers.otherInsurance === 'Yes' && <div className="info-panel"><p>Will this policy replace or be paid for by cancelling any of them?</p>{cards('replacing', ['No', 'Yes'])}{answers.replacing === 'Yes' && <p>We’ll include a replacement notice in your documents. [STATE_REPLACEMENT_FORMS]</p>}</div>}<Button variant="action" size="touch" className="continue-button" disabled={!answers.otherInsurance || (answers.otherInsurance === 'Yes' && !answers.replacing)} onClick={() => go('payment')}>Continue <ArrowRight /></Button></>)
    if (screen === 'payment') return shell(`How would you like to pay your $${monthly.toFixed(2)} monthly premium?`, '', <form onSubmit={submitNext('draft', authorized && (answers.paymentMethod === 'Bank account' ? Boolean(answers.routing.length === 9 && answers.account && answers.account === answers.accountConfirm) : Boolean(answers.card && answers.expiry)))}>{cards('paymentMethod', ['Bank account', 'Debit or credit card'])}{answers.paymentMethod === 'Bank account' ? <>{field('accountName', 'Account holder name')}{select('accountType', 'Account type', ['Checking', 'Savings'])}{field('routing', 'Routing number', { inputMode: 'numeric', maxLength: 9 })}{answers.routing.length === 9 && <p className="valid-note"><Landmark /> First National Bank</p>}{field('account', 'Account number', { type: 'password', inputMode: 'numeric' })}{field('accountConfirm', 'Confirm account number', { type: 'password', inputMode: 'numeric' })}</> : <>{field('accountName', 'Name on card')}{field('card', 'Card number', { inputMode: 'numeric' })}<div className="two-fields">{field('expiry', 'Expiry')}{field('paymentZip', 'ZIP')}</div><p className="placeholder-note">[IF_CARRIER_ALLOWS]</p></>}<CheckRow checked={authorized} onChange={setAuthorized}>I authorize the insurance company to draft my premium from this account.</CheckRow><p className="valid-note"><LockKeyhole /> Use sample payment details only. No payment is submitted.</p><NextButton /></form>)
    if (screen === 'draft') return shell('When would you like your payment taken each month?', '', <>{cards('draftDate', ['1st of the month', '3rd of the month (Social Security day)', '2nd Wednesday', '3rd Wednesday', '4th Wednesday', 'Pick a date'])}<div className="summary-card"><span>First payment</span><strong>{answers.draftDate}</strong></div><Button variant="action" size="touch" className="continue-button" onClick={() => go('review')}>Continue <ArrowRight /></Button></>)
    if (screen === 'review') { const reviewRows: Array<[string, string, JourneyStep]> = [['About you', `${answers.firstName} ${answers.lastName}`, 'contact'], ['Address', `${answers.street}, ${answers.city}`, 'address'], ['Health answers', `${answers.health.filter((value) => value === 'Yes').length} yes answers`, 'health-review'], ['Coverage & price', `$${coverage.toLocaleString()} · $${monthly.toFixed(2)}/month`, 'price'], ['Beneficiary', answers.beneficiaryType === 'A person' ? `${answers.beneficiaryFirst} ${answers.beneficiaryLast}` : answers.beneficiaryType, 'beneficiary'], ['Other insurance', answers.otherInsurance, 'insurance'], ['Payment', `${answers.paymentMethod} •••• ${answers.account.slice(-4) || answers.card.slice(-4)}`, 'payment'], ['Draft date', answers.draftDate, 'draft']]; return shell('Review your application', 'Check the details below before you sign.', <>{reviewRows.map(([label, value, target]) => <div className="review-row" key={label}><span><small>{label}</small>{value || 'Not provided'}</span><Button type="button" variant="quiet" onClick={() => go(target)}>Edit</Button></div>)}<Button variant="action" size="touch" className="continue-button" onClick={() => go('disclosures')}>Looks good — continue to sign <ArrowRight /></Button></>) }
    if (screen === 'disclosures') return shell('Please review your documents', '', <>{['Application', 'Authorization to release health information', 'Bank draft authorization', '[STATE_NOTICES]'].map((document) => <details className="document-row" key={document}><summary>{document}<ChevronDown /></summary><p>Prototype document text for review. Final carrier document will replace this placeholder.</p><Button variant="quiet">Download PDF (mock)</Button></details>)}<CheckRow checked={documents} onChange={setDocuments}>I have read and agree to the documents above.</CheckRow><Button variant="action" size="touch" className="continue-button" disabled={!documents} onClick={() => go('signature')}>Continue <ArrowRight /></Button></>)
    if (screen === 'signature') return shell('Sign your application', 'Choose how you would like to sign.', <><div className="signature-mode" role="group" aria-label="Signature method"><Button type="button" variant={signatureMode === 'type' ? 'action' : 'quiet'} onClick={() => setSignatureMode('type')}>Type signature</Button><Button type="button" variant={signatureMode === 'draw' ? 'action' : 'quiet'} onClick={() => setSignatureMode('draw')}><PenLine /> Draw signature</Button></div>{signatureMode === 'type' ? <>{field('signature', 'Full legal name')}<p className="field-prompt">Choose a signature style</p><div className="signature-styles" role="radiogroup" aria-label="Signature style">{['Classic', 'Smooth', 'Simple'].map((label, index) => <Button type="button" variant="quiet" role="radio" aria-checked={signatureStyle === index} className={signatureStyle === index ? 'selected' : ''} onClick={() => setSignatureStyle(index)} key={label}><span className={`signature-sample signature-style-${index}`}>{answers.signature || 'Your name'}</span><small>{label}</small></Button>)}</div><div className={`signature-preview signature-style-${signatureStyle}`}>{answers.signature || 'Your signature'}</div></> : <DrawSignature onChange={setHasDrawing} />}<p className="valid-note">Dated {new Date().toLocaleDateString()}</p><CheckRow checked={signed} onChange={setSigned}>I agree to sign electronically and that this is my legal signature.</CheckRow><Button variant="action" size="touch" className="continue-button" disabled={!signed || (signatureMode === 'type' ? answers.signature.trim().length < 3 : !hasDrawing)} onClick={() => go('verify')}>Continue <ArrowRight /></Button></>)
    if (screen === 'verify') return shell('Verify it’s you', `We sent a 6-digit code to ${answers.phone ? `(***) ***-${answers.phone.replace(/\D/g, '').slice(-4)}` : '(•••) •••-1234'} (mock).`, <><label className="field-label">Verification code<input className="text-field code-field" value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} inputMode="numeric" maxLength={6} autoComplete="one-time-code" /></label><p className="question-call">Any 6 digits work in this prototype.</p><Button variant="quiet" className="wide-button">Send by email instead</Button><Button variant="action" size="touch" className="continue-button" disabled={code.length !== 6} onClick={() => go('submitting')}>Sign and submit <ArrowRight /></Button></>)
    if (screen === 'submitting') return <LoadingState icon={<Sparkles />} title="Submitting your application…" lines={['Reviewing your signature', 'Issuing your policy…', 'All done!']} active={loadingLine} duration={2200} />
    if (screen === 'issued') return shell(`Final expense demo complete, ${answers.firstName || 'friend'}.`, '', <><div className="success-symbol"><Check /></div><div className="policy-card"><span>Policy number <strong>{policyNumber || 'PB-FE-000000'}</strong></span><span>Coverage <strong>${coverage.toLocaleString()}</strong></span><span>Monthly premium <strong>${monthly.toFixed(2)}</strong></span><span>First draft <strong>{answers.draftDate}</strong></span><span>Beneficiary <strong>{answers.beneficiaryFirst || answers.beneficiaryType}</strong></span><span>Coverage type <strong>{answers.coverageType || (outcome === 'graded' ? 'Graded' : 'Immediate')}</strong></span></div><div className="next-list"><strong>What happens next</strong><span>In a real final expense application, policy documents would be sent to {answers.email || 'your email'}.</span><span>Save our number {phone}.</span><span>Tell your beneficiary where to find your policy.</span></div><Button variant="action" size="touch" className="wide-button" onClick={() => window.print()}>Print this page</Button></>, { back: false })
    if (screen === 'callback') return shell('Request a call back', 'Discuss final expense options with an agent. This demo does not send a callback request.', <form onSubmit={submitNext('state', Boolean(answers.firstName && answers.phone && consent))}>{field('firstName', 'Name')}{field('phone', 'Phone', { type: 'tel' })}{cards('callbackTime', ['Morning', 'Afternoon', 'Evening'], undefined, callbackIcons)}<ContactConsent checked={consent} onChange={setConsent} /><Button variant="action" size="touch" className="wide-button">Request my call</Button></form>)
    return shell('An agent can help set this up for you', 'You still have options. Talk with a licensed agent for personal help.', <><Button asChild variant="action" size="touch" className="wide-button"><a href={`tel:${phone}`}><Phone /> Call {phone}</a></Button><Button variant="quiet" className="wide-button" onClick={() => go('callback')}>Request a call back</Button></>)
  }

  const chapter = chapterFor(screen)
  const appMode = screen !== 'state'
  const tip = bearTips[screen]
  const minutes = [1, 1, 2, 2]
  // The quote panel only belongs once the illustration has actually been shown.
  const quoteSeen = journeySteps.indexOf(screen) >= journeySteps.indexOf('price')
  if (appMode) return <section className={quoteSeen ? 'wizard-app' : 'wizard-app no-quote'} id="get-covered" aria-label="Final expense application">
    <aside className="app-rail" aria-label="Application progress">
      <Link to="/" hash="step-state" className="app-rail-logo" aria-label="PolicyBear home"><img src={bearLogo.url} width="190" height="38" alt="PolicyBear" /></Link>
      <ol className="app-steps">{labels.map((label, index) => <li key={label} className={index === chapter ? 'current' : index < chapter ? 'complete' : ''} aria-current={index === chapter ? 'step' : undefined}><span className="app-step-dot">{index < chapter ? <Check /> : <span />}</span><span className="app-step-copy"><strong>{label}</strong><small><Clock /> {minutes[index]} min</small></span></li>)}</ol>
      <p className="app-rail-secure"><LockKeyhole /> Demo only · nothing is submitted</p>
    </aside>
    <div className="app-main">
      <div className="app-topbar"><span>{labels[chapter]}</span><a className="app-call" href="tel:+18447652327"><span className="agent-dot" aria-hidden="true" /><span className="app-call-copy"><small>Licensed agents available</small><strong>(844) POL-BEAR</strong></span></a></div>
      <div className="app-body">{tip ? <div className="basic-stage app-tip-stage"><aside className="bear-tip" aria-label="Tip from Mr Bear">
        <div className="bear-tip-bubble" key={screen}><span className="bear-tip-kicker">Did you know?</span><span className="bear-tip-title is-myth">Myth</span><p>{tip.myth}</p><span className="bear-tip-title is-fact">Fact</span><p className="bear-tip-fact">{tip.fact}</p></div>
        <img className="bear-tip-img" src={bearGuide} width={595} height={959} alt="" aria-hidden="true" />
      </aside>{renderScreen()}</div> : renderScreen()}</div>
    </div>
    {quoteSeen && <aside className="app-summary" aria-label="Your quote">
      <div className="app-quote-card">
        <div className="app-quote-brand"><img src={bearLogo.url} width="150" height="30" alt="PolicyBear" /><span className="app-quote-tag">Final Expense</span></div>
        <div className="app-quote-price"><small>Your monthly premium</small><strong>${monthly.toFixed(2)}<span>/mo</span></strong></div>
        <dl><div><dt>Coverage</dt><dd>${coverage.toLocaleString()}</dd></div></dl>
        <div className="app-quote-chips"><span><ShieldCheck /> Level premium</span><span><Check /> No medical exam</span></div>
        <Button variant="quiet" className="app-edit" onClick={() => go('price')}>Edit quote <PenLine /></Button>
      </div>
    </aside>}
  </section>

  const wizardSection = <section className={`wizard ${screen !== 'state' ? 'wizard-standalone' : ''}`} id="get-covered" aria-label="Final expense journey">
    {resume && <div className="resume-banner"><p>Welcome back, {answers.firstName || 'friend'}! Pick up where you left off?</p><div><Button variant="quiet" onClick={() => setResume(false)}>Continue</Button><Button variant="quiet" onClick={() => { setAnswers(blank); localStorage.removeItem('policybear-demo'); go('state') }}>Start over</Button></div></div>}
    <div className="chapter-progress" aria-label="Application progress">{labels.map((label, index) => <span className={index === chapter ? 'current' : index < chapter ? 'complete' : ''} key={label}>{index < chapter && <Check />}{label}</span>)}</div>
    {quoteIndex >= 0 && <div className="progress-track"><div className="progress-fill" style={{ width: `${((quoteIndex + 1) / quoteSteps.length) * 100}%` }} /></div>}
    {screenIndex >= journeySteps.indexOf('address') && screenIndex <= journeySteps.indexOf('issued') && <div className="mini-summary">Coverage ${coverage.toLocaleString()} · ${monthly.toFixed(2)}/mo <a href={`tel:${phone}`}>Need help? {phone}</a></div>}
    {renderScreen()}
    <div className="demo-wrap"><Button variant="quiet" className="demo-pill" aria-expanded={demo} onClick={() => setDemo(!demo)}>Demo</Button>{demo && <div className="demo-toolbar"><strong>Jump to a screen</strong><select aria-label="Demo screen" value={screen} onChange={(event) => go(event.target.value as JourneyStep)}>{journeySteps.map((item) => <option value={item} key={item}>{item.replaceAll('-', ' ')}</option>)}</select><strong>Force decision</strong><div>{(['approved', 'graded', 'declined'] as Outcome[]).map((item) => <Button variant={forced === item ? 'action' : 'quiet'} key={item} onClick={() => setForced(item)}>{item}</Button>)}</div></div>}</div>
  </section>
  return wizardSection
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
function NextButton() { return <div className="next-row"><button type="submit" className="revisit-next">Next <ArrowRight /></button></div> }

const ssnTrustBadges = [
  { icon: <LockKeyhole />, title: '256-bit encryption', short: '256-bit SSL' },
  { icon: <ShieldCheck />, title: 'Never stored', short: 'Never stored' },
  { icon: <Fingerprint />, title: 'Never sold or shared', short: 'Never shared' },
]

function TrustBadges() {
  return <div className="ssn-trust">
    <div className="ssn-trust-seal">
      <span className="ssn-trust-lock" aria-hidden="true"><LockKeyhole /><Check /></span>
      <span className="ssn-trust-seal-copy"><small>Verified</small><strong>Secured</strong></span>
      <span className="ssn-trust-active"><span className="ssn-trust-live-dot" aria-hidden="true" /> Active</span>
      <span className="ssn-trust-by"><span className="ssn-trust-by-icon" aria-hidden="true"><LockKeyhole /></span><span className="ssn-trust-by-copy"><small>Verified by</small><strong>PolicyBear</strong></span><span className="ssn-trust-by-arrow" aria-hidden="true"><ArrowRight /></span></span>
    </div>
    <div className="ssn-trust-row">
      {ssnTrustBadges.map((badge) => <span className="ssn-trust-item" key={badge.title}>
        <span className="ssn-trust-icon" aria-hidden="true">{badge.icon}</span>
        <strong className="ssn-trust-full">{badge.title}</strong>
        <strong className="ssn-trust-short">{badge.short}</strong>
      </span>)}
    </div>
  </div>
}
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
function LoadingState({ icon, title, lines, active, duration = 2200 }: { icon: React.ReactNode; title: string; lines: string[]; active: number; duration?: number }) {
  const style = { '--load-ms': `${duration}ms` } as React.CSSProperties
  return <div className="loading-state" role="status" aria-live="polite" style={style}>
    <div className="load-dial" aria-hidden="true">
      <svg className="load-ring" viewBox="0 0 100 100"><circle className="load-ring-track" cx="50" cy="50" r="44" /><circle className="load-ring-fill" cx="50" cy="50" r="44" /></svg>
      <span className="load-ring-orbit"><i /></span>
      <span className="loading-symbol">{icon}</span>
    </div>
    <h2>{title}</h2>
    <p>This usually takes a few seconds.</p>
    <div className="load-bar" aria-hidden="true"><span /></div>
    <ul className="load-lines">{lines.map((line, index) => <li className={index <= active ? 'done' : index === active + 1 ? 'working' : ''} key={line}><span className="load-mark"><Check /></span><span className="load-line-copy">{line}</span></li>)}</ul>
  </div>
}
function PriceCard({ price, coverage, annual, setAnnual }: { price: number; coverage: number; annual: boolean; setAnnual: (value: boolean) => void }) { return <div className="price-card"><span className="price-badge"><Sparkles size={14} /> Your personalized rate</span><div className="payment-toggle"><Button variant={!annual ? 'action' : 'quiet'} onClick={() => setAnnual(false)}>Monthly</Button><Button variant={annual ? 'action' : 'quiet'} onClick={() => setAnnual(true)}>Yearly</Button></div><p className="price-figure"><strong>${price.toFixed(2)}</strong><span>/{annual ? 'year' : 'month'}</span></p><span className="price-for">for <b>${coverage.toLocaleString()}</b> of final expense coverage</span>{annual && <small className="price-save">Save 5% paying yearly</small>}<ul><li><Check /> Level-premium plan illustration</li><li><Check /> No medical exam</li><li><Check /> Lifetime coverage if premiums are paid</li></ul></div> }
function Decision({ outcome, firstName, coverage, price, onContinue, onCallback }: { outcome: Outcome; firstName: string; coverage: number; price: number; onContinue: () => void; onCallback: () => void }) {
  if (outcome === 'declined') return <div className="wizard-content"><div className="decision-symbol warm"><Heart /></div><h2>This demo shows a decline for this final expense plan — other options may be available.</h2><div className="option-card"><strong>Guaranteed-issue final expense</strong><p>No health questions. You can’t be turned down for health reasons.</p><Button variant="action" size="touch" onClick={onContinue}>See guaranteed coverage <ArrowRight /></Button></div><div className="option-card"><strong>Talk to a licensed agent</strong><p>An agent can discuss other final expense options with you.</p><Button variant="quiet" onClick={onCallback}>Request a call back</Button></div></div>
  const graded = outcome === 'graded'
  return <div className="wizard-content"><div className="decision-symbol"><Check /></div><h2>{graded ? `Good news, ${firstName || 'friend'} — this demo shows graded final expense coverage.` : `Congratulations, ${firstName || 'friend'}! This demo shows a final expense approval.`}</h2>{graded && <div className="info-panel">For the first 2 years, the full benefit is paid for accidental loss; for other causes, a partial benefit applies. From year 3, your family receives the full ${coverage.toLocaleString()}. [CARRIER_TO_CONFIRM]</div>}<div className="summary-card"><span>{graded ? 'Graded coverage' : 'Immediate full coverage'}</span><strong>${coverage.toLocaleString()} · ${price.toFixed(2)}/month</strong><small>{graded ? 'Benefit schedule shown above' : 'Full benefit from day one [CARRIER_TO_CONFIRM]'}</small></div><Button variant="action" size="touch" className="wide-button" onClick={onContinue}>{graded ? 'Accept and continue' : 'Continue to set up your policy'} <ArrowRight /></Button></div>
}