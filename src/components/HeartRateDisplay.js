import React from "react";

export default function HeartRateDisplay({ heartRate }) {
  return (
    <div className="heart-rate-display">
      ❤️ {heartRate} bpm
    </div>
  );
}
