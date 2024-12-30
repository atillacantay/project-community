import { Tables } from "@/lib/database.types";
import Link from "@tiptap/extension-link";
import { generateHTML } from "@tiptap/html";
import type { JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import sanitizeHtml from "sanitize-html";

type EditorRendererProps = {
  content: Tables<"posts">["content"];
};

export function EditorRenderer({ content }: EditorRendererProps) {
  const sanitizedContent = sanitizeHtml(
    generateHTML(content as JSONContent, [StarterKit, Link])
  );

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      className="rich-text-renderer"
    />
  );
}
