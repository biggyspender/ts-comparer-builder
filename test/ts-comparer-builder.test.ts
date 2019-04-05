import { comparerBuilder, defaultComparer } from '../src/ts-comparer-builder'
import { Date } from './Date'
describe('defaultComparer', () => {
  it('works', () => {
    const a = [1, 2, 1, 4, 3]
    a.sort(defaultComparer)
    expect(a).toEqual([1, 1, 2, 3, 4])
  })
})
describe('comparerBuilder', () => {
  it('works', () => {
    const comparer = comparerBuilder<Date>()
      .sortKey(x => x.year)
      .thenKey(x => x.month)
      .thenKey(x => x.day)
      .build()

    const dates: Date[] = [
      { day: 1, month: 10, year: 2000 },
      { day: 1, month: 1, year: 2000 },
      { day: 2, month: 1, year: 2000 },
      { day: 1, month: 1, year: 1999 },
      { day: 1, month: 1, year: 2000 }
    ]

    dates.sort(comparer)
    expect(dates).toEqual([
      { day: 1, month: 1, year: 1999 },
      { day: 1, month: 1, year: 2000 },
      { day: 1, month: 1, year: 2000 },
      { day: 2, month: 1, year: 2000 },
      { day: 1, month: 10, year: 2000 }
    ])

    const comparer2 = comparerBuilder<Date>()
      .sortKeyDescending(x => x.year)
      .thenKeyDescending(x => x.month)
      .thenKeyDescending(x => x.day)
      .build()
    dates.sort(comparer2)

    expect(dates).toEqual([
      { day: 1, month: 10, year: 2000 },
      { day: 2, month: 1, year: 2000 },
      { day: 1, month: 1, year: 2000 },
      { day: 1, month: 1, year: 2000 },
      { day: 1, month: 1, year: 1999 }
    ])

    const comparer3 = comparerBuilder()
      .sortKeyDescending(x => x)
      .build()
    expect([1, 2].sort(comparer3)).toEqual([2, 1])
    expect([2, 1].sort(comparer3)).toEqual([2, 1])
    expect([0, 0].sort(comparer3)).toEqual([0, 0])
  })
})
