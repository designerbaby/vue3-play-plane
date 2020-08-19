import { Application } from 'pixi.js'
import { stage } from './config/stage'

export const game = new Application({
  width: stage.width,
  height: stage.height
})

game.renderer.backgroundColor = 0x061639
document.body.append(game.view)
document.body.style.background = '#343434'

export function getRootContainer () {
  return game.stage
}