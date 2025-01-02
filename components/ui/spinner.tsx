import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { RefObject } from "react";

interface SpinnerProps extends React.ComponentPropsWithoutRef<typeof Loader2> {
  ref?: RefObject<SVGSVGElement>;
}

export function Spinner({ ref, className, type, ...props }: SpinnerProps) {
  return (
    <Loader2
      ref={ref}
      type={type}
      className={cn("animate-spin", className)}
      {...props}
    />
  );
}
