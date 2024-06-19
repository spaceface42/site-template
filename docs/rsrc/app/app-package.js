/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/42/FetchPartial.ts":
/*!********************************!*\
  !*** ./src/42/FetchPartial.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\n * FetchPartial v1.4.2\n *\n * The FetchPartial class provides methods to fetch and process partial HTML content.\n * This class can fetch content from URLs and update the DOM elements with the fetched content.\n * It includes methods for fetching a single partial, fetching all partials matching a selector,\n * and handling the fetched content appropriately based on its origin.\n */\nclass FetchPartial {\n    /**\n     * Initializes a new instance of the FetchPartial class.\n     * @param defaultSelector - The default CSS selector used to find elements with partial HTML content. Defaults to 'link[rel=\"html\"]'.\n     */\n    constructor(defaultSelector = 'link[rel=\"html\"]') {\n        this.defaultSelector = defaultSelector;\n    }\n    /**\n     * Fetches a single partial HTML content and updates the provided element with the response.\n     * @param url The URL of the partial HTML content.\n     * @param element The element to update with the fetched content.\n     */\n    async fetchPartial(url, element) {\n        if (!element) {\n            console.error('fetchPartial: No element provided');\n            return;\n        }\n        url = this.getUrl(url, element);\n        if (!url) {\n            console.error('fetchPartial: No URL provided for element:', element);\n            return;\n        }\n        try {\n            await this.fetchAndProcessPartial(url, element);\n        }\n        catch (error) {\n            console.error('fetchPartial: Error fetching partial for element:', element, error);\n        }\n    }\n    /**\n     * Fetches all partial HTML content matching the provided selector and updates each element with the response.\n     * @param selector The CSS selector to query for partial HTML content elements.\n     */\n    async fetchAllPartials(selector = this.defaultSelector) {\n        const partials = document.querySelectorAll(selector);\n        try {\n            await Promise.allSettled(Array.from(partials).map(async (partial) => {\n                const url = this.getUrl(undefined, partial);\n                if (!url) {\n                    console.error('fetchAllPartials: No URL provided for element:', partial);\n                    return;\n                }\n                await this.fetchAndProcessPartial(url, partial);\n            }));\n        }\n        catch (error) {\n            console.error('fetchAllPartials: Error fetching all partials:', error);\n        }\n    }\n    /**\n     * Extracts URL from the provided argument or element's attribute.\n     * @param url The URL passed as argument.\n     * @param element The element from which to extract the URL.\n     * @returns The extracted URL or undefined.\n     */\n    getUrl(url, element) {\n        var _a;\n        return (_a = url !== null && url !== void 0 ? url : element === null || element === void 0 ? void 0 : element.getAttribute('href')) !== null && _a !== void 0 ? _a : undefined;\n    }\n    /**\n     * Makes a fetch request to the provided URL and returns the response text.\n     * @param url The URL to fetch.\n     * @returns A promise that resolves with the response text.\n     */\n    async makeFetchRequest(url) {\n        const response = await fetch(url);\n        if (!response.ok) {\n            throw new Error(`makeFetchRequest: Failed to fetch partial from ${url} - ${response.statusText}`);\n        }\n        return response.text();\n    }\n    /**\n     * Checks if the given URL is of the same origin as the current document.\n     * @param url The URL to check.\n     * @returns True if the URL is same-origin, false otherwise.\n     */\n    isSameOrigin(url) {\n        const locationOrigin = window.location.origin;\n        const urlOrigin = new URL(url, locationOrigin).origin;\n        return locationOrigin === urlOrigin;\n    }\n    /**\n     * Processes the fetched response and updates the provided element with the response HTML.\n     * @param response The response HTML.\n     * @param element The element to update with the response HTML.\n     * @param url The URL from which the content was fetched.\n     */\n    async processFetchedContent(response, element, url) {\n        if (this.isSameOrigin(url)) {\n            this.insertPartial(response, element);\n        }\n        else {\n            this.processPartial(response, element);\n        }\n    }\n    /**\n     * Inserts the response HTML into the provided element using insertAdjacentHTML.\n     * @param response The response HTML.\n     * @param element The element to update with the response HTML.\n     */\n    insertPartial(response, element) {\n        try {\n            element.insertAdjacentHTML('beforebegin', response.trim());\n            element.remove();\n        }\n        catch (error) {\n            console.error('insertPartial: Error inserting HTML:', error);\n        }\n    }\n    /**\n     * Processes the response HTML using a template element and updates the provided element.\n     * @param response The response HTML.\n     * @param element The element to update with the response HTML.\n     */\n    processPartial(response, element) {\n        try {\n            const template = document.createElement('template');\n            template.innerHTML = response.trim();\n            const htmlPartial = template.content.cloneNode(true);\n            if (htmlPartial && htmlPartial.childElementCount > 0) {\n                element.replaceWith(htmlPartial);\n            }\n            else {\n                console.error('processPartial: Fetched content is empty or invalid for element:', element);\n            }\n        }\n        catch (error) {\n            console.error('processPartial: Error processing HTML:', error);\n        }\n    }\n    /**\n     * Fetches partial HTML content from the provided URL and updates the provided element with the response.\n     * @param url The URL of the partial HTML content.\n     * @param element The element to update with the fetched content.\n     */\n    async fetchAndProcessPartial(url, element) {\n        try {\n            const response = await this.makeFetchRequest(url);\n            await this.processFetchedContent(response, element, url);\n        }\n        catch (error) {\n            console.error('fetchAndProcessPartial: Error fetching partial for element:', element, error);\n        }\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FetchPartial);\n\n\n//# sourceURL=webpack:///./src/42/FetchPartial.ts?");

/***/ }),

