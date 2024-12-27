import { Stack } from "@/components/ui/stack";
import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";

const MenuButton = ({
  onClick,
  label,
  isActive,
  disabled,
  children,
}: {
  onClick: () => void;
  label?: string;
  isActive: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <Toggle
    type="button"
    defaultChecked={isActive}
    onClick={onClick}
    disabled={disabled}
    title={label}
    aria-label={label}
  >
    {children}
  </Toggle>
);

export default function TextEditorMenuBar({
  editor,
}: {
  editor: Editor | null;
}) {
  if (!editor) return null;

  const buttons = [
    {
      key: "bold",
      label: "Bold",
      icon: <Bold className="size-5" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
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
  ];

  return (
    <Stack direction="horizontal" className="mb-2 flex gap-1">
      {buttons.map(({ key, label, icon, onClick, isActive, disabled }) => (
        <MenuButton
          key={key}
          label={label}
          onClick={onClick}
          isActive={isActive}
          disabled={disabled}
        >
          {icon}
        </MenuButton>
      ))}
    </Stack>
  );
}
