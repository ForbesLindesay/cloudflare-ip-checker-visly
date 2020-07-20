// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
/* tslint:disable */
/* eslint-disable */
import React, { useState, useEffect, createContext, useContext } from "react";
import { createPortal } from "react-dom";
import {
  useRootProps,
  exists,
  InteractionState,
  useRect,
  useTimeout,
  renderChildren,
  combineRef,
} from "./_internal_utils";
export let Gravity;

(function (Gravity) {
  Gravity[(Gravity["Top"] = 0)] = "Top";
  Gravity[(Gravity["Bottom"] = 1)] = "Bottom";
  Gravity[(Gravity["Left"] = 2)] = "Left";
  Gravity[(Gravity["Right"] = 3)] = "Right";
})(Gravity || (Gravity = {}));

export function gravityStringToEnum(g) {
  return g === "left"
    ? Gravity.Left
    : g === "right"
    ? Gravity.Right
    : g === "top"
    ? Gravity.Top
    : g === "bottom"
    ? Gravity.Bottom
    : Gravity.Bottom;
}
const TooltipContext = createContext(null);
export function TooltipRoot(props) {
  const { className, innerRef, values, style, reactProps } = useRootProps(
    props,
    [InteractionState.None]
  );
  const gravity = gravityStringToEnum(props.gravity);
  const color = values[props.internal.layerId].arrowColor;
  const delayMs = props.delayMs;
  const renderInline = props.renderInline || false;
  const arrowScale = props.arrowScale || 1;
  return (
    <TooltipContext.Provider
      value={{
        color,
        delayMs,
        gravity,
        renderInline,
        arrowScale,
        measureRef: props.measureRef,
      }}
    >
      <Tooltip
        style={style}
        content={(arrowStyles) => (
          <div
            ref={combineRef(innerRef, props.measureRef)}
            {...reactProps}
            className={className}
            role="tooltip"
            style={{
              overflow: "visible",
            }}
          >
            <div style={arrowStyles}></div>
            {renderChildren(props.internalChildren, values)}
          </div>
        )}
      >
        {props.children}
      </Tooltip>
    </TooltipContext.Provider>
  );
}
const MARGIN = 10;
let isTooltipShowing = false;
export function Tooltip(props) {
  const { renderInline } = useContext(TooltipContext);
  const [showing, setShowing] = useState(false);
  const [bounds, ref] = useRect({
    observe: true,
  });

  const onMouseEnter = () => setShowing(true);

  const onMouseLeave = () => setShowing(false);

  if (renderInline) {
    return (
      <TooltipImpl
        targetBounds={{
          x: 0,
          y: 0,
          width: 1,
          height: 1,
        }}
      >
        {(args) => props.content(args)}
      </TooltipImpl>
    );
  }

  return (
    <div
      ref={ref}
      style={props.style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {showing
        ? createPortal(
            <TooltipImpl targetBounds={bounds}>
              {(args) => props.content(args)}
            </TooltipImpl>,
            document.body
          )
        : null}
      {props.children}
    </div>
  );
}

function TooltipImpl(props) {
  const [showing, setShowing] = useState(false);
  const [bounds, ref] = useRect({
    observe: true,
  });
  const { delayMs, gravity, color, renderInline, arrowScale } = useContext(
    TooltipContext
  );
  const animationSettings = {
    delayShow: exists(delayMs) ? delayMs : 400,
    velocityShow: 20,
    delayHide: 0,
    velocityHide: 200,
  };
  useTimeout(
    () => {
      isTooltipShowing = true;
      setShowing(true);
    },
    isTooltipShowing
      ? animationSettings.delayHide
      : animationSettings.delayShow,
    [setShowing]
  );
  useEffect(() => {
    return () => {
      isTooltipShowing = false;
    };
  }, []);

  if (!showing && !renderInline) {
    return null;
  }

  let x, y, direction, arrow;

  switch (gravity) {
    case Gravity.Top:
      x =
        props.targetBounds.x + props.targetBounds.width / 2 - bounds.width / 2;
      y = props.targetBounds.y - bounds.height - MARGIN;
      direction = "column";
      arrow = arrowBottom;
      break;

    case Gravity.Bottom:
      x =
        props.targetBounds.x + props.targetBounds.width / 2 - bounds.width / 2;
      y = props.targetBounds.y + props.targetBounds.height + MARGIN;
      direction = "column";
      arrow = arrowTop;
      break;

    case Gravity.Left:
      x = props.targetBounds.x - bounds.width - MARGIN;
      y =
        props.targetBounds.y +
        props.targetBounds.height / 2 -
        bounds.height / 2;
      direction = "row";
      arrow = arrowRight;
      break;

    case Gravity.Right:
      x = props.targetBounds.x + props.targetBounds.width + MARGIN;
      y =
        props.targetBounds.y +
        props.targetBounds.height / 2 -
        bounds.height / 2;
      direction = "row";
      arrow = arrowLeft;
      break;
  }

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: direction,
        alignItems: "center",
        justifyContent: "center",
        ...(renderInline ? {} : tooltipStyles(x, y)),
      }}
    >
      {props.children(arrow(bounds, color, arrowScale))}
    </div>
  );
}

const tooltipStyles = (x, y) => ({
  position: "absolute",
  zIndex: 100000,
  left: `${x}px`,
  top: `${y}px`,
});

const arrowTop = (_bounds, color, scale = 1) => ({
  position: "absolute",
  top: -2 * scale,
  content: "",
  alignSelf: "center",
  width: 6 * scale,
  height: 6 * scale,
  backgroundColor: color,
  borderRadius: 1 * scale,
  transform: "rotate(45deg)",
});

const arrowBottom = (_bounds, color, scale = 1) => ({
  position: "absolute",
  bottom: -2 * scale,
  content: "",
  alignSelf: "center",
  width: 6 * scale,
  height: 6 * scale,
  backgroundColor: color,
  borderRadius: 1 * scale,
  transform: "rotate(45deg)",
});

export const arrowLeft = (bounds, color, scale = 1) => ({
  position: "absolute",
  left: -2 * scale,
  content: "",
  width: 6 * scale,
  height: 6 * scale,
  backgroundColor: color,
  borderRadius: 1 * scale,
  transform: "rotate(45deg)",
});

const arrowRight = (bounds, color, scale = 1) => ({
  position: "absolute",
  right: -2 * scale,
  content: "",
  width: 6 * scale,
  height: 6 * scale,
  backgroundColor: color,
  borderRadius: 1 * scale,
  transform: "rotate(45deg)",
});
