import { defineComponent, h } from '@vue/runtime-core'
import MainPage from './page/MainPage.js'

// template -> render
export default defineComponent({
  render() {
    return h("Container", {}, [h(MainPage)])
  }
})