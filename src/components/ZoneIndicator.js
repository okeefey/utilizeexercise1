import React from "react";

export default function ZoneIndicator({ heartRate, min, max }) {
  const inZone = heartRate >= min && heartRate <= max;

  return (
    <div className={`zone-indicator ${inZone ? "in-zone" : "out-zone"}`}>
      {inZone ? "In Zone" : "Out of Zone"}
    </div>
  );
}
