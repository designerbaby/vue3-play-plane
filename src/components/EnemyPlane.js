import { Game } from '../Game'
import enemyImg from '../../resource/assets/enemy.png'
import { ref, h, defineComponent, onMounted, onMounted, onUnmounted } from '@vue/runtime-core'

export const EnemyPlaneInfo = {
  width: 308,
  height: 207,
  life: 3
}

export default defineComponent({
  props: ['x', 'y'],
  setup(props, ctx) {
    const x = ref(props.x)
    const y = ref(props.y)

    watch(props, (newProps) => {
      x.value = newProps.x
      y.value = newProps.y
    })

    useAttack(ctx, x, y)

    return { x, y }
  },
  render(ctx) {
    return h('Sprite', {
      x: ctx.x,
      y: ctx.y,
      texture: enemyImg
    })
  }
})

const useAttack = (ctx, x, y) => {
  // 发射子弹
  const attackInterval = 2000
  let intervalId
  onMounted(() => {
    intervalId = setInterval(() => {
      ctx.emit('attack', {
        x: x.value + 105,
        y: y.value + 200
      }, attackInterval)
    })
  })

  onUnmounted(() => {
    clearInterval(intervalId)
  })
}