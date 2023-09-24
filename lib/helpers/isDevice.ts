type DeviceInfo = {
  info: string
  Android: () => RegExpMatchArray | null
  BlackBerry: () => RegExpMatchArray | null
  IEMobile: () => RegExpMatchArray | null
  iOS: () => RegExpMatchArray | null
  iPad: () => boolean | null
  OperaMini: () => RegExpMatchArray | null
  any: () => boolean | null
}

const IsDevice: DeviceInfo = (() => {
  if (typeof navigator === 'undefined') {
    // Provide default implementations that return null or false
    return {
      info: '',
      Android: () => null,
      BlackBerry: () => null,
      IEMobile: () => null,
      iOS: () => null,
      iPad: () => null,
      OperaMini: () => null,
      any: () => false
    }
  }

  const ua = navigator.userAgent

  return {
    info: ua,
    Android: () => ua.match(/Android/i),
    BlackBerry: () => ua.match(/BlackBerry/i),
    IEMobile: () => ua.match(/IEMobile/i),
    iOS: () => ua.match(/iPhone|iPad|iPod/i),
    iPad: () =>
      !!(
        ua.match(/Mac/) &&
        navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 2
      ), // Return boolean
    OperaMini: () => ua.match(/Opera Mini/i),
    any: () =>
      !!(
        IsDevice.Android()?.length ||
        IsDevice.BlackBerry()?.length ||
        IsDevice.iOS()?.length ||
        IsDevice.iPad() ||
        IsDevice.OperaMini()?.length ||
        IsDevice.IEMobile()?.length
      ) // Return boolean
  }
})()

export default IsDevice
