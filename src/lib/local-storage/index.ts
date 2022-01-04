import * as assert from 'assert'
import { setItem, getItem } from 'fp-ts-local-storage'
import { some } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { chain } from 'fp-ts/lib/IO'

export const LocalStorage = (value: number) => {
  const program = pipe(
    setItem('dev_loc_time', JSON.stringify({ time: value })),
    chain(() => getItem('dev_loc_time'))
  )

  assert.deepStrictEqual(program(), some(`{"time":${value}}`))
}
