import {
  h,
  defineComponent,
  reactive,
  onMounted,
  onUnmounted,
} from "@vue/runtime-core";
import { game } from "../Game";

export default defineComponent({
  setup(props, ctx) {
    const circlePosition = reactive({
      x: 10,
      y: 20
    })
    let speed = 3
    let xDirection = 1
    const moveCircle = () => {
      if(circlePosition.x > 380){
        xDirection= -1
      }
      if(circlePosition.x < 20){
        xDirection= 1
      }      
      circlePosition.x =  circlePosition.x + (xDirection * speed)
    }
    const handleTicker = () => {
      // 小球移动
      requestAnimationFrame(moveCircle)
    }
    onMounted(() => {
      game.ticker.add(handleTicker)
    });
    onUnmounted(() => {
      game.ticker.remove(handleTicker);
    })
    return {
      circlePosition
    }
  },
  render(ctx) {
    return h("Container", {}, [
      h('circle', { x: ctx.circlePosition.x, y: ctx.circlePosition.y })
    ])
  }
})