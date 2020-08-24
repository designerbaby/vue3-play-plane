import GameComponent from './src/components/GameContainer'
import { getRootContainer } from './src/Game'
import { createApp } from './src/runtime-canvas'

createApp(GameComponent).mount(getRootContainer())