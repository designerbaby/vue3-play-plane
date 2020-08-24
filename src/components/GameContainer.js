import { h, ref, computed } from '@vue/runtime-core'
import { PAGE, getPageComponent } from '../page/index'
// import MainPage from '../page/MainPage.js'

export default {
  setup() {
    const currentPageName = ref(PAGE.start)
    const currentPage = computed(() => {
      return getPageComponent(currentPageName.value);
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
    return h("Container", {}, [
      h(ctx.currentPage, {
        onNextPage: ctx.handleNextPage
      })
    ])
  }
}