import App from './src/App'
import { getRootContainer } from './src/Game'
import { createApp } from './src/runtime-canvas'

createApp(App).mount(getRootContainer())