/***/ "./src/42/PromiseDom.ts":
/*!******************************!*\
  !*** ./src/42/PromiseDom.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass PromiseDom {\n    /**\n     * Initializes PromiseDom instance.\n     * @param document The document object to use. Default is window.document.\n     */\n    constructor(document = window.document) {\n        this.document = document;\n        this.ready = this.initPromise();\n    }\n    /**\n     * Initializes the promise that resolves when the DOM is ready.\n     * @returns A promise that resolves when the DOM is ready.\n     * Ensure (with finally) the event listener is always removed\n     */\n    initPromise() {\n        return new Promise((resolve, reject) => {\n            const onDOMContentLoaded = () => {\n                resolve();\n            };\n            try {\n                const state = this.document.readyState;\n                if (state === 'interactive' || state === 'complete') {\n                    // DOM is already ready\n                    resolve();\n                }\n                else {\n                    // Wait for DOMContentLoaded event\n                    this.document.addEventListener('DOMContentLoaded', onDOMContentLoaded, false);\n                }\n            }\n            catch (error) {\n                console.error('Error initializing PromiseDom:', error);\n                reject(error);\n            }\n            finally {\n                this.cleanupListeners(onDOMContentLoaded);\n            }\n        });\n    }\n    /**\n     * Cleans up event listeners.\n     * @param listener The event listener function to remove.\n     */\n    cleanupListeners(listener) {\n        try {\n            this.document.removeEventListener('DOMContentLoaded', listener);\n        }\n        catch (error) {\n            console.error('Error cleaning up listeners:', error);\n        }\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PromiseDom);\n\n\n//# sourceURL=webpack:///./src/42/PromiseDom.ts?");

/***/ }),

/***/ "./src/app/app.ts":
/*!************************!*\
  !*** ./src/app/app.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _42_PromiseDom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../42/PromiseDom */ \"./src/42/PromiseDom.ts\");\n/* harmony import */ var _42_FetchPartial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../42/FetchPartial */ \"./src/42/FetchPartial.ts\");\n/**\n * init.ts\n *\n * Initialization script for the application.\n */\n// import PromiseDom from '../42/PromiseDom.js';\n// import FetchPartial from '../42/FetchPartial.js';\n\n\nasync function start() {\n    // Instantiate PromiseDom\n    const domReady = new _42_PromiseDom__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    try {\n        // Wait for DOM to be fully loaded and parsed\n        await domReady.ready;\n        console.log('app.start | DOM is fully loaded and parsed, continuing...');\n        // Manipulate DOM: Add welcome message\n        const appElement = document.getElementById('console42');\n        if (appElement) {\n            const h3 = document.createElement(\"h3\");\n            h3.textContent = 'Welcome to spaceface / spacesuit / version 1.0.1';\n            appElement.appendChild(h3);\n        }\n        // Fetch and process all partial HTML content\n        const htmlPartial = new _42_FetchPartial__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n        await htmlPartial.fetchAllPartials();\n        console.log('app.start | All HTML partials fetched and processed');\n    }\n    catch (error) {\n        console.error('app.start | Error during initialization:', error);\n    }\n}\n// Start the script\nstart();\n\n\n//# sourceURL=webpack:///./src/app/app.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app/app.ts");
/******/ 	
/******/ })()
;