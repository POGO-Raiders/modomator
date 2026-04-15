import "@testing-library/jest-dom/vitest";

if (!document.getElementById("inject-styles-here")) {
  const el = document.createElement("noscript");
  el.id = "inject-styles-here";
  document.head.appendChild(el);
}

function createMediaQueryList(query: string) {
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
  value: (query: string) => createMediaQueryList(query),
});
