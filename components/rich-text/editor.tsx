"use client";

import { EditorMenuBar } from "@/components/rich-text/editor-menu-bar";
import { createPublicStorageUrlFromPath } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image } from "./extensions/image";
import Link from "./extensions/link";
import { fileToBase64 } from "./utils";

type EditorProps = {
  onChange: (content: string) => void;
  initialContent?: string;
};

export function Editor({ onChange, initialContent }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image.configure({
        allowedMimeTypes: ["image/*"],
        maxFileSize: 5 * 1024 * 1024,
        async uploadFn(file, id) {
          const supabase = createClient();
          const { data } = await supabase.storage
            .from("post_images")
            .upload(id, file, {
              cacheControl: "3600",
              upsert: true,
            });

          if (data) {
            const publicUrl = createPublicStorageUrlFromPath(data.fullPath);
            return { id: data.path, src: publicUrl, path: data.path };
          }

          const src = await fileToBase64(file);
          return src;
        },
        async onImageRemoved({ path }) {
          const supabase = createClient();
          await supabase.storage.from("post_images").remove([path]);
        },
        onValidationError(errors) {
          errors.forEach((error) => {
            console.log(error);
          });
        },
      }),
      Placeholder.configure({
        placeholder: "Write something ...",
      }),
    ],
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
