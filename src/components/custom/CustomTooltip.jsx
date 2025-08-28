import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export default function CustomTooltip({
  children,
  content,
  side = "top",
  sideOffset = 6,
  delayDuration = 0,
  arrowPosition = "middle", // 'left', 'right', 'middle'
  arrowOffset = 4, // Distance from edge in pixels (default 4px)
  arrowHeight = 14,
  arrowWidth = 8,
  zIndex = 99999,
  asChild = false, // <-- add this line
  ...props
}) {
  // Calculate align and alignOffset based on arrowPosition
  const getAlignmentProps = () => {
    switch (arrowPosition) {
      case "left":
        return {
          align: "start",
          alignOffset: -arrowOffset, // Negative to move away from the very edge
        };
      case "right":
        return {
          align: "end",
          alignOffset: arrowOffset, // Positive to move away from the very edge
        };
      case "middle":
      default:
        return {
          align: "center",
          alignOffset: 0, // Keep centered
        };
    }
  };

  const alignmentProps = getAlignmentProps();

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild={asChild}>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            sideOffset={sideOffset}
            align={alignmentProps.align}
            alignOffset={alignmentProps.alignOffset}
            className={`
              bg-zinc-950 text-zinc-50 font-inter font-normal text-[10px] leading-tight
              border-0 border-none outline-0 outline-none ring-0 px-3 py-1.5 rounded select-none
              animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out
              data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
              data-[side=bottom]:slide-in-from-top-2
              data-[side=left]:slide-in-from-right-2
              data-[side=right]:slide-in-from-left-2
              data-[side=top]:slide-in-from-bottom-2
            `}
            style={{
              boxShadow: "0px 1px 2px 0px #0000000F, 0px 1px 3px 0px #0000001A",
              letterSpacing: "0%",
              fontStyle: "normal",
              zIndex: zIndex,

              border: "none",
              outline: "none",
            }}
            {...props}
          >
            {typeof content === "string" && content.includes("\n")
              ? content.split("\n").map((line, index) =>
                  line.trim().length > 0 ? (
                    <React.Fragment key={index}>
                      {line}
                      {index < content.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ) : null
                )
              : content}
            <TooltipPrimitive.Arrow
              className="fill-zinc-950"
              width={arrowWidth}
              height={arrowHeight}
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
