import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TagFilter } from '@/components/TagFilter'
import type { Project } from '@/lib/projects'

const makeProject = (overrides: Partial<Project>): Project => ({
  slug: 'test',
  title: 'Test',
  description: 'desc',
  tech: [],
  featured: false,
  year: 2024,
  content: '',
  ...overrides,
})

const projects: Project[] = [
  makeProject({ slug: 'a', title: 'Alpha', tech: ['Rust'] }),
  makeProject({ slug: 'b', title: 'Beta', tech: ['TypeScript'] }),
  makeProject({ slug: 'c', title: 'Gamma', tech: ['Rust', 'TypeScript'] }),
]

describe('TagFilter', () => {
  it('renders all projects by default', () => {
    render(<TagFilter projects={projects} tags={['Rust', 'TypeScript']} />)
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.getByText('Beta')).toBeInTheDocument()
    expect(screen.getByText('Gamma')).toBeInTheDocument()
  })

  it('renders All and each tag as filter buttons', () => {
    render(<TagFilter projects={projects} tags={['Rust', 'TypeScript']} />)
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Rust' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'TypeScript' })).toBeInTheDocument()
  })

  it('filters to Rust projects when Rust tag is clicked', () => {
    render(<TagFilter projects={projects} tags={['Rust', 'TypeScript']} />)
    fireEvent.click(screen.getByRole('button', { name: 'Rust' }))
    expect(screen.getByText('Alpha')).toBeInTheDocument()
    expect(screen.queryByText('Beta')).not.toBeInTheDocument()
    expect(screen.getByText('Gamma')).toBeInTheDocument()
  })

  it('shows all projects again when All is clicked after filtering', () => {
    render(<TagFilter projects={projects} tags={['Rust', 'TypeScript']} />)
    fireEvent.click(screen.getByRole('button', { name: 'Rust' }))
    fireEvent.click(screen.getByRole('button', { name: 'All' }))
    expect(screen.getByText('Beta')).toBeInTheDocument()
  })
})
