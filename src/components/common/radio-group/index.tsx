import { clsxm } from "@/utils/clsx";

interface RadioOption {
  label: string; // Label for the radio button
  value: string; // Value associated with the button
}

interface RadioGroupProps {
  name: string; // Name for the radio group
  options: RadioOption[]; // Array of radio button options
  value?: string; // Current selected value
  onChange?: (value: string) => void; // Callback for value change
  error?: string; // Optional error message
  direction?: "horizontal" | "vertical"; // Layout direction
  className?: string; // Custom classes for the container
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  error,
  direction = "vertical",
  className,
}) => {
  const layoutClasses =
    direction === "horizontal"
      ? "flex flex-row space-x-2"
      : "flex-col space-y-2";

  return (
    <div
      className={clsxm(
        "space-y-2",
        direction === "horizontal" && "space-y-0",
        className
      )}
    >
      <div className={clsxm("flex", layoutClasses)}>
        {options.map((option) => (
          <label
            key={option.value}
            className={clsxm(
              "flex items-center space-x-3 p-2 rounded-md cursor-pointer border",
              value === option.value
                ? "bg-primary-light border-primary text-primary-foreground"
                : "bg-white border-neutral-300",
              "hover:bg-neutral-100"
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange?.(option.value)}
              className={clsxm(
                "h-4 w-4 cursor-pointer",
                value === option.value
                  ? "accent-primary focus:accent-primary"
                  : "accent-neutral-400 focus:accent-neutral-300"
              )}
            />
            <span className="text-sm font-medium">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-sm text-danger mt-1">{error}</p>}
    </div>
  );
};
