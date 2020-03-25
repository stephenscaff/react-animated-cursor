(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = global || self, global.AnimatedCursor = factory(global.React));
}(this, (function (React) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

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

  /**
   * WhoDis.js
   * A simple little sniffer. Mostly Using UA (Yikes! 😜)
   * for conditional checks.
   * ES6 version
   *
   * @return {boolean}
   * @author stephen scaff
   */
  var WhoDis = function () {
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
      Chrome: function Chrome() {
        return ua.match(/Chrome/i);
      },
      Edge: function Edge() {
        return ua.match(/Edge/i);
      },
      Firefox: function Firefox() {
        return ua.match(/Firefox/i);
      },
      IE: function IE() {
        return ua.match(/Trident/i);
      },
      IEMobile: function IEMobile() {
        return ua.match(/IEMobile/i);
      },
      IE10: function IE10() {
        return ua.match(/MSIE/i);
      },
      iOS: function iOS() {
        return ua.match(/iPhone|iPad|iPod/i);
      },
      Opera: function Opera() {
        return ua.match(/Opera Mini/i);
      },
      OperaMini: function OperaMini() {
        return ua.match(/Opera Mini/i);
      },
      Safari: function Safari() {
        return !!ua.match(/Version\/[\d\.]+.*Safari/);
      },
      Touch: function Touch() {
        return 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch;
      },

      /**
       * Any Microsoft
       */
      anyMS: function anyMS() {
        return WhoDis.IE10() || WhoDis.IE() || WhoDis.Edge();
      },

      /**
       * Any Mobile
       */
      anyMobile: function anyMobile() {
        return WhoDis.Android() || WhoDis.BlackBerry() || WhoDis.iOS() || WhoDis.OperaMini() || WhoDis.IEMobile();
      }
    };
  }(); // Export

  /**
   * Animated Cursor
   * Replaces the native cursor with a custom animated cursor.
   *
   * @author Stephen Scaff
   */

  function AnimatedCursor(_ref) {
    var _ref$color = _ref.color,
        color = _ref$color === void 0 ? '220, 90, 90' : _ref$color,
        _ref$outlineAlpha = _ref.outlineAlpha,
        outlineAlpha = _ref$outlineAlpha === void 0 ? 0.3 : _ref$outlineAlpha,
        _ref$dotSize = _ref.dotSize,
        dotSize = _ref$dotSize === void 0 ? 8 : _ref$dotSize,
        _ref$outlineSize = _ref.outlineSize,
        outlineSize = _ref$outlineSize === void 0 ? 8 : _ref$outlineSize,
        _ref$outlineScale = _ref.outlineScale,
        outlineScale = _ref$outlineScale === void 0 ? 5 : _ref$outlineScale,
        _ref$dotScale = _ref.dotScale,
        dotScale = _ref$dotScale === void 0 ? 0.7 : _ref$dotScale;
    // Bail if Mobile
    if (typeof navigator !== 'undefined' && WhoDis.anyMobile()) return /*#__PURE__*/React__default.createElement(React__default.Fragment, null);
    var cursorOutline = React.useRef();
    var cursorDot = React.useRef();
    var requestRef = React.useRef();
    var previousTimeRef = React.useRef();

    var _useState = React.useState(window.innerWidth),
        _useState2 = _slicedToArray(_useState, 2),
        width = _useState2[0],
        setWidth = _useState2[1];

    var _useState3 = React.useState(window.innerHeight),
        _useState4 = _slicedToArray(_useState3, 2),
        height = _useState4[0],
        setHeight = _useState4[1];

    var _useState5 = React.useState({
      x: 0,
      y: 0
    }),
        _useState6 = _slicedToArray(_useState5, 2),
        mousePosition = _useState6[0],
        setMousePosition = _useState6[1];

    var cursorVisible = React.useState(false);
    var cursorEnlarged = React.useState(false);
    var styles = {
      cursors: {
        zIndex: 999,
        pointerEvents: 'none',
        position: 'absolute',
        top: '50%',
        left: '50%',
        borderRadius: '50%',
        opacity: 0,
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out'
      },
      cursorDot: {
        width: dotSize,
        height: dotSize,
        backgroundColor: "rgba(".concat(color, ", 1)")
      },
      cursorOutline: {
        width: outlineSize,
        height: outlineSize,
        backgroundColor: "rgba(".concat(color, ", ").concat(outlineAlpha, ")")
      }
    }; // Hide default cursor

    document.body.style.cursor = "none"; // Mouse Events

    var onMouseMove = function onMouseMove(event) {
      var x = event.pageX,
          y = event.pageY;
      setMousePosition({
        x: x,
        y: y
      });
      positionDot(event);
    };

    var onMouseEnter = function onMouseEnter() {
      cursorVisible.current = true;
      toggleCursorVisibility();
    };

    var onMouseLeave = function onMouseLeave() {
      cursorVisible.current = false;
      toggleCursorVisibility();
    };

    var onMouseDown = function onMouseDown() {
      cursorEnlarged.current = true;
      toggleCursorSize();
    };

    var onMouseUp = function onMouseUp() {
      cursorEnlarged.current = false;
      toggleCursorSize();
    }; // Set window hxw


    var onResize = function onResize(event) {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    /**
     * Hooks
     */


    React.useEffect(function () {
      // Bail if mobile
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
      window.addEventListener("resize", onResize);
      requestRef.current = requestAnimationFrame(animateDotOutline);
      handleLinkEvents();
      return function () {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseenter", onMouseEnter);
        document.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(requestRef.current);
      };
    }, []);
    var x = mousePosition.x,
        y = mousePosition.y;
    var winDimensions = {
      width: width,
      height: height
    };
    var endX = winDimensions.width / 2;
    var endY = winDimensions.height / 2;
    /**
     * Position Dot (cursor)
     * @param {event}
     */

    function positionDot(e) {
      cursorVisible.current = true;
      toggleCursorVisibility(); // Position the dot

      endX = e.pageX;
      endY = e.pageY;
      cursorDot.current.style.top = endY + "px";
      cursorDot.current.style.left = endX + "px";
    }
    /**
     * Toggle Cursor Visiblity
     */


    function toggleCursorVisibility() {
      if (cursorVisible.current) {
        cursorDot.current.style.opacity = 1;
        cursorOutline.current.style.opacity = 1;
      } else {
        cursorDot.current.style.opacity = 0;
        cursorOutline.current.style.opacity = 0;
      }
    }
    /**
     * Toggle Cursors Size/Scale
     */


    function toggleCursorSize() {
      if (cursorEnlarged.current) {
        cursorDot.current.style.transform = "translate(-50%, -50%) scale(".concat(dotScale, ")");
        cursorOutline.current.style.transform = "translate(-50%, -50%) scale(".concat(outlineScale, ")");
      } else {
        cursorDot.current.style.transform = "translate(-50%, -50%) scale(1)";
        cursorOutline.current.style.transform = "translate(-50%, -50%) scale(1)";
      }
    }
    /**
     * Handle Links Events
     * Applies mouseover/out hooks on all links
     * to trigger cursor animation
     */


    function handleLinkEvents() {
      document.querySelectorAll("a").forEach(function (el) {
        el.addEventListener("mouseover", function () {
          cursorEnlarged.current = true;
          toggleCursorSize();
        });
        el.addEventListener("mouseout", function () {
          cursorEnlarged.current = false;
          toggleCursorSize();
        });
      });
    }
    /**
     * Animate Dot Outline
     * Aniamtes cursor outline with trailing effect.
     * @param {number} time
     */


    var animateDotOutline = function animateDotOutline(time) {
      if (previousTimeRef.current !== undefined) {
        x += (endX - x) / 8;
        y += (endY - y) / 8;
        cursorOutline.current.style.top = y + "px";
        cursorOutline.current.style.left = x + "px";
      }

      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateDotOutline);
    };

    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
      ref: cursorOutline,
      id: "cursor-outline",
      style: _objectSpread2({}, styles.cursors, {}, styles.cursorOutline)
    }), /*#__PURE__*/React__default.createElement("div", {
      ref: cursorDot,
      id: "cursor-inner",
      style: _objectSpread2({}, styles.cursors, {}, styles.cursorDot)
    }));
  }

  return AnimatedCursor;

})));
