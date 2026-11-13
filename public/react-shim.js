// Lightweight DOM shim for React.createElement & ReactDOM.createRoot
// Ensures the Tiger Navigator prototype runs 100% offline or online without external CDN dependencies.
(function (global) {
  if (global.React && global.ReactDOM) return;

  let hooks = [];
  let hookIndex = 0;
  let rootComponent = null;
  let rootContainer = null;

  function createElement(type, props, ...children) {
    const flatChildren = [];
    function flatten(arr) {
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (Array.isArray(item)) {
          flatten(item);
        } else if (item !== null && item !== undefined && item !== false && item !== true) {
          flatChildren.push(item);
        }
      }
    }
    flatten(children);
    return { type, props: props || {}, children: flatChildren };
  }

  function useState(initialValue) {
    const idx = hookIndex++;
    if (hooks[idx] === undefined) {
      hooks[idx] = typeof initialValue === "function" ? initialValue() : initialValue;
    }
    const setState = (newVal) => {
      const next = typeof newVal === "function" ? newVal(hooks[idx]) : newVal;
      hooks[idx] = next;
      scheduleRender();
    };
    return [hooks[idx], setState];
  }

  function useEffect(cb, deps) {
    const idx = hookIndex++;
    const prevDeps = hooks[idx];
    let changed = true;
    if (prevDeps && deps) {
      changed = deps.some((d, i) => d !== prevDeps[i]);
    }
    if (changed) {
      hooks[idx] = deps;
      setTimeout(cb, 0);
    }
  }

  function renderVNode(vnode) {
    if (typeof vnode === "string" || typeof vnode === "number") {
      return document.createTextNode(String(vnode));
    }
    if (!vnode) return document.createTextNode("");
    if (typeof vnode.type === "function") {
      return renderVNode(vnode.type(vnode.props));
    }

    const el = document.createElement(vnode.type);
    const props = vnode.props || {};

    Object.keys(props).forEach((k) => {
      const val = props[k];
      if (k === "className") {
        el.className = val;
      } else if (k === "style" && typeof val === "object") {
        Object.assign(el.style, val);
      } else if (k.startsWith("on") && typeof val === "function") {
        const eventName = k.slice(2).toLowerCase();
        el.addEventListener(eventName, val);
      } else if (k === "value") {
        el.value = val;
        if (vnode.type === "select") {
          setTimeout(() => { el.value = val; }, 0);
        }
      } else if (val !== false && val !== null && val !== undefined) {
        el.setAttribute(k, val);
      }
    });

    vnode.children.forEach((child) => {
      el.appendChild(renderVNode(child));
    });

    return el;
  }

  let renderPending = false;
  function scheduleRender() {
    if (renderPending) return;
    renderPending = true;
    requestAnimationFrame(() => {
      renderPending = false;
      performRender();
    });
  }

  function performRender() {
    if (!rootContainer || !rootComponent) return;
    // Preserve active input focus if typing
    const activeEl = document.activeElement;
    const activeTag = activeEl ? activeEl.tagName : null;
    const activePlaceholder = activeEl ? activeEl.getAttribute("placeholder") : null;
    const selStart = activeEl && activeEl.selectionStart !== undefined ? activeEl.selectionStart : null;

    hookIndex = 0;
    const tree = renderVNode(rootComponent);
    rootContainer.innerHTML = "";
    rootContainer.appendChild(tree);

    if (activeTag && (activeTag === "INPUT" || activeTag === "TEXTAREA")) {
      const candidates = rootContainer.querySelectorAll(activeTag);
      for (let i = 0; i < candidates.length; i++) {
        if (activePlaceholder && candidates[i].getAttribute("placeholder") === activePlaceholder) {
          candidates[i].focus();
          if (selStart !== null && candidates[i].setSelectionRange) {
            try { candidates[i].setSelectionRange(selStart, selStart); } catch (e) {}
          }
          break;
        }
      }
    }
  }

  global.React = { createElement, useState, useEffect };
  global.ReactDOM = {
    createRoot: function (container) {
      rootContainer = container;
      return {
        render: function (vnode) {
          rootComponent = vnode;
          performRender();
        }
      };
    }
  };
})(window);
