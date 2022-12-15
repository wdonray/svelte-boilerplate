import { RouteState } from '@models/route'
import { writable } from 'svelte/store'

const state: RouteState = {
  route: writable(''),
  isHome: writable(false)
}

export {
  state
}
