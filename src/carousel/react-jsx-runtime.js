import React from "./react-global.js";

export const Fragment = React.Fragment;

function createJsxElement(type, props, key) {
  const nextProps = props ? { ...props } : {};
  if (key !== undefined) {
    nextProps.key = key;
  }
  return React.createElement(type, nextProps);
}

export const jsx = createJsxElement;
export const jsxs = createJsxElement;
export const jsxDEV = createJsxElement;
