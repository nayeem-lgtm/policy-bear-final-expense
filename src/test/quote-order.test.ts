import { describe, expect, it } from 'vitest'
import { COVERAGE_MAX, COVERAGE_MIN, chapterFor, journeySteps, quoteSteps } from '@/lib/final-expense-demo'

describe('Coverage range', () => {
  it('runs from $5,000 to $55,000 as the owner offers it', () => {
    expect(COVERAGE_MIN).toBe(5000)
    expect(COVERAGE_MAX).toBe(55000)
  })
})

describe('Quote sequence', () => {
  it('collects contact details immediately after the second step', () => {
    expect(quoteSteps.slice(0, 4)).toEqual(['zip', 'who', 'contact', 'dob'])
    expect(journeySteps.indexOf('contact')).toBe(2)
  })
  it('keeps opt-in after all quote questions and before pricing', () => {
    expect(quoteSteps.at(-1)).toBe('opt-in')
    expect(journeySteps.slice(journeySteps.indexOf('coverage'), journeySteps.indexOf('price') + 1)).toEqual(['coverage', 'opt-in', 'loading', 'price'])
  })
  it('keeps application chapter boundaries correct after reordering', () => {
    expect(chapterFor('price')).toBe(0)
    expect(chapterFor('personal')).toBe(1)
    expect(chapterFor('health-intro')).toBe(2)
    expect(chapterFor('payment')).toBe(3)
    expect(chapterFor('signature')).toBe(4)
  })
})