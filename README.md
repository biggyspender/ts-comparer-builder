## Multi-level sort with ts-comparer-builder

ts-comparer-builder is an easy way of creating multi-level comparer functions that can be used in `Array.sort`

### Example

Given a (very simple) Date type

```typescript
export interface Date {
  day: number
  month: number
  year: number
}
```

and some unordered instances of it

```typescript
const dates: Date[] = [
    { day: 1, month: 10, year: 2000 },
    { day: 1, month: 1, year: 2000 },
    { day: 2, month: 1, year: 2000 },
    { day: 1, month: 1, year: 1999 },
    { day: 1, month: 1, year: 2000 }
]
```

we can build a comparer function for it

```typescript
const dateComparer = comparerBuilder<Date>()
    .sortKey(x => x.year)
    .thenKey(x => x.month)
    .thenKey(x => x.day)
    .build()
```

and sort our list of Date

```typescript
dates.sort(dateComparer)
```

so that it looks like this:

```json
[ { day: 1, month: 1, year: 1999 },
  { day: 1, month: 1, year: 2000 },
  { day: 1, month: 1, year: 2000 },
  { day: 2, month: 1, year: 2000 },
  { day: 1, month: 10, year: 2000 } ]
```



### acknowledgements

Created using the wonderful [https://github.com/alexjoverm/typescript-library-starter](https://github.com/alexjoverm/typescript-library-starter).
