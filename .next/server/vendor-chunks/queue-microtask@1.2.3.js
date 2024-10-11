/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/queue-microtask@1.2.3";
exports.ids = ["vendor-chunks/queue-microtask@1.2.3"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/queue-microtask@1.2.3/node_modules/queue-microtask/index.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/.pnpm/queue-microtask@1.2.3/node_modules/queue-microtask/index.js ***!
  \****************************************************************************************/
/***/ ((module) => {

eval("/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */\nlet promise\n\nmodule.exports = typeof queueMicrotask === 'function'\n  ? queueMicrotask.bind(typeof window !== 'undefined' ? window : global)\n  // reuse resolved promise, and allocate it lazily\n  : cb => (promise || (promise = Promise.resolve()))\n    .then(cb)\n    .catch(err => setTimeout(() => { throw err }, 0))\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vcXVldWUtbWljcm90YXNrQDEuMi4zL25vZGVfbW9kdWxlcy9xdWV1ZS1taWNyb3Rhc2svaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLFdBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YWlsd2luZHVpLXByb3RvY29sLy4vbm9kZV9tb2R1bGVzLy5wbnBtL3F1ZXVlLW1pY3JvdGFza0AxLjIuMy9ub2RlX21vZHVsZXMvcXVldWUtbWljcm90YXNrL2luZGV4LmpzPzlhNTAiXSwic291cmNlc0NvbnRlbnQiOlsiLyohIHF1ZXVlLW1pY3JvdGFzay4gTUlUIExpY2Vuc2UuIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZy9vcGVuc291cmNlPiAqL1xubGV0IHByb21pc2VcblxubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgcXVldWVNaWNyb3Rhc2sgPT09ICdmdW5jdGlvbidcbiAgPyBxdWV1ZU1pY3JvdGFzay5iaW5kKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsKVxuICAvLyByZXVzZSByZXNvbHZlZCBwcm9taXNlLCBhbmQgYWxsb2NhdGUgaXQgbGF6aWx5XG4gIDogY2IgPT4gKHByb21pc2UgfHwgKHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKSkpXG4gICAgLnRoZW4oY2IpXG4gICAgLmNhdGNoKGVyciA9PiBzZXRUaW1lb3V0KCgpID0+IHsgdGhyb3cgZXJyIH0sIDApKVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/queue-microtask@1.2.3/node_modules/queue-microtask/index.js\n");

/***/ })

};
;