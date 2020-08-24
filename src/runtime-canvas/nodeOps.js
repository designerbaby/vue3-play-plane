import { Graphics, Text, Container, Sprite, Texture } from 'pixi.js'

export const nodeOps = {
  insert(el, parent) {
    parent.addChild(el);
  },
  remove(child) {
    const parent = child.parent;
    if (parent) {
      parent.removeChild(child);
    }
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
      case "Text":
        element = new Text()
        element.x = 0;
        element.y = 0;
        break
      case "Rectangle":
        element = new Graphics();
        element.lineStyle(4, 0xff3300, 1);
        element.beginFill(0x66ccff);
        element.drawRect(0, 0, 64, 64);
        element.endFill();
        element.x = 0;
        element.y = 0;
        element.interactive = true;
        element.buttonMode = true;
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
    doc.createTextNode(text)
  },
  setText(node, text) {
    node.nodeValue = text;
  },
  srcElementText(node, text) {
    // 创建文本
    el.textContent = text;
  },
  createComment(el) {
    console.log(el)
  },
  parentNode: (node) => node.parentNode,

  nextSibling: (node) => node.nextSibling,

  querySelector: (selector) => doc.querySelector(selector),

  setScopeId(el, id) {
    el.setAttribute(id, "");
  },

  cloneNode(el) {
    return el.cloneNode(true);
  }
}