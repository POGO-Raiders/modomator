// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// App ThemeSwitcherProvider uses this insertion point (see public/index.html).
if (!document.getElementById("inject-styles-here")) {
  const el = document.createElement("noscript");
  el.id = "inject-styles-here";
  document.head.appendChild(el);
}

// antd Row / grid subscribe to matchMedia; jsdom's implementation is incomplete.
function createMediaQueryList(query) {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {},
  };
}
Object.defineProperty(window, "matchMedia", {
  writable: true,
  configurable: true,
  value: (query) => createMediaQueryList(query),
});
