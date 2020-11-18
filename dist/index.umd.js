(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = global || self, global.AnimatedCursor = factory(global.React));
}(this, (function (React) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

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
   * useEventListener
   * Hook for handling EventListeners
   * @return {object} width, height
   */

  function useEventListener(eventName, handler) {
    var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window;
    // Create a ref that stores handler
    var savedHandler = React.useRef(); // Update ref.current value if handler changes.

    React.useEffect(function () {
      savedHandler.current = handler;
    }, [handler]);
    React.useEffect(function () {
      // Make sure element supports addEventListener
      var isSupported = element && element.addEventListener;
      if (!isSupported) return; // Create event listener that calls handler function stored in ref

      var eventListener = function eventListener(event) {
        return savedHandler.current(event);
      }; // Add event listener


      element.addEventListener(eventName, eventListener); // Remove event listener on cleanup

      return function () {
        element.removeEventListener(eventName, eventListener);
      };
    }, [eventName, element] // Re-run if eventName or element changes
    );
  }

  var IsDevice = function () {
    if (typeof navigator == 'undefined') return;
    var ua = navigator.userAgent;
    return {
      info: ua,
      Android: function Android() {
        return ua.match(/Android/i);
      },
      BlackBerry: function BlackBerry() {
        return ua.match(/BlackBerry/i);
      },
      IEMobile: function IEMobile() {
        return ua.match(/IEMobile/i);
      },
      iOS: function iOS() {
        return ua.match(/iPhone|iPad|iPod/i);
      },
      OperaMini: function OperaMini() {
        return ua.match(/Opera Mini/i);
      },

      /**
       * Any Device
       */
      any: function any() {
        return IsDevice.Android() || IsDevice.BlackBerry() || IsDevice.iOS() || IsDevice.OperaMini() || IsDevice.IEMobile();
      }
    };
  }(); // Export

  /**
   * Cursor Core
   * Replaces the native cursor with a custom animated cursor, consisting
   * of an inner and outer dot that scale inversely based on hover or click.
   *
   * @author Stephen Scaff (github.com/stephenscaff)
   *
   * @param {string} color - rgb color value
   * @param {number} outerAlpha - level of alpha transparency for color
   * @param {number} innerSize - inner cursor size in px
   * @param {number} innerScale - inner cursor scale amount
   * @param {number} outerSize - outer cursor size in px
   * @param {number} outerScale - outer cursor scale amount
   *
   */

  function CursorCore(_ref) {
    var _ref$color = _ref.color,
        color = _ref$color === void 0 ? '220, 90, 90' : _ref$color,
        _ref$outerAlpha = _ref.outerAlpha,
        outerAlpha = _ref$outerAlpha === void 0 ? 0.3 : _ref$outerAlpha,
        _ref$innerSize = _ref.innerSize,
        innerSize = _ref$innerSize === void 0 ? 8 : _ref$innerSize,
        _ref$innerScale = _ref.innerScale,
        innerScale = _ref$innerScale === void 0 ? 0.7 : _ref$innerScale,
        _ref$outerSize = _ref.outerSize,
        outerSize = _ref$outerSize === void 0 ? 8 : _ref$outerSize,
        _ref$outerScale = _ref.outerScale,
        outerScale = _ref$outerScale === void 0 ? 5 : _ref$outerScale;
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

    var _useState3 = React.useState(false),
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
    var endY = React.useRef(0); // Primary Mouse Move event

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
    }, []); // Outer Cursor Animation Delay

    var animateOuterCursor = React.useCallback(function (time) {
      if (previousTimeRef.current !== undefined) {
        coords.x += (endX.current - coords.x) / 8;
        coords.y += (endY.current - coords.y) / 8;
        cursorOuterRef.current.style.top = coords.y + 'px';
        cursorOuterRef.current.style.left = coords.x + 'px';
      }

      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateOuterCursor);
    }, [requestRef] // eslint-disable-line
    ); // RAF for animateOuterCursor

    React.useEffect(function () {
      requestRef.current = requestAnimationFrame(animateOuterCursor);
      return function () {
        cancelAnimationFrame(requestRef.current);
      };
    }, [animateOuterCursor]); // Mouse Events State updates

    var onMouseDown = React.useCallback(function () {
      setIsActive(true);
    }, []);
    var onMouseUp = React.useCallback(function () {
      setIsActive(false);
    }, []);
    var onMouseEnterViewport = React.useCallback(function () {
      setIsVisible(true);
    }, []);
    var onMouseLeaveViewport = React.useCallback(function () {
      setIsVisible(false);
    }, []);
    useEventListener('mousemove', onMouseMove);
    useEventListener('mousedown', onMouseDown);
    useEventListener('mouseup', onMouseUp);
    useEventListener('mouseover', onMouseEnterViewport);
    useEventListener('mouseout', onMouseLeaveViewport); // Cursors Hover/Active State

    React.useEffect(function () {
      if (isActive) {
        cursorInnerRef.current.style.transform = "translateZ(0) scale(".concat(innerScale, ")");
        cursorOuterRef.current.style.transform = "translateZ(0) scale(".concat(outerScale, ")");
      } else {
        cursorInnerRef.current.style.transform = 'translateZ(0) scale(1)';
        cursorOuterRef.current.style.transform = 'translateZ(0) scale(1)';
      }
    }, [innerScale, outerScale, isActive]); // Cursors Click States

    React.useEffect(function () {
      if (isActiveClickable) {
        cursorInnerRef.current.style.transform = "translateZ(0) scale(".concat(innerScale * 1.2, ")");
        cursorOuterRef.current.style.transform = "translateZ(0) scale(".concat(outerScale * 1.4, ")");
      }
    }, [innerScale, outerScale, isActiveClickable]); // Cursor Visibility State

    React.useEffect(function () {
      if (isVisible) {
        cursorInnerRef.current.style.opacity = 1;
        cursorOuterRef.current.style.opacity = 1;
      } else {
        cursorInnerRef.current.style.opacity = 0;
        cursorOuterRef.current.style.opacity = 0;
      }
    }, [isVisible]); // Target all possible clickables

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
    }, [isActive]); // Cursor Styles

    var styles = {
      cursorInner: {
        zIndex: 999,
        display: 'block',
        position: 'fixed',
        borderRadius: '50%',
        width: innerSize,
        height: innerSize,
        pointerEvents: 'none',
        backgroundColor: "rgba(".concat(color, ", 1)"),
        transition: 'opacity 0.15s ease-in-out, transform 0.25s ease-in-out',
        backfaceVisibility: 'hidden',
        willChange: 'transform'
      },
      cursorOuter: {
        zIndex: 999,
        display: 'block',
        position: 'fixed',
        borderRadius: '50%',
        pointerEvents: 'none',
        width: outerSize,
        height: outerSize,
        backgroundColor: "rgba(".concat(color, ", ").concat(outerAlpha, ")"),
        transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
        backfaceVisibility: 'hidden',
        willChange: 'transform'
      }
    }; // Hide / Show global cursor

    document.body.style.cursor = 'none';
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
      ref: cursorOuterRef,
      style: styles.cursorOuter
    }), /*#__PURE__*/React__default.createElement("div", {
      ref: cursorInnerRef,
      style: styles.cursorInner
    }));
  }
  /**
   * AnimatedCursor
   * Calls and passes props to CursorCore if not a touch/mobile device.
   */


  function AnimatedCursor(_ref3) {
    var _ref3$color = _ref3.color,
        color = _ref3$color === void 0 ? '220, 90, 90' : _ref3$color,
        _ref3$outerAlpha = _ref3.outerAlpha,
        outerAlpha = _ref3$outerAlpha === void 0 ? 0.3 : _ref3$outerAlpha,
        _ref3$innerSize = _ref3.innerSize,
        innerSize = _ref3$innerSize === void 0 ? 8 : _ref3$innerSize,
        _ref3$outerSize = _ref3.outerSize,
        outerSize = _ref3$outerSize === void 0 ? 8 : _ref3$outerSize,
        _ref3$outerScale = _ref3.outerScale,
        outerScale = _ref3$outerScale === void 0 ? 5 : _ref3$outerScale,
        _ref3$innerScale = _ref3.innerScale,
        innerScale = _ref3$innerScale === void 0 ? 0.7 : _ref3$innerScale;

    if (typeof navigator !== 'undefined' && IsDevice.any()) {
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, null);
    }

    return /*#__PURE__*/React__default.createElement(CursorCore, {
      color: color,
      outerAlpha: outerAlpha,
      innerSize: innerSize,
      innerScale: innerScale,
      outerSize: outerSize,
      outerScale: outerScale
    });
  }

  return AnimatedCursor;

})));
