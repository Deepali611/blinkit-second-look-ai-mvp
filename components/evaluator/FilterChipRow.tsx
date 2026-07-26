import React from "react";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterChipRowProps {
  options: FilterOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export function FilterChipRow({
  options,
  selectedValue,
  onSelect,
}: FilterChipRowProps) {
  return (
    <div className="filter-chip-row" role="group" aria-label="Filter events by failure type">
      {options.map((option) => {
        const isSelected = selectedValue === option.value;
        return (
          <button
            key={option.value}
            type="button"
            className={`filter-chip ${isSelected ? "filter-chip-selected" : "filter-chip-unselected"}`}
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default FilterChipRow;
