import React from "react";

const DashboardMainSecurityFirewallCircle = ({
  status = "active",
  score = "75%",
  size = 64,
  strokeWidth = 12,
}) => {
  // Colors and gap angles for each state
  const config = {
    active: {
      bg: "#FAFAFA", // zinc-50 background
      progress: "#D4D4D8", // zinc-300 progress
      gapAngle: 275, // top-right
    },
    hacked: {
      bg: "#FAFAFA", // zinc-50 background
      progress: "#F43F5E33", // rose-500 progress
      gapAngle: 300, // slightly bottom-right
    },
  };

  // Get numeric value from score
  let value = parseInt(score.replace("%", ""), 10);

  // Normalize value for all below 100 to avoid rounded ends touching
  if (value < 100) {
    value = Math.max(0, value - 7); // subtract a few percent for visual gap
  }

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  // Pick colors and gap angle based on status
  const { bg, progress, gapAngle } = config[status] || config.active;

  // Calculate dynamic rotation so gap is always at desired angle
  const arcLength = 360 * (value / 100);
  const rotation = gapAngle - arcLength;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={bg}
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Progress Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={progress}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(${rotation} ${size / 2} ${size / 2})`}
      />
    </svg>
  );
};

export default DashboardMainSecurityFirewallCircle;
