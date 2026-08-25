// @vitest-environment node
import { describe, it, expect } from 'vitest'
import {
  parseProject,
  filterFeatured,
  getAllTags,
  sortByYear,
  sortByOrder,
} from '@/lib/projects'

const RAW_MD = `---
title: Call Guard
description: AI spam call screening
tech: [Rust, Android]
github: https://github.com/fennsaji/call-guard
featured: true
year: 2024
---

Some body text.
`

const RAW_MD_2 = `---
title: Remembite
description: AI memory app
tech: [TypeScript, React]
featured: false
year: 2023
---
`

describe('parseProject', () => {
  it('parses title and description from frontmatter', () => {
    const p = parseProject('call-guard.md', RAW_MD)
    expect(p.title).toBe('Call Guard')
    expect(p.description).toBe('AI spam call screening')
  })

  it('derives slug from filename', () => {
    const p = parseProject('call-guard.md', RAW_MD)
    expect(p.slug).toBe('call-guard')
  })

  it('parses tech array', () => {
    const p = parseProject('call-guard.md', RAW_MD)
    expect(p.tech).toEqual(['Rust', 'Android'])
  })

  it('parses optional github link', () => {
    const p = parseProject('call-guard.md', RAW_MD)
    expect(p.github).toBe('https://github.com/fennsaji/call-guard')
  })

  it('defaults demo to undefined when absent', () => {
    const p = parseProject('call-guard.md', RAW_MD)
    expect(p.demo).toBeUndefined()
  })

  it('parses featured flag', () => {
    const p = parseProject('call-guard.md', RAW_MD)
    expect(p.featured).toBe(true)
  })

  it('parses year', () => {
    const p = parseProject('call-guard.md', RAW_MD)
    expect(p.year).toBe(2024)
  })

  it('extracts markdown body as content', () => {
    const p = parseProject('call-guard.md', RAW_MD)
    expect(p.content.trim()).toBe('Some body text.')
  })
})

describe('filterFeatured', () => {
  it('returns only featured projects', () => {
    const projects = [
      parseProject('call-guard.md', RAW_MD),
      parseProject('remembite.md', RAW_MD_2),
    ]
    const featured = filterFeatured(projects)
    expect(featured).toHaveLength(1)
    expect(featured[0].slug).toBe('call-guard')
  })
})

describe('getAllTags', () => {
  it('returns unique sorted tags from all projects', () => {
    const projects = [
      parseProject('call-guard.md', RAW_MD),
      parseProject('remembite.md', RAW_MD_2),
    ]
    const tags = getAllTags(projects)
    expect(tags).toEqual(['Android', 'React', 'Rust', 'TypeScript'])
  })
})

describe('sortByYear', () => {
  it('sorts projects newest first', () => {
    const projects = [
      parseProject('remembite.md', RAW_MD_2),
      parseProject('call-guard.md', RAW_MD),
    ]
    const sorted = sortByYear(projects)
    expect(sorted[0].year).toBe(2024)
    expect(sorted[1].year).toBe(2023)
  })
})

describe('sortByOrder', () => {
  it('sorts projects by ascending order field', () => {
    const RAW_ORDER_2 = RAW_MD.replace('featured: true', 'featured: true\norder: 2')
    const RAW_ORDER_1 = RAW_MD_2.replace('featured: false', 'featured: true\norder: 1')
    const projects = [
      parseProject('call-guard.md', RAW_ORDER_2),
      parseProject('remembite.md', RAW_ORDER_1),
    ]
    const sorted = sortByOrder(projects)
    expect(sorted[0].slug).toBe('remembite')
    expect(sorted[1].slug).toBe('call-guard')
  })

  it('sorts projects without an order field after ones with one', () => {
    const projects = [
      parseProject('call-guard.md', RAW_MD),
      parseProject('remembite.md', RAW_MD_2.replace('featured: false', 'featured: true\norder: 1')),
    ]
    const sorted = sortByOrder(projects)
    expect(sorted[0].slug).toBe('remembite')
    expect(sorted[1].slug).toBe('call-guard')
  })
})
