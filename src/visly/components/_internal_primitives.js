// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
/* tslint:disable */
/* eslint-disable */
import React, { useRef } from "react";
import {
  exists,
  useRootProps,
  useEventHandlers,
  combineRef,
  renderChildren,
} from "./_internal_utils";
import { useSpacing } from "./_internal_component_utils";
export function RootPrimitive(props) {
  const ref = useRef();
  const { states, handlers } = useEventHandlers({
    ref,
    ...props,
  });
  const {
    style,
    className,
    testId,
    innerRef,
    values,
    reactProps,
  } = useRootProps(props, states);
  const noSelectStyles = exists(props.onClick)
    ? {
        cursor: "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
        KhtmlUserSelect: "none",
        MozUserSelect: "none",
      }
    : {};
  const children = useSpacing(
    props.addSpacing,
    renderChildren(props.children, values)
  );
  return (
    <div
      ref={combineRef(props.measureRef, combineRef(innerRef, ref))}
      data-testid={testId}
      {...reactProps}
      {...handlers}
      className={className}
      style={{ ...noSelectStyles, ...style }}
    >
      {children}
    </div>
  );
}
export function ContainerPrimitive(props) {
  const children = useSpacing(props.addSpacing, props.children);
  return (
    <div ref={props.measureRef} className={props.className}>
      {children}
    </div>
  );
}
export function TextPrimitive(props) {
  const { className, text, measureRef } = props;
  return (
    <div className={className} ref={measureRef}>
      {text}
    </div>
  );
}
export function IconPrimitive(props) {
  const { src, useMask, style, measureRef } = props;
  const maskStyles = useMask
    ? {
        mask: `url(${src}) no-repeat 50% 50% / contain`,
        WebkitMask: `url(${src}) no-repeat 50% 50% / contain`,
      }
    : {
        background: `url(${src}) no-repeat 50% 50% / contain`,
      };
  return (
    <div
      className={props.className}
      style={{ ...maskStyles, ...style }}
      ref={measureRef}
    />
  );
}
export function ImagePrimitive(props) {
  const { className, src, alt, measureRef } = props;
  return (
    <div
      ref={measureRef}
      role="img"
      className={className}
      style={{
        backgroundImage: `url(${src}`,
      }}
      aria-label={exists(alt) ? alt : ""}
    />
  );
}
export function SpacerPrimitive(props) {
  const { className, measureRef } = props;
  return <div className={className} ref={measureRef} />;
}
export function ProgressFillPrimitive(props) {
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  return (
    <div
      className={props.className}
      style={{
        width: `${clamp(props.value, 0, 1) * 100}%`,
      }}
    />
  );
}
