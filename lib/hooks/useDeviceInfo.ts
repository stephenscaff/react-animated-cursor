import { useEffect, useState } from 'react'

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

const useDeviceInfo = (): DeviceInfo => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    info: '',
    Android: () => null,
    BlackBerry: () => null,
    IEMobile: () => null,
    iOS: () => null,
    iPad: () => null,
    OperaMini: () => null,
    any: () => false
  })

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent
      setDeviceInfo((prevDeviceInfo) => ({
        ...prevDeviceInfo,
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
          ),
        OperaMini: () => ua.match(/Opera Mini/i),
        any: () =>
          !!(
            prevDeviceInfo.Android()?.length ||
            prevDeviceInfo.BlackBerry()?.length ||
            prevDeviceInfo.iOS()?.length ||
            prevDeviceInfo.iPad() ||
            prevDeviceInfo.OperaMini()?.length ||
            prevDeviceInfo.IEMobile()?.length
          )
      }))
    }
  }, [])

  return deviceInfo
}

export default useDeviceInfo
