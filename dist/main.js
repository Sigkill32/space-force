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

/***/ "./src/Observer.js":
/*!*************************!*\
  !*** ./src/Observer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Observer)\n/* harmony export */ });\nclass Observer {\r\n  events = {};\r\n\r\n  subscribe = (eventName, fn) => {\r\n    if (this.events[eventName]) this.events[eventName].push(fn);\r\n    else this.events[eventName] = [fn];\r\n  };\r\n\r\n  publish = (eventName, data) => {\r\n    if (this.events[eventName]) {\r\n      this.events[eventName].forEach((fn) => {\r\n        fn.call(this, data);\r\n      });\r\n    }\r\n  };\r\n}\r\n\n\n//# sourceURL=webpack://space-force/./src/Observer.js?");

/***/ }),

/***/ "./src/components/index.js":
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n\r\n\r\nfunction ship(ctx, width, height) {\r\n  return function (x, y) {\r\n    ctx.beginPath();\r\n    ctx.rect(x, y, width, height);\r\n    ctx.fillStyle = \"black\";\r\n    ctx.fill();\r\n    ctx.closePath();\r\n  };\r\n}\r\n\r\nfunction bullet(ctx, x, y) {\r\n  ctx.beginPath();\r\n  ctx.rect(x, y, _constants__WEBPACK_IMPORTED_MODULE_0__.BULLET_WIDTH, _constants__WEBPACK_IMPORTED_MODULE_0__.BULLET_HEIGHT);\r\n  ctx.fillStyle = \"black\";\r\n  ctx.fill();\r\n  ctx.closePath();\r\n}\r\n\r\nfunction renderAllChars(ctx, coordinates) {\r\n  const myShip = ship(ctx, _constants__WEBPACK_IMPORTED_MODULE_0__.SHIP_WIDTH, _constants__WEBPACK_IMPORTED_MODULE_0__.SHIP_HEIGHT);\r\n  const enemyShip = ship(ctx, 20, 10);\r\n  myShip(coordinates.myShip.x, coordinates.myShip.y);\r\n  const allEnemyShips = Object.keys(coordinates.enemyShips);\r\n  if (allEnemyShips.length > 0) {\r\n    allEnemyShips.forEach((enemyShipId) => {\r\n      enemyShip(\r\n        coordinates.enemyShips[enemyShipId].x,\r\n        coordinates.enemyShips[enemyShipId].y\r\n      );\r\n    });\r\n  }\r\n  const allBullets = Object.keys(coordinates.bullets);\r\n  if (allBullets.length > 0) {\r\n    allBullets.forEach((bulletId) => {\r\n      bullet(\r\n        ctx,\r\n        coordinates.bullets[bulletId].x,\r\n        coordinates.bullets[bulletId].y\r\n      );\r\n    });\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderAllChars);\r\n\n\n//# sourceURL=webpack://space-force/./src/components/index.js?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BULLET_HEIGHT: () => (/* binding */ BULLET_HEIGHT),\n/* harmony export */   BULLET_WIDTH: () => (/* binding */ BULLET_WIDTH),\n/* harmony export */   CANVAS_PADDING: () => (/* binding */ CANVAS_PADDING),\n/* harmony export */   ENEMY_SHIP_HEIGHT: () => (/* binding */ ENEMY_SHIP_HEIGHT),\n/* harmony export */   ENEMY_SHIP_WIDTH: () => (/* binding */ ENEMY_SHIP_WIDTH),\n/* harmony export */   GAME_STATE_TOGGLE: () => (/* binding */ GAME_STATE_TOGGLE),\n/* harmony export */   SHIP_HEIGHT: () => (/* binding */ SHIP_HEIGHT),\n/* harmony export */   SHIP_WIDTH: () => (/* binding */ SHIP_WIDTH)\n/* harmony export */ });\nconst SHIP_WIDTH = 15;\r\nconst SHIP_HEIGHT = 15;\r\nconst CANVAS_PADDING = 50;\r\nconst GAME_STATE_TOGGLE = {\r\n  START_GAME: \"END\",\r\n  STOP_GAME: \"START\",\r\n};\r\nconst BULLET_WIDTH = 2;\r\nconst BULLET_HEIGHT = 10;\r\nconst ENEMY_SHIP_WIDTH = 20;\r\nconst ENEMY_SHIP_HEIGHT = 10;\r\n\n\n//# sourceURL=webpack://space-force/./src/constants.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components */ \"./src/components/index.js\");\n/* harmony import */ var _Observer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Observer */ \"./src/Observer.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ \"./src/utils/index.js\");\n\r\n\r\n\r\n\r\n\r\nconst IS_MOBILE = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.isMobile)();\r\nconst bulletWorker = new Worker(\"BulletsWorks.js\");\r\nconst enemyWorker = new Worker(\"EnemyWorker.js\");\r\nconst collisionDetectionWorker = new Worker(\"CollisionDetectionWorker.js\");\r\nconst canvas = document.getElementById(\"gameCanvas\");\r\nconst gameToggle = document.querySelector(\".SpaceImpact_GameToggle\");\r\nconst documentHeight = window.innerHeight;\r\nconst documentWidth = window.innerWidth;\r\n\r\ncanvas.setAttribute(\"width\", documentWidth - _constants__WEBPACK_IMPORTED_MODULE_0__.CANVAS_PADDING);\r\ncanvas.setAttribute(\"height\", Math.floor(documentHeight * 0.8));\r\nconst ctx = canvas.getContext(\"2d\");\r\n\r\nconst MAX_WIDTH = canvas.width;\r\nconst MAX_HEIGHT = canvas.height;\r\n\r\nconst observer = new _Observer__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\r\n\r\n/* -------------------------------variables---------------------------------------*/\r\n\r\nlet coordinates = {\r\n  myShip: {\r\n    x: Math.floor(MAX_WIDTH / 2),\r\n    y: MAX_HEIGHT - _constants__WEBPACK_IMPORTED_MODULE_0__.SHIP_WIDTH * 2,\r\n  },\r\n  enemyShips: {},\r\n  bullets: {},\r\n};\r\n\r\nlet gameState = \"STOP_GAME\";\r\n\r\n/* ------------------------------------------------------------------------------*/\r\n\r\n(0,_components__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(ctx, coordinates);\r\n\r\nfunction paintScreen() {\r\n  ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);\r\n  (0,_components__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(ctx, coordinates);\r\n}\r\n\r\nfunction updateScore() {\r\n  const score = document.querySelector(\".SpaceImpact_ScoreCard_Score\");\r\n  const updatedScore = parseInt(score.innerHTML) + 1;\r\n  score.innerHTML = updatedScore;\r\n}\r\n\r\nfunction copyCoordinates() {\r\n  return JSON.parse(JSON.stringify(coordinates));\r\n}\r\n\r\nfunction updateCoordinates(newCoordinates, checkCollision = true) {\r\n  if (checkCollision) {\r\n    collisionDetectionWorker.postMessage(\r\n      JSON.stringify({ message: \"PAINT\", coordinates })\r\n    );\r\n  }\r\n  coordinates = newCoordinates;\r\n  requestAnimationFrame(() => paintScreen());\r\n}\r\n\r\nfunction steerShip(e) {\r\n  let { clientX } = e;\r\n  if (IS_MOBILE) {\r\n    clientX = e.changedTouches[0].clientX;\r\n  }\r\n  const newCoordinates = copyCoordinates();\r\n  newCoordinates.myShip.x = clientX - _constants__WEBPACK_IMPORTED_MODULE_0__.CANVAS_PADDING / 2;\r\n  updateCoordinates(newCoordinates);\r\n}\r\n\r\nfunction handleShipMotionActivation(e) {\r\n  let { type, clientX } = e;\r\n  if (IS_MOBILE) {\r\n    clientX = e.changedTouches[0].clientX;\r\n  }\r\n  if (type === \"mousedown\" || type === \"touchstart\") {\r\n    const newCoordinates = copyCoordinates();\r\n    newCoordinates.myShip.x = clientX - _constants__WEBPACK_IMPORTED_MODULE_0__.CANVAS_PADDING / 2;\r\n    updateCoordinates(newCoordinates);\r\n    canvas.addEventListener(IS_MOBILE ? \"touchmove\" : \"mousemove\", steerShip);\r\n  }\r\n  if (type === \"mouseup\" || type === \"touchend\") {\r\n    canvas.removeEventListener(\r\n      IS_MOBILE ? \"touchmove\" : \"mousemove\",\r\n      steerShip\r\n    );\r\n  }\r\n}\r\n\r\ncanvas.addEventListener(\r\n  IS_MOBILE ? \"touchstart\" : \"mousedown\",\r\n  handleShipMotionActivation\r\n);\r\ncanvas.addEventListener(\r\n  IS_MOBILE ? \"touchend\" : \"mouseup\",\r\n  handleShipMotionActivation\r\n);\r\n\r\nfunction shootBullet(bulletId) {\r\n  const newCoordinates = copyCoordinates();\r\n  const currentBullet = newCoordinates.bullets[bulletId];\r\n  if (currentBullet) {\r\n    currentBullet.y -= 6;\r\n    updateCoordinates(newCoordinates);\r\n    if (currentBullet.y >= 0) {\r\n      requestAnimationFrame(() => shootBullet(bulletId));\r\n    } else {\r\n      delete newCoordinates.bullets[bulletId];\r\n      updateCoordinates(newCoordinates);\r\n    }\r\n  }\r\n}\r\n\r\nfunction createAndShootBullets() {\r\n  const newBullet = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.uuid)();\r\n  const newCoordinates = copyCoordinates();\r\n  newCoordinates.bullets[newBullet] = {\r\n    x: newCoordinates.myShip.x + _constants__WEBPACK_IMPORTED_MODULE_0__.SHIP_WIDTH / 2,\r\n    y: newCoordinates.myShip.y,\r\n  };\r\n  updateCoordinates(newCoordinates);\r\n  shootBullet(newBullet);\r\n}\r\n\r\nfunction triggerEnemyShips(enemyShipId) {\r\n  const newCoordinates = copyCoordinates();\r\n  const currentEnemyShip = newCoordinates.enemyShips[enemyShipId];\r\n  if (currentEnemyShip) {\r\n    currentEnemyShip.y += 3;\r\n    updateCoordinates(newCoordinates);\r\n    if (currentEnemyShip.y <= MAX_HEIGHT) {\r\n      requestAnimationFrame(() => triggerEnemyShips(enemyShipId));\r\n    } else {\r\n      delete newCoordinates.enemyShips[enemyShipId];\r\n      updateCoordinates(newCoordinates);\r\n    }\r\n  }\r\n}\r\n\r\nfunction createAndTriggerEnemyShips() {\r\n  const newCoordinates = copyCoordinates();\r\n  const newEnemyShip = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.uuid)();\r\n  const x = Math.floor((0,_utils__WEBPACK_IMPORTED_MODULE_3__.getRandomNum)(0, MAX_WIDTH));\r\n  newCoordinates.enemyShips[newEnemyShip] = {\r\n    x: x,\r\n    y: 0,\r\n  };\r\n  updateCoordinates(newCoordinates);\r\n  triggerEnemyShips(newEnemyShip);\r\n}\r\n\r\nbulletWorker.onmessage = function (event) {\r\n  const { data: eventData } = event;\r\n  const { message, data } = JSON.parse(eventData);\r\n  switch (message) {\r\n    case \"SHOOT_BULLET\":\r\n      createAndShootBullets();\r\n      break;\r\n    case \"END_GAME\":\r\n      console.log(\"game ended\");\r\n      break;\r\n    default:\r\n      return;\r\n  }\r\n};\r\n\r\nenemyWorker.onmessage = function (event) {\r\n  const { data: eventData } = event;\r\n  const { message, data } = JSON.parse(eventData);\r\n  switch (message) {\r\n    case \"MOBILIZE_ENEMY\":\r\n      createAndTriggerEnemyShips();\r\n      break;\r\n    case \"END_GAME\":\r\n      console.log(\"game ended\");\r\n      break;\r\n    default:\r\n      return;\r\n  }\r\n};\r\n\r\ncollisionDetectionWorker.onmessage = function (event) {\r\n  const { data: eventData } = event;\r\n  const { message, data } = JSON.parse(eventData);\r\n  switch (message) {\r\n    case \"COORDINATES_POST_COLLISION\":\r\n      updateScore();\r\n      updateCoordinates(data);\r\n    default:\r\n      break;\r\n  }\r\n};\r\n\r\ngameToggle.addEventListener(\"click\", () => {\r\n  if (gameState === \"START_GAME\") {\r\n    gameState = \"STOP_GAME\";\r\n  } else {\r\n    gameState = \"START_GAME\";\r\n  }\r\n  bulletWorker.postMessage(JSON.stringify({ message: gameState, data: null }));\r\n  enemyWorker.postMessage(JSON.stringify({ message: gameState, data: null }));\r\n  gameToggle.textContent = _constants__WEBPACK_IMPORTED_MODULE_0__.GAME_STATE_TOGGLE[gameState];\r\n});\r\n\n\n//# sourceURL=webpack://space-force/./src/index.js?");

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getRandomNum: () => (/* binding */ getRandomNum),\n/* harmony export */   isMobile: () => (/* binding */ isMobile),\n/* harmony export */   uuid: () => (/* binding */ uuid)\n/* harmony export */ });\nfunction isMobile() {\r\n  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(\r\n    navigator.userAgent\r\n  );\r\n}\r\n\r\nfunction uuid() {\r\n  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>\r\n    (\r\n      c ^\r\n      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))\r\n    ).toString(16)\r\n  );\r\n}\r\n\r\nfunction getRandomNum(min, max) {\r\n  return Math.random() * (max - min) + min;\r\n}\r\n\n\n//# sourceURL=webpack://space-force/./src/utils/index.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;