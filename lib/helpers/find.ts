export default function findInArray<T>(
  arr: T[],
  callback: (element: T, index: number, array: T[]) => boolean,
  ...args
): T | undefined {
  if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function')
  }

  const list = Object(arr)
  // Makes sure it always has a positive integer as length.
  const length = list.length >>> 0
  const thisArg = args[2]

  for (let i = 0; i < length; i++) {
    const element = list[i]
    if (callback.call(thisArg, element, i, list)) {
      return element
    }
  }

  return undefined
}
