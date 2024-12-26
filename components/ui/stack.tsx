import { cn } from "@/lib/utils";

export interface StackProps<T extends React.ElementType = "div"> {
  as?: T; // Customizable element type
  direction?: "vertical" | "horizontal";
  spacing?: number; // Spacing between children (in Tailwind's spacing scale, e.g., 1, 2, 4)
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Stack = <T extends React.ElementType = "div">({
  as,
  direction = "vertical",
  align = "stretch",
  justify = "start",
  wrap = false,
  className,
  children,
  ...props
}: StackProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof StackProps<T>>) => {
  const Component = as || "div";

  const flexDirection = direction === "vertical" ? "flex-col" : "flex-row";
  const alignItems = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  }[align];
  const justifyContent = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  }[justify];

  return (
    <Component
      className={cn(
        "flex",
        flexDirection,
        alignItems,
        justifyContent,
        wrap ? "flex-wrap" : "",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
