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
})
afterEach(() => {
  cleanup()
  vi.useRealTimers()
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
    fireEvent.click(screen.getByRole('button', { name: 'Continue without contact permission' }))
    expect(window.location.hash).toBe('#step-personal')
  })

  it('requires explicit checkbox selection to give contact permission', () => {
    open('opt-in')
    fireEvent.click(screen.getByRole('checkbox'))
    expect(screen.getByRole('checkbox')).toBeChecked()
    expect(window.location.hash).toBe('#step-opt-in')
    fireEvent.click(screen.getByRole('button', { name: 'Continue with contact permission' }))
    expect(window.location.hash).toBe('#step-personal')
  })
})