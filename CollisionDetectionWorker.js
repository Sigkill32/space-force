const ENEMY_SHIP_WIDTH = 20;
const ENEMY_SHIP_HEIGHT = 10;

let prevCollidedObjects;

function shouldSkipDetection(coordinates) {
  if (!prevCollidedObjects) return false;
  const [prevBulletId, prevEnemyShipId] = prevCollidedObjects.split("|");
  if (
    !coordinates.bullets[prevBulletId] ||
    !coordinates.enemyShips[prevEnemyShipId]
  )
    return false;
  const { x: prevBulletX, y: prevBulletY } = coordinates.bullets[prevBulletId];
  const { x: prevEnemyX, y: prevEnemyY } =
    coordinates.enemyShips[prevEnemyShipId];
  if (
    prevBulletX >= prevEnemyX &&
    prevBulletX <= prevEnemyX + ENEMY_SHIP_WIDTH &&
    prevBulletY <= prevEnemyY + ENEMY_SHIP_HEIGHT
  ) {
    delete coordinates.enemyShips[prevEnemyShipId];
    delete coordinates.bullets[prevBulletId];
    return coordinates;
  }
  return false;
}

function detectCollision(coordinates) {
  const duplicateDetectedCoordinates = shouldSkipDetection(coordinates);
  if (duplicateDetectedCoordinates) {
    return;
  }
  Object.keys(coordinates.bullets).forEach((bulletId) => {
    const { x, y } = coordinates.bullets[bulletId];
    Object.keys(coordinates.enemyShips).forEach((enemyShipId) => {
      const { x: enemyX, y: enemyY } = coordinates.enemyShips[enemyShipId];
      if (
        x >= enemyX &&
        x <= enemyX + ENEMY_SHIP_WIDTH &&
        y <= enemyY + ENEMY_SHIP_HEIGHT
      ) {
        delete coordinates.enemyShips[enemyShipId];
        delete coordinates.bullets[bulletId];
        collidedObjects = [bulletId, enemyShipId].join("|");
        if (prevCollidedObjects != collidedObjects) {
          postMessage(
            JSON.stringify({
              message: "COORDINATES_POST_COLLISION",
              data: coordinates,
            })
          );
          prevCollidedObjects = collidedObjects;
        }
      }
    });
  });
}

self.onmessage = function (event) {
  const { data } = event;
  const { message, coordinates } = JSON.parse(data);
  switch (message) {
    case "PAINT":
      detectCollision(coordinates);
      break;
    default:
      break;
  }
};
