import { EditorRenderer } from "@/components/rich-text/editor-renderer";
import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Tables } from "@/lib/database.types";
import Link from "next/link";

type PostCardProps = Tables<"posts"> & {
  noRedirect?: boolean;
};

export function PostCard({
  slug,
  title,
  content,
  content_type,
  noRedirect,
}: PostCardProps) {
  const PostCardContent = () => (
    <Card className="p-4">
      <Typography variant="h3" className="mb-4">
        {title}
      </Typography>
      {content_type === "text" && <EditorRenderer content={content} />}
    </Card>
  );

  return noRedirect ? (
    <PostCardContent />
  ) : (
    <Card className="p-4">
      <Link href={`post/${slug}`}>
        <Typography variant="h3" className="mb-4 hover:underline">
          {title}
        </Typography>
      </Link>
      {content_type === "text" && <EditorRenderer content={content} />}
    </Card>
  );
}
