import { ToolbarButton } from "@/components/rich-text/toolbar-button";
import { Separator } from "@/components/ui/separator";
import { Copy, ExternalLink, Unlink } from "lucide-react";
import { useCallback, useState } from "react";

interface LinkPopoverBlockProps {
  url: string;
  onClear: () => void;
  onEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function LinkPopoverBlock({
  url,
  onClear,
  onEdit,
}: LinkPopoverBlockProps) {
  const [copyTitle, setCopyTitle] = useState<string>("Copy");

  const handleCopy = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopyTitle("Copied!");
          setTimeout(() => setCopyTitle("Copy"), 1000);
        })
        .catch(console.error);
    },
    [url]
  );

  const handleOpenLink = useCallback(() => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, [url]);

  return (
    <div className="flex h-10 overflow-hidden rounded bg-background p-2 shadow-lg">
      <div className="inline-flex items-center gap-1">
        <ToolbarButton
          tooltip="Edit link"
          onClick={onEdit}
          className="w-auto px-2"
        >
          Edit link
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton
          tooltip="Open link in a new tab"
          onClick={handleOpenLink}
        >
          <ExternalLink className="size-4" />
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton tooltip="Clear link" onClick={onClear}>
          <Unlink className="size-4" />
        </ToolbarButton>
        <Separator orientation="vertical" />
        <ToolbarButton
          tooltip={copyTitle}
          onClick={handleCopy}
          tooltipOptions={{
            onPointerDownOutside: (e) => {
              if (e.target === e.currentTarget) e.preventDefault();
            },
          }}
        >
          <Copy className="size-4" />
        </ToolbarButton>
      </div>
    </div>
  );
}
