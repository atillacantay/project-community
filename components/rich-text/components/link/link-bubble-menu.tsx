import type { ShouldShowProps } from "@/components/rich-text/types";
import type { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react";
import { useCallback, useState } from "react";
import { LinkEditBlock } from "./link-edit-block";
import { LinkPopoverBlock } from "./link-popover-block";

interface LinkBubbleMenuProps {
  editor: Editor;
}

interface LinkAttributes {
  href: string;
  target: string;
}

export function LinkBubbleMenu({ editor }: LinkBubbleMenuProps) {
  const [showEdit, setShowEdit] = useState(false);
  const [linkAttrs, setLinkAttrs] = useState<LinkAttributes>({
    href: "",
    target: "",
  });
  const [selectedText, setSelectedText] = useState("");

  const updateLinkState = useCallback(() => {
    const { from, to } = editor.state.selection;
    const { href, target } = editor.getAttributes("link");
    const text = editor.state.doc.textBetween(from, to, " ");

    setLinkAttrs({ href, target });
    setSelectedText(text);
  }, [editor]);

  const shouldShow = useCallback(
    ({ editor, from, to }: ShouldShowProps) => {
      if (from === to) {
        return false;
      }
      const { href } = editor.getAttributes("link");

      if (href) {
        updateLinkState();
        return true;
      }
      return false;
    },
    [updateLinkState]
  );

  const handleEdit = useCallback(() => {
    setShowEdit(true);
  }, []);

  const onSetLink = useCallback(
    (url: string, text?: string) => {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .insertContent({
          type: "text",
          text: text || url,
          marks: [
            {
              type: "link",
              attrs: {
                href: url,
                // target: "_blank",
              },
            },
          ],
        })
        .setLink({ href: url })
        .run();
      setShowEdit(false);
      updateLinkState();
    },
    [editor, updateLinkState]
  );

  const onUnsetLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setShowEdit(false);
    updateLinkState();
  }, [editor, updateLinkState]);

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      tippyOptions={{
        duration: 150,
        placement: "bottom-start",
        onHidden: () => setShowEdit(false),
      }}
    >
      {showEdit ? (
        <LinkEditBlock
          defaultUrl={linkAttrs.href}
          defaultText={selectedText}
          onSave={onSetLink}
          className="w-full min-w-80 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none"
        />
      ) : (
        <LinkPopoverBlock
          onClear={onUnsetLink}
          url={linkAttrs.href}
          onEdit={handleEdit}
        />
      )}
    </BubbleMenu>
  );
}
