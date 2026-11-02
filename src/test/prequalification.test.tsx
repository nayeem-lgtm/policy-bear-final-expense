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

  it('allows continuing without automated marketing permission', () => {
    open('opt-in')
    expect(screen.getByRole('checkbox')).not.toBeChecked()
    fireEvent.click(screen.getByRole('button', { name: 'Continue', exact: true }))
    expect(window.location.hash).toBe('#step-address')
  })

  it('requires explicit checkbox selection to give contact permission', () => {
    open('opt-in')
    fireEvent.click(screen.getByRole('checkbox'))
    expect(screen.getByRole('checkbox')).toBeChecked()
    expect(window.location.hash).toBe('#step-opt-in')
    fireEvent.click(screen.getByRole('button', { name: 'Continue', exact: true }))
    expect(window.location.hash).toBe('#step-address')
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
    fireEvent.change(screen.getByRole('combobox', { name: 'State', exact: true }), { target: { value: 'Texas' } })
    fireEvent.change(screen.getByRole('textbox', { name: 'ZIP code' }), { target: { value: '75201' } })
    fireEvent.click(screen.getByRole('button', { name: 'Continue', exact: true }))
    expect(window.location.hash).toBe('#step-identity')
    fireEvent.click(screen.getByRole('button', { name: 'Go back to the previous question' }))
    expect(screen.getByRole('textbox', { name: 'Street address' })).toHaveValue('125 Main Street')
    expect(screen.getByRole('textbox', { name: 'City' })).toHaveValue('Dallas')
  })
})