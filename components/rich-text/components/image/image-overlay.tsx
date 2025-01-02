import { Spinner } from "@/components/ui/spinner";
import { Stack } from "@/components/ui/stack";

export function ImageOverlay() {
  return (
    <Stack
      justify="center"
      direction="horizontal"
      align="center"
      className={
        "absolute inset-0 rounded-md bg-black/60 opacity-100 transition-opacity"
      }
    >
      <Spinner className="size-7" />
    </Stack>
  );
}
