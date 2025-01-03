import { Post } from "@/types/supabase";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { generateHTML } from "@tiptap/html";
import { type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import sanitizeHtml from "sanitize-html";

type EditorRendererProps = {
  content: Post["content"];
};

export function EditorRenderer({ content }: EditorRendererProps) {
  const sanitizedContent = sanitizeHtml(
    generateHTML(content as JSONContent, [
      StarterKit,
      Link,
      Image.extend({
        addAttributes() {
          return {
            src: {
              default: null,
            },
            alt: {
              default: "rich text editor image",
            },
            title: {
              default: null,
            },
            id: {
              default: null,
            },
            width: {
              default: null,
            },
            height: {
              default: null,
            },
          };
        },
      }),
    ]),
    { allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]) }
  );

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      className="rich-text-renderer"
    />
  );
}
