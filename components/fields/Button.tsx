import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
}) => {
  const baseClasses =
    "rounded focus:outline-none focus:ring focus:ring-opacity-50";
  const variantClasses = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
  };
  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${
    sizeClasses[size]
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
