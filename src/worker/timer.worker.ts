let timerId: NodeJS.Timeout;

function startTimer() {
  const start_time = new Date().getTime();
  timerId = setInterval(() => {
    postMessage(Math.floor((new Date().getTime() - start_time)/ 1000)); //time difference
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
}

/* eslint-disable-next-line no-restricted-globals */
const webWorker: Worker = self as any;

webWorker.onmessage = (event: MessageEvent) => {
  switch (event.data) {
      case 'start':
        startTimer();
        break;
      case 'stop':
        stopTimer();
        break;

  }
};

export {};