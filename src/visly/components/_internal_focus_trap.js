// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
/* tslint:disable */
/* eslint-disable */
import React from "react";
import { findDOMNode } from "react-dom";
const candidateSelectors = [
  "input",
  "select",
  "textarea",
  "a[href]",
  "button",
  "[tabindex]",
  "audio[controls]",
  "video[controls]",
  '[contenteditable]:not([contenteditable="false"])',
];
const candidateSelector = candidateSelectors.join(",");
const matches =
  typeof Element === "undefined"
    ? function () {}
    : Element.prototype.matches || Element.prototype.webkitMatchesSelector;

function tabbable(el, options) {
  options = options || {};
  const regularTabbables = [];
  const orderedTabbables = [];
  let candidates = el.querySelectorAll(candidateSelector);

  if (options.includeContainer) {
    if (matches.call(el, candidateSelector)) {
      candidates = Array.prototype.slice.apply(candidates);
      candidates.unshift(el);
    }
  }

  let candidate;
  let candidateTabindex;

  for (let i = 0; i < candidates.length; i++) {
    candidate = candidates[i];

    if (!isNodeMatchingSelectorTabbable(candidate)) {
      continue;
    }

    candidateTabindex = getTabindex(candidate);

    if (candidateTabindex === 0) {
      regularTabbables.push(candidate);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        node: candidate,
      });
    }
  }

  const tabbableNodes = orderedTabbables
    .sort(sortOrderedTabbables)
    .map((a) => a.node)
    .concat(regularTabbables);
  return tabbableNodes;
}

tabbable.isTabbable = isTabbable;
tabbable.isFocusable = isFocusable;

function isNodeMatchingSelectorTabbable(node) {
  if (
    !isNodeMatchingSelectorFocusable(node) ||
    isNonTabbableRadio(node) ||
    getTabindex(node) < 0
  ) {
    return false;
  }

  return true;
}

function isTabbable(node) {
  if (!node) {
    throw new Error("No node provided");
  }

  if (matches.call(node, candidateSelector) === false) {
    return false;
  }

  return isNodeMatchingSelectorTabbable(node);
}

function isNodeMatchingSelectorFocusable(node) {
  if (node.disabled || isHiddenInput(node) || isHidden(node)) {
    return false;
  }

  return true;
}

const focusableCandidateSelector = candidateSelectors
  .concat("iframe")
  .join(",");

function isFocusable(node) {
  if (!node) {
    throw new Error("No node provided");
  }

  if (matches.call(node, focusableCandidateSelector) === false) {
    return false;
  }

  return isNodeMatchingSelectorFocusable(node);
}

function getTabindex(node) {
  const tabindexAttr = parseInt(node.getAttribute("tabindex"), 10);

  if (!isNaN(tabindexAttr)) {
    return tabindexAttr;
  }

  if (isContentEditable(node)) {
    return 0;
  }

  return node.tabIndex;
}

function sortOrderedTabbables(a, b) {
  return a.tabIndex === b.tabIndex
    ? a.documentOrder - b.documentOrder
    : a.tabIndex - b.tabIndex;
}

function isContentEditable(node) {
  return node.contentEditable === "true";
}

function isInput(node) {
  return node.tagName === "INPUT";
}

function isHiddenInput(node) {
  return isInput(node) && node.type === "hidden";
}

function isRadio(node) {
  return isInput(node) && node.type === "radio";
}

function isNonTabbableRadio(node) {
  return isRadio(node) && !isTabbableRadio(node);
}

function getCheckedRadio(nodes) {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      return nodes[i];
    }
  }
}

function isTabbableRadio(node) {
  if (!node.name) {
    return true;
  }

  const radioSet = node.ownerDocument.querySelectorAll(
    'input[type="radio"][name="' + node.name + '"]'
  );
  const checked = getCheckedRadio(radioSet);
  return !checked || checked === node;
}

function isHidden(node) {
  return (
    node.offsetParent === null || getComputedStyle(node).visibility === "hidden"
  );
}

let __activeFocusDelay;

const activeFocusTraps = (function () {
  const trapQueue = [];
  return {
    activateTrap: function (trap) {
      if (trapQueue.length > 0) {
        const activeTrap = trapQueue[trapQueue.length - 1];

        if (activeTrap !== trap) {
          activeTrap.pause();
        }
      }

      const trapIndex = trapQueue.indexOf(trap);

      if (trapIndex === -1) {
        trapQueue.push(trap);
      } else {
        trapQueue.splice(trapIndex, 1);
        trapQueue.push(trap);
      }
    },
    deactivateTrap: function (trap) {
      const trapIndex = trapQueue.indexOf(trap);

      if (trapIndex !== -1) {
        trapQueue.splice(trapIndex, 1);
      }

      if (trapQueue.length > 0) {
        trapQueue[trapQueue.length - 1].unpause();
      }
    },
  };
})();

