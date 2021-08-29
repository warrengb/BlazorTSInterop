/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var cube;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


/***/ }),

/***/ "./src/cube.ts":
/*!*********************!*\
  !*** ./src/cube.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Cube\": () => (/* binding */ Cube)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\r\nclass Cube {\r\n    constructor() {\r\n        this.camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(75, 2, .1, 5);\r\n        this.camera.position.z = 2;\r\n        let canvas = document.querySelector('#cube');\r\n        this.renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });\r\n        this.scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();\r\n        this.scene.background = null;\r\n        const light = new three__WEBPACK_IMPORTED_MODULE_0__.DirectionalLight(0xFFFFFF, 1);\r\n        light.position.set(-1, 2, 4);\r\n        this.scene.add(light);\r\n        const geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(1, 1, 1);\r\n        const loadManager = new three__WEBPACK_IMPORTED_MODULE_0__.LoadingManager();\r\n        const loader = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader(loadManager);\r\n        const texBlazor = loader.load('images/blazor.png');\r\n        const texInterop = loader.load('images/interop.png');\r\n        const texCircle = loader.load('images/tscircle.png');\r\n        const matBlazor = new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial({ color: 0xffffff, map: texBlazor, transparent: false, opacity: 1 });\r\n        const matInterop = new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial({ color: 0xffffff, map: texInterop, transparent: false, opacity: 1 });\r\n        const matCircle = new three__WEBPACK_IMPORTED_MODULE_0__.MeshPhongMaterial({ color: 0xffffff, map: texCircle, transparent: false, opacity: 1 });\r\n        const materials = [matBlazor, matInterop, matCircle, matBlazor, matInterop, matCircle];\r\n        loadManager.onLoad = () => {\r\n            this.cube = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, materials);\r\n            this.scene.add(this.cube);\r\n            this.animate();\r\n        };\r\n    }\r\n    animate(time = 0) {\r\n        time = performance.now() * 0.0005;\r\n        this.cube.rotation.x = time;\r\n        this.cube.rotation.y = time;\r\n        this.renderer.render(this.scene, this.camera);\r\n        requestAnimationFrame(this.animate.bind(this));\r\n    }\r\n    static Create() {\r\n        new Cube();\r\n    }\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUUsR0FBRyxNQUFNLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNO1FBQ1QsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUNmLENBQUM7Q0FDSiIsInNvdXJjZXMiOlsid2VicGFjazovL1tuYW1lXS8uL3NyYy9jdWJlLnRzPzIwZjciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEN1YmUge1xyXG4gICAgY2FtZXJhOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcclxuICAgIHNjZW5lOiBUSFJFRS5TY2VuZTtcclxuICAgIHJlbmRlcmVyOiBUSFJFRS5XZWJHTFJlbmRlcmVyO1xyXG4gICAgY3ViZTogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDc1LCAyLCAuMSwgNSk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IDI7XHJcbiAgICAgICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdWJlJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHsgY2FudmFzOiBjYW52YXMsIGFscGhhOiB0cnVlLCBhbnRpYWxpYXM6IHRydWUgfSk7XHJcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xyXG4gICAgICAgIHRoaXMuc2NlbmUuYmFja2dyb3VuZCA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgbGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweEZGRkZGRiwgMSk7XHJcbiAgICAgICAgbGlnaHQucG9zaXRpb24uc2V0KC0xLCAyLCA0KTtcclxuICAgICAgICB0aGlzLnNjZW5lLmFkZChsaWdodCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJveEdlb21ldHJ5KDEsIDEsIDEpO1xyXG4gICAgICAgIGNvbnN0IGxvYWRNYW5hZ2VyID0gbmV3IFRIUkVFLkxvYWRpbmdNYW5hZ2VyKCk7XHJcbiAgICAgICAgY29uc3QgbG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIobG9hZE1hbmFnZXIpO1xyXG4gICAgICAgIGNvbnN0IHRleEJsYXpvciA9IGxvYWRlci5sb2FkKCdpbWFnZXMvYmxhem9yLnBuZycpO1xyXG4gICAgICAgIGNvbnN0IHRleEludGVyb3AgPSBsb2FkZXIubG9hZCgnaW1hZ2VzL2ludGVyb3AucG5nJyk7XHJcbiAgICAgICAgY29uc3QgdGV4Q2lyY2xlID0gbG9hZGVyLmxvYWQoJ2ltYWdlcy90c2NpcmNsZS5wbmcnKTtcclxuXHJcbiAgICAgICAgY29uc3QgbWF0Qmxhem9yID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHsgY29sb3I6IDB4ZmZmZmZmLCBtYXA6IHRleEJsYXpvciwgdHJhbnNwYXJlbnQ6IGZhbHNlLCBvcGFjaXR5OiAxIH0pO1xyXG4gICAgICAgIGNvbnN0IG1hdEludGVyb3AgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmZmYsIG1hcDogdGV4SW50ZXJvcCwgdHJhbnNwYXJlbnQ6IGZhbHNlLCBvcGFjaXR5OiAxIH0pO1xyXG4gICAgICAgIGNvbnN0IG1hdENpcmNsZSA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IGNvbG9yOiAweGZmZmZmZiwgbWFwOiB0ZXhDaXJjbGUsIHRyYW5zcGFyZW50OiBmYWxzZSwgb3BhY2l0eTogMSB9KTtcclxuICAgICAgICBjb25zdCBtYXRlcmlhbHMgPSBbbWF0Qmxhem9yLCBtYXRJbnRlcm9wLCBtYXRDaXJjbGUsIG1hdEJsYXpvciwgbWF0SW50ZXJvcCwgbWF0Q2lyY2xlXTtcclxuXHJcbiAgICAgICAgbG9hZE1hbmFnZXIub25Mb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmN1YmUgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWxzKTtcclxuICAgICAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5jdWJlKTtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRlKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlKHRpbWUgPSAwKSB7XHJcbiAgICAgICAgdGltZSA9IHBlcmZvcm1hbmNlLm5vdygpICogMC4wMDA1O1xyXG4gICAgICAgIHRoaXMuY3ViZS5yb3RhdGlvbi54ID0gdGltZTtcclxuICAgICAgICB0aGlzLmN1YmUucm90YXRpb24ueSA9IHRpbWU7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIENyZWF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBuZXcgQ3ViZSgpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/cube.ts\n");

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
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/cube.ts");
/******/ 	cube = __webpack_exports__;
/******/ 	
/******/ })()
;