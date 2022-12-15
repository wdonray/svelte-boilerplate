import { Writable } from 'svelte/store'

export interface RouteState {
  route: Writable<string>;
  isHome: Writable<boolean>;
}
