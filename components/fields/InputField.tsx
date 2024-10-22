import React from "react";

interface InputFieldProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`text-gray-500 border border-gray-300 rounded-md p-2 ${className}`}
    />
  );
};

export default InputField;
