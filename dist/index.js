'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/* eslint-disable react-hooks/exhaustive-deps */

/**
 * UseWindowSize
 * Custom React Hook that returns window wxh.
 * @return {object} width, height
 */

function useEventListener(eventName, handler) {
  var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
  var savedHandler = React.useRef();
  React.useEffect(function () {
    savedHandler.current = handler;
  }, [handler]);
  React.useEffect(function () {
    var isSupported = element && element.addEventListener;
    if (!isSupported) return;

    var eventListener = function eventListener(event) {
      return savedHandler.current(event);
    };

    element.addEventListener(eventName, eventListener);
    return function () {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

/* eslint-disable react-hooks/exhaustive-deps */

var useMQ = function useMQ(query) {
  var mediaMatch = window.matchMedia(query);

  var _useState = React.useState(mediaMatch.matches),
      _useState2 = _slicedToArray(_useState, 2),
      matches = _useState2[0],
      setMatches = _useState2[1];

  React.useEffect(function () {
    var handler = function handler(e) {
      return setMatches(e.matches);
    };

    mediaMatch.addListener(handler);
    return function () {
      return mediaMatch.removeListener(handler);
    };
  });
  return matches;
};

if (typeof window === 'undefined') {
  global.window = {};
}
/**
 * Animated Cursor
 * Replaces the native cursor with a custom animated cursor.
 *
 * @author Stephen Scaff
 */


function AnimatedCursor(_ref) {
  var _ref$color = _ref.color,
      color = _ref$color === void 0 ? '220, 90, 90' : _ref$color,
      _ref$outerAlpha = _ref.outerAlpha,
      outerAlpha = _ref$outerAlpha === void 0 ? 0.3 : _ref$outerAlpha,
      _ref$innerSize = _ref.innerSize,
      innerSize = _ref$innerSize === void 0 ? 8 : _ref$innerSize,
      _ref$outerSize = _ref.outerSize,
      outerSize = _ref$outerSize === void 0 ? 8 : _ref$outerSize,
      _ref$outerScale = _ref.outerScale,
      outerScale = _ref$outerScale === void 0 ? 5 : _ref$outerScale,
      _ref$innerScale = _ref.innerScale,
      innerScale = _ref$innerScale === void 0 ? 0.7 : _ref$innerScale;
  var cursorOuterRef = React.useRef();
  var cursorInnerRef = React.useRef();
  var requestRef = React.useRef();
  var previousTimeRef = React.useRef();

  var _useState = React.useState({
    x: 0,
    y: 0
  }),
      _useState2 = _slicedToArray(_useState, 2),
      coords = _useState2[0],
      setCoords = _useState2[1];

  var _useState3 = React.useState(true),
      _useState4 = _slicedToArray(_useState3, 2),
      isVisible = _useState4[0],
      setIsVisible = _useState4[1];

  var _useState5 = React.useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isActive = _useState6[0],
      setIsActive = _useState6[1];

  var _useState7 = React.useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isActiveClickable = _useState8[0],
      setIsActiveClickable = _useState8[1];

  var endX = React.useRef(0);
  var endY = React.useRef(0);
  var isSmall = useMQ('(min-width: 400px)');
  var onMouseMove = React.useCallback(function (_ref2) {
    var clientX = _ref2.clientX,
        clientY = _ref2.clientY;
    setCoords({
      x: clientX,
      y: clientY
    });
    cursorInnerRef.current.style.top = clientY + 'px';
    cursorInnerRef.current.style.left = clientX + 'px';
    endX.current = clientX;
    endY.current = clientY;
  }, []);
  var animateOuterCursor = React.useCallback(function (time) {
    if (previousTimeRef.current !== undefined && cursorOuterRef !== null) {
      coords.x += (endX.current - coords.x) / 8;
      coords.y += (endY.current - coords.y) / 8;
      cursorOuterRef.current.style.top = coords.y + 'px';
      cursorOuterRef.current.style.left = coords.x + 'px';
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateOuterCursor);
  }, [requestRef] // eslint-disable-line
  );
  React.useEffect(function () {
    requestRef.current = requestAnimationFrame(animateOuterCursor);
  }, [animateOuterCursor]);
  var onMouseDown = React.useCallback(function () {
    setIsActive(true);
  }, []);
  var onMouseUp = React.useCallback(function () {
    setIsActive(false);
  }, []);
  var onMouseEnter = React.useCallback(function () {
    setIsVisible(true);
  }, []);
  var onMouseLeave = React.useCallback(function () {
    setIsVisible(false);
  }, []);
  useEventListener('mousemove', onMouseMove, document);
  useEventListener('mousedown', onMouseDown, document);
  useEventListener('mouseup', onMouseUp, document);
  useEventListener('mouseenter', onMouseEnter, document);
  useEventListener('mouseleave', onMouseLeave, document);
  React.useEffect(function () {
    if (isActive) {
      cursorInnerRef.current.style.transform = "scale(".concat(innerScale, ")");
      cursorOuterRef.current.style.transform = "scale(".concat(outerScale, ")");
    } else {
      cursorInnerRef.current.style.transform = 'scale(1)';
      cursorOuterRef.current.style.transform = 'scale(1)';
    }
  }, [innerScale, outerScale, isActive]);
  React.useEffect(function () {
    if (isActiveClickable) {
      cursorInnerRef.current.style.transform = "scale(".concat(innerScale * 1.3, ")");
      cursorOuterRef.current.style.transform = "scale(".concat(outerScale * 1.4, ")");
    }
  }, [innerScale, outerScale, isActiveClickable]);
  React.useEffect(function () {
    if (isVisible) {
      cursorInnerRef.current.style.opacity = 1;
      cursorOuterRef.current.style.opacity = 1;
    } else {
      cursorInnerRef.current.style.opacity = 0;
      cursorOuterRef.current.style.opacity = 0;
    }
  }, [isVisible]);
  React.useEffect(function () {
    var clickables = document.querySelectorAll('a, input[type="submit"], input[type="image"], label[for], select, button, .link');
    clickables.forEach(function (el) {
      el.style.cursor = 'none';
      el.addEventListener('mouseover', function () {
        setIsActive(true);
      });
      el.addEventListener('click', function () {
        setIsActive(true);
        setIsActiveClickable(false);
      });
      el.addEventListener('mousedown', function () {
        setIsActiveClickable(true);
      });
      el.addEventListener('mouseup', function () {
        setIsActive(true);
      });
      el.addEventListener('mouseout', function () {
        setIsActive(false);
        setIsActiveClickable(false);
      });
    });
    return function () {
      clickables.forEach(function (el) {
        el.removeEventListener('mouseover', function () {
          setIsActive(true);
        });
        el.removeEventListener('click', function () {
          setIsActive(true);
          setIsActiveClickable(false);
        });
        el.removeEventListener('mousedown', function () {
          setIsActiveClickable(true);
        });
        el.removeEventListener('mouseup', function () {
          setIsActive(true);
        });
        el.removeEventListener('mouseout', function () {
          setIsActive(false);
          setIsActiveClickable(false);
        });
      });
    };
  }, [isActive]);
  var styles = {
    cursorInner: {
      zIndex: 999,
      display: isSmall ? 'block' : 'none',
      position: 'fixed',
      borderRadius: '50%',
      width: innerSize,
      height: innerSize,
      pointerEvents: 'none',
      backgroundColor: "rgba(".concat(color, ", 1)"),
      transition: 'opacity 0.15s ease-in-out, transform 0.25s ease-in-out'
    },
    cursorOuter: {
      zIndex: 999,
      display: isSmall ? 'block' : 'none',
      position: 'fixed',
      borderRadius: '50%',
      pointerEvents: 'none',
      width: outerSize,
      height: outerSize,
      backgroundColor: "rgba(".concat(color, ", ").concat(outerAlpha, ")"),
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out'
    }
  }; // Hide / Show global cursor

  document.body.style.cursor = isSmall ? 'none' : '';
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    ref: cursorOuterRef,
    style: styles.cursorOuter
  }), /*#__PURE__*/React__default.createElement("div", {
    ref: cursorInnerRef,
    style: styles.cursorInner
  }));
}

module.exports = AnimatedCursor;
