import React from "react";

const DashboardMainManageWidgetCircle = ({
  score = 75,
  size = 30,
  strokeWidth = 4,
  scoreColor,
}) => {
  // Clamp score to 0–100 and ensure it's a number
  const numericScore =
    typeof score === "string" ? parseInt(score.replace("%", ""), 10) : score;
  const clampedScore = Math.min(Math.max(numericScore, 0), 100);

  const radius = size / 2;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  // Base compensation for round caps (full closure at 100)
  const capCompensationFactor = 0.98;
  const adjustedCircumference = circumference * capCompensationFactor;

  // Extra gap factor for <100% scores so caps never touch early
  const earlyGapFactor = clampedScore < 100 ? 0.97 : 1;
  const effectiveCircumference = adjustedCircumference * earlyGapFactor;

  const strokeDashoffset =
    effectiveCircumference - (clampedScore / 100) * effectiveCircumference;

  // Use prop color if provided, else compute
  const getColor = () => {
    if (scoreColor) return scoreColor;
    if (clampedScore >= 85) return "#22c55e66"; // green-500/40
    if (clampedScore >= 60) return "#f59e4266"; // amber-500/40
    return "#dc262666"; // red-600/40
  };

  // Rotation for the progress arc
  const getRotation = () => {
    return (strokeDashoffset / effectiveCircumference) * 360;
  };

  return (
    <svg width={size} height={size} className="block mx-auto">
      {/* Background ring */}
      <circle
        fill="transparent"
        stroke="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={effectiveCircumference}
        strokeDashoffset={0}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />

      {/* Progress ring */}
      <circle
        fill="transparent"
        stroke={getColor()}
        strokeWidth={strokeWidth}
        strokeDasharray={effectiveCircumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform={`rotate(${getRotation()} ${radius} ${radius})`}
      />

      {/* Score in center */}
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        fontSize="10"
        className="text-[10px] leading-[100%] text-[#18181B] font-medium"
      >
        {numericScore}
      </text>
    </svg>
  );
};

export default DashboardMainManageWidgetCircle;