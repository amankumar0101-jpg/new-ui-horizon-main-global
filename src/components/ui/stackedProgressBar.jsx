import React from 'react';
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * StackedProgressBar - A flexible progress bar component that displays multiple segments
 * 
 * @param {Object} props - Component props
 * @param {Array<Object>} props.data - Array of segments to display
 * @param {string} props.data[].title - Display name for the segment (shown in tooltip)
 * @param {number} props.data[].value - Numeric value for the segment
 * @param {string} props.data[].color - Color for the segment (CSS color or Tailwind class like 'bg-blue-500')
 * @param {number} [props.total] - Optional total value. If not provided, sum of all values is used
 * @param {string} [props.height='h-4'] - Tailwind height class for the progress bar
 * @param {string} [props.className] - Additional CSS classes for the container
 * 
 * @example
 * // Basic usage with automatic total calculation
 * <StackedProgressBar 
 *   data={[
 *     { title: "Completed", value: 75, color: "bg-green-500" },
 *     { title: "In Progress", value: 20, color: "bg-yellow-500" },
 *     { title: "Pending", value: 5, color: "bg-red-500" }
 *   ]}
 * />
 * 
 * @example
 * // With custom total and CSS colors
 * <StackedProgressBar 
 *   data={[
 *     { title: "Sales", value: 80, color: "#10b981" },
 *     { title: "Marketing", value: 45, color: "bg-blue-500" }
 *   ]}
 *   total={200}
 *   height="h-6"
 * />
 * 
 * @example
 * // Overflow handling - when sum exceeds total, shows warning
 * <StackedProgressBar 
 *   data={[
 *     { title: "Over Budget", value: 120, color: "bg-red-600" }
 *   ]}
 *   total={100}
 * />
 * 
 * Features:
 * - Automatic percentage calculation from raw values
 * - Hover tooltips showing exact values and percentages
 * - Overflow detection with visual warning (red ring)
 * - Accessibility support with ARIA attributes
 * - Responsive design with Tailwind CSS
 * - Smooth transitions and animations
 */
const StackedProgressBar = ({
  data,
  total,
  height = 'h-4',
  className,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className={cn("w-full bg-gray-200 rounded-full", height, className)}>
      </div>
    );
  }

  const sumOfValues = data.reduce((sum, item) => sum + item.value, 0);
  const calculatedTotal = total || sumOfValues;
  
  if (calculatedTotal === 0) {
    return (
      <div className={cn("w-full bg-gray-200 rounded-full", height, className)}>
      </div>
    );
  }

  const exceedsTotal = sumOfValues > calculatedTotal;
  const effectiveTotal = exceedsTotal ? sumOfValues : calculatedTotal;

  return (
    <TooltipProvider>
      <div
        className={cn(
          "w-full bg-gray-200 rounded-full relative overflow-hidden flex",
          height,
          className,
          exceedsTotal ? "ring-2 ring-red-400" : ""
        )}
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={sumOfValues}
      >
        {data.map((item, index) => {
          const percentage = (item.value / effectiveTotal) * 100;
          const originalPercentage = total ? (item.value / calculatedTotal) * 100 : percentage;
          
          const isColorClass = item.color.startsWith('bg-');
          
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "h-full transition-all duration-300 ease-out",
                    isColorClass ? item.color : ""
                  )}
                  style={{
                    width: `${percentage}%`,
                    ...(!isColorClass && { backgroundColor: item.color })
                  }}
                  aria-label={`${item.title} progress: ${percentage.toFixed(0)}%`}
                ></div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {item.title}: {item.value} ({originalPercentage.toFixed(1)}%)
                  {exceedsTotal && <span className="text-red-400 ml-1">⚠️</span>}
                </p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default StackedProgressBar;