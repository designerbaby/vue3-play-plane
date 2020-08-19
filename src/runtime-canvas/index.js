import { createRenderer } from '@vue/runtime-core';
import { nodeOps } from './nodeOps'

const renderer = createRenderer({
  ...nodeOps
})

export function createApp(rootComponent) {
  return renderer.createApp(rootComponent)
}