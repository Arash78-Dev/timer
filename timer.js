const start = document.getElementById("start");
const pause = document.getElementById("pause");
const stops = document.getElementById("stop");

const timer = document.getElementById("timer");

let timerInterval;

const initialTimers = {
  h: 0,
  m: 0,
  s: 0,
  mil: 0,
};

const timers = { ...initialTimers };

const numberToString = (num, numberOfdigit = 2) =>
  num.toLocaleString("EN-US", { minimumIntegerDigits: numberOfdigit });

const representTime = (timers) => {
  const { h, m, s, mil } = timers;

  timer.innerText = `${numberToString(h)}:${numberToString(m)}:${numberToString(
    s
  )}:${numberToString(mil, 3)}`;
};

const addTime = () => {
  let since = new Date().getTime();
  since = since - timers.mil;
  
  timerInterval = setInterval(() => {
    const now = new Date().getTime();

    timers.mil = now - since;

    if (timers.mil >= 1000) {
      timers.s += 1;
      timers.mil = 0;
      since = new Date().getTime();
    }

    if (timers.s == 60) {
      timers.m += 1;
      timers.s = 0;
    }

    if (timers.m == 60) {
      timers.h += 1;
      timers.m = 0;
    }

    representTime(timers);
  }, 1);

  start.disabled = true;
};

const pauseTime = () => {
  clearInterval(timerInterval);
  start.disabled = false;
};

const stopTime = () => {
  clearInterval(timerInterval);
  start.disabled = false;
  timers.h = 0;
  timers.m = 0;
  timers.s = 0;
  timers.mil = 0;
  representTime(timers);
};

start.addEventListener("click", addTime);
pause.addEventListener("click", pauseTime);
stops.addEventListener("click", stopTime);
