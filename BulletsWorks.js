let timer = null;

function startGame() {
  timer = setInterval(() => {
    postMessage(JSON.stringify({ message: "SHOOT_BULLET", data: null }));
  }, 200);
}

self.onmessage = function (event) {
  const { data: eventData } = event;
  const { message, data } = JSON.parse(eventData);
  switch (message) {
    case "START_GAME":
      startGame();
      break;
    case "STOP_GAME":
      clearInterval(timer);
      postMessage(JSON.stringify({ message: "END_GAME", data: null }));
      break;
    default:
      clearInterval(timer);
      break;
  }
};
