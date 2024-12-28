import { Card } from "@/components/ui/card";
import { Tables } from "@/lib/database.types";
import { generateHTML } from "@tiptap/html";
import type { JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";

type PostCardProps = Tables<"posts"> & {};

export default function PostCard({
  slug,
  title,
  content,
  content_type,
}: PostCardProps) {
  const sanitizedContent =
    content_type === "text"
      ? sanitizeHtml(generateHTML(content as JSONContent, [StarterKit]))
      : null;

  return (
    <Link href={`post/${slug}`}>
      <Card className="p-4">
        <span>{title}</span>
        {sanitizedContent && (
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        )}
      </Card>
    </Link>
  );
}