function focusTrap(element, userOptions) {
  const doc = document;
  const container =
    typeof element === "string" ? doc.querySelector(element) : element;
  const config = {
    returnFocusOnDeactivate: true,
    escapeDeactivates: true,
    ...userOptions,
  };
  const state = {
    firstTabbableNode: null,
    lastTabbableNode: null,
    nodeFocusedBeforeActivation: null,
    mostRecentlyFocusedNode: null,
    active: false,
    paused: false,
  };
  const trap = {
    activate: activate,
    deactivate: deactivate,
    pause: pause,
    unpause: unpause,
  };
  return trap;

  function activate(activateOptions) {
    if (state.active) return;
    updateTabbableNodes();
    state.active = true;
    state.paused = false;
    state.nodeFocusedBeforeActivation = doc.activeElement;
    const onActivate =
      activateOptions && activateOptions.onActivate
        ? activateOptions.onActivate
        : config.onActivate;

    if (onActivate) {
      onActivate();
    }

    addListeners();
    return trap;
  }

  function deactivate(deactivateOptions) {
    if (!state.active) return;
    clearTimeout(__activeFocusDelay);
    removeListeners();
    state.active = false;
    state.paused = false;
    activeFocusTraps.deactivateTrap(trap);
    const onDeactivate =
      deactivateOptions && deactivateOptions.onDeactivate !== undefined
        ? deactivateOptions.onDeactivate
        : config.onDeactivate;

    if (onDeactivate) {
      onDeactivate();
    }

    const returnFocus =
      deactivateOptions && deactivateOptions.returnFocus !== undefined
        ? deactivateOptions.returnFocus
        : config.returnFocusOnDeactivate;

    if (returnFocus) {
      delay(function () {
        tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
      });
    }

    return trap;
  }

  function pause() {
    if (state.paused || !state.active) return;
    state.paused = true;
    removeListeners();
  }

  function unpause() {
    if (!state.paused || !state.active) return;
    state.paused = false;
    updateTabbableNodes();
    addListeners();
  }

  function addListeners() {
    if (!state.active) return;
    activeFocusTraps.activateTrap(trap);
    __activeFocusDelay = delay(function () {
      tryFocus(getInitialFocusNode());
    });
    doc.addEventListener("focusin", checkFocusIn, true);
    doc.addEventListener("mousedown", checkPointerDown, {
      capture: true,
      passive: false,
    });
    doc.addEventListener("touchstart", checkPointerDown, {
      capture: true,
      passive: false,
    });
    doc.addEventListener("click", checkClick, {
      capture: true,
      passive: false,
    });
    doc.addEventListener("keydown", checkKey, {
      capture: true,
      passive: false,
    });
    return trap;
  }

  function removeListeners() {
    if (!state.active) return;
    doc.removeEventListener("focusin", checkFocusIn, true);
    doc.removeEventListener("mousedown", checkPointerDown, true);
    doc.removeEventListener("touchstart", checkPointerDown, true);
    doc.removeEventListener("click", checkClick, true);
    doc.removeEventListener("keydown", checkKey, true);
    return trap;
  }

  function getNodeForOption(optionName) {
    const optionValue = config[optionName];
    let node = optionValue;

    if (!optionValue) {
      return null;
    }

    if (typeof optionValue === "string") {
      node = doc.querySelector(optionValue);

      if (!node) {
        throw new Error("`" + optionName + "` refers to no known node");
      }
    }

    if (typeof optionValue === "function") {
      node = optionValue();

      if (!node) {
        throw new Error("`" + optionName + "` did not return a node");
      }
    }

    return node;
  }

  function getInitialFocusNode() {
    let node;

    if (getNodeForOption("initialFocus") !== null) {
      node = getNodeForOption("initialFocus");
    } else if (container.contains(doc.activeElement)) {
      node = doc.activeElement;
    } else {
      node = state.firstTabbableNode || getNodeForOption("fallbackFocus");
    }

    return node;
  }

  function getReturnFocusNode(previousActiveElement) {
    const node = getNodeForOption("setReturnFocus");
    return node ? node : previousActiveElement;
  }

  function checkPointerDown(e) {
    if (container.contains(e.target)) return;

    if (config.clickOutsideDeactivates) {
      deactivate({
        returnFocus: !tabbable.isFocusable(e.target),
      });
      return;
    }

    if (config.allowOutsideClick && config.allowOutsideClick(e)) {
      return;
    }

    e.preventDefault();
  }

  function checkFocusIn(e) {
    if (container.contains(e.target) || e.target instanceof Document) {
      return;
    }

    e.stopImmediatePropagation();
    tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
  }

  function checkKey(e) {
    if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
      e.preventDefault();
      deactivate();
      return;
    }

    if (isTabEvent(e)) {
      checkTab(e);
      return;
    }
  }

  function checkTab(e) {
    updateTabbableNodes();

    if (e.shiftKey && e.target === state.firstTabbableNode) {
      e.preventDefault();
      tryFocus(state.lastTabbableNode);
      return;
    }

    if (!e.shiftKey && e.target === state.lastTabbableNode) {
      e.preventDefault();
      tryFocus(state.firstTabbableNode);
      return;
    }
  }

  function checkClick(e) {
    if (config.clickOutsideDeactivates) return;
    if (container.contains(e.target)) return;

    if (config.allowOutsideClick && config.allowOutsideClick(e)) {
      return;
    }

    e.preventDefault();
    e.stopImmediatePropagation();
  }

  function updateTabbableNodes() {
    const tabbableNodes = tabbable(container);
    state.firstTabbableNode = tabbableNodes[0] || getInitialFocusNode();
    state.lastTabbableNode =
      tabbableNodes[tabbableNodes.length - 1] || getInitialFocusNode();
  }

  function tryFocus(node, initial) {
    if (node === doc.activeElement) return;

    if (!node && initial) {
      return;
    }

    if (!node || !node.focus) {
      tryFocus(getInitialFocusNode(), true);
      return;
    }

    node.focus({
      preventScroll: userOptions.preventScroll,
    });
    state.mostRecentlyFocusedNode = node;

    if (isSelectableInput(node)) {
      node.select();
    }
  }
}

