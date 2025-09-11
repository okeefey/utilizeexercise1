import React from "react";

export default function Timer({ timeInZone, targetTime }) {
  const progress = Math.min((timeInZone / targetTime) * 100, 100);

  // format mm:ss
  const minutes = Math.floor(timeInZone / 60);
  const seconds = timeInZone % 60;
  const formatted = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="timer">
      <p>Time in Zone: {formatted}</p>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
