"use client";

import { EditorMenuBar } from "@/components/rich-text/editor-menu-bar";
import Image from "@tiptap/extension-image";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "./extensions/link";

type EditorProps = {
  onChange: (content: string) => void;
  initialContent?: string;
};

export function Editor({ onChange, initialContent }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Image, Link],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const stringifiedJSON = JSON.stringify(editor.getJSON());
      onChange(stringifiedJSON);
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] cursor-text rounded-md border border-input shadow-sm px-4 py-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed",
      },
    },
    immediatelyRender: false,
  });

  return (
    <div>
      <EditorMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