function isSelectableInput(node) {
  return (
    node.tagName &&
    node.tagName.toLowerCase() === "input" &&
    typeof node.select === "function"
  );
}

function isEscapeEvent(e) {
  return e.key === "Escape" || e.key === "Esc" || e.keyCode === 27;
}

function isTabEvent(e) {
  return e.key === "Tab" || e.keyCode === 9;
}

function delay(fn) {
  return setTimeout(fn, 0);
}

export class FocusTrap extends React.Component {
  constructor(props) {
    super(props);

    if (typeof document !== "undefined") {
      this.previouslyFocusedElement = document.activeElement;
    }
  }

  componentDidMount() {
    const specifiedFocusTrapOptions = this.props.focusTrapOptions;
    const tailoredFocusTrapOptions = {
      returnFocusOnDeactivate: false,
    };

    for (const optionName in specifiedFocusTrapOptions) {
      if (!specifiedFocusTrapOptions.hasOwnProperty(optionName)) continue;
      if (optionName === "returnFocusOnDeactivate") continue;
      tailoredFocusTrapOptions[optionName] =
        specifiedFocusTrapOptions[optionName];
    }

    const focusTrapElementDOMNode = findDOMNode(this.focusTrapElement);
    this.focusTrap = this.props._createFocusTrap(
      focusTrapElementDOMNode,
      tailoredFocusTrapOptions
    );

    if (this.props.active) {
      this.focusTrap.activate();
    }

    if (this.props.paused) {
      this.focusTrap.pause();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active && !this.props.active) {
      const { returnFocusOnDeactivate } = this.props.focusTrapOptions;
      const returnFocus = returnFocusOnDeactivate || false;
      const config = {
        returnFocus,
      };
      this.focusTrap.deactivate(config);
    } else if (!prevProps.active && this.props.active) {
      this.focusTrap.activate();
    }

    if (prevProps.paused && !this.props.paused) {
      this.focusTrap.unpause();
    } else if (!prevProps.paused && this.props.paused) {
      this.focusTrap.pause();
    }
  }

  componentWillUnmount() {
    this.focusTrap.deactivate();

    if (
      this.props.focusTrapOptions.returnFocusOnDeactivate !== false &&
      this.previouslyFocusedElement &&
      this.previouslyFocusedElement.focus
    ) {
      this.previouslyFocusedElement.focus();
    }
  }

  setFocusTrapElement(element) {
    this.focusTrapElement = element;
  }

  render() {
    const child = React.Children.only(this.props.children);

    const composedRefCallback = (element) => {
      this.setFocusTrapElement(element);

      if (typeof child.ref === "function") {
        child.ref(element);
      }
    };

    const childWithRef = React.cloneElement(child, {
      ref: composedRefCallback,
    });
    return childWithRef;
  }
}
FocusTrap.defaultProps = {
  active: true,
  paused: false,
  focusTrapOptions: {},
  _createFocusTrap: focusTrap,
};
