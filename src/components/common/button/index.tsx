import { clsxm } from "@/utils/clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded font-medium";

  const variantStyles = {
    primary:
      "bg-primary text-white hover:bg-primary/80 focus:outline-primary/50",
    secondary:
      "bg-secondary text-white hover:bg-secondary/80 focus:outline-secondary/50",
    danger: "bg-error text-white hover:bg-error/80 focus:outline-error/50",
    outline:
      "bg-transparent border border-primary text-primary hover:bg-primary/10 focus:outline-primary/50",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <button
      className={clsxm(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        isLoading ? "cursor-not-allowed opacity-75" : "",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      )}
      {icon && !isLoading && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};
