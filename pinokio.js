module.exports = {
  version: "3.0",
  title: "MagicAnimate Mini",
  icon: "icon.gif",
  description: "[NVIDIA GPU Only] An optimized version of MagicAnimate https://github.com/sdbds/magic-animate-for-windows",
  menu: async (kernel, info) => {
    let installed = await kernel.exists(__dirname, "env")
    if (installed) {
      let running = await kernel.running(__dirname, "start.json")
      let updating = await kernel.running(__dirname, "update.js")
      let installing = await kernel.running(__dirname, "install.js")
      if (running) {
        let local = info.local("start.json")
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open UI",
            href: local.url,
          }, {
            icon: "fa-solid fa-power-off",
            text: "Terminal",
            href: "start.json",
            params: { fullscreen: true, run: true, mode: "single" }
          }]
        } else {
          return [{
            default: true,
            icon: "fa-solid fa-power-off",
            text: "Terminal",
            href: "start.json",
            params: { fullscreen: true, run: true, mode: "single" }
          }]
        }
      } else if (installing) {
        return [{
          default: true,
          icon: "fa-solid fa-plug",
          text: "Installing",
          href: "install.js",
          params: { run: true, fullscreen: true }
        }]
      } else if (updating) {
        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Updating",
          href: "update.js",
          params: { run: true, fullscreen: true }
        }]
      } else {
        return [{
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Launch",
          href: "start.json",
          params: { fullscreen: true, run: true, mode: "single" }
        }, {
          icon: "fa-solid fa-download",
          text: "Use Openpose Model",
          href: "openpose.json",
          params: { fullscreen: true, run: true }
        }, {
          icon: "fa-solid fa-download",
          text: "Use Densepose Model",
          href: "densepose.json",
          params: { fullscreen: true, run: true }
        }, {
          icon: "fa-solid fa-terminal",
          text: "Update",
          href: "update.js",
        }]
      }
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
        params: { run: true, fullscreen: true }
      }]
    }
  }
}
