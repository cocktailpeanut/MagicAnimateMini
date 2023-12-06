module.exports = {
  title: "MagicAnimate Mini",
  icon: "icon.gif",
  description: "[NVIDIA GPU Only] An optimized version of MagicAnimate https://github.com/sdbds/magic-animate-for-windows",
  menu: async (kernel) => {
    let installed = await kernel.exists(__dirname, "env")
    if (installed) {
      let session = await kernel.require(__dirname, "session.json")
      let running = await kernel.running(__dirname, "start.json")
      if (running) {
        return [{
          icon: "fa-solid fa-spin fa-circle-notch",
          text: "Running"
        }, {
          icon: "fa-solid fa-rocket",
          text: "Open UI",
          href: (session && session.url ? session.url : "http://127.0.0.1:7860"),
          target: "_blank"
        }, {
          icon: "fa-solid fa-download",
          text: "Download Openpose Model",
          href: "openpose.json",
          params: { fullscreen: true, run: true }
        }]
      } else {
        return [{
          icon: "fa-solid fa-power-off",
          text: "Launch",
          href: "start.json",
          params: { fullscreen: true, run: true, mode: "single" }
        }, {
          icon: "fa-solid fa-download",
          text: "Download Openpose Model",
          href: "openpose.json",
          params: { fullscreen: true, run: true }
        }]
      }
    } else {
      return [{
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.json",
        params: { run: true, fullscreen: true }
      }]
    }
  }
}
