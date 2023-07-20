export default function (arr, callback) {
  if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function')
  }
  var list = Object(arr)
  // Makes sures is always has an positive integer as length.
  var length = list.length >>> 0
  var thisArg = arguments[1]
  for (var i = 0; i < length; i++) {
    var element = list[i]
    if (callback.call(thisArg, element, i, list)) {
      return element
    }
  }
}
