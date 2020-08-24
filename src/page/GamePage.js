import TWEEN from '@tweenjs/tween.js'
import { defineComponent, reactive, h, onMounted, onUnmounted } from '@vue/runtime-core'
import Bullet, { SelfBulletInfo, EnemyBulletInfo } from '../components/Bullet'
import Plane, { PlaneInfo } from '../components/Plane'
import EnemyPlane, { EnemyPlaneInfo } from '../components/EnemyPlane'
import Map from '../components/Map'
import { hitTestRectangle } from '../utils/hitTestRectangle'
import { moveBullets } from '../components/moveBullets'
import { moveEnemyPlane } from '../components/moveEnemyPlane'
import { useKeyboardMove } from '../use/index'
import { PAGE } from './index'
import { stage } from '../config/stage'
import { game } from '../Game.js'

let hashCode = 0
const createHashCode = () => {
  return hashCode++
}

// 我方战机
const useSelfPlane = ({ x, y, speed }) => {
  const selfPlane = reactive({
    x,
    y,
    speed,
    width: PlaneInfo.width,
    height: PlaneInfo.height
  })

  const { x: selfPlaneX, y: selfPlaneY } = useKeyboardMove({
    x: selfPlane.x,
    y: selfPlane.y,
    speed: selfPlane.speed
  })
  
  // 缓动出场
  const tween = new TWEEN.Tween({
    x,
    y
  })
    .to({ y: y - 250 }, 500)
    .start()
  tween.onUpdate((obj) => {
    selfPlane.x = obj.x
    selfPlane.y = obj.y
  })
  
  const handleTicker = () => {
    TWEEN.update()
  }
  
  onMounted(() => {
    game.ticker.add(handleTicker)
  })
  
  onUnmounted(() => {
    game.ticker.remove(handleTicker)
  })
  
  selfPlane.x = selfPlaneX
  selfPlane.y = selfPlaneY

  return selfPlane
}

// 我方子弹
const useSelfBullet = () => {
  // 子弹的数据
  const selfBullets = reactive([])

  // 创建子弹
  const createSelfBullet = (x, y) => {
    const id = createHashCode()
    const width = SelfBulletInfo.width
    const height = SelfBulletInfo.height
    const rotation = SelfBulletInfo.rotation
    const dir = SelfBulletInfo.dir
    selfBullets.push({x, y, id, width, height, rotation, dir})
  }

  // 销毁子弹
  const destroySelfBullet = (id) => {
    const index = selfBullets.findIndex((info) => info.id === id)
    if (index !== -1) {
      selfBullets.splice(index, 1)
    }
  }

  return {
    selfBullets,
    createSelfBullet,
    destroySelfBullet
  }
}

// 敌机
const useEnemyPlanes = () => {
  // 生产敌机
  const createEnemyPlaneData = (x) => {
    return {
      x,
      y: -200,
      width: EnemyPlaneInfo.width,
      height: EnemyPlaneInfo.height,
      life: EnemyPlaneInfo.life
    }
  }

  const enemyPlanes = reactive([])

  setInterval(() => {
    const x = Math.floor(Math.random() * (1 + stage.width))
    enemyPlanes.push(createEnemyPlaneData(x))
  }, 600)

  return enemyPlanes
}

// 敌军战机子弹
const useEnemyPlaneBullets = () => {
  // 创建敌军子弹
  const enemyPlaneBullets = reactive([])

  const createEnemyPlaneBullet = (x, y) => {
    const id = createHashCode()
    const width = EnemyBulletInfo.width
    const height = EnemyBulletInfo.height
    const rotation = EnemyBulletInfo.rotation
    const dir = EnemyBulletInfo.dir
    enemyPlaneBullets.push({x, y, id, width, height, rotation, dir})
  }
  return {
    enemyPlaneBullets,
    createEnemyPlaneBullet
  }
}

