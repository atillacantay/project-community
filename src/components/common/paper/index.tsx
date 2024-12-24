import { clsxm } from "@/utils/clsx";
import { Stack, type StackProps } from "../stack";

interface PaperProps extends StackProps {
  shadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "inner" | "none";
  children: React.ReactNode;
}

const Paper: React.FC<PaperProps> = ({
  children,
  shadow = "md",
  className,
  ...rest
}) => {
  const shadowClasses = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
    inner: "shadow-inner",
    none: "shadow-none",
  };

  return (
    <Stack
      direction="vertical"
      justify="center"
      align="center"
      spacing={4}
      className={clsxm(
        "p-6 border border-neutral-300 rounded-lg bg-white",
        shadowClasses[shadow],
        className
      )}
      {...rest}
    >
      {children}
    </Stack>
  );
};

export default Paper;
