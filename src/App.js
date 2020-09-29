import React, { useState, useRef } from "react";
import "./App.css";

function padTime(time) {
  return time.toString().padStart(2, "0");
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [title, setTitle] = useState("Let's get it!");
  const [isRunning, setIsRunning] = useState(false);
  //We use useRef because if we declard a var and set setInterval to it, it would clear out everytime the component re-renders
  const intervalRef = useRef(null);

  function startTimer() {
    if (intervalRef.current != null) return;

    setTitle("You are doing great!");
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;

        return 0;
      });
    }, 1000);
  }

  function stopTimer() {
    setTitle("Awesome job!");
    setIsRunning(false);
    if (intervalRef.current == null) return;
    clearInterval(intervalRef.current);
  }

  function resetTimer() {
    setTitle("Ready for another round?");
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimeLeft(25 * 60);
    setIsRunning(false);
  }

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  return (
    <div className="app">
      <h2>{title}</h2>

      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
