import auth from './auth'
import jquery from './jquery'

function trim(str) {
  return str.replace(/\s+/g, '')
}

export default {
  ...auth,
  ...jquery,
  trim
}
