import { PAGE } from './index'
import { h, defineComponent } from '@vue/runtime-core'
import endPageImg from '../../resource/assets/end_page.jpg'
import restartBtn from '../../resource/assets/restartBtn.png'

export default defineComponent({
  props: ['onNextPage'],
  setup(props, ctx) {
    const handleGoToGame = () => {
      props.onNextPage(PAGE.game)
    }

    return {
      handleGoToGame
    }
  },
  render(ctx) {
    return h('Container', [
      h('Sprite', {
        texture: endPageImg,
        key: '1'
      }),
      h('Sprite', {
        x: 230,
        y: 515,
        texture: restartBtn,
        key: '2',
        on: {
          pointertap: ctx.handleGoToGame
        },
        interactive: true,
        buttonMode: true
      })
    ])
  }
})