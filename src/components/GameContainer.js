import { h, ref, computed } from '@vue/runtime-core'
import { PAGE, getPageComponent } from '../page/index'

export default {
  setup() {
    const currentPageName = ref(PAGE.start)
    const currentPage = computed(() => {
      return getPageComponent(currentPageName.value)
    })
    const handleNextPage = (nextPage) => {
      currentPageName.value = nextPage
    }

    return {
      currentPage,
      handleNextPage
    }
  },
  render(ctx) {
    return h('Contianer', [
      h(ctx.currentPage, {
        onNextPage: ctx.handleNextPage
      })
    ])
  }
}