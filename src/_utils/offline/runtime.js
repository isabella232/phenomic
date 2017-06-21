// @flow

// Install ServiceWorker and AppCache in the end since it's not most important
// operation and if main code fails, we do not want it installed
import offlinePluginRuntime from "offline-plugin/runtime"

function findUpTag(el, tag) {
  while (el.parentNode) {
    el = el.parentNode;
    if (el.tagName === tag)
        return el;
  }
  return null;
}

// console.log("SW Event:", "Installing")
offlinePluginRuntime.install({
  // you can specify here some code to respond to events
  // see here for more informations
  // https://www.npmjs.com/package/offline-plugin#runtime
  onInstalled: () => {
    console.log("SW Event:", "onInstalled")
  },
  onUpdating: () => {
    console.log("SW Event:", "onUpdating")
  },
  onUpdateReady: () => {
    console.log("SW Event:", "onUpdateReady")
    offlinePluginRuntime.applyUpdate()
  },
  onUpdated: () => {
    console.log("SW Event:", "onUpdated")
    if (process.env.PHENOMIC_DISABLE_SW_RELOAD) {
      console.log("SW updated contents. Hard reload next link click")
      const anchors = document.getElementsByTagName("a")
      for (let i = 0; i < anchors.length; i++) {
        anchors[i].onclick = function(e) {
          let link
          if (e.target.tagName === 'A') {
            link = e.target
          } else {
            link = findUpTag(e.target, 'A')
          }

          if (link && link.href) {
            const baseTargetURL = link.href.split(/[?#]/)[0]
            const baseURL = window.location.href.split(/[?#]/)[0]
            if (baseURL === baseTargetURL) {
              console.log('current url stay on page')
              // return false
            }
          }
          // else
          e.preventDefault()
          // stop react router and hard reload the clicked href to new content
          const url = link.href || "/"
          window.location.href = url
          return false
        }
      }
    }
    else {
      window.location.reload()
    }
  },
  onUninstalled: () => {
    console.log("SW Event:", "onUninstalled")
  },
})
// See webpack configuration file for more offline options
