"use client";

import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function MultiSelect({
  options = [],
  onValueChange = () => {},
  defaultValue = [],
  placeholder = "Select items",
  maxCount = 3,
  className = "",
  badgeClassName = "",
  placeholderClassName = "",
  panelClassName = "",
  triggerClassName = "",
  disabled = false,
  renderItem = null,
  renderBadge = null,
}) {
  const [selectedValues, setSelectedValues] = useState(defaultValue);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    if (JSON.stringify(selectedValues) !== JSON.stringify(defaultValue)) {
      setSelectedValues(defaultValue);
    }
  }, [defaultValue]);

  const toggleOption = (option) => {
    const newSelectedValues = selectedValues.includes(option.value)
      ? selectedValues.filter((value) => value !== option.value)
      : [...selectedValues, option.value];
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  const removeOption = (optionValue) => {
    const newSelectedValues = selectedValues.filter(
      (value) => value !== optionValue
    );
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  const handleClear = () => {
    setSelectedValues([]);
    onValueChange([]);
  };

  const defaultRenderItem = (option, isSelected) => (
    <div className="flex items-center justify-between w-full py-2 px-3 hover:bg-gray-50 cursor-pointer">
      <div className="flex items-center gap-3">
        {option.icon && (
          <span className={cn("flex-shrink-0", option.iconClassName)}>
            {option.icon}
          </span>
        )}
        <span className={cn("text-sm", option.textClassName)}>
          {option.label}
        </span>
      </div>
      {isSelected && <Check className="h-4 w-4 text-green-600 flex-shrink-0" />}
    </div>
  );

  const defaultRenderBadge = (option, onRemove) => (
    <Badge
      key={option.value}
      className={cn(
        "m-1 bg-blue-100 text-blue-900 hover:bg-blue-200 flex items-center gap-1",
        badgeClassName,
        option.badgeClassName
      )}
    >
      {option.icon && (
        <span className={cn("flex-shrink-0", option.iconClassName)}>
          {option.icon}
        </span>
      )}
      <span>{option.label}</span>
      <button
        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onRemove();
          }
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove();
        }}
      >
        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
      </button>
    </Badge>
  );

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          variant="outline"
          size="sm"
          className={cn(
            "flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit",
            triggerClassName
          )}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          disabled={disabled}
        >
          {selectedValues.length > 0 ? (
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-wrap items-center">
                {selectedValues.slice(0, maxCount).map((value) => {
                  const option = options.find((o) => o.value === value);
                  if (!option) return null;

                  return renderBadge
                    ? renderBadge(option, () => removeOption(value))
                    : defaultRenderBadge(option, () => removeOption(value));
                })}
                {selectedValues.length > maxCount && (
                  <Badge
                    className={cn(
                      "bg-transparent text-foreground border-foreground/1 hover:bg-transparent",
                      badgeClassName
                    )}
                  >
                    {`+ ${selectedValues.length - maxCount} more`}
                    <button
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Remove extra items
                        const newSelectedValues = selectedValues.slice(
                          0,
                          maxCount
                        );
                        setSelectedValues(newSelectedValues);
                        onValueChange(newSelectedValues);
                      }}
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="ml-2 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleClear();
                  }}
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
                <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full mx-auto">
              <span
                className={cn(
                  "text-sm text-muted-foreground",
                  placeholderClassName
                )}
              >
                {placeholder}
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-auto p-0 min-w-[200px]", panelClassName)}
        align="start"
        onEscapeKeyDown={() => setIsPopoverOpen(false)}
      >
        <div className="max-h-60 overflow-auto">
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            return (
              <div
                key={option.value}
                onClick={() => toggleOption(option)}
                className={cn(
                  "cursor-pointer transition-colors",
                  option.className
                )}
              >
                {renderItem
                  ? renderItem(option, isSelected)
                  : defaultRenderItem(option, isSelected)}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
