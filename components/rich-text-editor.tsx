"use client";

import TextEditorMenuBar from "@/components/text-editor-menu-bar";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type TextEditorProps = {
  onChange: (content: string) => void;
  initialContent?: string;
};

export function RichTextEditor({ onChange, initialContent }: TextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const stringifiedJSON = JSON.stringify(editor.getJSON());
      onChange(stringifiedJSON);
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] cursor-text rounded-md border border-input shadow-sm p-5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed",
      },
    },
    immediatelyRender: false,
  });

  return (
    <div>
      <TextEditorMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
