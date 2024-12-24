import { clsxm } from "@/utils/clsx";
import React from "react";

type TypographyProps = {
  as?: keyof React.JSX.IntrinsicElements; // This allows different HTML tags (e.g., h1, p, span)
  className?: string; // Custom classes
  children: React.ReactNode; // Text/content inside the component
  size?: "sm" | "md" | "lg" | "xl" | "2xl"; // Font size variations
  weight?: "normal" | "bold" | "medium"; // Font weight
  align?: "left" | "center" | "right"; // Text alignment
};

const Typography: React.FC<TypographyProps> = ({
  as = "p",
  className = "",
  children,
  size = "md",
  weight = "normal",
  align = "left",
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    bold: "font-bold",
  };

  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const Tag = as; // Dynamically set the element based on `as` prop

  return (
    <Tag
      className={clsxm(
        "text-neutral-800",
        sizeClasses[size],
        weightClasses[weight],
        alignClasses[align],
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default Typography;
