export const IsDevice = (() => {
  if (typeof navigator == 'undefined') return

  let ua = navigator.userAgent

  return {
    info: ua,

    Android() {
      return ua.match(/Android/i)
    },
    BlackBerry() {
      return ua.match(/BlackBerry/i)
    },
    IEMobile() {
      return ua.match(/IEMobile/i)
    },
    iOS() {
      return ua.match(/iPhone|iPad|iPod/i)
    },
    iPad() {
      return (
        ua.match(/Mac/) &&
        navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 2
      )
    },
    OperaMini() {
      return ua.match(/Opera Mini/i)
    },

    /**
     * Any Device
     */
    any() {
      return (
        IsDevice.Android() ||
        IsDevice.BlackBerry() ||
        IsDevice.iOS() ||
        IsDevice.iPad() ||
        IsDevice.OperaMini() ||
        IsDevice.IEMobile()
      )
    }
  }
})()
