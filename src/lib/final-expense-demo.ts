export type Outcome = 'approved' | 'graded' | 'declined'

export const journeySteps = [
  'zip', 'who', 'dob', 'gender', 'tobacco', 'size', 'coverage', 'contact', 'loading', 'price',
  'personal', 'address', 'identity', 'health-intro', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8',
  'health-review', 'underwriting', 'decision', 'gi-offer', 'beneficiary', 'insurance', 'payment', 'draft',
  'review', 'disclosures', 'signature', 'verify', 'submitting', 'issued', 'callback', 'ineligible',
] as const

export type JourneyStep = (typeof journeySteps)[number]

export const healthQuestions = [
  'Are you currently in a hospital, nursing home or hospice, or receiving home health care?',
  'Has a doctor told you that you have a terminal illness, or do you need an organ transplant?',
  'Do you currently need kidney dialysis or oxygen equipment to help you breathe?',
  "Have you ever been diagnosed with or treated for ALS, Alzheimer’s disease or dementia?",
  'In the past 2 years, have you been diagnosed with or treated for cancer (other than basal cell skin cancer), a heart attack, stroke or congestive heart failure?',
  'In the past 2 years, have you been treated for COPD, emphysema, or chronic lung disease?',
  'In the past 2 years, have you had diabetes complications (such as amputation, neuropathy or insulin before age 50)?',
  'In the past 2 years, have you been treated for alcohol or drug abuse, or liver disease such as cirrhosis or hepatitis?',
] as const

const rates = [
  [50, 54, 3.1, 2.4], [55, 59, 3.7, 2.8], [60, 64, 4.6, 3.4], [65, 69, 5.9, 4.3],
  [70, 74, 7.8, 5.7], [75, 79, 10.5, 7.8], [80, 85, 14.5, 10.8],
] as const

export function calculatePrice(age: number, gender: string, coverage: number, tobacco: string, kind: 'immediate' | 'graded' | 'guaranteed' = 'immediate') {
  const row = rates.find(([low, high]) => age >= low && age <= high) ?? rates[3]
  const rate = gender === 'Female' ? row[3] : row[2]
  const tobaccoFactor = tobacco === 'Yes' ? 1.35 : 1
  const coverageFactor = kind === 'graded' ? 1.25 : kind === 'guaranteed' ? 1.6 : 1
  return Math.round(((coverage / 1000) * rate * tobaccoFactor * coverageFactor + 3) * 100) / 100
}

export function determineOutcome(health: string[]): Outcome {
  if (health.slice(0, 5).includes('Yes')) return 'declined'
  if (health.slice(5).includes('Yes')) return 'graded'
  return 'approved'
}

export function chapterFor(step: JourneyStep) {
  const index = journeySteps.indexOf(step)
  if (index <= 9) return 0
  if (index <= 12) return 1
  if (index <= 24) return 2
  if (index <= 29) return 3
  return 4
}

export const safeSavedKeys = [
  'zip', 'city', 'state', 'who', 'month', 'day', 'year', 'gender', 'tobacco', 'feet', 'inches', 'weight',
  'coverage', 'firstName', 'middleName', 'lastName', 'email', 'phone', 'street', 'apt', 'country', 'birthState',
  'citizen', 'resident', 'owner', 'health', 'beneficiaryType', 'beneficiaryFirst', 'beneficiaryLast',
  'relationship', 'beneficiaryPhone', 'otherInsurance', 'replacing', 'paymentMethod', 'draftDate', 'coverageType',
] as const

export function sanitizedAnswers(value: Record<string, unknown>) {
  return Object.fromEntries(safeSavedKeys.filter((key) => key in value).map((key) => [key, value[key]]))
}