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
    xs: iconOnly ? "h-6 w-6" : "h-6 px-2 text-[0.65rem] gap-1",
    sm: iconOnly ? "h-7 w-7" : "h-7 px-3 text-xs gap-1.5",
    md: iconOnly ? "h-9 w-9" : "h-9 px-4 text-sm gap-1.5",
    lg: iconOnly ? "h-10 w-10" : "h-10 px-5 text-base gap-2",
    xl: iconOnly ? "h-12 w-12" : "h-12 px-6 text-lg gap-2",
  };

  const iconSizes = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
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
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center bg-red-500 text-white text-[0.6rem] font-semibold">
          {badge}
        </span>
      )}
    </button>
  );
}
