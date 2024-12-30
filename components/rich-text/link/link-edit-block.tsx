import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useCallback, useImperativeHandle, useRef, useState } from "react";

export interface LinkEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.RefObject<HTMLDivElement>;
  defaultUrl?: string;
  defaultText?: string;
  onSave: (url: string, text?: string, isNewTab?: boolean) => void;
}

export function LinkEditBlock({
  ref,
  onSave,
  defaultUrl,
  defaultText,
  className,
}: LinkEditorProps) {
  const formRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState(defaultUrl || "");
  const [text, setText] = useState(defaultText || "");

  const handleSave = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (formRef.current) {
        const isValid = Array.from(
          formRef.current.querySelectorAll("input")
        ).every((input) => input.checkValidity());

        if (isValid) {
          onSave(url, text);
        } else {
          formRef.current.querySelectorAll("input").forEach((input) => {
            if (!input.checkValidity()) {
              input.reportValidity();
            }
          });
        }
      }
    },
    [onSave, url, text]
  );

  useImperativeHandle(ref, () => formRef.current as HTMLDivElement);

  return (
    <div ref={formRef}>
      <div className={cn("space-y-4", className)}>
        <div className="space-y-1">
          <Label>URL</Label>
          <Input
            type="url"
            required
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label>Display Text (optional)</Label>
          <Input
            type="text"
            placeholder="Enter display text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
