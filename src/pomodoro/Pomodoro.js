import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { minutesToDuration } from "../utils/duration";
import Progress from "./Progress";
import TimerControlls from "./TimerControlls";
import Duration from "./Duration";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60);
  const [mode, setMode] = useState("focus");
  const [isSessionActive, setIsSessionActive] = useState(false);

  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      if (timeRemaining === 0) {
         new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
        const duration = mode === "focus" ? breakDuration : focusDuration; // select the correct time duration
        setTimeRemaining(duration * 60); // set the time remaining to the new duration;
        setMode((prevMode) => (prevMode === "focus" ? "break" : "focus"));
        return; // return will end the callback function and re-render the component
      }
      setTimeRemaining((currentTimeRemaining) => currentTimeRemaining - 1);
    },
    isTimerRunning ? 100 : null
  );

  // useInterval(callback, duration)



  const decreaseFocus = () => {
    setFocusDuration(focusDuration - 5) // take the previous focusDuration value and subtract 5
  };

  const increaseFocus = () => {
    setFocusDuration(focusDuration + 5) // take the previous focusDuration value and add 5
  };

  const decreaseBreak = () => {
    setBreakDuration(breakDuration - 1)
  };

  const increaseBreak = () => {
    setBreakDuration(breakDuration + 1)
  };

  return (
    <div className="pomodoro">
      <Duration 
      minutesToDuration={minutesToDuration}
      focusDuration={focusDuration}
      decreaseFocus={decreaseFocus}
      isSessionActive={isSessionActive}
      isTimerRunning={isTimerRunning}
      increaseFocus={increaseFocus}
      increaseBreak={increaseBreak}
      decreaseBreak={decreaseBreak}
      breakDuration={breakDuration}
      />

      
      <TimerControlls 
      isSessionActive={isSessionActive}
      setIsSessionActive={setIsSessionActive}
      setTimeRemaining={setTimeRemaining}
      setIsTimerRunning={setIsTimerRunning}
      setMode={setMode}
      focusDuration={focusDuration}
      isTimerRunning={isTimerRunning}
      />

      <Progress
        mode={mode}
        isTimerRunning={isTimerRunning}
        timeRemaining={timeRemaining}
        isSessionActive={isSessionActive}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
      />
    </div>
  );
}

export default Pomodoro;
