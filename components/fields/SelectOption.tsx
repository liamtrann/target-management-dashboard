import React from "react";

interface SelectOptionProps {
  options: { value: string | number | null; label: string }[];
  onChange: (value: string | null) => void;
  value: string | number | null;
  defaultAll?: boolean;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  options,
  onChange,
  value,
  defaultAll,
}) => {
  return (
    <div className="mb-4">
      <select
        onChange={(e) =>
          onChange(e.target.value === "" ? null : e.target.value)
        }
        className="border border-gray-500 bg-gray rounded-md p-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        value={value ?? ""}
      >
        {defaultAll && <option value="">All</option>}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value === null ? "Null" : option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOption;
