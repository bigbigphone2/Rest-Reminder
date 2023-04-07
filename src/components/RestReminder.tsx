import { useState, useEffect, useMemo } from "react";
import {
  makeStyles,
} from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Theme,
  Box,
} from "@material-ui/core";
import CircularProgress from '@material-ui/core/CircularProgress';
import WorkIcon from '@material-ui/icons/Work';
import HotelIcon from '@material-ui/icons/Hotel';
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing(4),
    width: "100%",
    margin: '0% 0 0 0'
  },
  timer: {
    fontSize: "3rem",
    fontWeight: "bold",
    margin: theme.spacing(4),
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    margin: theme.spacing(2),
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: '0 1rem 0 1rem'
  },
  saveButton: {
    margin: theme.spacing(2),
  },
  icon: {
    fontSize: "10rem",
    color: 'secondary',
  },
  message: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginTop: theme.spacing(2),
  },
}));

interface RestReminderProps {
  isDarkMode: boolean;
  isSilentMode: boolean;
}
const RestReminder = ({isDarkMode, isSilentMode}: RestReminderProps) => {
    // const timeWorker = new TimerWorker();
    const timeWorker: Worker = useMemo(
      () => new Worker(new URL("../worker/timer.worker", import.meta.url)),
      []
    );
    const classes = useStyles();
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isResting, setIsResting] = useState<boolean>(false);
    const [workTime, setWorkTime] = useState<number>(60); // default work time of 60 minutes
    const [restTime, setRestTime] = useState<number>(5); // default rest time of 5 minutes
    const [remainingTime, setRemainingTime] = useState<number>(workTime* 60);
    const [shouldSwitch, setShouldSwitch] = useState<boolean>(false);
    const audio = new Audio(require("../assets/notification.mp3"));
  
    useEffect(() => {
      localStorage.setItem("isDarkMode", isDarkMode.toString());
    }, [isDarkMode]);

    useEffect(() => {
      if (remainingTime === 0) {
          setIsRunning(false);
          setShouldSwitch(true);
          setIsResting(!isResting);
          const time = isResting ? restTime : workTime;
          setRemainingTime(time * 60);
          timeWorker.postMessage('stop');
          if (!isSilentMode)
            audio.play();
      }
    }, [remainingTime]);
    
    const handleChangeWorkTime = (value: number) => {
      const time = value > 0 ? value : 1;
      setWorkTime(time);
      if (! isResting)
        setRemainingTime(time *60);
    };

    const handleChangeRestTime = (value: number) => {
      const time = value > 0 ? value : 1;
      setRestTime(time);
      if (isResting)
        setRemainingTime(time *60);
    };

    const handleStart = (isResting: boolean, workTime: number, restTime: number) => {
      setIsRunning(true);
      timeWorker.postMessage('start');
      timeWorker.addEventListener('message', (event: { data: number }) => {
        const time_passed = event.data;
        const alarm_time = (isResting ? restTime : workTime) * 60; // in secound
        setRemainingTime(time_passed < alarm_time ? alarm_time - time_passed : 0);
      });
    };

    const handleReset = ()=>{
      setIsRunning(false);
      timeWorker.postMessage('stop');
      setIsResting(false);
      setShouldSwitch(false);
      setRemainingTime(workTime *60);

    }

    const handleProgressBarChange = ()=>{
      const time = (isResting ? restTime : workTime) * 60;
      return ((time - remainingTime)/ time)  * 100;
    }
  
    return (
        <div className={classes.root}>
          <Box position="relative" display="inline-flex" justifyContent={"center"}>
            <CircularProgress 
              variant="determinate" 
              value={handleProgressBarChange()} 
              size="18rem" 
              color={isDarkMode ? 'secondary' : 'primary'}/>
            <Box
              top={-30}
              left={0}
              bottom={0}
              right={0}
              position="absolute"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {isResting 
                ? (
                  <div className={classes.message}>
                    <HotelIcon className={classes.icon} />
                    <div>
                      Time To Rest!
                    </div>
                  </div>
                ) 
                : (
                  <div className={classes.message}>
                    <WorkIcon className={classes.icon}/>
                    <div>
                      Time To Work!
                    </div>
                  </div>
              )}
            </Box>
          </Box>

          <div className={classes.timer}>
            {`${Math.floor(remainingTime / 60)
              .toString()
              .padStart(2, "0")}:${(remainingTime % 60).toString().padStart(2, "0")}`}
          </div>
          <div className={classes.inputContainer}>
            <TextField
              type="number"
              label="Work Time (mins)"
              value={workTime}
              disabled={isRunning}
              onChange={(e) => handleChangeWorkTime(Number(e.target.value))}
              className={classes.input}
            />
            <TextField
              type="number"
              label="Rest Time (mins)"
              value={restTime}
              disabled={isRunning}
              onChange={(e) => handleChangeRestTime(Number(e.target.value))}
              className={classes.input}
            />
          </div>
          <div className={classes.inputContainer}>
            <Button className={classes.button}
              variant="contained"
              color={isDarkMode ? 'secondary' : 'primary'}
              onClick={()=> handleStart(isResting, workTime, restTime)}
            >
              {shouldSwitch ? "Continue" : "Start"}
            </Button>
            <Button className={classes.button}
              variant="contained"
              color={isDarkMode ? 'secondary' : 'primary'}
              onClick={()=> handleReset()}
            >
              Reset
            </Button>
          </div>

        </div>
    );
  };
  
export default RestReminder;