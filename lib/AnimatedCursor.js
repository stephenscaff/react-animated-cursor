import React, { useState, useEffect, useRef } from "react";
import WhoDis from './WhoDis.js'

/**
 * Animated Cursor
 * Replaces the native cursor with a custom animated cursor.
 *
 * @author Stephen Scaff
 */
function AnimatedCursor({
  color = '220, 90, 90',
  outlineAlpha = 0.3,
  dotSize = 8,
  outlineSize = 8,
  outlineScale = 5,
  dotScale = 0.7
}) {
  console.log(WhoDis.logger)
  if (WhoDis.iOS) return <></>;

  const cursorOutline = useRef();
  const cursorDot = useRef();
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  let   [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  let   cursorVisible = useState(false);
  let   cursorEnlarged = useState(false);

  const styles = {
    cursors: {
      zIndex: 999,
      pointerEvents: 'none',
      position: 'absolute',
      top: '50%',
      left: '50%',
      borderRadius: '50%',
      opacity: 0,
      transform: 'translate(-50%, -50%)',
      transition: 'opacity 0.15s ease-in-out, transform 0.15s ease-in-out',
    },
    cursorDot: {
      width: dotSize,
      height: dotSize,
      backgroundColor: `rgba(${color}, 1)`
    },
    cursorOutline: {
      width: outlineSize,
      height:outlineSize,
      backgroundColor: `rgba(${color}, ${outlineAlpha})`
    },
  }

  // Hide default cursor
  document.body.style.cursor = "none";

  // Mouse Events
  const onMouseMove = event => {
    const { pageX: x, pageY: y } = event;
    setMousePosition({ x, y });
    positionDot(event);
  };
  const onMouseEnter = () => {
    cursorVisible.current = true;
    toggleCursorVisibility();
  };
  const onMouseLeave = () => {
    cursorVisible.current = false;
    toggleCursorVisibility();
  };
  const onMouseDown = () => {
    cursorEnlarged.current = true;
    toggleCursorSize();
  };
  const onMouseUp = () => {
    cursorEnlarged.current = false;
    toggleCursorSize();
  };

  // Set window hxw
  const onResize = event => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  /**
   * Hooks
   */
  useEffect(() => {
    // Bail if mobile


    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    window.addEventListener("resize", onResize);
    requestRef.current = requestAnimationFrame(animateDotOutline);
    handleLinkEvents();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  let { x, y } = mousePosition;
  const winDimensions = { width, height };
  let endX = winDimensions.width / 2;
  let endY = winDimensions.height / 2;
  console.log(mousePosition, winDimensions)
  /**
   * Position Dot (cursor)
   * @param {event}
   */
  function positionDot(e) {
    cursorVisible.current = true;
    toggleCursorVisibility();
    // Position the dot
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
      cursorDot.current.style.transform = `translate(-50%, -50%) scale(${dotScale})`;
      cursorOutline.current.style.transform =
        `translate(-50%, -50%) scale(${outlineScale})`;
    } else {
      cursorDot.current.style.transform = "translate(-50%, -50%) scale(1)";
      cursorOutline.current.style.transform =
        "translate(-50%, -50%) scale(1)";
    }
  }

  /**
   * Handle Links Events
   * Applies mouseover/out hooks on all links
   * to trigger cursor animation
   */
  function handleLinkEvents() {
    document.querySelectorAll("a").forEach(el => {
      el.addEventListener("mouseover", () => {
        cursorEnlarged.current = true;
        toggleCursorSize();
      });
      el.addEventListener("mouseout", () => {
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
  const animateDotOutline = time => {
    if (previousTimeRef.current !== undefined) {
      x += (endX - x) / 8;
      y += (endY - y) / 8;
      cursorOutline.current.style.top = y + "px";
      cursorOutline.current.style.left = x + "px";
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateDotOutline);
  };

  return (
    <>
      <div ref={cursorOutline} id="cursor-outline" style={{...styles.cursors, ...styles.cursorOutline}}/>
      <div ref={cursorDot} id="cursor-inner" style={{...styles.cursors, ...styles.cursorDot}}/>
    </>
  );
}

export default AnimatedCursor;
