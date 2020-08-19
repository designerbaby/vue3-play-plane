import { h, defineComponent } from '@vue/runtime-core'

export default defineComponent({
  return () {
    return h('circle', { x: 200, y: 200 })
  }
})