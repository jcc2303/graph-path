import { writable } from './_snowpack/pkg/svelte/store.js'

export const slice = writable(1)
export const project = writable(0)

export const start = writable(0)

export const key = Symbol()

// Some props for the app
export const width = writable(window.innerWidth)
export const height = writable(window.innerHeight)
export const pixelRatio = writable(window.devicePixelRatio)
export const context = writable()
export const canvas = writable()
