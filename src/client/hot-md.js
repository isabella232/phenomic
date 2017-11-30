// eslint-disable-next-line import/no-namespace
import * as pageActions from "../redux/modules/pages"

export default (mdContext, collection, store) => (file) => {
  const item = collection.find(
    (item) => item.__filename === file.slice("./".length)
  )
  const dataUrl = mdContext(file)
  if (dataUrl !== item.__dataUrl) {
    // item.__dataUrl = dataUrl
    // hot reload json
    if(item.__filename === '404.md') {
      item.__dataUrl = `${item.__url}404.html${item.__dataUrl}`
    } else {
      item.__dataUrl = `${item.__url}index.html${item.__dataUrl}`
    }
    //"__dataUrl": "/404.html.4a7fb9cfff7ab88d50bc495ed0cef3f1.json"
    console.log(file, " hot update")
    store.dispatch(pageActions.refresh(item.__url, item.__dataUrl))
  }
}
