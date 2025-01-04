"use client";

import { EditorMenuBar } from "@/components/rich-text/editor-menu-bar";
import { Stack } from "@/components/ui/stack";
import { createPublicStorageUrlFromPath } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
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
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const stringifiedJSON = JSON.stringify(editor.getJSON());
      onChange(stringifiedJSON);
    },
    editorProps: {
      attributes: {
        class:
          "px-3 py-2 min-h-[100px] focus:outline-none disabled:cursor-not-allowed",
      },
    },
    immediatelyRender: false,
    autofocus: true,
  });

  return (
    <Stack className="relative rounded-xl border border-input shadow-sm focus-within:ring-1 focus-within:ring-ring">
      <div className="px-2 py-1">
        <EditorMenuBar editor={editor} />
      </div>
      <EditorContent editor={editor} />
    </Stack>
  );
}
