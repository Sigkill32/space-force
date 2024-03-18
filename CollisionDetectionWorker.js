const ENEMY_SHIP_WIDTH = 20;
const ENEMY_SHIP_HEIGHT = 10;

function detectCollision(coordinates) {
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
        postMessage(
          JSON.stringify({
            message: "COORDINATES_POST_COLLISION",
            data: coordinates,
          })
        );
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
