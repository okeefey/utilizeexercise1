import React, { useState, useEffect } from "react";
import HeartRateDisplay from "./components/HeartRateDisplay";
import Timer from "./components/Timer";
import ZoneIndicator from "./components/ZoneIndicator";
import MentalHealthInfo from "./components/MentalHealthInfo";
import "./index.css";

const TARGET_PERCENT = 0.85; // 85% of max HR
const TARGET_TIME = 1800; // 30 minutes in seconds
const RANGE_OFFSET = 40; // ±40 bpm allowed

export default function App() {
  const [age, setAge] = useState("");
  const [maxHR, setMaxHR] = useState(null);
  const [targetHR, setTargetHR] = useState(null);

  const [heartRate, setHeartRate] = useState(0);
  const [timeInZone, setTimeInZone] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);


  const [totalHR, setTotalHR] = useState(0);
  const [hrCount, setHrCount] = useState(0);

  const handleAgeSubmit = (e) => {
    e.preventDefault();
    const max = 220 - parseInt(age, 10);
    setMaxHR(max);
    setTargetHR(max * TARGET_PERCENT);
  };

  // Simulated HR
  useEffect(() => {
    if (!sessionActive) return;
    const interval = setInterval(() => {
      const simulatedHR = Math.floor(120 + Math.random() * 70); // 120–190 bpm
      setHeartRate(simulatedHR);

      // update average HR trackers
      setTotalHR((prev) => prev + simulatedHR);
      setHrCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionActive]);

  // Track time in zone
  useEffect(() => {
    if (!sessionActive || !targetHR) return;

    const minZone = targetHR - RANGE_OFFSET;
    const maxZone = targetHR + RANGE_OFFSET;

    let interval;
    if (heartRate >= minZone && heartRate <= maxZone) {
      interval = setInterval(() => {
        setTimeInZone((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [heartRate, sessionActive, targetHR]);

  const startSession = () => {
    setSessionActive(true);
    setTimeInZone(0);
    setTotalHR(0);
    setHrCount(0);
  };

  const stopSession = () => {
    setSessionActive(false);
  };

  const averageHR = hrCount > 0 ? Math.round(totalHR / hrCount) : 0;

  return (
    <div className="app-container">
      <h1>HIIT Heart Rate Tracker</h1>

      {!maxHR && (
        <form onSubmit={handleAgeSubmit} className="age-form">
          <label>
            Enter your age:{" "}
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>
          <button type="submit">Set Target</button>
        </form>
      )}

      {maxHR && (
        <>
          <p>
            Max HR: {maxHR} bpm | Target Zone: {Math.round(targetHR - RANGE_OFFSET)}–
            {Math.round(targetHR + RANGE_OFFSET)} bpm (85% ± 40)
          </p>

          <HeartRateDisplay heartRate={heartRate} />
          <Timer timeInZone={timeInZone} targetTime={TARGET_TIME} />
          <ZoneIndicator
            heartRate={heartRate}
            min={targetHR - RANGE_OFFSET}
            max={targetHR + RANGE_OFFSET}
            timeInZone={timeInZone}
            targetTime={TARGET_TIME}
          />

          <div className="button-row">
            {!sessionActive ? (
              <button onClick={startSession} className="start-btn">
                Start
              </button>
            ) : (
              <button onClick={stopSession} className="stop-btn">
                Stop
              </button>
            )}
          </div>

          {!sessionActive && hrCount > 0 && (
            <MentalHealthInfo
              heartRate={heartRate}
              timeInZone={timeInZone}
              targetHR={targetHR}
              targetTime={TARGET_TIME}
              averageHR={averageHR} // 👈 pass avg HR
            />
          )}
        </>
      )}
    </div>
  );
}
