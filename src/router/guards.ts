import { Route, RawLocation } from 'vue-router'

export function beforeEachGuard(
  to: Route,
  from: Route,
  next: (to?: RawLocation | false | void) => void
) {
  console.log('to.name', to.name, 'from.name', from.name)
  next()
}
