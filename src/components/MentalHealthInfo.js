import React from "react";

export default function MentalHealthInfo({
  heartRate,
  timeInZone,
  targetHR,
  targetTime,
  averageHR,
}) {
  return (
    <div className="summary-card">
      <h2>Session Summary</h2>
      <p>Final Heart Rate: {heartRate} bpm</p>
      <p>Average Heart Rate: {averageHR} bpm</p> {}
      <p>Time in Target Zone: {timeInZone} seconds</p>
      <p>Target Zone: {Math.round(targetHR)} bpm ± 40</p>
      <p>Target Time: {Math.round(targetTime / 60)} minutes</p>


      {timeInZone >= targetTime ? (
        <p className="success"> Great job! You hit your training goal.</p>
      ) : (
        <p className="info">
        Keep training! More time in your target zone will maximize benefits.
        </p>
      )}
    </div>
  );
}
