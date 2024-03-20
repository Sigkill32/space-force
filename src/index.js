import {
  SHIP_WIDTH,
  SHIP_HEIGHT,
  CANVAS_PADDING,
  GAME_STATE_TOGGLE,
} from "./constants";
import renderAllChars from "./components";
import Observer from "./Observer";
import { getRandomNum, isMobile, uuid } from "./utils";

const IS_MOBILE = isMobile();
const bulletWorker = new Worker("BulletsWorks.js");
const enemyWorker = new Worker("EnemyWorker.js");
const collisionDetectionWorker = new Worker("CollisionDetectionWorker.js");
const canvas = document.getElementById("gameCanvas");
const gameToggle = document.querySelector(".SpaceImpact_GameToggle");
const documentHeight = window.innerHeight;
const documentWidth = window.innerWidth;

canvas.setAttribute("width", documentWidth - CANVAS_PADDING);
canvas.setAttribute("height", Math.floor(documentHeight * 0.8));
const ctx = canvas.getContext("2d");

const MAX_WIDTH = canvas.width;
const MAX_HEIGHT = canvas.height;

const observer = new Observer();

/* -------------------------------variables---------------------------------------*/

let coordinates = {
  myShip: {
    x: Math.floor(MAX_WIDTH / 2),
    y: MAX_HEIGHT - SHIP_WIDTH * 2,
  },
  enemyShips: {},
  bullets: {},
};

let gameState = "STOP_GAME";

/* ------------------------------------------------------------------------------*/

renderAllChars(ctx, coordinates);

function paintScreen() {
  ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT);
  renderAllChars(ctx, coordinates);
}

function updateScore() {
  const score = document.querySelector(".SpaceImpact_ScoreCard_Score");
  const updatedScore = parseInt(score.innerHTML) + 1;
  score.innerHTML = updatedScore;
}

function copyCoordinates() {
  return JSON.parse(JSON.stringify(coordinates));
}

function updateCoordinates(newCoordinates, checkCollision = true) {
  if (checkCollision) {
    collisionDetectionWorker.postMessage(
      JSON.stringify({ message: "PAINT", coordinates })
    );
  }
  coordinates = newCoordinates;
  requestAnimationFrame(() => paintScreen());
}

function steerShip(e) {
  let { clientX } = e;
  if (IS_MOBILE) {
    clientX = e.changedTouches[0].clientX;
  }
  const newCoordinates = copyCoordinates();
  newCoordinates.myShip.x = clientX - CANVAS_PADDING / 2;
  updateCoordinates(newCoordinates);
}

function handleShipMotionActivation(e) {
  let { type, clientX } = e;
  if (IS_MOBILE) {
    clientX = e.changedTouches[0].clientX;
  }
  if (type === "mousedown" || type === "touchstart") {
    const newCoordinates = copyCoordinates();
    newCoordinates.myShip.x = clientX - CANVAS_PADDING / 2;
    updateCoordinates(newCoordinates);
    canvas.addEventListener(IS_MOBILE ? "touchmove" : "mousemove", steerShip);
  }
  if (type === "mouseup" || type === "touchend") {
    canvas.removeEventListener(
      IS_MOBILE ? "touchmove" : "mousemove",
      steerShip
    );
  }
}

canvas.addEventListener(
  IS_MOBILE ? "touchstart" : "mousedown",
  handleShipMotionActivation
);
canvas.addEventListener(
  IS_MOBILE ? "touchend" : "mouseup",
  handleShipMotionActivation
);

function shootBullet(bulletId) {
  const newCoordinates = copyCoordinates();
  const currentBullet = newCoordinates.bullets[bulletId];
  if (currentBullet) {
    currentBullet.y -= 6;
    updateCoordinates(newCoordinates);
    if (currentBullet.y >= 0) {
      requestAnimationFrame(() => shootBullet(bulletId));
    } else {
      delete newCoordinates.bullets[bulletId];
      updateCoordinates(newCoordinates);
    }
  }
}

function createAndShootBullets() {
  const newBullet = uuid();
  const newCoordinates = copyCoordinates();
  newCoordinates.bullets[newBullet] = {
    x: newCoordinates.myShip.x + SHIP_WIDTH / 2,
    y: newCoordinates.myShip.y,
  };
  updateCoordinates(newCoordinates);
  shootBullet(newBullet);
}

function triggerEnemyShips(enemyShipId) {
  const newCoordinates = copyCoordinates();
  const currentEnemyShip = newCoordinates.enemyShips[enemyShipId];
  if (currentEnemyShip) {
    currentEnemyShip.y += 3;
    updateCoordinates(newCoordinates);
    if (currentEnemyShip.y <= MAX_HEIGHT) {
      requestAnimationFrame(() => triggerEnemyShips(enemyShipId));
    } else {
      delete newCoordinates.enemyShips[enemyShipId];
      updateCoordinates(newCoordinates);
    }
  }
}

function createAndTriggerEnemyShips() {
  const newCoordinates = copyCoordinates();
  const newEnemyShip = uuid();
  const x = Math.floor(getRandomNum(0, MAX_WIDTH));
  newCoordinates.enemyShips[newEnemyShip] = {
    x: x,
    y: 0,
  };
  updateCoordinates(newCoordinates);
  triggerEnemyShips(newEnemyShip);
}

function detectCollisionAndUpdateCoordinates(newCoordinates) {
  coordinates = newCoordinates;
  requestAnimationFrame(() => paintScreen());
}

bulletWorker.onmessage = function (event) {
  const { data: eventData } = event;
  const { message, data } = JSON.parse(eventData);
  switch (message) {
    case "SHOOT_BULLET":
      createAndShootBullets();
      break;
    case "END_GAME":
      console.log("game ended");
      break;
    default:
      return;
  }
};

enemyWorker.onmessage = function (event) {
  const { data: eventData } = event;
  const { message, data } = JSON.parse(eventData);
  switch (message) {
    case "MOBILIZE_ENEMY":
      createAndTriggerEnemyShips();
      break;
    case "END_GAME":
      console.log("game ended");
      break;
    default:
      return;
  }
};

collisionDetectionWorker.onmessage = function (event) {
  const { data: eventData } = event;
  const { message, data } = JSON.parse(eventData);
  switch (message) {
    case "COORDINATES_POST_COLLISION":
      updateScore();
      requestAnimationFrame(() => detectCollisionAndUpdateCoordinates(data));
    default:
      break;
  }
};

gameToggle.addEventListener("click", () => {
  if (gameState === "START_GAME") {
    gameState = "STOP_GAME";
  } else {
    gameState = "START_GAME";
  }
  bulletWorker.postMessage(JSON.stringify({ message: gameState, data: null }));
  enemyWorker.postMessage(JSON.stringify({ message: gameState, data: null }));
  gameToggle.textContent = GAME_STATE_TOGGLE[gameState];
});

// startGame();
