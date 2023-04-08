//Avoid the browser throttle the timer if it's running in the background to conserve resources.
interface startTimerProps{
  alarm_time: number;
}

let timerId: NodeJS.Timeout;

function startTimer(args: startTimerProps) {
  const alarm_time = args.alarm_time;
  const start_time = new Date().getTime();
  timerId = setInterval(() => {
    const time_passed = Math.floor((new Date().getTime() - start_time)/ 1000);
    const time_remain = alarm_time - time_passed;
    postMessage(time_remain); //time difference
  }, 1000);
}

function stopTimer() {
  clearInterval(timerId);
}

/* eslint-disable-next-line no-restricted-globals */
const webWorker: Worker = self as any;

webWorker.onmessage = (event: MessageEvent) => {
  switch (event.data.type) {
      case 'start':
        startTimer(event.data.args);
        break;
      case 'stop':
        stopTimer();
        break;

  }
};

export {};