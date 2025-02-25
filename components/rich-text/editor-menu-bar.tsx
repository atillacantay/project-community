import { ToolbarButton } from "@/components/rich-text/toolbar-button";
import { Stack } from "@/components/ui/stack";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  CodeXml,
  ImageIcon,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
import { useRef } from "react";
import { LinkBubbleMenu } from "./components/link/link-bubble-menu";
import { LinkEditPopover } from "./components/link/link-edit-popover";

type EditorMenuBarProps = {
  editor: Editor | null;
  disabledExtensions?: string[];
};

export function EditorMenuBar({
  editor,
  disabledExtensions,
}: EditorMenuBarProps) {
  const isImageExtensionDisabled = disabledExtensions?.includes("image");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  const buttons = [
    {
      key: "bold",
      label: "Bold",
      icon: <Bold className="size-5" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      disabled: !editor.can().chain().focus().toggleBold().run(),
    },
    {
      key: "italic",
      label: "Italic",
      icon: <Italic className="size-5" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
    },
    {
      key: "strike",
      label: "Strike",
      icon: <Strikethrough className="size-5" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
    },
    {
      key: "code",
      label: "Code",
      icon: <Code className="size-5" />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive("code"),
      disabled: !editor.can().chain().focus().toggleCode().run(),
    },
    {
      key: "code_block",
      label: "Code Block",
      icon: <CodeXml className="size-5" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive("codeBlock"),
      disabled: !editor.can().chain().focus().toggleCodeBlock().run(),
    },
    {
      key: "bullet_list",
      label: "Bullet List",
      icon: <List className="size-5" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      key: "ordered_list",
      label: "Ordered List",
      icon: <ListOrdered className="size-5" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      disabled: !editor.can().chain().focus().toggleOrderedList().run(),
    },
    {
      key: "image",
      label: "Image",
      icon: <ImageIcon className="size-5" />,
      onClick: () => fileInputRef.current?.click(),
      isActive: editor.isActive("image"),
    },
  ];

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const insertImages = async () => {
      const filesArray = Array.from(files);
      editor.commands.setImages(
        filesArray.map((file) => ({
          src: file,
        }))
      );
    };

    await insertImages();
  };

  return (
    <Stack direction="horizontal" className="gap-1">
      {buttons
        .filter((ext) => !disabledExtensions?.includes(ext.key))
        .map(({ key, label, icon, onClick, isActive, disabled }) => (
          <ToolbarButton
            key={key}
            onClick={onClick}
            disabled={disabled}
            isActive={isActive}
            tooltip={label}
            aria-label={label}
          >
            {icon}
          </ToolbarButton>
        ))}

      {!isImageExtensionDisabled && (
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          multiple
          className="hidden"
          onChange={handleFile}
        />
      )}

      <LinkBubbleMenu editor={editor} />
      <LinkEditPopover editor={editor} />
    </Stack>
  );
}
