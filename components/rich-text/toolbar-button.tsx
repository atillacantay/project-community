import { Stack } from "@/components/ui/stack";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { TooltipContentProps } from "@radix-ui/react-tooltip";

interface ToolbarButtonProps
  extends React.ComponentPropsWithoutRef<typeof Toggle> {
  ref?: React.RefObject<HTMLButtonElement>;
  isActive?: boolean;
  tooltip?: string;
  tooltipOptions?: TooltipContentProps;
}

export function ToolbarButton({
  ref,
  isActive,
  children,
  tooltip,
  className,
  tooltipOptions,
  ...props
}: ToolbarButtonProps) {
  const toggleButton = (
    <Toggle
      size="sm"
      ref={ref}
      className={cn("size-8 p-0", { "bg-accent": isActive }, className)}
      {...props}
    >
      {children}
    </Toggle>
  );

  if (!tooltip) {
    return toggleButton;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{toggleButton}</TooltipTrigger>
        <TooltipContent {...tooltipOptions}>
          <Stack className="flex flex-col items-center text-center">
            {tooltip}
          </Stack>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
