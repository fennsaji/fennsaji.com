// @vitest-environment node
import { describe, it, expect } from 'vitest'
import {
  parseProject,
  filterFeatured,
  getAllTags,
  sortByYear,
  sortByOrder,
  hasCaseStudy,
  findBySlug,
  getPopularTags,
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

  it('defaults case-study fields to undefined when absent', () => {
    const p = parseProject('call-guard.md', RAW_MD)
    expect(p.problem).toBeUndefined()
    expect(p.architecture).toBeUndefined()
    expect(p.decisions).toBeUndefined()
    expect(p.results).toBeUndefined()
  })

  it('parses optional case-study fields when present', () => {
    const raw = RAW_MD.replace(
      'featured: true',
      'featured: true\nproblem: Some problem\narchitecture: Some architecture\ndecisions: [Decision one, Decision two]\nresults: Some results'
    )
    const p = parseProject('call-guard.md', raw)
    expect(p.problem).toBe('Some problem')
    expect(p.architecture).toBe('Some architecture')
    expect(p.decisions).toEqual(['Decision one', 'Decision two'])
    expect(p.results).toBe('Some results')
  })

  it('throws with filename when decisions is a scalar instead of a list', () => {
    const raw = RAW_MD.replace('featured: true', 'featured: true\ndecisions: not a list')
    expect(() => parseProject('call-guard.md', raw)).toThrow(/call-guard\.md.*decisions/)
  })

  it('throws with filename when a decisions item is an unquoted key: value map', () => {
    const raw = RAW_MD.replace(
      'featured: true',
      'featured: true\ndecisions:\n  - Event-driven authoring: trades idle CPU for latency'
    )
    expect(() => parseProject('call-guard.md', raw)).toThrow(/call-guard\.md.*decisions/)
  })

  it('throws with filename when problem is not a string', () => {
    const raw = RAW_MD.replace('featured: true', 'featured: true\nproblem: [a, b]')
    expect(() => parseProject('call-guard.md', raw)).toThrow(/call-guard\.md.*problem/)
  })
})

describe('hasCaseStudy', () => {
  it('is false when no case-study fields are set', () => {
    expect(hasCaseStudy(parseProject('call-guard.md', RAW_MD))).toBe(false)
  })

  it('is true when only results is set', () => {
    const raw = RAW_MD.replace('featured: true', 'featured: true\nresults: Shipped')
    expect(hasCaseStudy(parseProject('call-guard.md', raw))).toBe(true)
  })

  it('is true when only decisions is set', () => {
    const raw = RAW_MD.replace('featured: true', 'featured: true\ndecisions: [one]')
    expect(hasCaseStudy(parseProject('call-guard.md', raw))).toBe(true)
  })

  it('is false when decisions is an empty list and nothing else is set', () => {
    const raw = RAW_MD.replace('featured: true', 'featured: true\ndecisions: []')
    expect(hasCaseStudy(parseProject('call-guard.md', raw))).toBe(false)
  })
})

describe('findBySlug', () => {
  const projects = [
    parseProject('call-guard.md', RAW_MD),
    parseProject('remembite.md', RAW_MD_2),
  ]

  it('returns the project with the matching slug', () => {
    expect(findBySlug(projects, 'remembite')?.title).toBe('Remembite')
  })

  it('returns undefined for an unknown slug', () => {
    expect(findBySlug(projects, 'nope')).toBeUndefined()
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

describe('getPopularTags', () => {
  const projects = [
    parseProject('a.md', RAW_MD), // Rust, Android
    parseProject('b.md', RAW_MD_2), // TypeScript, React
    parseProject('c.md', RAW_MD_2.replace('[TypeScript, React]', '[Rust, React]')),
  ]

  it('returns only tags used by at least two projects, sorted', () => {
    expect(getPopularTags(projects)).toEqual(['React', 'Rust'])
  })

  it('respects a custom minimum', () => {
    expect(getPopularTags(projects, 1)).toEqual(['Android', 'React', 'Rust', 'TypeScript'])
    expect(getPopularTags(projects, 3)).toEqual([])
  })

  it('counts a tag once per project even if listed twice in that project\'s frontmatter', () => {
    const duplicateTagProject = parseProject('d.md', RAW_MD.replace('[Rust, Android]', '[Rust, Rust]'))
    expect(getPopularTags([duplicateTagProject])).toEqual([])
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
