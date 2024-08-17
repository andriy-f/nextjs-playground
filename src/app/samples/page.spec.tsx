import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
// import Page from '@/app/samples/page'
import Page from './page'

test('Sample Page', () => {
    render(<Page />)
    // expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeDefined()
    expect(screen.getByText('Samples empty')).toBeDefined()
})