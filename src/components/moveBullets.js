import { stage } from '../config/stage'

const bulletSpeed = 7
const topLine = -100
const bottomLine = stage.height + 50

// 是否超出边界
const isOverBorder = (val) => {
  if (val > bottomLine) {
    return true
  }

  if (val < topLine) {
    return true
  }

  return false
}

export const moveBullets = (bullets) => {
  bullets.forEach((bullet, index) => {
    const dir = bullet.dir
    bullet.y += bulletSpeed * dir
    if (isOverBorder(bullet.y)) {
      bullets.splice(index, 1)
    }
  })
}