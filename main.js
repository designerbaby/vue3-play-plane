import App from './src/App.js'
import { getRootContainer } from './src/Game'
import { createApp } from './src/runtime-canvas'

createApp(App).mount(getRootContainer())