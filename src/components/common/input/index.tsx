import { clsxm } from "@/utils/clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Optional label for the input
  error?: string; // Error message
  icon?: React.ReactNode; // Optional leading icon
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            {icon}
          </div>
        )}
        <input
          className={clsxm(
            "w-full rounded-md border px-3 py-2 text-sm placeholder-neutral-400",
            icon ? "pl-10" : "",
            error
              ? "border-danger focus:outline-danger focus:border-danger"
              : "border-neutral-300 focus:outline-primary focus:border-primary",
            props.disabled ? "bg-neutral-100 cursor-not-allowed" : "",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
};
