const time = document.querySelector(".container-top--time");

// 時間情報
function timeHandler() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  time.innerHTML = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
  timeHandler();
  setInterval(timeHandler, 1);
}

init();
