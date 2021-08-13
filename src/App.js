import React, { useState, useEffect } from "react";

function App() {
  const [time, setTime] = useState(1 * 60);
  const [start, setStart] = useState(false);
  const [finished, setFinished] = useState(false);
  const [breakLength] = useState(["00:00"]);

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  useEffect(() => {
    if (start) {
      document.title = `${formatTime(time)} | Timer`;
      if (formatTime(time) === breakLength[0]) {
        document.title = "Reminder!";
        console.log("time is end");
        setFinished(true);
      } else {
        setTimeout(() => {
          setTime(time - 1);
        }, 1000);
      }
    } else {
      document.title = "Timer is stopped.";
    }
  });

  const startButton = () => {
    setStart(!start);
  };

  const refreshButton = () => {
    window.location.reload();
  };
  return (
    <>
      <p>{formatTime(time)}</p>
      {finished ? (
        <button style={{ marginTop: "10px" }} onClick={() => refreshButton()}>
          Refresh
        </button>
      ) : (
        <button style={{ marginTop: "10px" }} onClick={() => startButton()}>
          {start ? "Stop" : "Start"}
        </button>
      )}
    </>
  );
}

export default App;
