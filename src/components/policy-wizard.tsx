import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CircleHelp, Heart, LockKeyhole, MapPin, Minus, Phone, Plus, ShieldCheck, User, Users, AlertCircle } from 'lucide-react'
import * as Radio from '@radix-ui/react-radio-group'
import { z } from 'zod'
import { Button } from '@/components/ui/button'

const steps = ['zip', 'for', 'dob', 'gender', 'tobacco', 'size', 'coverage', 'next']
const phone = '18447652327'
type Answers = { zip: string; city: string; state: string; who: string; month: string; day: string; year: string; gender: string; tobacco: string; feet: string; inches: string; weight: string; coverage: string }
const empty: Answers = { zip: '', city: '', state: '', who: '', month: '', day: '', year: '', gender: '', tobacco: '', feet: '', inches: '', weight: '', coverage: '' }
const titles = ["Let's start with your ZIP code", 'Who would this coverage protect?', "What's your date of birth?", 'Are you male or female?', 'Have you used tobacco or nicotine in the last 12 months?', "What's your height and weight?", 'How much coverage would you like?', 'Your next step to a real price']
const helpers = ['Prices and plans depend on where you live.', '', 'Your age is the biggest factor in your price.', 'Insurance companies price coverage differently for men and women.', 'Includes cigarettes, cigars, vaping, chewing tobacco, nicotine gum or patches.', 'It helps us show a more accurate price.', 'Many families choose $10,000–$20,000 to also cover final bills.', 'A licensed agent can help you check current plans and prices.']
export function PolicyWizard({ onStepChange }: { onStepChange: (step: number) => void }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>(empty)
  const [ready, setReady] = useState(false)
  const [resume, setResume] = useState(false)
  const [error, setError] = useState('')
  const [lookup, setLookup] = useState(false)
  const [offline, setOffline] = useState(false)
  const [help, setHelp] = useState(false)
  const [other, setOther] = useState(false)
  const [ineligible, setIneligible] = useState('')
  const [choosing, setChoosing] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const restoredStep = useRef(0)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('policybear-answers') || 'null')
      if (saved && Date.now() - saved.at < 7 * 86400000 && saved.answers) {
        setAnswers({ ...empty, ...saved.answers })
        const hashStep = steps.indexOf(location.hash.replace('#step-', ''))
        const target = hashStep >= 0 ? hashStep : Math.min(7, Math.max(0, saved.step || 0))
        setStep(target); restoredStep.current = target; setResume(true)
      }
    } catch { /* Unavailable storage should not block the journey. */ }
    setReady(true)
    const navigate = () => { const index = steps.indexOf(location.hash.replace('#step-', '')); setStep(index < 0 ? 0 : index); setError(''); setIneligible(''); setHelp(false) }
    const online = () => setOffline(!navigator.onLine)
    online(); window.addEventListener('hashchange', navigate); window.addEventListener('online', online); window.addEventListener('offline', online)
    return () => { window.removeEventListener('hashchange', navigate); window.removeEventListener('online', online); window.removeEventListener('offline', online); if (timer.current) clearTimeout(timer.current) }
  }, [])
  useEffect(() => {
    onStepChange(step)
    if (!ready) return
    try { localStorage.setItem('policybear-answers', JSON.stringify({ answers, step, at: Date.now() })) } catch { /* Continue when private mode blocks storage. */ }
  }, [answers, step, ready, onStepChange])
  useEffect(() => { if (ready && step > 0) heading.current?.focus({ preventScroll: true }) }, [step, ready])
  useEffect(() => {
    if (!/^\d{5}$/.test(answers.zip)) return
    const controller = new AbortController()
    setLookup(true)
    fetch(`https://api.zippopotam.us/us/${encodeURIComponent(answers.zip)}`, { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error('not-found'); return response.json() })
      .then(data => { const place = data.places?.[0]; if (!place) throw new Error('not-found'); setAnswers(a => ({ ...a, city: place['place name'], state: place.state })); setError('') })
      .catch(e => { if (e.name !== 'AbortError') { setAnswers(a => ({ ...a, city: '', state: '' })); setError("We couldn't find that ZIP. Please check it or try again.") } })
      .finally(() => { if (!controller.signal.aborted) setLookup(false) })
    return () => controller.abort()
  }, [answers.zip])
  function update(key: keyof Answers, value: string) { setAnswers(a => ({ ...a, [key]: value })); setError('') }
  function go(index: number) { setResume(false); setError(''); setHelp(false); setOther(false); setStep(index); location.hash = `step-${steps[index]}` }
  function choose(key: keyof Answers, value: string) {
    if (choosing) return
    update(key, value)
    if (key === 'who' && value !== 'Me') return
    setChoosing(true)
    timer.current = setTimeout(() => { setChoosing(false); go(step + 1) }, 300)
  }
  const dob = new Date(Number(answers.year), Number(answers.month) - 1, Number(answers.day))
  const now = new Date()
  const age = now.getFullYear() - dob.getFullYear() - (now.getMonth() < dob.getMonth() || (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate()) ? 1 : 0)
  const validDOB = Boolean(answers.year && answers.month && answers.day && dob.getMonth() === Number(answers.month) - 1 && dob.getDate() === Number(answers.day))
  const sizeValid = Boolean(answers.feet && answers.inches !== '' && z.coerce.number().min(80).max(500).safeParse(answers.weight).success)
  const valid = step === 0 ? Boolean(answers.city && /^\d{5}$/.test(answers.zip)) : step === 2 ? validDOB : step === 5 ? sizeValid : step === 6 ? Boolean(answers.coverage) : true
  function next(e: React.FormEvent) {
    e.preventDefault()
    if (offline || !valid) return
    if (step === 2 && (age < 50 || age > 85)) { setIneligible(age < 50 ? 'This plan is for ages 50 to 85' : "Let's find the right option together"); return }
    go(step + 1)
  }
  function cards(key: keyof Answers, options: { value: string; detail?: string; icon?: React.ReactNode; popular?: boolean }[], grid = false) {
    return <Radio.Root aria-labelledby="wizard-title" value={answers[key]} onValueChange={value => choose(key, value)} className={grid ? 'answer-grid' : 'answer-list'} disabled={choosing || offline}>{options.map(option => <Radio.Item className={`answer-card ${option.popular ? 'popular-card' : ''}`} key={option.value} value={option.value}>{option.popular && <span className="popular-label">Most popular</span>}{option.icon}<span className="answer-copy"><strong>{option.value}</strong>{option.detail && <span>{option.detail}</span>}</span><span className="radio-circle"><Radio.Indicator><Check size={17} /></Radio.Indicator></span></Radio.Item>)}</Radio.Root>
  }
  function select(key: keyof Answers, label: string, options: { value: string; label: string }[]) {
    return <label className="field-label">{label}<select value={answers[key]} onChange={e => update(key, e.target.value)} autoComplete={key === 'month' ? 'bday-month' : key === 'day' ? 'bday-day' : key === 'year' ? 'bday-year' : undefined}><option value="">{label}</option>{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></label>
  }
  const numericOptions = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => ({ value: String(i + start), label: String(i + start) }))
  return <section className={`wizard ${step > 0 ? 'wizard-standalone' : ''}`} id="get-covered" aria-label="Check your coverage options">
    {offline && <div className="notice" role="status">You're offline. Your answers are saved.</div>}
    {resume && <div className="resume-banner"><p>Welcome back! Pick up where you left off?</p><div><Button variant="quiet" onClick={() => { setResume(false); go(restoredStep.current) }}>Continue</Button><Button variant="quiet" onClick={() => { setAnswers(empty); setResume(false); go(0) }}>Start over</Button></div></div>}
    <div className="wizard-progress"><span>{step < 7 ? `Step ${step + 1} of 8` : 'Your options'}</span><span><LockKeyhole size={15} /> Private & secure</span></div>
    <div className="progress-track" role="progressbar" aria-label="Questions completed" aria-valuenow={Math.min(step + 1, 8)} aria-valuemin={0} aria-valuemax={8}><div className={`progress-fill progress-${step + 1}`} /></div>
    {step > 0 && <Button variant="quiet" className="back-button" onClick={() => go(step - 1)}><ArrowLeft size={18} /> Back</Button>}
    <form onSubmit={next} className="wizard-content" key={`${step}-${ineligible}`}>
      {step === 0 && <div className="wizard-intro"><span className="mini-shield"><ShieldCheck size={23} /></span><span>Peace of mind starts here</span></div>}
      <h2 id="wizard-title" ref={heading} tabIndex={-1}>{ineligible || titles[step]}</h2>
      <p className="question-helper">{ineligible ? 'A licensed agent may still be able to help you find coverage.' : helpers[step]}</p>
      {[2, 3, 5].includes(step) && !ineligible && <><Button variant="quiet" className="why-button" aria-expanded={help} onClick={() => setHelp(!help)}><CircleHelp size={17} /> Why we ask</Button>{help && <p className="why-panel">{helpers[step]} We only ask for information needed to check your coverage options.</p>}</>}
      {!ineligible && step === 0 && <><label className="field-label" htmlFor="zip">ZIP code</label><div className="zip-field"><MapPin size={22} /><input id="zip" value={answers.zip} inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="Enter your ZIP code" onChange={e => { setAnswers(a => ({ ...a, zip: e.target.value.replace(/\D/g, '').slice(0, 5), city: '', state: '' })); setError('') }} onBlur={() => { if (answers.zip && answers.zip.length !== 5) setError('Please enter a 5-digit ZIP code, like 85001.') }} aria-describedby="zip-status" aria-invalid={Boolean(error)} /></div><div id="zip-status" className="zip-status" aria-live="polite">{lookup ? 'Finding your city…' : answers.city ? <><MapPin size={16} /> {answers.city}, {answers.state}</> : null}</div></>}
      {!ineligible && step === 1 && <>{cards('who', [{ value: 'Me', icon: <User /> }, { value: 'My spouse or partner', icon: <Heart /> }, { value: 'My mom or dad', icon: <Users /> }, { value: 'Someone else', icon: <User /> }])}{answers.who && answers.who !== 'Me' && <div className="help-panel"><p>Great that you're helping! The person being covered needs to answer the next questions and sign themselves. Are they with you now?</p><Button variant="action" size="touch" onClick={() => go(2)}>Yes, they'll answer <ArrowRight /></Button><Button variant="quiet" onClick={() => setIneligible('Let’s find a time to talk together')}>No, let’s talk to an agent</Button></div>}</>}
      {!ineligible && step === 2 && <><div className="date-fields">{select('month', 'Month', Array.from({ length: 12 }, (_, i) => ({ value: String(i + 1), label: new Date(2026, i).toLocaleString('en', { month: 'long' }) })))}{select('day', 'Day', numericOptions(1, 31))}{select('year', 'Year', numericOptions(now.getFullYear() - 85, now.getFullYear() - 50).reverse())}</div><p className="age-confirmation" aria-live="polite">{validDOB ? `You're ${age}` : answers.day && answers.month && answers.year ? 'Please double-check the day for that month.' : ''}</p></>}
      {!ineligible && step === 3 && cards('gender', [{ value: 'Male' }, { value: 'Female' }])}
      {!ineligible && step === 4 && <>{cards('tobacco', [{ value: 'No' }, { value: 'Yes' }])}<p className="reassurance"><ShieldCheck size={18} /> Smokers can still get covered.</p></>}
      {!ineligible && step === 5 && <><div className="height-fields">{select('feet', 'Feet', numericOptions(4, 7))}{select('inches', 'Inches', numericOptions(0, 11))}</div><label className="field-label" htmlFor="weight">Weight</label><div className="weight-field"><input id="weight" value={answers.weight} inputMode="numeric" placeholder="Your weight" maxLength={3} onChange={e => update('weight', e.target.value.replace(/\D/g, ''))} onBlur={() => { if (answers.weight && !sizeValid) setError('Please double-check your height and weight. Weight should be 80–500 lbs.') }} /><span>lbs</span></div></>}
      {!ineligible && step === 6 && <>{!other && cards('coverage', [{ value: '$10,000', detail: 'Covers a simple funeral' }, { value: '$15,000', detail: 'Funeral + final bills', popular: true }, { value: '$20,000', detail: 'Extra cushion for family' }, { value: '$25,000', detail: 'Leave something behind' }], true)}<Button variant="quiet" className="other-amount" onClick={() => { setOther(!other); update('coverage', '$15,000') }}>{other ? 'Choose a suggested amount' : 'Choose a different amount'}</Button>{other && <div className="coverage-control"><strong>{answers.coverage}</strong><div><Button variant="quiet" size="touch" aria-label="Decrease coverage" onClick={() => update('coverage', '$' + Math.max(5000, Number(answers.coverage.replace(/\D/g, '')) - 1000).toLocaleString())}><Minus /></Button><input type="range" aria-label="Coverage amount" min={5000} max={40000} step={1000} value={Number(answers.coverage.replace(/\D/g, ''))} onChange={e => update('coverage', '$' + Number(e.target.value).toLocaleString())} /><Button variant="quiet" size="touch" aria-label="Increase coverage" onClick={() => update('coverage', '$' + Math.min(40000, Number(answers.coverage.replace(/\D/g, '')) + 1000).toLocaleString())}><Plus /></Button></div><p>$5,000 to $40,000</p></div>}</>}
      <div className="form-error" role="status">{error && <><AlertCircle size={18} />{error}</>}</div>
      {!ineligible && [0, 2, 5].includes(step) || (!ineligible && step === 6 && other) ? <Button variant="action" size="touch" className="continue-button" type="submit" disabled={!valid || lookup || offline}>{step === 0 ? 'Check my options' : 'Continue'}<ArrowRight size={21} /></Button> : null}
      {(ineligible || step === 7) && <div className="agent-next">{!ineligible && <><div className="coverage-summary"><ShieldCheck /><span><strong>{answers.coverage} of lifelong coverage</strong><span>No medical exam</span></span></div><p className="connection-note">Online prices are not available here yet. Call PolicyBear to talk through your options.</p></>}<Button variant="action" size="touch" asChild><a href={`tel:+${phone}`}><Phone size={21} /> Talk to PolicyBear</a></Button><p className="general-phone">(844) 765-2327 · PolicyBear’s main line</p></div>}
      {step === 0 && <p className="form-time">About 2 minutes. No medical exam.</p>}
      <div className="form-trust"><span><LockKeyhole size={16} /> Secure</span><span><ShieldCheck size={17} /> No obligation</span><span><Heart size={17} /> Family first</span></div>
      {step > 0 && <p className="question-call">Questions? <a href={`tel:+${phone}`}>Call (844) 765-2327</a></p>}
    </form>
  </section>
}