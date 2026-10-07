# Complete PolicyBear Front-End Journey

## Goal
Expand the current branded landing page and seven-question flow into the complete browser-only prototype described in the updated brief. No data will leave the browser.

## What will change
- Finish the quick quote with contact details, calm loading feedback, and live demo pricing from the supplied formula.
- Add the full application journey: personal details, address, identity, health questions, answer review, and mock underwriting.
- Add all three decision paths: immediate approval, graded approval, and the Guaranteed Issue alternative.
- Add policy setup, application review, disclosures, typed signature, mock verification, submission, and policy-issued confirmation.
- Add friendly ineligible and callback paths, returning-visitor recovery, and a compact Demo toolbar that can open any screen and force an outcome.
- Replace the current “online prices are not available” ending with the supplied browser-generated experience.

## Experience and safety
- Keep PolicyBear’s existing blue-and-yellow brand styling, official logo, senior-friendly type sizes, large controls, and calm language.
- Keep browser Back navigation and refresh recovery across the wizard.
- Persist ordinary demo answers only; Social Security and payment fields remain in memory and are never saved locally.
- Preserve accessible radio groups, announced errors, keyboard navigation, focus management, and reduced-motion support.
- Show every bracketed placeholder exactly as supplied so compliance and carrier wording remains easy to locate.

## Technical details
- Keep the journey in the dedicated browser-safe wizard on `/`, using hash-based screen history.
- Use React state and localStorage only, with the mock price and underwriting rules from the updated brief.
- Split the expanded journey into focused screen and utility modules while retaining shared PolicyBear controls and centralized visual tokens.
- Add focused tests for pricing, underwriting, persistence sanitization, navigation, and key alternate paths.
- Verify the full journey and Demo toolbar at desktop and 375px mobile widths.