// 开打
const useFighting = ({
  selfPlane,
  selfBullets,
  enemyPlanes,
  enemyPlaneBullets,
  gameOverCallback
}) => {
  const handleTicker = () => {
    moveBullets(selfBullets)
    moveBullets(enemyPlaneBullets)
    moveEnemyPlane(enemyPlanes)
    // 先遍历自己所有的子弹
    selfBullets.forEach((bullet, selfIndex) => {
      // 检测我方子弹是否碰到了敌机
      enemyPlanes.forEach((enemyPlane, enemyPlaneIndex) => {
        const isIntersect = hitTestRectangle(bullet, enemyPlane)
        if (isIntersect) {
          selfBullets.splice(selfIndex, 1)
          enemyPlane.life--
          if (enemyPlane.life <= 0) {
            enemyPlanes.splice(enemyPlaneIndex, 1)
          }
        }
      })

      // 检测是否碰到了敌方子弹
      enemyPlaneBullets.forEach((enemyBullet, enemyBulletIndex) => {
        const isIntersect = hitTestRectangle(bullet, enemyBullet)
        if (isIntersect) {
          selfBullets.splice(selfIndex, 1)
          enemyPlaneBullets.splice(enemyBulletIndex, 1)
        }
      })
    })

    const hitSelfHandle = (enemyObject) => {
      const isIntersect = hitTestRectangle(selfPlane, enemyObject)
      if (isIntersect) {
        gameOverCallback && gameOverCallback()
      }
    }

    // 遍历敌军子弹
    enemyPlaneBullets.forEach(enemyBullet => {
      hitSelfHandle(enemyBullet)
    })

    // 遍历敌军
    enemyPlanes.forEach(enemyPlane => {
      hitSelfHandle(enemyPlane)
    })
  }

  onMounted(() => {
    game.ticker.add(handleTicker)
  })

  onUnmounted(() => {
    game.ticker.remove(handleTicker)
  })
}

export default defineComponent({
  props: ['onNextPage'],
  setup(props) {
    const selfPlane = useSelfPlane({
      x: stage.width / 2 - 60,
      y: stage.height,
      speed: 7
    })

    const {
      selfBullets,
      createSelfBullet,
      destroySelfBullet
    } = useSelfBullet()

    const enemyPlanes = useEnemyPlanes()

    const { enemyPlaneBullets, createEnemyPlaneBullet } = useEnemyPlaneBullets()
    useFighting({
      selfPlane,
      selfBullets,
      enemyPlanes,
      enemyPlaneBullets,
      gameOverCallback() {
        props.onNextPage(PAGE.end)
      }
    })
    
    return {
      selfPlane,
      enemyPlanes,
      selfBullets,
      createSelfBullet,
      destroySelfBullet,
      enemyPlaneBullets,
      createEnemyPlaneBullet
    }
  },
  
  render(ctx) {
    const createBullet = (info, index) => {
      return h(Bullet, {
        key: 'Bullet' + info.id,
        x: info.x,
        y: info.y,
        id: info.id,
        width: info.width,
        height: info.height,
        rotation: info.rotation,
        dir: info.dir,
        onDestroy({ id }) {
          ctx.destroySelfBullet(id)
        }
      })
    }

    const createEnemyPlane = (info, index) => {
      return h(EnemyPlane, {
        key: 'EnemyPlane' + index,
        x: info.x,
        y: info.y,
        height: info.height,
        width: info.width,
        onAttack({ x, y }) {
          ctx.createEnemyPlaneBullet(x, y)
        }
      })
    }

    const createSelfPlane = () => {
      return h(Plane, {
        x: ctx.selfPlane.x,
        y: ctx.selfPlane.y,
        speed: ctx.selfPlane.speed,
        onAttack({ x, y }) {
          ctx.createSelfBullet(x, y);
        },
      })
    }
    return h('Container', [
      h(Map),
      createSelfPlane(),
      ...ctx.selfBullets.map(createBullet),
      ...ctx.enemyPlaneBullets.map(createBullet),
      ...ctx.enemyPlanes.map(createEnemyPlane)
    ])
  }
})