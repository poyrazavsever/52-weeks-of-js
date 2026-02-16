import { Icon } from "@iconify/react";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  badge?: string | number;
  icon?: string;
  iconPosition?: "left" | "right";
  iconOnly?: boolean;
  children?: ReactNode;
}

export default function Button({
  variant = "solid",
  size = "md",
  loading = false,
  badge,
  icon,
  iconPosition = "left",
  iconOnly = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-dashed";

  const variantStyles = {
    solid:
      "bg-red-600 text-white border-white/30 hover:bg-red-700 hover:border-white/40 focus:ring-red-600 disabled:bg-gray-300 disabled:border-gray-300",
    outline:
      "bg-transparent text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-white hover:border-white focus:ring-gray-900 disabled:border-gray-300 disabled:text-gray-300 disabled:hover:bg-transparent",
  };

  const sizeStyles = {
    xs: iconOnly ? "h-7 w-7" : "h-7 px-3 text-xs gap-1.5",
    sm: iconOnly ? "h-9 w-9" : "h-9 px-4 text-sm gap-2",
    md: iconOnly ? "h-11 w-11" : "h-11 px-6 text-base gap-2",
    lg: iconOnly ? "h-13 w-13" : "h-13 px-8 text-lg gap-2.5",
    xl: iconOnly ? "h-16 w-16" : "h-16 px-10 text-xl gap-3",
  };

  const iconSizes = {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 22,
    xl: 24,
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${isDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <>
          <Icon
            icon="svg-spinners:ring-resize"
            width={iconSizes[size]}
            height={iconSizes[size]}
          />
          {!iconOnly && <span>Loading...</span>}
        </>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <Icon
              icon={icon}
              width={iconSizes[size]}
              height={iconSizes[size]}
            />
          )}
          {!iconOnly && children}
          {icon && iconPosition === "right" && (
            <Icon
              icon={icon}
              width={iconSizes[size]}
              height={iconSizes[size]}
            />
          )}
        </>
      )}

      {badge && !loading && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-red-500 text-white text-xs font-bold">
          {badge}
        </span>
      )}
    </button>
  );
}
