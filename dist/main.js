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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Observer)\n/* harmony export */ });\nclass Observer {\n  events = {};\n\n  subscribe = (eventName, fn) => {\n    if (this.events[eventName]) this.events[eventName].push(fn);\n    else this.events[eventName] = [fn];\n  };\n\n  publish = (eventName, data) => {\n    if (this.events[eventName]) {\n      this.events[eventName].forEach((fn) => {\n        fn.call(this, data);\n      });\n    }\n  };\n}\n\n\n//# sourceURL=webpack://space-impact/./src/Observer.js?");

/***/ }),

/***/ "./src/components/index.js":
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./src/constants.js\");\n\n\nfunction ship(ctx, width, height) {\n  return function (x, y) {\n    ctx.beginPath();\n    ctx.rect(x, y, width, height);\n    ctx.fillStyle = \"black\";\n    ctx.fill();\n    ctx.closePath();\n  };\n}\n\nfunction bullet(ctx, x, y) {\n  ctx.beginPath();\n  ctx.rect(x, y, _constants__WEBPACK_IMPORTED_MODULE_0__.BULLET_WIDTH, _constants__WEBPACK_IMPORTED_MODULE_0__.BULLET_HEIGHT);\n  ctx.fillStyle = \"black\";\n  ctx.fill();\n  ctx.closePath();\n}\n\nfunction renderAllChars(ctx, coordinates) {\n  const myShip = ship(ctx, _constants__WEBPACK_IMPORTED_MODULE_0__.SHIP_WIDTH, _constants__WEBPACK_IMPORTED_MODULE_0__.SHIP_HEIGHT);\n  const enemyShip = ship(ctx, 20, 10);\n  myShip(coordinates.myShip.x, coordinates.myShip.y);\n  const allEnemyShips = Object.keys(coordinates.enemyShips);\n  if (allEnemyShips.length > 0) {\n    allEnemyShips.forEach((enemyShipId) => {\n      enemyShip(\n        coordinates.enemyShips[enemyShipId].x,\n        coordinates.enemyShips[enemyShipId].y\n      );\n    });\n  }\n  const allBullets = Object.keys(coordinates.bullets);\n  if (allBullets.length > 0) {\n    allBullets.forEach((bulletId) => {\n      bullet(\n        ctx,\n        coordinates.bullets[bulletId].x,\n        coordinates.bullets[bulletId].y\n      );\n    });\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderAllChars);\n\n\n//# sourceURL=webpack://space-impact/./src/components/index.js?");

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BULLET_HEIGHT\": () => (/* binding */ BULLET_HEIGHT),\n/* harmony export */   \"BULLET_WIDTH\": () => (/* binding */ BULLET_WIDTH),\n/* harmony export */   \"CANVAS_PADDING\": () => (/* binding */ CANVAS_PADDING),\n/* harmony export */   \"ENEMY_SHIP_HEIGHT\": () => (/* binding */ ENEMY_SHIP_HEIGHT),\n/* harmony export */   \"ENEMY_SHIP_WIDTH\": () => (/* binding */ ENEMY_SHIP_WIDTH),\n/* harmony export */   \"GAME_STATE_TOGGLE\": () => (/* binding */ GAME_STATE_TOGGLE),\n/* harmony export */   \"SHIP_HEIGHT\": () => (/* binding */ SHIP_HEIGHT),\n/* harmony export */   \"SHIP_WIDTH\": () => (/* binding */ SHIP_WIDTH)\n/* harmony export */ });\nconst SHIP_WIDTH = 15;\nconst SHIP_HEIGHT = 15;\nconst CANVAS_PADDING = 50;\nconst GAME_STATE_TOGGLE = {\n  START_GAME: \"END\",\n  STOP_GAME: \"START\",\n};\nconst BULLET_WIDTH = 2;\nconst BULLET_HEIGHT = 10;\nconst ENEMY_SHIP_WIDTH = 20;\nconst ENEMY_SHIP_HEIGHT = 10;\n\n\n//# sourceURL=webpack://space-impact/./src/constants.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/constants.js\");\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components */ \"./src/components/index.js\");\n/* harmony import */ var _Observer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Observer */ \"./src/Observer.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ \"./src/utils/index.js\");\n\n\n\n\n\nconst IS_MOBILE = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.isMobile)();\nconst bulletWorker = new Worker(\"BulletsWorks.js\");\nconst enemyWorker = new Worker(\"EnemyWorker.js\");\nconst collisionDetectionWorker = new Worker(\"CollisionDetectionWorker.js\");\nconst canvas = document.getElementById(\"gameCanvas\");\nconst gameToggle = document.querySelector(\".SpaceImpact_GameToggle\");\nconst documentHeight = window.innerHeight;\nconst documentWidth = window.innerWidth;\n\ncanvas.setAttribute(\"width\", documentWidth - _constants__WEBPACK_IMPORTED_MODULE_0__.CANVAS_PADDING);\ncanvas.setAttribute(\"height\", Math.floor(documentHeight * 0.8));\nconst ctx = canvas.getContext(\"2d\");\n\nconst MAX_WIDTH = canvas.width;\nconst MAX_HEIGHT = canvas.height;\n\nconst observer = new _Observer__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n\n/* -------------------------------variables---------------------------------------*/\n\nlet coordinates = {\n  myShip: {\n    x: Math.floor(MAX_WIDTH / 2),\n    y: MAX_HEIGHT - _constants__WEBPACK_IMPORTED_MODULE_0__.SHIP_WIDTH * 2,\n  },\n  enemyShips: {},\n  bullets: {},\n};\n\nlet gameState = \"STOP_GAME\";\n\n/* ------------------------------------------------------------------------------*/\n\n(0,_components__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(ctx, coordinates);\n\nfunction paintScreen() {\n  ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);\n  (0,_components__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(ctx, coordinates);\n}\n\nfunction updateScore() {\n  const score = document.querySelector(\".SpaceImpact_ScoreCard_Score\");\n  const updatedScore = parseInt(score.innerHTML) + 1;\n  score.innerHTML = updatedScore;\n}\n\nfunction copyCoordinates() {\n  return JSON.parse(JSON.stringify(coordinates));\n}\n\nfunction updateCoordinates(newCoordinates, checkCollision = true) {\n  if (checkCollision) {\n    collisionDetectionWorker.postMessage(\n      JSON.stringify({ message: \"PAINT\", coordinates })\n    );\n  }\n  coordinates = newCoordinates;\n  paintScreen();\n}\n\nfunction steerShip(e) {\n  let { clientX } = e;\n  if (IS_MOBILE) {\n    clientX = e.changedTouches[0].clientX;\n  }\n  const newCoordinates = copyCoordinates();\n  newCoordinates.myShip.x = clientX - _constants__WEBPACK_IMPORTED_MODULE_0__.CANVAS_PADDING / 2;\n  updateCoordinates(newCoordinates);\n}\n\nfunction handleShipMotionActivation(e) {\n  let { type, clientX } = e;\n  if (IS_MOBILE) {\n    clientX = e.changedTouches[0].clientX;\n  }\n  if (type === \"mousedown\" || type === \"touchstart\") {\n    const newCoordinates = copyCoordinates();\n    newCoordinates.myShip.x = clientX - _constants__WEBPACK_IMPORTED_MODULE_0__.CANVAS_PADDING / 2;\n    updateCoordinates(newCoordinates);\n    canvas.addEventListener(IS_MOBILE ? \"touchmove\" : \"mousemove\", steerShip);\n  }\n  if (type === \"mouseup\" || type === \"touchend\") {\n    canvas.removeEventListener(\n      IS_MOBILE ? \"touchmove\" : \"mousemove\",\n      steerShip\n    );\n  }\n}\n\ncanvas.addEventListener(\n  IS_MOBILE ? \"touchstart\" : \"mousedown\",\n  handleShipMotionActivation\n);\ncanvas.addEventListener(\n  IS_MOBILE ? \"touchend\" : \"mouseup\",\n  handleShipMotionActivation\n);\n\nfunction shootBullet(bulletId) {\n  const newCoordinates = copyCoordinates();\n  const currentBullet = newCoordinates.bullets[bulletId];\n  if (currentBullet) {\n    currentBullet.y -= 5;\n    updateCoordinates(newCoordinates);\n    if (currentBullet.y >= 0) {\n      requestAnimationFrame(() => shootBullet(bulletId));\n    } else {\n      delete newCoordinates.bullets[bulletId];\n      updateCoordinates(newCoordinates);\n    }\n  }\n}\n\nfunction createAndShootBullets() {\n  const newBullet = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.uuid)();\n  const newCoordinates = copyCoordinates();\n  newCoordinates.bullets[newBullet] = {\n    x: newCoordinates.myShip.x + _constants__WEBPACK_IMPORTED_MODULE_0__.SHIP_WIDTH / 2,\n    y: newCoordinates.myShip.y,\n  };\n  updateCoordinates(newCoordinates);\n  shootBullet(newBullet);\n}\n\nfunction triggerEnemyShips(enemyShipId) {\n  const newCoordinates = copyCoordinates();\n  const currentEnemyShip = newCoordinates.enemyShips[enemyShipId];\n  if (currentEnemyShip) {\n    currentEnemyShip.y += 3;\n    updateCoordinates(newCoordinates);\n    if (currentEnemyShip.y <= MAX_HEIGHT) {\n      requestAnimationFrame(() => triggerEnemyShips(enemyShipId));\n    } else {\n      delete newCoordinates.enemyShips[enemyShipId];\n      updateCoordinates(newCoordinates);\n    }\n  }\n}\n\nfunction createAndTriggerEnemyShips() {\n  const newCoordinates = copyCoordinates();\n  const newEnemyShip = (0,_utils__WEBPACK_IMPORTED_MODULE_3__.uuid)();\n  const x = Math.floor((0,_utils__WEBPACK_IMPORTED_MODULE_3__.getRandomNum)(0, MAX_WIDTH));\n  newCoordinates.enemyShips[newEnemyShip] = {\n    x: x,\n    y: 0,\n  };\n  updateCoordinates(newCoordinates);\n  triggerEnemyShips(newEnemyShip);\n}\n\nfunction detectCollisionAndUpdateCoordinates(newCoordinates) {\n  coordinates = newCoordinates;\n  paintScreen();\n}\n\nbulletWorker.onmessage = function (event) {\n  const { data: eventData } = event;\n  const { message, data } = JSON.parse(eventData);\n  switch (message) {\n    case \"SHOOT_BULLET\":\n      createAndShootBullets();\n      break;\n    case \"END_GAME\":\n      console.log(\"game ended\");\n      break;\n    default:\n      return;\n  }\n};\n\nenemyWorker.onmessage = function (event) {\n  const { data: eventData } = event;\n  const { message, data } = JSON.parse(eventData);\n  switch (message) {\n    case \"MOBILIZE_ENEMY\":\n      createAndTriggerEnemyShips();\n      break;\n    case \"END_GAME\":\n      console.log(\"game ended\");\n      break;\n    default:\n      return;\n  }\n};\n\ncollisionDetectionWorker.onmessage = function (event) {\n  const { data: eventData } = event;\n  const { message, data } = JSON.parse(eventData);\n  switch (message) {\n    case \"COORDINATES_POST_COLLISION\":\n      updateScore();\n      requestAnimationFrame(() => detectCollisionAndUpdateCoordinates(data));\n    default:\n      break;\n  }\n};\n\ngameToggle.addEventListener(\"click\", () => {\n  if (gameState === \"START_GAME\") {\n    gameState = \"STOP_GAME\";\n  } else {\n    gameState = \"START_GAME\";\n  }\n  bulletWorker.postMessage(JSON.stringify({ message: gameState, data: null }));\n  enemyWorker.postMessage(JSON.stringify({ message: gameState, data: null }));\n  gameToggle.textContent = _constants__WEBPACK_IMPORTED_MODULE_0__.GAME_STATE_TOGGLE[gameState];\n});\n\n// startGame();\n\n\n//# sourceURL=webpack://space-impact/./src/index.js?");

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getRandomNum\": () => (/* binding */ getRandomNum),\n/* harmony export */   \"isMobile\": () => (/* binding */ isMobile),\n/* harmony export */   \"uuid\": () => (/* binding */ uuid)\n/* harmony export */ });\nfunction isMobile() {\n  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(\n    navigator.userAgent\n  );\n}\n\nfunction uuid() {\n  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>\n    (\n      c ^\n      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))\n    ).toString(16)\n  );\n}\n\nfunction getRandomNum(min, max) {\n  return Math.random() * (max - min) + min;\n}\n\n\n//# sourceURL=webpack://space-impact/./src/utils/index.js?");

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