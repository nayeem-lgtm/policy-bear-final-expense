import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { PolicyWizard } from '@/components/policy-wizard'

vi.mock('@tanstack/react-router', () => ({
  useRouterState: () => '',
  Link: ({ to, children, ...props }: { to: string; children: React.ReactNode }) => <a href={to} {...props}>{children}</a>,
}))

beforeEach(() => {
  vi.useFakeTimers()
  localStorage.clear()
  vi.stubGlobal('ResizeObserver', class { observe() {} unobserve() {} disconnect() {} })
})
afterEach(() => {
  cleanup()
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

function open(step: string) {
  window.history.replaceState(null, '', `/#step-${step}`)
  render(<PolicyWizard onStepChange={() => {}} />)
}

describe('Pre-qualification navigation', () => {
  it.each(['Me', 'My spouse or partner', 'My mom or dad', 'Someone else'])('automatically advances %s to contact details', (choice) => {
    open('who')
    fireEvent.click(screen.getByRole('radio', { name: new RegExp(`^${choice}`) }))
    act(() => { vi.advanceTimersByTime(350) })
    expect(window.location.hash).toBe('#step-contact')
    expect(screen.getByRole('textbox', { name: 'First name' })).toBeInTheDocument()
  })

  it('allows skipping automated marketing permission', () => {
    open('opt-in')
    expect(screen.getByRole('checkbox')).not.toBeChecked()
    fireEvent.click(screen.getByRole('button', { name: /skip this step/ }))
    expect(window.location.hash).toBe('#step-address')
  })

  it('advances automatically once permission is ticked', () => {
    open('opt-in')
    fireEvent.click(screen.getByRole('checkbox'))
    expect(window.location.hash).toBe('#step-opt-in')
    act(() => { vi.advanceTimersByTime(800) })
    expect(window.location.hash).toBe('#step-address')
  })

  it('advances from contact details once all are valid, with no Continue button', () => {
    open('contact')
    expect(screen.queryByRole('button', { name: /Continue/ })).toBeNull()
    fireEvent.change(screen.getByRole('textbox', { name: 'First name' }), { target: { value: 'Ann' } })
    fireEvent.change(screen.getByRole('textbox', { name: 'Last name' }), { target: { value: 'Lee' } })
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), { target: { value: 'ann@example.com' } })
    fireEvent.change(screen.getByRole('textbox', { name: 'Mobile phone' }), { target: { value: '5555555555' } })
    act(() => { vi.advanceTimersByTime(1500) })
    expect(window.location.hash).toBe('#step-size')
  })
  it('returns from address directly to permission', () => {
    open('address')
    fireEvent.click(screen.getByRole('button', { name: 'Go back to the previous question' }))
    expect(window.location.hash).toBe('#step-opt-in')
  })
  it('preserves address answers when navigating Back', () => {
    open('address')
    fireEvent.change(screen.getByRole('textbox', { name: 'Street address' }), { target: { value: '125 Main Street' } })
    fireEvent.change(screen.getByRole('textbox', { name: 'City' }), { target: { value: 'Dallas' } })
    fireEvent.change(screen.getByRole('combobox', { name: 'State' }), { target: { value: 'Texas' } })
    fireEvent.change(screen.getByRole('textbox', { name: 'ZIP code' }), { target: { value: '75201' } })
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }))
    expect(window.location.hash).toBe('#step-identity')
    fireEvent.click(screen.getByRole('button', { name: 'Go back to the previous question' }))
    expect(screen.getByRole('textbox', { name: 'Street address' })).toHaveValue('125 Main Street')
    expect(screen.getByRole('textbox', { name: 'City' })).toHaveValue('Dallas')
  })
})
describe('Revisiting a step', () => {
  it('shows a small Next button after going Back, with no auto-advance', () => {
    open('size')
    fireEvent.click(screen.getByRole('button', { name: /skip|Go back/ }))
    expect(window.location.hash).toBe('#step-contact')
    fireEvent.change(screen.getByRole('textbox', { name: 'First name' }), { target: { value: 'Ann' } })
    fireEvent.change(screen.getByRole('textbox', { name: 'Last name' }), { target: { value: 'Lee' } })
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), { target: { value: 'ann@example.com' } })
    fireEvent.change(screen.getByRole('textbox', { name: 'Mobile phone' }), { target: { value: '5555555555' } })
    act(() => { vi.advanceTimersByTime(2000) })
    expect(window.location.hash).toBe('#step-contact')
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(window.location.hash).toBe('#step-size')
  })
})
