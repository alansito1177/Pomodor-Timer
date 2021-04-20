import React, { useState } from "react";
import classNames from "../utils/class-names";

function TimerControlls({
    isSessionActive,
    setIsSessionActive,
    setTimeRemaining,
    setIsTimerRunning,
    setMode,
    focusDuration,
    isTimerRunning
}) {
function playPause() {
    // if the session is false, reset our timeRemaining to default
    if (!isSessionActive) {
      setIsSessionActive(true);
      setTimeRemaining(focusDuration * 60); // should be in seconds
    }
    setIsTimerRunning((prevState) => !prevState);
  }

  // reset everything
  const stopTimer = () => {
    setIsSessionActive(false);
    setIsTimerRunning(false);
    setMode("focus");
  };

return(
<div className="row">
  <div className="col">
    <div
      className="btn-group btn-group-lg mb-2"
      role="group"
      aria-label="Timer controls"
    >
      <button
        type="button"
        className="btn btn-primary"
        data-testid="play-pause"
        title="Start or pause timer"
        onClick={playPause}
      >
        <span
          className={classNames({
            oi: true,
            "oi-media-play": !isTimerRunning,
            "oi-media-pause": isTimerRunning,
          })}
        />
      </button>
      {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
      <button
        type="button"
        className="btn btn-secondary"
        title="Stop the session"
        onClick={stopTimer}
        disabled={!isSessionActive}
      >
        <span className="oi oi-media-stop" />
      </button>
    </div>
  </div>
</div>)
}

export default TimerControlls;