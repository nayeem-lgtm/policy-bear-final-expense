import { describe, expect, it } from 'vitest'
import { COVERAGE_MAX, COVERAGE_MIN, LICENSED_STATES, TYPICAL_FINAL_EXPENSES, TYPICAL_FINAL_EXPENSES_SOURCE, aboutYouProgress, basicInfoSteps, chapterFor, journeySteps, preQualSteps, quoteSteps } from '@/lib/final-expense-demo'

describe('Coverage range', () => {
  it('runs from $5,000 to $50,000 as the owner offers it', () => {
    expect(COVERAGE_MIN).toBe(5000)
    expect(COVERAGE_MAX).toBe(50000)
  })
})

describe('Quote sequence', () => {
  it('opens with the five basic-info questions in the owner\'s order', () => {
    expect([...basicInfoSteps]).toEqual(['state', 'gender', 'dob', 'coverage', 'tobacco'])
  })
  it('shows the illustration immediately after the basic-info five', () => {
    expect(journeySteps.indexOf('loading')).toBe(journeySteps.indexOf('tobacco') + 1)
    expect(journeySteps.indexOf('price')).toBe(journeySteps.indexOf('tobacco') + 2)
  })
  it('asks the pre-qualification questions after the illustration, with opt-in still last', () => {
    expect([...preQualSteps]).toEqual(['who', 'contact', 'size', 'opt-in'])
    expect(journeySteps.indexOf('who')).toBe(journeySteps.indexOf('price') + 1)
    expect(quoteSteps.at(-1)).toBe('opt-in')
  })
  it('maps the four owner-named chapters to the right screens', () => {
    for (const step of basicInfoSteps) expect(chapterFor(step)).toBe(0)
    expect(chapterFor('price')).toBe(0)
    for (const step of ['who', 'contact', 'size', 'opt-in', 'address', 'health-intro', 'h1', 'decision'] as const) expect(chapterFor(step)).toBe(1)
    expect(chapterFor('payment')).toBe(2)
    expect(chapterFor('signature')).toBe(3)
  })
  it('goes directly from permission to address without repeating personal details', () => {
    expect(journeySteps[journeySteps.indexOf('opt-in') + 1]).toBe('address')
    expect([...journeySteps]).not.toContain('personal')
  })
})

describe('Licensed states', () => {
  it('offers exactly the 31 states and districts the owner sells in', () => {
    expect(LICENSED_STATES).toHaveLength(31)
    const abbrs = LICENSED_STATES.map((item) => item.abbr)
    const names = LICENSED_STATES.map((item) => item.name)
    expect(names).toEqual([...names].sort())
    expect(new Set(abbrs).size).toBe(31)
    for (const abbr of ['AK', 'AL', 'AZ', 'CA', 'CO', 'DC', 'DE', 'IA', 'ID', 'IN', 'KS', 'LA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MT', 'ND', 'NJ', 'NV', 'OH', 'OK', 'PA', 'RI', 'SD', 'TN', 'TX', 'UT', 'VA', 'WY']) {
      expect(abbrs).toContain(abbr)
    }
    for (const abbr of ['FL', 'NY', 'GA', 'IL', 'NC', 'WA']) expect(abbrs).not.toContain(abbr)
  })
})
