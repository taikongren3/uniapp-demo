import { describe, expect, it } from 'vitest'
import { joinUrl } from './index'

describe('joinUrl', () => {
  it('joins URL segments without duplicate slashes', () => {
    expect(joinUrl('https://api.example.com/', '/v1/users')).toBe(
      'https://api.example.com/v1/users',
    )
  })

  it('keeps absolute URLs unchanged', () => {
    expect(joinUrl('https://api.example.com', 'https://cdn.example.com/a.png')).toBe(
      'https://cdn.example.com/a.png',
    )
  })
})
