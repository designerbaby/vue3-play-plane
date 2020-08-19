import { Graphics, Text, Container, Sprite, Texture } from 'pixi.js'

export const nodeOps = {
  insert(el, parent) {
    parent.addChild(el);
  },
  createElement(type) {
    let element;
    switch (type) {
      case "Container":
        element = new Container();
        break;
      case "Sprite":
        element = new Sprite();
        break;
      case "rect":
        element = new Graphics()
        element.beginFill(0xff00000)
        element.drawRect(0, 0, 200, 20)
        element.endFill()
        break
      case "circle":
        element = new Graphics()
        element.beginFill(0xffff00)
        element.drawCircle(0, 0, 20, 20)
        element.endFill()
        break
    }
    return element;
  },
  patchProp(el, key, prevValue, nextValue) {
    // pixi
    if (key === "on" || key === "texture" || key === "style") {
      switch (key) {
        case "on":
          Object.keys(nextValue).forEach((eventName) => {
            const callback = nextValue[eventName];
            el.on(eventName, callback);
          });
          break;
        case "texture":
          let texture = Texture.from(nextValue);
          el.texture = texture;
          break;
        case "style":
          let style = new PIXI.TextStyle(nextValue);
          el.style = style;
          break;
        case "anchor":
          console.log(nextValue)
          el.anchor.set(...nextValue);
          break;
      }
    } else {
      el[key] = nextValue;
    }
  },
  createText (text) {
    return new Text(text)
  },
  srcElementText(node, text) {
    // 创建文本
    const cText = new Text(text)
    node.addChild(cText)
  },
  createComment(el) {
    console.log(el)
  },
  parentNode() {},
  nextSibling() {}
}